const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * adminOnly — middleware that ensures the requester is an admin.
 * Must be used after auth middleware.
 */
const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('role');
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: admin access required' });
    }
    req.adminUser = user;
    next();
  } catch (err) {
    console.error('adminOnly error:', err);
    res.status(500).json({ message: 'Server error in adminOnly middleware' });
  }
};

module.exports = adminOnly;
