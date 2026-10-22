# Regole per lavorare su questo repository

Il prodotto si chiama **Doffy** (dal 21 ottobre; prima "Nakama Hub"). Usare sempre Doffy nel codice, nei testi e nei commit.

Lo schema viene modificato da più persone, da più dispositivi e da più sessioni di Claude. Per non perdere aggiornamenti:

1. **Prima di ogni modifica**, `git pull --rebase origin main`. Non si lavora mai su una copia vecchia.
2. **Le fonti sono i file in `schema/`** (`core_v1.py`, `anagrafiche_v1.py`, `flussi_v1.py`). Non si modifica a mano il file SQL in `supabase/migrations/`: si rigenera.
3. Dopo ogni modifica allo schema:
   - `cd schema && python3 gen_sql.py > ../supabase/migrations/20261019000000_schema_hub_bozza.sql`
   - `python3 gen_sql.py --json > ../docs/schema.json` (sito GitHub Pages);
   - rigenerare `schema/anagrafiche_v1.json`, che serve alla pagina di validazione;
   - provare la migrazione su un Postgres vuoto.
   Il sito https://dmotion2022-wq.github.io/checkhub/ si aggiorna da solo: il workflow `pages.yml` copia `docs/` sul ramo `gh-pages` a ogni push su `main`.
4. **Gli esiti della validazione** delle colonne vivono nella pagina "Schema database Hub", condivisa tra tutti i dispositivi. Prima di cambiare una colonna, controllare se ha già un esito o un commento.
5. **Commit piccoli**, con un messaggio che dica cosa cambia nello schema. Push subito, così gli altri dispositivi lo vedono.
6. **Il repository è pubblico.** Niente dati reali, credenziali, link o ID di file Drive. I documenti di progetto restano nel progetto Claude "OTTIMIZZAZIONE PROCESSI".

## Regole di modello già decise
- Location, hotel e ristoranti sono entità separate. Hanno in comune solo `spazi` e `spazi_capienze`.
- Il calendario delle persone dipende da `fasi`, generate da `piano_commessa`.
- Ogni tabella ha `rev`, per la sincronizzazione tra dispositivi (vedi README).
- MVP con un'unica utenza master: una policy di accesso completo per tabella. Le policy per ruolo arrivano dopo.
- Nel frontend il calendario ha tre viste: generale (mese, tutte le commesse), persona (settimana), planning (persone × giorni).

## Linee guida UI del gestionale (dal 19 ottobre)
Riviste con la skill ui-ux-pro-max (stile "Minimalism & Swiss", densità alta):
- Sfondo bianco, tema chiaro unico (niente tema scuro). Un solo accento (blu), neutri slate, bordi al posto delle ombre, raggio 6px, ritmo a 8px, testo base 13px.
- Un'unica famiglia: Inter. Niente monospace; i numeri usano le cifre tabulari di Inter.
- Colore azienda: Chedo #367BAD (il blu del logo), Nakama #FF8A00. Si usa come gradiente leggero nell'intestazione della scheda progetto e come striscia a sinistra nelle righe dell'elenco progetti. Non altrove.
- Gerarchia dell'intestazione progetto, in ordine: nome e codice commessa, location, PM di riferimento.
- Magazzino: le richieste sono un accordion per commessa (codice ed evento); dentro, caselle di controllo per riga, link al preventivo, "Conferma selezionate". Le giacenze mostrano solo nome dell'articolo e disponibilità. Niente diciture tipo "liberi / totali · date".
- Sidebar a sinistra con icone SVG e etichette; su telefono diventa una barra in alto.
- Titoli dei pannelli come etichette maiuscole piccole; niente sottotitoli esplicativi sotto i titoli delle viste; niente testi di aiuto sotto i form.
- Stato sempre con testo oltre al colore. Stati vuoti in una riga.
- Scheda File: albero Drive navigabile per cartelle e sottocartelle, con breadcrumb; un file aperto mostra il riassunto.
- Calendario magazzino: settimana con le ore, come Google Calendar; ogni blocco è una commessa che occupa materiale (anche su più giorni); cliccando si vede l'elenco dei prodotti occupati. Niente griglia articoli × giorni.
- I prodotti si chiamano per marca e modello (es. "Midas M32"), mai con la descrizione. Cliccando un prodotto si apre la scheda con foto e dati tecnici (dal database, in futuro).
- Preventivo (dal 21 ottobre): il preventivo di ogni commessa è un Google Sheet in `02_ECONOMICO`, copiato dal modello `DOFFY · MODELLO PREVENTIVO` (sul Drive, non nel repository). Doffy lo mostra incorporato nella scheda Preventivo (iframe di Google Sheets, a tutto schermo) sotto una fascia con totali, versione e pulsanti: "Salva nuova versione" (copia vN + PDF su Drive), invio e conferma del cliente. Doffy scrive le righe dalle fonti (inventario, location, listino, grafiche) con `id_doffy` e `fonte`, rilegge il foglio per numeri, magazzino e persone, e non sovrascrive mai le celle del PM. Nessun editor di celle dentro Doffy; nella demo il foglio è simulato. Le righe di sezione hanno `fonte = sezione` e i subtotali; le righe sotto sono raggruppate (accordion). Specifica: documento 13 nel progetto Claude.
- Nuova commessa (dal 22 ottobre): tre passi. 1) Commessa ed evento (date con ore) più persone e partner; niente piano di lavoro né fasi. 2) Schede: Overview, Preventivo e Persone sempre presenti; per le altre (Materiale e trasporti, Produzione, Trasporti e voli, Ordini, Sicurezza, To-Do) una domanda sì/no all'operativo. 3) Documenti: o si caricano, e Doffy crea la cartella della commessa sotto quella del cliente su Drive, o si collega una sottocartella già esistente del cliente; l'AI li legge per il riassunto. Il piano di lavoro si genera dopo, dalla scheda Persone.
- La scheda progetto è a moduli: intestazione (codice, titolo, preventivo) e un menu di schede. Overview (dati chiave, riassunto, team con volti grandi, numeri, attenzione, piano), Preventivo, Persone, Materiale e trasporti, Ordini, File, Sicurezza, To-Do. Una scheda compare solo se per quell'evento ha contenuto; Overview, Preventivo e Persone ci sono sempre.
