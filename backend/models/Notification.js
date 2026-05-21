/**
 * CodeDNA
 * Notification.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'like',
        'love',
        'haha',
        'wow',
        'sad',
        'angry',
        'same',
        'proud',
        'thinking',
        'bookmark',
        'comment',
        'reply',
        'mention',
        'friend_request',
        'friend_accept',
        'marketplace',
        'endorsement',
        'reel_like',
        'reel_comment',
        'story_reaction',
        'story_reply',
        'group_invite',
        'post_collab_invite',
        'anonymous_question',
        'event_rsvp',
        'gift',
        'coin_tip',
        'system',
      ],
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    text: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    targetUrl: {
      type: String,
      default: '',
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries on a user's notifications
notificationSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
