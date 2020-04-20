const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../middleware/auth');
const { getUserById } = require('../middleware/user');
const { getProductById, photo } = require('../middleware/product');

// Params
router.param('userId', getUserById);
router.param('productId', getProductById);

// @route: POST /api/product/create/:userId
// @desc: create a new product
// @access: private/only admin
router.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// @route: GET /api/product/:productId
// @desc: get a product by it's Id
// @access: Public
router.get('/product/:productId', getProduct);

// @route: GET /api/product/photo/:productId
// @desc: get a product Image by it's Id
// @access: Public
router.get('/product/photo/:productId', photo);

// @route: PUT /api/product/:productId/:userId
// @desc: update a product by it's Id
// @access: private/onlyadmin
router.put(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// @route: DELETE /api/product/:productId/:userId
// @desc: delete a product by it's Id
// @access: private/only admin
router.delete(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// @route: GET /api/products/
// @desc: get all products
// @access: private/only admin
router.get('/products', getAllProducts);

router.get('/products/categories', getAllUniqueCategories);

module.exports = router;
