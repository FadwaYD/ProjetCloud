const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) return res.status(401).send('Token manquant');

  // Accepte "Bearer eyJ..." ou juste "eyJ..."
  if (token.startsWith('Bearer ')) {
    token = token.slice(7); // Enlève "Bearer "
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send('Token invalide');
  }
};
