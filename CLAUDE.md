# Regole per lavorare su questo repository

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
- Colore azienda: Chedo azzurro (#2BB3E6, da allineare al logo), Nakama #FF2E7E. Si usa come gradiente leggero nell'intestazione della scheda progetto e come striscia a sinistra nelle righe dell'elenco progetti. Non altrove.
- Gerarchia dell'intestazione progetto, in ordine: nome e codice commessa, location, PM di riferimento.
- Magazzino: le richieste sono un accordion per commessa (codice ed evento); dentro, caselle di controllo per riga, link al preventivo, "Conferma selezionate". Le giacenze mostrano solo nome dell'articolo e disponibilità. Niente diciture tipo "liberi / totali · date".
- Sidebar a sinistra con icone SVG e etichette; su telefono diventa una barra in alto.
- Titoli dei pannelli come etichette maiuscole piccole; niente sottotitoli esplicativi sotto i titoli delle viste; niente testi di aiuto sotto i form.
- Stato sempre con testo oltre al colore. Stati vuoti in una riga.
- La scheda progetto è a moduli: intestazione (codice, titolo, preventivo) e un menu di schede. Overview (dati chiave, riassunto, team con volti grandi, numeri, attenzione, piano), Preventivo, Persone, Materiale e trasporti, Ordini, File, Sicurezza, To-Do. Una scheda compare solo se per quell'evento ha contenuto; Overview, Preventivo e Persone ci sono sempre.
