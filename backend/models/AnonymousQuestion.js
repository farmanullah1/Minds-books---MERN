const mongoose = require('mongoose');

const anonymousQuestionSchema = new mongoose.Schema(
  {
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    actualSenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // For safety/admin tracking only. Not exposed to targetUser.
      required: true,
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, 'Question cannot exceed 300 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'posted', 'replied_privately', 'deleted'],
      default: 'pending',
    },
    replyText: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

anonymousQuestionSchema.index({ targetUser: 1, createdAt: -1 });

module.exports = mongoose.model('AnonymousQuestion', anonymousQuestionSchema);
