/**
 * CodeDNA
 * reelController.js — Reels controller functions
 * exports: createReel, getReels, likeReel, commentReel
 * used_by: backend routes
 * rules: Follow project conventions
 * agent: gemini-3-5-flash-high | google | 2026-05-20 | init | Initialized Reel controller
 */

const Reel = require('../models/Reel');
const { createNotification } = require('./notificationController');

// Create a new Reel short-video
const createReel = async (req, res) => {
  try {
    const { videoUrl, caption, musicName, startTrim, endTrim, filterName } = req.body;
    if (!videoUrl) {
      return res.status(400).json({ message: 'Video URL is required to create a reel' });
    }

    const reel = await Reel.create({
      user: req.user.id,
      videoUrl,
      caption: caption || '',
      musicName: musicName || 'Original Audio',
      startTrim: Number(startTrim) || 0,
      endTrim: Number(endTrim) || 0,
      filterName: filterName || 'Original'
    });

    const populatedReel = await reel.populate('user', 'name profilePicture');
    res.status(201).json(populatedReel);
  } catch (error) {
    console.error('createReel error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch Reels feed
const getReels = async (req, res) => {
  try {
    const reels = await Reel.find()
      .populate('user', 'name profilePicture')
      .sort({ createdAt: -1 });
    res.json(reels);
  } catch (error) {
    console.error('getReels error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Like or unlike a Reel
const likeReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }

    const userId = req.user.id;
    const isLiked = reel.likes.some(id => id.toString() === userId.toString());

    if (isLiked) {
      // Unlike
      reel.likes = reel.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like
      reel.likes.push(userId);
      // Trigger notification
      await createNotification(
        req.app.get('io'),
        reel.user,
        userId,
        'reel_like',
        null,
        'liked your reel short video'
      );
    }

    await reel.save();
    const updatedReel = await Reel.findById(req.params.id).populate('user', 'name profilePicture');
    res.json(updatedReel);
  } catch (error) {
    console.error('likeReel error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Comment on a Reel
const commentReel = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const reel = await Reel.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }

    const comment = {
      user: req.user.id,
      text,
      createdAt: new Date()
    };

    reel.comments.push(comment);
    await reel.save();

    // Trigger notification
    await createNotification(
      req.app.get('io'),
      reel.user,
      req.user.id,
      'reel_comment',
      null,
      `commented on your reel: "${text.substring(0, 30)}"`
    );

    const updatedReel = await Reel.findById(req.params.id)
      .populate('user', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');

    res.status(201).json(updatedReel);
  } catch (error) {
    console.error('commentReel error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createReel,
  getReels,
  likeReel,
  commentReel
};
