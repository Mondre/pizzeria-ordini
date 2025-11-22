# 🍕 Sistema Gestione Ordini Pizzeria

Sistema completo per la gestione degli ordini online di una pizzeria, con notifiche in tempo reale e stampa automatica.

## 📋 Caratteristiche

- **App Web Cliente**: Interfaccia intuitiva per ordinare pizze
- **Dashboard Pizzeria**: Gestione ordini in tempo reale
- **Notifiche Real-time**: Socket.io per aggiornamenti istantanei
- **Sistema di Stampa**: Stampa automatica degli ordini accettati
- **Gestione Orari**: Possibilità di modificare l'orario di consegna
- **Database SQLite**: Archiviazione locale di tutti gli ordini

## 🚀 Installazione

### Requisiti
- Node.js (versione 14 o superiore)
- Browser moderno (Chrome, Firefox, Edge)

### Passo 1: Installa le dipendenze

```powershell
cd C:\pizzeria-ordini
npm install
```

### Passo 2: Avvia il server

```powershell
npm start
```

Il server sarà disponibile su `http://localhost:3000`

## 📱 Utilizzo

### Per i Clienti
1. Apri il browser e vai su: `http://localhost:3000/client/index.html`
2. Sfoglia il menu delle pizze
3. Clicca sulle pizze per aggiungerle al carrello
4. Clicca sul carrello per completare l'ordine
5. Inserisci i dati personali (nome, telefono, indirizzo)
6. Seleziona un orario preferito (opzionale)
7. Aggiungi note (opzionale)
8. Invia l'ordine

### Per la Pizzeria
1. Apri il browser e vai su: `http://localhost:3000/pizzeria-dashboard/index.html`
2. Visualizza gli ordini in arrivo in tempo reale
3. Ricevi notifica sonora per ogni nuovo ordine
4. Visualizza tutti i dettagli dell'ordine:
   - Dati cliente (nome, telefono, indirizzo)
   - Elenco prodotti
   - Orario richiesto
   - Note speciali
5. Modifica l'orario di consegna se necessario
6. Clicca **"Accetta Ordine"** per:
   - Confermare l'ordine
   - Aprire finestra di stampa automatica
   - Rimuovere l'ordine dalla lista in attesa
7. Clicca **"Rifiuta"** per rifiutare l'ordine

## 📊 Struttura del Progetto

```
pizzeria-ordini/
│
├── backend/
│   └── server.js              # Server Node.js + Express + Socket.io
│
├── client/
│   └── index.html             # App web per clienti
│
├── pizzeria-dashboard/
│   └── index.html             # Dashboard per gestione ordini
│
├── package.json               # Dipendenze del progetto
├── .gitignore
└── README.md
```

## 🔧 Configurazione

### Porta del Server
Di default il server usa la porta 3000. Per cambiarla:

```powershell
$env:PORT=8080; npm start
```

### Personalizzare il Menu
Il menu viene popolato automaticamente al primo avvio. Per modificarlo:

1. Apri il file `backend/server.js`
2. Cerca la sezione `Inserisci menu di esempio`
3. Modifica le pizze esistenti o aggiungine di nuove
4. Elimina il file `ordini.db` e riavvia il server

## 🖨️ Configurazione Stampante

La stampa avviene tramite il browser. Per configurarla:

1. Quando clicchi "Accetta Ordine", si apre la finestra di stampa
2. Seleziona la stampante termica/ricevute
3. Configura:
   - Formato: 80mm (tipico per stampanti termiche)
   - Margini: Minimi
   - Intestazione/Piè di pagina: Disabilitati

### Stampante Termica USB
Per stampanti termiche, assicurati che:
- I driver siano installati correttamente
- La stampante sia impostata come predefinita (opzionale)
- La larghezza carta sia 80mm

## 📈 Funzionalità Dashboard

### Statistiche
- **In Attesa**: Numero ordini da processare
- **Oggi**: Totale ordini ricevuti oggi
- **Incasso Oggi**: Totale vendite giornaliere

### Gestione Ordini
- Visualizzazione in tempo reale
- Notifiche sonore per nuovi ordini
- Badge colorati per stato ordine
- Modifica orario di consegna
- Stampa automatica

## 🛠️ Sviluppo

### Modalità Sviluppo con Auto-reload

```powershell
npm run dev
```

### Accesso da Altri Dispositivi (Smartphone, Tablet)

1. Trova l'IP del PC:
```powershell
ipconfig
```

2. Cerca "IPv4 Address" (es. 192.168.1.100)

3. Sugli altri dispositivi vai su:
   - Clienti: `http://192.168.1.100:3000/client/index.html`
   - Pizzeria: `http://192.168.1.100:3000/pizzeria-dashboard/index.html`

**Nota**: Assicurati che il firewall permetta connessioni sulla porta 3000.

## 🔒 Sicurezza

**⚠️ IMPORTANTE**: Questa è una versione base per uso locale/demo. Per produzione considera:

- Autenticazione per la dashboard pizzeria
- HTTPS per connessioni sicure
- Validazione input lato server
- Rate limiting sulle API
- Database più robusto (PostgreSQL, MySQL)
- Sistema di pagamento online
- Backup automatici del database

## 🐛 Risoluzione Problemi

### Il server non parte
- Verifica che la porta 3000 non sia già in uso
- Controlla che Node.js sia installato: `node --version`
- Reinstalla le dipendenze: `npm install`

### Gli ordini non arrivano in tempo reale
- Controlla che Socket.io sia connesso (vedi icona verde in basso a destra)
- Ricarica la pagina della dashboard
- Verifica la console del browser per errori

### La stampa non funziona
- Verifica che la stampante sia accesa e connessa
- Controlla i driver della stampante
- Prova con un'altra stampante o salva come PDF

### Database corrotto
- Elimina il file `ordini.db` (perderai i dati)
- Riavvia il server

## 📝 Licenza

MIT License - Libero per uso personale e commerciale

## 👨‍💻 Supporto

Per problemi o suggerimenti, controlla:
- Console del browser (F12) per errori JavaScript
- Output del terminale per errori del server
- File `ordini.db` per verificare i dati

## 🎯 Prossimi Sviluppi

Possibili miglioramenti futuri:
- [ ] App mobile nativa (React Native/Flutter)
- [ ] Gestione tavoli per ordini in loco
- [ ] Sistema di fedeltà clienti
- [ ] Integrazione pagamenti online
- [ ] SMS/Email di conferma ordine
- [ ] Statistiche avanzate e report
- [ ] Gestione staff e turni
- [ ] Sistema di recensioni

---

**Buon appetito! 🍕**
