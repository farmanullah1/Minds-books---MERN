/**
 * CodeDNA
 * challengeController.js — daily prompts
 */

const Challenge = require('../models/Challenge');
const User = require('../models/User');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const CHALLENGE_PROMPTS = [
  "Share a photo of your morning coffee or tea ☕",
  "What is one thing you are grateful for today? 🙏",
  "Post a throwback photo from a year ago 📸",
  "Share a song that describes your current mood 🎵",
  "What's your favorite book or movie recommendation? 📚",
  "Share a picture of your workstation or desk 💻",
  "Post a photo of something green around you 🌿",
];

const getCurrentChallenge = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let challenge = await Challenge.findOne({ date: today });
    
    if (!challenge) {
      // Create new challenge if it doesn't exist for today
      const randomPrompt = CHALLENGE_PROMPTS[Math.floor(Math.random() * CHALLENGE_PROMPTS.length)];
      challenge = await Challenge.create({
        prompt: randomPrompt,
        date: today
      });
    }

    const userCompleted = challenge.participants.some(p => p.user.toString() === req.user.id);

    res.json({ challenge, userCompleted });
  } catch (error) {
    console.error('GetCurrentChallenge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const completeChallenge = async (req, res) => {
  try {
    const { postId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const challenge = await Challenge.findOne({ date: today });
    if (!challenge) return res.status(404).json({ message: 'No challenge found for today' });

    if (challenge.participants.some(p => p.user.toString() === req.user.id)) {
      return res.status(400).json({ message: 'Challenge already completed for today' });
    }

    challenge.participants.push({ user: req.user.id, postId });
    await challenge.save();

    const user = await User.findById(req.user.id);
    user.coins += 10;
    await user.save();

    res.json({ message: 'Challenge completed! You earned 10 coins.', coins: user.coins });
  } catch (error) {
    console.error('CompleteChallenge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCurrentChallenge, completeChallenge };
