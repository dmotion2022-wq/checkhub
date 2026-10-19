"""Genera la bozza SQL (Postgres / Supabase) dallo schema dell'Hub.
Fonti: spec.py (nucleo v1, doc 09), schema_db.py (anagrafiche, doc 10), schema_flussi.py (docs 11-12).
Uso: cd schema && python3 gen_sql.py > ../supabase/migrations/20261019000000_schema_hub_bozza.sql
"""
import re
import core_v1 as spec, anagrafiche_v1 as schema_db, flussi_v1 as schema_flussi

SOSTITUITE = {"LOCATION": "location", "SALE": "spazi", "MEZZI": "veicoli", "FORNITORI": "fornitori"}
OVERRIDE = {("impegni", "stato"): "lista: opzionato, confermato, accettato, rifiutato, annullato"}
MERGE_ANAG = {"contatti": "contatti", "persone · profilo operativo": "persone", "articoli · aggiunte": "articoli"}

def q(s): return "'" + str(s).replace("'", "''") + "'"
def ident(s):
    s = s.strip().lower()
    assert re.fullmatch(r"[a-z_][a-z0-9_]*", s), s
    return s

class Tab:
    def __init__(s, name, comment, kind):
        s.name, s.comment, s.kind, s.cols, s.pk = name, comment, kind, [], None
    def add(s, name, sqltype, comment="", ref=None, check=None, pk=False):
        if any(c["name"] == name for c in s.cols): return
        s.cols.append(dict(name=name, type=sqltype, comment=comment, ref=ref, check=check, pk=pk))

TABS = {}
def tab(name, comment="", kind="core"):
    if name not in TABS: TABS[name] = Tab(name, comment, kind)
    return TABS[name]

def lista_vals(t):
    m = re.match(r"lista(?: calcolata)?:\s*(.+)$", t)
    if not m: return None
    vals = [v.strip() for v in m.group(1).split(",")]
    if any("…" in v or "–" in v or "(" in v for v in vals): return None
    return vals

def tipo(t):
    """tipo leggibile -> (sql, ref_target, check_values)"""
    t = t.strip()
    if t.startswith("→"):
        tgt = t[1:].split(" ")[0].strip()
        if "(lista)" in t: return ("__array_ref__", tgt, None)
        return ("__ref__", tgt, None)
    tl = t.lower()
    if tl == "id": return ("text", None, None)
    if tl.startswith("lista multipla") : return ("text[]", None, None)
    if tl.startswith("lista"):
        return ("text", None, lista_vals(t))
    if tl.startswith("data e ora"): return ("timestamptz", None, None)
    if tl.startswith("data"): return ("date", None, None)
    if tl.startswith("ora"): return ("time", None, None)
    if tl.startswith("sì/no"): return ("boolean", None, None)
    if tl.startswith("€"): return ("numeric(12,2)", None, None)
    if tl.startswith("%"): return ("numeric(7,3)", None, None)
    if tl.startswith("numero"): return ("numeric", None, None)
    if tl.startswith("coordinate"): return ("point", None, None)
    if tl == "json": return ("jsonb", None, None)
    if tl.startswith("link o →"): return ("text", None, None)
    return ("text", None, None)  # testo, testo lungo, email, telefono, link, url

def split_cols(name, t):
    names = [n.strip() for n in name.split("·")]
    types = [x.strip() for x in t.split(" · ")]
    if len(names) == len(types): return list(zip(names, types))
    if len(names) == 4 and len(types) == 2:  # creato_il · creato_da · aggiornato_il · aggiornato_da
        return [(n, types[0] if n.endswith("_il") else types[1]) for n in names]
    return [(n, types[0]) for n in names]

def add_col(T, name, t, comment):
    for n, tt in split_cols(name, t):
        n = ident(n)
        tt = OVERRIDE.get((T.name, n), tt)
        sql, ref, chk = tipo(tt)
        T.add(n, sql, comment, ref, chk)

# 1. nucleo v1 (spec.py), meno le tabelle sostituite dalle anagrafiche
for fname, fdesc, tabs in spec.FILES:
    for tname, cols in tabs:
        if tname in SOSTITUITE: continue
        T = tab(tname.lower(), f"{fname} · {fdesc}", "core")
        for c in cols:
            if c[1] == "ID" and T.pk is None:
                T.add(ident(c[0]), "text", c[2], pk=True); T.pk = c[0]
            else:
                add_col(T, c[0], c[1], c[2])

