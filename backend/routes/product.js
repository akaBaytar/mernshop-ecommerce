import express from 'express';

import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product not found with id:${id}.` });
    }

    res.json(product);
  })
);

export default router;
