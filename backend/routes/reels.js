/**
 * CodeDNA
 * reels.js — Reels routing pathways
 * exports: Express router
 * used_by: server.js
 * rules: Protect all routes with auth middleware
 * agent: gemini-3-5-flash-high | google | 2026-05-20 | init | Initialized Reels router
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createReel,
  getReels,
  likeReel,
  commentReel
} = require('../controllers/reelController');

// All endpoints require user authentication
router.post('/', auth, createReel);
router.get('/', auth, getReels);
router.post('/:id/like', auth, likeReel);
router.post('/:id/comment', auth, commentReel);

module.exports = router;
