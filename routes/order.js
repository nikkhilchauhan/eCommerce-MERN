const express = require('express');
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require('../middleware/auth');
const {
  pushOrderInPurchaseList,
  getOrderById,
} = require('../middleware/order');
const { updateStock } = require('../middleware/product');
const { getUserById } = require('../middleware/user');

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderStatus,
} = require('../controllers/order');

// Params
router.param('userId', getUserById);
router.param('orderId', getOrderById);

// @route: POST /api/order/create/:userId
// @desc: create a new order
// @access: private
router.post(
  '/order/create/:userId',
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// @route: POST /api/order/all/:userId
// @desc: get all orders
// @access: private/only admin
router.get(
  '/order/all/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// @route: POST /api/order/status/:userId
// @desc: get order status
// @access: private/only admin
router.get(
  '/order/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

// @route: POST /api/order/:orderId/status/userId
// @desc: update order status
// @access: private/only admin
router.put(
  '/order/:orderId/status/userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
