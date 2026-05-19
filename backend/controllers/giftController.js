/**
 * CodeDNA
 * giftController.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const Gift = require('../models/Gift');
const User = require('../models/User');
const { createNotification } = require('./notificationController');

const GIFT_ITEMS = [
  { name: 'Gold Medal', icon: '🥇', price: 10, type: 'badge' },
  { name: 'Heart Sticker', icon: '💖', price: 5, type: 'sticker' },
  { name: 'Cool Glasses', icon: '😎', price: 8, type: 'sticker' },
  { name: 'Super Star', icon: '⭐', price: 15, type: 'badge' },
  { name: 'Rocket', icon: '🚀', price: 25, type: 'sticker' },
];

const sendGift = async (req, res) => {
  try {
    const { recipientId, itemName, message, postId, commentId } = req.body;

    const giftItem = GIFT_ITEMS.find(item => item.name === itemName);
    if (!giftItem) return res.status(400).json({ message: 'Invalid gift item' });

    const sender = await User.findById(req.user.id);
    if (sender.coins < giftItem.price) {
      return res.status(400).json({ message: 'Not enough coins' });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

    const gift = await Gift.create({
      sender: req.user.id,
      recipient: recipientId,
      type: giftItem.type,
      item: giftItem,
      message: message || '',
      post: postId || null,
      commentId: commentId || null
    });

    sender.coins -= giftItem.price;
    await sender.save();

    await createNotification(
      recipientId, 
      req.user.id, 
      'gift_received', 
      gift._id, 
      `sent you a ${giftItem.name} ${giftItem.icon}`
    );

    res.status(201).json({ message: 'Gift sent successfully!', coins: sender.coins, gift });
  } catch (error) {
    console.error('SendGift error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyGifts = async (req, res) => {
  try {
    const gifts = await Gift.find({ recipient: req.user.id })
      .populate('sender', 'name profilePicture')
      .sort({ createdAt: -1 });
    res.json(gifts);
  } catch (error) {
    console.error('GetMyGifts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getGiftItems = async (req, res) => {
  res.json(GIFT_ITEMS);
};

module.exports = { sendGift, getMyGifts, getGiftItems };
