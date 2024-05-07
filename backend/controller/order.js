import asyncHandler from '../middleware/asyncHandler.js';

import Order from '../models/Order.js';

// @desc      create new order
// @route     POST /api/v1/orders
// @access    private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);

    throw new Error('No order items.');
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),

      user: req.user._id,

      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc      get logged in in user orders
// @route     GET /api/v1/orders/my-orders
// @access    private
const getMyOrders = asyncHandler(async (req, res) => {
  const uid = req.user._id;
  const orders = await Order.find({ user: uid });
  res.status(200).json(orders);
});

// @desc      get order by id
// @route     GET /api/v1/orders/:id
// @access    private
const getOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id).populate('user', 'name email');

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found.');
  }
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
