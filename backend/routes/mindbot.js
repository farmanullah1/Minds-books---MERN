const express = require('express');
const rateLimit = require('express-rate-limit');
const { auth } = require('../middleware/auth');
const aiController = require('../controllers/aiController');

const router = express.Router();

const mindbotLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'MindBot is receiving too many messages. Please slow down for a moment.' },
  skip: () => process.env.NODE_ENV === 'test',
});

router.post('/chat', auth, mindbotLimiter, aiController.mindbotChat);

module.exports = router;
