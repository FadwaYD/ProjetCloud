const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;

// Proxy vers auth-service (à adapter si le port diffère)
app.use('/api/auth', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' },
}));

// Proxy vers produit-service (à adapter aussi)
app.use('/api/produits', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/produits': '' },
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
