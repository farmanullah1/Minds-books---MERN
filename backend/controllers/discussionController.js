const DiscussionThread = require('../models/DiscussionThread');
const Group = require('../models/Group');

// @route   POST /api/discussions
// @desc    Create a new discussion thread in a group
// @access  Private
exports.createThread = async (req, res) => {
  try {
    const { groupId, title, content, category } = req.body;
    
    if (!groupId || !title || !content) {
      return res.status(400).json({ message: 'Group ID, title, and content are required' });
    }

    // Verify user is a member of the group
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    
    if (!group.members.includes(req.user.id) && !group.admins.includes(req.user.id)) {
      return res.status(403).json({ message: 'Must be a member to create a discussion' });
    }

    const thread = await DiscussionThread.create({
      group: groupId,
      creator: req.user.id,
      title,
      content,
      category: category || 'General'
    });

    const populatedThread = await DiscussionThread.findById(thread._id)
      .populate('creator', 'name profilePicture');

    res.status(201).json(populatedThread);
  } catch (error) {
    console.error('CreateThread error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/discussions/group/:groupId
// @desc    Get all discussion threads for a group
// @access  Private
exports.getGroupThreads = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { category } = req.query;

    const query = { group: groupId };
    if (category && category !== 'All') {
      query.category = category;
    }

    const threads = await DiscussionThread.find(query)
      .populate('creator', 'name profilePicture')
      .populate('replies.user', 'name profilePicture')
      .sort({ isPinned: -1, updatedAt: -1 });

    res.json(threads);
  } catch (error) {
    console.error('GetGroupThreads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   POST /api/discussions/:id/reply
// @desc    Reply to a discussion thread
// @access  Private
exports.replyToThread = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Reply text is required' });

    const thread = await DiscussionThread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    if (thread.isLocked) {
      return res.status(403).json({ message: 'This thread is locked' });
    }

    // Optional: verify membership here again
    
    thread.replies.push({ user: req.user.id, text });
    await thread.save();

    const updatedThread = await DiscussionThread.findById(thread._id)
      .populate('creator', 'name profilePicture')
      .populate('replies.user', 'name profilePicture');

    res.json(updatedThread);
  } catch (error) {
    console.error('ReplyToThread error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   PUT /api/discussions/:id/pin
// @desc    Pin or unpin a thread (admin only)
// @access  Private
exports.togglePinThread = async (req, res) => {
  try {
    const thread = await DiscussionThread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: 'Thread not found' });

    const group = await Group.findById(thread.group);
    if (!group.admins.includes(req.user.id)) {
      return res.status(403).json({ message: 'Only admins can pin threads' });
    }

    thread.isPinned = !thread.isPinned;
    await thread.save();

    res.json(thread);
  } catch (error) {
    console.error('TogglePinThread error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
