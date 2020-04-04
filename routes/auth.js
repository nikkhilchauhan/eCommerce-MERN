const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signout, signup, signin } = require('../controllers/auth');
const { isSignedIn } = require('../middleware/auth');

// @route: POST /api/signup
// @desc: signup a user
// @access: public
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
    check('email', 'invalid credentials!').isEmail(),
    check('password', 'invalid is credentials!').isLength({
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
