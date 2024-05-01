import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import PRODUCTS from './mock/products.js';

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (_, res) => res.send('API is running...'));

app.get('/api/v1/products', (_, res) => {
  res.json(PRODUCTS);
});

app.get('/api/v1/products/:id', (req, res) => {
  const id = req.params.id;
  const product = PRODUCTS.find((product) => product._id === id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
