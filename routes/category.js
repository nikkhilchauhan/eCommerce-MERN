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

// Actuall routes goes here
router.post(
  '/category/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get('/category/:categyId', getCategory);
router.get('/categories', getAllCategory);

router.put(
  '/category/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  '/category/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
