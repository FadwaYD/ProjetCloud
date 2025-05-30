 
const verifyToken = require('../middleware/verifyToken');
router.post('/', verifyToken, async (req, res) => {
  // Seul un utilisateur authentifié peut ajouter un objet
});
