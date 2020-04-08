const User = require('../models/User');
const Order = require('../models/Order');

// @Note: req.profile is comming from getUserById Middleware

//@desc: Get user by id
exports.getUser = (req, res) => {
  // @Note: assigned 'undefined' so that it does't sends back to user
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

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
