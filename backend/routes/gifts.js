/**
 * CodeDNA
 * gifts.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { sendGift, getMyGifts, getGiftItems } = require('../controllers/giftController');

router.get('/items', auth, getGiftItems);
router.get('/my', auth, getMyGifts);
router.post('/send', auth, sendGift);

module.exports = router;
