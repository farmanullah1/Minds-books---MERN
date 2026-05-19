/**
 * CodeDNA
 * Gift.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['sticker', 'badge'],
      required: true,
    },
    item: {
      name: String,
      icon: String,
      price: Number,
    },
    message: {
      type: String,
      default: '',
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    commentId: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gift', giftSchema);
