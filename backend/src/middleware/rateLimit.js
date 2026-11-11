const rateLimit = require('express-rate-limit');

// Quote requests are public, so cap them per IP to limit spam.
exports.inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Try again in a few minutes.' },
});
