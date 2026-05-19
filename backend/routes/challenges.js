/**
 * CodeDNA
 * challenges.js — daily prompts
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getCurrentChallenge, completeChallenge } = require('../controllers/challengeController');

router.get('/today', auth, getCurrentChallenge);
router.post('/complete', auth, completeChallenge);

module.exports = router;
