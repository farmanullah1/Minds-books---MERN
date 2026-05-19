const User = require('../models/User');
const Post = require('../models/Post');
const Group = require('../models/Group');

// Get admin dashboard metrics
exports.getMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsersToday = await User.countDocuments({
      lastActive: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    const totalPosts = await Post.countDocuments();
    const totalGroups = await Group.countDocuments();

    // Just basic metrics for now, we'll expand this later
    res.json({
      totalUsers,
      activeUsersToday,
      totalPosts,
      totalGroups,
      activeReports: 0, // Placeholder
      storageUsage: '1.2 GB', // Placeholder
    });
  } catch (error) {
    console.error('Metrics error:', error);
    res.status(500).json({ message: 'Server error fetching metrics' });
  }
};

// Get all users with filters
exports.getUsers = async (req, res) => {
  try {
    const { search, role, status, limit = 50, page = 1 } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) query.role = role;
    if (status) query.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Update user status (suspend/ban)
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, durationDays } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Don't allow changing another admin's status unless superadmin logic is added later
    if (user.role === 'admin' && req.adminUser._id.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Cannot modify another admin account' });
    }

    user.status = status;
    if (status === 'suspended' && durationDays) {
      user.suspensionEnd = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
    } else {
      user.suspensionEnd = null;
    }

    await user.save();
    res.json({ message: `User status updated to ${status}`, user });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error updating user status' });
  }
};

// Impersonate User
exports.impersonateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(403).json({ message: 'Cannot impersonate admin' });

    // Generate token for impersonated user
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user, message: `Impersonating ${user.name}` });
  } catch (error) {
    console.error('Impersonate error:', error);
    res.status(500).json({ message: 'Server error impersonating user' });
  }
};
