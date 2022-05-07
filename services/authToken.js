const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcrypt");

module.exports.generateAccessToken = function(userData) {
  return jwt.sign({ user: userData, }, 
    process.env.TOKEN_SECRET, 
    { expiresIn: '3h' }
  );
}

module.exports.authenticateToken = function(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || req.cookies.access_token;

  if (token == null) return next ({
    status: 401,
    message: 'Unauthorized',
  });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return next ({
      status: 403,
      message: 'Token not Valid!',
    });
    req.user = user
    next()
  })
}