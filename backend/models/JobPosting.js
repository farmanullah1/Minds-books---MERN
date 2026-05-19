/**
 * CodeDNA
 * JobPosting.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: true,
    },
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' }
    },
    deadline: {
      type: Date,
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
    isPromoted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: 'General'
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      default: 'Full-time'
    },
    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        appliedAt: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ['Applied', 'Viewed', 'Interview', 'Rejected', 'Hired'],
          default: 'Applied'
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('JobPosting', jobPostingSchema);
