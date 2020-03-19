const User = require('../models/user');

exports.signup = (req, res) => {
  // console.log('REQUEST BODY', req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: 'Failed to save user in Database!'
      });
    }
    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: 'User signout'
  });
};
