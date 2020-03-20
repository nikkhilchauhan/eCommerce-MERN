const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  signout,
  signup,
  signin,
  isSignedIn
} = require('../controllers/authentication');

// SignUp route
router.post(
  '/signup',
  [
    check(
      'first_name',
      'first_name must be at least 3 character long!'
    ).isLength({ max: 32 }),
    check(
      'last_name',
      'last_name must be at least 3 character long!'
    ).isLength({ max: 32 }),
    check('email', 'email is not valid!').isEmail(),
    check('password', 'password must be at least 6 character long!').isLength({
      min: 6
    })
  ],
  signup
);

// SignIn route
router.post(
  '/signin',
  [
    check('email', 'invalid credentials!').isEmail(),
    check('password', 'invalid is credentials!').isLength({
      min: 6
    })
  ],
  signin
);

//SignUp route
router.get('/signout', signout);

// Test route
router.get('/test', isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
