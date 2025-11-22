const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Inizializzazione
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servi file statici
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/pizzeria-dashboard', express.static(path.join(__dirname, '../pizzeria-dashboard')));

// Servi dashboard mobile
app.get('/mobile', (req, res) => {
  res.sendFile(path.join(__dirname, '../pizzeria-dashboard-mobile.html'));
});

// Database JSON
const DB_FILE = 'database.json';

// Inizializza database se non esiste
if (!fs.existsSync(DB_FILE)) {
  const initialData = {
    ordini: [],
    menu: [
      // Pizze Classiche
      { id: 1, nome: 'Focaccia', descrizione: 'Olio, Sale', prezzo: 5.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 2, nome: 'Margherita', descrizione: 'Pomodoro, mozzarella', prezzo: 6.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 3, nome: 'Marinara', descrizione: 'Pomodoro, aglio, origano', prezzo: 5.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 4, nome: 'Napoli', descrizione: 'Pomodoro, mozzarella, acciughe, origano', prezzo: 7.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 5, nome: 'Quattro Stagioni', descrizione: 'Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 6, nome: 'Romana', descrizione: 'Pomodoro, mozzarella, acciughe, capperi, origano', prezzo: 8.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 7, nome: 'Schiacciatina', descrizione: 'Pomodoro, prosciutto cotto', prezzo: 7.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 8, nome: 'Funghi', descrizione: 'Pomodoro, mozzarella, funghi', prezzo: 7.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 9, nome: 'Pugliese', descrizione: 'Pomodoro, mozzarella, cipolla', prezzo: 7.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 10, nome: 'Prosciutto cotto e funghi', descrizione: 'Pomodoro, mozzarella, prosciutto cotto, funghi', prezzo: 8.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 11, nome: 'Appetitosa', descrizione: 'Mozzarella, prosciutto cotto, funghi, scaglie di grana', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 12, nome: 'Diavola', descrizione: 'Pomodoro, mozzarella, salame piccante', prezzo: 9.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 13, nome: 'Primavera', descrizione: 'Mozzarella, prosciutto cotto, olive, pomodorini freschi, insalata', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 14, nome: 'Bufala', descrizione: 'Pomodoro, mozzarella di bufala', prezzo: 9.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 15, nome: 'Tonno e cipolle', descrizione: 'Pomodoro, mozzarella, tonno, cipolle', prezzo: 9.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 16, nome: 'Vegetariana', descrizione: 'Pomodoro, mozzarella, melanzane, peperoni, zucchine', prezzo: 9.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 17, nome: 'Caprese', descrizione: 'Pomodoro, mozzarella di bufala, pomodorini', prezzo: 9.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 18, nome: 'Rucola', descrizione: 'Pomodoro, mozzarella di bufala, rucola', prezzo: 9.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 19, nome: 'Tonno', descrizione: 'Pomodoro, mozzarella, tonno', prezzo: 9.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 20, nome: 'Carciofi', descrizione: 'Pomodoro, mozzarella, carciofi', prezzo: 7.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 21, nome: 'Prosciutto cotto', descrizione: 'Pomodoro, mozzarella, prosciutto cotto', prezzo: 7.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 22, nome: 'Wurstel', descrizione: 'Pomodoro, mozzarella, wurstel', prezzo: 7.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 23, nome: 'Siciliana', descrizione: 'Pomodoro, acciughe, capperi, olive, origano', prezzo: 7.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 24, nome: 'Gorgonzola', descrizione: 'Pomodoro, mozzarella, gorgonzola', prezzo: 8.00, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 25, nome: 'Salsiccia', descrizione: 'Pomodoro, mozzarella, salsiccia', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 26, nome: 'Capricciosa', descrizione: 'Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 27, nome: 'Calzone normale', descrizione: 'Pomodoro, mozzarella, prosciutto cotto', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 28, nome: '4 Formaggi', descrizione: 'Pomodoro, mozzarella, gorgonzola, fontina, taleggio', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 29, nome: 'Peperoni', descrizione: 'Pomodoro, mozzarella, peperoni', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 30, nome: 'Calzone farcito', descrizione: 'Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi', prezzo: 9.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 31, nome: 'Snoopy', descrizione: 'Pomodoro, mozzarella, patatine fritte', prezzo: 8.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 32, nome: 'Prosciutto crudo', descrizione: 'Pomodoro, mozzarella, prosciutto crudo', prezzo: 9.50, categoria: 'Pizze Classiche', disponibile: 1 },
      { id: 33, nome: 'Patatine e wurstel', descrizione: 'Pomodoro, mozzarella, patatine fritte, wurstel', prezzo: 9.00, categoria: 'Pizze Classiche', disponibile: 1 },
      
      // Pizze Speciali
      { id: 34, nome: 'Sirena', descrizione: 'Mozzarella, pomodori datterini gialli, grana, basilico, crema di pomodoro rosso', prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 35, nome: 'Boh?', descrizione: 'Mozzarella, pomodori secchi, peperoni, salsiccia, scaglie di limone e foglioline di menta', prezzo: 14.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 36, nome: 'Mamma mia', descrizione: 'Pomodoro, mozzarella, scamorza, funghi, carciofi, cotto, peperoni, olive, würstel, salsiccia e patatine fritte', prezzo: 12.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 37, nome: 'Zola noci e pere', descrizione: 'Mozzarella, gorgonzola, noci e pere', prezzo: 10.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 38, nome: 'Pollo e patate', descrizione: 'Mozzarella, patate lesse, rosmarino e pancetta al forno', prezzo: 10.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 39, nome: 'Focaccia del corsaro', descrizione: 'Pomodorini, tonno, gamberetti, bufala, rucola, prosciutto crudo, sale, olio e origano', prezzo: 13.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 40, nome: 'Frutti di mare', descrizione: 'Pomodoro, mozzarella, frutti di mare, olive e origano', prezzo: 11.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 41, nome: 'Speciale', descrizione: 'Pomodoro, mozzarella, patate lesse, rosmarino e scaglie di grana', prezzo: 9.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 42, nome: 'Speck', descrizione: 'Pomodoro, mozzarella, speck', prezzo: 9.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 43, nome: 'Crudo e philadelphia', descrizione: 'Pomodoro, mozzarella, prosciutto crudo e philadelphia', prezzo: 10.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 44, nome: 'Bresaola e rucola', descrizione: 'Pomodoro, mozzarella, bresaola, rucola', prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 45, nome: 'Mediterranea', descrizione: 'Pomodoro, mozzarella, pomodori secchi e origano', prezzo: 10.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 46, nome: 'Estate', descrizione: 'Mozzarella, cipolla rossa, fiori di zucca, limone grattugiato e pancetta', prezzo: 12.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 47, nome: 'Salsiccia e scarola', descrizione: 'Mozzarella, scamorza, salsiccia e scarola', prezzo: 11.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 48, nome: "'Nduja bein", descrizione: "Pomodoro, mozzarella, 'nduja", prezzo: 13.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 49, nome: 'Speragi', descrizione: 'Mozzarella, crema di asparagi, noci, speck', prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 50, nome: 'Antichi sapori', descrizione: 'Mozzarella, scarola, olive nere, acciughe, capperi, salame piccante', prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 51, nome: 'Terra mia', descrizione: "Mozzarella, cipolla, 'nduja, bufala, gratuggiata di cacio ricotta", prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 52, nome: 'Salmone', descrizione: 'Pomodoro, mozzarella, salmone affumicato', prezzo: 12.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 53, nome: 'Palermo', descrizione: 'Pomodoro, mozzarella, bufala, würstel, salamino e origano', prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 54, nome: 'Profumo di venere', descrizione: 'Mozzarella, pomodori secchi, tonno, pancetta e scaglie di grana', prezzo: 11.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 55, nome: 'Sfiziosa', descrizione: 'Mozzarella, carciofini, pomodori secchi, bresaola, rucola e scaglie di grana', prezzo: 12.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 56, nome: 'Golden Rita', descrizione: 'Pomodorini gialli, mozzarella, pepe nero, gratuggiata di cacio ricotta, basilico', prezzo: 10.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 57, nome: 'Nutella', descrizione: 'Pane, nutella', prezzo: 7.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 58, nome: 'Tre pomodori', descrizione: 'Pomodoro, pomodorini rossi, pomodorini gialli, aglio, olio, origano e burrata', prezzo: 12.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 59, nome: 'Funghi porcini', descrizione: 'Pomodoro, mozzarella, funghi porcini', prezzo: 9.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 60, nome: 'Salsiccia e broccoli', descrizione: 'Mozzarella, salsiccia e friarielli napoletani', prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 61, nome: 'Gamberetti e rucola', descrizione: 'Pomodoro, mozzarella, gamberetti e rucola', prezzo: 11.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 62, nome: 'Pancetta e rucola', descrizione: 'Pomodoro, mozzarella, pancetta e rucola', prezzo: 10.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 63, nome: 'Bomber', descrizione: 'Mozzarella, emmental, salamino, crocchè di patate', prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 64, nome: 'Mordella', descrizione: 'Doppio impasto, olio, mortadella, pistacchio, stracciatella', prezzo: 12.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 65, nome: 'Friariello bellillo', descrizione: 'Mozzarella fior di latte, scamorza affumicata, salsiccia, crema di friarielli alla napoletana', prezzo: 12.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 66, nome: 'Speck & Brie', descrizione: 'Pomodoro, mozzarella, speck, brie', prezzo: 10.50, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 67, nome: 'Ciao inverno ciao', descrizione: 'Mozzarella, salsiccia, crema di tartufo, scaglie di tartufo', prezzo: 12.00, categoria: 'Pizze Speciali', disponibile: 1 },
      { id: 68, nome: 'Fiori di zucca', descrizione: 'Bufala, ricotta, fiori di zucca, coppa', prezzo: 11.00, categoria: 'Pizze Speciali', disponibile: 1 },
      
      // Mezzo Metro
      { id: 69, nome: 'Mezzo Metro - Margherita', descrizione: 'Pomodoro, mozzarella', prezzo: 18.00, categoria: 'Mezzo Metro', disponibile: 1 },
      { id: 70, nome: 'Mezzo Metro - Margherita + Misto', descrizione: 'Metà Margherita, metà quello che vuoi (qualsiasi gusto)', prezzo: 19.50, categoria: 'Mezzo Metro', disponibile: 1 },
      { id: 71, nome: 'Mezzo Metro - Qualsiasi gusto', descrizione: 'Tutto quello che vuoi', prezzo: 23.00, categoria: 'Mezzo Metro', disponibile: 1 },
      
      // Bevande
      { id: 72, nome: 'Coca Cola / Sprite / Fanta', descrizione: 'Lattina 33cl', prezzo: 3.50, categoria: 'Bevande', disponibile: 1 },
      { id: 73, nome: 'Birra piccola "33cl"', descrizione: 'Artigianali, Ichnusa', prezzo: 4.00, categoria: 'Bevande', disponibile: 1 },
      { id: 74, nome: 'Birra grande "66cl"', descrizione: 'Menabrea, Moretti', prezzo: 4.50, categoria: 'Bevande', disponibile: 1 },
      { id: 75, nome: 'Vino', descrizione: 'Rosso/Bianco - Bottiglia 75cl', prezzo: 15.00, categoria: 'Bevande', disponibile: 1 },
      { id: 76, nome: 'Acqua', descrizione: 'Naturale/Frizzante 75cl', prezzo: 2.00, categoria: 'Bevande', disponibile: 1 },
      { id: 77, nome: 'Caffè', descrizione: 'Espresso, decaffeinato', prezzo: 1.50, categoria: 'Bevande', disponibile: 1 },
      { id: 78, nome: 'Limoncello', descrizione: 'Digestivo al limone', prezzo: 1.50, categoria: 'Bevande', disponibile: 1 },
      
      // Dolci
      { id: 79, nome: 'Tiramisù della Casa', descrizione: 'Preparato secondo la ricetta tradizionale', prezzo: 5.50, categoria: 'Dolci', disponibile: 1 },
      { id: 80, nome: 'Panna Cotta', descrizione: 'Con frutti di bosco', prezzo: 4.50, categoria: 'Dolci', disponibile: 1 },
      { id: 81, nome: 'Gelato', descrizione: '3 palline - gusti assortiti', prezzo: 4.00, categoria: 'Dolci', disponibile: 1 }
    ]
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

// Funzioni database
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// API Routes

// Ottieni menu
app.get('/api/menu', (req, res) => {
  const db = readDB();
  const menu = db.menu.filter(item => item.disponibile === 1);
  res.json(menu);
});

// Crea nuovo ordine
app.post('/api/ordini', (req, res) => {
  const { cliente_nome, cliente_telefono, cliente_indirizzo, items, totale, orario_richiesto, note, tipo_ordine, metodo_pagamento } = req.body;
  
  // Genera numero ordine
  const timestamp = Date.now();
  const numero_ordine = `ORD${timestamp}`;
  
  try {
    const db = readDB();
    const nuovoOrdine = {
      id: db.ordini.length + 1,
      numero_ordine,
      cliente_nome,
      cliente_telefono,
      cliente_indirizzo: cliente_indirizzo || '',
      items,
      totale,
      stato: 'pending',
      orario_richiesto: orario_richiesto || '',
      orario_confermato: '',
      note: note || '',
      tipo_ordine: tipo_ordine || 'ritiro',
      metodo_pagamento: metodo_pagamento || null,
      timestamp: new Date().toISOString()
    };
    
    db.ordini.push(nuovoOrdine);
    writeDB(db);
    
    // Notifica pizzeria via Socket.io
    io.emit('nuovo-ordine', nuovoOrdine);
    
    res.json({ success: true, ordine: nuovoOrdine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ottieni tutti gli ordini
app.get('/api/ordini', (req, res) => {
  const db = readDB();
  res.json(db.ordini);
});

// Ottieni ordini pending
app.get('/api/ordini/pending', (req, res) => {
  const db = readDB();
  const ordiniPending = db.ordini.filter(o => o.stato === 'pending');
  res.json(ordiniPending);
});

// Accetta ordine
app.post('/api/ordini/:id/accetta', (req, res) => {
  const { id } = req.params;
  const { orario_confermato } = req.body;
  
  try {
    const db = readDB();
    const ordineIndex = db.ordini.findIndex(o => o.id === parseInt(id));
    
    if (ordineIndex === -1) {
      return res.status(404).json({ success: false, error: 'Ordine non trovato' });
    }
    
    db.ordini[ordineIndex].stato = 'accepted';
    db.ordini[ordineIndex].orario_confermato = orario_confermato || '';
    db.ordini[ordineIndex].timestamp_accettato = new Date().toISOString();
    
    writeDB(db);
    
    // Notifica cliente e pizzeria via Socket.io
    io.emit('ordine-aggiornato', db.ordini[ordineIndex]);
    io.emit('ordine-accettato', {
      ordineId: db.ordini[ordineIndex].id,
      numero_ordine: db.ordini[ordineIndex].numero_ordine,
      orario_confermato: orario_confermato,
      messaggio: `Il tuo ordine #${db.ordini[ordineIndex].numero_ordine} è stato accettato!${orario_confermato ? ' Orario di consegna: ' + orario_confermato : ''}`
    });
    
    res.json({ success: true, ordine: db.ordini[ordineIndex] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rifiuta ordine
app.post('/api/ordini/:id/rifiuta', (req, res) => {
  const { id } = req.params;
  
  try {
    const db = readDB();
    const ordineIndex = db.ordini.findIndex(o => o.id === parseInt(id));
    
    if (ordineIndex === -1) {
      return res.status(404).json({ success: false, error: 'Ordine non trovato' });
    }
    
    db.ordini[ordineIndex].stato = 'rejected';
    
    writeDB(db);
    
    // Notifica via Socket.io
    io.emit('ordine-aggiornato', db.ordini[ordineIndex]);
    
    res.json({ success: true, ordine: db.ordini[ordineIndex] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Aggiorna stato ordine
app.put('/api/ordini/:id', (req, res) => {
  const { id } = req.params;
  const { stato, orario_confermato } = req.body;
  
  try {
    const db = readDB();
    const ordineIndex = db.ordini.findIndex(o => o.id === parseInt(id));
    
    if (ordineIndex === -1) {
      return res.status(404).json({ success: false, error: 'Ordine non trovato' });
    }
    
    db.ordini[ordineIndex].stato = stato;
    if (orario_confermato) {
      db.ordini[ordineIndex].orario_confermato = orario_confermato;
    }
    
    writeDB(db);
    
    // Notifica cliente via Socket.io
    io.emit('ordine-aggiornato', db.ordini[ordineIndex]);
    
    res.json({ success: true, ordine: db.ordini[ordineIndex] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Socket.io per comunicazione real-time
io.on('connection', (socket) => {
  console.log('Client connesso:', socket.id);
  
  socket.on('pizzeria-connected', () => {
    console.log('Dashboard pizzeria connessa');
    socket.join('pizzeria');
  });
  
  socket.on('stampa-ordine', (ordineId) => {
    console.log('Richiesta stampa ordine:', ordineId);
    io.to('pizzeria').emit('stampa-richiesta', ordineId);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnesso:', socket.id);
  });
});

// Avvia server
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

server.listen(PORT, '0.0.0.0', () => {
  console.log('\n🍕 ====================================');
  console.log('🍕 SERVER PIZZERIA AVVIATO!');
  console.log('🍕 ====================================');
  
  if (isProduction) {
    console.log('\n🌐 Server Online:');
    console.log(`   🔗 URL: https://tuo-dominio.onrender.com`);
  } else {
    const localIP = '192.168.1.248';
    console.log(`\n💻 Computer (questo PC):`);
    console.log(`   📱 Cliente: http://localhost:${PORT}/client/index.html`);
    console.log(`   🖥️  Dashboard: http://localhost:${PORT}/pizzeria-dashboard/index.html`);
    console.log(`\n📱 Dispositivo Android (sulla stessa rete WiFi):`);
    console.log(`   📨 Dashboard Mobile: http://${localIP}:${PORT}/mobile`);
    console.log(`   🍕 Cliente: http://${localIP}:${PORT}/client/index.html`);
    console.log(`\n📌 IP Server: ${localIP}`);
  }
  
  console.log(`🔌 Porta: ${PORT}`);
  console.log('\n🟢 Pronto a ricevere ordini!\n');
});
