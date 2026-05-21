/**
 * CodeDNA
 * Reel.js — Reel model schema
 * exports: Reel model
 * used_by: backend controller routes
 * rules: Follow project conventions
 * agent: gemini-3-5-flash-high | google | 2026-05-20 | init | Initialized Reel schema
 */

const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },
    musicName: {
      type: String,
      default: 'Original Audio',
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    sharesCount: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('Reel', reelSchema);
