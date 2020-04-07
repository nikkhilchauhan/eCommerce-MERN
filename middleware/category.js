const Category = require('../models/Category');

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
