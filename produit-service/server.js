 
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// Configuration
dotenv.config();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connecté - Produit Service"))
  .catch(err => console.log("❌ Erreur MongoDB :", err));

// Routes
app.use('/objet', require('./routes/objet'));

// Lancement du serveur
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🚀 Produit service démarré sur le port ${PORT}`));




