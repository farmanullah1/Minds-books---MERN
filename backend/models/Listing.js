const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const listingSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Listing title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Listing description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Digital Perks', 'Electronics', 'Books', 'Fashion', 'Services']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['New', 'Like New', 'Good', 'Fair']
  },
  status: {
    type: String,
    enum: ['Active', 'Sold', 'Pending'],
    default: 'Active'
  },
  saves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  offers: [offerSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Listing', listingSchema);
