const express = require('express');
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');
const { isSignedIn, isAuthenticated, isAdmin } = require('../middleware/auth');
const { getUserById } = require('../controllers/user');

// Params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

// @route: POST /api/category/create/:userId
// @desc: create a new category
// @access: private/only admin
router.post(
  '/category/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get('/category/:categyId', getCategory);
router.get('/categories', getAllCategory);

// @route: POST /api/category/:categoryId/:userId
// @desc: update a category
// @access: private/only admin
router.put(
  '/category/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// @route: POST /api/category/:categoryId/:userId
// @desc: delete a category
// @access: private/only admin
router.delete(
  '/category/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
