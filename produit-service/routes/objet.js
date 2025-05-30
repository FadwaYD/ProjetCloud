const express = require('express');
const router = express.Router();
const Objet = require('../models/Objet');
const verifyToken = require('../middleware/verifyToken'); // ✅ à mettre UNE seule fois

// ✅ Ajouter un objet (protégé)
router.post('/', verifyToken, async (req, res) => {
  try {
    const objet = new Objet(req.body);
    await objet.save();
    res.status(200).json(objet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Le reste des routes ici...

module.exports = router;
