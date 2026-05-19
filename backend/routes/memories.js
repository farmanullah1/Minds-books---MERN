/**
 * CodeDNA
 * memories.js — AI Video Compilation
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { generateRemix } = require('../controllers/memoryController');

router.post('/remix', auth, generateRemix);

module.exports = router;
