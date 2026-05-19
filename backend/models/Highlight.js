const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: '',
  },
  stories: [{
    image: { type: String, default: '' },
    video: { type: String, default: '' },
    caption: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Highlight', highlightSchema);
