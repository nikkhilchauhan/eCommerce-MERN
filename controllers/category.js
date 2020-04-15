const Category = require('../models/category');

// @Note: req.category is comming from getCategoryById Middleware
// @desc: create a new categoy
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to save category in database!',
      });
    }
    res.json({ category });
  });
};

// @desc: get a category
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

// @desc: get all category
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: 'No categories found in database!',
      });
    }
    res.json(items);
  });
};

// @desc: update a category
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to update category or same category already exists!',
      });
    }
    res.json(updatedCategory);
  });
};

// @desc: delete a category
exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to delete category!',
      });
    }
    res.json({
      message: `Successfully deletd: ${category}`,
    });
  });
};

// Middleware
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: 'Category not found!',
      });
    }
    req.category = category;
    next();
  });
};
