import express from 'express';
import dotenv from 'dotenv';

import connectDatabase from './config/database.js';

import product from './routes/product.js';

import { notFound, errorHandler } from './error/errorHandler.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDatabase(); // mongoDB

const app = express();

app.get('/', (_, res) => res.send('API is running...'));

// routes
app.use('/api/v1/products', product);

// errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
