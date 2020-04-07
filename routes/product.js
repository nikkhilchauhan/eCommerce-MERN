const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../middleware/auth');
const { getUserById } = require('../middleware/user');
const { getProductById } = require('../middleware/product');

// Params
router.param('userId', getUserById);
router.param('productId', getProductById);

// Actual routes

module.exports = router;
