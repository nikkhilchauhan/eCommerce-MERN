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

// It will fetch photo in background
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// It updates Inventory - Sold & Stock
exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperation, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: 'Bulk operation failed: updating inventory!',
      });
    }
    next();
  });
};
