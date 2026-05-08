const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/env');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Unauthorized: token missing', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, config.jwtSecret);
  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw new AppError('Unauthorized: user not found', 401);
  }

  req.user = user;
  next();
});

module.exports = protect;
