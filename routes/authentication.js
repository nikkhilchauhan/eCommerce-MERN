const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { signout, signup } = require('../controllers/authentication');

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
    check('email', 'email is required!').isEmail(),
    check('password', 'password must be at least 6 character long!').isLength({
      min: 6
    })
  ],
  signup
);
router.get('/signout', signout);
module.exports = router;