# 2. flussi (docs 11-12)
for tname, desc, cols in schema_flussi.TABELLE:
    T = tab(tname.lower(), desc, "flussi")
    for c in cols:
        if c[1] == "ID" and T.pk is None:
            T.add(ident(c[0]), "text", c[2], pk=True); T.pk = c[0]
        else:
            add_col(T, c[0], c[1], c[2])
for tname, cols in schema_flussi.EXT.items():
    for c in cols: add_col(TABS[tname.lower()], c[0], c[1], c[2])
for (t, c), v in OVERRIDE.items():
    for col in TABS[t].cols:
        if col["name"] == c: col["type"], col["check"] = "text", lista_vals(v)

# 3. anagrafiche (doc 10)
for area, adesc, tabs in schema_db.AREE:
    for tname, tdesc, pref, cols in tabs:
        if tname in MERGE_ANAG:
            T = TABS[MERGE_ANAG[tname]]
            for c in cols: add_col(T, c[0], c[1], c[2])
            continue
        T = tab(ident(tname), f"{area} · {tdesc}", "anagrafiche")
        T.add("id", "uuid", "chiave interna", pk=True); T.pk = "id"
        for c in schema_db.COMUNI[1:]:
            if c[0] != "rev": add_col(T, c[0], c[1], c[2])
        for c in cols: add_col(T, c[0], c[1], c[2])

# chiavi primarie mancanti e risoluzione dei riferimenti
for T in TABS.values():
    if T.pk is None:
        T.cols.insert(0, dict(name="id", type="bigint generated always as identity", comment="", ref=None, check=None, pk=True)); T.pk = "id"
    if T.name != "modifiche":
        T.add("rev", "integer not null default 1", "revisione: +1 a ogni modifica. Chi aggiorna manda la rev che ha letto; se nel frattempo un altro dispositivo ha modificato il record, l'aggiornamento non passa")
EXTRA_CHECK = {"spazi": "check (num_nonnulls(location_id, hotel_id, ristorante_id) = 1)"}
REALTIME = ["commesse", "piano_commessa", "fasi", "fabbisogni", "impegni", "timesheet", "prenotazioni", "preventivi", "preventivi_righe",
            "todo_clickup", "alert", "commessa_aree", "rdo_fornitori", "giri", "tappe", "logistica_persona", "validazioni", "dispositivi"]
def target(ref):
    r = SOSTITUITE.get(ref, ref).lower()
    if r == "liste_valori": return None
    assert r in TABS, ref
    return r
def pk_type(r):
    T = TABS[r]; c = next(c for c in T.cols if c["pk"])
    return "bigint" if c["type"].startswith("bigint") else c["type"]

out = []
w = out.append
w("-- Nakama Hub · schema database · BOZZA da validare (non applicare in produzione)")
w("-- Generato da gen_sql.py partendo da schema/core_v1.py, schema/anagrafiche_v1.py e schema/flussi_v1.py.")
w("-- Le chiavi esterne sono aggiunte alla fine, così l'ordine delle tabelle non conta.")
w("-- RLS attiva su tutte le tabelle: le policy per ruolo (matrice PERMESSI, doc 07) sono ancora da scrivere.\n")
w("create extension if not exists pgcrypto;\n")
fks = []
order = [t for t in TABS.values() if t.kind == "core"] + [t for t in TABS.values() if t.kind == "anagrafiche"] + [t for t in TABS.values() if t.kind == "flussi"]
cur = None
for T in order:
    if T.kind != cur:
        cur = T.kind
        w(f"\n-- ════════ {dict(core='NUCLEO (doc 09)', anagrafiche='ANAGRAFICHE (doc 10)', flussi='FLUSSI DI COMMESSA (docs 11-12)')[cur]} ════════\n")
    lines = []
    for c in T.cols:
        typ = c["type"]
        if typ == "__ref__":
            tg = target(c["ref"])
            typ = pk_type(tg) if tg else "text"
            if tg: fks.append((T.name, c["name"], tg, next(x["name"] for x in TABS[tg].cols if x["pk"])))
        elif typ == "__array_ref__":
            tg = target(c["ref"]); typ = (pk_type(tg) if tg else "text") + "[]"
        line = f"  {c['name']} {typ}"
        if c["pk"]:
            line += " primary key" + (" default gen_random_uuid()" if typ == "uuid" else "")
        if c["name"] in ("creato_il", "aggiornato_il"): line += " not null default now()"
        if c["name"] == "attivo" and typ == "boolean": line += " not null default true"
        if c["check"]: line += f" check ({c['name']} in ({', '.join(q(v) for v in c['check'])}))"
        lines.append(line)
    if T.kind == "anagrafiche": lines.append("  unique (codice)")
    if T.name in EXTRA_CHECK: lines.append("  " + EXTRA_CHECK[T.name])
    w(f"create table {T.name} (\n" + ",\n".join(lines) + "\n);")
    w(f"comment on table {T.name} is {q(T.comment)};")
    for c in T.cols:
        if c["comment"]: w(f"comment on column {T.name}.{c['name']} is {q(c['comment'])};")
    w(f"alter table {T.name} enable row level security;\n")
