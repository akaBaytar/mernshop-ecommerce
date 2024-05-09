import express from 'express';

import {
  getAllProducts,
  getProduct,
  createProduct,
} from '../controller/product.js';

import { admin, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProduct);

export default router;
