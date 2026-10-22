// Doffy · applicazione (demo, dati locali in data.js)
const TODAY = "2026-10-18";
const idx = (t, k) => Object.fromEntries((D[t] || []).map(r => [r[k], r]));
const PER = idx("PERSONE", "persona_id"), ORG = idx("ORGANIZZAZIONI", "org_id"), COM = idx("COMMESSE", "commessa_id"),
      LOC = idx("LOCATION", "location_id"), MAG = idx("MAGAZZINI", "magazzino_id"), ART = idx("ARTICOLI", "articolo_id"),
      SEGN = idx("SEGNALAZIONI", "segnalazione_id"), FILES = idx("FILE", "file_id"), RIS = Object.fromEntries(D.RIASSUNTI.map(r => [r.oggetto_id, r]));
PER.P01 && Object.assign(PER.P01, { nome: "Utenza", cognome: "master" });
const USERS = ["P04", "P09", "P11", "P02", "P01"];
const S = { user: "P01", view: "progetti", comm: null, stab: "overview", dir: "", fileOpen: null, art: null, pvHide: new Set(), pvTool: null, pvRow: null, filtro: "attive", mag: { tab: null, open: null, ev: null, sel: new Set(), calMag: "MAG-C", calDa: "2026-11-09", solo: true, dal: "2026-11-11", al: "2026-11-13", mag: "tutti", cat: "tutte", q: "" }, todo: { mine: false, stato: "aperti" }, cal: { tab: "generale", p: null, da: "2026-11-09", mese: "2026-11" }, nc: null, src: "inv", check: null };

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const MESI = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];
const fd = d => { if (!d) return ""; const [y, m, g] = d.slice(0, 10).split("-"); return `${+g} ${MESI[+m - 1]}${y !== "2026" ? " " + y : ""}`; };
const fdt = d => d ? `${fd(d)} ${d.slice(11, 16)}` : "";
const eur = n => n == null ? "—" : new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const pct = n => n == null ? "—" : Math.round(n * 100) + "%";
const nome = pid => PER[pid] ? `${PER[pid].nome} ${PER[pid].cognome}` : "—";
const ini = pid => PER[pid] ? (PER[pid].nome[0] + PER[pid].cognome[0]) : "?";
const org = id => ORG[id]?.nome_breve || "";
const ts = s => new Date(s.length === 10 ? s + "T00:00" : s.replace(" ", "T")).getTime();
const codice = c => c.codice_definitivo || c.codice_prospect;
const prod = a => a.marca ? `${a.marca} ${a.modello || ""}`.trim() : a.nome;
const addDays = (k, n) => { const d = new Date(k + "T00:00"); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };

/* ruoli e permessi letti da 00 · CONFIGURAZIONE */
const RANK = { G: 4, M: 3, V: 2, P: 1 };
const ruoli = pid => D.PERSONE_RUOLI.filter(r => r.persona_id === pid).map(r => r.ruolo_id);
function liv(area, pid = S.user) {
  let best = null;
  for (const r of ruoli(pid)) { const p = D.PERMESSI.find(x => x.ruolo_id === r && x.area_id === area); if (p && (!best || RANK[p.livello] > RANK[best])) best = p.livello; }
  return best;
}
const RUOLO_NOME = Object.fromEntries(D.RUOLI.map(r => [r.ruolo_id, r.nome]));
const inTeam = (cid, pid = S.user) => D.TEAM.some(t => t.commessa_id === cid && t.persona_id === pid) || COM[cid].pm_persona_id === pid || COM[cid].backup_persona_id === pid;
function commesseVisibili() {
  const l = liv("PROGETTO"); if (!l) return [];
  return D.COMMESSE.filter(c => l !== "P" || inTeam(c.commessa_id));
}
const vedeNumeri = () => !!liv("COSTING");

const STATO_CLS = { "prospect": "p-warn", "confermata": "p-acc", "in preparazione": "p-acc", "in corso": "p-crit", "consuntivo": "p-ok", "chiusa": "", "persa": "", "annullata": "" };
const pill = (txt, cls = "") => `<span class="pill ${cls}">${esc(txt)}</span>`;

