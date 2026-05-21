/**
 * CodeDNA
 * notifications.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getVapidPublicKey,
  savePushSubscription,
  deletePushSubscription
} = require('../controllers/notificationController');

router.get('/', auth, getNotifications);
router.get('/vapid-public-key', auth, getVapidPublicKey);
router.post('/push-subscription', auth, savePushSubscription);
router.delete('/push-subscription', auth, deletePushSubscription);
router.put('/read-all', auth, markAllAsRead);
router.put('/:id/read', auth, markAsRead);

module.exports = router;
