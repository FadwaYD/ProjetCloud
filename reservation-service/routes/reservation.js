 
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const verifyToken = require('../middleware/verifyToken');

// Réserver un objet
router.post('/', verifyToken, async (req, res) => {
  const resa = new Reservation(req.body);
  await resa.save();
  res.status(200).send(resa);
});
router.get('/', (req, res) => {
  res.send('✅ Le service de réservation fonctionne');
});

// Voir les réservations d’un utilisateur
router.get('/:email', verifyToken, async (req, res) => {
  const resas = await Reservation.find({ preneurEmail: req.params.email });
  if (!resas.length) return res.status(404).send("Aucune réservation");
  res.send(resas);
});

// Supprimer une réservation
router.delete('/:id', verifyToken, async (req, res) => {
  const resa = await Reservation.findByIdAndDelete(req.params.id);
  if (!resa) return res.status(404).send("Non trouvée");
  res.send(resa);
});

// Voir les réservations pour un objet
router.get('/objet/:id', verifyToken, async (req, res) => {
  const resas = await Reservation.find({ idObjet: req.params.id });
  if (!resas.length) return res.status(404).send("Aucune réservation");
  res.send(resas);
});

// Vérifier si utilisateur a réservé un objet
router.get('/verifier', verifyToken, async (req, res) => {
  const { email, objetId } = req.query;
  const resa = await Reservation.findOne({ preneurEmail: email, idObjet: objetId });
  if (!resa) return res.status(404).send("Non réservé");
  res.send(resa);
});

module.exports = router;
