const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const User = require('../models/user');

// SignUp controller
exports.signup = (req, res) => {
  // console.log('REQUEST BODY', req.body);
  // Handling validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  // Saving to database
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(422).json({
        error: 'failed to save user in Database!'
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

// SignIn controller
exports.signin = (req, res) => {
  const { email, password } = req.body;
  // Handling validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: 'no user found, please signup first!'
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'invalid credentials!'
      });
    }
    // Creating token
    const authToken = jwt.sign({ _id: user._id }, process.env.SECRET);
    // Putting token in cookie
    res.cookie('authToken', authToken, { expire: new Date() + 9999 });
    // Sending response to front end
    const { _id, first_name, email, is_admin } = user;
    return res.json({ authToken, user: { _id, first_name, email, is_admin } });
  });
};

// SignOut controller
exports.signout = (req, res) => {
  res.clearCookie('authToken');
  res.json({
    message: 'User signout successful'
  });
};

// Protected routes
// @Note : expressJwt already has next methode in it
// @Note: auth hold _id
// @Note: handles response to next middleware
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth'
});

// Custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id === req.auth.id;
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED!'
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.is_admin === 0) {
    return res.status(403).json({
      error: "you're not admin, ACCESS DENIED!"
    });
  }
  next();
};
