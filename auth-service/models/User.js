 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
