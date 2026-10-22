// Doffy · dati di esempio (fittizi). In produzione arrivano da Supabase.
const D = {
 "RUOLI": [
  {
   "ruolo_id": "DIR",
   "nome": "Direzione",
   "descrizione": "Vede tutto, gestisce listino e report"
  },
  {
   "ruolo_id": "SYS",
   "nome": "Admin sistema",
   "descrizione": "Gestisce utenti, ruoli e configurazione"
  },
  {
   "ruolo_id": "PM",
   "nome": "Project manager",
   "descrizione": "Gestisce le commesse in cui è PM o backup"
  },
  {
   "ruolo_id": "COM",
   "nome": "Commerciale",
   "descrizione": "Richieste, prospect, clienti, location"
  },
  {
   "ruolo_id": "AMM",
   "nome": "Amministrazione",
   "descrizione": "Fatture, pagamenti, fornitori, personale"
  },
  {
   "ruolo_id": "OPE",
   "nome": "Operativo / tecnico",
   "descrizione": "Vede le commesse del proprio team"
  },
  {
   "ruolo_id": "SEG",
   "nome": "Segreteria e logistica",
   "descrizione": "Logistica partecipanti, ordini, trasporti"
  },
  {
   "ruolo_id": "MAG",
   "nome": "Magazziniere",
   "descrizione": "Gestisce magazzini, prenotazioni, trasporti"
  },
  {
   "ruolo_id": "EXT",
   "nome": "Freelance esterno",
   "descrizione": "Solo commesse del proprio team, proprie ore"
  }
 ],
 "AREE": [
  {
   "area_id": "HOME",
   "nome": "Home",
   "gruppo": "eventi",
   "custode_ruolo_id": "",
   "attiva_mvp": "sì"
  },
  {
   "area_id": "RICHIESTE",
   "nome": "Richieste e prospect",
   "gruppo": "eventi",
   "custode_ruolo_id": "PM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "PROGETTO",
   "nome": "Eventi · scheda progetto",
   "gruppo": "eventi",
   "custode_ruolo_id": "PM",
   "attiva_mvp": "sì"
  },
  {
   "area_id": "TEAM_CAL",
   "nome": "Team e calendario di progetto",
   "gruppo": "eventi",
   "custode_ruolo_id": "PM",
   "attiva_mvp": "sì"
  },
  {
   "area_id": "TODO",
   "nome": "To-Do",
   "gruppo": "eventi",
   "custode_ruolo_id": "PM",
   "attiva_mvp": "sì"
  },
  {
   "area_id": "COSTING",
   "nome": "Costing e preventivi",
   "gruppo": "economia",
   "custode_ruolo_id": "PM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "ORDINI",
   "nome": "Ordini",
   "gruppo": "economia",
   "custode_ruolo_id": "PM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "AMMINISTRAZIONE",
   "nome": "Amministrazione",
   "gruppo": "economia",
   "custode_ruolo_id": "AMM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "MAGAZZINO",
   "nome": "Magazzino",
   "gruppo": "risorse",
   "custode_ruolo_id": "MAG",
   "attiva_mvp": "sì"
  },
  {
   "area_id": "PERSONALE",
   "nome": "Personale",
   "gruppo": "risorse",
   "custode_ruolo_id": "AMM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "TIMESHEET",
   "nome": "Timesheet",
   "gruppo": "risorse",
   "custode_ruolo_id": "",
   "attiva_mvp": "no"
  },
  {
   "area_id": "TRASPORTI",
   "nome": "Trasporti",
   "gruppo": "risorse",
   "custode_ruolo_id": "MAG",
   "attiva_mvp": "no"
  },
  {
   "area_id": "NOLEGGI",
   "nome": "Noleggi",
   "gruppo": "risorse",
   "custode_ruolo_id": "MAG",
   "attiva_mvp": "no"
  },
  {
   "area_id": "CLIENTI",
   "nome": "Clienti",
   "gruppo": "anagrafiche",
   "custode_ruolo_id": "COM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "FORNITORI",
   "nome": "Fornitori",
   "gruppo": "anagrafiche",
   "custode_ruolo_id": "AMM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "LOCATION",
   "nome": "Location",
   "gruppo": "anagrafiche",
   "custode_ruolo_id": "COM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "GRAFICHE",
   "nome": "Grafiche",
   "gruppo": "anagrafiche",
   "custode_ruolo_id": "PM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "LISTINO",
   "nome": "Listino e pacchetti",
   "gruppo": "anagrafiche",
   "custode_ruolo_id": "DIR",
   "attiva_mvp": "no"
  },
  {
   "area_id": "SECURITY",
   "nome": "Security",
   "gruppo": "sistema",
   "custode_ruolo_id": "PM",
   "attiva_mvp": "no"
  },
  {
   "area_id": "REPORT",
   "nome": "Report e KPI",
   "gruppo": "sistema",
   "custode_ruolo_id": "DIR",
   "attiva_mvp": "no"
  },
  {
   "area_id": "IMPOSTAZIONI",
   "nome": "Impostazioni",
   "gruppo": "sistema",
   "custode_ruolo_id": "SYS",
   "attiva_mvp": "no"
  }
 ],
 "PERMESSI": [
  {
   "ruolo_id": "DIR",
   "area_id": "HOME",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "HOME",
   "livello": "V"
  },
  {
   "ruolo_id": "PM",
   "area_id": "HOME",
   "livello": "V"
  },
  {
   "ruolo_id": "COM",
   "area_id": "HOME",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "HOME",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "HOME",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "HOME",
   "livello": "V"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "HOME",
   "livello": "V"
  },
  {
   "ruolo_id": "EXT",
   "area_id": "HOME",
   "livello": "P"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "RICHIESTE",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "RICHIESTE",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "RICHIESTE",
   "livello": "G"
  },
  {
   "ruolo_id": "COM",
   "area_id": "RICHIESTE",
   "livello": "G"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "RICHIESTE",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "RICHIESTE",
   "livello": "V"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "PROGETTO",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "PROGETTO",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "PROGETTO",
   "livello": "G"
  },
  {
   "ruolo_id": "COM",
   "area_id": "PROGETTO",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "PROGETTO",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "PROGETTO",
   "livello": "P"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "PROGETTO",
   "livello": "P"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "PROGETTO",
   "livello": "V"
  },
  {
   "ruolo_id": "EXT",
   "area_id": "PROGETTO",
   "livello": "P"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "TEAM_CAL",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "TEAM_CAL",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "TEAM_CAL",
   "livello": "G"
  },
  {
   "ruolo_id": "COM",
   "area_id": "TEAM_CAL",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "TEAM_CAL",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "TEAM_CAL",
   "livello": "P"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "TEAM_CAL",
   "livello": "P"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "TEAM_CAL",
   "livello": "P"
  },
  {
   "ruolo_id": "EXT",
   "area_id": "TEAM_CAL",
   "livello": "P"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "TODO",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "TODO",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "TODO",
   "livello": "G"
  },
  {
   "ruolo_id": "COM",
   "area_id": "TODO",
   "livello": "M"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "TODO",
   "livello": "M"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "TODO",
   "livello": "P"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "TODO",
   "livello": "P"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "TODO",
   "livello": "P"
  },
  {
   "ruolo_id": "EXT",
   "area_id": "TODO",
   "livello": "P"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "COSTING",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "COSTING",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "COSTING",
   "livello": "G"
  },
  {
   "ruolo_id": "COM",
   "area_id": "COSTING",
   "livello": "G"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "COSTING",
   "livello": "V"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "ORDINI",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "ORDINI",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "ORDINI",
   "livello": "G"
  },
  {
   "ruolo_id": "COM",
   "area_id": "ORDINI",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "ORDINI",
   "livello": "M"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "ORDINI",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "ORDINI",
   "livello": "M"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "ORDINI",
   "livello": "M"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "AMMINISTRAZIONE",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "AMMINISTRAZIONE",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "AMMINISTRAZIONE",
   "livello": "V"
  },
  {
   "ruolo_id": "COM",
   "area_id": "AMMINISTRAZIONE",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "AMMINISTRAZIONE",
   "livello": "G"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "MAGAZZINO",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "MAGAZZINO",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "MAGAZZINO",
   "livello": "M"
  },
  {
   "ruolo_id": "COM",
   "area_id": "MAGAZZINO",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "MAGAZZINO",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "MAGAZZINO",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "MAGAZZINO",
   "livello": "V"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "MAGAZZINO",
   "livello": "G"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "PERSONALE",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "PERSONALE",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "PERSONALE",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "PERSONALE",
   "livello": "G"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "PERSONALE",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "PERSONALE",
   "livello": "V"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "PERSONALE",
   "livello": "V"
  },
  {
   "ruolo_id": "EXT",
   "area_id": "PERSONALE",
   "livello": "P"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "TIMESHEET",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "TIMESHEET",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "TIMESHEET",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "TIMESHEET",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "TIMESHEET",
   "livello": "P"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "TIMESHEET",
   "livello": "P"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "TIMESHEET",
   "livello": "P"
  },
  {
   "ruolo_id": "EXT",
   "area_id": "TIMESHEET",
   "livello": "P"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "TRASPORTI",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "TRASPORTI",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "TRASPORTI",
   "livello": "M"
  },
  {
   "ruolo_id": "COM",
   "area_id": "TRASPORTI",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "TRASPORTI",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "TRASPORTI",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "TRASPORTI",
   "livello": "M"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "TRASPORTI",
   "livello": "G"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "NOLEGGI",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "NOLEGGI",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "NOLEGGI",
   "livello": "M"
  },
  {
   "ruolo_id": "COM",
   "area_id": "NOLEGGI",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "NOLEGGI",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "NOLEGGI",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "NOLEGGI",
   "livello": "V"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "NOLEGGI",
   "livello": "G"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "CLIENTI",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "CLIENTI",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "CLIENTI",
   "livello": "M"
  },
  {
   "ruolo_id": "COM",
   "area_id": "CLIENTI",
   "livello": "G"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "CLIENTI",
   "livello": "M"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "CLIENTI",
   "livello": "V"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "FORNITORI",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "FORNITORI",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "FORNITORI",
   "livello": "M"
  },
  {
   "ruolo_id": "COM",
   "area_id": "FORNITORI",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "FORNITORI",
   "livello": "G"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "FORNITORI",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "FORNITORI",
   "livello": "M"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "FORNITORI",
   "livello": "V"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "LOCATION",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "LOCATION",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "LOCATION",
   "livello": "M"
  },
  {
   "ruolo_id": "COM",
   "area_id": "LOCATION",
   "livello": "G"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "LOCATION",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "LOCATION",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "LOCATION",
   "livello": "M"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "LOCATION",
   "livello": "V"
  },
  {
   "ruolo_id": "EXT",
   "area_id": "LOCATION",
   "livello": "P"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "GRAFICHE",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "GRAFICHE",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "GRAFICHE",
   "livello": "M"
  },
  {
   "ruolo_id": "COM",
   "area_id": "GRAFICHE",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "GRAFICHE",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "GRAFICHE",
   "livello": "M"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "GRAFICHE",
   "livello": "V"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "GRAFICHE",
   "livello": "V"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "LISTINO",
   "livello": "G"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "LISTINO",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "LISTINO",
   "livello": "V"
  },
  {
   "ruolo_id": "COM",
   "area_id": "LISTINO",
   "livello": "M"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "LISTINO",
   "livello": "V"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "SECURITY",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "SECURITY",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "SECURITY",
   "livello": "G"
  },
  {
   "ruolo_id": "COM",
   "area_id": "SECURITY",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "SECURITY",
   "livello": "V"
  },
  {
   "ruolo_id": "OPE",
   "area_id": "SECURITY",
   "livello": "V"
  },
  {
   "ruolo_id": "SEG",
   "area_id": "SECURITY",
   "livello": "V"
  },
  {
   "ruolo_id": "MAG",
   "area_id": "SECURITY",
   "livello": "V"
  },
  {
   "ruolo_id": "EXT",
   "area_id": "SECURITY",
   "livello": "P"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "REPORT",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "REPORT",
   "livello": "G"
  },
  {
   "ruolo_id": "PM",
   "area_id": "REPORT",
   "livello": "P"
  },
  {
   "ruolo_id": "COM",
   "area_id": "REPORT",
   "livello": "V"
  },
  {
   "ruolo_id": "AMM",
   "area_id": "REPORT",
   "livello": "V"
  },
  {
   "ruolo_id": "DIR",
   "area_id": "IMPOSTAZIONI",
   "livello": "V"
  },
  {
   "ruolo_id": "SYS",
   "area_id": "IMPOSTAZIONI",
   "livello": "G"
  }
 ],
 "LISTE_VALORI": [
  {
   "lista": "stato_commessa",
   "valore": "prospect",
   "etichetta": "",
   "ordine": 1,
   "colore": "#F59E0B",
   "attivo": ""
  },
  {
   "lista": "stato_commessa",
   "valore": "confermata",
   "etichetta": "",
   "ordine": 2,
   "colore": "#2563EB",
   "attivo": ""
  },
  {
   "lista": "stato_commessa",
   "valore": "in preparazione",
   "etichetta": "",
   "ordine": 3,
   "colore": "#7C3AED",
   "attivo": ""
  },
  {
   "lista": "stato_commessa",
   "valore": "in corso",
   "etichetta": "",
   "ordine": 4,
   "colore": "#DC2626",
   "attivo": ""
  },
  {
   "lista": "stato_commessa",
   "valore": "consuntivo",
   "etichetta": "",
   "ordine": 5,
   "colore": "#0F766E",
   "attivo": ""
  },
  {
   "lista": "stato_commessa",
   "valore": "chiusa",
   "etichetta": "",
   "ordine": 6,
   "colore": "#6B7280",
   "attivo": ""
  },
  {
   "lista": "stato_commessa",
   "valore": "persa",
   "etichetta": "",
   "ordine": 7,
   "colore": "#9CA3AF",
   "attivo": ""
  },
  {
   "lista": "stato_commessa",
   "valore": "annullata",
   "etichetta": "",
   "ordine": 8,
   "colore": "#9CA3AF",
   "attivo": ""
  },
  {
   "lista": "motivo_perso",
   "valore": "prezzo",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "motivo_perso",
   "valore": "data non disponibile",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "motivo_perso",
   "valore": "cliente ha rinunciato",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "motivo_perso",
   "valore": "scelto altro fornitore",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "linea",
   "valore": "MCE",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "linea",
   "valore": "NOL",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "linea",
   "valore": "DIG",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "linea",
   "valore": "SERVICE",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "linea",
   "valore": "ALLESTIMENTI",
   "etichetta": "",
   "ordine": 5,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "linea",
   "valore": "GRAFICHE",
   "etichetta": "",
   "ordine": 6,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "linea",
   "valore": "PERSONALE",
   "etichetta": "",
   "ordine": 7,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "PM",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "backup PM",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "commerciale",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "magazzino",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "fonico",
   "etichetta": "",
   "ordine": 5,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "regia video",
   "etichetta": "",
   "ordine": 6,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "light designer",
   "etichetta": "",
   "ordine": 7,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "rigger",
   "etichetta": "",
   "ordine": 8,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "hostess",
   "etichetta": "",
   "ordine": 9,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "ruolo_progetto",
   "valore": "segreteria",
   "etichetta": "",
   "ordine": 10,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "coordinamento",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "tecnico audio",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "tecnico video",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "tecnico luci",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "rigger",
   "etichetta": "",
   "ordine": 5,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "magazzino",
   "etichetta": "",
   "ordine": 6,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "hostess",
   "etichetta": "",
   "ordine": 7,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "segreteria",
   "etichetta": "",
   "ordine": 8,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "amministrazione",
   "etichetta": "",
   "ordine": 9,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "funzione",
   "valore": "commerciale",
   "etichetta": "",
   "ordine": 10,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "competenza",
   "valore": "MIDAS",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "competenza",
   "valore": "VMIX",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "competenza",
   "valore": "LEDWALL",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "competenza",
   "valore": "RIGGER",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "competenza",
   "valore": "GRANDMA",
   "etichetta": "",
   "ordine": 5,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "competenza",
   "valore": "PATENTE C",
   "etichetta": "",
   "ordine": 6,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_articolo",
   "valore": "01 audio",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_articolo",
   "valore": "02 video",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_articolo",
   "valore": "03 luci",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_articolo",
   "valore": "04 truss & rigging",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_articolo",
   "valore": "05 arredi & palco",
   "etichetta": "",
   "ordine": 5,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_articolo",
   "valore": "06 cavi & energia",
   "etichetta": "",
   "ordine": 6,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_articolo",
   "valore": "07 consumabili",
   "etichetta": "",
   "ordine": 7,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "brief",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "preventivo",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "costing",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "contratto",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "planimetria",
   "etichetta": "",
   "ordine": 5,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "scaletta",
   "etichetta": "",
   "ordine": 6,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "offerta fornitore",
   "etichetta": "",
   "ordine": 7,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "accrediti",
   "etichetta": "",
   "ordine": 8,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "DUVRI",
   "etichetta": "",
   "ordine": 9,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "POS",
   "etichetta": "",
   "ordine": 10,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "piano di emergenza",
   "etichetta": "",
   "ordine": 11,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipo_documento",
   "valore": "certificazione",
   "etichetta": "",
   "ordine": 12,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "condizioni_pagamento",
   "valore": "50% conferma · 50% a 30 gg fine evento",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "condizioni_pagamento",
   "valore": "30% conferma · 70% a 30 gg",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "condizioni_pagamento",
   "valore": "100% a 60 gg data fattura",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipologia_location",
   "valore": "spazio industriale",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipologia_location",
   "valore": "hotel",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipologia_location",
   "valore": "villa storica",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "tipologia_location",
   "valore": "centro congressi",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "service",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "video",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "luci",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "allestimenti",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "personale",
   "etichetta": "",
   "ordine": 5,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "grafiche",
   "etichetta": "",
   "ordine": 6,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "trasporti",
   "etichetta": "",
   "ordine": 7,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "location",
   "etichetta": "",
   "ordine": 8,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "catering",
   "etichetta": "",
   "ordine": 9,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_listino",
   "valore": "segreteria",
   "etichetta": "",
   "ordine": 10,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_fornitore",
   "valore": "service/noleggio",
   "etichetta": "",
   "ordine": 1,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_fornitore",
   "valore": "allestimenti",
   "etichetta": "",
   "ordine": 2,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_fornitore",
   "valore": "stampa",
   "etichetta": "",
   "ordine": 3,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_fornitore",
   "valore": "personale",
   "etichetta": "",
   "ordine": 4,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_fornitore",
   "valore": "trasporti",
   "etichetta": "",
   "ordine": 5,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_fornitore",
   "valore": "catering",
   "etichetta": "",
   "ordine": 6,
   "colore": "",
   "attivo": ""
  },
  {
   "lista": "categoria_fornitore",
   "valore": "location",
   "etichetta": "",
   "ordine": 7,
   "colore": "",
   "attivo": ""
  }
 ],
 "IMPOSTAZIONI": [
  {
   "chiave": "formato_codice_prospect",
   "valore": "P{AA}-{NNN}",
   "descrizione": "es. P26-014"
  },
  {
   "chiave": "formato_codice_definitivo",
   "valore": "D{AA}-{NNN}",
   "descrizione": "numerazione separata dai prospect"
  },
  {
   "chiave": "prossimo_prospect",
   "valore": "P26-019",
   "descrizione": "aggiornato da n8n"
  },
  {
   "chiave": "prossimo_definitivo",
   "valore": "D26-011",
   "descrizione": "aggiornato da n8n"
  },
  {
   "chiave": "cartelle_nucleo",
   "valore": "01_BRIEF E COMMERCIALE, 02_ECONOMICO, 03_FORNITORI, 07_CLIENTE, 08_POST EVENTO, _ARCHIVIO",
   "descrizione": "sempre create"
  },
  {
   "chiave": "cartelle_moduli",
   "valore": "04_PRODUZIONE, 05_LOGISTICA, 06_CREATIVITÀ",
   "descrizione": "create se attivate; vuote eliminate alla chiusura"
  },
  {
   "chiave": "ricarico_default",
   "valore": "10%",
   "descrizione": "MUP proposto sulle nuove righe di costing"
  },
  {
   "chiave": "soglia_magazzino_al_limite",
   "valore": "20%",
   "descrizione": "sotto questa quota residua la disponibilità è 'al limite'"
  },
  {
   "chiave": "permessi_assenti",
   "valore": "nessun accesso",
   "descrizione": "in PERMESSI una combinazione ruolo/area mancante vale '—'"
  },
  {
   "chiave": "condizioni_pagamento_chedo",
   "valore": "da definire con il CEO",
   "descrizione": ""
  },
  {
   "chiave": "condizioni_pagamento_nakama",
   "valore": "da definire con il CEO",
   "descrizione": ""
  },
  {
   "chiave": "dati",
   "valore": "DEMO",
   "descrizione": "tutti i dati di persone, clienti, commesse sono fittizi"
  }
 ],
 "PERSONE": [
  {
   "persona_id": "P01",
   "email_google": "master@doffy-demo.it",
   "nome": "Admin",
   "cognome": "Test",
   "azienda": "Nakama",
   "tipo_rapporto": "altro",
   "funzione_principale": "coordinamento",
   "rank": "",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P02",
   "email_google": "giulia.ferri@nakama-demo.it",
   "nome": "Giulia",
   "cognome": "Ferri",
   "azienda": "Nakama",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "coordinamento",
   "rank": "A",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P03",
   "email_google": "marco.bellini@nakama-demo.it",
   "nome": "Marco",
   "cognome": "Bellini",
   "azienda": "Chedo",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "coordinamento",
   "rank": "A",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P04",
   "email_google": "sara.colombo@nakama-demo.it",
   "nome": "Sara",
   "cognome": "Colombo",
   "azienda": "Chedo",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "coordinamento",
   "rank": "A",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P05",
   "email_google": "luca.moretti@nakama-demo.it",
   "nome": "Luca",
   "cognome": "Moretti",
   "azienda": "Nakama",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "coordinamento",
   "rank": "A",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P06",
   "email_google": "elena.riva@nakama-demo.it",
   "nome": "Elena",
   "cognome": "Riva",
   "azienda": "Nakama",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "coordinamento",
   "rank": "B",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P07",
   "email_google": "davide.conti@nakama-demo.it",
   "nome": "Davide",
   "cognome": "Conti",
   "azienda": "Nakama",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "commerciale",
   "rank": "A",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P08",
   "email_google": "chiara.galli@nakama-demo.it",
   "nome": "Chiara",
   "cognome": "Galli",
   "azienda": "Nakama",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "amministrazione",
   "rank": "A",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P09",
   "email_google": "paolo.ricci@nakama-demo.it",
   "nome": "Paolo",
   "cognome": "Ricci",
   "azienda": "Chedo",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "magazzino",
   "rank": "A",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P10",
   "email_google": "andrea.fontana@nakama-demo.it",
   "nome": "Andrea",
   "cognome": "Fontana",
   "azienda": "Chedo",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "tecnico audio",
   "rank": "A",
   "tariffa_giornaliera": 280,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P11",
   "email_google": "matteo.greco@freelance-demo.it",
   "nome": "Matteo",
   "cognome": "Greco",
   "azienda": "esterno",
   "tipo_rapporto": "freelance",
   "funzione_principale": "tecnico video",
   "rank": "A",
   "tariffa_giornaliera": 300,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P12",
   "email_google": "federica.marino@nakama-demo.it",
   "nome": "Federica",
   "cognome": "Marino",
   "azienda": "Nakama",
   "tipo_rapporto": "dipendente",
   "funzione_principale": "segreteria",
   "rank": "B",
   "tariffa_giornaliera": null,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P13",
   "email_google": "simone.villa@freelance-demo.it",
   "nome": "Simone",
   "cognome": "Villa",
   "azienda": "esterno",
   "tipo_rapporto": "freelance",
   "funzione_principale": "rigger",
   "rank": "A",
   "tariffa_giornaliera": 320,
   "accesso_hub": "sì",
   "attivo": "sì"
  },
  {
   "persona_id": "P14",
   "email_google": "valentina.rossi@freelance-demo.it",
   "nome": "Valentina",
   "cognome": "Rossi",
   "azienda": "esterno",
   "tipo_rapporto": "freelance",
   "funzione_principale": "hostess",
   "rank": "B",
   "tariffa_giornaliera": 180,
   "accesso_hub": "no",
   "attivo": "sì"
  }
 ],
 "PERSONE_RUOLI": [
  {
   "persona_id": "P01",
   "ruolo_id": "SYS"
  },
  {
   "persona_id": "P02",
   "ruolo_id": "DIR"
  },
  {
   "persona_id": "P02",
   "ruolo_id": "COM"
  },
  {
   "persona_id": "P03",
   "ruolo_id": "DIR"
  },
  {
   "persona_id": "P04",
   "ruolo_id": "PM"
  },
  {
   "persona_id": "P05",
   "ruolo_id": "PM"
  },
  {
   "persona_id": "P06",
   "ruolo_id": "PM"
  },
  {
   "persona_id": "P07",
   "ruolo_id": "COM"
  },
  {
   "persona_id": "P08",
   "ruolo_id": "AMM"
  },
  {
   "persona_id": "P09",
   "ruolo_id": "MAG"
  },
  {
   "persona_id": "P10",
   "ruolo_id": "OPE"
  },
  {
   "persona_id": "P11",
   "ruolo_id": "EXT"
  },
  {
   "persona_id": "P12",
   "ruolo_id": "SEG"
  },
  {
   "persona_id": "P13",
   "ruolo_id": "EXT"
  },
  {
   "persona_id": "P14",
   "ruolo_id": "EXT"
  }
 ],
 "COMPETENZE": [
  {
   "persona_id": "P10",
   "competenza": "MIDAS",
   "livello": "esperto"
  },
  {
   "persona_id": "P10",
   "competenza": "PATENTE C",
   "livello": "buono"
  },
  {
   "persona_id": "P11",
   "competenza": "VMIX",
   "livello": "esperto"
  },
  {
   "persona_id": "P11",
   "competenza": "LEDWALL",
   "livello": "buono"
  },
  {
   "persona_id": "P13",
   "competenza": "RIGGER",
   "livello": "esperto"
  },
  {
   "persona_id": "P09",
   "competenza": "PATENTE C",
   "livello": "esperto"
  },
  {
   "persona_id": "P09",
   "competenza": "GRANDMA",
   "livello": "base"
  }
 ],
 "INDISPONIBILITA": [
  {
   "indisp_id": "IND-01",
   "persona_id": "P11",
   "dal": "2026-11-13 14:00",
   "al": "2026-11-13 23:59",
   "motivo": "altro lavoro"
  },
  {
   "indisp_id": "IND-02",
   "persona_id": "P06",
   "dal": "2026-11-02 00:00",
   "al": "2026-11-06 23:59",
   "motivo": "ferie"
  }
 ],
 "DATI_RISERVATI": [
  {
   "persona_id": "P10",
   "visita_medica_scadenza": "2027-03-15",
   "formazione_sicurezza_scadenza": "2027-06-30",
   "note": "DEMO: solo scadenze, nessun dato personale"
  },
  {
   "persona_id": "P11",
   "visita_medica_scadenza": "2026-12-31",
   "formazione_sicurezza_scadenza": "2027-02-28",
   "note": "DEMO: solo scadenze, nessun dato personale"
  },
  {
   "persona_id": "P13",
   "visita_medica_scadenza": "2027-01-20",
   "formazione_sicurezza_scadenza": "2026-11-05",
   "note": "DEMO: formazione lavori in quota in scadenza prima dell'evento D26-007"
  }
 ],
 "ORGANIZZAZIONI": [
  {
   "org_id": "ORG-001",
   "ragione_sociale": "Vela Pharma S.p.A.",
   "nome_breve": "Vela Pharma",
   "e_cliente": "sì",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "no",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Milano",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "P07",
   "fonte": "tramite Altamira",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-002",
   "ragione_sociale": "Altamira Events S.r.l.",
   "nome_breve": "Altamira",
   "e_cliente": "no",
   "e_agenzia": "sì",
   "e_partner": "no",
   "e_fornitore": "no",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Milano",
   "paese": "Italia",
   "condizioni_pagamento": "50% conferma · 50% a 30 gg fine evento",
   "commerciale_persona_id": "P07",
   "fonte": "segnalata da Mirto",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-003",
   "ragione_sociale": "Borealis Bank S.p.A.",
   "nome_breve": "Borealis",
   "e_cliente": "sì",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "no",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Torino",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "P07",
   "fonte": "tramite Studio Kairos",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-004",
   "ragione_sociale": "Studio Kairos S.r.l.",
   "nome_breve": "Kairos",
   "e_cliente": "no",
   "e_agenzia": "sì",
   "e_partner": "no",
   "e_fornitore": "no",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Torino",
   "paese": "Italia",
   "condizioni_pagamento": "30% conferma · 70% a 30 gg",
   "commerciale_persona_id": "P07",
   "fonte": "storico Nakama",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-005",
   "ragione_sociale": "Mirto Consulting",
   "nome_breve": "Mirto",
   "e_cliente": "no",
   "e_agenzia": "no",
   "e_partner": "sì",
   "e_fornitore": "no",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Milano",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "",
   "fonte": "rete personale",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-006",
   "ragione_sociale": "Officine Lumen S.r.l.",
   "nome_breve": "Officine Lumen",
   "e_cliente": "no",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "sì",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Monza",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "",
   "fonte": "",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-007",
   "ragione_sociale": "Print&Go S.r.l.",
   "nome_breve": "Print&Go",
   "e_cliente": "no",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "sì",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Milano",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "",
   "fonte": "",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-008",
   "ragione_sociale": "Cooperativa Tecnici Riuniti",
   "nome_breve": "Coop Tecnici",
   "e_cliente": "no",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "sì",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Milano",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "",
   "fonte": "",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-009",
   "ragione_sociale": "TrasLog S.r.l.",
   "nome_breve": "TrasLog",
   "e_cliente": "no",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "sì",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Sesto S. Giovanni",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "",
   "fonte": "",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-010",
   "ragione_sociale": "Gestioni Spazi Navigli S.r.l.",
   "nome_breve": "Spazi Navigli",
   "e_cliente": "no",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "sì",
   "e_gestore_location": "sì",
   "stato": "attivo",
   "citta": "Milano",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "",
   "fonte": "",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-011",
   "ragione_sociale": "Hotel Bellavista Torino",
   "nome_breve": "Hotel Bellavista",
   "e_cliente": "no",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "sì",
   "e_gestore_location": "sì",
   "stato": "attivo",
   "citta": "Torino",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "",
   "fonte": "",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-012",
   "ragione_sociale": "Nordica Automotive S.p.A.",
   "nome_breve": "Nordica",
   "e_cliente": "sì",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "no",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Bergamo",
   "paese": "Italia",
   "condizioni_pagamento": "100% a 60 gg data fattura",
   "commerciale_persona_id": "P07",
   "fonte": "fiera 2025",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-013",
   "ragione_sociale": "Catering Verde S.r.l.",
   "nome_breve": "Catering Verde",
   "e_cliente": "no",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "sì",
   "e_gestore_location": "no",
   "stato": "attivo",
   "citta": "Milano",
   "paese": "Italia",
   "condizioni_pagamento": "",
   "commerciale_persona_id": "",
   "fonte": "",
   "note": "DEMO"
  },
  {
   "org_id": "ORG-014",
   "ragione_sociale": "Fondazione Arte Viva",
   "nome_breve": "Arte Viva",
   "e_cliente": "sì",
   "e_agenzia": "no",
   "e_partner": "no",
   "e_fornitore": "no",
   "e_gestore_location": "sì",
   "stato": "attivo",
   "citta": "Como",
   "paese": "Italia",
   "condizioni_pagamento": "50% conferma · 50% a 30 gg fine evento",
   "commerciale_persona_id": "P07",
   "fonte": "evento 2025",
   "note": "DEMO"
  }
 ],
 "CONTATTI": [
  {
   "contatto_id": "CT-01",
   "org_id": "ORG-001",
   "nome": "Laura",
   "cognome": "Bassi",
   "ruolo": "Head of Communication",
   "email": "l.bassi@velapharma.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-02",
   "org_id": "ORG-002",
   "nome": "Pietro",
   "cognome": "Sala",
   "ruolo": "Account director",
   "email": "p.sala@altamira.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-03",
   "org_id": "ORG-003",
   "nome": "Irene",
   "cognome": "Costa",
   "ruolo": "Internal events",
   "email": "i.costa@borealis.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-04",
   "org_id": "ORG-004",
   "nome": "Nicola",
   "cognome": "Ferraro",
   "ruolo": "Project lead",
   "email": "n.ferraro@kairos.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-05",
   "org_id": "ORG-005",
   "nome": "Alberto",
   "cognome": "Mirto",
   "ruolo": "Titolare",
   "email": "a.mirto@mirto.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-06",
   "org_id": "ORG-006",
   "nome": "Giorgio",
   "cognome": "Lumen",
   "ruolo": "Noleggi",
   "email": "noleggi@lumen.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-07",
   "org_id": "ORG-010",
   "nome": "Marta",
   "cognome": "Gatti",
   "ruolo": "Venue manager",
   "email": "m.gatti@spazinavigli.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-08",
   "org_id": "ORG-010",
   "nome": "Ivan",
   "cognome": "Rota",
   "ruolo": "Responsabile tecnico venue",
   "email": "tecnico@spazinavigli.example",
   "telefono": "",
   "principale": "no"
  },
  {
   "contatto_id": "CT-09",
   "org_id": "ORG-011",
   "nome": "Silvia",
   "cognome": "Neri",
   "ruolo": "Meeting & events",
   "email": "events@bellavista.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-10",
   "org_id": "ORG-012",
   "nome": "Fabio",
   "cognome": "Leone",
   "ruolo": "Marketing manager",
   "email": "f.leone@nordica.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-11",
   "org_id": "ORG-013",
   "nome": "Rosa",
   "cognome": "Verdi",
   "ruolo": "Commerciale",
   "email": "rosa@cateringverde.example",
   "telefono": "",
   "principale": "sì"
  },
  {
   "contatto_id": "CT-12",
   "org_id": "ORG-014",
   "nome": "Caterina",
   "cognome": "Orsi",
   "ruolo": "Segretaria generale",
   "email": "c.orsi@arteviva.example",
   "telefono": "",
   "principale": "sì"
  }
 ],
 "AGENZIE_CLIENTI": [
  {
   "rel_id": "AC-01",
   "agenzia_org_id": "ORG-002",
   "cliente_org_id": "ORG-001",
   "dal": "2026-05-01",
   "note": "Altamira gestisce gli eventi interni di Vela Pharma"
  },
  {
   "rel_id": "AC-02",
   "agenzia_org_id": "ORG-004",
   "cliente_org_id": "ORG-003",
   "dal": "2025-01-01",
   "note": ""
  }
 ],
 "ACCORDI_PARTNER": [
  {
   "accordo_id": "AP-01",
   "partner_org_id": "ORG-005",
   "tipo_rebate": "percentuale",
   "percentuale": 0.05,
   "base_calcolo": "imponibile",
   "ambito": "generale",
   "valido_dal": "2026-01-01",
   "valido_al": "2026-12-31"
  }
 ],
 "SEGNALAZIONI": [
  {
   "segnalazione_id": "SG-01",
   "partner_org_id": "ORG-005",
   "verso_org_id": "ORG-002",
   "data": "2026-05-12",
   "accordo_id": "AP-01",
   "note": "Mirto ha passato il contatto Chedo ad Altamira"
  }
 ],
 "CONTRATTI_QUADRO": [
  {
   "cq_id": "CQ-01",
   "org_id": "ORG-004",
   "titolo": "Accordo quadro eventi Borealis 2026–27",
   "valido_dal": "2026-01-01",
   "valido_al": "2027-12-31",
   "condizioni": "Listino scontato 8%, pagamento 30/70"
  }
 ],
 "LOCATION": [
  {
   "location_id": "LOC-01",
   "nome": "Spazio Navigli",
   "gestore_org_id": "ORG-010",
   "tipologia": "spazio industriale",
   "stile": "ex fabbrica, mattoni a vista",
   "citta": "Milano",
   "indirizzo": "via dei Navigli 1 (DEMO)",
   "residente": "sì",
   "stato": "attiva",
   "mq": 1200,
   "capienza_platea": 420,
   "capienza_banchetto": 300,
   "capienza_cocktail": 600,
   "potenza_elettrica_kw": 80,
   "wifi": "fibra 1 Gb",
   "accessibilita": "piano terra, ascensore merci",
   "carico_scarico": "portone 4 m da cortile",
   "costo_giorno_evento": 6500,
   "costo_setup": 2500,
   "referente_contatto_id": "CT-07",
   "referente_service_contatto_id": "CT-08",
   "note": "Chedo fornitore fisso; magazzino in loco"
  },
  {
   "location_id": "LOC-02",
   "nome": "Hotel Bellavista Torino",
   "gestore_org_id": "ORG-011",
   "tipologia": "hotel",
   "stile": "business, moderno",
   "citta": "Torino",
   "indirizzo": "corso Demo 10",
   "residente": "no",
   "stato": "attiva",
   "mq": 650,
   "capienza_platea": 250,
   "capienza_banchetto": 180,
   "capienza_cocktail": 300,
   "potenza_elettrica_kw": 40,
   "wifi": "sì",
   "accessibilita": "completa",
   "carico_scarico": "rampa interrata, altezza 2,6 m",
   "costo_giorno_evento": 4200,
   "costo_setup": 0,
   "referente_contatto_id": "CT-09",
   "referente_service_contatto_id": "",
   "note": "deposito nostro in sala B2"
  },
  {
   "location_id": "LOC-03",
   "nome": "Villa Arte Viva",
   "gestore_org_id": "ORG-014",
   "tipologia": "villa storica",
   "stile": "villa ottocentesca con parco",
   "citta": "Como",
   "indirizzo": "via del Lago 3 (DEMO)",
   "residente": "no",
   "stato": "attiva",
   "mq": 900,
   "capienza_platea": 200,
   "capienza_banchetto": 160,
   "capienza_cocktail": 350,
   "potenza_elettrica_kw": 35,
   "wifi": "debole in giardino",
   "accessibilita": "parziale: giardino su ghiaia",
   "carico_scarico": "solo mezzi < 3,5 t",
   "costo_giorno_evento": 5000,
   "costo_setup": 1500,
   "referente_contatto_id": "CT-12",
   "referente_service_contatto_id": "",
   "note": "vincoli belle arti: niente ancoraggi alle pareti"
  }
 ],
 "SALE": [
  {
   "sala_id": "SA-01",
   "location_id": "LOC-01",
   "nome": "Navata",
   "mq": 800,
   "capienza_platea": 420,
   "capienza_banchetto": 300,
   "prezzo_giorno": 5200
  },
  {
   "sala_id": "SA-02",
   "location_id": "LOC-01",
   "nome": "Sala Officina",
   "mq": 200,
   "capienza_platea": 80,
   "capienza_banchetto": 60,
   "prezzo_giorno": 1300
  },
  {
   "sala_id": "SA-03",
   "location_id": "LOC-02",
   "nome": "Sala Superga",
   "mq": 400,
   "capienza_platea": 250,
   "capienza_banchetto": 180,
   "prezzo_giorno": 3200
  },
  {
   "sala_id": "SA-04",
   "location_id": "LOC-02",
   "nome": "Sala B2",
   "mq": 60,
   "capienza_platea": 30,
   "capienza_banchetto": 0,
   "prezzo_giorno": 0
  },
  {
   "sala_id": "SA-05",
   "location_id": "LOC-03",
   "nome": "Salone d'onore",
   "mq": 300,
   "capienza_platea": 200,
   "capienza_banchetto": 160,
   "prezzo_giorno": 3000
  },
  {
   "sala_id": "SA-06",
   "location_id": "LOC-03",
   "nome": "Parco",
   "mq": 2000,
   "capienza_platea": 0,
   "capienza_banchetto": 0,
   "prezzo_giorno": 2000
  }
 ],
 "MAGAZZINI": [
  {
   "magazzino_id": "MAG-C",
   "nome": "Magazzino centrale",
   "tipo": "centrale",
   "location_id": "",
   "indirizzo": "Milano, zona Lambrate (DEMO)",
   "responsabile_persona_id": "P09"
  },
  {
   "magazzino_id": "MAG-L1",
   "nome": "Magazzino Spazio Navigli",
   "tipo": "location",
   "location_id": "LOC-01",
   "indirizzo": "Spazio Navigli, locale tecnico",
   "responsabile_persona_id": "P09"
  },
  {
   "magazzino_id": "MAG-L2",
   "nome": "Deposito Hotel Bellavista",
   "tipo": "location",
   "location_id": "LOC-02",
   "indirizzo": "Sala B2",
   "responsabile_persona_id": "P09"
  },
  {
   "magazzino_id": "MAG-L3",
   "nome": "Deposito Villa Arte Viva",
   "tipo": "location",
   "location_id": "LOC-03",
   "indirizzo": "rimessa del parco",
   "responsabile_persona_id": "P09"
  }
 ],
 "ARTICOLI": [
  {
   "articolo_id": "A01",
   "codice": "AU-MIX-01",
   "categoria": "01 audio",
   "sottocategoria": "mixer",
   "nome": "Mixer digitale 32 canali",
   "marca": "Midas",
   "modello": "M32",
   "tracciato_a_pezzo": "sì",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 21,
   "potenza_w": 160,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 180,
   "costo_acquisto": 3800,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A02",
   "codice": "AU-RAD-01",
   "categoria": "01 audio",
   "sottocategoria": "radiomicrofoni",
   "nome": "Radiomicrofono palmare",
   "marca": "Shure",
   "modello": "QLXD24 SM58",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 1,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 25,
   "costo_acquisto": 900,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A03",
   "codice": "AU-RAD-02",
   "categoria": "01 audio",
   "sottocategoria": "radiomicrofoni",
   "nome": "Radiomicrofono ad archetto",
   "marca": "Shure",
   "modello": "QLXD14 headset",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 1,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 25,
   "costo_acquisto": 950,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A04",
   "codice": "AU-DIF-01",
   "categoria": "01 audio",
   "sottocategoria": "diffusori",
   "nome": "Cassa attiva 12\"",
   "marca": "RCF",
   "modello": "HD 12-A",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 18,
   "potenza_w": 700,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 40,
   "costo_acquisto": 650,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A05",
   "codice": "AU-SUB-01",
   "categoria": "01 audio",
   "sottocategoria": "diffusori",
   "nome": "Subwoofer attivo 18\"",
   "marca": "RCF",
   "modello": "SUB 8004-AS",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 60,
   "potenza_w": 1250,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 60,
   "costo_acquisto": 1500,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A06",
   "codice": "VI-PRJ-01",
   "categoria": "02 video",
   "sottocategoria": "proiettori",
   "nome": "Proiettore laser 10.000 lm",
   "marca": "Epson",
   "modello": "EB-PU2010",
   "tracciato_a_pezzo": "sì",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 25,
   "potenza_w": 900,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 250,
   "costo_acquisto": 9500,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A07",
   "codice": "VI-SCH-01",
   "categoria": "02 video",
   "sottocategoria": "schermi",
   "nome": "Schermo fast-fold 4×3 m",
   "marca": "Da-Lite",
   "modello": "Fast-Fold",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 30,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 90,
   "costo_acquisto": 1800,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A08",
   "codice": "VI-REG-01",
   "categoria": "02 video",
   "sottocategoria": "regia",
   "nome": "Regia video vMix (PC + controller)",
   "marca": "vMix",
   "modello": "Pro",
   "tracciato_a_pezzo": "sì",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 15,
   "potenza_w": 600,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 220,
   "costo_acquisto": 4500,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A09",
   "codice": "VI-CAM-01",
   "categoria": "02 video",
   "sottocategoria": "camere",
   "nome": "Camera PTZ 4K",
   "marca": "Panasonic",
   "modello": "AW-UE80",
   "tracciato_a_pezzo": "sì",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 3,
   "potenza_w": 50,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 120,
   "costo_acquisto": 3600,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A10",
   "codice": "VI-MON-01",
   "categoria": "02 video",
   "sottocategoria": "monitor",
   "nome": "Monitor 55\" su stand",
   "marca": "LG",
   "modello": "55UH5",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 25,
   "potenza_w": 150,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 70,
   "costo_acquisto": 900,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A11",
   "codice": "LU-MOV-01",
   "categoria": "03 luci",
   "sottocategoria": "teste mobili",
   "nome": "Testa mobile wash",
   "marca": "Clay Paky",
   "modello": "Mini-B",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 6,
   "potenza_w": 120,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 45,
   "costo_acquisto": 1400,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A12",
   "codice": "LU-PAR-01",
   "categoria": "03 luci",
   "sottocategoria": "par",
   "nome": "Par LED RGBW",
   "marca": "Showtec",
   "modello": "Spectral",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 3,
   "potenza_w": 60,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 12,
   "costo_acquisto": 220,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A13",
   "codice": "TR-QUA-01",
   "categoria": "04 truss & rigging",
   "sottocategoria": "truss",
   "nome": "Truss quadro 29 cm · 3 m",
   "marca": "Prolyte",
   "modello": "H30V",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 15,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 15,
   "costo_acquisto": 380,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A14",
   "codice": "TR-MOT-01",
   "categoria": "04 truss & rigging",
   "sottocategoria": "motori",
   "nome": "Motore elettrico 500 kg",
   "marca": "Verlinde",
   "modello": "D8+",
   "tracciato_a_pezzo": "sì",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 40,
   "potenza_w": 800,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 60,
   "costo_acquisto": 2400,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A15",
   "codice": "AR-SED-01",
   "categoria": "05 arredi & palco",
   "sottocategoria": "sedute",
   "nome": "Sedia platea impilabile",
   "marca": "",
   "modello": "",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 5,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 2,
   "costo_acquisto": 35,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A16",
   "codice": "AR-TAV-01",
   "categoria": "05 arredi & palco",
   "sottocategoria": "tavoli",
   "nome": "Tavolo tondo Ø180",
   "marca": "",
   "modello": "",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 25,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 12,
   "costo_acquisto": 160,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A17",
   "codice": "AR-PED-01",
   "categoria": "05 arredi & palco",
   "sottocategoria": "palco",
   "nome": "Pedana palco 2×1 m",
   "marca": "Nivtec",
   "modello": "",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 30,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 20,
   "costo_acquisto": 420,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A18",
   "codice": "CA-DMX-01",
   "categoria": "06 cavi & energia",
   "sottocategoria": "segnale",
   "nome": "Cavo DMX 10 m",
   "marca": "",
   "modello": "",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 1,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 2,
   "costo_acquisto": 18,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A19",
   "codice": "CA-PRO-01",
   "categoria": "06 cavi & energia",
   "sottocategoria": "corrente",
   "nome": "Prolunga CEE 16A 10 m",
   "marca": "",
   "modello": "",
   "tracciato_a_pezzo": "no",
   "consumabile": "no",
   "unita_misura": "pz",
   "peso_kg": 3,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": 3,
   "costo_acquisto": 45,
   "fornitore_org_id": "",
   "ordine_standard": null,
   "attivo": "sì"
  },
  {
   "articolo_id": "A20",
   "codice": "CO-GAF-01",
   "categoria": "07 consumabili",
   "sottocategoria": "nastri",
   "nome": "Gaffer nero 50 mm",
   "marca": "",
   "modello": "",
   "tracciato_a_pezzo": "no",
   "consumabile": "sì",
   "unita_misura": "rotolo",
   "peso_kg": 0.3,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": null,
   "costo_acquisto": 9,
   "fornitore_org_id": "",
   "ordine_standard": 20,
   "attivo": "sì"
  },
  {
   "articolo_id": "A21",
   "codice": "CO-BAT-01",
   "categoria": "07 consumabili",
   "sottocategoria": "batterie",
   "nome": "Batterie AA",
   "marca": "",
   "modello": "",
   "tracciato_a_pezzo": "no",
   "consumabile": "sì",
   "unita_misura": "conf. 24",
   "peso_kg": 0.6,
   "potenza_w": null,
   "proprietario": "Chedo",
   "prezzo_noleggio_giorno": null,
   "costo_acquisto": 14,
   "fornitore_org_id": "",
   "ordine_standard": 10,
   "attivo": "sì"
  }
 ],
 "GIACENZE": [
  {
   "articolo_id": "A01",
   "magazzino_id": "MAG-C",
   "quantita": 3,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A01",
   "magazzino_id": "MAG-L1",
   "quantita": 1,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A02",
   "magazzino_id": "MAG-C",
   "quantita": 16,
   "fuori_servizio": 1,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A02",
   "magazzino_id": "MAG-L1",
   "quantita": 4,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A03",
   "magazzino_id": "MAG-C",
   "quantita": 12,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A03",
   "magazzino_id": "MAG-L1",
   "quantita": 4,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A04",
   "magazzino_id": "MAG-C",
   "quantita": 12,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A04",
   "magazzino_id": "MAG-L1",
   "quantita": 8,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A05",
   "magazzino_id": "MAG-C",
   "quantita": 6,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A05",
   "magazzino_id": "MAG-L1",
   "quantita": 2,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A06",
   "magazzino_id": "MAG-C",
   "quantita": 2,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A07",
   "magazzino_id": "MAG-C",
   "quantita": 3,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A07",
   "magazzino_id": "MAG-L2",
   "quantita": 1,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A08",
   "magazzino_id": "MAG-C",
   "quantita": 2,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A09",
   "magazzino_id": "MAG-C",
   "quantita": 4,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A10",
   "magazzino_id": "MAG-C",
   "quantita": 8,
   "fuori_servizio": 1,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A10",
   "magazzino_id": "MAG-L2",
   "quantita": 2,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A11",
   "magazzino_id": "MAG-C",
   "quantita": 16,
   "fuori_servizio": 2,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A12",
   "magazzino_id": "MAG-C",
   "quantita": 40,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A12",
   "magazzino_id": "MAG-L1",
   "quantita": 24,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A12",
   "magazzino_id": "MAG-L3",
   "quantita": 12,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A13",
   "magazzino_id": "MAG-C",
   "quantita": 40,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A14",
   "magazzino_id": "MAG-C",
   "quantita": 6,
   "fuori_servizio": 1,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A15",
   "magazzino_id": "MAG-L1",
   "quantita": 400,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A15",
   "magazzino_id": "MAG-C",
   "quantita": 150,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A16",
   "magazzino_id": "MAG-L1",
   "quantita": 30,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A16",
   "magazzino_id": "MAG-L3",
   "quantita": 20,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A17",
   "magazzino_id": "MAG-C",
   "quantita": 24,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A17",
   "magazzino_id": "MAG-L3",
   "quantita": 12,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A18",
   "magazzino_id": "MAG-C",
   "quantita": 80,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A19",
   "magazzino_id": "MAG-C",
   "quantita": 60,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A19",
   "magazzino_id": "MAG-L1",
   "quantita": 20,
   "fuori_servizio": 0,
   "scorta_minima": null,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A20",
   "magazzino_id": "MAG-C",
   "quantita": 14,
   "fuori_servizio": 0,
   "scorta_minima": 20,
   "ultimo_inventario": "2026-10-01"
  },
  {
   "articolo_id": "A21",
   "magazzino_id": "MAG-C",
   "quantita": 6,
   "fuori_servizio": 0,
   "scorta_minima": 10,
   "ultimo_inventario": "2026-10-01"
  }
 ],
 "PEZZI": [
  {
   "pezzo_id": "PZ-001",
   "articolo_id": "A01",
   "numero_serie": "M32-1001",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-002",
   "articolo_id": "A01",
   "numero_serie": "M32-1002",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-003",
   "articolo_id": "A01",
   "numero_serie": "M32-1003",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-004",
   "articolo_id": "A01",
   "numero_serie": "M32-1004",
   "magazzino_id": "MAG-L1",
   "stato": "ok",
   "note": "fisso in venue"
  },
  {
   "pezzo_id": "PZ-005",
   "articolo_id": "A06",
   "numero_serie": "EPU-2201",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-006",
   "articolo_id": "A06",
   "numero_serie": "EPU-2202",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-007",
   "articolo_id": "A08",
   "numero_serie": "VMX-01",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-008",
   "articolo_id": "A08",
   "numero_serie": "VMX-02",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-009",
   "articolo_id": "A09",
   "numero_serie": "PTZ-01",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-010",
   "articolo_id": "A09",
   "numero_serie": "PTZ-02",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-011",
   "articolo_id": "A09",
   "numero_serie": "PTZ-03",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-012",
   "articolo_id": "A09",
   "numero_serie": "PTZ-04",
   "magazzino_id": "MAG-C",
   "stato": "in riparazione",
   "note": "ottica da sostituire"
  },
  {
   "pezzo_id": "PZ-013",
   "articolo_id": "A14",
   "numero_serie": "D8-501",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-014",
   "articolo_id": "A14",
   "numero_serie": "D8-502",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-015",
   "articolo_id": "A14",
   "numero_serie": "D8-503",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-016",
   "articolo_id": "A14",
   "numero_serie": "D8-504",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-017",
   "articolo_id": "A14",
   "numero_serie": "D8-505",
   "magazzino_id": "MAG-C",
   "stato": "ok",
   "note": ""
  },
  {
   "pezzo_id": "PZ-018",
   "articolo_id": "A14",
   "numero_serie": "D8-506",
   "magazzino_id": "MAG-C",
   "stato": "in riparazione",
   "note": "revisione annuale"
  }
 ],
 "COSTING": [
  {
   "riga_id": "CO-001",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "SERVICE",
   "descrizione": "Impianto audio sala plenaria (diffusione + mixer)",
   "quantita": 1,
   "n_servizi": 2,
   "computato": "sì",
   "fornitore_org_id": "",
   "costo_unitario": 900,
   "commissione": 0,
   "ricarico": 0.78,
   "prezzo_unitario": 1600,
   "totale_costo": 1800,
   "totale_ricavo": 3200,
   "iva": 0.22
  },
  {
   "riga_id": "CO-002",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "SERVICE",
   "descrizione": "Radiomicrofoni (palmari e archetto)",
   "quantita": 8,
   "n_servizi": 2,
   "computato": "sì",
   "fornitore_org_id": "",
   "costo_unitario": 25,
   "commissione": 0,
   "ricarico": 1.4,
   "prezzo_unitario": 60,
   "totale_costo": 400,
   "totale_ricavo": 960,
   "iva": 0.22
  },
  {
   "riga_id": "CO-003",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "VIDEO",
   "descrizione": "Ledwall P2.9 6×3 m (18 mq)",
   "quantita": 18,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "ORG-006",
   "costo_unitario": 120,
   "commissione": 0,
   "ricarico": 0.67,
   "prezzo_unitario": 200,
   "totale_costo": 2160,
   "totale_ricavo": 3600,
   "iva": 0.22
  },
  {
   "riga_id": "CO-004",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "VIDEO",
   "descrizione": "Regia video vMix + 2 camere PTZ",
   "quantita": 1,
   "n_servizi": 2,
   "computato": "sì",
   "fornitore_org_id": "",
   "costo_unitario": 1100,
   "commissione": 0,
   "ricarico": 0.82,
   "prezzo_unitario": 2000,
   "totale_costo": 2200,
   "totale_ricavo": 4000,
   "iva": 0.22
  },
  {
   "riga_id": "CO-005",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "LUCI",
   "descrizione": "Luci palco e ambiente",
   "quantita": 1,
   "n_servizi": 2,
   "computato": "sì",
   "fornitore_org_id": "ORG-006",
   "costo_unitario": 1400,
   "commissione": 0,
   "ricarico": 0.64,
   "prezzo_unitario": 2300,
   "totale_costo": 2800,
   "totale_ricavo": 4600,
   "iva": 0.22
  },
  {
   "riga_id": "CO-006",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "ALLESTIMENTI",
   "descrizione": "Palco 8×4 m con americana frontale",
   "quantita": 1,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "",
   "costo_unitario": 1800,
   "commissione": 0,
   "ricarico": 0.78,
   "prezzo_unitario": 3200,
   "totale_costo": 1800,
   "totale_ricavo": 3200,
   "iva": 0.22
  },
  {
   "riga_id": "CO-007",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "PERSONALE",
   "descrizione": "Tecnici audio/video/luci (montaggio + 2 giorni)",
   "quantita": 5,
   "n_servizi": 3,
   "computato": "sì",
   "fornitore_org_id": "ORG-008",
   "costo_unitario": 280,
   "commissione": 0,
   "ricarico": 0.36,
   "prezzo_unitario": 380,
   "totale_costo": 4200,
   "totale_ricavo": 5700,
   "iva": 0.22
  },
  {
   "riga_id": "CO-008",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "PERSONALE",
   "descrizione": "Hostess accoglienza e accrediti",
   "quantita": 6,
   "n_servizi": 2,
   "computato": "sì",
   "fornitore_org_id": "",
   "costo_unitario": 180,
   "commissione": 0,
   "ricarico": 0.44,
   "prezzo_unitario": 260,
   "totale_costo": 2160,
   "totale_ricavo": 3120,
   "iva": 0.22
  },
  {
   "riga_id": "CO-009",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "GRAFICHE",
   "descrizione": "Fondale palco stampato 8×4 m",
   "quantita": 1,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "ORG-007",
   "costo_unitario": 950,
   "commissione": 0,
   "ricarico": 0.58,
   "prezzo_unitario": 1500,
   "totale_costo": 950,
   "totale_ricavo": 1500,
   "iva": 0.22
  },
  {
   "riga_id": "CO-010",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "GRAFICHE",
   "descrizione": "Totem segnaletica",
   "quantita": 6,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "ORG-007",
   "costo_unitario": 85,
   "commissione": 0,
   "ricarico": 0.76,
   "prezzo_unitario": 150,
   "totale_costo": 510,
   "totale_ricavo": 900,
   "iva": 0.22
  },
  {
   "riga_id": "CO-011",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "TRASPORTI",
   "descrizione": "Furgone + autista (andata e ritorno)",
   "quantita": 2,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "ORG-009",
   "costo_unitario": 380,
   "commissione": 0,
   "ricarico": 0.45,
   "prezzo_unitario": 550,
   "totale_costo": 760,
   "totale_ricavo": 1100,
   "iva": 0.22
  },
  {
   "riga_id": "CO-012",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "LOCATION",
   "descrizione": "Affitto Spazio Navigli · Navata",
   "quantita": 2,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "ORG-010",
   "costo_unitario": 6500,
   "commissione": 0,
   "ricarico": 0.1,
   "prezzo_unitario": 7150,
   "totale_costo": 13000,
   "totale_ricavo": 14300,
   "iva": 0.22
  },
  {
   "riga_id": "CO-013",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "CATERING",
   "descrizione": "Coffee break + light lunch",
   "quantita": 350,
   "n_servizi": 2,
   "computato": "sì",
   "fornitore_org_id": "ORG-013",
   "costo_unitario": 18,
   "commissione": 0,
   "ricarico": 0.33,
   "prezzo_unitario": 24,
   "totale_costo": 12600,
   "totale_ricavo": 16800,
   "iva": 0.22
  },
  {
   "riga_id": "CO-014",
   "commessa_id": "CM-0001",
   "versione": 2,
   "sezione": "OPZIONI",
   "descrizione": "Diretta streaming su piattaforma cliente",
   "quantita": 1,
   "n_servizi": 1,
   "computato": "no",
   "fornitore_org_id": "",
   "costo_unitario": 1500,
   "commissione": 0,
   "ricarico": 0.73,
   "prezzo_unitario": 2600,
   "totale_costo": 1500,
   "totale_ricavo": 2600,
   "iva": 0.22
  },
  {
   "riga_id": "CO-015",
   "commessa_id": "CM-0002",
   "versione": 2,
   "sezione": "SERVICE",
   "descrizione": "Audio sala Superga",
   "quantita": 1,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "",
   "costo_unitario": 700,
   "commissione": 0,
   "ricarico": 0.86,
   "prezzo_unitario": 1300,
   "totale_costo": 700,
   "totale_ricavo": 1300,
   "iva": 0.22
  },
  {
   "riga_id": "CO-016",
   "commessa_id": "CM-0002",
   "versione": 2,
   "sezione": "VIDEO",
   "descrizione": "Proiezione doppia + schermi 4×3",
   "quantita": 1,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "",
   "costo_unitario": 900,
   "commissione": 0,
   "ricarico": 0.89,
   "prezzo_unitario": 1700,
   "totale_costo": 900,
   "totale_ricavo": 1700,
   "iva": 0.22
  },
  {
   "riga_id": "CO-017",
   "commessa_id": "CM-0002",
   "versione": 2,
   "sezione": "PERSONALE",
   "descrizione": "Tecnici (3) montaggio + evento",
   "quantita": 3,
   "n_servizi": 2,
   "computato": "sì",
   "fornitore_org_id": "ORG-008",
   "costo_unitario": 280,
   "commissione": 0,
   "ricarico": 0.36,
   "prezzo_unitario": 380,
   "totale_costo": 1680,
   "totale_ricavo": 2280,
   "iva": 0.22
  },
  {
   "riga_id": "CO-018",
   "commessa_id": "CM-0002",
   "versione": 2,
   "sezione": "LOCATION",
   "descrizione": "Sala Superga · giornata",
   "quantita": 1,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "ORG-011",
   "costo_unitario": 4200,
   "commissione": 0,
   "ricarico": 0.1,
   "prezzo_unitario": 4620,
   "totale_costo": 4200,
   "totale_ricavo": 4620,
   "iva": 0.22
  },
  {
   "riga_id": "CO-019",
   "commessa_id": "CM-0002",
   "versione": 2,
   "sezione": "CATERING",
   "descrizione": "Welcome coffee + pranzo a buffet",
   "quantita": 180,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "ORG-011",
   "costo_unitario": 38,
   "commissione": 0,
   "ricarico": 0.26,
   "prezzo_unitario": 48,
   "totale_costo": 6840,
   "totale_ricavo": 8640,
   "iva": 0.22
  },
  {
   "riga_id": "CO-020",
   "commessa_id": "CM-0002",
   "versione": 2,
   "sezione": "CREATIVITÀ",
   "descrizione": "Concept grafico e kit visual",
   "quantita": 1,
   "n_servizi": 1,
   "computato": "sì",
   "fornitore_org_id": "",
   "costo_unitario": 1500,
   "commissione": 0,
   "ricarico": 1.13,
   "prezzo_unitario": 3200,
   "totale_costo": 1500,
   "totale_ricavo": 3200,
   "iva": 0.22
  }
 ],
 "COMMESSE": [
  {
   "commessa_id": "CM-0001",
   "codice_prospect": "P26-012",
   "codice_definitivo": "D26-007",
   "stato": "in preparazione",
   "motivo_perso": "",
   "titolo_evento": "Convention annuale Vela Pharma",
   "cliente_org_id": "ORG-001",
   "committente_org_id": "ORG-002",
   "agenzia_org_id": "ORG-002",
   "segnalazione_id": "SG-01",
   "azienda_capofila": "Nakama",
   "linee": "MCE, SERVICE",
   "data_inizio": "2026-11-12",
   "data_fine": "2026-11-13",
   "location_id": "LOC-01",
   "pax": 350,
   "pm_persona_id": "P04",
   "backup_persona_id": "P05",
   "modulo_produzione": "sì",
   "modulo_logistica": "sì",
   "modulo_creativita": "no",
   "contratto_quadro_id": "",
   "codice_gestionale_nakama": "26MCE11004",
   "condizioni_pagamento": "50% conferma · 50% a 30 gg fine evento",
   "ricavi_preventivo": 61480,
   "costi_preventivo": 45340,
   "margine_preventivo": 0.2625,
   "ricavi_consuntivo": null,
   "costi_consuntivo": null,
   "margine_consuntivo": null,
   "data_richiesta": "2026-09-10",
   "data_conferma": "2026-09-30 17:20",
   "confermata_da": "P04",
   "data_chiusura": "",
   "note": "Ledwall in prova: confermare passo pixel con Altamira"
  },
  {
   "commessa_id": "CM-0002",
   "codice_prospect": "P26-013",
   "codice_definitivo": "D26-008",
   "stato": "confermata",
   "motivo_perso": "",
   "titolo_evento": "Borealis · Kick-off 2027",
   "cliente_org_id": "ORG-003",
   "committente_org_id": "ORG-004",
   "agenzia_org_id": "ORG-004",
   "segnalazione_id": "",
   "azienda_capofila": "Nakama",
   "linee": "MCE",
   "data_inizio": "2027-01-20",
   "data_fine": "2027-01-20",
   "location_id": "LOC-02",
   "pax": 180,
   "pm_persona_id": "P05",
   "backup_persona_id": "P06",
   "modulo_produzione": "sì",
   "modulo_logistica": "sì",
   "modulo_creativita": "sì",
   "contratto_quadro_id": "CQ-01",
   "codice_gestionale_nakama": "",
   "condizioni_pagamento": "30% conferma · 70% a 30 gg",
   "ricavi_preventivo": 21740,
   "costi_preventivo": 15820,
   "margine_preventivo": 0.2723,
   "ricavi_consuntivo": null,
   "costi_consuntivo": null,
   "margine_consuntivo": null,
   "data_richiesta": "2026-09-22",
   "data_conferma": "2026-10-09 11:00",
   "confermata_da": "P05",
   "data_chiusura": "",
   "note": ""
  },
  {
   "commessa_id": "CM-0003",
   "codice_prospect": "P26-014",
   "codice_definitivo": "D26-009",
   "stato": "in preparazione",
   "motivo_perso": "",
   "titolo_evento": "Gala di beneficenza Arte Viva",
   "cliente_org_id": "ORG-014",
   "committente_org_id": "ORG-014",
   "agenzia_org_id": "",
   "segnalazione_id": "",
   "azienda_capofila": "Nakama",
   "linee": "MCE, ALLESTIMENTI",
   "data_inizio": "2026-11-28",
   "data_fine": "2026-11-28",
   "location_id": "LOC-03",
   "pax": 160,
   "pm_persona_id": "P06",
   "backup_persona_id": "P04",
   "modulo_produzione": "sì",
   "modulo_logistica": "sì",
   "modulo_creativita": "sì",
   "contratto_quadro_id": "",
   "codice_gestionale_nakama": "26MCE11006",
   "condizioni_pagamento": "50% conferma · 50% a 30 gg fine evento",
   "ricavi_preventivo": 64800,
   "costi_preventivo": 47300,
   "margine_preventivo": 0.2701,
   "ricavi_consuntivo": null,
   "costi_consuntivo": null,
   "margine_consuntivo": null,
   "data_richiesta": "2026-09-25",
   "data_conferma": "2026-10-07 09:40",
   "confermata_da": "P06",
   "data_chiusura": "",
   "note": ""
  },
  {
   "commessa_id": "CM-0004",
   "codice_prospect": "P26-009",
   "codice_definitivo": "D26-006",
   "stato": "consuntivo",
   "motivo_perso": "",
   "titolo_evento": "Lancio prodotto Nordica N7",
   "cliente_org_id": "ORG-012",
   "committente_org_id": "ORG-012",
   "agenzia_org_id": "",
   "segnalazione_id": "",
   "azienda_capofila": "Chedo",
   "linee": "SERVICE, ALLESTIMENTI",
   "data_inizio": "2026-10-08",
   "data_fine": "2026-10-08",
   "location_id": "LOC-01",
   "pax": 220,
   "pm_persona_id": "P04",
   "backup_persona_id": "P05",
   "modulo_produzione": "sì",
   "modulo_logistica": "no",
   "modulo_creativita": "no",
   "contratto_quadro_id": "",
   "codice_gestionale_nakama": "",
   "condizioni_pagamento": "100% a 60 gg data fattura",
   "ricavi_preventivo": 38500,
   "costi_preventivo": 26900,
   "margine_preventivo": 0.3013,
   "ricavi_consuntivo": 39200,
   "costi_consuntivo": 28650,
   "margine_consuntivo": 0.2691,
   "data_richiesta": "2026-08-28",
   "data_conferma": "2026-09-12 15:00",
   "confermata_da": "P04",
   "data_chiusura": "",
   "note": ""
  },
  {
   "commessa_id": "CM-0005",
   "codice_prospect": "P26-018",
   "codice_definitivo": "",
   "stato": "prospect",
   "motivo_perso": "",
   "titolo_evento": "Nordica · Dealer meeting 2027",
   "cliente_org_id": "ORG-012",
   "committente_org_id": "ORG-012",
   "agenzia_org_id": "",
   "segnalazione_id": "",
   "azienda_capofila": "Chedo",
   "linee": "SERVICE",
   "data_inizio": "2027-03-05",
   "data_fine": "2027-03-06",
   "location_id": "",
   "pax": 400,
   "pm_persona_id": "P04",
   "backup_persona_id": "",
   "modulo_produzione": "no",
   "modulo_logistica": "no",
   "modulo_creativita": "no",
   "contratto_quadro_id": "",
   "codice_gestionale_nakama": "",
   "condizioni_pagamento": "",
   "ricavi_preventivo": 72000,
   "costi_preventivo": null,
   "margine_preventivo": null,
   "ricavi_consuntivo": null,
   "costi_consuntivo": null,
   "margine_consuntivo": null,
   "data_richiesta": "2026-10-14",
   "data_conferma": "",
   "confermata_da": "",
   "data_chiusura": "",
   "note": ""
  },
  {
   "commessa_id": "CM-0006",
   "codice_prospect": "P26-015",
   "codice_definitivo": "",
   "stato": "persa",
   "motivo_perso": "prezzo",
   "titolo_evento": "Vela Pharma · Summer party",
   "cliente_org_id": "ORG-001",
   "committente_org_id": "ORG-002",
   "agenzia_org_id": "ORG-002",
   "segnalazione_id": "SG-01",
   "azienda_capofila": "Nakama",
   "linee": "MCE",
   "data_inizio": "2026-07-02",
   "data_fine": "2026-07-02",
   "location_id": "",
   "pax": 500,
   "pm_persona_id": "P05",
   "backup_persona_id": "",
   "modulo_produzione": "no",
   "modulo_logistica": "no",
   "modulo_creativita": "no",
   "contratto_quadro_id": "",
   "codice_gestionale_nakama": "",
   "condizioni_pagamento": "",
   "ricavi_preventivo": 55000,
   "costi_preventivo": null,
   "margine_preventivo": null,
   "ricavi_consuntivo": null,
   "costi_consuntivo": null,
   "margine_consuntivo": null,
   "data_richiesta": "2026-04-20",
   "data_conferma": "",
   "confermata_da": "",
   "data_chiusura": "2026-05-15",
   "note": ""
  },
  {
   "commessa_id": "CM-0007",
   "codice_prospect": "P26-016",
   "codice_definitivo": "D26-010",
   "stato": "in preparazione",
   "motivo_perso": "",
   "titolo_evento": "Borealis · Town hall Q4",
   "cliente_org_id": "ORG-003",
   "committente_org_id": "ORG-004",
   "agenzia_org_id": "ORG-004",
   "segnalazione_id": "",
   "azienda_capofila": "Nakama",
   "linee": "MCE, SERVICE",
   "data_inizio": "2026-11-12",
   "data_fine": "2026-11-12",
   "location_id": "LOC-02",
   "pax": 220,
   "pm_persona_id": "P05",
   "backup_persona_id": "P04",
   "modulo_produzione": "sì",
   "modulo_logistica": "no",
   "modulo_creativita": "no",
   "contratto_quadro_id": "CQ-01",
   "codice_gestionale_nakama": "26MCE11005",
   "condizioni_pagamento": "30% conferma · 70% a 30 gg",
   "ricavi_preventivo": 28400,
   "costi_preventivo": 19800,
   "margine_preventivo": 0.3028,
   "ricavi_consuntivo": null,
   "costi_consuntivo": null,
   "margine_consuntivo": null,
   "data_richiesta": "2026-09-28",
   "data_conferma": "2026-10-12 10:15",
   "confermata_da": "P05",
   "data_chiusura": "",
   "note": ""
  }
 ],
 "BRIEF": [
  {
   "commessa_id": "CM-0001",
   "obiettivo": "Convention annuale della forza vendita: risultati 2026 e lancio piano 2027",
   "target_partecipanti": "350 informatori e manager, Italia",
   "programma": "12/11: plenaria 9–17 con coffee break e lunch · 13/11: workshop mattina, plenaria finale 14–16",
   "servizi_richiesti": "Service audio/video/luci, ledwall, regia, palco, grafiche, hostess, catering, location",
   "budget_indicativo": 70000,
   "scadenze": "Contenuti video entro 05/11 · lista partecipanti entro 06/11",
   "vincoli": "Niente ancoraggi al soffitto in zona bar; scarico entro le 8:00",
   "da_chiarire": "Passo pixel ledwall (P2.9 o P3.9) · diretta streaming sì/no",
   "generato_da_ai": "sì",
   "validato_da": "P04"
  },
  {
   "commessa_id": "CM-0002",
   "obiettivo": "Kick-off commerciale 2027 con premiazioni",
   "target_partecipanti": "180 dipendenti rete Nord-Ovest",
   "programma": "Giornata unica 9:30–17:30, premiazione finale",
   "servizi_richiesti": "Sala, audio/video, catering, concept grafico",
   "budget_indicativo": 30000,
   "scadenze": "Conferma sala entro 30/10",
   "vincoli": "Budget chiuso dal contratto quadro",
   "da_chiarire": "Numero premiati sul palco",
   "generato_da_ai": "sì",
   "validato_da": "P05"
  },
  {
   "commessa_id": "CM-0005",
   "obiettivo": "Incontro annuale con i concessionari",
   "target_partecipanti": "400 dealer",
   "programma": "Due giorni, plenaria + test drive",
   "servizi_richiesti": "Service completo, location da proporre",
   "budget_indicativo": 72000,
   "scadenze": "Proposta entro 15/11",
   "vincoli": "",
   "da_chiarire": "Location: serve spazio esterno per le auto",
   "generato_da_ai": "sì",
   "validato_da": ""
  }
 ],
 "TEAM": [
  {
   "commessa_id": "CM-0001",
   "persona_id": "P04",
   "ruolo_progetto": "PM",
   "dal": "2026-11-12",
   "al": "2026-11-13"
  },
  {
   "commessa_id": "CM-0001",
   "persona_id": "P05",
   "ruolo_progetto": "backup PM",
   "dal": "2026-11-12",
   "al": "2026-11-13"
  },
  {
   "commessa_id": "CM-0001",
   "persona_id": "P09",
   "ruolo_progetto": "magazzino",
   "dal": "2026-11-12",
   "al": "2026-11-13"
  },
  {
   "commessa_id": "CM-0001",
   "persona_id": "P10",
   "ruolo_progetto": "fonico",
   "dal": "2026-11-12",
   "al": "2026-11-13"
  },
  {
   "commessa_id": "CM-0001",
   "persona_id": "P11",
   "ruolo_progetto": "regia video",
   "dal": "2026-11-12",
   "al": "2026-11-13"
  },
  {
   "commessa_id": "CM-0001",
   "persona_id": "P13",
   "ruolo_progetto": "rigger",
   "dal": "2026-11-12",
   "al": "2026-11-13"
  },
  {
   "commessa_id": "CM-0001",
   "persona_id": "P14",
   "ruolo_progetto": "hostess",
   "dal": "2026-11-12",
   "al": "2026-11-13"
  },
  {
   "commessa_id": "CM-0001",
   "persona_id": "P12",
   "ruolo_progetto": "segreteria",
   "dal": "2026-11-12",
   "al": "2026-11-13"
  },
  {
   "commessa_id": "CM-0002",
   "persona_id": "P05",
   "ruolo_progetto": "PM",
   "dal": "2027-01-20",
   "al": "2027-01-20"
  },
  {
   "commessa_id": "CM-0002",
   "persona_id": "P06",
   "ruolo_progetto": "backup PM",
   "dal": "2027-01-20",
   "al": "2027-01-20"
  },
  {
   "commessa_id": "CM-0002",
   "persona_id": "P07",
   "ruolo_progetto": "commerciale",
   "dal": "2027-01-20",
   "al": "2027-01-20"
  },
  {
   "commessa_id": "CM-0003",
   "persona_id": "P06",
   "ruolo_progetto": "PM",
   "dal": "2026-11-28",
   "al": "2026-11-28"
  },
  {
   "commessa_id": "CM-0003",
   "persona_id": "P04",
   "ruolo_progetto": "backup PM",
   "dal": "2026-11-28",
   "al": "2026-11-28"
  },
  {
   "commessa_id": "CM-0003",
   "persona_id": "P13",
   "ruolo_progetto": "rigger",
   "dal": "2026-11-28",
   "al": "2026-11-28"
  },
  {
   "commessa_id": "CM-0003",
   "persona_id": "P09",
   "ruolo_progetto": "magazzino",
   "dal": "2026-11-28",
   "al": "2026-11-28"
  },
  {
   "commessa_id": "CM-0004",
   "persona_id": "P04",
   "ruolo_progetto": "PM",
   "dal": "2026-10-08",
   "al": "2026-10-08"
  },
  {
   "commessa_id": "CM-0004",
   "persona_id": "P10",
   "ruolo_progetto": "fonico",
   "dal": "2026-10-08",
   "al": "2026-10-08"
  },
  {
   "commessa_id": "CM-0004",
   "persona_id": "P09",
   "ruolo_progetto": "magazzino",
   "dal": "2026-10-08",
   "al": "2026-10-08"
  },
  {
   "commessa_id": "CM-0007",
   "persona_id": "P05",
   "ruolo_progetto": "PM",
   "dal": "2026-11-12",
   "al": "2026-11-12"
  },
  {
   "commessa_id": "CM-0007",
   "persona_id": "P04",
   "ruolo_progetto": "backup PM",
   "dal": "2026-11-12",
   "al": "2026-11-12"
  },
  {
   "commessa_id": "CM-0007",
   "persona_id": "P10",
   "ruolo_progetto": "fonico",
   "dal": "2026-11-12",
   "al": "2026-11-12"
  },
  {
   "commessa_id": "CM-0007",
   "persona_id": "P12",
   "ruolo_progetto": "segreteria",
   "dal": "2026-11-12",
   "al": "2026-11-12"
  }
 ],
 "IMPEGNI": [
  {
   "impegno_id": "IM-01",
   "commessa_id": "CM-0001",
   "persona_id": "P04",
   "attivita": "Sopralluogo con Altamira e venue",
   "inizio": "2026-10-22 10:00",
   "fine": "2026-10-22 12:00",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-02",
   "commessa_id": "CM-0001",
   "persona_id": "P09",
   "attivita": "Preparazione materiale e carico",
   "inizio": "2026-11-10 09:00",
   "fine": "2026-11-10 18:00",
   "luogo": "Magazzino centrale",
   "notifica_gmail": "sì",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-03",
   "commessa_id": "CM-0001",
   "persona_id": "P13",
   "attivita": "Montaggio americana e motori",
   "inizio": "2026-11-11 08:00",
   "fine": "2026-11-11 18:00",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-04",
   "commessa_id": "CM-0001",
   "persona_id": "P10",
   "attivita": "Montaggio audio e line check",
   "inizio": "2026-11-11 13:00",
   "fine": "2026-11-11 20:00",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-05",
   "commessa_id": "CM-0001",
   "persona_id": "P11",
   "attivita": "Montaggio ledwall e regia",
   "inizio": "2026-11-11 10:00",
   "fine": "2026-11-11 20:00",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-06",
   "commessa_id": "CM-0001",
   "persona_id": "P10",
   "attivita": "Fonico plenaria giorno 1",
   "inizio": "2026-11-12 07:30",
   "fine": "2026-11-12 18:30",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "conflitto",
   "note": "Andrea è anche fonico per D26-010 lo stesso giorno"
  },
  {
   "impegno_id": "IM-07",
   "commessa_id": "CM-0001",
   "persona_id": "P11",
   "attivita": "Regia video giorno 1",
   "inizio": "2026-11-12 07:30",
   "fine": "2026-11-12 18:30",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-08",
   "commessa_id": "CM-0001",
   "persona_id": "P14",
   "attivita": "Accoglienza e accrediti",
   "inizio": "2026-11-12 07:30",
   "fine": "2026-11-12 17:30",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "no",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-09",
   "commessa_id": "CM-0001",
   "persona_id": "P12",
   "attivita": "Desk segreteria",
   "inizio": "2026-11-12 07:30",
   "fine": "2026-11-12 17:30",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-10",
   "commessa_id": "CM-0001",
   "persona_id": "P11",
   "attivita": "Regia video giorno 2",
   "inizio": "2026-11-13 08:00",
   "fine": "2026-11-13 17:00",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "conflitto",
   "note": "Matteo non disponibile dalle 14:00"
  },
  {
   "impegno_id": "IM-11",
   "commessa_id": "CM-0001",
   "persona_id": "P14",
   "attivita": "Accoglienza giorno 2",
   "inizio": "2026-11-13 08:00",
   "fine": "2026-11-13 16:30",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "no",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-12",
   "commessa_id": "CM-0001",
   "persona_id": "P13",
   "attivita": "Smontaggio",
   "inizio": "2026-11-13 16:30",
   "fine": "2026-11-13 23:00",
   "luogo": "Spazio Navigli",
   "notifica_gmail": "sì",
   "stato": "confermato",
   "note": ""
  },
  {
   "impegno_id": "IM-13",
   "commessa_id": "CM-0001",
   "persona_id": "P09",
   "attivita": "Rientro e controllo materiale",
   "inizio": "2026-11-14 09:00",
   "fine": "2026-11-14 13:00",
   "luogo": "Magazzino centrale",
   "notifica_gmail": "sì",
   "stato": "proposto",
   "note": ""
  },
  {
   "impegno_id": "IM-14",
   "commessa_id": "CM-0007",
   "persona_id": "P10",
   "attivita": "Fonico town hall",
   "inizio": "2026-11-12 08:00",
   "fine": "2026-11-12 14:00",
   "luogo": "Hotel Bellavista Torino",
   "notifica_gmail": "sì",
   "stato": "conflitto",
   "note": "sovrapposto a D26-007"
  },
  {
   "impegno_id": "IM-15",
   "commessa_id": "CM-0007",
   "persona_id": "P12",
   "attivita": "Accrediti town hall",
   "inizio": "2026-11-12 08:00",
   "fine": "2026-11-12 13:00",
   "luogo": "Hotel Bellavista Torino",
   "notifica_gmail": "sì",
   "stato": "proposto",
   "note": ""
  },
  {
   "impegno_id": "IM-16",
   "commessa_id": "CM-0003",
   "persona_id": "P13",
   "attivita": "Montaggio strutture parco",
   "inizio": "2026-11-27 08:00",
   "fine": "2026-11-27 18:00",
   "luogo": "Villa Arte Viva",
   "notifica_gmail": "sì",
   "stato": "proposto",
   "note": ""
  }
 ],
 "STORICO_STATI": [
  {
   "commessa_id": "CM-0001",
   "stato_da": "",
   "stato_a": "prospect",
   "quando": "2026-09-10 11:02",
   "persona_id": "P07",
   "nota": "P26-012 creato dal form di ingresso"
  },
  {
   "commessa_id": "CM-0001",
   "stato_da": "prospect",
   "stato_a": "confermata",
   "quando": "2026-09-30 17:20",
   "persona_id": "P04",
   "nota": "Preventivo v2 firmato · codice D26-007"
  },
  {
   "commessa_id": "CM-0001",
   "stato_da": "confermata",
   "stato_a": "in preparazione",
   "quando": "2026-10-06 09:00",
   "persona_id": "P04",
   "nota": ""
  },
  {
   "commessa_id": "CM-0006",
   "stato_da": "prospect",
   "stato_a": "persa",
   "quando": "2026-05-15 10:00",
   "persona_id": "P05",
   "nota": "Prezzo: il cliente ha scelto un'offerta più bassa del 18%"
  },
  {
   "commessa_id": "CM-0004",
   "stato_da": "in corso",
   "stato_a": "consuntivo",
   "quando": "2026-10-09 18:00",
   "persona_id": "P04",
   "nota": ""
  }
 ],
 "FILE": [
  {
   "file_id": "F-001",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "01_BRIEF E COMMERCIALE",
   "nome": "D26-007_BRIEF_v1",
   "tipo_documento": "brief",
   "versione": 1,
   "mime_type": "application/vnd.google-apps.document",
   "modificato_il": "2026-10-12 11:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-002",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "01_BRIEF E COMMERCIALE",
   "nome": "D26-007_PREVENTIVO_v2.pdf",
   "tipo_documento": "preventivo",
   "versione": 2,
   "mime_type": "application/pdf",
   "modificato_il": "2026-10-13 12:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-003",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "02_ECONOMICO",
   "nome": "D26-007_COSTING_v2",
   "tipo_documento": "costing",
   "versione": 2,
   "mime_type": "application/vnd.google-apps.spreadsheet",
   "modificato_il": "2026-10-14 13:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-004",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "03_FORNITORI/Officine Lumen",
   "nome": "D26-007_OFFERTA_Officine-Lumen_ledwall.pdf",
   "tipo_documento": "offerta fornitore",
   "versione": 1,
   "mime_type": "application/pdf",
   "modificato_il": "2026-10-15 14:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-005",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "04_PRODUZIONE",
   "nome": "D26-007_PLANIMETRIA_v3.pdf",
   "tipo_documento": "planimetria",
   "versione": 3,
   "mime_type": "application/pdf",
   "modificato_il": "2026-10-16 15:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-006",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "04_PRODUZIONE",
   "nome": "D26-007_SCALETTA_v2",
   "tipo_documento": "scaletta",
   "versione": 2,
   "mime_type": "application/vnd.google-apps.document",
   "modificato_il": "2026-10-17 16:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-007",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "05_LOGISTICA",
   "nome": "D26-007_ACCREDITI",
   "tipo_documento": "accrediti",
   "versione": 1,
   "mime_type": "application/vnd.google-apps.spreadsheet",
   "modificato_il": "2026-10-18 17:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-008",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "07_CLIENTE",
   "nome": "D26-007_CONTRATTO_firmato.pdf",
   "tipo_documento": "contratto",
   "versione": 1,
   "mime_type": "application/pdf",
   "modificato_il": "2026-10-11 10:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-009",
   "commessa_id": "CM-0001",
   "location_id": "",
   "cartella": "04_PRODUZIONE",
   "nome": "D26-007_DUVRI_bozza.pdf",
   "tipo_documento": "DUVRI",
   "versione": 1,
   "mime_type": "application/pdf",
   "modificato_il": "2026-10-12 11:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-010",
   "commessa_id": "",
   "location_id": "LOC-01",
   "cartella": "LOCATION/Spazio Navigli",
   "nome": "Spazio Navigli_PIANO EMERGENZA_2026.pdf",
   "tipo_documento": "piano di emergenza",
   "versione": 1,
   "mime_type": "application/pdf",
   "modificato_il": "2026-10-11 10:00",
   "stato_indice": "letto"
  },
  {
   "file_id": "F-011",
   "commessa_id": "CM-0002",
   "location_id": "",
   "cartella": "01_BRIEF E COMMERCIALE",
   "nome": "D26-008_BRIEF_v1",
   "tipo_documento": "brief",
   "versione": 1,
   "mime_type": "application/vnd.google-apps.document",
   "modificato_il": "2026-10-12 11:00",
   "stato_indice": "letto"
  }
 ],
 "RIASSUNTI": [
  {
   "riassunto_id": "RS-01",
   "oggetto_tipo": "commessa",
   "oggetto_id": "CM-0001",
   "testo": "Convention annuale di Vela Pharma (350 pax) commissionata da Altamira Events, 12–13 novembre allo Spazio Navigli. Due giornate: plenaria il 12, workshop e chiusura il 13. Preventivo v2 firmato a 61.480 € (margine 26%) con condizioni 50/50; acconto già fatturato. Punti aperti: passo pixel del ledwall da confermare con Altamira, diretta streaming ancora opzionale, DUVRI in revisione con la venue. Rischi: Andrea Fontana è assegnato anche al town hall Borealis del 12/11 e Matteo Greco non è disponibile il 13 pomeriggio.",
   "modello_ai": "Claude",
   "generato_il": "2026-10-18 07:00",
   "file_fonte": "F-001, F-002, F-003, F-005, F-009",
   "validato": "sì"
  },
  {
   "riassunto_id": "RS-02",
   "oggetto_tipo": "file",
   "oggetto_id": "F-005",
   "testo": "Planimetria v3: palco 8×4 al fondo della Navata, regia a 18 m dal palco, 350 sedute in platea a file da 14, due uscite di sicurezza laterali libere. Indica 80 kW disponibili sul quadro venue.",
   "modello_ai": "Claude",
   "generato_il": "2026-10-16 18:10",
   "file_fonte": "F-005",
   "validato": "sì"
  },
  {
   "riassunto_id": "RS-03",
   "oggetto_tipo": "file",
   "oggetto_id": "F-004",
   "testo": "Offerta Officine Lumen: ledwall P2.9 18 mq a 120 €/mq + luci palco 1.400 €/giorno. Montaggio incluso, validità 30 giorni, pagamento a 60 gg.",
   "modello_ai": "Claude",
   "generato_il": "2026-10-12 09:30",
   "file_fonte": "F-004",
   "validato": "sì"
  },
  {
   "riassunto_id": "RS-04",
   "oggetto_tipo": "file",
   "oggetto_id": "F-009",
   "testo": "Bozza DUVRI: mancano i nominativi del personale della cooperativa e la certificazione dell'americana frontale.",
   "modello_ai": "Claude",
   "generato_il": "2026-10-17 15:00",
   "file_fonte": "F-009",
   "validato": "no"
  }
 ],
 "PROPOSTE_AI": [
  {
   "proposta_id": "PA-01",
   "tabella": "LOCATION",
   "record_id": "LOC-01",
   "campo": "potenza_elettrica_kw",
   "valore_attuale": "60",
   "valore_proposto": "80",
   "fonte_file_id": "F-005",
   "stato": "approvata",
   "custode_persona_id": "P07",
   "deciso_il": "2026-10-17 09:12"
  },
  {
   "proposta_id": "PA-02",
   "tabella": "LOCATION",
   "record_id": "LOC-01",
   "campo": "capienza_platea",
   "valore_attuale": "420",
   "valore_proposto": "400",
   "fonte_file_id": "F-010",
   "stato": "proposta",
   "custode_persona_id": "P07",
   "deciso_il": ""
  },
  {
   "proposta_id": "PA-03",
   "tabella": "ORGANIZZAZIONI",
   "record_id": "ORG-006",
   "campo": "condizioni_pagamento",
   "valore_attuale": "",
   "valore_proposto": "a 60 gg",
   "fonte_file_id": "F-004",
   "stato": "proposta",
   "custode_persona_id": "P08",
   "deciso_il": ""
  }
 ],
 "PRENOTAZIONI": [
  {
   "prenotazione_id": "PR-01",
   "commessa_id": "CM-0001",
   "articolo_id": "A01",
   "pezzo_id": "PZ-001",
   "quantita": 1,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-14 12:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-02",
   "commessa_id": "CM-0001",
   "articolo_id": "A02",
   "pezzo_id": "",
   "quantita": 6,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-14 12:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-03",
   "commessa_id": "CM-0001",
   "articolo_id": "A03",
   "pezzo_id": "",
   "quantita": 8,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-14 12:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-04",
   "commessa_id": "CM-0001",
   "articolo_id": "A04",
   "pezzo_id": "",
   "quantita": 8,
   "magazzino_id": "MAG-L1",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-13 23:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-05",
   "commessa_id": "CM-0001",
   "articolo_id": "A05",
   "pezzo_id": "",
   "quantita": 2,
   "magazzino_id": "MAG-L1",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-13 23:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-06",
   "commessa_id": "CM-0001",
   "articolo_id": "A08",
   "pezzo_id": "PZ-007",
   "quantita": 1,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-14 12:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-07",
   "commessa_id": "CM-0001",
   "articolo_id": "A09",
   "pezzo_id": "",
   "quantita": 2,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-14 12:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-08",
   "commessa_id": "CM-0001",
   "articolo_id": "A13",
   "pezzo_id": "",
   "quantita": 12,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-14 12:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-09",
   "commessa_id": "CM-0001",
   "articolo_id": "A14",
   "pezzo_id": "",
   "quantita": 4,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-14 12:00",
   "stato": "richiesta",
   "richiesta_da": "P04",
   "confermata_da": ""
  },
  {
   "prenotazione_id": "PR-10",
   "commessa_id": "CM-0001",
   "articolo_id": "A15",
   "pezzo_id": "",
   "quantita": 350,
   "magazzino_id": "MAG-L1",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-13 23:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-11",
   "commessa_id": "CM-0001",
   "articolo_id": "A17",
   "pezzo_id": "",
   "quantita": 16,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-14 12:00",
   "stato": "confermata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-12",
   "commessa_id": "CM-0001",
   "articolo_id": "A12",
   "pezzo_id": "",
   "quantita": 24,
   "magazzino_id": "MAG-L1",
   "dal": "2026-11-11 07:00",
   "al": "2026-11-13 23:00",
   "stato": "richiesta",
   "richiesta_da": "P04",
   "confermata_da": ""
  },
  {
   "prenotazione_id": "PR-13",
   "commessa_id": "CM-0007",
   "articolo_id": "A01",
   "pezzo_id": "PZ-002",
   "quantita": 1,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 14:00",
   "al": "2026-11-13 10:00",
   "stato": "confermata",
   "richiesta_da": "P05",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-14",
   "commessa_id": "CM-0007",
   "articolo_id": "A02",
   "pezzo_id": "",
   "quantita": 6,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 14:00",
   "al": "2026-11-13 10:00",
   "stato": "confermata",
   "richiesta_da": "P05",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-15",
   "commessa_id": "CM-0007",
   "articolo_id": "A03",
   "pezzo_id": "",
   "quantita": 4,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 14:00",
   "al": "2026-11-13 10:00",
   "stato": "richiesta",
   "richiesta_da": "P05",
   "confermata_da": ""
  },
  {
   "prenotazione_id": "PR-16",
   "commessa_id": "CM-0007",
   "articolo_id": "A06",
   "pezzo_id": "PZ-005",
   "quantita": 1,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 14:00",
   "al": "2026-11-13 10:00",
   "stato": "confermata",
   "richiesta_da": "P05",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-17",
   "commessa_id": "CM-0007",
   "articolo_id": "A06",
   "pezzo_id": "PZ-006",
   "quantita": 1,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 14:00",
   "al": "2026-11-13 10:00",
   "stato": "confermata",
   "richiesta_da": "P05",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-18",
   "commessa_id": "CM-0007",
   "articolo_id": "A07",
   "pezzo_id": "",
   "quantita": 2,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-11 14:00",
   "al": "2026-11-13 10:00",
   "stato": "confermata",
   "richiesta_da": "P05",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-19",
   "commessa_id": "CM-0003",
   "articolo_id": "A17",
   "pezzo_id": "",
   "quantita": 12,
   "magazzino_id": "MAG-L3",
   "dal": "2026-11-26 08:00",
   "al": "2026-11-29 12:00",
   "stato": "confermata",
   "richiesta_da": "P06",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-20",
   "commessa_id": "CM-0003",
   "articolo_id": "A12",
   "pezzo_id": "",
   "quantita": 30,
   "magazzino_id": "MAG-C",
   "dal": "2026-11-26 08:00",
   "al": "2026-11-29 12:00",
   "stato": "richiesta",
   "richiesta_da": "P06",
   "confermata_da": ""
  },
  {
   "prenotazione_id": "PR-21",
   "commessa_id": "CM-0003",
   "articolo_id": "A16",
   "pezzo_id": "",
   "quantita": 20,
   "magazzino_id": "MAG-L3",
   "dal": "2026-11-26 08:00",
   "al": "2026-11-29 12:00",
   "stato": "confermata",
   "richiesta_da": "P06",
   "confermata_da": "P09"
  },
  {
   "prenotazione_id": "PR-22",
   "commessa_id": "CM-0004",
   "articolo_id": "A04",
   "pezzo_id": "",
   "quantita": 6,
   "magazzino_id": "MAG-L1",
   "dal": "2026-10-07 08:00",
   "al": "2026-10-09 12:00",
   "stato": "rientrata",
   "richiesta_da": "P04",
   "confermata_da": "P09"
  }
 ],
 "MOVIMENTI": [
  {
   "movimento_id": "MV-01",
   "tipo": "uscita",
   "articolo_id": "A04",
   "pezzo_id": "",
   "quantita": 6,
   "da_magazzino_id": "MAG-L1",
   "a_magazzino_id": "",
   "commessa_id": "CM-0004",
   "trasporto_id": "",
   "quando": "2026-10-07 08:30",
   "persona_id": "P09",
   "note": ""
  },
  {
   "movimento_id": "MV-02",
   "tipo": "rientro",
   "articolo_id": "A04",
   "pezzo_id": "",
   "quantita": 6,
   "da_magazzino_id": "",
   "a_magazzino_id": "MAG-L1",
   "commessa_id": "CM-0004",
   "trasporto_id": "",
   "quando": "2026-10-09 11:00",
   "persona_id": "P09",
   "note": ""
  },
  {
   "movimento_id": "MV-03",
   "tipo": "trasferimento",
   "articolo_id": "A12",
   "pezzo_id": "",
   "quantita": 12,
   "da_magazzino_id": "MAG-C",
   "a_magazzino_id": "MAG-L3",
   "commessa_id": "",
   "trasporto_id": "",
   "quando": "2026-10-02 15:00",
   "persona_id": "P09",
   "note": "dotazione fissa villa"
  },
  {
   "movimento_id": "MV-04",
   "tipo": "carico",
   "articolo_id": "A20",
   "pezzo_id": "",
   "quantita": 24,
   "da_magazzino_id": "",
   "a_magazzino_id": "MAG-C",
   "commessa_id": "",
   "trasporto_id": "",
   "quando": "2026-09-20 10:00",
   "persona_id": "P09",
   "note": "riordino"
  },
  {
   "movimento_id": "MV-05",
   "tipo": "scarico",
   "articolo_id": "A20",
   "pezzo_id": "",
   "quantita": 10,
   "da_magazzino_id": "MAG-C",
   "a_magazzino_id": "",
   "commessa_id": "CM-0004",
   "trasporto_id": "",
   "quando": "2026-10-09 11:30",
   "persona_id": "P09",
   "note": "consumato in evento"
  }
 ],
 "LISTINO": [
  {
   "voce_id": "L-001",
   "codice": "SRV-AUD-S",
   "categoria": "service",
   "descrizione_preventivo": "Impianto audio sala fino a 200 pax",
   "unita": "giorno",
   "prezzo_vendita": 1100,
   "costo_standard": 600,
   "ricarico_standard": 0.83,
   "articolo_id": "",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-002",
   "codice": "SRV-AUD-M",
   "categoria": "service",
   "descrizione_preventivo": "Impianto audio sala fino a 400 pax",
   "unita": "giorno",
   "prezzo_vendita": 1600,
   "costo_standard": 900,
   "ricarico_standard": 0.78,
   "articolo_id": "",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-003",
   "codice": "SRV-RAD",
   "categoria": "service",
   "descrizione_preventivo": "Radiomicrofono",
   "unita": "pz/giorno",
   "prezzo_vendita": 60,
   "costo_standard": 25,
   "ricarico_standard": 1.4,
   "articolo_id": "A02",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-004",
   "codice": "VID-LED-C",
   "categoria": "video",
   "descrizione_preventivo": "Ledwall · prezzo cliente",
   "unita": "mq",
   "prezzo_vendita": 250,
   "costo_standard": 120,
   "ricarico_standard": 1.08,
   "articolo_id": "",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-005",
   "codice": "VID-LED-A",
   "categoria": "video",
   "descrizione_preventivo": "Ledwall · prezzo agenzia",
   "unita": "mq",
   "prezzo_vendita": 200,
   "costo_standard": 120,
   "ricarico_standard": 0.67,
   "articolo_id": "",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-006",
   "codice": "VID-REG",
   "categoria": "video",
   "descrizione_preventivo": "Regia video vMix + 2 camere",
   "unita": "giorno",
   "prezzo_vendita": 2000,
   "costo_standard": 1100,
   "ricarico_standard": 0.82,
   "articolo_id": "A08",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-007",
   "codice": "VID-PRJ",
   "categoria": "video",
   "descrizione_preventivo": "Proiettore 10k lm con schermo 4×3",
   "unita": "giorno",
   "prezzo_vendita": 850,
   "costo_standard": 340,
   "ricarico_standard": 1.5,
   "articolo_id": "A06",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-008",
   "codice": "LUC-PAL",
   "categoria": "luci",
   "descrizione_preventivo": "Luci palco e ambiente",
   "unita": "giorno",
   "prezzo_vendita": 2300,
   "costo_standard": 1400,
   "ricarico_standard": 0.64,
   "articolo_id": "",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-009",
   "codice": "ALL-PAL",
   "categoria": "allestimenti",
   "descrizione_preventivo": "Palco modulare 8×4 m",
   "unita": "evento",
   "prezzo_vendita": 3200,
   "costo_standard": 1800,
   "ricarico_standard": 0.78,
   "articolo_id": "A17",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-010",
   "codice": "PER-TEC",
   "categoria": "personale",
   "descrizione_preventivo": "Tecnico specializzato (giornata 10 h)",
   "unita": "giorno",
   "prezzo_vendita": 380,
   "costo_standard": 280,
   "ricarico_standard": 0.36,
   "articolo_id": "",
   "azienda": "entrambe",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-011",
   "codice": "PER-EXT",
   "categoria": "personale",
   "descrizione_preventivo": "Ora extra tecnico",
   "unita": "ora",
   "prezzo_vendita": 50,
   "costo_standard": 32,
   "ricarico_standard": 0.56,
   "articolo_id": "",
   "azienda": "entrambe",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-012",
   "codice": "PER-HOS",
   "categoria": "personale",
   "descrizione_preventivo": "Hostess (giornata 8 h)",
   "unita": "giorno",
   "prezzo_vendita": 260,
   "costo_standard": 180,
   "ricarico_standard": 0.44,
   "articolo_id": "",
   "azienda": "Nakama",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-013",
   "codice": "SEG-ACC",
   "categoria": "segreteria",
   "descrizione_preventivo": "Gestione accrediti e segreteria",
   "unita": "evento",
   "prezzo_vendita": 1200,
   "costo_standard": 600,
   "ricarico_standard": 1.0,
   "articolo_id": "",
   "azienda": "Nakama",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-014",
   "codice": "TRA-FUR",
   "categoria": "trasporti",
   "descrizione_preventivo": "Furgone + autista Milano",
   "unita": "tratta",
   "prezzo_vendita": 550,
   "costo_standard": 380,
   "ricarico_standard": 0.45,
   "articolo_id": "",
   "azienda": "entrambe",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  },
  {
   "voce_id": "L-015",
   "codice": "GRA-FON",
   "categoria": "grafiche",
   "descrizione_preventivo": "Fondale stampato fino a 32 mq",
   "unita": "pz",
   "prezzo_vendita": 1500,
   "costo_standard": 950,
   "ricarico_standard": 0.58,
   "articolo_id": "",
   "azienda": "Chedo",
   "valido_dal": "2027-01-01",
   "valido_al": ""
  }
 ],
 "PACCHETTI": [
  {
   "pacchetto_id": "PK-01",
   "nome": "Plenaria base",
   "livello": "base",
   "pax_riferimento": 100,
   "prezzo": 3900,
   "descrizione": "Audio, 1 proiettore, 2 radiomicrofoni, 1 tecnico"
  },
  {
   "pacchetto_id": "PK-02",
   "nome": "Plenaria medium",
   "livello": "medium",
   "pax_riferimento": 250,
   "prezzo": 8400,
   "descrizione": "Audio, regia video, 4 radiomicrofoni, luci palco, 2 tecnici"
  },
  {
   "pacchetto_id": "PK-03",
   "nome": "Plenaria premium",
   "livello": "premium",
   "pax_riferimento": 400,
   "prezzo": 16800,
   "descrizione": "Audio, ledwall 18 mq, regia 2 camere, luci, palco, 4 tecnici"
  }
 ],
 "PACCHETTI_VOCI": [
  {
   "pacchetto_id": "PK-01",
   "voce_id": "L-001",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-01",
   "voce_id": "L-007",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-01",
   "voce_id": "L-003",
   "quantita": 2
  },
  {
   "pacchetto_id": "PK-01",
   "voce_id": "L-010",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-02",
   "voce_id": "L-002",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-02",
   "voce_id": "L-006",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-02",
   "voce_id": "L-003",
   "quantita": 4
  },
  {
   "pacchetto_id": "PK-02",
   "voce_id": "L-008",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-02",
   "voce_id": "L-010",
   "quantita": 2
  },
  {
   "pacchetto_id": "PK-03",
   "voce_id": "L-002",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-03",
   "voce_id": "L-004",
   "quantita": 18
  },
  {
   "pacchetto_id": "PK-03",
   "voce_id": "L-006",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-03",
   "voce_id": "L-008",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-03",
   "voce_id": "L-009",
   "quantita": 1
  },
  {
   "pacchetto_id": "PK-03",
   "voce_id": "L-010",
   "quantita": 4
  }
 ],
 "PREVENTIVI": [
  {
   "preventivo_id": "PV-01",
   "commessa_id": "CM-0001",
   "versione": 1,
   "data": "2026-09-15",
   "totale": 67780,
   "sconto": 0,
   "totale_finale": 67780,
   "stato": "superato"
  },
  {
   "preventivo_id": "PV-02",
   "commessa_id": "CM-0001",
   "versione": 2,
   "data": "2026-09-26",
   "totale": 62980,
   "sconto": 1500,
   "totale_finale": 61480,
   "stato": "firmato"
  },
  {
   "preventivo_id": "PV-03",
   "commessa_id": "CM-0002",
   "versione": 1,
   "data": "2026-10-03",
   "totale": 21740,
   "sconto": 0,
   "totale_finale": 21740,
   "stato": "firmato"
  },
  {
   "preventivo_id": "PV-04",
   "commessa_id": "CM-0005",
   "versione": 1,
   "data": "2026-10-16",
   "totale": 72000,
   "sconto": 0,
   "totale_finale": 72000,
   "stato": "bozza"
  }
 ],
 "FATTURE": [
  {
   "fattura_id": "FT-01",
   "commessa_id": "CM-0001",
   "tipo": "attiva",
   "azienda": "Nakama",
   "numero": "DEMO-2026/118",
   "data": "2026-10-02",
   "org_id": "ORG-002",
   "imponibile": 30740.0,
   "iva": 6762.8,
   "totale": 37502.8,
   "scadenza": "2026-10-02",
   "stato_pagamento": "pagata",
   "codice_gestionale": "26MCE11004"
  },
  {
   "fattura_id": "FT-02",
   "commessa_id": "CM-0004",
   "tipo": "attiva",
   "azienda": "Chedo",
   "numero": "DEMO-2026/087",
   "data": "2026-10-10",
   "org_id": "ORG-012",
   "imponibile": 39200,
   "iva": 8624,
   "totale": 47824,
   "scadenza": "2026-12-09",
   "stato_pagamento": "da pagare",
   "codice_gestionale": ""
  },
  {
   "fattura_id": "FT-03",
   "commessa_id": "CM-0004",
   "tipo": "passiva",
   "azienda": "Chedo",
   "numero": "OL-552",
   "data": "2026-10-15",
   "org_id": "ORG-006",
   "imponibile": 6200,
   "iva": 1364,
   "totale": 7564,
   "scadenza": "2026-12-14",
   "stato_pagamento": "da pagare",
   "codice_gestionale": ""
  },
  {
   "fattura_id": "FT-04",
   "commessa_id": "CM-0004",
   "tipo": "passiva",
   "azienda": "Chedo",
   "numero": "CTR-2026-311",
   "data": "2026-10-16",
   "org_id": "ORG-008",
   "imponibile": 3640,
   "iva": 800.8,
   "totale": 4440.8,
   "scadenza": "2026-11-15",
   "stato_pagamento": "da pagare",
   "codice_gestionale": ""
  }
 ],
 "REBATE": [
  {
   "rebate_id": "RB-01",
   "commessa_id": "CM-0001",
   "partner_org_id": "ORG-005",
   "accordo_id": "AP-01",
   "base": 61480,
   "percentuale": 0.05,
   "importo": 3074.0,
   "stato": "maturato"
  }
 ],
 "FORNITORI": [
  {
   "org_id": "ORG-006",
   "categorie": "service/noleggio",
   "sconto_ricevuto": 0.08,
   "durc_scadenza": "2027-01-31",
   "documenti_ok": "sì",
   "valutazione": 5,
   "note": ""
  },
  {
   "org_id": "ORG-007",
   "categorie": "stampa",
   "sconto_ricevuto": 0.05,
   "durc_scadenza": "2026-12-15",
   "documenti_ok": "sì",
   "valutazione": 4,
   "note": ""
  },
  {
   "org_id": "ORG-008",
   "categorie": "personale",
   "sconto_ricevuto": 0,
   "durc_scadenza": "2026-11-08",
   "documenti_ok": "sì",
   "valutazione": 4,
   "note": "DURC in scadenza prima di D26-007"
  },
  {
   "org_id": "ORG-009",
   "categorie": "trasporti",
   "sconto_ricevuto": 0,
   "durc_scadenza": "2027-03-01",
   "documenti_ok": "sì",
   "valutazione": 3,
   "note": ""
  },
  {
   "org_id": "ORG-010",
   "categorie": "location",
   "sconto_ricevuto": 0,
   "durc_scadenza": "",
   "documenti_ok": "sì",
   "valutazione": 5,
   "note": ""
  },
  {
   "org_id": "ORG-011",
   "categorie": "location",
   "sconto_ricevuto": 0,
   "durc_scadenza": "",
   "documenti_ok": "sì",
   "valutazione": 4,
   "note": ""
  },
  {
   "org_id": "ORG-013",
   "categorie": "catering",
   "sconto_ricevuto": 0.03,
   "durc_scadenza": "2027-02-10",
   "documenti_ok": "no",
   "valutazione": 4,
   "note": "manca HACCP aggiornato"
  }
 ],
 "ORDINI": [
  {
   "ordine_id": "OR-01",
   "commessa_id": "CM-0001",
   "fornitore_org_id": "ORG-006",
   "tipo": "noleggio",
   "descrizione": "Ledwall 18 mq + luci palco 2 giorni",
   "data_ordine": "2026-10-03",
   "consegna_prevista": "2026-11-11",
   "stato": "confermato",
   "importo_previsto": 4960,
   "responsabile_persona_id": "P04"
  },
  {
   "ordine_id": "OR-02",
   "commessa_id": "CM-0001",
   "fornitore_org_id": "ORG-007",
   "tipo": "acquisto",
   "descrizione": "Fondale palco + 6 totem",
   "data_ordine": "2026-10-14",
   "consegna_prevista": "2026-11-09",
   "stato": "in lavorazione",
   "importo_previsto": 1460,
   "responsabile_persona_id": "P04"
  },
  {
   "ordine_id": "OR-03",
   "commessa_id": "CM-0001",
   "fornitore_org_id": "ORG-008",
   "tipo": "servizio",
   "descrizione": "5 tecnici × 3 giorni",
   "data_ordine": "2026-10-10",
   "consegna_prevista": "2026-11-11",
   "stato": "ordinato",
   "importo_previsto": 4200,
   "responsabile_persona_id": "P04"
  },
  {
   "ordine_id": "OR-04",
   "commessa_id": "CM-0001",
   "fornitore_org_id": "ORG-009",
   "tipo": "servizio",
   "descrizione": "Furgone + autista A/R Lambrate–Navigli",
   "data_ordine": "",
   "consegna_prevista": "2026-11-11",
   "stato": "preventivo richiesto",
   "importo_previsto": 760,
   "responsabile_persona_id": "P09"
  },
  {
   "ordine_id": "OR-05",
   "commessa_id": "CM-0001",
   "fornitore_org_id": "ORG-013",
   "tipo": "servizio",
   "descrizione": "Catering 350 pax × 2 giorni",
   "data_ordine": "2026-10-05",
   "consegna_prevista": "2026-11-12",
   "stato": "confermato",
   "importo_previsto": 12600,
   "responsabile_persona_id": "P12"
  },
  {
   "ordine_id": "OR-06",
   "commessa_id": "CM-0001",
   "fornitore_org_id": "ORG-010",
   "tipo": "servizio",
   "descrizione": "Affitto Navata 2 giorni",
   "data_ordine": "2026-10-01",
   "consegna_prevista": "2026-11-12",
   "stato": "confermato",
   "importo_previsto": 13000,
   "responsabile_persona_id": "P04"
  },
  {
   "ordine_id": "OR-07",
   "commessa_id": "CM-0002",
   "fornitore_org_id": "ORG-011",
   "tipo": "servizio",
   "descrizione": "Sala Superga + catering",
   "data_ordine": "",
   "consegna_prevista": "2027-01-20",
   "stato": "da ordinare",
   "importo_previsto": 11040,
   "responsabile_persona_id": "P05"
  },
  {
   "ordine_id": "OR-08",
   "commessa_id": "CM-0003",
   "fornitore_org_id": "ORG-007",
   "tipo": "acquisto",
   "descrizione": "Segnaletica parco",
   "data_ordine": "",
   "consegna_prevista": "2026-11-25",
   "stato": "preventivo richiesto",
   "importo_previsto": 1200,
   "responsabile_persona_id": "P06"
  }
 ],
 "ORDINI_RIGHE": [
  {
   "ordine_id": "OR-01",
   "descrizione": "Ledwall P2.9 (mq)",
   "quantita": 18,
   "prezzo_unitario": 120,
   "articolo_id": ""
  },
  {
   "ordine_id": "OR-01",
   "descrizione": "Luci palco (giorno)",
   "quantita": 2,
   "prezzo_unitario": 1400,
   "articolo_id": ""
  },
  {
   "ordine_id": "OR-02",
   "descrizione": "Fondale 8×4 m",
   "quantita": 1,
   "prezzo_unitario": 950,
   "articolo_id": ""
  },
  {
   "ordine_id": "OR-02",
   "descrizione": "Totem 80×200",
   "quantita": 6,
   "prezzo_unitario": 85,
   "articolo_id": ""
  }
 ],
 "NOLEGGI": [
  {
   "noleggio_id": "NL-01",
   "direzione": "da terzi",
   "org_id": "ORG-006",
   "commessa_id": "CM-0001",
   "articolo_id": "",
   "descrizione": "Ledwall P2.9 18 mq",
   "quantita": 18,
   "dal": "2026-11-11",
   "al": "2026-11-13",
   "importo": 2160,
   "stato": "confermato"
  },
  {
   "noleggio_id": "NL-02",
   "direzione": "a terzi",
   "org_id": "ORG-002",
   "commessa_id": "",
   "articolo_id": "A01",
   "descrizione": "Mixer M32 per evento Altamira",
   "quantita": 1,
   "dal": "2026-10-20",
   "al": "2026-10-21",
   "importo": 360,
   "stato": "richiesto"
  }
 ],
 "MEZZI": [
  {
   "mezzo_id": "ME-01",
   "nome": "Furgone Ducato maxi",
   "targa": "DEMO-001",
   "portata_kg": 1400,
   "dimensioni_vano": "4,1 × 1,9 × 1,9 m",
   "proprietario": "Chedo"
  },
  {
   "mezzo_id": "ME-02",
   "nome": "Camion 75 q con sponda",
   "targa": "DEMO-002",
   "portata_kg": 3200,
   "dimensioni_vano": "6,2 × 2,4 × 2,3 m",
   "proprietario": "TrasLog"
  }
 ],
 "TRASPORTI": [
  {
   "trasporto_id": "TR-01",
   "commessa_id": "CM-0001",
   "tipo": "materiale",
   "mezzo_id": "ME-01",
   "fornitore_org_id": "",
   "da": "Magazzino centrale",
   "a": "Spazio Navigli",
   "partenza": "2026-11-11 06:30",
   "arrivo": "2026-11-11 07:15",
   "autista_persona_id": "P09",
   "stato": "pianificato"
  },
  {
   "trasporto_id": "TR-02",
   "commessa_id": "CM-0001",
   "tipo": "materiale",
   "mezzo_id": "ME-02",
   "fornitore_org_id": "ORG-009",
   "da": "Magazzino centrale",
   "a": "Spazio Navigli",
   "partenza": "2026-11-11 06:30",
   "arrivo": "2026-11-11 07:30",
   "autista_persona_id": "",
   "stato": "pianificato"
  },
  {
   "trasporto_id": "TR-03",
   "commessa_id": "CM-0001",
   "tipo": "materiale",
   "mezzo_id": "ME-01",
   "fornitore_org_id": "",
   "da": "Spazio Navigli",
   "a": "Magazzino centrale",
   "partenza": "2026-11-14 08:00",
   "arrivo": "2026-11-14 08:45",
   "autista_persona_id": "P09",
   "stato": "pianificato"
  },
  {
   "trasporto_id": "TR-04",
   "commessa_id": "CM-0007",
   "tipo": "materiale",
   "mezzo_id": "ME-02",
   "fornitore_org_id": "ORG-009",
   "da": "Magazzino centrale",
   "a": "Hotel Bellavista Torino",
   "partenza": "2026-11-11 14:00",
   "arrivo": "2026-11-11 16:30",
   "autista_persona_id": "",
   "stato": "confermato"
  }
 ],
 "GRAFICHE": [
  {
   "grafica_id": "GR-01",
   "codice": "GR-PALCO-1",
   "nome": "Fondale palco",
   "area": "palco",
   "materiale": "PVC microforato",
   "base_cm": 800,
   "altezza_cm": 400,
   "fornitore_org_id": "ORG-007",
   "costo": 950,
   "prezzo_vendita": 1500
  },
  {
   "grafica_id": "GR-02",
   "codice": "GR-ING-1",
   "nome": "Totem segnaletica",
   "area": "ingresso",
   "materiale": "forex 5 mm",
   "base_cm": 80,
   "altezza_cm": 200,
   "fornitore_org_id": "ORG-007",
   "costo": 85,
   "prezzo_vendita": 150
  },
  {
   "grafica_id": "GR-03",
   "codice": "GR-ING-2",
   "nome": "Rivestimento desk accrediti",
   "area": "ingresso",
   "materiale": "tessuto tensionato",
   "base_cm": 300,
   "altezza_cm": 100,
   "fornitore_org_id": "ORG-007",
   "costo": 240,
   "prezzo_vendita": 420
  },
  {
   "grafica_id": "GR-04",
   "codice": "GR-SALA-1",
   "nome": "Roll-up",
   "area": "sala",
   "materiale": "PVC",
   "base_cm": 85,
   "altezza_cm": 200,
   "fornitore_org_id": "ORG-007",
   "costo": 60,
   "prezzo_vendita": 120
  }
 ],
 "SICUREZZA": [
  {
   "doc_id": "SC-01",
   "commessa_id": "CM-0001",
   "location_id": "LOC-01",
   "tipo": "DUVRI",
   "file_id": "F-009",
   "scadenza": "2026-11-05",
   "stato": "in revisione",
   "responsabile_persona_id": "P04"
  },
  {
   "doc_id": "SC-02",
   "commessa_id": "CM-0001",
   "location_id": "LOC-01",
   "tipo": "POS",
   "file_id": "",
   "scadenza": "2026-11-05",
   "stato": "mancante",
   "responsabile_persona_id": "P04"
  },
  {
   "doc_id": "SC-03",
   "commessa_id": "",
   "location_id": "LOC-01",
   "tipo": "piano di emergenza",
   "file_id": "F-010",
   "scadenza": "2026-12-31",
   "stato": "ok",
   "responsabile_persona_id": "P07"
  },
  {
   "doc_id": "SC-04",
   "commessa_id": "CM-0001",
   "location_id": "LOC-01",
   "tipo": "certificazione",
   "file_id": "",
   "scadenza": "2026-11-05",
   "stato": "mancante",
   "responsabile_persona_id": "P09"
  },
  {
   "doc_id": "SC-05",
   "commessa_id": "CM-0007",
   "location_id": "LOC-02",
   "tipo": "DUVRI",
   "file_id": "",
   "scadenza": "2026-11-05",
   "stato": "in revisione",
   "responsabile_persona_id": "P05"
  }
 ],
 "TIMESHEET": [
  {
   "riga_id": "TS-01",
   "persona_id": "P10",
   "commessa_id": "CM-0004",
   "data": "2026-10-07",
   "ore": 9,
   "attivita": "Montaggio audio",
   "approvato_da": "P04"
  },
  {
   "riga_id": "TS-02",
   "persona_id": "P10",
   "commessa_id": "CM-0004",
   "data": "2026-10-08",
   "ore": 11,
   "attivita": "Fonico evento (1 h extra)",
   "approvato_da": "P04"
  },
  {
   "riga_id": "TS-03",
   "persona_id": "P09",
   "commessa_id": "CM-0004",
   "data": "2026-10-07",
   "ore": 8,
   "attivita": "Carico e scarico",
   "approvato_da": "P04"
  },
  {
   "riga_id": "TS-04",
   "persona_id": "P04",
   "commessa_id": "CM-0001",
   "data": "2026-10-15",
   "ore": 4,
   "attivita": "Costing v2 e ordini",
   "approvato_da": ""
  },
  {
   "riga_id": "TS-05",
   "persona_id": "P12",
   "commessa_id": "CM-0001",
   "data": "2026-10-16",
   "ore": 3,
   "attivita": "Setup accrediti",
   "approvato_da": ""
  },
  {
   "riga_id": "TS-06",
   "persona_id": "P04",
   "commessa_id": "CM-0004",
   "data": "2026-10-08",
   "ore": 12,
   "attivita": "Coordinamento evento",
   "approvato_da": "P03"
  }
 ],
 "TODO_CLICKUP": [
  {
   "clickup_task_id": "CU-101",
   "commessa_id": "CM-0001",
   "titolo": "Confermare passo pixel ledwall con Altamira",
   "assegnatario_persona_id": "P04",
   "scadenza": "2026-10-20",
   "stato": "in corso",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-102",
   "commessa_id": "CM-0001",
   "titolo": "Sopralluogo tecnico con venue",
   "assegnatario_persona_id": "P04",
   "scadenza": "2026-10-22",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-103",
   "commessa_id": "CM-0001",
   "titolo": "Chiudere DUVRI con Spazio Navigli",
   "assegnatario_persona_id": "P04",
   "scadenza": "2026-10-30",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-104",
   "commessa_id": "CM-0001",
   "titolo": "Raccogliere nominativi tecnici dalla cooperativa",
   "assegnatario_persona_id": "P12",
   "scadenza": "2026-10-25",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-105",
   "commessa_id": "CM-0001",
   "titolo": "Approvare bozza fondale palco",
   "assegnatario_persona_id": "P04",
   "scadenza": "2026-10-17",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-106",
   "commessa_id": "CM-0001",
   "titolo": "Lista materiale definitiva al magazzino",
   "assegnatario_persona_id": "P04",
   "scadenza": "2026-11-03",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-107",
   "commessa_id": "CM-0001",
   "titolo": "Risolvere conflitto fonico 12/11 (Andrea su D26-010)",
   "assegnatario_persona_id": "P05",
   "scadenza": "2026-10-24",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-108",
   "commessa_id": "CM-0001",
   "titolo": "Inviare scaletta v2 al cliente",
   "assegnatario_persona_id": "P04",
   "scadenza": "2026-10-14",
   "stato": "fatto",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-109",
   "commessa_id": "CM-0001",
   "titolo": "Preparare kit accrediti e badge",
   "assegnatario_persona_id": "P12",
   "scadenza": "2026-11-09",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-110",
   "commessa_id": "CM-0007",
   "titolo": "Confermare radiomicrofoni archetto (4)",
   "assegnatario_persona_id": "P05",
   "scadenza": "2026-10-28",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-111",
   "commessa_id": "CM-0007",
   "titolo": "Inviare DUVRI firmato all'hotel",
   "assegnatario_persona_id": "P05",
   "scadenza": "2026-11-04",
   "stato": "in corso",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-112",
   "commessa_id": "CM-0003",
   "titolo": "Sopralluogo parco con fondazione",
   "assegnatario_persona_id": "P06",
   "scadenza": "2026-10-21",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-113",
   "commessa_id": "CM-0003",
   "titolo": "Richiedere permesso belle arti per strutture",
   "assegnatario_persona_id": "P06",
   "scadenza": "2026-10-31",
   "stato": "in corso",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-114",
   "commessa_id": "CM-0002",
   "titolo": "Bloccare sala Superga con acconto",
   "assegnatario_persona_id": "P05",
   "scadenza": "2026-10-30",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-115",
   "commessa_id": "CM-0004",
   "titolo": "Chiudere consuntivo e rifatturare ore extra",
   "assegnatario_persona_id": "P04",
   "scadenza": "2026-10-23",
   "stato": "in corso",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  },
  {
   "clickup_task_id": "CU-116",
   "commessa_id": "CM-0005",
   "titolo": "Proposta location con spazio esterno",
   "assegnatario_persona_id": "P07",
   "scadenza": "2026-11-10",
   "stato": "da fare",
   "url": "",
   "ultimo_sync": "2026-10-18 21:00"
  }
 ]
};
