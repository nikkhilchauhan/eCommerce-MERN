const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//@desc: SignUp a user
exports.signup = async (req, res) => {
  // console.log('REQUEST BODY', req.body);
  // Handling validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  // Saving to database
  const user = new User(req.body);
  try {
    await user.save();
    return res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'failed to save user in Database!',
    });
  }
};

// @desc: SignIn a user
exports.signin = (req, res) => {
  const { email, password } = req.body;
  // Handling validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'no user found, please signup first!',
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'invalid credentials!',
      });
    }
    // Creating token
    const authToken = jwt.sign({ _id: user._id }, process.env.SECRET);
    // Putting token in cookie
    res.cookie('x-auth-token', authToken, { expire: new Date() + 9999 });
    // Sending response to front end
    const { _id, first_name, last_name, email, is_admin } = user;
    return res.json({
      authToken,
      user: { _id, first_name, last_name, email, is_admin },
    });
  });
};

// SignOut controller
exports.signout = (req, res) => {
  res.clearCookie('x-auth-token');
  res.json({
    message: 'User signout successful',
  });
};
