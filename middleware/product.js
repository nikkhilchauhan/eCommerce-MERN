const Product = require('../models/Product');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate('Category')
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: 'Product not found!',
        });
      }
      req.product = product;
      next();
    });
};
