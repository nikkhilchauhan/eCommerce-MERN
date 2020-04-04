const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const User = require('../models/user');
const Order = require('../models/order');

//MIDDLEWARE
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'no user found in database!',
      });
    }
    req.profile = user;
    next();
  });
};

//@desc: Get user by id
exports.getUser = (req, res) => {
  // @Note: assigned 'undefined' so that it does't sends back to user
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

// @desc: Get all users profile
// exports.getAllUsers = (req, res) => {
//   User.find().exec((err, users) => {
//     if (err || !users) {
//       return res.status(400).json({
//         error: 'no users found!',
//       });
//     }
//     res.json(users);
//   });
// };

// @desc: update user profile
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res
          .status(400)
          .json({ error: 'you are not authorized to update in database!' });
      }
      // @Note: assigned 'undefined' so that it does't sends back to user
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      return res.json(user);
    }
  );
};

// @desc: get user oders
exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .popupate('User', ['_id', 'first_name'])
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          err: 'no order found for this account!',
        });
      }
      return res.json(order);
    });
};

// Put purchas list
exports.pushOrderInPurchaseList = (req, res) => {
  let purchases = [];
  req,
    body.oder.products.foEach((product) => {
      purchases.unshift({
        _id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        amount: req.body.order.amount,
        transaction_id: req.body.order.transaction_id,
      });
    });
  // save to database
  User.findByIdAndUpdate(
    {
      _id: req.profile._id,
    },
    { $push: { purchases: purchases } },
    // @Note: 'new' gives new updated data back
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: 'unable to save purchase list!',
        });
      }
      next();
    }
  );
};
