const dotenv = require('dotenv');

dotenv.config();

const requiredVars = ['MONGODB_URI', 'JWT_SECRET'];
requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toNumber(process.env.PORT, 5000),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3333',
  apiPrefix: process.env.API_PREFIX || '/api',
  defaultPageLimit: toNumber(process.env.DEFAULT_PAGE_LIMIT, 12),
  maxPageLimit: toNumber(process.env.MAX_PAGE_LIMIT, 50),
};

module.exports = config;
