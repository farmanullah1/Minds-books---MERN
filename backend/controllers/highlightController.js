const Highlight = require('../models/Highlight');
const Story = require('../models/Story');

// @route   POST /api/highlights
// @desc    Create a new story highlight
// @access  Private
exports.createHighlight = async (req, res) => {
  try {
    const { title, storyIds } = req.body;
    
    if (!title || !storyIds || !Array.isArray(storyIds) || storyIds.length === 0) {
      return res.status(400).json({ message: 'Title and at least one story ID are required' });
    }

    // Fetch the stories to archive them
    const stories = await Story.find({ _id: { $in: storyIds }, user: req.user.id });
    
    if (stories.length === 0) {
      return res.status(404).json({ message: 'Stories not found or you do not have permission' });
    }

    // Map the stories into the highlight format
    const archivedStories = stories.map(s => ({
      image: s.image,
      video: s.video,
      caption: s.caption,
      createdAt: s.createdAt
    }));

    // Use the first story's image/video as the cover image if none provided
    const coverImage = archivedStories.find(s => s.image)?.image || archivedStories.find(s => s.video)?.video || '';

    const highlight = await Highlight.create({
      user: req.user.id,
      title,
      coverImage,
      stories: archivedStories
    });

    res.status(201).json(highlight);
  } catch (error) {
    console.error('CreateHighlight error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/highlights/user/:userId
// @desc    Get highlights for a specific user
// @access  Private
exports.getUserHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(highlights);
  } catch (error) {
    console.error('GetUserHighlights error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   DELETE /api/highlights/:id
// @desc    Delete a highlight
// @access  Private
exports.deleteHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findById(req.params.id);
    if (!highlight) {
      return res.status(404).json({ message: 'Highlight not found' });
    }

    if (highlight.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await highlight.deleteOne();
    res.json({ message: 'Highlight removed' });
  } catch (error) {
    console.error('DeleteHighlight error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
