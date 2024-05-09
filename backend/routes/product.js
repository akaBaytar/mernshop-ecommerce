import express from 'express';

import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
} from '../controller/product.js';

import { admin, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProduct).put(protect, admin, updateProduct);

export default router;