w("\n-- ════════ CHIAVI ESTERNE ════════\n")
for t, c, tg, tpk in fks:
    w(f"alter table {t} add constraint {(t + '_' + c)[:55]}_fk foreign key ({c}) references {tg} ({tpk});")
w("""
-- ════════ SINCRONIZZAZIONE TRA DISPOSITIVI ════════
-- 1. Ogni record ha una revisione (rev). Il trigger la incrementa e aggiorna aggiornato_il a ogni modifica.
--    L'app aggiorna con il filtro rev=eq.<rev letta> (PostgREST): se un altro dispositivo ha già modificato
--    il record, l'aggiornamento tocca 0 righe, l'app ricarica il record e unisce le modifiche campo per campo.
--    Se l'app manda esplicitamente una rev diversa da quella attuale, il trigger rifiuta con errore 40001.
-- 2. Ogni modifica finisce in MODIFICHE con utente e dispositivo (header x-hub-device).
-- 3. Le tabelle operative sono pubblicate su Supabase Realtime: ogni dispositivo aperto riceve i cambiamenti.

create or replace function hub_utente() returns text language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub', current_user::text)
$$;
create or replace function hub_dispositivo() returns text language sql stable as $$
  select nullif(current_setting('request.headers', true), '')::jsonb ->> 'x-hub-device'
$$;
create or replace function hub_prima_di_modifica() returns trigger language plpgsql as $$
begin
  if new.rev is distinct from old.rev then
    raise exception 'conflitto_versione: %.% è stato modificato da un altro dispositivo (rev attuale %, inviata %)',
      TG_TABLE_NAME, to_jsonb(old) ->> TG_ARGV[0], old.rev, new.rev using errcode = '40001';
  end if;
  if to_jsonb(new) ? 'aggiornato_il' then
    new := jsonb_populate_record(new, jsonb_build_object('rev', old.rev + 1, 'aggiornato_il', now()));
  else
    new.rev := old.rev + 1;
  end if;
  return new;
end $$;
create or replace function hub_registra() returns trigger language plpgsql security definer set search_path = public as $$
declare
  vecchio jsonb := case when TG_OP <> 'INSERT' then to_jsonb(old) end;
  nuovo   jsonb := case when TG_OP <> 'DELETE' then to_jsonb(new) end;
  diff    jsonb;
begin
  if TG_OP = 'UPDATE' then
    select jsonb_object_agg(k, jsonb_build_array(vecchio -> k, nuovo -> k)) into diff
    from jsonb_object_keys(nuovo) as k
    where (vecchio -> k) is distinct from (nuovo -> k) and k not in ('rev', 'aggiornato_il');
    if diff is null then return null; end if;
  end if;
  insert into modifiche (tabella, record_id, operazione, differenze, utente, dispositivo, quando)
  values (TG_TABLE_NAME, coalesce(nuovo, vecchio) ->> TG_ARGV[0], lower(TG_OP), coalesce(diff, nuovo, vecchio), hub_utente(), hub_dispositivo(), now());
  return null;
end $$;
""")
for T in order:
    if T.name == "modifiche": continue
    pk = next(c["name"] for c in T.cols if c["pk"])
    w(f"create trigger {T.name}_rev before update on {T.name} for each row execute function hub_prima_di_modifica({q(pk)});")
    w(f"create trigger {T.name}_log after insert or update or delete on {T.name} for each row execute function hub_registra({q(pk)});")
w("""
do $$ begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    alter publication supabase_realtime add table """ + ", ".join(REALTIME) + """;
  end if;
end $$;""")
print("\n".join(out))
import sys
print(f"-- {len(TABS)} tabelle, {sum(len(t.cols) for t in TABS.values())} colonne, {len(fks)} chiavi esterne", file=sys.stderr)
