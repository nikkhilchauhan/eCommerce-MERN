const User = require('../models/User');

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
