# Tabelle dei flussi di commessa (docs 11 e 12): piano di lavoro, fasi, fabbisogni, alert,
# aree, richieste d'offerta, giri di trasporto, logistica persone, righe di preventivo.
# Stesso formato di spec.py: (colonna, tipo, descrizione). EXT = colonne da aggiungere a tabelle esistenti.
from core_v1 import T

TABELLE = [
 ("PIANO_COMMESSA", "Parametri da cui si generano le fasi della commessa", T(
  ("commessa_id", "→COMMESSE", "una riga per commessa"),
  ("ev_inizio", "ora", "orario di inizio di ogni giornata di evento"), ("ev_fine", "ora", ""),
  ("all_giorni", "numero", "giorni di allestimento prima dell'evento"), ("all_inizio", "ora", ""), ("all_fine", "ora", ""),
  ("prove_ore", "numero", "ore di prove e convocazione prima dell'inizio"), ("smo_ore", "numero", "ore di smontaggio dopo la fine"),
  ("magazzino_id", "→MAGAZZINI", "magazzino di partenza"), ("viaggio_min", "numero", "minuti di viaggio fino alla location"),
  ("carico", "lista: giorno prima, stesso giorno", ""), ("carico_ore", "numero", ""),
  ("scarico", "lista: subito, mattina dopo", ""), ("scarico_ore", "numero", ""))),
 ("FASI", "Fasi generate dal piano: il calendario delle persone dipende da queste", T(
  ("fase_id", "ID", ""), ("commessa_id", "→COMMESSE", ""),
  ("tipo", "lista: carico, andata, allestimento, prove, evento, smontaggio, ritorno, scarico", ""),
  ("giorno_n", "numero", "1, 2… se la fase dura più giorni"),
  ("dal", "data e ora", ""), ("al", "data e ora", ""), ("luogo", "testo", ""),
  ("modificata_a_mano", "sì/no", "sì = non si rigenera dai parametri"))),
 ("FABBISOGNI", "Ruoli che servono alla commessa, con le fasi in cui servono e i posti", T(
  ("fabbisogno_id", "ID", ""), ("commessa_id", "→COMMESSE", ""), ("ruolo", "testo", "es. Fonico"),
  ("funzione", "→LISTE_VALORI", "funzione del personale richiesta"),
  ("fasi", "lista multipla: carico, andata, allestimento, prove, evento, smontaggio, ritorno, scarico", ""),
  ("posti", "numero", ""), ("riga_preventivo_id", "→PREVENTIVI_RIGHE", "se nasce da una voce di personale"),
  ("competenze", "testo", "competenze richieste"))),
 ("ALERT_REGOLE", "Regole degli alert di piattaforma", T(
  ("regola_id", "ID", ""), ("nome", "testo", "es. Persone mancanti"),
  ("tipo", "lista: persone mancanti, documenti sicurezza, preventivo, ordini, materiale, altro", ""),
  ("giorni_prima", "numero", "es. 30, 10"), ("riferimento", "lista: prima fase, inizio evento, cambio stato", ""),
  ("livello", "lista: avviso, urgente", ""), ("destinatari", "lista multipla: PM, backup PM, sales, magazzino, direzione", ""),
  ("canale", "lista multipla: Hub, email, Google Chat", ""), ("attiva", "sì/no", ""))),
 ("ALERT", "Alert generati sulle commesse", T(
  ("alert_id", "ID", ""), ("regola_id", "→ALERT_REGOLE", ""), ("commessa_id", "→COMMESSE", ""),
  ("testo", "testo", ""), ("livello", "lista: avviso, urgente", ""),
  ("stato", "lista: aperto, visto, risolto", ""), ("risolto_il", "data e ora", ""), audit=True)),
 ("COMMESSA_AREE", "Aree attive in una commessa, con responsabile e visibilità", T(
  ("commessa_id", "→COMMESSE", ""), ("area", "testo", "categoria del database: location, hotel, catering, service…"),
  ("attiva", "sì/no", ""), ("responsabile_persona_id", "→PERSONE", ""),
  ("visibile_a", "lista multipla", "ruoli o persone che vedono l'area"),
  ("stato", "lista: da avviare, in corso, chiusa", ""), ("scadenza", "data", ""))),
 ("RICHIESTE_OFFERTA", "Richieste d'offerta ai fornitori, per area", T(
  ("rdo_id", "ID", "codice nell'oggetto della mail, es. D26-007 · RDO-03"), ("commessa_id", "→COMMESSE", ""),
  ("area", "testo", ""), ("oggetto", "testo", ""), ("testo", "testo", "bozza scritta dall'AI e rivista"),
  ("casella", "email", "default ordini@nakamastudio.it"), ("scadenza_risposta", "data", ""),
  ("stato", "lista: bozza, inviata, in valutazione, chiusa", ""))),
 ("RDO_FORNITORI", "Ogni fornitore interpellato in una richiesta d'offerta", T(
  ("rdo_id", "→RICHIESTE_OFFERTA", ""), ("fornitore_org_id", "→ORGANIZZAZIONI", ""), ("contatto_id", "→CONTATTI", ""),
  ("gmail_thread_id", "testo", "per agganciare le risposte"), ("inviata_il", "data e ora", ""),
  ("stato", "lista: bozza, inviata, risposta, preventivo ricevuto, scelto, scartato, declinato", ""),
  ("importo_offerto", "€", ""), ("file_id", "→FILE", "preventivo del fornitore salvato su Drive"),
  ("esito_comunicato_il", "data e ora", "data della risposta positiva o negativa"))),
 ("GIRI", "Giri di trasporto composti liberamente dal magazzino", T(
  ("giro_id", "ID", ""), ("data", "data", ""), ("veicolo_id", "→veicoli", ""),
  ("autista_persona_id", "→PERSONE", ""), ("stato", "lista: pianificato, confermato, fatto", ""), "note")),
 ("TAPPE", "Tappe di un giro: una tappa può servire più commesse", T(
  ("giro_id", "→GIRI", ""), ("ordine", "numero", ""), ("magazzino_id", "→MAGAZZINI", "se la tappa è un magazzino"),
  ("location_id", "→location", "se la tappa è una location"), ("hotel_id", "→hotel", "se la tappa è un hotel"),
  ("azione", "lista: carico, scarico, ritiro, consegna", ""), ("commessa_id", "→COMMESSE", ""),
  ("prenotazione_id", "→PRENOTAZIONI", "materiale movimentato"), ("ora_prevista", "data e ora", ""), "note")),
 ("LOGISTICA_PERSONA", "Viaggio, hotel e transfer di una persona confermata su una commessa", T(
  ("logistica_id", "ID", ""), ("commessa_id", "→COMMESSE", ""), ("persona_id", "→PERSONE", ""),
  ("andata_il", "data e ora", ""), ("andata_mezzo", "lista: volo, treno, auto, furgone, altro", ""), ("andata_riferimento", "testo", "biglietto o PNR"),
  ("ritorno_il", "data e ora", ""), ("ritorno_mezzo", "lista: volo, treno, auto, furgone, altro", ""), ("ritorno_riferimento", "testo", ""),
  ("hotel_id", "→hotel", ""), ("notti", "numero", ""), ("transfer", "testo", ""),
  ("stato", "lista: da organizzare, richiesto, confermato", ""), ("costo", "€", ""))),
 ("PREVENTIVI_RIGHE", "Voci del preventivo di commessa, ognuna con il suo regime IVA", T(
  ("riga_id", "ID", ""), ("preventivo_id", "→PREVENTIVI", ""), ("sezione", "testo", "es. AUDIO, LOCATION"),
  ("fonte", "lista: inventario, location, listino, grafiche, voce libera, fornitore", "da dove arriva la voce"),
  ("riferimento", "testo", "id dell'articolo, sala, voce di listino…"), ("descrizione", "testo", ""),
  ("quantita", "numero", ""), ("giorni_servizi", "numero", ""), ("prezzo_unitario", "€", ""), ("costo_unitario", "€", ""),
  ("opzionale", "sì/no", "fuori dal totale"), ("magazzino_id", "→MAGAZZINI", "per le voci di inventario"),
  ("fornitore_org_id", "→ORGANIZZAZIONI", ""),
  ("regime_iva", "lista: ordinaria, ridotta, esente, 74-ter, split payment, reverse charge, fuori campo", ""),
  ("aliquota_iva", "%", "22, 10, 4, 0"), ("ritenuta", "%", "per le prestazioni soggette"))),
 # ── sincronizzazione tra dispositivi ──
 ("DISPOSITIVI", "Computer, telefoni e tablet da cui ogni persona usa l'Hub", T(
  ("dispositivo_id", "ID", "generato dall'app al primo accesso, inviato in ogni richiesta (header x-hub-device)"),
  ("persona_id", "→PERSONE", ""), ("nome", "testo", "es. MacBook di Sara, iPhone magazzino"),
  ("tipo", "lista: computer, telefono, tablet", ""), ("ultimo_sync", "data e ora", "ultima volta che ha ricevuto gli aggiornamenti"),
  ("modifiche_in_attesa", "numero", "modifiche fatte offline non ancora inviate"), ("attivo", "sì/no", ""))),
 ("MODIFICHE", "Registro di ogni modifica, scritto in automatico dal database: chi, da quale dispositivo, cosa è cambiato", T(
  ("tabella", "testo", ""), ("record_id", "testo", ""), ("operazione", "lista: insert, update, delete", ""),
  ("differenze", "json", "per gli update: {campo: [prima, dopo]}; per insert e delete: il record"),
  ("utente", "testo", "id dell'utente Supabase"), ("dispositivo", "testo", "dispositivo_id dall'header x-hub-device"),
  ("quando", "data e ora", ""), audit=False)),
]

