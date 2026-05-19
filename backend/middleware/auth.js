/**
 * CodeDNA
 * auth.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid or has expired' });
  }
};

const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  // First run the standard auth check
  auth(req, res, async () => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
      }
      
      // Optionally attach full user object for admin routes
      req.adminUser = user;
      next();
    } catch (error) {
      console.error('Admin Auth Error:', error);
      res.status(500).json({ message: 'Server error during admin verification' });
    }
  });
};

module.exports = { auth, adminAuth };
