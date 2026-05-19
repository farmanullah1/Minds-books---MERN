const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetType: {
      type: String,
      enum: ['Post', 'User', 'Comment', 'Message', 'Group'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'targetType',
    },
    reason: {
      type: String,
      enum: ['Spam', 'Nudity', 'Violence', 'Harassment', 'Hate Speech', 'Misinformation', 'Self-harm', 'Copyright', 'Fake account', 'Impersonation', 'Underage user', 'Other'],
      required: true,
    },
    details: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Action Taken', 'Dismissed'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    actionTaken: {
      type: String,
    },
    actionTakenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    actionTakenAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

// Prevent a user from reporting the exact same target multiple times
reportSchema.index({ reporter: 1, targetType: 1, targetId: 1 }, { unique: true });

module.exports = mongoose.model('Report', reportSchema);
