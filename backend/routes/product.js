import express from 'express';

import { getAllProducts, getProduct } from '../controller/product.js';

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/:id').get(getProduct);

export default router;
