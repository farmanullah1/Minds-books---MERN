const Article = require('../models/Article');
const User = require('../models/User');

exports.createArticle = async (req, res) => {
  try {
    const { title, content, coverImage, tags } = req.body;
    
    // Calculate read time (avg 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Create excerpt
    const excerpt = content.replace(/<[^>]+>/g, '').substring(0, 150) + '...';

    const article = await Article.create({
      author: req.user.id,
      title,
      content,
      excerpt,
      coverImage,
      tags: tags || [],
      readTimeMinutes
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const { tab = 'latest' } = req.query;
    let query = { status: 'published' };
    let sort = { createdAt: -1 };

    if (tab === 'trending') {
      sort = { views: -1, createdAt: -1 };
    } else if (tab === 'following') {
      const user = await User.findById(req.user.id);
      query.author = { $in: user.friends };
    }

    const articles = await Article.find(query)
      .populate('author', 'name profilePicture')
      .sort(sort)
      .limit(50);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name profilePicture')
      .populate('comments.user', 'name profilePicture');
      
    if (!article) return res.status(404).json({ message: 'Not found' });
    
    // Increment view count
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Not found' });

    const index = article.likes.indexOf(req.user.id);
    if (index === -1) {
      article.likes.push(req.user.id);
    } else {
      article.likes.splice(index, 1);
    }

    await article.save();
    res.json(article.likes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.commentArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Not found' });

    article.comments.push({
      user: req.user.id,
      text: req.body.text
    });

    await article.save();
    
    const updated = await Article.findById(article._id).populate('comments.user', 'name profilePicture');
    res.json(updated.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
