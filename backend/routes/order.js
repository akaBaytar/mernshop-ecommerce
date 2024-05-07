import express from 'express';

import {
  addOrderItems,
  getMyOrders,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controller/order.js';

import { admin, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
