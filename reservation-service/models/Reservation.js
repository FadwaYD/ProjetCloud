 
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  idObjet: mongoose.Schema.Types.ObjectId,
  preneurEmail: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
