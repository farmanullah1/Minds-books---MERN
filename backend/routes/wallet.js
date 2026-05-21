/**
 * CodeDNA
 * wallet.js — Wallet and Coin Economy routing pathways
 * exports: Express router
 * used_by: server.js
 * rules: Protect all routes with auth middleware
 */

const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getWallet,
  earnCoins,
  purchaseCoins,
  tipCreator,
} = require('../controllers/walletController');

// All endpoints require user authentication
router.get('/', auth, getWallet);
router.post('/earn', auth, earnCoins);
router.post('/purchase', auth, purchaseCoins);
router.post('/tip', auth, tipCreator);

module.exports = router;
