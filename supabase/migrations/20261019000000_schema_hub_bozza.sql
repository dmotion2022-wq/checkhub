-- Nakama Hub · schema database · BOZZA da validare (non applicare in produzione)
-- Generato da gen_sql.py partendo da schema/core_v1.py, schema/anagrafiche_v1.py e schema/flussi_v1.py.
-- Le chiavi esterne sono aggiunte alla fine, così l'ordine delle tabelle non conta.
-- RLS attiva su tutte le tabelle: le policy per ruolo (matrice PERMESSI, doc 07) sono ancora da scrivere.

create extension if not exists pgcrypto;


-- ════════ NUCLEO (doc 09) ════════

create table ruoli (
  ruolo_id text primary key,
  nome text,
  descrizione text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table ruoli is '00 · CONFIGURAZIONE · Il DB strutturato dell''Hub: ruoli, permessi, liste di valori, impostazioni';
comment on column ruoli.ruolo_id is 'DIR, SYS, PM, COM, AMM, OPE, SEG, MAG, EXT';
alter table ruoli enable row level security;

create table aree (
  area_id text primary key,
  nome text,
  gruppo text check (gruppo in ('eventi', 'economia', 'risorse', 'anagrafiche', 'sistema')),
  custode_ruolo_id text,
  attiva_mvp boolean,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table aree is '00 · CONFIGURAZIONE · Il DB strutturato dell''Hub: ruoli, permessi, liste di valori, impostazioni';
comment on column aree.custode_ruolo_id is 'chi gestisce il dato';
comment on column aree.attiva_mvp is 'presente nel frontend dell''MVP';
alter table aree enable row level security;

create table permessi (
  id bigint generated always as identity primary key,
  ruolo_id text,
  area_id text,
  livello text check (livello in ('G', 'M', 'V', 'P', '—')),
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table permessi is '00 · CONFIGURAZIONE · Il DB strutturato dell''Hub: ruoli, permessi, liste di valori, impostazioni';
comment on column permessi.livello is 'Gestisce, Modifica, Vede, Solo i propri, nessuno';
alter table permessi enable row level security;

create table liste_valori (
  id bigint generated always as identity primary key,
  lista text,
  valore text,
  etichetta text,
  ordine numeric,
  colore text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table liste_valori is '00 · CONFIGURAZIONE · Il DB strutturato dell''Hub: ruoli, permessi, liste di valori, impostazioni';
comment on column liste_valori.lista is 'es. stato_commessa, linea, ruolo_progetto';
alter table liste_valori enable row level security;

create table impostazioni (
  chiave text primary key,
  valore text,
  descrizione text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table impostazioni is '00 · CONFIGURAZIONE · Il DB strutturato dell''Hub: ruoli, permessi, liste di valori, impostazioni';
alter table impostazioni enable row level security;

create table persone (
  persona_id text primary key,
  email_google text,
  nome text,
  cognome text,
  azienda text check (azienda in ('Chedo', 'Nakama', 'esterno')),
  tipo_rapporto text check (tipo_rapporto in ('dipendente', 'freelance', 'altro')),
  telefono text,
  funzione_principale text,
  rank text,
  tariffa_giornaliera numeric(12,2),
  accesso_hub boolean,
  attivo boolean not null default true,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  tipo text check (tipo in ('dipendente Chedo', 'dipendente Nakama', 'freelance', 'tramite agenzia')),
  agenzia_fornitore_id uuid,
  funzioni text[],
  citta_base text,
  disponibile_trasferte boolean,
  tariffa_giornata numeric(12,2),
  tariffa_mezza numeric(12,2),
  straordinario_ora numeric(12,2),
  rimborsi text,
  taglia_divisa text,
  patenti text[],
  partita_iva boolean,
  valutazione numeric
);
comment on table persone is '01 · PERSONE · Chi usa l''Hub e chi lavora sugli eventi, dipendenti e freelance';
comment on column persone.email_google is 'account di accesso all''Hub';
comment on column persone.funzione_principale is 'es. 62 - tecnico video';
comment on column persone.agenzia_fornitore_id is 'Se arriva da un''agenzia (es. hostess)';
comment on column persone.rimborsi is 'Cosa si rimborsa e come';
comment on column persone.taglia_divisa is 'Per hostess e staff in divisa';
comment on column persone.partita_iva is 'Fattura o ritenuta';
alter table persone enable row level security;

create table persone_ruoli (
  id bigint generated always as identity primary key,
  persona_id text,
  ruolo_id text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table persone_ruoli is '01 · PERSONE · Chi usa l''Hub e chi lavora sugli eventi, dipendenti e freelance';
comment on column persone_ruoli.ruolo_id is 'una persona può avere più ruoli';
alter table persone_ruoli enable row level security;

create table competenze (
  id bigint generated always as identity primary key,
  persona_id text,
  competenza text,
  livello text check (livello in ('base', 'buono', 'esperto')),
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table competenze is '01 · PERSONE · Chi usa l''Hub e chi lavora sugli eventi, dipendenti e freelance';
comment on column competenze.competenza is 'es. MIDAS, VMIX, LEDWALL, RIGGER';
alter table competenze enable row level security;

create table indisponibilita (
  indisp_id text primary key,
  persona_id text,
  dal timestamptz,
  al timestamptz,
  motivo text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table indisponibilita is '01 · PERSONE · Chi usa l''Hub e chi lavora sugli eventi, dipendenti e freelance';
alter table indisponibilita enable row level security;

create table dati_riservati (
  id bigint generated always as identity primary key,
  persona_id text,
  codice_fiscale text,
  data_nascita date,
  luogo_nascita text,
  indirizzo_residenza text,
  iban text,
  documento_tipo text check (documento_tipo in ('carta d''identità', 'passaporto', 'patente')),
  documento_numero text,
  documento_scadenza date,
  visita_medica_scadenza date,
  formazione_sicurezza_scadenza date,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table dati_riservati is '01b · PERSONE · RISERVATO · Dati sensibili del personale: accesso solo amministrazione';
alter table dati_riservati enable row level security;

create table organizzazioni (
  org_id text primary key,
  ragione_sociale text,
  nome_breve text,
  e_cliente boolean,
  e_agenzia boolean,
  e_partner boolean,
  e_fornitore boolean,
  e_gestore_location boolean,
  stato text check (stato in ('prospect', 'attivo', 'inattivo')),
  partita_iva text,
  codice_fiscale text,
  codice_sdi text,
  pec text,
  indirizzo text,
  citta text,
  paese text,
  sito text,
  condizioni_pagamento text,
  commerciale_persona_id text,
  fonte text,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table organizzazioni is '02 · CRM · Clienti, agenzie, partner e lead con rebate, contatti, contratti quadro';
comment on column organizzazioni.e_cliente is 'cliente finale';
comment on column organizzazioni.e_agenzia is 'agenzia che commissiona e paga';
comment on column organizzazioni.e_partner is 'partner o lead che segnala e prende un rebate';
comment on column organizzazioni.commerciale_persona_id is 'chi segue il rapporto';
comment on column organizzazioni.fonte is 'come è arrivato';
alter table organizzazioni enable row level security;

create table contatti (
  contatto_id text primary key,
  org_id text,
  nome text,
  cognome text,
  ruolo text,
  email text,
  telefono text,
  principale boolean,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  ruolo_contatto text[],
  cellulare text,
  reperibile_fuori_orario boolean,
  lingue text[]
);
comment on table contatti is '02 · CRM · Clienti, agenzie, partner e lead con rebate, contatti, contratti quadro';
alter table contatti enable row level security;

create table agenzie_clienti (
  rel_id text primary key,
  agenzia_org_id text,
  cliente_org_id text,
  dal date,
  al date,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table agenzie_clienti is '02 · CRM · Clienti, agenzie, partner e lead con rebate, contatti, contratti quadro';
comment on column agenzie_clienti.agenzia_org_id is 'l''agenzia';
comment on column agenzie_clienti.cliente_org_id is 'il cliente finale per cui lavora';
alter table agenzie_clienti enable row level security;

create table accordi_partner (
  accordo_id text primary key,
  partner_org_id text,
  tipo_rebate text check (tipo_rebate in ('percentuale', 'importo fisso')),
  percentuale numeric(7,3),
  importo_fisso numeric(12,2),
  base_calcolo text check (base_calcolo in ('imponibile', 'margine')),
  ambito text,
  valido_dal date,
  valido_al date,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table accordi_partner is '02 · CRM · Clienti, agenzie, partner e lead con rebate, contatti, contratti quadro';
comment on column accordi_partner.partner_org_id is 'il partner o lead';
comment on column accordi_partner.ambito is 'es. generale, oppure grafiche/tessuti/spazi';
alter table accordi_partner enable row level security;

create table segnalazioni (
  segnalazione_id text primary key,
  partner_org_id text,
  verso_org_id text,
  data date,
  accordo_id text,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table segnalazioni is '02 · CRM · Clienti, agenzie, partner e lead con rebate, contatti, contratti quadro';
comment on column segnalazioni.partner_org_id is 'chi ha passato il contatto';
comment on column segnalazioni.verso_org_id is 'agenzia o cliente a cui è stato dato il nostro contatto';
alter table segnalazioni enable row level security;

create table contratti_quadro (
  cq_id text primary key,
  org_id text,
  titolo text,
  valido_dal date,
  valido_al date,
  condizioni text,
  drive_url text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table contratti_quadro is '02 · CRM · Clienti, agenzie, partner e lead con rebate, contatti, contratti quadro';
alter table contratti_quadro enable row level security;

create table commesse (
  commessa_id text primary key,
  codice_prospect text,
  codice_definitivo text,
  stato text,
  motivo_perso text,
  titolo_evento text,
  cliente_org_id text,
  committente_org_id text,
  agenzia_org_id text,
  segnalazione_id text,
  azienda_capofila text check (azienda_capofila in ('Chedo', 'Nakama')),
  linee text,
  data_inizio date,
  data_fine date,
  location_id uuid,
  pax numeric,
  pm_persona_id text,
  backup_persona_id text,
  modulo_produzione boolean,
  modulo_logistica boolean,
  modulo_creativita boolean,
  contratto_quadro_id text,
  drive_folder_id text,
  drive_url text,
  clickup_list_id text,
  codice_gestionale_chedo text,
  codice_gestionale_nakama text,
  condizioni_pagamento text,
  ricavi_preventivo numeric(12,2),
  costi_preventivo numeric(12,2),
  margine_preventivo numeric(7,3),
  ricavi_consuntivo numeric(12,2),
  costi_consuntivo numeric(12,2),
  margine_consuntivo numeric(7,3),
  data_richiesta date,
  data_conferma timestamptz,
  confermata_da text,
  data_chiusura date,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  sales_persona_id text,
  referente_contatto_id text,
  catering_org_id text,
  lead_org_id text,
  lead_tipo text check (lead_tipo in ('rebate', 'sconto in fattura')),
  lead_percentuale numeric(7,3)
);
comment on table commesse is '03 · COMMESSE · Il registro: commesse, brief, team, calendario di progetto';
comment on column commesse.commessa_id is 'interno, non cambia mai';
comment on column commesse.codice_prospect is 'P26-014';
comment on column commesse.codice_definitivo is 'D26-007, vuoto finché prospect';
comment on column commesse.stato is 'prospect, confermata, in preparazione, in corso, consuntivo, chiusa, persa, annullata';
comment on column commesse.cliente_org_id is 'cliente finale';
comment on column commesse.committente_org_id is 'chi paga: agenzia o cliente';
comment on column commesse.agenzia_org_id is 'se c''è un''agenzia';
comment on column commesse.segnalazione_id is 'se arriva da un partner: genera il rebate';
comment on column commesse.linee is 'MCE, NOL, DIG, SERVICE, ALLESTIMENTI…';
comment on column commesse.ricavi_preventivo is 'calcolato dal costing';
comment on column commesse.costi_preventivo is 'calcolato';
comment on column commesse.margine_preventivo is 'calcolato';
comment on column commesse.ricavi_consuntivo is 'calcolato';
comment on column commesse.costi_consuntivo is 'calcolato';
comment on column commesse.margine_consuntivo is 'calcolato';
comment on column commesse.referente_contatto_id is 'referente del cliente';
comment on column commesse.lead_org_id is 'chi ha portato il cliente';
alter table commesse enable row level security;

create table brief (
  id bigint generated always as identity primary key,
  commessa_id text,
  obiettivo text,
  target_partecipanti text,
  programma text,
  servizi_richiesti text,
  budget_indicativo numeric(12,2),
  scadenze text,
  vincoli text,
  da_chiarire text,
  fonti_drive_url text,
  generato_da_ai boolean,
  validato_da text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table brief is '03 · COMMESSE · Il registro: commesse, brief, team, calendario di progetto';
comment on column brief.fonti_drive_url is '01_BRIEF/_sorgenti';
alter table brief enable row level security;

create table team (
  id bigint generated always as identity primary key,
  commessa_id text,
  persona_id text,
  ruolo_progetto text,
  dal date,
  al date,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table team is '03 · COMMESSE · Il registro: commesse, brief, team, calendario di progetto';
comment on column team.ruolo_progetto is 'es. coordinatore, fonico, hostess';
alter table team enable row level security;

create table impegni (
  impegno_id text primary key,
  commessa_id text,
  persona_id text,
  attivita text,
  inizio timestamptz,
  fine timestamptz,
  luogo text,
  notifica_gmail boolean,
  calendar_event_id text,
  stato text check (stato in ('opzionato', 'confermato', 'accettato', 'rifiutato', 'annullato')),
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fabbisogno_id text,
  fase_id text,
  posto_n numeric,
  confermato_da text,
  confermato_il timestamptz,
  titolo_calendario text
);
comment on table impegni is '03 · COMMESSE · Il registro: commesse, brief, team, calendario di progetto';
comment on column impegni.stato is 'conflitto se la persona non è disponibile';
comment on column impegni.titolo_calendario is 'es. [D26-007] Fonico · Evento · Vela Pharma · Spazio Navigli';
alter table impegni enable row level security;

create table storico_stati (
  id bigint generated always as identity primary key,
  commessa_id text,
  stato_da text,
  stato_a text,
  quando timestamptz,
  persona_id text,
  nota text
);
comment on table storico_stati is '03 · COMMESSE · Il registro: commesse, brief, team, calendario di progetto';
alter table storico_stati enable row level security;

create table file (
  file_id text primary key,
  commessa_id text,
  location_id uuid,
  drive_file_id text,
  nome text,
  cartella text,
  tipo_documento text,
  versione numeric,
  mime_type text,
  modificato_il timestamptz,
  drive_url text,
  stato_indice text check (stato_indice in ('da leggere', 'letto', 'errore')),
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table file is '04 · FILE E AI · Indice dei file Drive, riassunti AI, aggiornamenti proposti dall''AI';
comment on column file.location_id is 'se è un file di location';
comment on column file.tipo_documento is 'preventivo, costing, contratto, planimetria…';
comment on column file.modificato_il is 'su Drive';
alter table file enable row level security;

create table riassunti (
  riassunto_id text primary key,
  oggetto_tipo text check (oggetto_tipo in ('commessa', 'file', 'location')),
  oggetto_id text,
  testo text,
  modello_ai text,
  generato_il timestamptz,
  file_fonte text,
  validato boolean,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table riassunti is '04 · FILE E AI · Indice dei file Drive, riassunti AI, aggiornamenti proposti dall''AI';
comment on column riassunti.file_fonte is 'file_id usati';
alter table riassunti enable row level security;

create table proposte_ai (
  proposta_id text primary key,
  tabella text,
  record_id text,
  campo text,
  valore_attuale text,
  valore_proposto text,
  fonte_file_id text,
  stato text check (stato in ('proposta', 'approvata', 'rifiutata')),
  custode_persona_id text,
  deciso_il timestamptz,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table proposte_ai is '04 · FILE E AI · Indice dei file Drive, riassunti AI, aggiornamenti proposti dall''AI';
comment on column proposte_ai.tabella is 'es. LOCATION';
alter table proposte_ai enable row level security;

create table magazzini (
  magazzino_id text primary key,
  nome text,
  tipo text check (tipo in ('centrale', 'location', 'esterno')),
  location_id uuid,
  indirizzo text,
  responsabile_persona_id text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table magazzini is '05 · LOCATION E MAGAZZINO · Location con il proprio magazzino, catalogo, giacenze, prenotazioni, movimenti';
comment on column magazzini.location_id is 'se è il magazzino di una location';
alter table magazzini enable row level security;

create table articoli (
  articolo_id text primary key,
  codice text,
  categoria text,
  sottocategoria text,
  nome text,
  marca text,
  modello text,
  descrizione text,
  tracciato_a_pezzo boolean,
  consumabile boolean,
  unita_misura text,
  peso_kg numeric,
  lunghezza_cm numeric,
  larghezza_cm numeric,
  altezza_cm numeric,
  potenza_w numeric,
  proprietario text,
  prezzo_noleggio_giorno numeric(12,2),
  costo_acquisto numeric(12,2),
  fornitore_org_id text,
  ordine_standard numeric,
  foto_url text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  azienda_proprietaria text check (azienda_proprietaria in ('Chedo', 'Nakama')),
  costo_interno_giorno numeric(12,2),
  valore_sostituzione numeric(12,2)
);
comment on table articoli is '05 · LOCATION E MAGAZZINO · Location con il proprio magazzino, catalogo, giacenze, prenotazioni, movimenti';
comment on column articoli.categoria is 'es. 04 truss & rigging';
comment on column articoli.tracciato_a_pezzo is 'sì = ogni pezzo ha un numero di serie';
comment on column articoli.proprietario is 'Chedo, Musiclab…';
comment on column articoli.fornitore_org_id is 'per i consumabili';
comment on column articoli.ordine_standard is 'quantità di riordino';
comment on column articoli.azienda_proprietaria is 'Di chi è il bene (serve per noleggi interni e contabilità)';
comment on column articoli.costo_interno_giorno is 'Prezzo al cliente e costo interno standard';
comment on column articoli.valore_sostituzione is 'Per assicurazioni e danni';
alter table articoli enable row level security;

create table pezzi (
  pezzo_id text primary key,
  articolo_id text,
  numero_serie text,
  magazzino_id text,
  stato text check (stato in ('ok', 'in riparazione', 'dismesso')),
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table pezzi is '05 · LOCATION E MAGAZZINO · Location con il proprio magazzino, catalogo, giacenze, prenotazioni, movimenti';
comment on column pezzi.magazzino_id is 'dove si trova';
alter table pezzi enable row level security;

create table giacenze (
  id bigint generated always as identity primary key,
  articolo_id text,
  magazzino_id text,
  quantita numeric,
  fuori_servizio numeric,
  scorta_minima numeric,
  ultimo_inventario date,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table giacenze is '05 · LOCATION E MAGAZZINO · Location con il proprio magazzino, catalogo, giacenze, prenotazioni, movimenti';
comment on column giacenze.scorta_minima is 'per i consumabili';
alter table giacenze enable row level security;

create table prenotazioni (
  prenotazione_id text primary key,
  commessa_id text,
  articolo_id text,
  pezzo_id text,
  quantita numeric,
  magazzino_id text,
  dal timestamptz,
  al timestamptz,
  stato text check (stato in ('richiesta', 'confermata', 'uscita', 'rientrata', 'annullata')),
  richiesta_da text,
  confermata_da text,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table prenotazioni is '05 · LOCATION E MAGAZZINO · Location con il proprio magazzino, catalogo, giacenze, prenotazioni, movimenti';
comment on column prenotazioni.pezzo_id is 'solo se tracciato a pezzo';
comment on column prenotazioni.magazzino_id is 'da dove si preleva';
comment on column prenotazioni.dal is 'uscita';
comment on column prenotazioni.al is 'rientro';
comment on column prenotazioni.richiesta_da is 'di solito il PM';
comment on column prenotazioni.confermata_da is 'il magazziniere';
alter table prenotazioni enable row level security;

create table movimenti (
  movimento_id text primary key,
  tipo text check (tipo in ('uscita', 'rientro', 'trasferimento', 'carico', 'scarico', 'dismissione')),
  articolo_id text,
  pezzo_id text,
  quantita numeric,
  da_magazzino_id text,
  a_magazzino_id text,
  commessa_id text,
  trasporto_id text,
  quando timestamptz,
  persona_id text,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table movimenti is '05 · LOCATION E MAGAZZINO · Location con il proprio magazzino, catalogo, giacenze, prenotazioni, movimenti';
alter table movimenti enable row level security;

create table listino (
  voce_id text primary key,
  codice text,
  categoria text,
  descrizione_preventivo text,
  unita text,
  prezzo_vendita numeric(12,2),
  costo_standard numeric(12,2),
  ricarico_standard numeric(7,3),
  articolo_id text,
  azienda text check (azienda in ('Chedo', 'Nakama', 'entrambe')),
  valido_dal date,
  valido_al date,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table listino is '06 · ECONOMIA · Listino, costing, preventivi, fatture, rebate';
comment on column listino.categoria is 'service, allestimenti, grafiche, personale, segreteria…';
comment on column listino.articolo_id is 'se legata a un articolo';
alter table listino enable row level security;

create table pacchetti (
  pacchetto_id text primary key,
  nome text,
  livello text check (livello in ('base', 'medium', 'premium')),
  pax_riferimento numeric,
  prezzo numeric(12,2),
  descrizione text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table pacchetti is '06 · ECONOMIA · Listino, costing, preventivi, fatture, rebate';
alter table pacchetti enable row level security;

create table pacchetti_voci (
  id bigint generated always as identity primary key,
  pacchetto_id text,
  voce_id text,
  quantita numeric
);
comment on table pacchetti_voci is '06 · ECONOMIA · Listino, costing, preventivi, fatture, rebate';
alter table pacchetti_voci enable row level security;

create table costing (
  riga_id text primary key,
  commessa_id text,
  versione numeric,
  sezione text,
  descrizione text,
  quantita numeric,
  n_servizi numeric,
  computato boolean,
  fornitore_org_id text,
  costo_unitario numeric(12,2),
  commissione numeric(7,3),
  ricarico numeric(7,3),
  prezzo_unitario numeric(12,2),
  totale_costo numeric(12,2),
  totale_ricavo numeric(12,2),
  iva numeric(7,3),
  voce_id text,
  costo_reale numeric(12,2),
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table costing is '06 · ECONOMIA · Listino, costing, preventivi, fatture, rebate';
comment on column costing.computato is 'no = opzionale, fuori dai totali';
comment on column costing.totale_costo is 'calcolato';
comment on column costing.totale_ricavo is 'calcolato';
comment on column costing.costo_reale is 'a consuntivo';
alter table costing enable row level security;

create table preventivi (
  preventivo_id text primary key,
  commessa_id text,
  versione numeric,
  data date,
  totale numeric(12,2),
  sconto numeric(12,2),
  totale_finale numeric(12,2),
  stato text check (stato in ('bozza', 'inviato', 'firmato', 'superato')),
  doc_url text,
  pdf_url text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  ver_file_docx_id text,
  ver_file_xlsx_id text,
  ver_file_pdf_id text
);
comment on table preventivi is '06 · ECONOMIA · Listino, costing, preventivi, fatture, rebate';
comment on column preventivi.doc_url is 'Google Doc generato';
comment on column preventivi.pdf_url is 'PDF al cliente';
alter table preventivi enable row level security;

create table fatture (
  fattura_id text primary key,
  commessa_id text,
  tipo text check (tipo in ('attiva', 'passiva')),
  azienda text check (azienda in ('Chedo', 'Nakama')),
  numero text,
  data date,
  org_id text,
  imponibile numeric(12,2),
  iva numeric(12,2),
  totale numeric(12,2),
  scadenza date,
  stato_pagamento text check (stato_pagamento in ('da pagare', 'pagata', 'scaduta')),
  codice_gestionale text,
  file_id text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table fatture is '06 · ECONOMIA · Listino, costing, preventivi, fatture, rebate';
alter table fatture enable row level security;

create table rebate (
  rebate_id text primary key,
  commessa_id text,
  partner_org_id text,
  accordo_id text,
  base numeric(12,2),
  percentuale numeric(7,3),
  importo numeric(12,2),
  stato text check (stato in ('maturato', 'fatturato', 'pagato')),
  data_pagamento date,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table rebate is '06 · ECONOMIA · Listino, costing, preventivi, fatture, rebate';
comment on column rebate.base is 'imponibile o margine della commessa';
comment on column rebate.importo is 'calcolato';
alter table rebate enable row level security;

create table ordini (
  ordine_id text primary key,
  commessa_id text,
  fornitore_org_id text,
  tipo text check (tipo in ('acquisto', 'noleggio', 'servizio', 'subappalto')),
  descrizione text,
  data_ordine date,
  consegna_prevista date,
  stato text check (stato in ('da ordinare', 'preventivo richiesto', 'ordinato', 'confermato', 'in lavorazione', 'consegnato', 'annullato')),
  importo_previsto numeric(12,2),
  importo_fattura numeric(12,2),
  fattura_id text,
  responsabile_persona_id text,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table ordini is '07 · OPERATIVITÀ · Fornitori, ordini, noleggi, trasporti, grafiche, sicurezza, timesheet, to-do';
alter table ordini enable row level security;

create table ordini_righe (
  id bigint generated always as identity primary key,
  ordine_id text,
  descrizione text,
  quantita numeric,
  prezzo_unitario numeric(12,2),
  articolo_id text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table ordini_righe is '07 · OPERATIVITÀ · Fornitori, ordini, noleggi, trasporti, grafiche, sicurezza, timesheet, to-do';
alter table ordini_righe enable row level security;

create table noleggi (
  noleggio_id text primary key,
  direzione text check (direzione in ('da terzi', 'a terzi')),
  org_id text,
  commessa_id text,
  articolo_id text,
  descrizione text,
  quantita numeric,
  dal date,
  al date,
  importo numeric(12,2),
  stato text check (stato in ('richiesto', 'confermato', 'in corso', 'rientrato')),
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table noleggi is '07 · OPERATIVITÀ · Fornitori, ordini, noleggi, trasporti, grafiche, sicurezza, timesheet, to-do';
alter table noleggi enable row level security;

create table trasporti (
  trasporto_id text primary key,
  commessa_id text,
  tipo text check (tipo in ('materiale', 'persone')),
  mezzo_id uuid,
  fornitore_org_id text,
  da text,
  a text,
  partenza timestamptz,
  arrivo timestamptz,
  autista_persona_id text,
  stato text check (stato in ('pianificato', 'confermato', 'fatto')),
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table trasporti is '07 · OPERATIVITÀ · Fornitori, ordini, noleggi, trasporti, grafiche, sicurezza, timesheet, to-do';
alter table trasporti enable row level security;

create table grafiche (
  grafica_id text primary key,
  codice text,
  nome text,
  area text,
  materiale text,
  base_cm numeric,
  altezza_cm numeric,
  fornitore_org_id text,
  costo numeric(12,2),
  prezzo_vendita numeric(12,2),
  file_url text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table grafiche is '07 · OPERATIVITÀ · Fornitori, ordini, noleggi, trasporti, grafiche, sicurezza, timesheet, to-do';
comment on column grafiche.codice is 'GR-AREA-n';
alter table grafiche enable row level security;

create table sicurezza (
  doc_id text primary key,
  commessa_id text,
  location_id uuid,
  tipo text,
  file_id text,
  scadenza date,
  stato text check (stato in ('mancante', 'in revisione', 'ok')),
  responsabile_persona_id text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table sicurezza is '07 · OPERATIVITÀ · Fornitori, ordini, noleggi, trasporti, grafiche, sicurezza, timesheet, to-do';
comment on column sicurezza.tipo is 'DUVRI, POS, piano di emergenza, certificazione…';
alter table sicurezza enable row level security;

create table timesheet (
  riga_id text primary key,
  persona_id text,
  commessa_id text,
  data date,
  ore numeric,
  attivita text,
  approvato_da text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  impegno_id text,
  ore_previste numeric,
  ore_effettive numeric,
  stato text check (stato in ('previsto', 'consuntivato', 'approvato'))
);
comment on table timesheet is '07 · OPERATIVITÀ · Fornitori, ordini, noleggi, trasporti, grafiche, sicurezza, timesheet, to-do';
comment on column timesheet.ore_previste is 'dal piano';
alter table timesheet enable row level security;

create table todo_clickup (
  clickup_task_id text primary key,
  commessa_id text,
  titolo text,
  assegnatario_persona_id text,
  scadenza date,
  stato text,
  url text,
  ultimo_sync timestamptz
);
comment on table todo_clickup is '07 · OPERATIVITÀ · Fornitori, ordini, noleggi, trasporti, grafiche, sicurezza, timesheet, to-do';
comment on column todo_clickup.ultimo_sync is 'copia di sola lettura: la fonte è ClickUp';
alter table todo_clickup enable row level security;


-- ════════ ANAGRAFICHE (doc 10) ════════

create table strutture (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  tipi text[],
  nome text,
  gestore_fornitore_id uuid,
  catena_gruppo text,
  descrizione_preventivo text,
  descrizione_interna text,
  stile text[],
  indirizzo text,
  cap text,
  citta text,
  provincia text,
  regione text,
  paese text,
  coordinate point,
  zona text,
  aeroporto_riferimento text,
  distanza_aeroporto_km numeric,
  stazione_riferimento text,
  distanza_stazione_km numeric,
  distanza_centro_km numeric,
  parcheggio_posti numeric,
  parcheggio_bus boolean,
  ztl boolean,
  accesso_carico_scarico text,
  accessibilita_disabili text check (accessibilita_disabili in ('totale', 'parziale', 'no')),
  capienza_max_totale numeric,
  potenza_elettrica_kw numeric,
  wifi text,
  fornitori_obbligati text,
  vincoli text,
  residente boolean,
  sito_web text,
  cartella_drive text,
  ultimo_sopralluogo date,
  sopralluogo_da text,
  valutazione_interna numeric,
  unique (codice)
);
comment on table strutture is 'STRUTTURE · Il luogo in sé: dove si trova, come ci si arriva, vincoli. Una scheda per indirizzo';
comment on column strutture.id is 'chiave interna';
comment on column strutture.codice is 'Codice leggibile per prefisso di tabella';
comment on column strutture.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column strutture.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column strutture.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column strutture.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column strutture.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column strutture.tag is 'Etichette libere per ricerca e filtri';
comment on column strutture.note_interne is 'Note che non vanno mai al cliente';
comment on column strutture.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column strutture.creato_il is 'Tracciamento automatico';
comment on column strutture.creato_da is 'Tracciamento automatico';
comment on column strutture.aggiornato_il is 'Tracciamento automatico';
comment on column strutture.aggiornato_da is 'Tracciamento automatico';
comment on column strutture.tipi is 'Cosa è. Decide quali schede di dettaglio si aprono';
comment on column strutture.nome is 'Nome commerciale';
comment on column strutture.gestore_fornitore_id is 'Chi la gestisce e ci fattura';
comment on column strutture.catena_gruppo is 'Catena o gruppo alberghiero';
comment on column strutture.descrizione_preventivo is 'Testo breve pronto per proposte e preventivi al cliente';
comment on column strutture.descrizione_interna is 'Cosa sappiamo noi: pregi, difetti, trucchi';
comment on column strutture.stile is 'Per cercare in base al mood';
comment on column strutture.indirizzo is 'Via e numero';
comment on column strutture.cap is 'Localizzazione, una colonna ciascuno';
comment on column strutture.citta is 'Localizzazione, una colonna ciascuno';
comment on column strutture.provincia is 'Localizzazione, una colonna ciascuno';
comment on column strutture.regione is 'Localizzazione, una colonna ciascuno';
comment on column strutture.paese is 'Localizzazione, una colonna ciascuno';
comment on column strutture.coordinate is 'Latitudine e longitudine per mappa e distanze';
comment on column strutture.zona is 'Zona riconoscibile';
comment on column strutture.aeroporto_riferimento is 'Aeroporto più comodo e distanza';
comment on column strutture.distanza_aeroporto_km is 'Aeroporto più comodo e distanza';
comment on column strutture.stazione_riferimento is 'Stazione più comoda e distanza';
comment on column strutture.distanza_stazione_km is 'Stazione più comoda e distanza';
comment on column strutture.distanza_centro_km is 'Distanza dal centro città';
comment on column strutture.parcheggio_posti is 'Posti auto e se i bus GT possono arrivare e sostare';
comment on column strutture.parcheggio_bus is 'Posti auto e se i bus GT possono arrivare e sostare';
comment on column strutture.ztl is 'In zona a traffico limitato: servono permessi per mezzi e carichi';
comment on column strutture.accesso_carico_scarico is 'Da dove si scarica, dimensioni passaggi, montacarichi, orari consentiti';
comment on column strutture.accessibilita_disabili is 'Accessibilità generale';
comment on column strutture.capienza_max_totale is 'Persone massime dell''intera struttura (da agibilità)';
comment on column strutture.potenza_elettrica_kw is 'Potenza disponibile per eventi. Oltre serve generatore';
comment on column strutture.wifi is 'Banda e note (dedicato eventi? cablato in sala?)';
comment on column strutture.fornitori_obbligati is 'Catering, service o allestitori esclusivi imposti dalla struttura';
comment on column strutture.vincoli is 'Limiti di orario, musica, decibel, fumo, fiamme, droni';
comment on column strutture.residente is 'Chedo o Nakama sono fornitori fissi della struttura';
comment on column strutture.cartella_drive is 'Cartella Drive con foto, planimetrie, listini';
comment on column strutture.ultimo_sopralluogo is 'Chi l''ha vista dal vivo e quando';
comment on column strutture.sopralluogo_da is 'Chi l''ha vista dal vivo e quando';
comment on column strutture.valutazione_interna is 'Quanto ci siamo trovati bene';
alter table strutture enable row level security;

create table spazi (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  struttura_id uuid,
  spazio_padre_id uuid,
  nome text,
  tipo text check (tipo in ('plenaria', 'sala meeting', 'sala banchetti', 'foyer', 'terrazza', 'giardino', 'area esterna', 'sala privata ristorante', 'intera struttura', 'altro')),
  interno_esterno text check (interno_esterno in ('interno', 'esterno', 'coperto esterno')),
  piano text,
  mq numeric,
  lunghezza_m numeric,
  larghezza_m numeric,
  altezza_soffitto_m numeric,
  punti_appendimento boolean,
  portata_appendimento_kg numeric,
  portata_pavimento_kg_mq numeric,
  porta_accesso_cm text,
  luce_naturale boolean,
  oscurabile boolean,
  ostacoli text,
  dotazioni_incluse text[],
  potenza_elettrica_kw numeric,
  climatizzazione text check (climatizzazione in ('sì', 'solo riscaldamento', 'no')),
  prezzo_mezza_giornata numeric(12,2),
  prezzo_giornata numeric(12,2),
  prezzo_giorno_allestimento numeric(12,2),
  tipo_prezzo text check (tipo_prezzo in ('netto', 'commissionabile', 'pubblico')),
  iva_inclusa boolean,
  planimetria uuid,
  unique (codice)
);
comment on table spazi is 'STRUTTURE · Ogni spazio prenotabile dentro una struttura: sala, terrazza, giardino, sala privata del ristorante. Uno spazio può contenerne altri (sala divisibile)';
comment on column spazi.id is 'chiave interna';
comment on column spazi.codice is 'Codice leggibile per prefisso di tabella';
comment on column spazi.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column spazi.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column spazi.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column spazi.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column spazi.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column spazi.tag is 'Etichette libere per ricerca e filtri';
comment on column spazi.note_interne is 'Note che non vanno mai al cliente';
comment on column spazi.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column spazi.creato_il is 'Tracciamento automatico';
comment on column spazi.creato_da is 'Tracciamento automatico';
comment on column spazi.aggiornato_il is 'Tracciamento automatico';
comment on column spazi.aggiornato_da is 'Tracciamento automatico';
comment on column spazi.struttura_id is 'Di quale struttura fa parte';
comment on column spazi.spazio_padre_id is 'Se è una parte di uno spazio più grande (sala divisibile)';
comment on column spazi.mq is 'Superficie calpestabile';
comment on column spazi.lunghezza_m is 'Dimensioni principali';
comment on column spazi.larghezza_m is 'Dimensioni principali';
comment on column spazi.altezza_soffitto_m is 'Altezza libera minima';
comment on column spazi.punti_appendimento is 'Si può appendere americana o ledwall? Con che carico per punto';
comment on column spazi.portata_appendimento_kg is 'Si può appendere americana o ledwall? Con che carico per punto';
comment on column spazi.portata_pavimento_kg_mq is 'Per palchi, auto, strutture pesanti';
comment on column spazi.porta_accesso_cm is 'Dimensioni del passaggio più stretto per il materiale';
comment on column spazi.luce_naturale is 'Finestre e possibilità di oscurare per proiezioni';
comment on column spazi.oscurabile is 'Finestre e possibilità di oscurare per proiezioni';
comment on column spazi.ostacoli is 'Colonne, gradini, pavimenti delicati, affreschi';
comment on column spazi.dotazioni_incluse is 'Cosa c''è già e non paghiamo a parte';
comment on column spazi.potenza_elettrica_kw is 'Potenza disponibile nella sala';
comment on column spazi.prezzo_mezza_giornata is 'Affitto dello spazio, al netto o pubblico (vedi tipo_prezzo)';
comment on column spazi.prezzo_giornata is 'Affitto dello spazio, al netto o pubblico (vedi tipo_prezzo)';
comment on column spazi.prezzo_giorno_allestimento is 'Costo per i giorni di montaggio e smontaggio';
comment on column spazi.planimetria is 'Pianta con quote';
alter table spazi enable row level security;

create table spazi_capienze (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  spazio_id uuid,
  layout text check (layout in ('platea', 'banchi scuola', 'ferro di cavallo', 'boardroom', 'banchetto tondi', 'cabaret', 'cocktail in piedi', 'gala con palco')),
  pax_max numeric,
  note text,
  unique (codice)
);
comment on table spazi_capienze is 'STRUTTURE · Quante persone stanno in uno spazio per ogni disposizione. Una riga per layout';
comment on column spazi_capienze.id is 'chiave interna';
comment on column spazi_capienze.codice is 'Codice leggibile per prefisso di tabella';
comment on column spazi_capienze.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column spazi_capienze.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column spazi_capienze.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column spazi_capienze.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column spazi_capienze.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column spazi_capienze.tag is 'Etichette libere per ricerca e filtri';
comment on column spazi_capienze.note_interne is 'Note che non vanno mai al cliente';
comment on column spazi_capienze.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column spazi_capienze.creato_il is 'Tracciamento automatico';
comment on column spazi_capienze.creato_da is 'Tracciamento automatico';
comment on column spazi_capienze.aggiornato_il is 'Tracciamento automatico';
comment on column spazi_capienze.aggiornato_da is 'Tracciamento automatico';
comment on column spazi_capienze.pax_max is 'Persone massime con quel layout';
comment on column spazi_capienze.note is 'Es. ''con palco 8×4 scende a 300''';
alter table spazi_capienze enable row level security;

create table hotel (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  struttura_id uuid,
  stelle text check (stelle in ('1', '2', '3', '3S', '4', '4S', '5', '5L')),
  categoria text[],
  camere_totali numeric,
  camere_max_gruppo numeric,
  check_in time,
  check_out time,
  ristoranti_interni numeric,
  coperti_ristorante numeric,
  servizi text[],
  tassa_soggiorno numeric(12,2),
  politica_cancellazione_gruppi text,
  release_giorni numeric,
  deposito_richiesto numeric(7,3),
  commissione_agenzia numeric(7,3),
  canale_prenotazione text check (canale_prenotazione in ('diretto', 'Alpitour', 'altra piattaforma', 'tramite DMC')),
  codice_su_piattaforma text,
  contatto_gruppi_id text,
  contatto_eventi_id text,
  certificazioni_green text[],
  unique (codice)
);
comment on table hotel is 'HOTEL · Scheda hotel collegata alla struttura (una per hotel)';
comment on column hotel.id is 'chiave interna';
comment on column hotel.codice is 'Codice leggibile per prefisso di tabella';
comment on column hotel.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column hotel.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column hotel.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column hotel.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column hotel.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column hotel.tag is 'Etichette libere per ricerca e filtri';
comment on column hotel.note_interne is 'Note che non vanno mai al cliente';
comment on column hotel.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column hotel.creato_il is 'Tracciamento automatico';
comment on column hotel.creato_da is 'Tracciamento automatico';
comment on column hotel.aggiornato_il is 'Tracciamento automatico';
comment on column hotel.aggiornato_da is 'Tracciamento automatico';
comment on column hotel.struttura_id is 'La struttura di riferimento';
comment on column hotel.stelle is 'Classificazione ufficiale';
comment on column hotel.camere_totali is 'Camere dell''hotel';
comment on column hotel.camere_max_gruppo is 'Quante camere concedono di solito a un gruppo';
comment on column hotel.politica_cancellazione_gruppi is 'Penali e scadenze per i gruppi';
comment on column hotel.release_giorni is 'Giorni prima dell''arrivo entro cui si liberano le camere non confermate';
comment on column hotel.deposito_richiesto is 'Acconto richiesto alla conferma';
comment on column hotel.commissione_agenzia is 'Commissione riconosciuta a noi sulle tariffe commissionabili';
comment on column hotel.canale_prenotazione is 'Da dove prenotiamo di solito';
comment on column hotel.codice_su_piattaforma is 'Codice dell''hotel su Alpitour o altra piattaforma, per il collegamento col leisure';
comment on column hotel.contatto_gruppi_id is 'Referenti per camere gruppi e per sale/eventi';
comment on column hotel.contatto_eventi_id is 'Referenti per camere gruppi e per sale/eventi';
alter table hotel enable row level security;

create table camere_tipologie (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  hotel_id uuid,
  nome text,
  categoria text check (categoria in ('standard', 'superior', 'deluxe', 'executive', 'junior suite', 'suite')),
  numero_camere numeric,
  mq numeric,
  letti text check (letti in ('matrimoniale', 'twin', 'matrimoniale + divano letto', 'singolo')),
  occupazione_max numeric,
  uso_singola boolean,
  vista text,
  accessibile boolean,
  comunicanti boolean,
  unique (codice)
);
comment on table camere_tipologie is 'HOTEL · Le tipologie di camera dell''hotel. Una riga per tipologia';
comment on column camere_tipologie.id is 'chiave interna';
comment on column camere_tipologie.codice is 'Codice leggibile per prefisso di tabella';
comment on column camere_tipologie.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column camere_tipologie.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column camere_tipologie.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column camere_tipologie.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column camere_tipologie.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column camere_tipologie.tag is 'Etichette libere per ricerca e filtri';
comment on column camere_tipologie.note_interne is 'Note che non vanno mai al cliente';
comment on column camere_tipologie.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column camere_tipologie.creato_il is 'Tracciamento automatico';
comment on column camere_tipologie.creato_da is 'Tracciamento automatico';
comment on column camere_tipologie.aggiornato_il is 'Tracciamento automatico';
comment on column camere_tipologie.aggiornato_da is 'Tracciamento automatico';
comment on column camere_tipologie.nome is 'Nome usato dall''hotel';
comment on column camere_tipologie.categoria is 'Per confrontare hotel diversi';
comment on column camere_tipologie.numero_camere is 'Quante ne hanno di questo tipo';
comment on column camere_tipologie.occupazione_max is 'Persone massime';
comment on column camere_tipologie.uso_singola is 'Vendibile come DUS';
alter table camere_tipologie enable row level security;

create table tariffe_hotel (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  hotel_id uuid,
  tipologia_id uuid,
  periodo_dal date,
  periodo_al date,
  giorni_settimana text[],
  occupazione text check (occupazione in ('DUS', 'DBL', 'TPL')),
  trattamento text check (trattamento in ('RO', 'BB', 'HB', 'FB', 'AI')),
  prezzo_notte numeric(12,2),
  tipo_prezzo text check (tipo_prezzo in ('netto', 'commissionabile', 'pubblico')),
  iva_inclusa boolean,
  tassa_soggiorno_inclusa boolean,
  min_notti numeric,
  allotment_camere numeric,
  release_giorni numeric,
  valida_per text check (valida_per in ('gruppi', 'individuali', 'entrambi')),
  fonte_link text,
  unique (codice)
);
comment on table tariffe_hotel is 'HOTEL · Prezzi delle camere per periodo, occupazione e trattamento. Ogni riga è validabile e scade';
comment on column tariffe_hotel.id is 'chiave interna';
comment on column tariffe_hotel.codice is 'Codice leggibile per prefisso di tabella';
comment on column tariffe_hotel.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column tariffe_hotel.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column tariffe_hotel.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column tariffe_hotel.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column tariffe_hotel.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column tariffe_hotel.tag is 'Etichette libere per ricerca e filtri';
comment on column tariffe_hotel.note_interne is 'Note che non vanno mai al cliente';
comment on column tariffe_hotel.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column tariffe_hotel.creato_il is 'Tracciamento automatico';
comment on column tariffe_hotel.creato_da is 'Tracciamento automatico';
comment on column tariffe_hotel.aggiornato_il is 'Tracciamento automatico';
comment on column tariffe_hotel.aggiornato_da is 'Tracciamento automatico';
comment on column tariffe_hotel.periodo_dal is 'Stagione o periodo di validità';
comment on column tariffe_hotel.periodo_al is 'Stagione o periodo di validità';
comment on column tariffe_hotel.giorni_settimana is 'Se la tariffa vale solo alcuni giorni (es. weekend)';
comment on column tariffe_hotel.occupazione is 'Doppia uso singola, doppia, tripla';
comment on column tariffe_hotel.trattamento is 'Solo pernottamento, B&B, mezza pensione, pensione completa, all inclusive';
comment on column tariffe_hotel.prezzo_notte is 'Prezzo della camera a notte';
comment on column tariffe_hotel.allotment_camere is 'Camere bloccate per noi a questa tariffa';
comment on column tariffe_hotel.release_giorni is 'Se diverso da quello standard dell''hotel';
comment on column tariffe_hotel.fonte_link is 'Offerta o listino da cui arriva il prezzo';
alter table tariffe_hotel enable row level security;

create table pacchetti_meeting (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  hotel_id uuid,
  nome text check (nome in ('mezza giornata', 'giornata intera', 'residenziale', 'altro')),
  cosa_include text,
  prezzo_persona numeric(12,2),
  pax_min numeric,
  valido_dal date,
  valido_al date,
  unique (codice)
);
comment on table pacchetti_meeting is 'HOTEL · Pacchetti a persona per riunioni (DDR, mezza giornata, residenziale)';
comment on column pacchetti_meeting.id is 'chiave interna';
comment on column pacchetti_meeting.codice is 'Codice leggibile per prefisso di tabella';
comment on column pacchetti_meeting.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column pacchetti_meeting.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column pacchetti_meeting.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column pacchetti_meeting.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column pacchetti_meeting.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column pacchetti_meeting.tag is 'Etichette libere per ricerca e filtri';
comment on column pacchetti_meeting.note_interne is 'Note che non vanno mai al cliente';
comment on column pacchetti_meeting.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column pacchetti_meeting.creato_il is 'Tracciamento automatico';
comment on column pacchetti_meeting.creato_da is 'Tracciamento automatico';
comment on column pacchetti_meeting.aggiornato_il is 'Tracciamento automatico';
comment on column pacchetti_meeting.aggiornato_da is 'Tracciamento automatico';
comment on column pacchetti_meeting.cosa_include is 'Sala, coffee break, pranzo, dotazioni';
alter table pacchetti_meeting enable row level security;

create table ristoranti (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  struttura_id uuid,
  cucina text[],
  fascia_prezzo text check (fascia_prezzo in ('€', '€€', '€€€', '€€€€')),
  prezzo_medio_persona numeric(12,2),
  coperti_totali numeric,
  coperti_max_gruppo numeric,
  esclusiva_possibile boolean,
  minimo_spesa_esclusiva numeric(12,2),
  giorno_chiusura text,
  orari text,
  opzioni_dietetiche text[],
  riconoscimenti text,
  dehors boolean,
  musica_ammessa boolean,
  unique (codice)
);
comment on table ristoranti is 'RISTORAZIONE · Scheda ristorante collegata alla struttura. Le sale private sono spazi';
comment on column ristoranti.id is 'chiave interna';
comment on column ristoranti.codice is 'Codice leggibile per prefisso di tabella';
comment on column ristoranti.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column ristoranti.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column ristoranti.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column ristoranti.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column ristoranti.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column ristoranti.tag is 'Etichette libere per ricerca e filtri';
comment on column ristoranti.note_interne is 'Note che non vanno mai al cliente';
comment on column ristoranti.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column ristoranti.creato_il is 'Tracciamento automatico';
comment on column ristoranti.creato_da is 'Tracciamento automatico';
comment on column ristoranti.aggiornato_il is 'Tracciamento automatico';
comment on column ristoranti.aggiornato_da is 'Tracciamento automatico';
comment on column ristoranti.esclusiva_possibile is 'Si può chiudere il locale per noi e a che minimo';
comment on column ristoranti.minimo_spesa_esclusiva is 'Si può chiudere il locale per noi e a che minimo';
comment on column ristoranti.riconoscimenti is 'Guide e premi';
alter table ristoranti enable row level security;

create table catering (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fornitore_id uuid,
  servizi text[],
  pax_min numeric,
  pax_max numeric,
  raggio_operativo_km numeric,
  costo_trasferta numeric(12,2),
  cucina_mobile boolean,
  include_personale boolean,
  include_attrezzatura boolean,
  strutture_convenzionate uuid[],
  unique (codice)
);
comment on table catering is 'RISTORAZIONE · Scheda del fornitore di catering: cosa sa fare e dove arriva';
comment on column catering.id is 'chiave interna';
comment on column catering.codice is 'Codice leggibile per prefisso di tabella';
comment on column catering.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column catering.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column catering.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column catering.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column catering.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column catering.tag is 'Etichette libere per ricerca e filtri';
comment on column catering.note_interne is 'Note che non vanno mai al cliente';
comment on column catering.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column catering.creato_il is 'Tracciamento automatico';
comment on column catering.creato_da is 'Tracciamento automatico';
comment on column catering.aggiornato_il is 'Tracciamento automatico';
comment on column catering.aggiornato_da is 'Tracciamento automatico';
comment on column catering.raggio_operativo_km is 'Fin dove arriva e quanto costa uscire dalla zona';
comment on column catering.costo_trasferta is 'Fin dove arriva e quanto costa uscire dalla zona';
comment on column catering.cucina_mobile is 'Può cucinare in location senza cucina';
comment on column catering.include_personale is 'Camerieri, tavoli, tovagliato, stoviglie compresi';
comment on column catering.include_attrezzatura is 'Camerieri, tavoli, tovagliato, stoviglie compresi';
comment on column catering.strutture_convenzionate is 'Location dove è già accreditato o in esclusiva';
alter table catering enable row level security;

create table menu (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fornitore_id uuid,
  struttura_id uuid,
  nome text,
  tipo_servizio text check (tipo_servizio in ('coffee break', 'light lunch', 'buffet', 'cena placé', 'cocktail', 'finger food', 'brunch')),
  portate text,
  bevande text check (bevande in ('escluse', 'acqua e caffè', 'acqua e vino', 'open bar')),
  prezzo_persona numeric(12,2),
  pax_min numeric,
  personale_incluso boolean,
  opzioni_dietetiche text[],
  valido_dal date,
  valido_al date,
  unique (codice)
);
comment on table menu is 'RISTORAZIONE · Proposte di menu di ristoranti e catering';
comment on column menu.id is 'chiave interna';
comment on column menu.codice is 'Codice leggibile per prefisso di tabella';
comment on column menu.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column menu.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column menu.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column menu.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column menu.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column menu.tag is 'Etichette libere per ricerca e filtri';
comment on column menu.note_interne is 'Note che non vanno mai al cliente';
comment on column menu.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column menu.creato_il is 'Tracciamento automatico';
comment on column menu.creato_da is 'Tracciamento automatico';
comment on column menu.aggiornato_il is 'Tracciamento automatico';
comment on column menu.aggiornato_da is 'Tracciamento automatico';
comment on column menu.fornitore_id is 'Chi lo propone (catering) o dove (ristorante)';
comment on column menu.struttura_id is 'Chi lo propone (catering) o dove (ristorante)';
comment on column menu.portate is 'Composizione del menu';
comment on column menu.opzioni_dietetiche is 'Varianti disponibili';
alter table menu enable row level security;

create table fornitori (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  org_id text,
  categorie text[],
  sottocategorie text[],
  descrizione_servizi text,
  usato_da text check (usato_da in ('Chedo', 'Nakama', 'entrambe')),
  livello text check (livello in ('preferito', 'approvato', 'occasionale', 'da provare', 'sconsigliato')),
  valutazione numeric,
  sconto_ricevuto numeric(7,3),
  condizioni_pagamento text,
  modalita_ordine text check (modalita_ordine in ('email', 'portale', 'telefono')),
  email_ordini text,
  preavviso_giorni numeric,
  lingue text[],
  canale text check (canale in ('diretto', 'tramite DMC', 'tramite Alpitour', 'tramite agenzia')),
  referente_interno_id text,
  ultimo_utilizzo date,
  numero_commesse numeric,
  unique (codice)
);
comment on table fornitori is 'FORNITORI · Profilo fornitore. Si appoggia all''anagrafica aziende già esistente (ORGANIZZAZIONI: ragione sociale, P.IVA, SDI, PEC)';
comment on column fornitori.id is 'chiave interna';
comment on column fornitori.codice is 'Codice leggibile per prefisso di tabella';
comment on column fornitori.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column fornitori.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column fornitori.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column fornitori.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column fornitori.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column fornitori.tag is 'Etichette libere per ricerca e filtri';
comment on column fornitori.note_interne is 'Note che non vanno mai al cliente';
comment on column fornitori.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column fornitori.creato_il is 'Tracciamento automatico';
comment on column fornitori.creato_da is 'Tracciamento automatico';
comment on column fornitori.aggiornato_il is 'Tracciamento automatico';
comment on column fornitori.aggiornato_da is 'Tracciamento automatico';
comment on column fornitori.org_id is 'L''azienda (dati fiscali già nell''anagrafica)';
comment on column fornitori.categorie is 'Le categorie del database a cui appartiene';
comment on column fornitori.sottocategorie is 'Più di dettaglio (es. service → audio, video, luci)';
comment on column fornitori.descrizione_servizi is 'Cosa fa, in parole nostre';
comment on column fornitori.livello is 'Quanto lo raccomandiamo';
comment on column fornitori.valutazione is 'Media delle valutazioni a fine commessa';
comment on column fornitori.sconto_ricevuto is 'Sconto riservato a noi sul suo listino';
comment on column fornitori.modalita_ordine is 'Come si ordina';
comment on column fornitori.email_ordini is 'Come si ordina';
comment on column fornitori.preavviso_giorni is 'Con quanto anticipo va ingaggiato';
comment on column fornitori.lingue is 'Lingue parlate dallo staff';
comment on column fornitori.referente_interno_id is 'Chi di noi tiene il rapporto';
comment on column fornitori.ultimo_utilizzo is 'Calcolati dalle commesse';
comment on column fornitori.numero_commesse is 'Calcolati dalle commesse';
alter table fornitori enable row level security;

create table fornitori_aree (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fornitore_id uuid,
  paese text,
  regione text,
  citta text,
  raggio_km numeric,
  sede_operativa boolean,
  unique (codice)
);
comment on table fornitori_aree is 'FORNITORI · Dove opera un fornitore (fondamentale per DMC, transfer, catering, personale)';
comment on column fornitori_aree.id is 'chiave interna';
comment on column fornitori_aree.codice is 'Codice leggibile per prefisso di tabella';
comment on column fornitori_aree.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column fornitori_aree.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column fornitori_aree.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column fornitori_aree.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column fornitori_aree.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column fornitori_aree.tag is 'Etichette libere per ricerca e filtri';
comment on column fornitori_aree.note_interne is 'Note che non vanno mai al cliente';
comment on column fornitori_aree.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column fornitori_aree.creato_il is 'Tracciamento automatico';
comment on column fornitori_aree.creato_da is 'Tracciamento automatico';
comment on column fornitori_aree.aggiornato_il is 'Tracciamento automatico';
comment on column fornitori_aree.aggiornato_da is 'Tracciamento automatico';
comment on column fornitori_aree.paese is 'Area coperta: anche solo paese o regione';
comment on column fornitori_aree.regione is 'Area coperta: anche solo paese o regione';
comment on column fornitori_aree.citta is 'Area coperta: anche solo paese o regione';
comment on column fornitori_aree.raggio_km is 'Se lavora in un raggio da una città';
comment on column fornitori_aree.sede_operativa is 'Ha una base qui (niente trasferta)';
alter table fornitori_aree enable row level security;

create table offerte (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fornitore_id uuid,
  categoria text,
  sottocategoria text,
  nome text,
  descrizione_preventivo text,
  unita text check (unita in ('pezzo', 'giorno', 'ora', 'persona', 'servizio', 'forfait', 'km', 'mq', 'metro lineare')),
  prezzo_listino numeric(12,2),
  costo_netto numeric(12,2),
  iva numeric(7,3),
  quantita_min numeric,
  quantita_disponibile numeric,
  tempi_consegna_giorni numeric,
  valido_dal date,
  valido_al date,
  articolo_equivalente_id text,
  foto uuid,
  scheda_tecnica uuid,
  unique (codice)
);
comment on table offerte is 'FORNITORI · Il catalogo di tutto ciò che un fornitore vende, con prezzo. È la fonte delle voci di preventivo per service, allestimenti, grafiche, gadget, biglietteria, segreteria, art e personale da agenzia';
comment on column offerte.id is 'chiave interna';
comment on column offerte.codice is 'Codice leggibile per prefisso di tabella';
comment on column offerte.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column offerte.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column offerte.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column offerte.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column offerte.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column offerte.tag is 'Etichette libere per ricerca e filtri';
comment on column offerte.note_interne is 'Note che non vanno mai al cliente';
comment on column offerte.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column offerte.creato_il is 'Tracciamento automatico';
comment on column offerte.creato_da is 'Tracciamento automatico';
comment on column offerte.aggiornato_il is 'Tracciamento automatico';
comment on column offerte.aggiornato_da is 'Tracciamento automatico';
comment on column offerte.descrizione_preventivo is 'Come appare nel preventivo al cliente';
comment on column offerte.prezzo_listino is 'Prezzo pubblico del fornitore';
comment on column offerte.costo_netto is 'Quanto lo paghiamo noi';
comment on column offerte.quantita_min is 'Ordine minimo';
comment on column offerte.quantita_disponibile is 'Quanti ne ha, se si sa';
comment on column offerte.articolo_equivalente_id is 'Se è un noleggio da terzi di qualcosa che abbiamo anche in magazzino';
alter table offerte enable row level security;

create table accordi_fornitore (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fornitore_id uuid,
  tipo text check (tipo in ('convenzione', 'commissione', 'rebate a nostro favore', 'esclusiva', 'partnership commerciale')),
  percentuale numeric(7,3),
  importo_fisso numeric(12,2),
  base_calcolo text check (base_calcolo in ('imponibile', 'fatturato annuo', 'per pax', 'per notte')),
  codice_convenzione text,
  valido_dal date,
  valido_al date,
  condizioni text,
  contratto uuid,
  unique (codice)
);
comment on table accordi_fornitore is 'FORNITORI · Partnership e convenzioni: sconti, commissioni, rebate a nostro favore, esclusive';
comment on column accordi_fornitore.id is 'chiave interna';
comment on column accordi_fornitore.codice is 'Codice leggibile per prefisso di tabella';
comment on column accordi_fornitore.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column accordi_fornitore.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column accordi_fornitore.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column accordi_fornitore.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column accordi_fornitore.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column accordi_fornitore.tag is 'Etichette libere per ricerca e filtri';
comment on column accordi_fornitore.note_interne is 'Note che non vanno mai al cliente';
comment on column accordi_fornitore.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column accordi_fornitore.creato_il is 'Tracciamento automatico';
comment on column accordi_fornitore.creato_da is 'Tracciamento automatico';
comment on column accordi_fornitore.aggiornato_il is 'Tracciamento automatico';
comment on column accordi_fornitore.aggiornato_da is 'Tracciamento automatico';
comment on column accordi_fornitore.codice_convenzione is 'Codice da citare quando si prenota';
alter table accordi_fornitore enable row level security;

create table veicoli (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  proprietario text check (proprietario in ('Chedo', 'Nakama', 'fornitore')),
  fornitore_id uuid,
  tipo text,
  posti numeric,
  quantita numeric,
  marca_modello text,
  targa text,
  classe_euro text,
  anno numeric,
  accessibile_disabili boolean,
  wifi_bordo boolean,
  portata_kg numeric,
  vano_dimensioni text,
  sponda_idraulica boolean,
  patente_richiesta text check (patente_richiesta in ('B', 'C', 'D', 'CE')),
  unique (codice)
);
comment on table veicoli is 'TRASPORTI · Tipi di veicolo disponibili: i nostri furgoni e le flotte dei fornitori (una riga per tipo e fornitore)';
comment on column veicoli.id is 'chiave interna';
comment on column veicoli.codice is 'Codice leggibile per prefisso di tabella';
comment on column veicoli.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column veicoli.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column veicoli.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column veicoli.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column veicoli.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column veicoli.tag is 'Etichette libere per ricerca e filtri';
comment on column veicoli.note_interne is 'Note che non vanno mai al cliente';
comment on column veicoli.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column veicoli.creato_il is 'Tracciamento automatico';
comment on column veicoli.creato_da is 'Tracciamento automatico';
comment on column veicoli.aggiornato_il is 'Tracciamento automatico';
comment on column veicoli.aggiornato_da is 'Tracciamento automatico';
comment on column veicoli.fornitore_id is 'Se è di un fornitore';
comment on column veicoli.posti is 'Passeggeri (escluso autista)';
comment on column veicoli.quantita is 'Quanti ne ha di questo tipo';
comment on column veicoli.marca_modello is 'Solo per i nostri mezzi';
comment on column veicoli.targa is 'Solo per i nostri mezzi';
comment on column veicoli.classe_euro is 'Per le ZTL e i clienti attenti all''ambiente';
comment on column veicoli.anno is 'Per le ZTL e i clienti attenti all''ambiente';
comment on column veicoli.portata_kg is 'Per i mezzi da carico';
comment on column veicoli.vano_dimensioni is 'Per i mezzi da carico';
comment on column veicoli.sponda_idraulica is 'Per i mezzi da carico';
comment on column veicoli.patente_richiesta is 'Per i nostri mezzi';
alter table veicoli enable row level security;

create table tariffe_trasporto (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fornitore_id uuid,
  tipo_veicolo text,
  tipo_servizio text check (tipo_servizio in ('transfer aeroporto', 'transfer punto-punto', 'disposizione oraria', 'mezza giornata', 'giornata intera', 'a km')),
  tratta_da text,
  tratta_a text,
  prezzo numeric(12,2),
  unita text check (unita in ('a tratta', 'ora', 'giorno', 'km')),
  ore_incluse numeric,
  km_inclusi numeric,
  extra_ora numeric(12,2),
  extra_km numeric(12,2),
  supplemento_notturno numeric(7,3),
  supplemento_festivo numeric(7,3),
  pedaggi_parcheggi_inclusi boolean,
  vitto_autista_incluso boolean,
  valido_dal date,
  valido_al date,
  unique (codice)
);
comment on table tariffe_trasporto is 'TRASPORTI · Prezzi dei fornitori di transfer e trasporto';
comment on column tariffe_trasporto.id is 'chiave interna';
comment on column tariffe_trasporto.codice is 'Codice leggibile per prefisso di tabella';
comment on column tariffe_trasporto.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column tariffe_trasporto.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column tariffe_trasporto.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column tariffe_trasporto.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column tariffe_trasporto.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column tariffe_trasporto.tag is 'Etichette libere per ricerca e filtri';
comment on column tariffe_trasporto.note_interne is 'Note che non vanno mai al cliente';
comment on column tariffe_trasporto.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column tariffe_trasporto.creato_il is 'Tracciamento automatico';
comment on column tariffe_trasporto.creato_da is 'Tracciamento automatico';
comment on column tariffe_trasporto.aggiornato_il is 'Tracciamento automatico';
comment on column tariffe_trasporto.aggiornato_da is 'Tracciamento automatico';
comment on column tariffe_trasporto.tratta_da is 'Per i transfer a tratta fissa';
comment on column tariffe_trasporto.tratta_a is 'Per i transfer a tratta fissa';
alter table tariffe_trasporto enable row level security;

create table esperienze (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fornitore_id uuid,
  nome text,
  categoria text check (categoria in ('teambuilding', 'tour guidato', 'outdoor', 'enogastronomia', 'workshop', 'show', 'intrattenimento', 'sport', 'CSR')),
  descrizione_preventivo text,
  durata_ore numeric,
  pax_min numeric,
  pax_max numeric,
  interno_esterno text,
  dipende_meteo boolean,
  piano_b text,
  struttura_id uuid,
  citta text,
  mesi_disponibili text[],
  lingue text[],
  impegno_fisico text check (impegno_fisico in ('basso', 'medio', 'alto')),
  prezzo numeric(12,2),
  unita text check (unita in ('a persona', 'forfait', 'a gruppo')),
  incluso text,
  escluso text,
  preavviso_giorni numeric,
  foto uuid,
  video uuid,
  unique (codice)
);
comment on table esperienze is 'ESPERIENZE E TALENT · Ogni attività vendibile: teambuilding, tour, show, workshop';
comment on column esperienze.id is 'chiave interna';
comment on column esperienze.codice is 'Codice leggibile per prefisso di tabella';
comment on column esperienze.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column esperienze.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column esperienze.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column esperienze.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column esperienze.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column esperienze.tag is 'Etichette libere per ricerca e filtri';
comment on column esperienze.note_interne is 'Note che non vanno mai al cliente';
comment on column esperienze.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column esperienze.creato_il is 'Tracciamento automatico';
comment on column esperienze.creato_da is 'Tracciamento automatico';
comment on column esperienze.aggiornato_il is 'Tracciamento automatico';
comment on column esperienze.aggiornato_da is 'Tracciamento automatico';
comment on column esperienze.struttura_id is 'Dove si svolge (se fisso)';
comment on column esperienze.citta is 'Dove si svolge (se fisso)';
comment on column esperienze.mesi_disponibili is 'Stagionalità';
alter table esperienze enable row level security;

create table talent (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  nome_arte text,
  nome_reale text,
  categorie text[],
  temi_generi text,
  lingue text[],
  bio_breve text,
  citta_base text,
  agenzia_fornitore_id uuid,
  cachet_min numeric(12,2),
  cachet_max numeric(12,2),
  cachet_note text,
  durata_intervento_min numeric,
  elementi numeric,
  rider_tecnico uuid,
  rider_ospitalita uuid,
  esigenze_palco text,
  link_video text,
  link_social text,
  follower numeric,
  limitazioni text,
  ultima_collaborazione date,
  valutazione numeric,
  unique (codice)
);
comment on table talent is 'ESPERIENZE E TALENT · Speaker, presentatori, artisti, musicisti, comici, performer, influencer';
comment on column talent.id is 'chiave interna';
comment on column talent.codice is 'Codice leggibile per prefisso di tabella';
comment on column talent.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column talent.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column talent.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column talent.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column talent.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column talent.tag is 'Etichette libere per ricerca e filtri';
comment on column talent.note_interne is 'Note che non vanno mai al cliente';
comment on column talent.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column talent.creato_il is 'Tracciamento automatico';
comment on column talent.creato_da is 'Tracciamento automatico';
comment on column talent.aggiornato_il is 'Tracciamento automatico';
comment on column talent.aggiornato_da is 'Tracciamento automatico';
comment on column talent.temi_generi is 'Su cosa parla o che genere fa';
comment on column talent.bio_breve is 'Pronta per la proposta al cliente';
comment on column talent.citta_base is 'Per calcolare trasferte';
comment on column talent.agenzia_fornitore_id is 'Management o agenzia che lo rappresenta';
comment on column talent.cachet_min is 'Forbice di cachet';
comment on column talent.cachet_max is 'Forbice di cachet';
comment on column talent.cachet_note is 'IVA, agibilità, rimborsi, diritti';
comment on column talent.durata_intervento_min is 'Durata tipica e persone nella formazione';
comment on column talent.elementi is 'Durata tipica e persone nella formazione';
comment on column talent.limitazioni is 'Brand concorrenti, temi esclusi, esclusive';
alter table talent enable row level security;

create table dmc (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  fornitore_id uuid,
  servizi text[],
  lingue_staff text[],
  licenza text,
  associazioni text,
  modalita_prezzo text check (modalita_prezzo in ('netto + nostro ricarico', 'commissionabile', 'fee di servizio')),
  valuta text,
  referenze text,
  unique (codice)
);
comment on table dmc is 'ESPERIENZE E TALENT · Scheda del DMC (agenzia locale a destinazione). Le destinazioni coperte sono in fornitori_aree';
comment on column dmc.id is 'chiave interna';
comment on column dmc.codice is 'Codice leggibile per prefisso di tabella';
comment on column dmc.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column dmc.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column dmc.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column dmc.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column dmc.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column dmc.tag is 'Etichette libere per ricerca e filtri';
comment on column dmc.note_interne is 'Note che non vanno mai al cliente';
comment on column dmc.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column dmc.creato_il is 'Tracciamento automatico';
comment on column dmc.creato_da is 'Tracciamento automatico';
comment on column dmc.aggiornato_il is 'Tracciamento automatico';
comment on column dmc.aggiornato_da is 'Tracciamento automatico';
comment on column dmc.licenza is 'Licenza agenzia e associazioni di categoria';
comment on column dmc.associazioni is 'Licenza agenzia e associazioni di categoria';
comment on column dmc.referenze is 'Eventi fatti, clienti';
alter table dmc enable row level security;

create table persone_lingue (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  persona_id text,
  lingua text,
  livello text check (livello in ('A2', 'B1', 'B2', 'C1', 'C2', 'madrelingua')),
  unique (codice)
);
comment on table persone_lingue is 'PERSONE · Lingue e livello, una riga per lingua';
comment on column persone_lingue.id is 'chiave interna';
comment on column persone_lingue.codice is 'Codice leggibile per prefisso di tabella';
comment on column persone_lingue.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column persone_lingue.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column persone_lingue.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column persone_lingue.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column persone_lingue.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column persone_lingue.tag is 'Etichette libere per ricerca e filtri';
comment on column persone_lingue.note_interne is 'Note che non vanno mai al cliente';
comment on column persone_lingue.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column persone_lingue.creato_il is 'Tracciamento automatico';
comment on column persone_lingue.creato_da is 'Tracciamento automatico';
comment on column persone_lingue.aggiornato_il is 'Tracciamento automatico';
comment on column persone_lingue.aggiornato_da is 'Tracciamento automatico';
alter table persone_lingue enable row level security;

create table servizi_digitali (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  nome text,
  tipo text check (tipo in ('app evento', 'piattaforma iscrizioni', 'check-in QR', 'streaming', 'votazioni live', 'totem interattivo', 'sito evento', 'gamification', 'altro')),
  erogato_da text check (erogato_da in ('Chedo', 'Nakama', 'fornitore')),
  modalita_prezzo text check (modalita_prezzo in ('a evento', 'a partecipante', 'mensile', 'forfait')),
  prezzo numeric(12,2),
  costo numeric(12,2),
  setup_giorni numeric,
  integrazioni text,
  demo_link text,
  unique (codice)
);
comment on table servizi_digitali is 'MAGAZZINO E SERVIZI DIGITALI · Inventario dei servizi digitali (nostri o di fornitori)';
comment on column servizi_digitali.id is 'chiave interna';
comment on column servizi_digitali.codice is 'Codice leggibile per prefisso di tabella';
comment on column servizi_digitali.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column servizi_digitali.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column servizi_digitali.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column servizi_digitali.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column servizi_digitali.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column servizi_digitali.tag is 'Etichette libere per ricerca e filtri';
comment on column servizi_digitali.note_interne is 'Note che non vanno mai al cliente';
comment on column servizi_digitali.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column servizi_digitali.creato_il is 'Tracciamento automatico';
comment on column servizi_digitali.creato_da is 'Tracciamento automatico';
comment on column servizi_digitali.aggiornato_il is 'Tracciamento automatico';
comment on column servizi_digitali.aggiornato_da is 'Tracciamento automatico';
comment on column servizi_digitali.setup_giorni is 'Tempo minimo di preparazione';
comment on column servizi_digitali.integrazioni is 'Con cosa si collega';
alter table servizi_digitali enable row level security;

create table documenti (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  oggetto_tipo text check (oggetto_tipo in ('fornitore', 'struttura', 'persona', 'veicolo', 'Chedo', 'Nakama', 'commessa')),
  oggetto_id text,
  tipo text check (tipo in ('DURC', 'visura camerale', 'polizza RC', 'polizza all risk', 'agibilità', 'CPI antincendio', 'ISO', 'HACCP', 'licenza NCC', 'suolo pubblico', 'SIAE', 'commissione di vigilanza', 'formazione sicurezza', 'idoneità medica', 'DVR', 'altro')),
  numero text,
  ente_emittente text,
  emesso_il date,
  scadenza date,
  massimale numeric(12,2),
  file uuid,
  stato text check (stato in ('valido', 'in scadenza', 'scaduto', 'mancante')),
  unique (codice)
);
comment on table documenti is 'DOCUMENTI E VALIDAZIONE · Certificazioni, permessi, assicurazioni con scadenza, per fornitori, strutture, persone, veicoli, noi stessi o una commessa';
comment on column documenti.id is 'chiave interna';
comment on column documenti.codice is 'Codice leggibile per prefisso di tabella';
comment on column documenti.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column documenti.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column documenti.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column documenti.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column documenti.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column documenti.tag is 'Etichette libere per ricerca e filtri';
comment on column documenti.note_interne is 'Note che non vanno mai al cliente';
comment on column documenti.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column documenti.creato_il is 'Tracciamento automatico';
comment on column documenti.creato_da is 'Tracciamento automatico';
comment on column documenti.aggiornato_il is 'Tracciamento automatico';
comment on column documenti.aggiornato_da is 'Tracciamento automatico';
comment on column documenti.oggetto_tipo is 'A chi appartiene il documento';
comment on column documenti.oggetto_id is 'A chi appartiene il documento';
comment on column documenti.massimale is 'Per le assicurazioni';
comment on column documenti.stato is 'In scadenza = entro 30 giorni (soglia in IMPOSTAZIONI)';
alter table documenti enable row level security;

create table allegati (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  oggetto_tipo text,
  oggetto_id text,
  tipo text check (tipo in ('foto', 'planimetria', 'scheda tecnica', 'listino', 'brochure', 'rider', 'video', 'contratto', 'altro')),
  titolo text,
  drive_url text,
  storage_path text,
  data_documento date,
  utilizzabile_con_cliente boolean,
  unique (codice)
);
comment on table allegati is 'DOCUMENTI E VALIDAZIONE · Foto, planimetrie, listini, rider, brochure di qualsiasi scheda. Il file sta su Drive (o Storage di Supabase per le foto)';
comment on column allegati.id is 'chiave interna';
comment on column allegati.codice is 'Codice leggibile per prefisso di tabella';
comment on column allegati.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column allegati.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column allegati.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column allegati.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column allegati.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column allegati.tag is 'Etichette libere per ricerca e filtri';
comment on column allegati.note_interne is 'Note che non vanno mai al cliente';
comment on column allegati.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column allegati.creato_il is 'Tracciamento automatico';
comment on column allegati.creato_da is 'Tracciamento automatico';
comment on column allegati.aggiornato_il is 'Tracciamento automatico';
comment on column allegati.aggiornato_da is 'Tracciamento automatico';
comment on column allegati.oggetto_tipo is 'A quale scheda è collegato';
comment on column allegati.oggetto_id is 'A quale scheda è collegato';
comment on column allegati.drive_url is 'Dove sta il file';
comment on column allegati.storage_path is 'Dove sta il file';
comment on column allegati.data_documento is 'Es. data del listino';
comment on column allegati.utilizzabile_con_cliente is 'Si può mettere nelle proposte (diritti foto, riservatezza)';
alter table allegati enable row level security;

create table validazioni (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  tabella text,
  record_id text,
  colonna text,
  valore_validato text,
  stato text check (stato in ('da verificare', 'validato', 'da aggiornare', 'contestato')),
  fonte text,
  fonte_link text,
  validato_da text,
  validato_il timestamptz,
  valido_fino date,
  nota text,
  unique (codice)
);
comment on table validazioni is 'DOCUMENTI E VALIDAZIONE · Una riga per ogni singola voce validata: chi, quando, da quale fonte, fino a quando. Se il valore cambia, la voce torna ''da verificare''';
comment on column validazioni.id is 'chiave interna';
comment on column validazioni.codice is 'Codice leggibile per prefisso di tabella';
comment on column validazioni.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column validazioni.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column validazioni.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column validazioni.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column validazioni.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column validazioni.tag is 'Etichette libere per ricerca e filtri';
comment on column validazioni.note_interne is 'Note che non vanno mai al cliente';
comment on column validazioni.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column validazioni.creato_il is 'Tracciamento automatico';
comment on column validazioni.creato_da is 'Tracciamento automatico';
comment on column validazioni.aggiornato_il is 'Tracciamento automatico';
comment on column validazioni.aggiornato_da is 'Tracciamento automatico';
comment on column validazioni.tabella is 'Quale voce di quale scheda';
comment on column validazioni.record_id is 'Quale voce di quale scheda';
comment on column validazioni.colonna is 'Quale voce di quale scheda';
comment on column validazioni.valore_validato is 'Copia del valore al momento della validazione';
comment on column validazioni.valido_fino is 'Per prezzi e dati che scadono';
alter table validazioni enable row level security;

create table richieste_censimento (
  id uuid primary key default gen_random_uuid(),
  codice text,
  stato_scheda text check (stato_scheda in ('bozza', 'da validare', 'validata', 'da aggiornare', 'archiviata')),
  quota_validata numeric(7,3),
  fonte_principale text check (fonte_principale in ('sito web', 'listino ufficiale', 'offerta scritta', 'sopralluogo', 'telefonata', 'estratto AI da file', 'data entry da Alpitour', 'altro')),
  ultima_verifica date,
  prossima_verifica date,
  tag text[],
  note_interne text,
  attivo boolean not null default true,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text,
  tipo_oggetto text check (tipo_oggetto in ('hotel', 'location', 'ristorante', 'fornitore', 'talent', 'esperienza', 'altro')),
  nome_proposto text,
  citta text,
  link text,
  commessa_id text,
  richiesta_da text,
  data date,
  urgenza text check (urgenza in ('normale', 'entro 48 ore', 'subito')),
  stato text check (stato in ('nuova', 'in censimento', 'censita', 'scartata')),
  assegnata_a text,
  scheda_creata text,
  unique (codice)
);
comment on table richieste_censimento is 'DOCUMENTI E VALIDAZIONE · Quando un PM, creando una richiesta, non trova un hotel o un fornitore nel database, ne chiede il censimento';
comment on column richieste_censimento.id is 'chiave interna';
comment on column richieste_censimento.codice is 'Codice leggibile per prefisso di tabella';
comment on column richieste_censimento.stato_scheda is 'Stato della scheda nel suo insieme. Diventa ''da aggiornare'' se una voce validata scade o cambia';
comment on column richieste_censimento.quota_validata is 'Quante voci validabili della scheda sono validate';
comment on column richieste_censimento.fonte_principale is 'Da dove arrivano i dati della scheda';
comment on column richieste_censimento.ultima_verifica is 'Ultima volta che qualcuno ha controllato la scheda';
comment on column richieste_censimento.prossima_verifica is 'Quando ricontrollarla (es. nuovo listino annuale)';
comment on column richieste_censimento.tag is 'Etichette libere per ricerca e filtri';
comment on column richieste_censimento.note_interne is 'Note che non vanno mai al cliente';
comment on column richieste_censimento.attivo is 'No = non proporre più, ma tienilo nello storico';
comment on column richieste_censimento.creato_il is 'Tracciamento automatico';
comment on column richieste_censimento.creato_da is 'Tracciamento automatico';
comment on column richieste_censimento.aggiornato_il is 'Tracciamento automatico';
comment on column richieste_censimento.aggiornato_da is 'Tracciamento automatico';
comment on column richieste_censimento.nome_proposto is 'Quello che il PM sa';
comment on column richieste_censimento.citta is 'Quello che il PM sa';
comment on column richieste_censimento.link is 'Quello che il PM sa';
comment on column richieste_censimento.commessa_id is 'Per quale progetto serve';
comment on column richieste_censimento.assegnata_a is 'Chi la censisce';
comment on column richieste_censimento.scheda_creata is 'La scheda nata dal censimento';
alter table richieste_censimento enable row level security;


-- ════════ FLUSSI DI COMMESSA (docs 11-12) ════════

create table piano_commessa (
  id bigint generated always as identity primary key,
  commessa_id text,
  ev_inizio time,
  ev_fine time,
  all_giorni numeric,
  all_inizio time,
  all_fine time,
  prove_ore numeric,
  smo_ore numeric,
  magazzino_id text,
  viaggio_min numeric,
  carico text check (carico in ('giorno prima', 'stesso giorno')),
  carico_ore numeric,
  scarico text check (scarico in ('subito', 'mattina dopo')),
  scarico_ore numeric,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table piano_commessa is 'Parametri da cui si generano le fasi della commessa';
comment on column piano_commessa.commessa_id is 'una riga per commessa';
comment on column piano_commessa.ev_inizio is 'orario di inizio di ogni giornata di evento';
comment on column piano_commessa.all_giorni is 'giorni di allestimento prima dell''evento';
comment on column piano_commessa.prove_ore is 'ore di prove e convocazione prima dell''inizio';
comment on column piano_commessa.smo_ore is 'ore di smontaggio dopo la fine';
comment on column piano_commessa.magazzino_id is 'magazzino di partenza';
comment on column piano_commessa.viaggio_min is 'minuti di viaggio fino alla location';
alter table piano_commessa enable row level security;

create table fasi (
  fase_id text primary key,
  commessa_id text,
  tipo text check (tipo in ('carico', 'andata', 'allestimento', 'prove', 'evento', 'smontaggio', 'ritorno', 'scarico')),
  giorno_n numeric,
  dal timestamptz,
  al timestamptz,
  luogo text,
  modificata_a_mano boolean,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table fasi is 'Fasi generate dal piano: il calendario delle persone dipende da queste';
comment on column fasi.giorno_n is '1, 2… se la fase dura più giorni';
comment on column fasi.modificata_a_mano is 'sì = non si rigenera dai parametri';
alter table fasi enable row level security;

create table fabbisogni (
  fabbisogno_id text primary key,
  commessa_id text,
  ruolo text,
  funzione text,
  fasi text[],
  posti numeric,
  riga_preventivo_id text,
  competenze text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table fabbisogni is 'Ruoli che servono alla commessa, con le fasi in cui servono e i posti';
comment on column fabbisogni.ruolo is 'es. Fonico';
comment on column fabbisogni.funzione is 'funzione del personale richiesta';
comment on column fabbisogni.riga_preventivo_id is 'se nasce da una voce di personale';
comment on column fabbisogni.competenze is 'competenze richieste';
alter table fabbisogni enable row level security;

create table alert_regole (
  regola_id text primary key,
  nome text,
  tipo text check (tipo in ('persone mancanti', 'documenti sicurezza', 'preventivo', 'ordini', 'materiale', 'altro')),
  giorni_prima numeric,
  riferimento text check (riferimento in ('prima fase', 'inizio evento', 'cambio stato')),
  livello text check (livello in ('avviso', 'urgente')),
  destinatari text[],
  canale text[],
  attiva boolean,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table alert_regole is 'Regole degli alert di piattaforma';
comment on column alert_regole.nome is 'es. Persone mancanti';
comment on column alert_regole.giorni_prima is 'es. 30, 10';
alter table alert_regole enable row level security;

create table alert (
  alert_id text primary key,
  regola_id text,
  commessa_id text,
  testo text,
  livello text check (livello in ('avviso', 'urgente')),
  stato text check (stato in ('aperto', 'visto', 'risolto')),
  risolto_il timestamptz,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table alert is 'Alert generati sulle commesse';
alter table alert enable row level security;

create table commessa_aree (
  id bigint generated always as identity primary key,
  commessa_id text,
  area text,
  attiva boolean,
  responsabile_persona_id text,
  visibile_a text[],
  stato text check (stato in ('da avviare', 'in corso', 'chiusa')),
  scadenza date,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table commessa_aree is 'Aree attive in una commessa, con responsabile e visibilità';
comment on column commessa_aree.area is 'categoria del database: location, hotel, catering, service…';
comment on column commessa_aree.visibile_a is 'ruoli o persone che vedono l''area';
alter table commessa_aree enable row level security;

create table richieste_offerta (
  rdo_id text primary key,
  commessa_id text,
  area text,
  oggetto text,
  testo text,
  casella text,
  scadenza_risposta date,
  stato text check (stato in ('bozza', 'inviata', 'in valutazione', 'chiusa')),
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table richieste_offerta is 'Richieste d''offerta ai fornitori, per area';
comment on column richieste_offerta.rdo_id is 'codice nell''oggetto della mail, es. D26-007 · RDO-03';
comment on column richieste_offerta.testo is 'bozza scritta dall''AI e rivista';
comment on column richieste_offerta.casella is 'default ordini@nakamastudio.it';
alter table richieste_offerta enable row level security;

create table rdo_fornitori (
  id bigint generated always as identity primary key,
  rdo_id text,
  fornitore_org_id text,
  contatto_id text,
  gmail_thread_id text,
  inviata_il timestamptz,
  stato text check (stato in ('bozza', 'inviata', 'risposta', 'preventivo ricevuto', 'scelto', 'scartato', 'declinato')),
  importo_offerto numeric(12,2),
  file_id text,
  esito_comunicato_il timestamptz,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table rdo_fornitori is 'Ogni fornitore interpellato in una richiesta d''offerta';
comment on column rdo_fornitori.gmail_thread_id is 'per agganciare le risposte';
comment on column rdo_fornitori.file_id is 'preventivo del fornitore salvato su Drive';
comment on column rdo_fornitori.esito_comunicato_il is 'data della risposta positiva o negativa';
alter table rdo_fornitori enable row level security;

create table giri (
  giro_id text primary key,
  data date,
  veicolo_id uuid,
  autista_persona_id text,
  stato text check (stato in ('pianificato', 'confermato', 'fatto')),
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table giri is 'Giri di trasporto composti liberamente dal magazzino';
alter table giri enable row level security;

create table tappe (
  id bigint generated always as identity primary key,
  giro_id text,
  ordine numeric,
  magazzino_id text,
  struttura_id uuid,
  azione text check (azione in ('carico', 'scarico', 'ritiro', 'consegna')),
  commessa_id text,
  prenotazione_id text,
  ora_prevista timestamptz,
  note text,
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table tappe is 'Tappe di un giro: una tappa può servire più commesse';
comment on column tappe.magazzino_id is 'se la tappa è un magazzino';
comment on column tappe.struttura_id is 'se la tappa è una location';
comment on column tappe.prenotazione_id is 'materiale movimentato';
alter table tappe enable row level security;

create table logistica_persona (
  logistica_id text primary key,
  commessa_id text,
  persona_id text,
  andata_il timestamptz,
  andata_mezzo text check (andata_mezzo in ('volo', 'treno', 'auto', 'furgone', 'altro')),
  andata_riferimento text,
  ritorno_il timestamptz,
  ritorno_mezzo text check (ritorno_mezzo in ('volo', 'treno', 'auto', 'furgone', 'altro')),
  ritorno_riferimento text,
  hotel_struttura_id uuid,
  notti numeric,
  transfer text,
  stato text check (stato in ('da organizzare', 'richiesto', 'confermato')),
  costo numeric(12,2),
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table logistica_persona is 'Viaggio, hotel e transfer di una persona confermata su una commessa';
comment on column logistica_persona.andata_riferimento is 'biglietto o PNR';
alter table logistica_persona enable row level security;

create table preventivi_righe (
  riga_id text primary key,
  preventivo_id text,
  sezione text,
  fonte text check (fonte in ('inventario', 'location', 'listino', 'grafiche', 'voce libera', 'fornitore')),
  riferimento text,
  descrizione text,
  quantita numeric,
  giorni_servizi numeric,
  prezzo_unitario numeric(12,2),
  costo_unitario numeric(12,2),
  opzionale boolean,
  magazzino_id text,
  fornitore_org_id text,
  regime_iva text check (regime_iva in ('ordinaria', 'ridotta', 'esente', '74-ter', 'split payment', 'reverse charge', 'fuori campo')),
  aliquota_iva numeric(7,3),
  ritenuta numeric(7,3),
  creato_il timestamptz not null default now(),
  creato_da text,
  aggiornato_il timestamptz not null default now(),
  aggiornato_da text
);
comment on table preventivi_righe is 'Voci del preventivo di commessa, ognuna con il suo regime IVA';
comment on column preventivi_righe.sezione is 'es. AUDIO, LOCATION';
comment on column preventivi_righe.fonte is 'da dove arriva la voce';
comment on column preventivi_righe.riferimento is 'id dell''articolo, sala, voce di listino…';
comment on column preventivi_righe.opzionale is 'fuori dal totale';
comment on column preventivi_righe.magazzino_id is 'per le voci di inventario';
comment on column preventivi_righe.aliquota_iva is '22, 10, 4, 0';
comment on column preventivi_righe.ritenuta is 'per le prestazioni soggette';
alter table preventivi_righe enable row level security;


-- ════════ CHIAVI ESTERNE ════════

alter table ruoli add constraint ruoli_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table ruoli add constraint ruoli_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table aree add constraint aree_custode_ruolo_id_fk foreign key (custode_ruolo_id) references ruoli (ruolo_id);
alter table aree add constraint aree_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table aree add constraint aree_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table permessi add constraint permessi_ruolo_id_fk foreign key (ruolo_id) references ruoli (ruolo_id);
alter table permessi add constraint permessi_area_id_fk foreign key (area_id) references aree (area_id);
alter table permessi add constraint permessi_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table permessi add constraint permessi_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table liste_valori add constraint liste_valori_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table liste_valori add constraint liste_valori_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table impostazioni add constraint impostazioni_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table impostazioni add constraint impostazioni_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table persone add constraint persone_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table persone add constraint persone_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table persone add constraint persone_agenzia_fornitore_id_fk foreign key (agenzia_fornitore_id) references fornitori (id);
alter table persone_ruoli add constraint persone_ruoli_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table persone_ruoli add constraint persone_ruoli_ruolo_id_fk foreign key (ruolo_id) references ruoli (ruolo_id);
alter table persone_ruoli add constraint persone_ruoli_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table persone_ruoli add constraint persone_ruoli_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table competenze add constraint competenze_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table competenze add constraint competenze_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table competenze add constraint competenze_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table indisponibilita add constraint indisponibilita_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table indisponibilita add constraint indisponibilita_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table indisponibilita add constraint indisponibilita_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table dati_riservati add constraint dati_riservati_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table dati_riservati add constraint dati_riservati_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table dati_riservati add constraint dati_riservati_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table organizzazioni add constraint organizzazioni_commerciale_persona_id_fk foreign key (commerciale_persona_id) references persone (persona_id);
alter table organizzazioni add constraint organizzazioni_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table organizzazioni add constraint organizzazioni_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table contatti add constraint contatti_org_id_fk foreign key (org_id) references organizzazioni (org_id);
alter table contatti add constraint contatti_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table contatti add constraint contatti_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table agenzie_clienti add constraint agenzie_clienti_agenzia_org_id_fk foreign key (agenzia_org_id) references organizzazioni (org_id);
alter table agenzie_clienti add constraint agenzie_clienti_cliente_org_id_fk foreign key (cliente_org_id) references organizzazioni (org_id);
alter table agenzie_clienti add constraint agenzie_clienti_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table agenzie_clienti add constraint agenzie_clienti_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table accordi_partner add constraint accordi_partner_partner_org_id_fk foreign key (partner_org_id) references organizzazioni (org_id);
alter table accordi_partner add constraint accordi_partner_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table accordi_partner add constraint accordi_partner_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table segnalazioni add constraint segnalazioni_partner_org_id_fk foreign key (partner_org_id) references organizzazioni (org_id);
alter table segnalazioni add constraint segnalazioni_verso_org_id_fk foreign key (verso_org_id) references organizzazioni (org_id);
alter table segnalazioni add constraint segnalazioni_accordo_id_fk foreign key (accordo_id) references accordi_partner (accordo_id);
alter table segnalazioni add constraint segnalazioni_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table segnalazioni add constraint segnalazioni_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table contratti_quadro add constraint contratti_quadro_org_id_fk foreign key (org_id) references organizzazioni (org_id);
alter table contratti_quadro add constraint contratti_quadro_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table contratti_quadro add constraint contratti_quadro_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table commesse add constraint commesse_cliente_org_id_fk foreign key (cliente_org_id) references organizzazioni (org_id);
alter table commesse add constraint commesse_committente_org_id_fk foreign key (committente_org_id) references organizzazioni (org_id);
alter table commesse add constraint commesse_agenzia_org_id_fk foreign key (agenzia_org_id) references organizzazioni (org_id);
alter table commesse add constraint commesse_segnalazione_id_fk foreign key (segnalazione_id) references segnalazioni (segnalazione_id);
alter table commesse add constraint commesse_location_id_fk foreign key (location_id) references strutture (id);
alter table commesse add constraint commesse_pm_persona_id_fk foreign key (pm_persona_id) references persone (persona_id);
alter table commesse add constraint commesse_backup_persona_id_fk foreign key (backup_persona_id) references persone (persona_id);
alter table commesse add constraint commesse_contratto_quadro_id_fk foreign key (contratto_quadro_id) references contratti_quadro (cq_id);
alter table commesse add constraint commesse_confermata_da_fk foreign key (confermata_da) references persone (persona_id);
alter table commesse add constraint commesse_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table commesse add constraint commesse_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table commesse add constraint commesse_sales_persona_id_fk foreign key (sales_persona_id) references persone (persona_id);
alter table commesse add constraint commesse_referente_contatto_id_fk foreign key (referente_contatto_id) references contatti (contatto_id);
alter table commesse add constraint commesse_catering_org_id_fk foreign key (catering_org_id) references organizzazioni (org_id);
alter table commesse add constraint commesse_lead_org_id_fk foreign key (lead_org_id) references organizzazioni (org_id);
alter table brief add constraint brief_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table brief add constraint brief_validato_da_fk foreign key (validato_da) references persone (persona_id);
alter table brief add constraint brief_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table brief add constraint brief_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table team add constraint team_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table team add constraint team_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table team add constraint team_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table team add constraint team_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table impegni add constraint impegni_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table impegni add constraint impegni_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table impegni add constraint impegni_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table impegni add constraint impegni_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table impegni add constraint impegni_fabbisogno_id_fk foreign key (fabbisogno_id) references fabbisogni (fabbisogno_id);
alter table impegni add constraint impegni_fase_id_fk foreign key (fase_id) references fasi (fase_id);
alter table impegni add constraint impegni_confermato_da_fk foreign key (confermato_da) references persone (persona_id);
alter table storico_stati add constraint storico_stati_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table storico_stati add constraint storico_stati_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table file add constraint file_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table file add constraint file_location_id_fk foreign key (location_id) references strutture (id);
alter table file add constraint file_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table file add constraint file_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table riassunti add constraint riassunti_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table riassunti add constraint riassunti_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table proposte_ai add constraint proposte_ai_fonte_file_id_fk foreign key (fonte_file_id) references file (file_id);
alter table proposte_ai add constraint proposte_ai_custode_persona_id_fk foreign key (custode_persona_id) references persone (persona_id);
alter table proposte_ai add constraint proposte_ai_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table proposte_ai add constraint proposte_ai_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table magazzini add constraint magazzini_location_id_fk foreign key (location_id) references strutture (id);
alter table magazzini add constraint magazzini_responsabile_persona_id_fk foreign key (responsabile_persona_id) references persone (persona_id);
alter table magazzini add constraint magazzini_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table magazzini add constraint magazzini_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table articoli add constraint articoli_fornitore_org_id_fk foreign key (fornitore_org_id) references organizzazioni (org_id);
alter table articoli add constraint articoli_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table articoli add constraint articoli_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table pezzi add constraint pezzi_articolo_id_fk foreign key (articolo_id) references articoli (articolo_id);
alter table pezzi add constraint pezzi_magazzino_id_fk foreign key (magazzino_id) references magazzini (magazzino_id);
alter table pezzi add constraint pezzi_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table pezzi add constraint pezzi_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table giacenze add constraint giacenze_articolo_id_fk foreign key (articolo_id) references articoli (articolo_id);
alter table giacenze add constraint giacenze_magazzino_id_fk foreign key (magazzino_id) references magazzini (magazzino_id);
alter table giacenze add constraint giacenze_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table giacenze add constraint giacenze_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table prenotazioni add constraint prenotazioni_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table prenotazioni add constraint prenotazioni_articolo_id_fk foreign key (articolo_id) references articoli (articolo_id);
alter table prenotazioni add constraint prenotazioni_pezzo_id_fk foreign key (pezzo_id) references pezzi (pezzo_id);
alter table prenotazioni add constraint prenotazioni_magazzino_id_fk foreign key (magazzino_id) references magazzini (magazzino_id);
alter table prenotazioni add constraint prenotazioni_richiesta_da_fk foreign key (richiesta_da) references persone (persona_id);
alter table prenotazioni add constraint prenotazioni_confermata_da_fk foreign key (confermata_da) references persone (persona_id);
alter table prenotazioni add constraint prenotazioni_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table prenotazioni add constraint prenotazioni_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table movimenti add constraint movimenti_articolo_id_fk foreign key (articolo_id) references articoli (articolo_id);
alter table movimenti add constraint movimenti_pezzo_id_fk foreign key (pezzo_id) references pezzi (pezzo_id);
alter table movimenti add constraint movimenti_da_magazzino_id_fk foreign key (da_magazzino_id) references magazzini (magazzino_id);
alter table movimenti add constraint movimenti_a_magazzino_id_fk foreign key (a_magazzino_id) references magazzini (magazzino_id);
alter table movimenti add constraint movimenti_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table movimenti add constraint movimenti_trasporto_id_fk foreign key (trasporto_id) references trasporti (trasporto_id);
alter table movimenti add constraint movimenti_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table movimenti add constraint movimenti_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table movimenti add constraint movimenti_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table listino add constraint listino_articolo_id_fk foreign key (articolo_id) references articoli (articolo_id);
alter table listino add constraint listino_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table listino add constraint listino_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table pacchetti add constraint pacchetti_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table pacchetti add constraint pacchetti_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table pacchetti_voci add constraint pacchetti_voci_pacchetto_id_fk foreign key (pacchetto_id) references pacchetti (pacchetto_id);
alter table pacchetti_voci add constraint pacchetti_voci_voce_id_fk foreign key (voce_id) references listino (voce_id);
alter table costing add constraint costing_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table costing add constraint costing_fornitore_org_id_fk foreign key (fornitore_org_id) references organizzazioni (org_id);
alter table costing add constraint costing_voce_id_fk foreign key (voce_id) references listino (voce_id);
alter table costing add constraint costing_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table costing add constraint costing_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table preventivi add constraint preventivi_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table preventivi add constraint preventivi_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table preventivi add constraint preventivi_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table preventivi add constraint preventivi_ver_file_docx_id_fk foreign key (ver_file_docx_id) references file (file_id);
alter table preventivi add constraint preventivi_ver_file_xlsx_id_fk foreign key (ver_file_xlsx_id) references file (file_id);
alter table preventivi add constraint preventivi_ver_file_pdf_id_fk foreign key (ver_file_pdf_id) references file (file_id);
alter table fatture add constraint fatture_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table fatture add constraint fatture_org_id_fk foreign key (org_id) references organizzazioni (org_id);
alter table fatture add constraint fatture_file_id_fk foreign key (file_id) references file (file_id);
alter table fatture add constraint fatture_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table fatture add constraint fatture_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table rebate add constraint rebate_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table rebate add constraint rebate_partner_org_id_fk foreign key (partner_org_id) references organizzazioni (org_id);
alter table rebate add constraint rebate_accordo_id_fk foreign key (accordo_id) references accordi_partner (accordo_id);
alter table rebate add constraint rebate_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table rebate add constraint rebate_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table ordini add constraint ordini_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table ordini add constraint ordini_fornitore_org_id_fk foreign key (fornitore_org_id) references organizzazioni (org_id);
alter table ordini add constraint ordini_fattura_id_fk foreign key (fattura_id) references fatture (fattura_id);
alter table ordini add constraint ordini_responsabile_persona_id_fk foreign key (responsabile_persona_id) references persone (persona_id);
alter table ordini add constraint ordini_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table ordini add constraint ordini_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table ordini_righe add constraint ordini_righe_ordine_id_fk foreign key (ordine_id) references ordini (ordine_id);
alter table ordini_righe add constraint ordini_righe_articolo_id_fk foreign key (articolo_id) references articoli (articolo_id);
alter table ordini_righe add constraint ordini_righe_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table ordini_righe add constraint ordini_righe_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table noleggi add constraint noleggi_org_id_fk foreign key (org_id) references organizzazioni (org_id);
alter table noleggi add constraint noleggi_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table noleggi add constraint noleggi_articolo_id_fk foreign key (articolo_id) references articoli (articolo_id);
alter table noleggi add constraint noleggi_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table noleggi add constraint noleggi_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table trasporti add constraint trasporti_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table trasporti add constraint trasporti_mezzo_id_fk foreign key (mezzo_id) references veicoli (id);
alter table trasporti add constraint trasporti_fornitore_org_id_fk foreign key (fornitore_org_id) references organizzazioni (org_id);
alter table trasporti add constraint trasporti_autista_persona_id_fk foreign key (autista_persona_id) references persone (persona_id);
alter table trasporti add constraint trasporti_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table trasporti add constraint trasporti_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table grafiche add constraint grafiche_fornitore_org_id_fk foreign key (fornitore_org_id) references organizzazioni (org_id);
alter table grafiche add constraint grafiche_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table grafiche add constraint grafiche_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table sicurezza add constraint sicurezza_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table sicurezza add constraint sicurezza_location_id_fk foreign key (location_id) references strutture (id);
alter table sicurezza add constraint sicurezza_file_id_fk foreign key (file_id) references file (file_id);
alter table sicurezza add constraint sicurezza_responsabile_persona_id_fk foreign key (responsabile_persona_id) references persone (persona_id);
alter table sicurezza add constraint sicurezza_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table sicurezza add constraint sicurezza_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table timesheet add constraint timesheet_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table timesheet add constraint timesheet_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table timesheet add constraint timesheet_approvato_da_fk foreign key (approvato_da) references persone (persona_id);
alter table timesheet add constraint timesheet_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table timesheet add constraint timesheet_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table timesheet add constraint timesheet_impegno_id_fk foreign key (impegno_id) references impegni (impegno_id);
alter table todo_clickup add constraint todo_clickup_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table todo_clickup add constraint todo_clickup_assegnatario_persona_id_fk foreign key (assegnatario_persona_id) references persone (persona_id);
alter table strutture add constraint strutture_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table strutture add constraint strutture_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table strutture add constraint strutture_gestore_fornitore_id_fk foreign key (gestore_fornitore_id) references fornitori (id);
alter table strutture add constraint strutture_sopralluogo_da_fk foreign key (sopralluogo_da) references persone (persona_id);
alter table spazi add constraint spazi_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table spazi add constraint spazi_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table spazi add constraint spazi_struttura_id_fk foreign key (struttura_id) references strutture (id);
alter table spazi add constraint spazi_spazio_padre_id_fk foreign key (spazio_padre_id) references spazi (id);
alter table spazi add constraint spazi_planimetria_fk foreign key (planimetria) references allegati (id);
alter table spazi_capienze add constraint spazi_capienze_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table spazi_capienze add constraint spazi_capienze_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table spazi_capienze add constraint spazi_capienze_spazio_id_fk foreign key (spazio_id) references spazi (id);
alter table hotel add constraint hotel_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table hotel add constraint hotel_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table hotel add constraint hotel_struttura_id_fk foreign key (struttura_id) references strutture (id);
alter table hotel add constraint hotel_contatto_gruppi_id_fk foreign key (contatto_gruppi_id) references contatti (contatto_id);
alter table hotel add constraint hotel_contatto_eventi_id_fk foreign key (contatto_eventi_id) references contatti (contatto_id);
alter table camere_tipologie add constraint camere_tipologie_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table camere_tipologie add constraint camere_tipologie_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table camere_tipologie add constraint camere_tipologie_hotel_id_fk foreign key (hotel_id) references hotel (id);
alter table tariffe_hotel add constraint tariffe_hotel_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table tariffe_hotel add constraint tariffe_hotel_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table tariffe_hotel add constraint tariffe_hotel_hotel_id_fk foreign key (hotel_id) references hotel (id);
alter table tariffe_hotel add constraint tariffe_hotel_tipologia_id_fk foreign key (tipologia_id) references camere_tipologie (id);
alter table pacchetti_meeting add constraint pacchetti_meeting_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table pacchetti_meeting add constraint pacchetti_meeting_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table pacchetti_meeting add constraint pacchetti_meeting_hotel_id_fk foreign key (hotel_id) references hotel (id);
alter table ristoranti add constraint ristoranti_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table ristoranti add constraint ristoranti_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table ristoranti add constraint ristoranti_struttura_id_fk foreign key (struttura_id) references strutture (id);
alter table catering add constraint catering_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table catering add constraint catering_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table catering add constraint catering_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table menu add constraint menu_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table menu add constraint menu_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table menu add constraint menu_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table menu add constraint menu_struttura_id_fk foreign key (struttura_id) references strutture (id);
alter table fornitori add constraint fornitori_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table fornitori add constraint fornitori_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table fornitori add constraint fornitori_org_id_fk foreign key (org_id) references organizzazioni (org_id);
alter table fornitori add constraint fornitori_referente_interno_id_fk foreign key (referente_interno_id) references persone (persona_id);
alter table fornitori_aree add constraint fornitori_aree_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table fornitori_aree add constraint fornitori_aree_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table fornitori_aree add constraint fornitori_aree_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table offerte add constraint offerte_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table offerte add constraint offerte_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table offerte add constraint offerte_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table offerte add constraint offerte_articolo_equivalente_id_fk foreign key (articolo_equivalente_id) references articoli (articolo_id);
alter table offerte add constraint offerte_foto_fk foreign key (foto) references allegati (id);
alter table offerte add constraint offerte_scheda_tecnica_fk foreign key (scheda_tecnica) references allegati (id);
alter table accordi_fornitore add constraint accordi_fornitore_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table accordi_fornitore add constraint accordi_fornitore_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table accordi_fornitore add constraint accordi_fornitore_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table accordi_fornitore add constraint accordi_fornitore_contratto_fk foreign key (contratto) references allegati (id);
alter table veicoli add constraint veicoli_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table veicoli add constraint veicoli_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table veicoli add constraint veicoli_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table tariffe_trasporto add constraint tariffe_trasporto_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table tariffe_trasporto add constraint tariffe_trasporto_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table tariffe_trasporto add constraint tariffe_trasporto_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table esperienze add constraint esperienze_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table esperienze add constraint esperienze_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table esperienze add constraint esperienze_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table esperienze add constraint esperienze_struttura_id_fk foreign key (struttura_id) references strutture (id);
alter table esperienze add constraint esperienze_foto_fk foreign key (foto) references allegati (id);
alter table esperienze add constraint esperienze_video_fk foreign key (video) references allegati (id);
alter table talent add constraint talent_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table talent add constraint talent_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table talent add constraint talent_agenzia_fornitore_id_fk foreign key (agenzia_fornitore_id) references fornitori (id);
alter table talent add constraint talent_rider_tecnico_fk foreign key (rider_tecnico) references allegati (id);
alter table talent add constraint talent_rider_ospitalita_fk foreign key (rider_ospitalita) references allegati (id);
alter table dmc add constraint dmc_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table dmc add constraint dmc_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table dmc add constraint dmc_fornitore_id_fk foreign key (fornitore_id) references fornitori (id);
alter table persone_lingue add constraint persone_lingue_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table persone_lingue add constraint persone_lingue_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table persone_lingue add constraint persone_lingue_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table servizi_digitali add constraint servizi_digitali_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table servizi_digitali add constraint servizi_digitali_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table documenti add constraint documenti_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table documenti add constraint documenti_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table documenti add constraint documenti_file_fk foreign key (file) references allegati (id);
alter table allegati add constraint allegati_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table allegati add constraint allegati_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table validazioni add constraint validazioni_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table validazioni add constraint validazioni_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table validazioni add constraint validazioni_validato_da_fk foreign key (validato_da) references persone (persona_id);
alter table richieste_censimento add constraint richieste_censimento_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table richieste_censimento add constraint richieste_censimento_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table richieste_censimento add constraint richieste_censimento_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table richieste_censimento add constraint richieste_censimento_richiesta_da_fk foreign key (richiesta_da) references persone (persona_id);
alter table richieste_censimento add constraint richieste_censimento_assegnata_a_fk foreign key (assegnata_a) references persone (persona_id);
alter table piano_commessa add constraint piano_commessa_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table piano_commessa add constraint piano_commessa_magazzino_id_fk foreign key (magazzino_id) references magazzini (magazzino_id);
alter table piano_commessa add constraint piano_commessa_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table piano_commessa add constraint piano_commessa_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table fasi add constraint fasi_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table fasi add constraint fasi_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table fasi add constraint fasi_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table fabbisogni add constraint fabbisogni_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table fabbisogni add constraint fabbisogni_riga_preventivo_id_fk foreign key (riga_preventivo_id) references preventivi_righe (riga_id);
alter table fabbisogni add constraint fabbisogni_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table fabbisogni add constraint fabbisogni_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table alert_regole add constraint alert_regole_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table alert_regole add constraint alert_regole_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table alert add constraint alert_regola_id_fk foreign key (regola_id) references alert_regole (regola_id);
alter table alert add constraint alert_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table alert add constraint alert_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table alert add constraint alert_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table commessa_aree add constraint commessa_aree_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table commessa_aree add constraint commessa_aree_responsabile_persona_id_fk foreign key (responsabile_persona_id) references persone (persona_id);
alter table commessa_aree add constraint commessa_aree_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table commessa_aree add constraint commessa_aree_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table richieste_offerta add constraint richieste_offerta_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table richieste_offerta add constraint richieste_offerta_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table richieste_offerta add constraint richieste_offerta_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table rdo_fornitori add constraint rdo_fornitori_rdo_id_fk foreign key (rdo_id) references richieste_offerta (rdo_id);
alter table rdo_fornitori add constraint rdo_fornitori_fornitore_org_id_fk foreign key (fornitore_org_id) references organizzazioni (org_id);
alter table rdo_fornitori add constraint rdo_fornitori_contatto_id_fk foreign key (contatto_id) references contatti (contatto_id);
alter table rdo_fornitori add constraint rdo_fornitori_file_id_fk foreign key (file_id) references file (file_id);
alter table rdo_fornitori add constraint rdo_fornitori_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table rdo_fornitori add constraint rdo_fornitori_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table giri add constraint giri_veicolo_id_fk foreign key (veicolo_id) references veicoli (id);
alter table giri add constraint giri_autista_persona_id_fk foreign key (autista_persona_id) references persone (persona_id);
alter table giri add constraint giri_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table giri add constraint giri_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table tappe add constraint tappe_giro_id_fk foreign key (giro_id) references giri (giro_id);
alter table tappe add constraint tappe_magazzino_id_fk foreign key (magazzino_id) references magazzini (magazzino_id);
alter table tappe add constraint tappe_struttura_id_fk foreign key (struttura_id) references strutture (id);
alter table tappe add constraint tappe_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table tappe add constraint tappe_prenotazione_id_fk foreign key (prenotazione_id) references prenotazioni (prenotazione_id);
alter table tappe add constraint tappe_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table tappe add constraint tappe_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table logistica_persona add constraint logistica_persona_commessa_id_fk foreign key (commessa_id) references commesse (commessa_id);
alter table logistica_persona add constraint logistica_persona_persona_id_fk foreign key (persona_id) references persone (persona_id);
alter table logistica_persona add constraint logistica_persona_hotel_struttura_id_fk foreign key (hotel_struttura_id) references strutture (id);
alter table logistica_persona add constraint logistica_persona_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table logistica_persona add constraint logistica_persona_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
alter table preventivi_righe add constraint preventivi_righe_preventivo_id_fk foreign key (preventivo_id) references preventivi (preventivo_id);
alter table preventivi_righe add constraint preventivi_righe_magazzino_id_fk foreign key (magazzino_id) references magazzini (magazzino_id);
alter table preventivi_righe add constraint preventivi_righe_fornitore_org_id_fk foreign key (fornitore_org_id) references organizzazioni (org_id);
alter table preventivi_righe add constraint preventivi_righe_creato_da_fk foreign key (creato_da) references persone (persona_id);
alter table preventivi_righe add constraint preventivi_righe_aggiornato_da_fk foreign key (aggiornato_da) references persone (persona_id);
