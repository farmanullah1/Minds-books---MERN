const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const aiController = require('../controllers/aiController');

// Protect all AI routes
router.use(auth);

// Smart Content Assistant routes
router.post('/enhance-post', aiController.enhancePost);
router.post('/suggest-replies', aiController.suggestReplies);
router.post('/generate-caption', aiController.generateCaption);

// Content Safety Scanner
router.post('/scan-content', aiController.scanContent);

// MindBot AI Chatbot
router.post('/mindbot', aiController.mindbotChat);

module.exports = router;
