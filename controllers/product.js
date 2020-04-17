const Product = require('../models/Product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: 'Problem with image!',
      });
    }

    // Destructure the fields
    // @Note: Here category means categoryID
    const { price, description, name, category, stock } = fields;
    const { photo } = file;

    if (!name || !description || !price || !category || !stock || !photo) {
      return res.status(400).json({
        error: 'Please include all fields!',
      });
    }

    let product = new Product(fields);

    //  Handle file here - if it has photo - but now i have made photo as mandetory
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: 'Too big file size. Must be less than 3Mb.',
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //   Save to database
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to save t-shirt in database!',
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  /* @Note: 'undefined' so that it loads faster, 
  we'll fetch image in background by using a middleware */
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: 'Problem with image!',
      });
    }
    // Updation code
    let product = req.product;
    product = _.extend(product, fields);
    //  Handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: 'Too big file size. Must be less than 3Mb!',
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //   Save to database
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to update t-shirt in database!',
        });
      }
      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({ error: 'Failed to delete product!' });
    }
    res.json({
      message: `Successfully deletd: ${product}`,
    });
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct('Category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({ error: 'No category found!' });
    }
    res.json(categories);
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: 'No product(s) found!',
        });
      }
      res.json(products);
    });
};
