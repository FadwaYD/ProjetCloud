 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const reservationRoutes = require('./routes/reservation');
app.use('/reservation', reservationRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté - Reservation Service'))
  .catch(err => console.error('❌ Erreur MongoDB', err));

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`🚀 Reservation service actif sur le port ${port}`));
