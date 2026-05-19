/**
 * CodeDNA
 * User.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
      maxlength: [200, 'Bio cannot exceed 200 characters'],
    },
    location: {
      city: { type: String, default: '' },
      country: { type: String, default: '' },
    },
    work: [
      {
        title: String,
        company: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        year: Number,
      },
    ],
    relationshipStatus: {
      type: String,
      enum: ['Single', 'In a relationship', 'Engaged', 'Married', 'It\'s complicated', 'In an open relationship', 'Widowed', 'Separated', 'Divorced', ''],
      default: '',
    },
    hometown: {
      type: String,
      default: '',
    },
    birthdate: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say', ''],
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    privacy: {
      messageRequests: { type: String, enum: ['Everyone', 'Friends', 'No one'], default: 'Everyone' },
      friendRequests: { type: String, enum: ['Everyone', 'Friends of Friends'], default: 'Everyone' }
    },
    anonymousQnA: {
      enabled: { type: Boolean, default: false },
      autoPost: { type: Boolean, default: false }
    },
    notifications: {
      newMessages: { type: Boolean, default: true },
      friendRequests: { type: Boolean, default: true },
      storyReplies: { type: Boolean, default: true },
      groupInvites: { type: Boolean, default: true },
      emailUpdates: { type: Boolean, default: true }
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    sentFriendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
      },
    ],
    lastActive: {
      type: Date,
      default: Date.now,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'banned'],
      default: 'active'
    },
    suspensionEnd: {
      type: Date,
      default: null
    },
    reportCount: {
      type: Number,
      default: 0
    },
    coins: {
      type: Number,
      default: 0
    },
    lastLoginReward: {
      type: Date,
      default: null
    },
    dailyActivity: {
      posts: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      lastReset: { type: Date, default: Date.now }
    },
    portfolio: {
      workSamples: [{ title: String, description: String, imageUrl: String, projectUrl: String, githubUrl: String }],
      skills: [{ name: String, endorsements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }],
      certifications: [{ title: String, organization: String, issueDate: Date, expiryDate: Date, certificateUrl: String }],
      recommendations: [{ from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String, date: { type: Date, default: Date.now } }],
      resumeUrl: { type: String, default: '' },
      isOpenToWork: { type: Boolean, default: false },
      isVerified: { type: Boolean, default: false },
      visibility: { type: String, enum: ['Public', 'Connections Only', 'Recruiters Only'], default: 'Public' }
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('User', userSchema);
