/**
 * CodeDNA
 * Wallet.js — Wallet model schema with Transaction History
 * exports: Wallet model
 * used_by: backend controller routes
 * rules: Follow project conventions
 */

const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      default: 1000, // Initial gold coins reward
    },
    transactions: [
      {
        type: {
          type: String,
          enum: ['earn', 'spend', 'transfer', 'purchase'],
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          default: '',
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model('Wallet', walletSchema);
