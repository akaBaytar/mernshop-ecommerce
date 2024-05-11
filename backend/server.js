import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDatabase from './config/database.js';

import product from './routes/product.js';
import user from './routes/user.js';
import order from './routes/order.js';
import upload from './routes/upload.js';

import { notFound, errorHandler } from './error/errorHandler.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDatabase(); // mongoDB

const app = express();

// middlewares
app.use(express.json()); // body raw json data parser
app.use(express.urlencoded({ extended: true })); // form urlencoded parser
app.use(cookieParser()); // cookie parser

app.get('/', (_, res) => res.send('API is running...'));

// routes
app.use('/api/v1/products', product);
app.use('/api/v1/users', user);
app.use('/api/v1/orders', order);
app.use('/api/v1/upload', upload);

// uploads
const __dirname = path.resolve(); // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// errors
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
