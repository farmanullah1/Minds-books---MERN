const AnonymousQuestion = require('../models/AnonymousQuestion');
const User = require('../models/User');
const Post = require('../models/Post');
const { createNotification } = require('./notificationController');

exports.getSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.anonymousQnA || { enabled: false, autoPost: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { enabled, autoPost } = req.body;
    const user = await User.findById(req.user.id);
    user.anonymousQnA = { enabled, autoPost };
    await user.save();
    res.json(user.anonymousQnA);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.submitQuestion = async (req, res) => {
  try {
    const { targetUserId, text } = req.body;
    
    if (!text || text.length > 300) {
      return res.status(400).json({ message: 'Question text must be 1-300 characters' });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser || !targetUser.anonymousQnA?.enabled) {
      return res.status(400).json({ message: 'User does not accept anonymous questions' });
    }

    const question = await AnonymousQuestion.create({
      targetUser: targetUserId,
      actualSenderId: req.user.id,
      questionText: text,
      status: targetUser.anonymousQnA.autoPost ? 'posted' : 'pending'
    });

    if (targetUser.anonymousQnA.autoPost) {
      // Auto-create a post
      await Post.create({
        user: targetUserId,
        content: `Someone asked me anonymously:\n"${text}"\n\n[Add your reply here...]`,
      });
    }

    // Notify the user (using system generic user ID or self ID for anon)
    await createNotification(targetUserId, targetUserId, 'anonymous_question', question._id, 'You received a new anonymous question!');

    res.status(201).json({ message: 'Question submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyQuestions = async (req, res) => {
  try {
    const questions = await AnonymousQuestion.find({ targetUser: req.user.id, status: 'pending' })
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.handleQuestion = async (req, res) => {
  try {
    const { action, replyText } = req.body; // 'post', 'reply', 'delete'
    const question = await AnonymousQuestion.findOne({ _id: req.params.id, targetUser: req.user.id });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (action === 'post') {
      question.status = 'posted';
      await Post.create({
        user: req.user.id,
        content: `Anonymous Question: "${question.questionText}"\n\nMy Reply: ${replyText || ''}`,
      });
    } else if (action === 'reply') {
      question.status = 'replied_privately';
      question.replyText = replyText;
      // You could notify actualSenderId here privately, but that breaks anonymity if the sender isn't expecting direct contact
    } else if (action === 'delete') {
      question.status = 'deleted';
    }

    await question.save();
    res.json({ message: 'Question handled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
