import express from 'express';

import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/product.js';

import { admin, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
