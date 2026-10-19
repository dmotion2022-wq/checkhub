"""Genera la bozza SQL (Postgres / Supabase) dallo schema dell'Hub.
Fonti: spec.py (nucleo v1, doc 09), schema_db.py (anagrafiche, doc 10), schema_flussi.py (docs 11-12).
Uso: cd schema && python3 gen_sql.py > ../supabase/migrations/20261019000000_schema_hub_bozza.sql
"""
import re
import core_v1 as spec, anagrafiche_v1 as schema_db, flussi_v1 as schema_flussi

SOSTITUITE = {"LOCATION": "strutture", "SALE": "spazi", "MEZZI": "veicoli", "FORNITORI": "fornitori"}
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
        for c in schema_db.COMUNI[1:]: add_col(T, c[0], c[1], c[2])
        for c in cols: add_col(T, c[0], c[1], c[2])

# chiavi primarie mancanti e risoluzione dei riferimenti
for T in TABS.values():
    if T.pk is None:
        T.cols.insert(0, dict(name="id", type="bigint generated always as identity", comment="", ref=None, check=None, pk=True)); T.pk = "id"
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
    w(f"create table {T.name} (\n" + ",\n".join(lines) + "\n);")
    w(f"comment on table {T.name} is {q(T.comment)};")
    for c in T.cols:
        if c["comment"]: w(f"comment on column {T.name}.{c['name']} is {q(c['comment'])};")
    w(f"alter table {T.name} enable row level security;\n")
w("\n-- ════════ CHIAVI ESTERNE ════════\n")
for t, c, tg, tpk in fks:
    w(f"alter table {t} add constraint {(t + '_' + c)[:55]}_fk foreign key ({c}) references {tg} ({tpk});")
print("\n".join(out))
import sys
print(f"-- {len(TABS)} tabelle, {sum(len(t.cols) for t in TABS.values())} colonne, {len(fks)} chiavi esterne", file=sys.stderr)
