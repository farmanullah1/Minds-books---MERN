/**
 * CodeDNA
 * LoginSession.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const mongoose = require('mongoose');

const loginSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      default: 'Unknown Device'
    },
    browser: {
      type: String,
      default: 'Unknown Browser'
    },
    location: {
      type: String,
      default: 'Unknown Location'
    },
    loginAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LoginSession', loginSessionSchema);
