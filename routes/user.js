const express = require('express');
const router = express.Router();
const {
  getUser,
  updateUser,
  userPurchaseList,
} = require('../controllers/user');
const { isSignedIn, isAuthenticated } = require('../middleware/auth');
const { getUserById } = require('../middleware/user');

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
