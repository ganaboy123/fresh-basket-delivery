const config = require('../config/env');
const jwt = require('jsonwebtoken');

const signToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

module.exports = { signToken };