EXT = {
 "COMMESSE": [("sales_persona_id", "→PERSONE", ""), ("referente_contatto_id", "→CONTATTI", "referente del cliente"),
   ("catering_org_id", "→ORGANIZZAZIONI", ""), ("lead_org_id", "→ORGANIZZAZIONI", "chi ha portato il cliente"),
   ("lead_tipo", "lista: rebate, sconto in fattura", ""), ("lead_percentuale", "%", ""), ("drive_folder_id", "testo", "cartella Drive della commessa")],
 "IMPEGNI": [("fabbisogno_id", "→FABBISOGNI", ""), ("fase_id", "→FASI", ""), ("posto_n", "numero", ""),
   ("confermato_da", "→PERSONE", ""), ("confermato_il", "data e ora", ""), ("titolo_calendario", "testo", "es. [D26-007] Fonico · Evento · Vela Pharma · Spazio Navigli")],
 "TIMESHEET": [("impegno_id", "→IMPEGNI", ""), ("ore_previste", "numero", "dal piano"), ("ore_effettive", "numero", ""),
   ("stato", "lista: previsto, consuntivato, approvato", "")],
 "PREVENTIVI": [("ver_file_docx_id", "→FILE", ""), ("ver_file_xlsx_id", "→FILE", ""), ("ver_file_pdf_id", "→FILE", "")],
}
