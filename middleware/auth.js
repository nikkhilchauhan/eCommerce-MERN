const expressJwt = require('express-jwt');

// MIDDLEWARE - Checks if user is loggedIn
// Protected routes
// @Note : expressJwt already has next methode in it
// @Note: auth hold _id
// @Note: handles response to next middleware
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  //@Note: 'auth' you can name it anything
  userProperty: 'auth',
});

// MIDDLEWARE - Can edit his/her own account only
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED!',
    });
  }
  next();
};

// MIDDLEWARE
exports.isAdmin = (req, res, next) => {
  if (req.profile.is_admin === 0) {
    return res.status(403).json({
      error: "you're not admin, ACCESS DENIED!",
    });
  }
  next();
};
