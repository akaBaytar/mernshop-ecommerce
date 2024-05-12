import express from 'express';

import {
  getAllProducts,
  getProduct,
  getTopProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controller/product.js';

import { admin, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(protect, admin, createProduct);

router.route('/top-rated').get(getTopProducts)

router
  .route('/:id')
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;
