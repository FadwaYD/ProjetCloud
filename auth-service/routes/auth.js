 
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Enregistrement
router.post('/register', async (req, res) => {
  const { nom, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send("Email déjà utilisé");

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ nom, email, password: hash });
  await user.save();
  res.status(200).send(user);
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(404).send("Identifiants invalides");

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  user.token = token;
  await user.save();
  res.status(200).send({ token });
});

// Récupérer un utilisateur
router.get('/:email', async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).send("Utilisateur non trouvé");
  res.send(user);
});

module.exports = router;
