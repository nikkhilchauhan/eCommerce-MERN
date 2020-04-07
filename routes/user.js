const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../middleware/auth');
const User = require('../models/user');

// Params
router.param('userId', getUserById);

// @route: GET /api/user/:id
// @desc: get user
// @access: private
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

// @route: GET /api/user/:userId
// @desc: update user profile
// @access: private
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

// @route: GET /api/orders/user/:userId
// @desc: get user purchase list
// @access: private
router.get(
  '/orders/user/:userId',
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