function toast(msg) { const t = document.getElementById("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, 2600); }

/* ───────── disponibilità magazzino ───────── */
const ATTIVE = ["richiesta", "confermata", "uscita"];
function giac(aid, mid) { const g = D.GIACENZE.find(x => x.articolo_id === aid && x.magazzino_id === mid); return g ? g.quantita - (g.fuori_servizio || 0) : null; }
function impegnato(aid, mid, dal, al, escludi) {
  const a = ts(dal), b = ts(al);
  return D.PRENOTAZIONI.filter(p => p.articolo_id === aid && p.magazzino_id === mid && ATTIVE.includes(p.stato) && p.prenotazione_id !== escludi && ts(p.dal) < b && a < ts(p.al)).reduce((s, p) => s + p.quantita, 0);
}
function disp(aid, mid, dal, al) { const g = giac(aid, mid); return g == null ? null : { tot: g, libero: g - impegnato(aid, mid, dal, al) }; }
const SOGLIA = parseFloat((D.IMPOSTAZIONI.find(i => i.chiave === "soglia_magazzino_al_limite") || {}).valore || "20") / 100;
function verifica(aid, q, mid, dal, al) {
  const d = disp(aid, mid, dal, al);
  const altri = D.MAGAZZINI.filter(m => m.magazzino_id !== mid).map(m => ({ m, d: disp(aid, m.magazzino_id, dal, al) })).filter(x => x.d && x.d.libero >= q);
  if (d && d.libero >= q) {
    const resto = d.libero - q;
    if (resto < Math.ceil(d.tot * SOGLIA)) return { k: "warn", t: "È al limite", s: `Dopo questa prenotazione restano ${resto} pezzi su ${d.tot} in ${MAG[mid].nome}.` };
    return { k: "ok", t: "C'è", s: `${d.libero} liberi su ${d.tot} in ${MAG[mid].nome} nel periodo.` };
  }
  if (altri.length) return { k: "alt", t: "C'è in un altro magazzino", s: `In ${MAG[mid].nome} ${d ? d.libero : 0} liberi. Disponibile in: ${altri.map(x => `${x.m.nome} (${x.d.libero})`).join(", ")}.`, alt: altri[0].m.magazzino_id };
  const tutti = D.MAGAZZINI.reduce((s, m) => s + Math.max(0, disp(aid, m.magazzino_id, dal, al)?.libero || 0), 0);
  return { k: "crit", t: "Non c'è", s: `In tutti i magazzini ne restano ${tutti} liberi nel periodo: serve un noleggio da terzi o un'altra data.` };
}

/* ───────── avvisi di commessa ───────── */
function avvisi(c) {
  const out = [], cid = c.commessa_id, start = c.data_inizio;
  const ap = D.PIANO[cid] ? alertPersone(c) : null;
  if (ap && ap.r) out.push({ k: ap.r.k, t: `Persone mancanti · ${ap.sc.n} ${ap.sc.n > 1 ? "posti scoperti" : "posto scoperto"}`, s: `${ap.sc.det.join(", ")}. La prima fase è tra ${ap.g} giorni.` });
  const seen = new Set(); occ().filter(o => o.commessa === cid && o.conflitti.length).forEach(o => { const k = o.persona + o.inizio.slice(0, 10); if (seen.has(k)) return; seen.add(k);
    out.push({ k: "crit", t: `Conflitto · ${nome(o.persona)}`, s: `${o.attivita}, ${fdt(o.inizio)}. Si sovrappone a: ${o.conflitti.join(" · ")}.` }); });
  D.SICUREZZA.filter(s => s.commessa_id === cid && s.stato !== "ok").forEach(s => out.push({ k: s.stato === "mancante" ? "crit" : "warn", t: `${s.tipo} ${s.stato}`, s: `Scadenza ${fd(s.scadenza)} · resp. ${nome(s.responsabile_persona_id)}` }));
  const forn = new Set(D.ORDINI.filter(o => o.commessa_id === cid).map(o => o.fornitore_org_id));
  D.FORNITORI.filter(f => forn.has(f.org_id) && f.durc_scadenza && f.durc_scadenza < start).forEach(f => out.push({ k: "warn", t: `DURC in scadenza · ${org(f.org_id)}`, s: `Scade il ${fd(f.durc_scadenza)}, prima dell'evento.` }));
  D.FORNITORI.filter(f => forn.has(f.org_id) && f.documenti_ok === "no").forEach(f => out.push({ k: "warn", t: `Documenti incompleti · ${org(f.org_id)}`, s: f.note }));
  const team = new Set(D.TEAM.filter(t => t.commessa_id === cid).map(t => t.persona_id));
  D.DATI_RISERVATI.filter(r => team.has(r.persona_id) && r.formazione_sicurezza_scadenza && r.formazione_sicurezza_scadenza < start).forEach(r => out.push({ k: "warn", t: `Formazione sicurezza · ${nome(r.persona_id)}`, s: `Scade il ${fd(r.formazione_sicurezza_scadenza)}, prima dell'evento.` }));
  const rich = D.PRENOTAZIONI.filter(p => p.commessa_id === cid && p.stato === "richiesta").length;
  if (rich) out.push({ k: "warn", t: `${rich} prenotazioni da confermare`, s: "Il magazziniere deve confermarle." });
  const late = D.TODO_CLICKUP.filter(t => t.commessa_id === cid && t.stato !== "fatto" && t.scadenza < TODAY).length;
  if (late) out.push({ k: "crit", t: `${late} to-do scaduti`, s: "Vedi elenco to-do qui sotto." });
  return out;
}

/* ───────── viste ───────── */
function vProgetti() {
  const lista = commesseVisibili();
  const F = { attive: c => !["chiusa", "persa", "annullata"].includes(c.stato), prospect: c => c.stato === "prospect", tutte: () => true };
  const rows = lista.filter(F[S.filtro]).sort((a, b) => a.data_inizio.localeCompare(b.data_inizio));
  const lp = liv("PROGETTO");
  return `
  <div class="view-head"><div><h1>Progetti</h1></div>
    <div class="filters" role="group" aria-label="Filtro">
      ${canCreate() ? `<button class="btn" data-nav="nuova">+ Nuova commessa</button>` : ""}
      ${[["attive", "In lavorazione"], ["prospect", "Prospect"], ["tutte", "Tutte"]].map(([k, l]) => `<button class="chip" data-filtro="${k}" aria-pressed="${S.filtro === k}">${l}</button>`).join("")}
    </div></div>
  ${rows.length ? `<div class="plist">${rows.map(c => `
    <button class="prow az-${c.azienda_capofila === "Nakama" ? "nk" : "ch"}" data-open="${c.commessa_id}">
      <span><span class="code">${esc(codice(c))}</span></span>
      <span style="min-width:0"><span class="t">${esc(c.titolo_evento)}</span><br><span class="sub">${esc(org(c.cliente_org_id))}${c.agenzia_org_id ? " · via " + esc(org(c.agenzia_org_id)) : ""}${c.location_id ? " · " + esc(LOC[c.location_id].nome) : ""}</span></span>
      <span class="sub c-who">PM ${esc(nome(c.pm_persona_id))}</span>
      <span class="sub c-dates mono">${fd(c.data_inizio)}${c.data_fine !== c.data_inizio ? "–" + fd(c.data_fine) : ""}</span>
      <span>${pill(c.stato, STATO_CLS[c.stato])}</span>
      <span class="arrow" aria-hidden="true">›</span>
    </button>`).join("")}</div>` : `<div class="empty">Nessuna commessa in questo filtro.</div>`}`;
}

function vScheda() {
  const c = COM[S.comm], cid = c.commessa_id;
  const pren = D.PRENOTAZIONI.filter(p => p.commessa_id === cid);
  const ord = D.ORDINI.filter(o => o.commessa_id === cid);
  const files = D.FILE.filter(f => f.commessa_id === cid || (f.location_id && f.location_id === c.location_id && !f.commessa_id));
  const sic = D.SICUREZZA.filter(s => s.commessa_id === cid || (!s.commessa_id && s.location_id === c.location_id));
  const todo = D.TODO_CLICKUP.filter(t => t.commessa_id === cid);
  const ai = RIS[cid];
  const av = avvisi(c);
  const sg = c.segnalazione_id ? SEGN[c.segnalazione_id] : null;
  const rb = D.REBATE.find(r => r.commessa_id === cid);
  const pv = pvOf(cid);
  const NUM = (() => { if (pv) { const T = pvTot(pv); return { ric: T.tot, cos: T.cos, marg: T.marg, src: `Preventivo v${pv.ver} · ${PV_STATO[pv.stato][0]}` }; } return { ric: c.ricavi_preventivo, cos: c.costi_preventivo, marg: c.margine_preventivo, src: "Stima" }; })();
  const ORD_STATI = ["da ordinare", "preventivo richiesto", "ordinato", "confermato", "in lavorazione", "consegnato"];
  const O = occ().filter(o => o.commessa === cid);
  const team = []; const addT = (p, r) => { if (!p) return; const x = team.find(t => t.p === p); if (x) { if (r && !x.r.includes(r)) x.r.push(r); } else team.push({ p, r: r ? [r] : [] }); };
  addT(c.pm_persona_id, "PM"); addT(c.backup_persona_id, "backup PM"); addT(c.sales_persona_id, "sales"); D.FABB.filter(f => f.commessa === cid).forEach(f => f.slots.forEach(sl => addT(sl.p, f.ruolo)));
  const sc = D.PIANO[cid] ? scoperti(cid) : { n: 0 };
  const fasi = D.FASI.filter(f => f.commessa === cid).sort((x, y) => x.dal.localeCompare(y.dal));
  const trasp = fasi.filter(f => ["carico", "andata", "ritorno", "scarico"].includes(f.tipo));

  const TABS = [["overview", "Overview"], ["prev", "Preventivo", pv ? pvTot(pv).n : 0], ["persone", "Persone", team.length + (sc.n ? ` · ${sc.n} scoperti` : "")],
    pren.length || trasp.length ? ["materiale", "Materiale e trasporti", pren.length] : null, ord.length ? ["ordini", "Ordini", ord.length] : null,
    files.length ? ["file", "File", files.length] : null, sic.length ? ["sicurezza", "Sicurezza", sic.filter(x => x.stato !== "ok").length || ""] : null,
    todo.length ? ["todo", "To-Do", todo.filter(t => t.stato !== "fatto").length] : null].filter(Boolean);
  if (!TABS.some(t => t[0] === S.stab)) S.stab = "overview";
  const faceColor = p => `var(${COLS[(+p.slice(1)) % COLS.length]})`;

  const overview = `<div class="grid2">
    <div class="col">
      <div class="facts">
        <div><div class="lbl">Cliente</div><div class="v">${esc(org(c.cliente_org_id))}${c.agenzia_org_id ? ` <span class="muted">via ${esc(org(c.agenzia_org_id))}</span>` : ""}</div></div>
        <div><div class="lbl">Date</div><div class="v mono">${fd(c.data_inizio)}${c.data_fine !== c.data_inizio ? " – " + fd(c.data_fine) : ""}</div></div>
        <div><div class="lbl">Location</div><div class="v">${c.location_id ? esc(LOC[c.location_id].nome) : "da definire"}</div></div>
        <div><div class="lbl">Pax</div><div class="v mono">${c.pax ?? "—"}</div></div>
        ${(() => { const r = c.referente_contatto_id && D.CONTATTI.find(x => x.contatto_id === c.referente_contatto_id); return r ? `<div><div class="lbl">Referente</div><div class="v">${esc(r.nome + " " + r.cognome)} <span class="muted small">${esc(r.email || "")}</span></div></div>` : ""; })()}
        ${sg ? `<div><div class="lbl">Segnalazione</div><div class="v">${esc(org(sg.partner_org_id))} <span class="muted small">rebate ${rb ? eur(rb.importo) : ""}</span></div></div>` : ""}
        ${c.lead_org_id ? `<div><div class="lbl">Lead</div><div class="v">${esc(org(c.lead_org_id))} <span class="muted small">${c.lead_tipo === "sconto" ? "sconto" : "rebate"} ${c.lead_pct}%</span></div></div>` : ""}
        ${c.catering_org_id ? `<div><div class="lbl">Catering</div><div class="v">${esc(org(c.catering_org_id))}</div></div>` : ""}
        <div><div class="lbl">Capofila</div><div class="v">${esc(c.azienda_capofila)}</div></div>
      </div>
      <section class="panel"><h2>Riassunto <span class="muted">${ai ? fd(ai.generato_il) : ""}</span></h2>
        ${ai ? `<div class="ai"><p>${esc(ai.testo)}</p></div>` : `<p class="muted small">Nessun riassunto.</p>`}</section>
      <section class="panel"><h2>Team <span class="muted">${team.length}</span></h2>
        <div class="faces">${team.map(t => { const mine = O.filter(o => o.persona === t.p), cf = mine.some(o => o.conflitti.length), opz = mine.length && mine.every(o => o.stato === "opz");
          return `<button class="face ${cf ? "cf" : opz ? "opz" : ""}" data-calpp="${t.p}" title="${esc(nome(t.p))} · ${esc(t.r.join(", "))}"><span class="face-av" style="--cc:${faceColor(t.p)}">${ini(t.p)}</span><b>${esc(PER[t.p].nome)}</b><span class="small muted">${esc(t.r[0])}</span>${cf ? pill("conflitto", "p-crit") : opz ? pill("opzione", "p-warn") : ""}</button>`; }).join("")}
          ${sc.n ? `<button class="face empty" data-stab="persone"><span class="face-av">+${sc.n}</span><b>scoperti</b><span class="small muted">assegna</span></button>` : ""}</div></section>
    </div>
    <div class="col">
      <section class="panel"><h2>Numeri</h2>
        ${vedeNumeri() ? `<div class="nums">
          <div class="num"><div class="lbl">Ricavi</div><div class="v">${eur(NUM.ric)}</div></div>
          <div class="num"><div class="lbl">Costi</div><div class="v">${eur(NUM.cos)}</div></div>
          <div class="num"><div class="lbl">Margine</div><div class="v">${pct(NUM.marg)}</div></div></div>
          ${NUM.marg != null ? `<div class="marg"><span style="width:${Math.max(0, Math.min(100, NUM.marg * 100))}%"></span></div>` : ""}
          <p class="small muted" style="margin:6px 0 0">${NUM.src}${c.condizioni_pagamento ? " · " + esc(c.condizioni_pagamento) : ""}</p>` : `<div class="locked">Non visibile per il tuo ruolo.</div>`}
      </section>
      ${av.length ? `<section class="panel"><h2>Attenzione <span class="muted">${av.length}</span></h2><div class="alerts">${av.map(a => `<div class="alert ${a.k}"><span class="dot"></span><div><b>${esc(a.t)}</b><br>${esc(a.s)}</div></div>`).join("")}</div></section>` : ""}
      ${pv ? (() => { const g = {}; pv.righe.forEach(r => { const k = r.opz ? "OPZIONI" : r.sez; g[k] = (g[k] || 0) + r.q * r.n * r.pu; }); const ord = x => { const i = SEZ_ORD.indexOf(x); return i < 0 ? 99 : i; };
        return `<section class="panel"><h2>Preventivo <span class="muted">v${pv.ver} · <button class="linkbtn" data-stab="prev">apri</button></span></h2><div class="qv">${Object.keys(g).sort((x, y) => ord(x) - ord(y)).map(k => `<span>${esc(k)}</span><span class="num">${eur(g[k])}</span>`).join("")}<span class="big">Totale + IVA</span><span class="num big">${eur(NUM.ric)}</span></div></section>`; })() : ""}
      ${fasi.length ? `<section class="panel"><h2>Piano <span class="muted">${fasi.length} fasi</span></h2><div class="phases mini">${fasi.map(f => `<div class="ph ph-${f.tipo}"><div class="ph-t"><b>${esc(faseNome(f))}</b></div><div class="mono small">${fd(f.dal)} · ${hh(f.dal)}–${hh(f.al)}</div><span class="mono small muted">${durH(f.dal, f.al)} h</span></div>`).join("")}</div></section>` : ""}
    </div>
  </div>`;

  const materiale = `<div class="grid2"><div class="col"><section class="panel"><h2>Materiale <span class="muted">${pren.length}</span></h2>
      ${pren.length ? `<div class="tbl-wrap"><table><thead><tr><th>Articolo</th><th class="num">Q.tà</th><th>Da</th><th>Periodo</th><th>Stato</th></tr></thead><tbody>
      ${pren.map(p => `<tr><td><button class="linkbtn" data-art="${p.articolo_id}">${esc(prod(ART[p.articolo_id]))}</button></td><td class="num">${p.quantita}</td><td>${esc(shortMag(MAG[p.magazzino_id].nome))}</td><td class="mono small">${fdt(p.dal)} → ${fdt(p.al)}</td><td>${pill(p.stato, p.stato === "confermata" ? "p-ok" : p.stato === "richiesta" ? "p-warn" : "")}</td></tr>`).join("")}
      </tbody></table></div>` : `<p class="muted small">Nessun materiale: si aggiunge dal preventivo.</p>`}</section></div>
    <div class="col"><section class="panel"><h2>Trasporti <span class="muted">${trasp.length}</span></h2>
      ${trasp.length ? `<div class="phases">${trasp.map(f => { const who = O.filter(o => o.fase === f).map(o => nome(o.persona)); return `<div class="ph ph-${f.tipo}"><div class="ph-t"><b>${esc(faseNome(f))}</b><span class="small muted">${esc(f.luogo)}${who.length ? " · " + esc(who.join(", ")) : ""}</span></div><div class="mono small">${fd(f.dal)} · ${hh(f.dal)}–${hh(f.al)}</div><span class="mono small muted">${durH(f.dal, f.al)} h</span></div>`; }).join("")}</div>` : `<p class="muted small">Nessun trasporto.</p>`}
      ${D.PIANO[cid] ? `<p style="margin:8px 0 0"><button class="linkbtn" data-stab="persone">Modifica nel piano</button></p>` : ""}</section></div></div>`;

  const ordini = `<section class="panel"><h2>Ordini <span class="muted">${ord.length}</span></h2>
    <div class="tbl-wrap"><table><thead><tr><th>Fornitore</th><th>Cosa</th><th>Avanzamento</th>${vedeNumeri() ? `<th class="num">Importo</th>` : ""}</tr></thead><tbody>
    ${ord.map(o => { const i = ORD_STATI.indexOf(o.stato); return `<tr><td>${esc(org(o.fornitore_org_id))}</td><td>${esc(o.descrizione)}<div class="small muted">consegna ${fd(o.consegna_prevista)} · ${esc(nome(o.responsabile_persona_id))}</div></td>
      <td style="min-width:150px">${pill(o.stato, i >= 3 ? "p-ok" : i <= 1 ? "p-warn" : "p-acc")}<div class="steps">${ORD_STATI.slice(1).map((_, k) => `<i class="${k < i ? "on" : ""}"></i>`).join("")}</div></td>
      ${vedeNumeri() ? `<td class="num">${eur(o.importo_previsto)}</td>` : ""}</tr>`; }).join("")}</tbody></table></div></section>`;

  const file = vDrive(c, files);

  const sicurezza = `<section class="panel"><h2>Sicurezza <span class="muted">${sic.length}</span></h2>
    <div class="tbl-wrap"><table><tbody>${sic.map(x => `<tr><td>${esc(x.tipo)}${!x.commessa_id ? ` <span class="small muted">location</span>` : ""}</td><td class="mono small">${fd(x.scadenza)}</td><td>${pill(x.stato, x.stato === "ok" ? "p-ok" : x.stato === "mancante" ? "p-crit" : "p-warn")}</td></tr>`).join("")}</tbody></table></div></section>`;

  const todoTab = `<section class="panel"><h2>To-Do <span class="muted">${todo.length}</span></h2>${todo.map(t => todoRow(t, true)).join("")}</section>`;

  const body = { overview, prev: () => pv ? vPrev() : `<div class="empty">${pvEditor() ? `<button class="btn" data-pvcreate="${cid}">Crea preventivo</button>` : "Nessun preventivo."}</div>`,
    persone: () => `${vPiano(c)}<section class="panel" style="margin-top:12px"><h2>Calendario <span class="muted">${O.length}</span></h2>${gantt(c)}</section>`,
    materiale, ordini, file, sicurezza, todo: todoTab }[S.stab];

  return `
  <button class="back" data-nav="progetti">‹ Progetti</button>
  <div class="sheet-head band band-${c.azienda_capofila === "Nakama" ? "nk" : "ch"}">
    <div class="title-row"><div class="hier">
        <h1>${esc(c.titolo_evento)} <span class="hcode">${esc(codice(c))}</span></h1>
        <div class="hloc">${c.location_id ? esc(LOC[c.location_id].nome) + (LOC[c.location_id].citta ? ", " + esc(LOC[c.location_id].citta) : "") : "Location da definire"}</div>
        <div class="hpm">PM ${esc(nome(c.pm_persona_id))}${c.backup_persona_id ? ` <span>· backup ${esc(nome(c.backup_persona_id))}</span>` : ""} <span>· ${pill(c.stato, STATO_CLS[c.stato])}</span></div></div>
      ${pv ? `<div class="pv-chip"><span class="small">Preventivo v${pv.ver} ${pill(PV_STATO[pv.stato][0], PV_STATO[pv.stato][1])} <b class="mono">${eur(pvTot(pv).tot)}</b></span></div>` : pvEditor() ? `<button class="btn" data-pvcreate="${cid}">Crea preventivo</button>` : ""}</div>
    <div class="subtabs" role="tablist">${TABS.map(([k, t, n]) => `<button role="tab" data-stab="${k}" aria-selected="${S.stab === k}">${t}${n ? ` <span class="tn">${n}</span>` : ""}</button>`).join("")}</div>
  </div>
  ${typeof body === "function" ? body() : body}`;
}

function vDrive(c, files) {
  const own = files.filter(f => f.commessa_id === c.commessa_id);
  const dir = S.dir || "";
  const dirs = new Set(DRIVE_SUB.map(x => x)); own.forEach(f => { const parts = f.cartella.split("/"); for (let i = 1; i <= parts.length; i++) dirs.add(parts.slice(0, i).join("/")); });
  const sub = [...dirs].filter(d => d.split("/").slice(0, -1).join("/") === dir && d !== dir).sort();
  const here = own.filter(f => f.cartella === dir).sort((a, b) => a.nome.localeCompare(b.nome));
  const count = d => own.filter(f => f.cartella === d || f.cartella.startsWith(d + "/")).length;
  const crumbs = dir ? dir.split("/") : [];
  const ICON = { "application/vnd.google-apps.document": "DOC", "application/vnd.google-apps.spreadsheet": "XLS", "application/pdf": "PDF", "image/png": "IMG", "image/jpeg": "IMG" };
  const open = S.fileOpen;
  return `<section class="panel"><h2>Drive <span class="muted">${own.length} file</span></h2>
    <div class="crumbs"><button class="crumb" data-dir="">${esc(codice(c))} · ${esc(c.titolo_evento)}</button>${crumbs.map((x, i) => `<span class="muted">/</span><button class="crumb" data-dir="${esc(crumbs.slice(0, i + 1).join("/"))}">${esc(x)}</button>`).join("")}</div>
    <div class="drive">
      ${sub.map(d => `<button class="drow" data-dir="${esc(d)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg><span>${esc(d.split("/").pop())}</span><span class="muted small">${count(d) || ""}</span></button>`).join("")}
      ${here.map(f => `<div class="drow file ${open === f.file_id ? "open" : ""}"><button class="dfile" data-file="${f.file_id}"><span class="ftype">${ICON[f.mime_type] || "FILE"}</span><span>${esc(f.nome)}</span><span class="muted small">v${f.versione} · ${fd(f.modificato_il)}</span></button>
        ${open === f.file_id ? `<p class="fsum">${RIS[f.file_id] ? esc(RIS[f.file_id].testo) : "Nessun riassunto."}</p>` : ""}</div>`).join("")}
      ${!sub.length && !here.length ? `<div class="empty">Cartella vuota.</div>` : ""}
    </div></section>`;
}

function gantt(c) {
  const imp = occ().filter(o => o.commessa === c.commessa_id);
  if (!imp.length) return `<p class="muted small">Nessun impegno.</p>`;
  const d0 = new Date(addDays(c.data_inizio, -2) + "T00:00"), d1 = new Date(addDays(c.data_fine, 2) + "T00:00");
  const days = []; for (let d = new Date(d0); d < d1; d.setDate(d.getDate() + 1)) days.push(new Date(d));
  const A = d0.getTime(), B = d1.getTime(), span = B - A;
  const inW = imp.filter(i => ts(i.fine) > A && ts(i.inizio) < B), fuori = imp.filter(i => !inW.includes(i));
  const people = [...new Set(inW.map(i => i.persona))];
  const pos = (s, e) => { const l = Math.max(0, (ts(s) - A) / span), r = Math.min(1, (ts(e) - A) / span); return `left:${(l * 100).toFixed(2)}%;width:${Math.max(.6, (r - l) * 100).toFixed(2)}%`; };
  const key = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const isEv = d => key(d) >= c.data_inizio && key(d) <= c.data_fine;
  const cols = `grid-template-columns:repeat(${days.length},1fr)`;
  const GG = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];
  return `<div class="gantt"><div class="g-inner">
    <div class="g-days"><span></span><div class="scale" style="${cols}">${days.map(d => `<span class="${isEv(d) ? "ev" : ""}">${GG[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}</span>`).join("")}</div></div>
    ${people.map(p => `<div class="g-row"><div class="who">${esc(nome(p))}</div><div class="g-track">
      <div class="g-grid" style="${cols}">${days.map(d => `<i class="${isEv(d) ? "ev" : ""}"></i>`).join("")}</div>
      ${D.INDISPONIBILITA.filter(x => x.persona_id === p && ts(x.al) > A && ts(x.dal) < B).map(x => `<div class="g-off" style="${pos(x.dal, x.al)}" title="Non disponibile: ${esc(x.motivo)}"></div>`).join("")}
      ${occ().filter(i => i.persona === p && i.commessa !== c.commessa_id && ts(i.fine) > A && ts(i.inizio) < B).map(i => `<div class="g-off" style="${pos(i.inizio, i.fine)}" title="${esc(titoloCal(i))}"></div>`).join("")}
      ${inW.filter(i => i.persona === p).map(i => `<div class="g-bar ${i.conflitti.length ? "conf" : i.stato === "opz" ? "prop" : ""}" style="${pos(i.inizio, i.fine)}" title="${esc(titoloCal(i))} · ${fdt(i.inizio)}–${hh(i.fine)}${i.conflitti.length ? " · conflitto: " + esc(i.conflitti.join(" · ")) : ""}">${esc(i.attivita)}</div>`).join("")}
    </div></div>`).join("")}
  </div></div>
  <div class="legend"><span><i style="background:var(--bar)"></i>confermato</span><span><i style="border:1px dashed var(--muted)"></i>opzionato</span><span><i style="background:var(--crit-bg);border:1px solid var(--crit)"></i>conflitto</span><span><i style="background:repeating-linear-gradient(135deg,var(--hatch) 0 3px,transparent 3px 6px);border:1px solid var(--crit)"></i>non disponibile o su altra commessa</span></div>
`;
}

function todoRow(t, compact) {
  const late = t.stato !== "fatto" && t.scadenza < TODAY;
  const can = canEditTodo(t);
  return `<div class="todo ${t.stato === "fatto" ? "done" : ""}" ${compact ? 'style="border-radius:8px;border-top:1px solid var(--line);margin-bottom:6px"' : ""}>
    <input type="checkbox" id="td-${t.clickup_task_id}" data-todo="${t.clickup_task_id}" ${t.stato === "fatto" ? "checked" : ""} ${can ? "" : "disabled"} aria-label="Segna come fatto">
    <label for="td-${t.clickup_task_id}" class="tt" style="min-width:0">${esc(t.titolo)}${compact ? "" : `<div class="small muted">${esc(nome(t.assegnatario_persona_id))}</div>`}</label>
    <div class="meta">${t.stato === "in corso" ? pill("in corso", "p-acc") : ""}<span class="due ${late ? "late" : ""}">${late ? "scaduto " : ""}${fd(t.scadenza)}</span>${compact ? `<span class="av" title="${esc(nome(t.assegnatario_persona_id))}">${ini(t.assegnatario_persona_id)}</span>` : ""}</div>
  </div>`;
}
function canEditTodo(t) { const l = liv("TODO"); return l === "G" || l === "M" || t.assegnatario_persona_id === S.user; }

/* ───────── preventivo di commessa (unico, creato dalla scheda progetto) ───────── */
const giorni = (a, b) => Math.round((ts(b) - ts(a)) / 864e5) + 1;
const COSTO_INV = 0.3;  // costo interno standard del materiale di proprietà: 30% del prezzo di noleggio
const MUP = (parseFloat((D.IMPOSTAZIONI.find(i => i.chiave === "ricarico_default") || {}).valore) || 10) / 100;
const SEZ_ART = { "01 audio": "AUDIO", "02 video": "VIDEO", "03 luci": "LUCI", "04 truss & rigging": "STRUTTURE", "05 arredi & palco": "ARREDI E PALCO", "06 cavi & energia": "CAVI ED ENERGIA" };
const SEZ_ORD = ["AUDIO", "SERVICE", "VIDEO", "LUCI", "STRUTTURE", "ALLESTIMENTI", "ARREDI E PALCO", "CAVI ED ENERGIA", "LOCATION", "PERSONALE", "SEGRETERIA", "GRAFICHE", "CREATIVITÀ", "TRASPORTI", "CATERING", "ALTRO", "OPZIONI"];
const SRC = { inv: "Inventario", loc: "Location", lis: "Listino servizi", gra: "Grafiche", lib: "Voce libera" };
const PV_STATO = { bozza: ["bozza", ""], inviato: ["inviato al cliente", "p-warn"], confermato: ["confermato", "p-ok"], chiuso: ["chiuso", ""] };
const SALA = idx("SALE", "sala_id"), LIS = idx("LISTINO", "voce_id"), GRA = idx("GRAFICHE", "grafica_id");
const rInv = (aid, q, mag, n) => { const p = ART[aid].prezzo_noleggio_giorno || 0; return { src: "inv", ref: aid, sez: SEZ_ART[ART[aid].categoria] || "ALTRO", desc: prod(ART[aid]), q, n, pu: p, cu: Math.round(p * COSTO_INV), mag }; };
const rLoc = (sid, n) => { const s = SALA[sid]; return { src: "loc", ref: sid, sez: "LOCATION", desc: `${LOC[s.location_id].nome} · ${s.nome}`, q: 1, n, cu: s.prezzo_giorno, pu: Math.round(s.prezzo_giorno * (1 + MUP)), forn: LOC[s.location_id].gestore_org_id }; };
const rSetup = lid => ({ src: "loc", ref: "setup:" + lid, sez: "LOCATION", desc: `${LOC[lid].nome} · allestimento e disallestimento`, q: 1, n: 1, cu: LOC[lid].costo_setup, pu: Math.round(LOC[lid].costo_setup * (1 + MUP)), forn: LOC[lid].gestore_org_id });
const rLis = (vid, q, n) => { const v = LIS[vid]; return { src: "lis", ref: vid, sez: v.categoria.toUpperCase(), desc: v.descrizione_preventivo, q, n, pu: v.prezzo_vendita, cu: v.costo_standard }; };
const rGra = (gid, q) => { const g = GRA[gid]; return { src: "gra", ref: gid, sez: "GRAFICHE", desc: `${g.nome} ${g.base_cm}×${g.altezza_cm} cm · ${g.materiale}`, q, n: 1, pu: g.prezzo_vendita, cu: g.costo, forn: g.fornitore_org_id }; };
const rCost = r => ({ src: "lib", ref: r.riga_id, sez: r.sezione, desc: r.descrizione, q: r.quantita, n: r.n_servizi, pu: r.prezzo_unitario, cu: r.costo_unitario, forn: r.fornitore_org_id, opz: r.computato === "no" });
D.PREV = [];
(function seed() {
  const byC = {}; D.PRENOTAZIONI.forEach(p => (byC[p.commessa_id] ||= []).push(p));
  const mk = (cid, stato, ver, extra, sconto = 0, invOverride) => {
    const c = COM[cid], ps = byC[cid] || [], ev = giorni(c.data_inizio, c.data_fine);
    const dal = ps.length ? ps.map(p => p.dal.slice(0, 10)).sort()[0] : addDays(c.data_inizio, -1);
    const al = ps.length ? ps.map(p => p.al.slice(0, 10)).sort().slice(-1)[0] : c.data_fine;
    const inv = invOverride || ps.map(p => rInv(p.articolo_id, p.quantita, p.magazzino_id, ev));
    const pv = { id: "PV-" + cid.slice(3), commessa: cid, ver, stato, dal, al, mag: inv[0]?.mag || "MAG-C", sconto, inoltrato: stato === "confermato" ? "2026-10-08" : "", righe: [...inv, ...extra] };
    ps.forEach(p => p.preventivo_id = pv.id);
    D.PREV.push(pv);
  };
  const cost = cid => D.COSTING.filter(r => r.commessa_id === cid);
  mk("CM-0001", "confermato", 2, cost("CM-0001").filter(r => r.sezione !== "SERVICE" && !r.descrizione.startsWith("Regia")).map(rCost), 0);
  mk("CM-0007", "confermato", 1, [rLoc("SA-03", 1), rLis("L-010", 3, 1), rLis("L-013", 1, 1), rLis("L-014", 2, 1)]);
  mk("CM-0003", "inviato", 1, [rLoc("SA-05", 1), rLoc("SA-06", 1), rSetup("LOC-03"), rGra("GR-03", 1), rGra("GR-04", 4), rLis("L-012", 4, 1), rLis("L-010", 4, 2),
    { src: "lib", ref: "", sez: "CATERING", desc: "Cena di gala servita · 4 portate", q: 160, n: 1, pu: 68, cu: 52, forn: "ORG-013" },
    { src: "lib", ref: "", sez: "ALTRO", desc: "Quartetto d'archi per l'aperitivo", q: 1, n: 1, pu: 2400, cu: 1900, forn: "", opz: true }]);
  mk("CM-0004", "chiuso", 1, [rLis("L-010", 2, 2), rLis("L-014", 2, 1)]);
  mk("CM-0002", "bozza", 1, cost("CM-0002").filter(r => !["SERVICE", "VIDEO"].includes(r.sezione)).map(rCost), 5,
    [rInv("A01", 1, "MAG-C", 1), rInv("A02", 4, "MAG-C", 1), rInv("A06", 2, "MAG-C", 1), rInv("A07", 2, "MAG-L2", 1), rInv("A10", 2, "MAG-L2", 1)]);
  D.PREV.find(p => p.commessa === "CM-0002").dal = "2027-01-19";
  D.PRENOTAZIONI = D.PRENOTAZIONI.filter(p => p.commessa_id !== "CM-0003");
})();
function pvTot(pv) {
  let sub = 0, cos = 0, opz = 0;
  pv.righe.forEach(r => { const t = r.q * r.n * r.pu; if (r.opz) opz += t; else { sub += t; cos += r.q * r.n * r.cu; } });
  const sc = Math.round(sub * (pv.sconto || 0) / 100), tot = sub - sc;
  return { sub, sc, tot, cos, opz, marg: tot ? (tot - cos) / tot : null, n: pv.righe.length };
}
(function syncRiassunti() {
  D.RIASSUNTI.forEach(r => { const pv = D.PREV.find(p => p.commessa === r.oggetto_id); if (!pv || !r.testo) return; const T = pvTot(pv);
    r.testo = r.testo.replace(/firmato a [\d.]+ € \(margine \d+%\)/, `firmato a ${T.tot.toLocaleString("it-IT")} € (margine ${Math.round(T.marg * 100)}%)`); });
})();
function rigaStato(pv, r) {
  if (r.src !== "inv") return null;
  if (pv.stato === "bozza" || pv.stato === "inviato") return verifica(r.ref, r.q, r.mag, pv.dal + " 00:00", pv.al + " 23:59");
  const p = D.PRENOTAZIONI.find(x => x.preventivo_id === pv.id && x.articolo_id === r.ref && x.magazzino_id === r.mag);
  if (!p) return { k: "", t: "—" };
  return p.stato === "richiesta" ? { k: "warn", t: "dal magazziniere" } : p.stato === "rientrata" ? { k: "", t: "rientrata" } : { k: "ok", t: "confermata" };
}
const KPILL = { ok: "p-ok", warn: "p-warn", crit: "p-crit", alt: "p-acc", "": "" };
const KSHORT = { ok: "c'è", warn: "al limite", alt: "altro magazzino", crit: "non c'è" };
const pvOf = cid => D.PREV.find(p => p.commessa === cid);
const pvEditor = () => ["G", "M"].includes(liv("COSTING"));
const shortMag = n => n.replace("Magazzino ", "").replace("Deposito ", "");

function vPrev() {
  const c = COM[S.comm], pv = pvOf(c.commessa_id), T = pvTot(pv);
  const ed = pvEditor() && pv.stato !== "chiuso";
  const st = pv.righe.map(r => rigaStato(pv, r));
  const blocchi = st.filter(x => x && x.k === "crit").length;
  const ev = giorni(c.data_inizio, c.data_fine);
  const order = x => { const i = SEZ_ORD.indexOf(x); return i < 0 ? 99 : i; };
  const groups = {}; pv.righe.forEach((r, i) => (groups[r.opz ? "OPZIONI" : r.sez] ||= []).push(i));
  const sezs = Object.keys(groups).sort((x, y) => order(x) - order(y));
  const inviati = D.PRENOTAZIONI.filter(p => p.preventivo_id === pv.id);
  const fmt = n => n.toLocaleString("it-IT");
  const clientTxt = sezs.map(sz => `${sz}\n` + groups[sz].map(i => { const r = pv.righe[i]; return `n°${r.q} ${r.desc}${r.n > 1 ? ` × ${r.n} ${r.src === "inv" || r.src === "loc" ? "gg" : "servizi"}` : ""} - EURO ${fmt(r.q * r.n * r.pu)} + IVA`; }).join("\n")).join("\n\n")
    + `\n\nQUOTAZIONE - EURO ${fmt(T.sub)} + IVA` + (T.sc ? `\nSCONTO ${pv.sconto}% - EURO ${fmt(T.sc)}` : "") + `\nTOTALE - EURO ${fmt(T.tot)} + IVA`;
  const _cell = (i, k, v, cls = "") => ed ? `<input class="cell ${cls}" id="c-${k}-${i}" value="${esc(v)}" data-cell="${k}" data-i="${i}" ${k === "desc" ? "" : 'type="number" min="0" step="any"'} aria-label="${k}">` : `<span class="cell ro ${cls}">${k === "desc" ? esc(v) : (k === "pu" || k === "cu" ? eur(v) : v)}</span>`;
  const versioni = pv.versioni || [];
  return `
  <div class="pv-top">
    <div class="pv-sum" id="pv-strip">${stripHTML(pv, T)}
    </div>
    ${blocchi && pv.stato !== "confermato" ? `<div class="alert crit" style="margin-top:8px"><span class="dot"></span><div><b>${blocchi} ${blocchi > 1 ? "voci di magazzino non disponibili" : "voce di magazzino non disponibile"}</b> nel periodo ${fd(pv.dal)}–${fd(pv.al)}.</div></div>` : ""}
    <div class="pv-tools">
      <details class="tool" ${S.pvTool === "testata" ? "open" : ""}><summary data-pvtool="testata">Testata</summary><div class="form" style="padding:10px 0 4px"><div class="row3">
        <div class="field"><label class="lbl" for="pv-dal">Uscita materiale</label><input type="date" id="pv-dal" value="${pv.dal}" data-pv="dal" ${ed ? "" : "disabled"}></div>
        <div class="field"><label class="lbl" for="pv-al">Rientro</label><input type="date" id="pv-al" value="${pv.al}" data-pv="al" ${ed ? "" : "disabled"}></div>
        <div class="field"><label class="lbl" for="pv-mag">Magazzino</label><select id="pv-mag" data-pv="mag" ${ed ? "" : "disabled"}>${D.MAGAZZINI.map(x => `<option value="${x.magazzino_id}" ${pv.mag === x.magazzino_id ? "selected" : ""}>${esc(x.nome)}</option>`).join("")}</select></div>
        <div class="field"><label class="lbl" for="pv-sconto">Sconto %</label><input type="number" min="0" max="50" id="pv-sconto" value="${pv.sconto || 0}" data-pv="sconto" ${ed ? "" : "disabled"}></div></div></div></details>
      ${ed ? `<details class="tool" ${S.pvTool === "fonti" ? "open" : ""}><summary data-pvtool="fonti">Aggiungi da inventario, location, listino, grafiche</summary><div style="padding:10px 0 4px">${vFonti(pv, c, ev)}</div></details>` : ""}
      <details class="tool" ${S.pvTool === "cliente" ? "open" : ""}><summary data-pvtool="cliente">Testo per il cliente</summary><pre class="client-prev" style="margin-top:8px">${esc(clientTxt)}</pre></details>
      ${versioni.length ? `<details class="tool" ${S.pvTool === "versioni" ? "open" : ""}><summary data-pvtool="versioni">Versioni su Drive</summary><div class="tbl-wrap" style="padding-top:8px"><table><tbody>${versioni.slice().reverse().map(v => `<tr><td>${esc(v.file)}</td><td class="small muted">02_ECONOMICO · ${fdt(v.quando)}</td><td class="num">${eur(v.tot)}</td></tr>`).join("")}</tbody></table></div></details>` : ""}
    </div>
  </div>
  ${gsheet(pv, c)}`;
}
function gsheet(pv, c) {
  const order = x => { const i = SEZ_ORD.indexOf(x); return i < 0 ? 99 : i; };
  const groups = {}; pv.righe.forEach(r => (groups[r.opz ? "OPZIONI" : r.sez] ||= []).push(r));
  const sezs = Object.keys(groups).sort((x, y) => order(x) - order(y));
  const T = pvTot(pv), COLS = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let n = 1; const rows = [];
  const row = (cls, cells, extra = "") => rows.push(`<tr class="${cls}"${extra}><th>${n++}</th>${cells.map((x, i) => `<td class="${i >= 2 ? "num" : ""}">${x}</td>`).join("")}</tr>`);
  row("gs-title", [`<b>${esc(codice(c))} · ${esc(c.titolo_evento)}</b>`, "", "", "", "", "", "", ""]);
  row("gs-head", ["Sezione", "Voce", "Q.tà", "gg / n", "Prezzo", "Costo", "Totale", "Marg."]);
  const sub = {};
  sezs.forEach(sz => {
    const open = !S.pvHide.has(sz), first = n, rs = groups[sz];
    const st = rs.reduce((x, r) => x + r.q * r.n * r.pu, 0), sc = rs.reduce((x, r) => x + r.q * r.n * r.cu, 0);
    row("gs-sez", [`<button class="gs-grp" data-sez="${esc(sz)}" aria-expanded="${open}">${open ? "−" : "+"}</button><b>${esc(sz)}</b>`, `<span class="muted">${rs.length} ${rs.length === 1 ? "voce" : "voci"}</span>`, "", "", "", `<span class="muted">${eur(sc)}</span>`, `<b>${eur(st)}</b>`, `<span class="muted">${pct(st ? (st - sc) / st : null)}</span>`]);
    sub[sz] = n - 1;
    if (open) rs.forEach(r => { const tot = r.q * r.n * r.pu, m = r.pu ? (r.pu - r.cu) / r.pu : null;
      row("gs-r" + (r.opz ? " opz" : ""), [`<span class="muted small">${esc(sz)}</span>`, `${esc(r.desc)}${r.src === "inv" ? ` <span class="gs-tag">${esc(shortMag(MAG[r.mag].nome))}</span>` : r.forn ? ` <span class="gs-tag">${esc(org(r.forn))}</span>` : ""}`, r.q, r.n, eur(r.pu), eur(r.cu), `<span title="=C${n}*D${n}*E${n}">${eur(tot)}</span>`, `<span class="${m != null && m < .15 ? "low-m" : ""}">${pct(m)}</span>`]); });
  });
  row("gs-blank", ["", "", "", "", "", "", "", ""]);
  row("gs-tot", ["", "<b>Quotazione</b>", "", "", "", `<span class="muted">${eur(T.cos)}</span>`, `<b title="=SUM(G:G sezioni)">${eur(T.sub)}</b>`, ""]);
  if (T.sc) row("gs-tot", ["", `Sconto ${pv.sconto}%`, "", "", "", "", `− ${eur(T.sc)}`, ""]);
  row("gs-tot big", ["", "<b>Totale + IVA</b>", "", "", "", "", `<b>${eur(T.tot)}</b>`, `<b>${pct(T.marg)}</b>`]);
  if (T.opz) row("gs-tot", ["", `<span class="muted">Opzioni, fuori dal totale</span>`, "", "", "", "", `<span class="muted">${eur(T.opz)}</span>`, ""]);
  return `<div class="gs">
    <div class="gs-bar"><span class="gs-logo" aria-hidden="true"></span><span><b>${esc(codice(c))}_PREVENTIVO</b> <span class="muted">· Google Sheets incorporato · 02_ECONOMICO</span></span>
      <span class="gs-right"><span class="pill p-ok">sincronizzato con Doffy</span><button class="btn ghost sm" type="button" title="Nella demo il foglio è simulato">Apri in Google Sheets</button></span></div>
    <div class="gs-fx"><span class="gs-ref">G${sub[sezs[0]] || 3}</span><span class="gs-f">=SUM(G${(sub[sezs[0]] || 3) + 1}:G${(sub[sezs[1]] || 10) - 1})</span></div>
    <div class="gs-wrap"><table class="gs-t"><thead><tr><th></th>${COLS.map(l => `<th>${l}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>
    <div class="gs-tabs"><span class="on">Preventivo</span><span>Costing</span><span>Cliente</span><span class="muted">+</span></div>
  </div>
  <p class="small muted" style="margin-top:8px">Nella demo il foglio è una simulazione. In Doffy sarà il Google Sheet vero della commessa, incorporato: si modifica lì, e Doffy rilegge le righe per aggiornare numeri, magazzino e persone.</p>`;
}
function pvActions(pv, blocchi, inviati) {
  if (!pvEditor()) return "";
  if (pv.stato === "bozza") return `<button class="btn ghost" data-pvact="invia" ${pv.righe.length ? "" : "disabled"}>Invia al cliente</button>`;
  if (pv.stato === "inviato") return `<button class="btn ghost" data-pvact="conferma" ${blocchi ? "disabled" : ""}>Il cliente ha confermato</button><button class="btn ghost" data-pvact="nuova">Riapri in bozza</button>`;
  if (pv.stato === "confermato") return `<span class="small"><b>Inoltrato al magazzino</b> · ${inviati.filter(p => p.stato === "richiesta").length} in attesa · ${inviati.filter(p => p.stato === "confermata").length} confermate</span><button class="btn ghost" data-calgo="${pv.id}">Vedi nel calendario</button>`;
  return "";
}
function vFonti(pv, c, ev) {
  const src = S.src || "inv", q = (S.mag.q || "").toLowerCase();
  const match = t => !q || t.toLowerCase().includes(q);
  let list = "";
  if (src === "inv") {
    const cats = [...new Set(D.ARTICOLI.filter(a => a.consumabile !== "sì").map(a => a.categoria))];
    const arts = D.ARTICOLI.filter(a => a.consumabile !== "sì" && (S.mag.cat === "tutte" || a.categoria === S.mag.cat) && match(a.nome + " " + a.codice + " " + (a.marca || "")));
    list = `<div class="controls"><div class="field"><label class="lbl" for="m-cat">Categoria</label><select id="m-cat" data-m="cat"><option value="tutte">Tutte</option>${cats.map(x => `<option ${S.mag.cat === x ? "selected" : ""}>${esc(x)}</option>`).join("")}</select></div>
      <div class="field" style="flex:1 1 140px"><label class="lbl" for="m-q">Cerca</label><input type="search" id="m-q" value="${esc(S.mag.q)}" placeholder="es. mixer, truss" data-m="q"></div></div>
      <p class="small muted" style="margin:0 0 6px">Liberi in ${esc(shortMag(MAG[pv.mag].nome))} · ${fd(pv.dal)}–${fd(pv.al)}</p>
      <table><tbody>${arts.map(a => { const d = disp(a.articolo_id, pv.mag, pv.dal + " 00:00", pv.al + " 23:59"); const lib = d ? Math.max(0, d.libero) : null;
        return `<tr><td><div class="art-name">${esc(prod(a))}</div><div class="small muted">${eur(a.prezzo_noleggio_giorno)}/giorno</div></td>
        <td class="num av-cell ${lib === 0 ? "zero" : ""}">${lib == null ? `<span class="muted">—</span>` : `<b>${lib}</b> / ${d.tot}`}</td>
        <td style="text-align:right"><button class="btn ghost sm" data-addinv="${a.articolo_id}">+ Aggiungi</button></td></tr>`; }).join("")}</tbody></table>`;
  } else if (src === "loc") {
    const locs = D.LOCATION.slice().sort((a, b) => (b.location_id === c.location_id) - (a.location_id === c.location_id));
    list = locs.map(l => `<h3 style="margin:10px 0 4px">${esc(l.nome)} ${l.location_id === c.location_id ? pill("location dell'evento", "p-acc") : ""}</h3>
      <table><tbody>${D.SALE.filter(s => s.location_id === l.location_id && s.prezzo_giorno).map(s => `<tr><td>${esc(s.nome)}<div class="small muted">${s.mq} mq · platea ${s.capienza_platea || "—"} · banchetto ${s.capienza_banchetto || "—"}</div></td><td class="num">${eur(Math.round(s.prezzo_giorno * (1 + MUP)))}/g</td><td style="text-align:right"><button class="btn ghost sm" data-addloc="${s.sala_id}">+ Aggiungi</button></td></tr>`).join("")}
      ${l.costo_setup ? `<tr><td>Allestimento e disallestimento<div class="small muted">${esc(l.carico_scarico)}</div></td><td class="num">${eur(Math.round(l.costo_setup * (1 + MUP)))}</td><td style="text-align:right"><button class="btn ghost sm" data-addloc="setup:${l.location_id}">+ Aggiungi</button></td></tr>` : ""}</tbody></table>`).join("");
  } else if (src === "lis") {
    const vv = D.LISTINO.filter(v => match(v.descrizione_preventivo + " " + v.codice + " " + v.categoria));
    list = `<div class="controls"><div class="field" style="flex:1 1 140px"><label class="lbl" for="m-q">Cerca</label><input type="search" id="m-q" value="${esc(S.mag.q)}" placeholder="es. tecnico, hostess" data-m="q"></div></div>
      <table><tbody>${vv.map(v => `<tr><td>${esc(v.descrizione_preventivo)}<div class="small muted"><span class="mono">${esc(v.codice)}</span> · ${esc(v.categoria)} · per ${esc(v.unita)}</div></td><td class="num">${eur(v.prezzo_vendita)}</td><td style="text-align:right"><button class="btn ghost sm" data-addlis="${v.voce_id}">+ Aggiungi</button></td></tr>`).join("")}</tbody></table>`;
  } else if (src === "gra") {
    list = `<table><tbody>${D.GRAFICHE.map(g => `<tr><td>${esc(g.nome)}<div class="small muted"><span class="mono">${esc(g.codice)}</span> · ${g.base_cm}×${g.altezza_cm} cm · ${esc(g.materiale)} · ${esc(org(g.fornitore_org_id))}</div></td><td class="num">${eur(g.prezzo_vendita)}</td><td style="text-align:right"><button class="btn ghost sm" data-addgra="${g.grafica_id}">+ Aggiungi</button></td></tr>`).join("")}</tbody></table>`;
  } else {
    list = `<form class="form" id="libform">
      <div class="row"><div class="field"><label class="lbl" for="lb-sez">Sezione</label><select id="lb-sez">${SEZ_ORD.filter(s => s !== "OPZIONI").map(s => `<option>${s}</option>`).join("")}</select></div>
        <div class="field"><label class="lbl" for="lb-forn">Fornitore</label><select id="lb-forn"><option value="">interno / nessuno</option>${D.ORGANIZZAZIONI.filter(o => o.e_fornitore === "sì").map(o => `<option value="${o.org_id}">${esc(o.nome_breve)}</option>`).join("")}</select></div></div>
      <div class="field"><label class="lbl" for="lb-desc">Descrizione per il cliente</label><input id="lb-desc" required placeholder="es. Noleggio ledwall P3.9 da terzi"></div>
      <div class="row"><div class="field"><label class="lbl" for="lb-q">Quantità</label><input id="lb-q" type="number" min="1" value="1"></div><div class="field"><label class="lbl" for="lb-n">Giorni / servizi</label><input id="lb-n" type="number" min="1" value="${ev}"></div></div>
      <div class="row"><div class="field"><label class="lbl" for="lb-cu">Costo unitario €</label><input id="lb-cu" type="number" min="0" value="0"></div><div class="field"><label class="lbl" for="lb-mup">Ricarico %</label><input id="lb-mup" type="number" min="0" value="${Math.round(MUP * 100)}"></div></div>
      <button class="btn" type="submit">Aggiungi voce</button>
</form>`;
  }
  return `<div class="srctabs" role="tablist">${Object.entries(SRC).map(([k, t]) => `<button role="tab" data-src="${k}" aria-selected="${src === k}">${t}</button>`).join("")}</div>
    <div class="tbl-wrap">${list}</div>`;
}

/* ───────── piano di lavoro: parametri → fasi → fabbisogni → occupazioni ───────── */
const FASI_TIPI = { carico: "Carico in magazzino", andata: "Viaggio di andata", allestimento: "Allestimento", prove: "Prove e convocazione", evento: "Evento", smontaggio: "Smontaggio", ritorno: "Viaggio di ritorno", scarico: "Scarico e controllo" };
const FASI_BREVE = { carico: "Carico", andata: "Andata", allestimento: "Allestimento", prove: "Prove", evento: "Evento", smontaggio: "Smontaggio", ritorno: "Ritorno", scarico: "Scarico" };
const pad2 = n => String(n).padStart(2, "0");
const fmtDT = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
const addMin = (s, m) => { const d = new Date(s.replace(" ", "T")); d.setMinutes(d.getMinutes() + m); return fmtDT(d); };
const durH = (a, b) => Math.round((ts(b) - ts(a)) / 36e5 * 10) / 10;
const hh = s => s.slice(11, 16);
const VIAGGIO = { "LOC-01": 30, "LOC-02": 120, "LOC-03": 75 }; // minuti dal magazzino centrale
const ALERT_REGOLE = [{ giorni: 30, k: "warn", t: "avviso" }, { giorni: 10, k: "crit", t: "urgente" }];
const DRIVE_SUB = ["01_BRIEF E COMMERCIALE", "02_ECONOMICO", "03_FORNITORI", "04_PRODUZIONE", "05_LOGISTICA", "06_CREATIVITÀ", "07_CLIENTE", "08_POST EVENTO"];

function pianoDefault(c) {
  return { ev_inizio: "09:00", ev_fine: "18:00", all_giorni: 1, all_inizio: "08:00", all_fine: "20:00", prove_ore: 2, smo_ore: 5,
    mag: "MAG-C", viaggio_min: VIAGGIO[c.location_id] ?? 60, carico: "giorno prima", carico_ore: 4, scarico: "mattina dopo", scarico_ore: 4 };
}
function generaFasi(c, P) {
  const out = [], days = [], allDays = [];
  for (let k = c.data_inizio; k <= c.data_fine; k = addDays(k, 1)) days.push(k);
  for (let i = +P.all_giorni; i >= 1; i--) allDays.push(addDays(c.data_inizio, -i));
  const luogo = c.location_id ? LOC[c.location_id].nome : (c.location_nome || "location da definire"), mag = MAG[P.mag].nome;
  const proveDa = addMin(`${days[0]} ${P.ev_inizio}`, -P.prove_ore * 60);
  const primo = allDays.length ? `${allDays[0]} ${P.all_inizio}` : proveDa;
  const partenza = addMin(primo, -P.viaggio_min);
  const cFine = P.carico === "giorno prima" ? `${addDays(partenza.slice(0, 10), -1)} 18:00` : partenza;
  out.push({ tipo: "carico", dal: addMin(cFine, -P.carico_ore * 60), al: cFine, luogo: mag });
  out.push({ tipo: "andata", dal: partenza, al: primo, luogo: `${shortMag(mag)} → ${luogo}` });
  allDays.forEach((k, i) => out.push({ tipo: "allestimento", n: allDays.length > 1 ? i + 1 : 0, dal: `${k} ${P.all_inizio}`, al: `${k} ${P.all_fine}`, luogo }));
  if (+P.prove_ore > 0) out.push({ tipo: "prove", dal: proveDa, al: `${days[0]} ${P.ev_inizio}`, luogo });
  days.forEach((k, i) => out.push({ tipo: "evento", n: days.length > 1 ? i + 1 : 0, dal: `${k} ${P.ev_inizio}`, al: P.ev_fine > P.ev_inizio ? `${k} ${P.ev_fine}` : `${addDays(k, 1)} ${P.ev_fine}`, luogo }));
  const fineEv = out[out.length - 1].al, fineSmo = addMin(fineEv, P.smo_ore * 60);
  out.push({ tipo: "smontaggio", dal: fineEv, al: fineSmo, luogo });
  const rientro = addMin(fineSmo, P.viaggio_min);
  out.push({ tipo: "ritorno", dal: fineSmo, al: rientro, luogo: `${luogo} → ${shortMag(mag)}` });
  const sc0 = P.scarico === "subito" ? rientro : `${addDays(rientro.slice(0, 10), 1)} 09:00`;
  out.push({ tipo: "scarico", dal: sc0, al: addMin(sc0, P.scarico_ore * 60), luogo: mag });
  return out.map((f, i) => ({ ...f, id: `${c.commessa_id}-F${i + 1}`, commessa: c.commessa_id }));
}
const faseNome = f => FASI_TIPI[f.tipo] + (f.n ? ` · giorno ${f.n}` : "");

/* dati del piano (demo) */
D.PIANO = {}; D.FASI = []; D.FABB = []; D.ORE = {};
function setPiano(cid, patch) { const c = COM[cid]; D.PIANO[cid] = { ...pianoDefault(c), ...patch }; D.FASI = D.FASI.filter(f => f.commessa !== cid).concat(generaFasi(c, D.PIANO[cid])); }
let fbN = 0;
const fabb = (cid, ruolo, fasi, slots) => D.FABB.push({ id: "FB-" + pad2(++fbN), commessa: cid, ruolo, fasi, slots: slots.map(s => s ? { p: s[0], st: s[1] } : { p: "", st: "" }) });
(function seedPiano() {
  Object.assign(COM["CM-0001"], { referente_contatto_id: "CT-01", sales_persona_id: "P07", catering_org_id: "ORG-013" });
  Object.assign(COM["CM-0007"], { referente_contatto_id: "CT-03", sales_persona_id: "P07" });
  Object.assign(COM["CM-0003"], { sales_persona_id: "P02", catering_org_id: "ORG-013" });
  Object.assign(COM["CM-0002"], { referente_contatto_id: "CT-03", sales_persona_id: "P07" });
  setPiano("CM-0001", { ev_inizio: "09:00", ev_fine: "18:00", prove_ore: 1.5, smo_ore: 5 });
  setPiano("CM-0007", { ev_inizio: "10:00", ev_fine: "14:00", all_giorni: 0, prove_ore: 2, smo_ore: 3 });
  setPiano("CM-0003", { ev_inizio: "19:30", ev_fine: "23:30", all_inizio: "09:00", all_fine: "19:00", prove_ore: 3, smo_ore: 4 });
  setPiano("CM-0002", { ev_inizio: "09:30", ev_fine: "17:30" });
  fabb("CM-0001", "Magazziniere", ["carico", "scarico"], [["P09", "conf"]]);
  fabb("CM-0001", "Autista e facchino", ["andata", "ritorno"], [["P09", "conf"], null]);
  fabb("CM-0001", "Rigger", ["allestimento", "smontaggio"], [["P13", "conf"]]);
  fabb("CM-0001", "Fonico", ["allestimento", "prove", "evento"], [["P10", "conf"]]);
  fabb("CM-0001", "Regia video", ["allestimento", "prove", "evento"], [["P11", "conf"]]);
  fabb("CM-0001", "Hostess accoglienza", ["evento"], [["P14", "conf"], null]);
  fabb("CM-0001", "Segreteria e accrediti", ["prove", "evento"], [["P12", "conf"]]);
  fabb("CM-0007", "Fonico", ["prove", "evento"], [["P10", "conf"]]);
  fabb("CM-0007", "Accrediti", ["prove", "evento"], [["P12", "opz"]]);
  fabb("CM-0007", "Autista e facchino", ["carico", "andata", "ritorno", "scarico"], [null]);
  fabb("CM-0003", "Magazziniere", ["carico", "scarico"], [["P09", "conf"]]);
  fabb("CM-0003", "Rigger", ["allestimento", "smontaggio"], [["P13", "opz"]]);
  fabb("CM-0003", "Tecnico luci", ["allestimento", "prove", "evento"], [null, null]);
  fabb("CM-0003", "Hostess", ["evento"], [null, null, null, null]);
  fabb("CM-0002", "Fonico", ["allestimento", "prove", "evento"], [null]);
  fabb("CM-0002", "Regia video", ["allestimento", "prove", "evento"], [null]);
  // gli impegni generati dal piano sostituiscono quelli scritti a mano; restano quelli fuori dal piano (es. sopralluogo)
  D.IMPEGNI = D.IMPEGNI.filter(i => i.impegno_id === "IM-01");
})();

/* occupazioni: derivate dal piano + impegni manuali, con i conflitti */
let OCC = null;
function buildOcc() {
  const out = [];
  D.FABB.forEach(f => { const fasi = D.FASI.filter(x => x.commessa === f.commessa && f.fasi.includes(x.tipo));
    f.slots.forEach((s, si) => { if (!s.p) return; fasi.forEach(x => out.push({ id: `${f.id}-${si}-${x.id}`, persona: s.p, commessa: f.commessa, fase: x, fabb: f, inizio: x.dal, fine: x.al, stato: s.st, ruolo: f.ruolo, attivita: `${f.ruolo} · ${FASI_BREVE[x.tipo]}${x.n ? " " + x.n : ""}`, luogo: x.luogo })); }); });
  D.IMPEGNI.forEach(i => out.push({ id: i.impegno_id, persona: i.persona_id, commessa: i.commessa_id, inizio: i.inizio, fine: i.fine, stato: i.stato === "proposto" ? "opz" : "conf", ruolo: "", attivita: i.attivita, luogo: i.luogo, manuale: true }));
  out.forEach(o => {
    const a = ts(o.inizio), b = ts(o.fine);
    o.conflitti = out.filter(x => x !== o && x.persona === o.persona && ts(x.inizio) < b && a < ts(x.fine)).map(x => `${codice(COM[x.commessa])} ${x.attivita}`)
      .concat(D.INDISPONIBILITA.filter(x => x.persona_id === o.persona && ts(x.dal) < b && a < ts(x.al)).map(x => `non disponibile (${x.motivo})`));
  });
  return out;
}
const occ = () => OCC || (OCC = buildOcc());
function titoloCal(o) {
  const c = COM[o.commessa], luogo = o.luogo || "";
  return `${o.stato === "opz" ? "OPZ · " : ""}[${codice(c)}] ${o.attivita} · ${org(c.cliente_org_id)}${luogo && !luogo.includes("→") ? " · " + luogo : ""}`;
}
function scoperti(cid) { let n = 0; const det = []; D.FABB.filter(f => f.commessa === cid).forEach(f => { const k = f.slots.filter(s => !s.p).length; if (k) { n += k; det.push(`${k} ${f.ruolo.toLowerCase()}`); } }); return { n, det }; }
function primaFase(cid) { return D.FASI.filter(f => f.commessa === cid).map(f => f.dal).sort()[0]; }
const ggA = d => Math.round((ts(d.slice(0, 10)) - ts(TODAY)) / 864e5);
function alertPersone(c) {
  const sc = scoperti(c.commessa_id), pf = primaFase(c.commessa_id);
  if (!sc.n || !pf) return null;
  const g = ggA(pf), r = ALERT_REGOLE.slice().sort((a, b) => a.giorni - b.giorni).find(x => g <= x.giorni);
  return { g, r, sc, da: addDays(pf.slice(0, 10), -ALERT_REGOLE[0].giorni) };
}
const canPlan = cid => { const l = liv("TEAM_CAL"); return l === "G" && (ruoli(S.user).some(r => ["SYS", "DIR"].includes(r)) || inTeam(cid)) || COM[cid].pm_persona_id === S.user || COM[cid].backup_persona_id === S.user; };
const canCreate = () => ruoli(S.user).some(r => ["PM", "COM", "DIR", "SYS"].includes(r));
const COLS = ["--c1", "--c2", "--c3", "--c4", "--c5", "--c6", "--c7", "--c8"];
const colOf = cid => `var(${COLS[(Math.max(0, D.COMMESSE.findIndex(c => c.commessa_id === cid)) * 5) % COLS.length]})`;

/* ── scheda: piano di lavoro e team ── */
function vPiano(c) {
  const cid = c.commessa_id, P = D.PIANO[cid], ed = canPlan(cid);
  if (!P) return `<section class="panel"><h2>Piano di lavoro</h2>
    ${ed ? `<button class="btn" data-genpiano="${cid}">Genera il piano dalle date dell'evento</button>` : ""}</section>`;
  const fasi = D.FASI.filter(f => f.commessa === cid).sort((a, b) => a.dal.localeCompare(b.dal));
  const fb = D.FABB.filter(f => f.commessa === cid), O = occ().filter(o => o.commessa === cid);
  const al = alertPersone(c), sc = scoperti(cid);
  const opt = (v, cur) => `<option ${v === cur ? "selected" : ""}>${v}</option>`;
  return `<section class="panel" id="piano"><h2>Piano di lavoro <span class="muted">${fasi.length} fasi · ${fb.reduce((n, f) => n + f.slots.length, 0)} posti · ${sc.n ? sc.n + " scoperti" : "tutti coperti"}</span></h2>
    <div class="phases">${fasi.map(f => `<div class="ph ph-${f.tipo}">
      <div class="ph-t"><b>${esc(faseNome(f))}</b><span class="small muted">${esc(f.luogo)}</span></div>
      ${ed ? `<div class="ph-in"><input type="date" id="fd-${f.id}" value="${f.dal.slice(0, 10)}" data-fase="${f.id}" data-k="d" aria-label="Giorno ${esc(faseNome(f))}">
        <input type="time" id="fa-${f.id}" value="${hh(f.dal)}" data-fase="${f.id}" data-k="a" aria-label="Inizio"><span class="muted">–</span>
        <input type="time" id="fb-${f.id}" value="${hh(f.al)}" data-fase="${f.id}" data-k="b" aria-label="Fine"></div>`
        : `<div class="mono small">${fd(f.dal)} · ${hh(f.dal)}–${hh(f.al)}${f.al.slice(0, 10) !== f.dal.slice(0, 10) ? " (+1)" : ""}</div>`}
      <span class="mono small muted">${durH(f.dal, f.al)} h</span></div>`).join("")}</div>
    ${ed ? `<details class="pset"><summary>Parametri del piano</summary>
      <div class="form" style="margin-top:10px">
        <div class="row3"><div class="field"><label class="lbl" for="pp-ev_inizio">Evento: inizio</label><input type="time" id="pp-ev_inizio" value="${P.ev_inizio}" data-pp="ev_inizio"></div>
          <div class="field"><label class="lbl" for="pp-ev_fine">Evento: fine</label><input type="time" id="pp-ev_fine" value="${P.ev_fine}" data-pp="ev_fine"></div>
          <div class="field"><label class="lbl" for="pp-prove_ore">Prove (ore prima)</label><input type="number" min="0" step="0.5" id="pp-prove_ore" value="${P.prove_ore}" data-pp="prove_ore"></div></div>
        <div class="row3"><div class="field"><label class="lbl" for="pp-all_giorni">Giorni di allestimento</label><input type="number" min="0" max="5" id="pp-all_giorni" value="${P.all_giorni}" data-pp="all_giorni"></div>
          <div class="field"><label class="lbl" for="pp-all_inizio">Allestimento dalle</label><input type="time" id="pp-all_inizio" value="${P.all_inizio}" data-pp="all_inizio"></div>
          <div class="field"><label class="lbl" for="pp-all_fine">alle</label><input type="time" id="pp-all_fine" value="${P.all_fine}" data-pp="all_fine"></div></div>
        <div class="row3"><div class="field"><label class="lbl" for="pp-smo_ore">Smontaggio (ore)</label><input type="number" min="0" step="0.5" id="pp-smo_ore" value="${P.smo_ore}" data-pp="smo_ore"></div>
          <div class="field"><label class="lbl" for="pp-mag">Magazzino di partenza</label><select id="pp-mag" data-pp="mag">${D.MAGAZZINI.map(m => `<option value="${m.magazzino_id}" ${m.magazzino_id === P.mag ? "selected" : ""}>${esc(m.nome)}</option>`).join("")}</select></div>
          <div class="field"><label class="lbl" for="pp-viaggio_min">Viaggio (minuti)</label><input type="number" min="0" step="5" id="pp-viaggio_min" value="${P.viaggio_min}" data-pp="viaggio_min"></div></div>
        <div class="row3"><div class="field"><label class="lbl" for="pp-carico">Carico</label><select id="pp-carico" data-pp="carico">${opt("giorno prima", P.carico)}${opt("stesso giorno", P.carico)}</select></div>
          <div class="field"><label class="lbl" for="pp-carico_ore">Carico (ore)</label><input type="number" min="0" step="0.5" id="pp-carico_ore" value="${P.carico_ore}" data-pp="carico_ore"></div>
          <div class="field"><label class="lbl" for="pp-scarico">Scarico al rientro</label><select id="pp-scarico" data-pp="scarico">${opt("subito", P.scarico)}${opt("mattina dopo", P.scarico)}</select></div></div>
      </div></details>` : ""}
  </section>
  <section class="panel"><h2>Persone <span class="muted">${al ? (al.r ? pill(`alert ${al.r.t}`, al.r.k === "crit" ? "p-crit" : "p-warn") : `alert dal ${fd(al.da)}`) : ""}</span></h2>
    ${fb.length ? `<div class="fabbs">${fb.map(f => `<div class="fb">
      <div class="fb-h"><div><b>${esc(f.ruolo)}</b> <span class="muted small">× ${f.slots.length}</span><div class="fb-fasi">${f.fasi.map(t => `<span class="tag ph-${t}">${FASI_BREVE[t]}</span>`).join("")}</div></div>
        <span class="mono small muted">${Math.round(D.FASI.filter(x => x.commessa === cid && f.fasi.includes(x.tipo)).reduce((h, x) => h + durH(x.dal, x.al), 0) * 10) / 10} h a persona</span></div>
      ${f.slots.map((s, si) => { const mine = O.filter(o => o.fabb === f && o.persona === s.p), cf = [...new Set(mine.flatMap(o => o.conflitti))];
        return `<div class="slot ${s.p ? "" : "empty"}">
        ${ed && s.st !== "conf" ? `<select id="sl-${f.id}-${si}" data-slot="${f.id}" data-i="${si}" aria-label="Persona per ${esc(f.ruolo)}"><option value="">— scoperto —</option>${candidati(f, s.p).map(p => `<option value="${p.id}" ${p.id === s.p ? "selected" : ""}>${esc(p.label)}</option>`).join("")}</select>`
          : `<span class="sl-name">${s.p ? `<span class="av">${ini(s.p)}</span>${esc(nome(s.p))}` : `<span class="muted">scoperto</span>`}</span>`}
        <span class="sl-st">${s.p ? pill(s.st === "conf" ? "confermata" : "opzionata", s.st === "conf" ? "p-ok" : "p-warn") : ""}${cf.length ? ` <span title="${esc(cf.join(" · "))}">${pill("conflitto", "p-crit")}</span>` : ""}</span>
        ${ed && s.p ? `<span class="sl-act">${s.st === "opz" ? `<button class="btn sm" data-slconf="${f.id}" data-i="${si}">Conferma</button>` : `<button class="linkbtn" data-slopz="${f.id}" data-i="${si}">riporta a opzione</button>`}
          <button class="icon-btn" data-sloff="${f.id}" data-i="${si}" aria-label="Togli">×</button></span>` : ""}
        ${cf.length ? `<div class="sl-cf small">${esc(cf.slice(0, 2).join(" · "))}${cf.length > 2 ? ` e altri ${cf.length - 2}` : ""}</div>` : ""}</div>`; }).join("")}
      ${ed ? `<div class="fb-foot"><button class="linkbtn" data-sladd="${f.id}">+ un posto</button><button class="linkbtn" data-fbrm="${f.id}">togli il ruolo</button></div>` : ""}
    </div>`).join("")}</div>` : `<p class="muted small">Nessun ruolo.</p>`}
    ${ed ? `<form class="fb-new" id="fbform" data-cid="${cid}">
      <div class="field" style="flex:1 1 160px"><label class="lbl" for="fb-ruolo">Nuovo ruolo</label><input id="fb-ruolo" placeholder="es. Tecnico luci" required></div>
      <div class="field" style="width:70px"><label class="lbl" for="fb-q">Posti</label><input id="fb-q" type="number" min="1" max="20" value="1"></div>
      <fieldset class="fb-chk"><legend class="lbl">Fasi</legend>${Object.keys(FASI_TIPI).map(t => `<label><input type="checkbox" name="fbf" value="${t}" ${["allestimento", "evento"].includes(t) ? "checked" : ""}> ${FASI_BREVE[t]}</label>`).join("")}</fieldset>
      <button class="btn ghost" type="submit">Aggiungi</button></form>
      ${pvOf(cid) ? `<button class="linkbtn" data-fbprev="${cid}" style="margin-top:8px">Importa ruoli dal preventivo</button>` : ""}` : ""}
  </section>`;
}
function candidati(f, cur) {
  const fasi = D.FASI.filter(x => x.commessa === f.commessa && f.fasi.includes(x.tipo));
  return D.PERSONE.filter(p => p.persona_id !== "P01" && p.funzione_principale !== "amministrazione" && (p.persona_id === cur || !f.slots.some(s => s.p === p.persona_id))).map(p => {
    const busy = fasi.some(x => occ().some(o => o.persona === p.persona_id && o.fabb !== f && ts(o.inizio) < ts(x.al) && ts(x.dal) < ts(o.fine)) || D.INDISPONIBILITA.some(i => i.persona_id === p.persona_id && ts(i.dal) < ts(x.al) && ts(x.dal) < ts(i.al)));
    const kw = { audio: /fonic|audio/i, video: /video|regia/i, luci: /luci/i, rigger: /rigger|strutt/i, hostess: /hostess|accogl/i, magazzino: /magazz|autist|facchin|carico/i, segreteria: /segreter|accredit/i };
    const fit = Object.entries(kw).some(([k, re]) => p.funzione_principale.includes(k) && re.test(f.ruolo));
    return { id: p.persona_id, busy, fit, label: `${p.nome} ${p.cognome} · ${p.funzione_principale}${busy ? " · occupato" : " · libero"}` };
  }).sort((a, b) => (a.id === cur ? -1 : b.id === cur ? 1 : (b.fit - a.fit) || (a.busy - b.busy)));
}

/* ── vista Calendario: persona (settimana), planning, timesheet ── */
const monday = k => { const d = new Date(k + "T00:00"), w = (d.getDay() + 6) % 7; return addDays(k, -w); };
const GGL = ["lun", "mar", "mer", "gio", "ven", "sab", "dom"];
function calPersone() {
  const ext = !liv("TEAM_CAL") || liv("TEAM_CAL") === "P";
  return ext ? [S.user] : D.PERSONE.filter(p => p.persona_id !== "P01" && p.funzione_principale !== "amministrazione").map(p => p.persona_id);
}
function vCal() {
  const pers = calPersone(), solo = pers.length === 1;
  if (!S.cal.p || !pers.includes(S.cal.p)) { const A = ts(S.cal.da), B = ts(addDays(S.cal.da, 7)); S.cal.p = pers.includes(S.user) && (pers.length === 1 || occ().some(o => o.persona === S.user && ts(o.fine) > A && ts(o.inizio) < B)) ? S.user : (pers.includes("P10") ? "P10" : pers[0]); }
  if (solo) S.cal.tab = "persona";
  const tabs = solo ? [] : [["generale", "Generale"], ["persona", "Calendario persona"], ["planning", "Planning risorse"]];
  const gen = S.cal.tab === "generale" && !solo;
  const [y, m] = S.cal.mese.split("-").map(Number);
  const MESI_L = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  const nav = gen
    ? `<button class="btn ghost sm" data-mese="-1" aria-label="Mese precedente">‹</button><span class="mono small">${MESI_L[m - 1]} ${y}</span><button class="btn ghost sm" data-mese="1" aria-label="Mese successivo">›</button><button class="btn ghost sm" data-mesego="2026-11">Nov 2026</button>`
    : `<button class="btn ghost sm" data-wk="-7" aria-label="Settimana precedente">‹</button><span class="mono small">${fd(S.cal.da)} – ${fd(addDays(S.cal.da, solo || S.cal.tab === "persona" ? 6 : 13))}</span><button class="btn ghost sm" data-wk="7" aria-label="Settimana successiva">›</button>
      <button class="btn ghost sm" data-wkgo="2026-11-09">11 nov</button>`;
  return `<div class="view-head"><div><h1>Calendario</h1></div>
    <div class="calnav">${nav}</div></div>
  ${tabs.length ? `<div class="subtabs" role="tablist">${tabs.map(([k, t]) => `<button role="tab" data-ctab="${k}" aria-selected="${S.cal.tab === k}">${t}</button>`).join("")}</div>` : ""}
  ${gen ? vGenerale(y, m) : S.cal.tab === "planning" && !solo ? vPlanning(pers) : vSettimana(pers, solo)}`;
}
function vGenerale(y, m) {
  const first = `${y}-${pad2(m)}-01`, start = monday(first);
  const lastDay = new Date(y, m, 0).getDate(), last = `${y}-${pad2(m)}-${pad2(lastDay)}`;
  const days = []; for (let k = start; k <= last || days.length % 7; k = addDays(k, 1)) days.push(k);
  const all = occ();
  // fasi del piano; per le commesse senza piano, le sole giornate di evento
  const voci = D.FASI.map(f => ({ cid: f.commessa, tipo: f.tipo, dal: f.dal, al: f.al }))
    .concat(D.COMMESSE.filter(c => !D.PIANO[c.commessa_id] && !["persa", "annullata"].includes(c.stato)).map(c => ({ cid: c.commessa_id, tipo: "evento", dal: c.data_inizio + " 00:00", al: c.data_fine + " 23:59", noplan: true })));
  const inMese = [...new Set(voci.filter(v => v.al.slice(0, 10) >= days[0] && v.dal.slice(0, 10) <= days.at(-1)).map(v => v.cid))];
  const ORD = Object.keys(FASI_TIPI);
  const cell = d => {
    const a = ts(d), b = ts(addDays(d, 1));
    const V = voci.filter(v => ts(v.al) > a && ts(v.dal) < b);
    const byC = {}; V.forEach(v => (byC[v.cid] ||= new Set()).add(v.tipo));
    const pers = new Set(all.filter(o => ts(o.fine) > a && ts(o.inizio) < b).map(o => o.persona));
    const cf = all.some(o => ts(o.fine) > a && ts(o.inizio) < b && o.conflitti.length);
    const x = new Date(d + "T00:00");
    return `<div class="mg-d ${d.slice(0, 7) !== S.cal.mese ? "out" : ""} ${d === TODAY ? "today" : ""} ${x.getDay() % 6 === 0 ? "we" : ""}">
      <div class="mg-n"><span>${x.getDate()}</span>${pers.size ? `<span class="mg-p ${cf ? "cf" : ""}" title="${pers.size} persone impegnate${cf ? ", con conflitti" : ""}">${pers.size} pers.</span>` : ""}</div>
      ${Object.entries(byC).map(([cid, tp]) => { const t = [...tp].sort((p, q) => ORD.indexOf(p) - ORD.indexOf(q)); const ev = t.includes("evento");
        return `<button class="mg-c ${ev ? "ev" : ""}" data-open="${cid}" style="--cc:${colOf(cid)}" title="${esc(codice(COM[cid]) + " · " + COM[cid].titolo_evento + " · " + t.map(z => FASI_BREVE[z]).join(", "))}"><b>${esc(codice(COM[cid]))}</b> ${esc(t.map(z => FASI_BREVE[z]).join(" · "))}</button>`; }).join("")}
    </div>`;
  };
  return `<div class="mg-wrap"><div class="mg">
    <div class="mg-h">${GGL.map(g => `<span>${g}</span>`).join("")}</div>
    <div class="mg-b">${days.map(cell).join("")}</div></div></div>
  <section class="panel" style="margin-top:16px"><h2>Commesse del mese <span class="muted">${inMese.length}</span></h2>
    ${inMese.length ? `<div class="tbl-wrap"><table class="mg-t"><thead><tr><th>Commessa</th><th>Date evento</th><th>Fasi</th><th>Persone</th><th></th></tr></thead><tbody>
    ${inMese.map(cid => { const c = COM[cid], f = D.FASI.filter(x => x.commessa === cid), sc = scoperti(cid), al = D.PIANO[cid] ? alertPersone(c) : null;
      const np = new Set(all.filter(o => o.commessa === cid).map(o => o.persona)).size;
      return `<tr><td><span class="code" style="border-left:3px solid ${colOf(cid)}">${esc(codice(c))}</span> <button class="linkbtn" data-open="${cid}">${esc(c.titolo_evento)}</button></td>
        <td class="mono small">${fd(c.data_inizio)}${c.data_fine !== c.data_inizio ? "–" + fd(c.data_fine) : ""}</td>
        <td class="mono small">${f.length ? `${fd(f.map(x => x.dal).sort()[0])} → ${fd(f.map(x => x.al).sort().at(-1))}` : `<span class="muted">senza piano</span>`}</td>
        <td>${np} ${sc.n ? `· <span style="color:var(--warn)">${sc.n} ${sc.n > 1 ? "scoperti" : "scoperto"}</span>` : ""}</td>
        <td>${al && al.r ? pill("alert " + al.r.t, al.r.k === "crit" ? "p-crit" : "p-warn") : pill(c.stato, STATO_CLS[c.stato])}</td></tr>`; }).join("")}
    </tbody></table></div>` : `<p class="muted small">Nessuna commessa.</p>`}
  </section>`;
}
function vSettimana(pers, solo) {
  const p = S.cal.p, days = Array.from({ length: 7 }, (_, i) => addDays(S.cal.da, i));
  const A = ts(days[0]), B = ts(addDays(days[6], 1));
  const ev = occ().filter(o => o.persona === p && ts(o.fine) > A && ts(o.inizio) < B);
  const off = D.INDISPONIBILITA.filter(x => x.persona_id === p && ts(x.al) > A && ts(x.dal) < B);
  const H0 = 0, H1 = 24, PX = 22;
  const segs = d => { const a = ts(d), b = ts(addDays(d, 1)); const L = ev.filter(o => ts(o.fine) > a && ts(o.inizio) < b).sort((x, y) => x.inizio.localeCompare(y.inizio));
    const lanes = []; L.forEach(o => { let k = lanes.findIndex(e => e <= ts(o.inizio)); if (k < 0) { k = lanes.length; lanes.push(0); } lanes[k] = ts(o.fine); o._lane = k; });
    return L.map(o => { const s = Math.max(ts(o.inizio), a), e = Math.min(ts(o.fine), b); return { o, top: (s - a) / 36e5 * PX, h: Math.max(14, (e - s) / 36e5 * PX - 2), lane: o._lane, n: lanes.length }; }); };
  const tsRows = ev.filter(o => o.stato === "conf").sort((a, b) => a.inizio.localeCompare(b.inizio));
  const canTs = p === S.user || liv("TIMESHEET") === "G" || tsRows.some(o => COM[o.commessa].pm_persona_id === S.user);
  const oreP = tsRows.reduce((h, o) => h + durH(o.inizio, o.fine), 0), oreE = tsRows.reduce((h, o) => h + (D.ORE[o.id] != null ? +D.ORE[o.id] : 0), 0);
  return `${solo ? "" : `<div class="controls"><div class="field"><label class="lbl" for="cal-p">Persona</label><select id="cal-p" data-calp="1">${pers.map(x => `<option value="${x}" ${x === p ? "selected" : ""}>${esc(nome(x))} · ${esc(PER[x].funzione_principale)}</option>`).join("")}</select></div>
</div>`}
  <div class="wk-wrap"><div class="wk">
    <div class="wk-h"><span></span>${days.map(d => { const x = new Date(d + "T00:00"); return `<span class="${d === TODAY ? "today" : ""}">${GGL[(x.getDay() + 6) % 7]} <b>${x.getDate()}</b></span>`; }).join("")}</div>
    <div class="wk-b" style="height:${(H1 - H0) * PX}px">
      <div class="wk-hours">${Array.from({ length: H1 - H0 }, (_, i) => `<span style="top:${i * PX}px">${pad2(H0 + i)}</span>`).join("")}</div>
      ${days.map(d => `<div class="wk-day">${Array.from({ length: H1 - H0 }, (_, i) => `<i style="top:${i * PX}px"></i>`).join("")}
        ${off.filter(x => ts(x.al) > ts(d) && ts(x.dal) < ts(addDays(d, 1))).map(x => { const s = Math.max(ts(x.dal), ts(d)), e = Math.min(ts(x.al), ts(addDays(d, 1))); return `<div class="wk-off" style="top:${(s - ts(d)) / 36e5 * PX}px;height:${(e - s) / 36e5 * PX}px" title="Non disponibile: ${esc(x.motivo)}"><span>${esc(x.motivo)}</span></div>`; }).join("")}
        ${segs(d).map(g => `<button class="wk-ev ${g.o.stato === "opz" ? "opz" : ""} ${g.o.conflitti.length ? "cf" : ""}" data-open="${g.o.commessa}" style="top:${g.top}px;height:${g.h}px;left:${g.lane / g.n * 100}%;width:${100 / g.n}%;--cc:${colOf(g.o.commessa)}" title="${esc(titoloCal(g.o))}\n${fdt(g.o.inizio)} → ${fdt(g.o.fine)}${g.o.conflitti.length ? "\nConflitto: " + esc(g.o.conflitti.join(" · ")) : ""}">
          <b>${g.o.stato === "opz" ? "OPZ · " : ""}${esc(codice(COM[g.o.commessa]))}</b> ${esc(g.o.attivita)}<span>${hh(g.o.inizio)}–${hh(g.o.fine)}</span></button>`).join("")}</div>`).join("")}
    </div></div></div>
  <div class="legend"><span><i style="background:var(--c1)"></i>commessa</span><span><i style="border:1px dashed var(--muted)"></i>opzionato</span><span><i style="border:2px solid var(--crit)"></i>conflitto</span><span><i style="background:repeating-linear-gradient(135deg,var(--hatch) 0 3px,transparent 3px 6px)"></i>non disponibile</span></div>
  <section class="panel" style="margin-top:16px"><h2>Timesheet della settimana <span class="muted">${oreP} h previste${oreE ? ` · ${oreE} h consuntivate` : ""}</span></h2>
    ${tsRows.length ? `<div class="tbl-wrap"><table><thead><tr><th>Giorno</th><th>Commessa</th><th>Attività</th><th class="num">Previste</th><th class="num">Effettive</th><th>Stato</th></tr></thead><tbody>
    ${tsRows.map(o => { const e = D.ORE[o.id]; return `<tr><td class="mono small">${fd(o.inizio)} ${hh(o.inizio)}–${hh(o.fine)}</td><td><span class="code">${esc(codice(COM[o.commessa]))}</span></td><td>${esc(o.attivita)}</td><td class="num">${durH(o.inizio, o.fine)}</td>
      <td class="num">${canTs ? `<input class="qty" type="number" min="0" step="0.5" id="ore-${o.id}" value="${e ?? ""}" placeholder="${durH(o.inizio, o.fine)}" data-ore="${o.id}" aria-label="Ore effettive">` : (e ?? "—")}</td>
      <td>${e != null ? pill("consuntivato", "p-ok") : pill("previsto", "")}</td></tr>`; }).join("")}</tbody></table></div>
` : `<p class="muted small">Nessun impegno confermato.</p>`}
  </section>`;
}
function vPlanning(pers) {
  const days = Array.from({ length: 14 }, (_, i) => addDays(S.cal.da, i));
  const all = occ();
  return `<div class="tbl-wrap"><table class="cal plan"><thead><tr><th class="art">Persona</th>${days.map(d => { const x = new Date(d + "T00:00"), we = x.getDay() % 6 === 0; return `<th class="${we ? "we" : ""}">${GGL[(x.getDay() + 6) % 7]}<br>${x.getDate()}</th>`; }).join("")}</tr></thead><tbody>
  ${pers.map(p => `<tr><td class="art"><button class="linkbtn" data-calpp="${p}">${esc(nome(p))}</button><div class="small muted">${esc(PER[p].funzione_principale)}</div></td>
    ${days.map(d => { const a = ts(d), b = ts(addDays(d, 1)); const L = all.filter(o => o.persona === p && ts(o.fine) > a && ts(o.inizio) < b);
      const cods = [...new Set(L.map(o => o.commessa))], cf = L.some(o => o.conflitti.length), off = D.INDISPONIBILITA.some(x => x.persona_id === p && ts(x.al) > a && ts(x.dal) < b);
      return `<td class="pc ${cf ? "cf" : ""} ${off && !L.length ? "off" : ""}" title="${esc(L.map(o => titoloCal(o) + " " + hh(o.inizio) + "–" + hh(o.fine)).join("\n"))}">${cods.map(cid => `<span class="pchip ${L.filter(o => o.commessa === cid).every(o => o.stato === "opz") ? "opz" : ""}" style="--cc:${colOf(cid)}">${esc(codice(COM[cid]).slice(4))}</span>`).join("")}</td>`; }).join("")}</tr>`).join("")}
  </tbody></table></div>
  <div class="legend"><span><i style="background:var(--c1)"></i>commessa</span><span><i style="border:1px dashed var(--muted)"></i>solo opzionato</span><span><i style="border:2px solid var(--crit)"></i>conflitto nel giorno</span><span><i style="background:repeating-linear-gradient(135deg,var(--hatch) 0 3px,transparent 3px 6px)"></i>non disponibile</span></div>`;
}

/* ── nuova commessa ── */
function ncDefault() {
  return { titolo: "", capofila: PER[S.user]?.azienda === "Nakama" ? "Nakama" : "Chedo", cliente: "", cliente_nuovo: "", agenzia: "", ref_nome: "", ref_email: "", ref_cell: "",
    location: "", loc_nome: "", loc_indirizzo: "", sales: "P07", pm: ruoli(S.user).includes("PM") ? S.user : "P04", backup: "", lead: "", lead_tipo: "rebate", lead_pct: 5, catering: "",
    dal: "2027-02-18", al: "2027-02-18", pax: 150, ...pianoDefault({}) };
}
function ncCommessa(n) { return { commessa_id: "NEW", codice_prospect: "P26-0xx", data_inizio: n.dal, data_fine: n.al < n.dal ? n.dal : n.al, location_id: n.location && n.location !== "nuova" ? n.location : "", location_nome: n.loc_nome }; }
function vNuova() {
  const n = S.nc || (S.nc = ncDefault());
  const sel = (k, opts, ph) => `<select id="nc-${k}" data-nc="${k}">${ph != null ? `<option value="">${ph}</option>` : ""}${opts.map(([v, t]) => `<option value="${v}" ${n[k] === v ? "selected" : ""}>${esc(t)}</option>`).join("")}</select>`;
  const inp = (k, type = "text", extra = "") => `<input type="${type}" id="nc-${k}" value="${esc(n[k])}" data-nc="${k}" ${extra}>`;
  const F = (k, label, html) => `<div class="field"><label class="lbl" for="nc-${k}">${label}</label>${html}</div>`;
  const pers = r => D.PERSONE.filter(p => ruoli(p.persona_id).some(x => r.includes(x))).map(p => [p.persona_id, `${p.nome} ${p.cognome} · ${p.azienda}`]);
  const ORGS = f => D.ORGANIZZAZIONI.filter(f).map(o => [o.org_id, o.nome_breve]);
  let prev = []; try { prev = generaFasi(ncCommessa(n), n); } catch (e) {}
  const ag = n.agenzia ? D.CONTATTI.find(x => x.org_id === n.agenzia && x.principale === "sì") : null;
  return `<button class="back" data-nav="progetti">‹ Tutti i progetti</button>
  <div class="view-head"><div><h1>Nuova commessa</h1></div></div>
  <form id="ncform" class="nc-grid">
    <div class="col">
      <section class="panel"><h2>Commessa</h2><div class="form">
        ${F("titolo", "Nome commessa", inp("titolo", "text", 'required placeholder="es. Vela Pharma · Convention 2027"'))}
        <div class="row">${F("capofila", "Azienda capofila", sel("capofila", [["Chedo", "Chedo"], ["Nakama", "Nakama"]]))}${F("pax", "Pax previsti", inp("pax", "number", 'min="0"'))}</div>
        <div class="row">${F("cliente", "Cliente", sel("cliente", [...ORGS(o => o.e_cliente === "sì"), ["nuovo", "+ nuovo cliente"]], "Scegli…"))}
          ${n.cliente === "nuovo" ? F("cliente_nuovo", "Nome nuovo cliente", inp("cliente_nuovo")) : F("agenzia", "Agenzia (terza parte)", sel("agenzia", ORGS(o => o.e_agenzia === "sì"), "Nessuna, cliente diretto"))}</div>
        ${n.cliente === "nuovo" ? F("agenzia", "Agenzia (terza parte)", sel("agenzia", ORGS(o => o.e_agenzia === "sì"), "Nessuna, cliente diretto")) : ""}
        <div class="row">${F("ref_nome", "Referente del cliente", inp("ref_nome", "text", 'placeholder="Nome e cognome"'))}${F("ref_email", "Email", inp("ref_email", "email"))}</div>
        <div class="row">${F("ref_cell", "Cellulare", inp("ref_cell", "tel"))}<div></div></div>
        <div class="row">${F("location", "Location", sel("location", [...D.LOCATION.map(l => [l.location_id, `${l.nome} · ${l.citta}`]), ["nuova", "+ location non in anagrafica"]], "Da definire"))}
          ${n.location === "nuova" ? F("loc_nome", "Nome location", inp("loc_nome")) : `<div class="field"><span class="lbl">Indirizzo</span><span class="small" style="padding:7px 0">${n.location ? esc(LOC[n.location].indirizzo + ", " + LOC[n.location].citta) : "—"}</span></div>`}</div>
        ${n.location === "nuova" ? F("loc_indirizzo", "Indirizzo", inp("loc_indirizzo")) : ""}
        <div class="row">${F("dal", "Evento dal", inp("dal", "date"))}${F("al", "al", inp("al", "date"))}</div>
      </div></section>
      <section class="panel"><h2>Persone e partner</h2><div class="form">
        <div class="row">${F("pm", "PM", sel("pm", pers(["PM"])))}${F("backup", "PM backup", sel("backup", pers(["PM"]).filter(p => p[0] !== n.pm), "Nessuno"))}</div>
        <div class="row">${F("sales", "Sales", sel("sales", pers(["COM", "DIR"]), "Nessuno"))}${F("catering", "Catering", sel("catering", ORGS(o => o.e_fornitore === "sì" && D.FORNITORI.some(f => f.org_id === o.org_id && /catering/.test(f.categorie)) || o.org_id === "ORG-013"), "Da definire"))}</div>
        <div class="row">${F("lead", "Lead (chi porta il cliente)", sel("lead", ORGS(o => o.e_partner === "sì"), "Nessuno"))}
          ${n.lead ? `<div class="row" style="grid-template-columns:1fr 80px">${F("lead_tipo", "Riconoscimento", sel("lead_tipo", [["rebate", "rebate"], ["sconto", "sconto in fattura"]]))}${F("lead_pct", "%", inp("lead_pct", "number", 'min="0" max="30" step="0.5"'))}</div>` : "<div></div>"}</div>
      </div></section>
    </div>
    <div class="col">
      <section class="panel"><h2>Piano di lavoro</h2><div class="form">
        <div class="row">${F("ev_inizio", "Evento: inizio", inp("ev_inizio", "time"))}${F("ev_fine", "fine", inp("ev_fine", "time"))}</div>
        <div class="row">${F("all_giorni", "Giorni di allestimento", inp("all_giorni", "number", 'min="0" max="5"'))}${F("prove_ore", "Prove: ore prima dell'inizio", inp("prove_ore", "number", 'min="0" step="0.5"'))}</div>
        <div class="row">${F("mag", "Magazzino di partenza", sel("mag", D.MAGAZZINI.map(m => [m.magazzino_id, m.nome])))}${F("viaggio_min", "Viaggio fino in location (min)", inp("viaggio_min", "number", 'min="0" step="5"'))}</div>
        <div class="row">${F("smo_ore", "Smontaggio (ore)", inp("smo_ore", "number", 'min="0" step="0.5"'))}${F("carico", "Carico", sel("carico", [["giorno prima", "il giorno prima"], ["stesso giorno", "lo stesso giorno"]]))}</div>
      </div>
      <h3 style="margin:12px 0 6px" class="lbl">Fasi generate</h3>
      <div class="phases mini">${prev.map(f => `<div class="ph ph-${f.tipo}"><div class="ph-t"><b>${esc(faseNome(f))}</b></div><div class="mono small">${fd(f.dal)} · ${hh(f.dal)}–${hh(f.al)}</div><span class="mono small muted">${durH(f.dal, f.al)} h</span></div>`).join("")}</div>
      </section>
      <section class="panel"><div class="actions" style="margin-top:0"><button class="btn" type="submit">Crea commessa</button><button class="btn ghost" type="button" data-nav="progetti">Annulla</button></div>
      </section>
    </div>
  </form>`;
}
function nextProspect() { const m = D.COMMESSE.reduce((x, c) => Math.max(x, +(c.codice_prospect || "").slice(4) || 0), 0); return "P26-" + String(m + 1).padStart(3, "0"); }
function creaCommessa() {
  const n = S.nc; if (!n.titolo.trim()) { toast("Scrivi il nome della commessa"); return; }
  const cid = "CM-" + String(D.COMMESSE.length + 1).padStart(4, "0"), cod = nextProspect();
  let cli = n.cliente;
  if (cli === "nuovo" || !cli) { cli = "ORG-" + String(D.ORGANIZZAZIONI.length + 1).padStart(3, "0"); D.ORGANIZZAZIONI.push({ org_id: cli, nome_breve: n.cliente_nuovo || "Cliente da definire", ragione_sociale: n.cliente_nuovo, e_cliente: "sì", e_agenzia: "no", e_partner: "no", e_fornitore: "no" }); ORG[cli] = D.ORGANIZZAZIONI.at(-1); }
  let loc = n.location;
  if (loc === "nuova") { loc = "LOC-" + String(D.LOCATION.length + 1).padStart(2, "0"); D.LOCATION.push({ location_id: loc, nome: n.loc_nome || "Nuova location", citta: "", indirizzo: n.loc_indirizzo }); LOC[loc] = D.LOCATION.at(-1); }
  let ref = "";
  if (n.ref_nome) { ref = "CT-" + String(D.CONTATTI.length + 1).padStart(2, "0"); const [nm, ...cg] = n.ref_nome.split(" "); D.CONTATTI.push({ contatto_id: ref, org_id: cli, nome: nm, cognome: cg.join(" "), email: n.ref_email, telefono: n.ref_cell, principale: "sì" }); }
  const c = { commessa_id: cid, codice_prospect: cod, codice_definitivo: "", stato: "prospect", titolo_evento: n.titolo.trim(), cliente_org_id: cli, committente_org_id: n.agenzia || cli, agenzia_org_id: n.agenzia,
    azienda_capofila: n.capofila, data_inizio: n.dal, data_fine: n.al < n.dal ? n.dal : n.al, location_id: loc, pax: +n.pax || null, pm_persona_id: n.pm, backup_persona_id: n.backup,
    sales_persona_id: n.sales, referente_contatto_id: ref, catering_org_id: n.catering, lead_org_id: n.lead, lead_tipo: n.lead_tipo, lead_pct: n.lead ? +n.lead_pct : null,
    modulo_produzione: n.capofila === "Chedo" ? "sì" : "no", modulo_logistica: "sì", modulo_creativita: "no", data_richiesta: TODAY, drive_creata: true };
  D.COMMESSE.push(c); COM[cid] = c;
  const P = {}; Object.keys(pianoDefault({})).forEach(k => P[k] = n[k]); setPiano(cid, P);
  S.nc = null; S.comm = cid; S.view = "scheda"; S.stab = "persone"; OCC = null; render(); window.scrollTo(0, 0);
  toast(`${cod} creata · cartella Drive con ${DRIVE_SUB.length} sottocartelle`);
}
function fabbDaPreventivo(cid) {
  const pv = pvOf(cid); if (!pv) return 0; let k = 0;
  pv.righe.filter(r => r.sez === "PERSONALE" && !r.opz).forEach(r => {
    if (D.FABB.some(f => f.commessa === cid && f.ruolo === r.desc.split("(")[0].trim())) return;
    const fasi = /hostess|accogl|accredit|segreter/i.test(r.desc) ? ["evento"] : /facchin|autist|trasport/i.test(r.desc) ? ["carico", "andata", "ritorno", "scarico"] : ["allestimento", "prove", "evento", "smontaggio"];
    fabb(cid, r.desc.split("(")[0].trim(), fasi, Array.from({ length: Math.min(12, r.q) }, () => null)); k++;
  });
  return k;
}

function magTabs() { return [["calendario", "Calendario magazzino"], ["giacenze", "Giacenze"]]; }
function vMagazzino() {
  const l = liv("MAGAZZINO");
  if (!l) return `<div class="view-head"><div><h1>Magazzino</h1></div></div><div class="empty">Nessun accesso.</div>`;
  const tabs = magTabs();
  if (!S.mag.tab || !tabs.some(t => t[0] === S.mag.tab)) S.mag.tab = "calendario";
  return `<div class="view-head"><div><h1>Magazzino</h1></div></div>
  <div class="subtabs" role="tablist">${tabs.map(([k, t]) => `<button role="tab" data-mtab="${k}" aria-selected="${S.mag.tab === k}">${t}${k === "calendario" ? ` <span class="count">${D.PRENOTAZIONI.filter(p => p.stato === "richiesta").length || ""}</span>` : ""}</button>`).join("")}</div>
  ${S.mag.tab === "calendario" ? vCalendario(l) : vGiacenze()}`;
}

function vCalendario(l) {
  const m = S.mag, mid = m.calMag;
  const days = Array.from({ length: 7 }, (_, i) => addDays(m.calDa, i));
  const A = ts(days[0]), B = ts(addDays(days[6], 1));
  const pren = D.PRENOTAZIONI.filter(p => p.magazzino_id === mid && ATTIVE.includes(p.stato));
  const byC = {}; pren.forEach(p => (byC[p.commessa_id] ||= []).push(p));
  const ev = Object.entries(byC).map(([cid, ps]) => ({ cid, ps, dal: ps.map(p => p.dal).sort()[0], al: ps.map(p => p.al).sort().at(-1), pend: ps.filter(p => p.stato === "richiesta").length }))
    .filter(e => ts(e.al) > A && ts(e.dal) < B).sort((x, y) => x.dal.localeCompare(y.dal));
  const PX = 22;
  const pend = D.PRENOTAZIONI.filter(p => p.stato === "richiesta");
  const groups = {}; pend.forEach(p => (groups[p.preventivo_id || p.commessa_id] ||= []).push(p));
  const sel = S.mag.ev && byC[S.mag.ev] ? S.mag.ev : null;
  return `
  ${pend.length ? `<section class="panel" style="margin-bottom:12px"><h2>Richieste <span class="muted">${pend.length}</span></h2>
    <div class="req-list">${Object.entries(groups).map(([gid, ps]) => { const c = COM[ps[0].commessa_id], open = S.mag.open === gid; return `<div class="req ${open ? "open" : ""}">
      <button class="req-h" data-reqtoggle="${esc(gid)}" aria-expanded="${open}"><span class="chev" aria-hidden="true">›</span><span class="code">${esc(codice(c))}</span><b>${esc(c.titolo_evento)}</b><span class="tn">${ps.length}</span></button>
      ${open ? `<div class="req-body">
        ${ps.map(p => `<label class="req-r"><input type="checkbox" data-reqsel="${p.prenotazione_id}" ${S.mag.sel.has(p.prenotazione_id) ? "checked" : ""} ${l === "G" ? "" : "disabled"}><span>${p.quantita} × ${esc(prod(ART[p.articolo_id]))}</span></label>`).join("")}
        <div class="req-foot"><button class="linkbtn" data-pvopen="${c.commessa_id}">Preventivo v${pvOf(c.commessa_id)?.ver || 1}</button>
          ${l === "G" ? `<button class="btn sm" data-confsel="${esc(gid)}" ${ps.some(p => S.mag.sel.has(p.prenotazione_id)) ? "" : "disabled"}>Conferma selezionate</button><button class="btn ghost sm" data-confall="${esc(gid)}">Tutte</button>` : ""}</div></div>` : ""}
    </div>`; }).join("")}</div></section>` : ""}
  <div class="controls">
    <div class="field"><label class="lbl" for="cal-mag">Magazzino</label><select id="cal-mag" data-cal="calMag">${D.MAGAZZINI.map(x => `<option value="${x.magazzino_id}" ${mid === x.magazzino_id ? "selected" : ""}>${esc(x.nome)}</option>`).join("")}</select></div>
    <div class="calnav" style="margin-left:auto"><button class="btn ghost sm" data-calnav="-7" aria-label="Settimana precedente">‹</button><span class="small">${fd(days[0])} – ${fd(days[6])}</span><button class="btn ghost sm" data-calnav="7" aria-label="Settimana successiva">›</button></div>
  </div>
  <div class="wk-wrap"><div class="wk">
    <div class="wk-h"><span></span>${days.map(d => { const x = new Date(d + "T00:00"); return `<span class="${d === TODAY ? "today" : ""}">${GGL[(x.getDay() + 6) % 7]} <b>${x.getDate()}</b></span>`; }).join("")}</div>
    <div class="wk-b" style="height:${24 * PX}px">
      <div class="wk-hours">${Array.from({ length: 24 }, (_, i) => `<span style="top:${i * PX}px">${pad2(i)}</span>`).join("")}</div>
      ${days.map(d => { const a = ts(d), b = ts(addDays(d, 1)); const L = ev.filter(e => ts(e.al) > a && ts(e.dal) < b);
        return `<div class="wk-day">${Array.from({ length: 24 }, (_, i) => `<i style="top:${i * PX}px"></i>`).join("")}
        ${L.map((e, k) => { const st = Math.max(ts(e.dal), a), en = Math.min(ts(e.al), b), c = COM[e.cid], first = ts(e.dal) >= a;
          return `<button class="wk-ev mev ${e.pend ? "pend" : ""} ${sel === e.cid ? "sel" : ""}" data-magev="${e.cid}" style="top:${(st - a) / 36e5 * PX}px;height:${Math.max(16, (en - st) / 36e5 * PX - 2)}px;left:${k / L.length * 100}%;width:${100 / L.length}%;--cc:${colOf(e.cid)}" title="${esc(codice(c) + " · " + c.titolo_evento)}"><b>${esc(codice(c))}</b> ${first ? esc(c.titolo_evento) : ""}<span>${e.ps.length} articoli${e.pend ? " · " + e.pend + " da confermare" : ""}</span></button>`; }).join("")}</div>`; }).join("")}
    </div></div></div>
  ${sel ? (() => { const e = ev.find(x => x.cid === sel) || { cid: sel, ps: byC[sel], dal: byC[sel].map(p => p.dal).sort()[0], al: byC[sel].map(p => p.al).sort().at(-1) }, c = COM[sel]; return `
  <section class="panel" style="margin-top:12px"><h2><span><span class="code">${esc(codice(c))}</span> ${esc(c.titolo_evento)}</span><span class="muted">${fdt(e.dal)} → ${fdt(e.al)} · <button class="linkbtn" data-open="${sel}">scheda</button> · <button class="linkbtn" data-magev="">chiudi</button></span></h2>
    <div class="tbl-wrap"><table><thead><tr><th>Prodotto</th><th class="num">Q.tà</th><th>Stato</th></tr></thead><tbody>
    ${e.ps.map(p => `<tr><td><button class="linkbtn" data-art="${p.articolo_id}">${esc(prod(ART[p.articolo_id]))}</button></td><td class="num">${p.quantita}</td><td>${pill(p.stato, p.stato === "confermata" ? "p-ok" : p.stato === "richiesta" ? "p-warn" : "")}</td></tr>`).join("")}
    </tbody></table></div></section>`; })() : ""}`;
}

function vGiacenze() {
  const m = S.mag;
  const mags = D.MAGAZZINI.filter(x => m.mag === "tutti" || x.magazzino_id === m.mag);
  const cats = [...new Set(D.ARTICOLI.map(a => a.categoria))];
  const arts = D.ARTICOLI.filter(a => (m.cat === "tutte" || a.categoria === m.cat) && (!m.q || (a.nome + " " + a.codice + " " + prod(a)).toLowerCase().includes(m.q.toLowerCase())));
  const dal = m.dal + " 00:00", al = m.al + " 23:59";
  const scorta = D.GIACENZE.filter(g => g.scorta_minima && g.quantita < g.scorta_minima);
  return `<div class="controls">
      <div class="field"><label class="lbl" for="m-dal">Dal</label><input type="date" id="m-dal" value="${m.dal}" data-m="dal"></div>
      <div class="field"><label class="lbl" for="m-al">Al</label><input type="date" id="m-al" value="${m.al}" data-m="al"></div>
      <div class="field"><label class="lbl" for="m-mag">Magazzino</label><select id="m-mag" data-m="mag"><option value="tutti">Tutti</option>${D.MAGAZZINI.map(x => `<option value="${x.magazzino_id}" ${m.mag === x.magazzino_id ? "selected" : ""}>${esc(x.nome)}</option>`).join("")}</select></div>
      <div class="field"><label class="lbl" for="m-cat">Categoria</label><select id="m-cat" data-m="cat"><option value="tutte">Tutte</option>${cats.map(x => `<option ${m.cat === x ? "selected" : ""}>${esc(x)}</option>`).join("")}</select></div>
      <div class="field" style="flex:1 1 160px"><label class="lbl" for="m-q">Cerca</label><input type="search" id="m-q" value="${esc(m.q)}" data-m="q"></div>
    </div>
    <section class="panel">
      <div class="tbl-wrap"><table><thead><tr><th>Articolo</th>${mags.map(x => `<th class="num">${esc(x.nome.replace("Magazzino ", "").replace("Deposito ", ""))}</th>`).join("")}</tr></thead><tbody>
      ${arts.map(a => `<tr><td><button class="linkbtn art-name" data-art="${a.articolo_id}">${esc(prod(a))}</button></td>
        ${mags.map(x => { const d = disp(a.articolo_id, x.magazzino_id, dal, al); if (!d) return `<td class="num av-cell none">·</td>`; const cls = d.libero <= 0 ? "zero" : d.libero < Math.ceil(d.tot * SOGLIA) ? "low" : ""; return `<td class="num av-cell ${cls}"><b>${Math.max(0, d.libero)}</b></td>`; }).join("")}</tr>`).join("") || `<tr><td colspan="${mags.length + 1}" class="muted">Nessun articolo trovato.</td></tr>`}
      </tbody></table></div></section>`;
}

function vTodo() {
  const l = liv("TODO"); const vis = new Set(commesseVisibili().map(c => c.commessa_id));
  let list = D.TODO_CLICKUP.filter(t => vis.has(t.commessa_id) && (l !== "P" || t.assegnatario_persona_id === S.user));
  if (S.todo.mine) list = list.filter(t => t.assegnatario_persona_id === S.user);
  if (S.todo.stato === "aperti") list = list.filter(t => t.stato !== "fatto");
  if (S.todo.stato === "scaduti") list = list.filter(t => t.stato !== "fatto" && t.scadenza < TODAY);
  const groups = {}; list.sort((a, b) => a.scadenza.localeCompare(b.scadenza)).forEach(t => (groups[t.commessa_id] ||= []).push(t));
  return `
  <div class="view-head"><div><h1>To-Do</h1></div>
    <div class="filters">
      ${[["aperti", "Aperti"], ["scaduti", "Scaduti"], ["tutti", "Tutti"]].map(([k, t]) => `<button class="chip" data-tstato="${k}" aria-pressed="${S.todo.stato === k}">${t}</button>`).join("")}
    </div></div>
  ${Object.keys(groups).length ? Object.entries(groups).map(([cid, ts_]) => `<div class="todo-group"><h3><span class="code">${esc(codice(COM[cid]))}</span>${esc(COM[cid].titolo_evento)}</h3>${ts_.map(t => todoRow(t, false)).join("")}</div>`).join("")
    : `<div class="empty">Nessun to-do.</div>`}`;
}

/* ───────── render e eventi ───────── */
function stripHTML(pv, T) {
  const versioni = pv.versioni || [], ed = pvEditor() && pv.stato !== "chiuso";
  return `<div><div class="lbl">Voci</div><div class="v">${T.n}</div></div>
      <div><div class="lbl">Totale + IVA</div><div class="v">${eur(T.tot)}</div></div>
      <div><div class="lbl">Costi</div><div class="v">${eur(T.cos)}</div></div>
      <div><div class="lbl">Margine</div><div class="v">${pct(T.marg)}</div></div>
      ${T.sc ? `<div><div class="lbl">Sconto ${pv.sconto}%</div><div class="v">− ${eur(T.sc)}</div></div>` : ""}
      <div><div class="lbl">Versione</div><div class="v">v${pv.ver} <span class="small muted">${versioni.length ? `· ${versioni.length} su Drive` : "· non ancora su Drive"}</span></div></div>
      <div class="pv-actions">${ed ? `<button class="btn" data-pvact="versione" ${pv.righe.length ? "" : "disabled"}>Salva nuova versione</button>` : ""}${pvActions(pv, T.blocchi || 0, D.PRENOTAZIONI.filter(p => p.preventivo_id === pv.id))}</div>`;
}
function render() {
  document.querySelectorAll("[data-nav]").forEach(b => b.closest("nav") && b.setAttribute("aria-current", (S.view === b.dataset.nav || ((S.view === "scheda" || S.view === "nuova") && b.dataset.nav === "progetti")) ? "page" : "false"));
  const el = document.getElementById("main");
  OCC = null;
  const art = S.art && ART[S.art]; document.getElementById("modal").hidden = !art;
  if (art) document.getElementById("modal").innerHTML = `<div class="mbox" role="dialog" aria-modal="true" aria-labelledby="mtitle"><button class="icon-btn mclose" data-artclose="1" aria-label="Chiudi">×</button>
    <div class="mgrid"><div class="mphoto"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/></svg><span class="small muted">foto</span></div>
      <div><p class="lbl">${esc(art.categoria)}${art.sottocategoria ? " · " + esc(art.sottocategoria) : ""}</p><h2 id="mtitle" style="font-size:1.1rem;text-transform:none;letter-spacing:0;color:var(--fg);margin:2px 0 4px">${esc(prod(art))}</h2><p class="muted">${esc(art.nome)}</p>
      <dl class="spec">${[["Codice", art.codice], ["Peso", art.peso_kg ? art.peso_kg + " kg" : ""], ["Potenza", art.potenza_w ? art.potenza_w + " W" : ""], ["Proprietà", art.proprietario], ["Noleggio", art.prezzo_noleggio_giorno ? eur(art.prezzo_noleggio_giorno) + " / giorno" : ""], ["Tracciato a pezzo", art.tracciato_a_pezzo], ["Giacenze", D.GIACENZE.filter(g => g.articolo_id === art.articolo_id).map(g => `${g.quantita} ${shortMag(MAG[g.magazzino_id].nome)}`).join(" · ")]].filter(x => x[1]).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
      <p class="small muted" style="margin-top:10px">Scheda tecnica e foto arriveranno dal database.</p></div></div></div>`;
  el.innerHTML = (S.view === "nuova" ? vNuova() : S.view === "cal" ? vCal() :  S.view === "scheda" ? vScheda() : S.view === "magazzino" ? vMagazzino() : S.view === "todo" ? vTodo() : vProgetti());
}
const sel = document.getElementById("user");
sel.innerHTML = USERS.map(p => `<option value="${p}">${esc(nome(p))} · ${esc(ruoli(p).map(r => RUOLO_NOME[r]).join(", "))}</option>`).join("");
sel.value = S.user;
sel.addEventListener("change", () => { S.user = sel.value; S.mag.tab = null; S.cal.p = null; if (S.view === "nuova" && !canCreate()) S.view = "progetti"; if (S.view === "scheda" && !commesseVisibili().some(c => c.commessa_id === S.comm)) S.view = "progetti"; render(); toast(`Ora vedi Doffy come ${nome(S.user)}`); });

const curPV = () => pvOf(S.comm);
const nextPR = () => "PR-" + String(D.PRENOTAZIONI.reduce((m, p) => Math.max(m, +p.prenotazione_id.slice(3) || 0), 0) + 1).padStart(2, "0");
const addRow = (r, label) => { const pv = curPV(); const ex = pv.righe.find(x => x.src === r.src && x.ref && x.ref === r.ref && x.mag === r.mag);
  if (ex) ex.q++; else pv.righe.push(r); S.pvHide.delete(r.sez); render(); toast(`Scritto nel foglio, sezione ${r.sez}: ${label || r.desc}`); };
const evDays = () => { const c = COM[S.comm]; return giorni(c.data_inizio, c.data_fine); };

document.addEventListener("click", e => {
  const t = e.target.closest("[data-nav],[data-open],[data-filtro],[data-tmine],[data-tstato],[data-conferma],[data-confall],[data-mtab],[data-pvcreate],[data-pvopen],[data-src],[data-addinv],[data-addloc],[data-addlis],[data-addgra],[data-rm],[data-ropz],[data-ralt],[data-pvact],[data-calnav],[data-calgo],[data-stab],[data-reqtoggle],[data-confsel],[data-magev],[data-art],[data-artclose],[data-dir],[data-file],[data-sez],[data-genpiano],[data-slconf],[data-slopz],[data-sloff],[data-sladd],[data-fbrm],[data-fbprev],[data-ctab],[data-wk],[data-wkgo],[data-mese],[data-mesego],[data-calpp]");
  if (!t) return;
  const d = t.dataset;
  if (d.nav) { if (d.nav === "nuova") S.nc = null; S.view = d.nav; render(); window.scrollTo(0, 0); }
  else if (d.genpiano) { setPiano(d.genpiano, {}); render(); toast("Piano generato dalle date dell'evento"); }
  else if (d.slconf || d.slopz) { const f = D.FABB.find(x => x.id === (d.slconf || d.slopz)), sl = f.slots[+d.i]; sl.st = d.slconf ? "conf" : "opz"; render();
    toast(d.slconf ? `${nome(sl.p)} confermato: evento creato nel suo Google Calendar` : `${nome(sl.p)} riportato a opzione`); }
  else if (d.sloff) { const f = D.FABB.find(x => x.id === d.sloff), sl = f.slots[+d.i], p = sl.p; sl.p = ""; sl.st = ""; render(); toast(`${nome(p)} tolto: eventi di calendario cancellati`); }
  else if (d.sladd) { D.FABB.find(x => x.id === d.sladd).slots.push({ p: "", st: "" }); render(); }
  else if (d.fbrm) { const f = D.FABB.find(x => x.id === d.fbrm); D.FABB.splice(D.FABB.indexOf(f), 1); render(); toast(`Ruolo ${f.ruolo} tolto dal piano`); }
  else if (d.fbprev) { const k = fabbDaPreventivo(d.fbprev); render(); toast(k ? `${k} ruoli importati dal preventivo` : "Nessuna nuova voce di personale nel preventivo"); }
  else if (d.ctab) { S.cal.tab = d.ctab; render(); }
  else if (d.wk) { S.cal.da = addDays(S.cal.da, +d.wk); render(); }
  else if (d.wkgo) { S.cal.da = d.wkgo; render(); }
  else if (d.mese) { const [y, m] = S.cal.mese.split("-").map(Number), x = new Date(y, m - 1 + +d.mese, 1); S.cal.mese = `${x.getFullYear()}-${pad2(x.getMonth() + 1)}`; render(); }
  else if (d.mesego) { S.cal.mese = d.mesego; render(); }
  else if (d.calpp) { S.cal.p = d.calpp; S.cal.tab = "persona"; S.view = "cal"; render(); window.scrollTo(0, 0); }
  else if (d.open) { if (S.comm !== d.open) { S.stab = "overview"; S.dir = ""; } S.comm = d.open; S.view = "scheda"; render(); window.scrollTo(0, 0); }
  else if (d.stab) { S.stab = d.stab; render(); }
  else if (d.filtro) { S.filtro = d.filtro; render(); }
  else if (d.tmine) { S.todo.mine = d.tmine === "1"; render(); }
  else if (d.tstato) { S.todo.stato = d.tstato; render(); }
  else if (d.mtab) { S.mag.tab = d.mtab; render(); }
  else if (d.pvcreate) {
    const c = COM[d.pvcreate], magLoc = D.MAGAZZINI.find(m => m.location_id && m.location_id === c.location_id);
    D.PREV.push({ id: "PV-" + c.commessa_id.slice(3), commessa: c.commessa_id, ver: 1, stato: "bozza", dal: addDays(c.data_inizio, -1), al: c.data_fine, mag: magLoc ? magLoc.magazzino_id : "MAG-C", sconto: 0, inoltrato: "", righe: [] });
    S.comm = c.commessa_id; S.view = "scheda"; S.stab = "prev"; S.src = "inv"; S.mag.q = ""; S.mag.cat = "tutte"; render(); window.scrollTo(0, 0); toast(`Preventivo creato per ${codice(c)}`);
  }
  else if (d.pvopen) { S.comm = d.pvopen; S.view = "scheda"; S.stab = "prev"; S.mag.q = ""; render(); window.scrollTo(0, 0); }
  else if (d.src) { S.src = d.src; S.mag.q = ""; render(); }
  else if (d.addinv) { addRow(rInv(d.addinv, 1, curPV().mag, evDays())); }
  else if (d.addloc) { addRow(d.addloc.startsWith("setup:") ? rSetup(d.addloc.slice(6)) : rLoc(d.addloc, evDays())); }
  else if (d.addlis) { addRow(rLis(d.addlis, 1, 1)); }
  else if (d.addgra) { addRow(rGra(d.addgra, 1)); }
  else if (d.rm) { curPV().righe.splice(+d.rm, 1); render(); }
  else if (d.ropz) { const r = curPV().righe[+d.ropz]; r.opz = !r.opz; render(); }
  else if (d.ralt) { curPV().righe[+d.ralt].mag = d.to; render(); }
  else if (d.pvact) {
    const pv = curPV();
    if (d.pvact === "invia") { pv.stato = "inviato"; toast(`Preventivo v${pv.ver} inviato al cliente`); }
    else if (d.pvact === "nuova") { pv.stato = "bozza"; toast("Preventivo riaperto in bozza"); }
    else if (d.pvact === "versione") { const T = pvTot(pv), c = COM[pv.commessa]; pv.ver = (pv.versioni?.length ? pv.ver + 1 : pv.ver); const file = `${codice(c)}_PREVENTIVO_v${pv.ver}.xlsx`;
      (pv.versioni ||= []).push({ ver: pv.ver, file, quando: TODAY + " " + new Date().toTimeString().slice(0, 5), tot: T.tot, righe: JSON.parse(JSON.stringify(pv.righe)) });
      D.FILE.push({ file_id: "F-" + (D.FILE.length + 100), commessa_id: pv.commessa, location_id: "", cartella: "02_ECONOMICO", nome: file, tipo_documento: "preventivo", versione: pv.ver, mime_type: "application/vnd.google-apps.spreadsheet", modificato_il: TODAY + " 12:00", stato_indice: "da leggere" });
      S.pvTool = "versioni"; toast(`Salvato su Drive: 02_ECONOMICO / ${file}`); }
    else if (d.pvact === "conferma") {
      const inv = pv.righe.filter(r => r.src === "inv" && !r.opz);
      inv.forEach(r => D.PRENOTAZIONI.push({ prenotazione_id: nextPR(), commessa_id: pv.commessa, articolo_id: r.ref, pezzo_id: "", quantita: r.q, magazzino_id: r.mag, dal: pv.dal + " 07:00", al: pv.al + " 20:00", stato: "richiesta", richiesta_da: S.user, confermata_da: "", preventivo_id: pv.id }));
      pv.stato = "confermato"; pv.inoltrato = TODAY;
      toast(`Confermato · ${inv.length} richieste inoltrate al magazziniere`);
    }
    render();
  }
  else if (d.conferma) { const p = D.PRENOTAZIONI.find(x => x.prenotazione_id === d.conferma); p.stato = "confermata"; p.confermata_da = S.user; render(); toast(`${ART[p.articolo_id].nome}: confermata`); }
  else if (t.hasAttribute("data-sez")) { S.pvHide.has(d.sez) ? S.pvHide.delete(d.sez) : S.pvHide.add(d.sez); render(); }
  else if (t.hasAttribute("data-magev")) { S.mag.ev = d.magev || null; render(); }
  else if (d.art) { S.art = d.art; render(); }
  else if (d.artclose) { S.art = null; render(); }
  else if (t.hasAttribute("data-dir")) { S.dir = d.dir; S.fileOpen = null; render(); }
  else if (d.file) { S.fileOpen = S.fileOpen === d.file ? null : d.file; render(); }
  else if (d.reqtoggle) { S.mag.open = S.mag.open === d.reqtoggle ? null : d.reqtoggle; render(); }
  else if (d.confsel) { let n = 0; D.PRENOTAZIONI.filter(p => p.stato === "richiesta" && S.mag.sel.has(p.prenotazione_id)).forEach(p => { p.stato = "confermata"; p.confermata_da = S.user; S.mag.sel.delete(p.prenotazione_id); n++; }); render(); toast(`${n} righe confermate`); }
  else if (d.confall) { let n = 0; D.PRENOTAZIONI.filter(p => p.stato === "richiesta" && (p.preventivo_id || p.commessa_id) === d.confall).forEach(p => { p.stato = "confermata"; p.confermata_da = S.user; n++; }); render(); toast(`${n} righe confermate`); }
  else if (d.calnav) { S.mag.calDa = addDays(S.mag.calDa, +d.calnav); render(); }
  else if (d.calgo) { const pv = D.PREV.find(p => p.id === d.calgo); S.view = "magazzino"; S.mag.tab = "calendario"; S.mag.calMag = pv.righe.find(r => r.src === "inv")?.mag || pv.mag; S.mag.calDa = addDays(pv.dal, -3); render(); window.scrollTo(0, 0); }
});
document.getElementById("modal").addEventListener("click", e => { if (e.target.id === "modal") { S.art = null; render(); } });
document.addEventListener("keydown", e => { if (e.key === "Escape" && S.art) { S.art = null; render(); } });
document.addEventListener("click", e => { const sm = e.target.closest("summary[data-pvtool]"); if (sm) { e.preventDefault(); S.pvTool = S.pvTool === sm.dataset.pvtool ? null : sm.dataset.pvtool; render(); } });
document.addEventListener("submit", e => {
  if (e.target.id === "ncform") { e.preventDefault(); creaCommessa(); return; }
  if (e.target.id === "fbform") { e.preventDefault(); const cid = e.target.dataset.cid, r = document.getElementById("fb-ruolo").value.trim(), q = Math.max(1, Math.min(20, +document.getElementById("fb-q").value || 1));
    const fasi = [...e.target.querySelectorAll('input[name="fbf"]:checked')].map(x => x.value); if (!r || !fasi.length) { toast("Scrivi il ruolo e scegli almeno una fase"); return; }
    fabb(cid, r, fasi, Array.from({ length: q }, () => null)); render(); toast(`Aggiunto: ${r} × ${q}`); return; }
  if (e.target.id !== "libform") return; e.preventDefault();
  const g = id => document.getElementById(id).value, cu = +g("lb-cu") || 0, mup = (+g("lb-mup") || 0) / 100;
  if (!g("lb-desc").trim()) return;
  addRow({ src: "lib", ref: "", sez: g("lb-sez"), desc: g("lb-desc").trim(), q: Math.max(1, +g("lb-q") || 1), n: Math.max(1, +g("lb-n") || 1), cu, pu: Math.round(cu * (1 + mup)), forn: g("lb-forn") });
});
document.addEventListener("change", e => {
  const t = e.target, d = t.dataset;
  if (d.todo) { const x = D.TODO_CLICKUP.find(y => y.clickup_task_id === d.todo); x.stato = t.checked ? "fatto" : "da fare"; render(); toast(t.checked ? "Segnato come fatto" : "Riaperto"); }
  else if (d.m && d.m !== "q") { S.mag[d.m] = t.value; render(); }
  else if (d.pv) { const pv = curPV(); pv[d.pv] = d.pv === "sconto" ? Math.max(0, Math.min(50, +t.value || 0)) : t.value;
    if (d.pv === "mag") pv.righe.forEach(r => { if (r.src === "inv") r.mag = t.value; });
    if (pv.al < pv.dal) pv.al = pv.dal;
    render(); }
  else if (d.cell) { const r = curPV().righe[+d.i]; if (d.cell === "desc") r.desc = t.value.trim() || r.desc; else r[d.cell] = Math.max(d.cell === "q" || d.cell === "n" ? 1 : 0, +t.value || 0); render(); document.getElementById(`c-${d.cell}-${d.i}`)?.focus(); }
  else if (d.rq || d.rn || d.rp) { const k = d.rq ? "rq" : d.rn ? "rn" : "rp", i = +d[k], r = curPV().righe[i];
    if (k === "rp") r.pu = Math.max(0, +t.value || 0); else r[k === "rq" ? "q" : "n"] = Math.max(1, +t.value || 1);
    render(); document.getElementById(k + "-" + i)?.focus(); }
  else if (d.rmag) { curPV().righe[+d.rmag].mag = t.value; render(); }
  else if (d.fase) { const f = D.FASI.find(x => x.id === d.fase); const dur = ts(f.al) - ts(f.dal);
    if (d.k === "d") { const delta = Math.round((ts(t.value) - ts(f.dal.slice(0, 10))) / 864e5); f.dal = addMin(f.dal, delta * 1440); f.al = addMin(f.al, delta * 1440); }
    if (d.k === "a") { f.dal = f.dal.slice(0, 11) + t.value; f.al = fmtDT(new Date(ts(f.dal) + dur)); }
    if (d.k === "b") { let al = f.dal.slice(0, 11) + t.value; if (al <= f.dal) al = addDays(f.dal.slice(0, 10), 1) + " " + t.value; f.al = al; }
    render(); toast(`${faseNome(f)} spostata: gli impegni delle persone seguono`); }
  else if (d.pp) { const P = D.PIANO[S.comm]; P[d.pp] = t.type === "number" ? +t.value : t.value; setPiano(S.comm, P); render(); toast("Fasi rigenerate dai parametri"); }
  else if (d.slot) { const f = D.FABB.find(x => x.id === d.slot); f.slots[+d.i] = { p: t.value, st: t.value ? "opz" : "" }; render(); if (t.value) toast(`${nome(t.value)} opzionato come ${f.ruolo.toLowerCase()}`); }
  else if (d.calp) { S.cal.p = t.value; render(); }
  else if (d.ore) { D.ORE[d.ore] = t.value === "" ? undefined : +t.value; if (t.value === "") delete D.ORE[d.ore]; render(); }
  else if (d.nc) { const n = S.nc; n[d.nc] = t.type === "number" ? +t.value : t.value;
    if (d.nc === "location" && LOC[t.value]) n.viaggio_min = VIAGGIO[t.value] ?? 60;
    if (d.nc === "cliente" && t.value && t.value !== "nuovo") { const r = D.CONTATTI.find(x => x.org_id === t.value && x.principale === "sì"); if (r) { n.ref_nome = r.nome + " " + r.cognome; n.ref_email = r.email; n.ref_cell = r.telefono || ""; } }
    if (d.nc === "dal" && n.al < n.dal) n.al = n.dal;
    render(); document.getElementById("nc-" + d.nc)?.focus(); }
  else if (d.reqsel) { t.checked ? S.mag.sel.add(d.reqsel) : S.mag.sel.delete(d.reqsel); render(); }
  else if (d.cal) { S.mag[d.cal] = d.cal === "solo" ? t.checked : t.value; render(); }
});
document.addEventListener("input", e => {
  const t = e.target;
  if (t.dataset.m === "q") { S.mag.q = t.value; const pos = t.selectionStart; render(); const n = document.getElementById("m-q"); n.focus(); n.setSelectionRange(pos, pos); }
});
render();
