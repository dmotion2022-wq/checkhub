# Nakama Hub · schema database

Schema del database del **Nakama Hub**, l'applicativo comune di Chedo e Nakama per commesse, anagrafiche, magazzino, calendario delle risorse e preventivi. Il database previsto è **Supabase (Postgres)**.

> **Stato: bozza da validare.** Le colonne delle anagrafiche sono in validazione colonna per colonna con il team. La migrazione SQL serve come base di lavoro: non applicarla in produzione prima della validazione.

## Contenuto

| Percorso | Cosa contiene |
|---|---|
| `schema/core_v1.py` | Nucleo v1 (doc 09): configurazione e ruoli, persone, CRM, commesse, file e AI, magazzino, economia, operatività |
| `schema/anagrafiche_v1.py` | Anagrafiche (doc 10): strutture e spazi, hotel, ristorazione, fornitori e offerte, trasporti, esperienze e talent, documenti, validazione delle singole voci |
| `schema/anagrafiche_v1.json` | Le stesse anagrafiche in JSON, per l'interfaccia di validazione |
| `schema/flussi_v1.py` | Flussi di commessa (docs 11-12): piano di lavoro e fasi, fabbisogni, alert, aree, richieste d'offerta, giri e tappe, logistica persone, righe di preventivo con regime IVA |
| `schema/gen_sql.py` | Genera la migrazione SQL dai tre file sopra |
| `supabase/migrations/20261019000000_schema_hub_bozza.sql` | Migrazione generata: 82 tabelle, 333 chiavi esterne, commenti su tabelle e colonne, RLS attiva |

## Come è scritto lo schema

Ogni tabella è un elenco di colonne `(nome, tipo, descrizione)` con tipi leggibili, che `gen_sql.py` traduce così:

| Tipo | Postgres |
|---|---|
| `ID` | `text primary key` (nucleo) · `uuid` con `gen_random_uuid()` (anagrafiche) |
| `→TABELLA` | chiave esterna verso la chiave primaria di quella tabella |
| `testo`, `email`, `link` | `text` |
| `numero` · `€` · `%` | `numeric` · `numeric(12,2)` · `numeric(7,3)` |
| `data` · `data e ora` · `ora` | `date` · `timestamptz` · `time` |
| `sì/no` | `boolean` |
| `lista: a, b, c` | `text` con vincolo `check` sui valori |
| `lista multipla` | `text[]` |

Le righe con più colonne dello stesso tipo (es. `cap · citta · provincia`) diventano colonne separate.

**Scelte principali:**
- Le tabelle `location`, `sale`, `mezzi` e `fornitori` del nucleo sono sostituite da `strutture`, `spazi`, `veicoli` e `fornitori` delle anagrafiche.
- `contatti`, `persone` e `articoli` ricevono le colonne aggiuntive delle anagrafiche.
- Ogni tabella anagrafica ha le colonne comuni: `codice`, `stato_scheda`, `quota_validata`, `fonte_principale`, `ultima_verifica`, `prossima_verifica`, `tag`, `note_interne`, `attivo`, tracciamento.
- La validazione delle singole voci sta nella tabella `validazioni`.
- Gli impegni di calendario dipendono dalle `fasi` della commessa. Le fasi si generano da `piano_commessa`.

## Rigenerare la migrazione

```bash
cd schema
python3 gen_sql.py > ../supabase/migrations/20261019000000_schema_hub_bozza.sql
```

La migrazione è stata verificata su un Postgres 16 vuoto: si applica senza errori.

## Ancora da fare

- Policy RLS per ruolo, derivate dalla matrice dei permessi (tabella `permessi`).
- Trigger per `aggiornato_il` e per riportare una voce a "da verificare" quando il valore validato cambia.
- Tabelle dell'amministrazione (piano di fatturazione, documenti fornitore, pagamenti), rimandate.
- Flussi leisure (Alpitour) e business travel.

## Tabelle

### Nucleo (doc 09)

- **00 · CONFIGURAZIONE**: `ruoli`, `aree`, `permessi`, `liste_valori`, `impostazioni`
- **01 · PERSONE**: `persone`, `persone_ruoli`, `competenze`, `indisponibilita`
- **01b · PERSONE · RISERVATO**: `dati_riservati`
- **02 · CRM**: `organizzazioni`, `contatti`, `agenzie_clienti`, `accordi_partner`, `segnalazioni`, `contratti_quadro`
- **03 · COMMESSE**: `commesse`, `brief`, `team`, `impegni`, `storico_stati`
- **04 · FILE E AI**: `file`, `riassunti`, `proposte_ai`
- **05 · LOCATION E MAGAZZINO**: `location` *(sostituita)*, `sale` *(sostituita)*, `magazzini`, `articoli`, `pezzi`, `giacenze`, `prenotazioni`, `movimenti`
- **06 · ECONOMIA**: `listino`, `pacchetti`, `pacchetti_voci`, `costing`, `preventivi`, `fatture`, `rebate`
- **07 · OPERATIVITÀ**: `fornitori` *(sostituita)*, `ordini`, `ordini_righe`, `noleggi`, `mezzi` *(sostituita)*, `trasporti`, `grafiche`, `sicurezza`, `timesheet`, `todo_clickup`

### Anagrafiche (doc 10)

- **STRUTTURE**: `strutture`, `spazi`, `spazi_capienze`
- **HOTEL**: `hotel`, `camere_tipologie`, `tariffe_hotel`, `pacchetti_meeting`
- **RISTORAZIONE**: `ristoranti`, `catering`, `menu`
- **FORNITORI**: `fornitori`, `fornitori_aree`, `contatti`, `offerte`, `accordi_fornitore`
- **TRASPORTI**: `veicoli`, `tariffe_trasporto`
- **ESPERIENZE E TALENT**: `esperienze`, `talent`, `dmc`
- **PERSONE**: `persone · profilo operativo`, `persone_lingue`
- **MAGAZZINO E SERVIZI DIGITALI**: `articoli · aggiunte`, `servizi_digitali`
- **DOCUMENTI E VALIDAZIONE**: `documenti`, `allegati`, `validazioni`, `richieste_censimento`

### Flussi di commessa (docs 11-12)

- `piano_commessa`, `fasi`, `fabbisogni`, `alert_regole`, `alert`, `commessa_aree`, `richieste_offerta`, `rdo_fornitori`, `giri`, `tappe`, `logistica_persona`, `preventivi_righe`
- Colonne aggiunte a: `commesse`, `impegni`, `timesheet`, `preventivi`