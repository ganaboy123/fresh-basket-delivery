const config = require('../config/env');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (config.nodeEnv !== 'test') {
    console.error(err);
  }

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    details: err.details,
    stack: config.nodeEnv === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
