require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Charger les routes
const route = require('./routes/reservation');
app.use('/reservation', route);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté à reservation-service"))
  .catch(err => console.error("Erreur de connexion MongoDB", err));

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Reservation service démarré sur le port ${port}`));
