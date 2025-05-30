const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Créer une réservation
router.post('/', async (req, res) => {
  try {
    const resa = new Reservation(req.body);
    await resa.save();
    res.status(200).send(resa);
  } catch (err) {
    res.status(500).send('Erreur lors de la réservation');
  }
});

// Voir toutes les réservations d’un utilisateur
router.get('/:email', async (req, res) => {
  try {
    const resas = await Reservation.find({ preneurEmail: req.params.email });
    if (resas.length === 0) return res.status(404).send("Aucune réservation trouvée");
    res.send(resas);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Supprimer une réservation
router.delete('/:id', async (req, res) => {
  try {
    const resa = await Reservation.findByIdAndDelete(req.params.id);
    if (!resa) return res.status(404).send("Réservation non trouvée");
    res.send(resa);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Voir les réservations pour un objet donné
router.get('/objet/:id', async (req, res) => {
  try {
    const resas = await Reservation.find({ idObjet: req.params.id });
    if (resas.length === 0) return res.status(404).send("Aucune réservation pour cet objet");
    res.send(resas);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Vérifier si un utilisateur a déjà réservé un objet
router.get('/verifier', async (req, res) => {
  const { email, objetId } = req.query;
  try {
    const resa = await Reservation.findOne({ preneurEmail: email, idObjet: objetId });
    if (!resa) return res.status(404).send("Pas de réservation trouvée");
    res.send(resa);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
