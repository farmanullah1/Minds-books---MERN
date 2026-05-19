/**
 * CodeDNA
 * DataExportRequest.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const mongoose = require('mongoose');

const dataExportRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Completed', 'Expired'],
      default: 'Pending',
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    downloadUrl: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
    dataTypes: {
      type: [String],
      default: ['Posts', 'Comments', 'Messages', 'Profile']
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DataExportRequest', dataExportRequestSchema);
