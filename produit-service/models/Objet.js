 
const mongoose = require('mongoose');

const objetSchema = new mongoose.Schema({
  titre: String,
  description: String,
  donneurEmail: String,
  etat: {
    type: String,
    enum: ['disponible', 'réservé', 'donné', 'retiré'],
    default: 'disponible'
  },
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Objet', objetSchema);

