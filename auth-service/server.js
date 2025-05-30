 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/user', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté - Auth Service'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`🚀 Auth service démarré sur le port ${port}`));
