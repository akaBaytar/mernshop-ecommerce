import asyncHandler from '../middleware/asyncHandler.js';

import Order from '../models/Order.js';

// @desc      create new order
// @route     POST /api/v1/orders
// @access    private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('add order items');
});

// @desc      get logged in in user orders
// @route     GET /api/v1/orders/my-orders
// @access    private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('get my orders');
});

// @desc      get order by id
// @route     GET /api/v1/orders/:id
// @access    private
const getOrder = asyncHandler(async (req, res) => {
  res.send('get order by id');
});

// @desc      update order to paid
// @route     PUT /api/v1/orders/:id/pay
// @access    private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid');
});

// @desc      update order to delivered
// @route     PUT /api/v1/orders/:id/deliver
// @access    private | admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered');
});

// @desc      get all orders
// @route     GET /api/v1/orders
// @access    private | admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders');
});

export {
  addOrderItems,
  getMyOrders,
  getOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
