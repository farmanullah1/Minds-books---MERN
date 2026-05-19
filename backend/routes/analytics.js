/**
 * CodeDNA
 * analytics.js — Creator Analytics routes (PROMPT-59)
 * exports: express router
 * used_by: server.js
 * rules: Mounts authenticated endpoints returning overview, audience, content, and video detail analytics.
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getOverview,
  getContentAnalytics,
  getAudienceAnalytics,
  getVideoDetailAnalytics
} = require('../controllers/analyticsController');

router.get('/overview', auth, getOverview);
router.get('/content', auth, getContentAnalytics);
router.get('/audience', auth, getAudienceAnalytics);
router.get('/videos/:id', auth, getVideoDetailAnalytics);

module.exports = router;
