const express = require('express');
const router = express.Router();

const { signout } = require('../controllers/authentication');

router.get('/signout', signout);
module.exports = router;
