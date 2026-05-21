/**
 * CodeDNA
 * Conversation.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isGroup: { type: Boolean, default: false },
    groupName: { type: String },
    groupIcon: { type: String },
    groupDescription: { type: String, maxlength: 300 },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    groupModerators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: Date
    },
    lastMessageTime: { type: Date, default: Date.now },
    lastMessagePreview: { type: String },
    status: {
      type: String,
      enum: ['accepted', 'pending', 'declined', 'spam'],
      default: 'accepted'
    },
    messageRequestStatus: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'accepted'
    },
    messageRequestSentAt: { type: Date },
    pinnedMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    participantSettings: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      muted: { type: Boolean, default: false },
      mutedUntil: Date,
      archived: { type: Boolean, default: false },
      nickname: String,
      theme: { type: String, default: 'default' },
      unreadCount: { type: Number, default: 0 }
    }],
    disappearingMessages: {
      enabled: { type: Boolean, default: false },
      duration: { type: Number, default: 86400 },
      enabledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      enabledAt: Date
    },
    callLogs: [{
      type: { type: String, enum: ['audio', 'video'] },
      initiator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      duration: Number,
      startedAt: Date,
      endedAt: Date,
      status: { type: String, enum: ['completed', 'missed', 'declined', 'failed'] }
    }],
    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageTime: -1 });
conversationSchema.index({ 'participantSettings.user': 1 });
conversationSchema.index({ messageRequestStatus: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);
