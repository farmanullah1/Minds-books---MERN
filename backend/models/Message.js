/**
 * CodeDNA
 * Message.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    mediaUrl: {
      type: String,
      default: '',
    },
    mediaType: {
      type: String,
      enum: ['image', 'video', 'audio', 'document', 'voice', 'gif', 'sticker', 'location', 'story_reply', ''],
      default: '',
    },
    mediaMetadata: {
      fileName: { type: String },
      fileSize: { type: Number },
      mimeType: { type: String },
      width: { type: Number }, // for images/videos
      height: { type: Number }, // for images/videos
      duration: { type: Number }, // for audio/video
      thumbnailUrl: { type: String },
      pages: { type: Number }
    },
    thumbnailUrl: { type: String }, // for video thumbnails
    linkPreview: {
      url: String,
      title: String,
      description: String,
      image: String,
      domain: String,
    },
    location: {
      lat: Number,
      lng: Number,
      name: String,
      address: String,
      mapImageUrl: String,
    },
    repliedToPreview: {
      text: String,
      mediaType: String,
      senderName: String,
    },
    isForwarded: { type: Boolean, default: false },
    forwardedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    reactions: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      emoji: String,
      reactedAt: { type: Date, default: Date.now },
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    repliedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Story',
    },
    deliveredAt: {
      type: Date,
    },
    deliveredTo: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      deliveredAt: { type: Date, default: Date.now },
    }],
    readAt: {
      type: Date,
    },
    isEdited: { type: Boolean, default: false },
    editedAt: Date,
    originalText: String,
    isPinned: { type: Boolean, default: false },
    pinnedAt: Date,
    pinnedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isSystem: { type: Boolean, default: false },
    systemAction: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ isDeleted: 1 });
messageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
messageSchema.index({ 'reactions.user': 1 });

module.exports = mongoose.model('Message', messageSchema);
