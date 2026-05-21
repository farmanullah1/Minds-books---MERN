/**
 * CodeDNA
 * walletController.js — Wallet and Coin Economy controller functions
 * exports: getWallet, earnCoins, purchaseCoins, tipCreator
 * used_by: backend routes
 * rules: Follow project conventions
 */

const Wallet = require('../models/Wallet');
const User = require('../models/User');
const { createNotification } = require('./notificationController');

// Helper to find or create wallet
const findOrCreateWallet = async (userId) => {
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = await Wallet.create({
      user: userId,
      balance: 1000, // Initial signup bonus
      transactions: [
        {
          type: 'earn',
          amount: 1000,
          description: 'Initial Onboarding Gold Coin Welcome Bonus',
        },
      ],
    });
  }
  return wallet;
};

// Fetch wallet stats and history
const getWallet = async (req, res) => {
  try {
    const wallet = await findOrCreateWallet(req.user.id);
    res.json(wallet);
  } catch (error) {
    console.error('getWallet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add coins when triggers fire (e.g. login, post, comment, game play)
const earnCoins = async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid coin amount is required to earn' });
    }

    const wallet = await findOrCreateWallet(req.user.id);
    wallet.balance += amount;
    wallet.transactions.push({
      type: 'earn',
      amount,
      description: description || 'Task Earning Activity Reward',
      date: new Date(),
    });

    await wallet.save();

    // Sync to User document for platform-wide consistency
    const user = await User.findById(req.user.id);
    if (user) {
      user.coins = (user.coins || 0) + amount;
      await user.save();
    }

    res.json(wallet);
  } catch (error) {
    console.error('earnCoins error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Buy coins (Simulated checkout)
const purchaseCoins = async (req, res) => {
  try {
    const { amount, costUSD } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Coin quantity is required' });
    }

    const wallet = await findOrCreateWallet(req.user.id);
    wallet.balance += amount;
    wallet.transactions.push({
      type: 'purchase',
      amount,
      description: `Simulated Coin Shop Purchase of ${amount} Gold Coins ($${costUSD || (amount / 100).toFixed(2)} USD)`,
      date: new Date(),
    });

    await wallet.save();

    // Sync to User document for platform-wide consistency
    const user = await User.findById(req.user.id);
    if (user) {
      user.coins = (user.coins || 0) + amount;
      await user.save();
    }

    res.json(wallet);
  } catch (error) {
    console.error('purchaseCoins error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Tip another creator (Transfer coins from sender to receiver)
const tipCreator = async (req, res) => {
  try {
    const { creatorId, amount } = req.body;
    if (!creatorId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Creator ID and coin amount are required' });
    }

    if (creatorId.toString() === req.user.id.toString()) {
      return res.status(400).json({ message: 'You cannot tip yourself' });
    }

    const senderWallet = await findOrCreateWallet(req.user.id);
    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient gold coin balance' });
    }

    const receiverWallet = await findOrCreateWallet(creatorId);
    const receiverUser = await User.findById(creatorId);
    if (!receiverUser) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    // Deduct from sender wallet
    senderWallet.balance -= amount;
    senderWallet.transactions.push({
      type: 'spend',
      amount,
      description: `Sent Tip to ${receiverUser.name}`,
      date: new Date(),
    });
    await senderWallet.save();

    // Credit to receiver wallet
    receiverWallet.balance += amount;
    receiverWallet.transactions.push({
      type: 'earn',
      amount,
      description: `Received Tip from ${req.user.name || 'Anonymous User'}`,
      date: new Date(),
    });
    await receiverWallet.save();

    // Sync to Sender's User document
    const senderUser = await User.findById(req.user.id);
    if (senderUser) {
      senderUser.coins = Math.max(0, (senderUser.coins || 0) - amount);
      await senderUser.save();
    }

    // Sync to Receiver's User document
    receiverUser.coins = (receiverUser.coins || 0) + amount;
    await receiverUser.save();

    // Trigger Notification to Receiver
    await createNotification(
      req.app.get('io'),
      creatorId,
      req.user.id,
      'tip',
      null,
      `sent you a gold tip of ${amount} Gold Coins! 💰🌟`
    );

    res.json(senderWallet);
  } catch (error) {
    console.error('tipCreator error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getWallet,
  earnCoins,
  purchaseCoins,
  tipCreator,
};
