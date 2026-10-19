# Nakama Hub · schema database

Schema del database del **Nakama Hub**, l'applicativo comune di Chedo e Nakama per commesse, anagrafiche, magazzino, calendario delle risorse e preventivi. Il database previsto è **Supabase (Postgres)**.

> **Stato: bozza da validare.** Le colonne delle anagrafiche sono in validazione colonna per colonna con il team. La migrazione SQL serve come base di lavoro: non applicarla in produzione prima della validazione.

## Contenuto

| Percorso | Cosa contiene |
|---|---|
| `schema/core_v1.py` | Nucleo v1 (doc 09): configurazione e ruoli, persone, CRM, commesse, file e AI, magazzino, economia, operatività |
| `schema/anagrafiche_v1.py` | Anagrafiche (doc 10): location e spazi, hotel, ristoranti e catering, fornitori e offerte, trasporti, esperienze e talent, documenti, validazione delle singole voci |
| `schema/anagrafiche_v1.json` | Le stesse anagrafiche in JSON, per l'interfaccia di validazione |
| `schema/flussi_v1.py` | Flussi di commessa (docs 11-12): piano di lavoro e fasi, fabbisogni, alert, aree, richieste d'offerta, giri e tappe, logistica persone, righe di preventivo con regime IVA |
| `schema/gen_sql.py` | Genera la migrazione SQL dai tre file sopra |
| `supabase/migrations/20261019000000_schema_hub_bozza.sql` | Migrazione generata: 84 tabelle, 342 chiavi esterne, commenti su tabelle e colonne, RLS attiva, trigger di sincronizzazione |
| `CLAUDE.md` | Regole per chi lavora sullo schema da più dispositivi o sessioni |

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
- **Location, hotel e ristoranti sono tre entità separate**, ognuna con il proprio indirizzo e accesso. Una location non è un hotel e un hotel non è una location. Hanno in comune solo la tabella `spazi` (sale, terrazze, sale meeting, sale private): ogni spazio appartiene a uno solo dei tre, e un vincolo lo garantisce.
- Le tabelle `location`, `sale`, `mezzi` e `fornitori` del nucleo sono sostituite da `location`, `spazi`, `veicoli` e `fornitori` delle anagrafiche.
- `contatti`, `persone` e `articoli` ricevono le colonne aggiuntive delle anagrafiche.
- Ogni tabella anagrafica ha le colonne comuni: `codice`, `stato_scheda`, `quota_validata`, `fonte_principale`, `ultima_verifica`, `prossima_verifica`, `tag`, `note_interne`, `attivo`, tracciamento.
- La validazione delle singole voci sta nella tabella `validazioni`.
- Gli impegni di calendario dipendono dalle `fasi` della commessa. Le fasi si generano da `piano_commessa`.

## Aggiornamenti da più dispositivi

L'Hub sarà usato insieme da computer, telefoni e tablet. Lo schema lo gestisce così:

- **Revisione per record (`rev`)**: ogni tabella ha una colonna `rev` che sale di 1 a ogni modifica. Un trigger la gestisce e aggiorna `aggiornato_il`. L'app aggiorna sempre con il filtro `rev=eq.<rev letta>`. Se nel frattempo un altro dispositivo ha modificato il record, l'aggiornamento non tocca nessuna riga. A quel punto l'app ricarica il record, unisce le modifiche campo per campo e chiede conferma solo se lo stesso campo è cambiato su entrambi i dispositivi. Una `rev` vecchia mandata esplicitamente viene rifiutata con errore `40001`.
- **Registro `modifiche`**: ogni insert, update e delete viene scritto in automatico con le differenze campo per campo, l'utente e il dispositivo. Il dispositivo arriva dall'header `x-hub-device`.
- **Tabella `dispositivi`**: per ogni persona, i suoi dispositivi, l'ultima sincronizzazione e le modifiche fatte offline ancora da inviare. Serve per il telefono del magazzino e per chi lavora in location senza rete.
- **Realtime**: le tabelle operative (commesse, fasi, impegni, prenotazioni, preventivi…) sono pubblicate su Supabase Realtime. Ogni dispositivo aperto vede i cambiamenti senza ricaricare la pagina.

## Rigenerare la migrazione

```bash
cd schema
python3 gen_sql.py > ../supabase/migrations/20261019000000_schema_hub_bozza.sql
```

La migrazione è stata verificata su un Postgres 16 vuoto. Si applica senza errori e i trigger funzionano: revisione, conflitto su `rev` vecchia, registro modifiche, vincolo sugli spazi.

## Ancora da fare

- Policy RLS per ruolo, derivate dalla matrice dei permessi (tabella `permessi`).
- Trigger per riportare una voce a "da verificare" quando il valore validato cambia.
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

- **LOCATION**: `location`, `spazi`, `spazi_capienze`
- **HOTEL**: `hotel`, `camere_tipologie`, `tariffe_hotel`, `pacchetti_meeting`
- **RISTORAZIONE**: `ristoranti`, `catering`, `menu`
- **FORNITORI**: `fornitori`, `fornitori_aree`, `contatti`, `offerte`, `accordi_fornitore`
- **TRASPORTI**: `veicoli`, `tariffe_trasporto`
- **ESPERIENZE E TALENT**: `esperienze`, `talent`, `dmc`
- **PERSONE**: `persone · profilo operativo`, `persone_lingue`
- **MAGAZZINO E SERVIZI DIGITALI**: `articoli · aggiunte`, `servizi_digitali`
- **DOCUMENTI E VALIDAZIONE**: `documenti`, `allegati`, `validazioni`, `richieste_censimento`

### Flussi di commessa e sincronizzazione (docs 11-12)

- `piano_commessa`, `fasi`, `fabbisogni`, `alert_regole`, `alert`, `commessa_aree`, `richieste_offerta`, `rdo_fornitori`, `giri`, `tappe`, `logistica_persona`, `preventivi_righe`, `dispositivi`, `modifiche`
- Colonne aggiunte a: `commesse`, `impegni`, `timesheet`, `preventivi`
