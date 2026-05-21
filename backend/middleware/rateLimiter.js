const rateLimit = require('express-rate-limit');

/**
 * authLimiter — apply to /api/auth/* routes.
 * Allows 10 requests per 3 minutes per IP.
 */
const authLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts, please try again after 3 minutes' },
  skip: (req) => process.env.NODE_ENV === 'test',
});

/**
 * apiLimiter — general limiter for all API routes.
 * 200 requests per minute per IP.
 */
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, slow down.' },
  skip: (req) => process.env.NODE_ENV === 'test',
});

module.exports = { authLimiter, apiLimiter };
