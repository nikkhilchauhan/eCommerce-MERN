const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signout, signup, signin } = require('../controllers/auth');

// @route: POST /api/signup
// @desc: signup a user
// @access: public
router.post(
  '/signup',
  [
    check(
      'first_name',
      'First name must be at least 3 character long!'
    ).isLength({ min: 3, max: 32 }),
    check(
      'last_name',
      'Last name must be at least 3 character long!'
    ).isLength({ min: 3, max: 32 }),
    check('email', 'Email is not valid!').isEmail(),
    check('password', 'Password must be at least 6 character long!').isLength({
      min: 6,
    }),
  ],
  signup
);

// @route: POST /api/signin
// @desc: signin a user
// @access: public
router.post(
  '/signin',
  [
    check('email', 'Invalid credentials!').isEmail(),
    check('password', 'Invalid credentials!').isLength({
      min: 6,
    }),
  ],
  signin
);

// @route: GET /api/signout
// @desc: signout a user
// @access: private
router.get('/signout', signout);

module.exports = router;
