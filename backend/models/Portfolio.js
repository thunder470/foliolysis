const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
  ticker: { type: String, required: true, uppercase: true },
  name: { type: String, default: '' },
  shares: { type: Number, default: 0 },
  avgPrice: { type: Number, default: 0 },
  allocationPct: { type: Number, required: true },
  sector: { type: String, default: 'Technology' },
});

const PortfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    initialCapital: {
      type: Number,
      required: true,
      default: 100000,
    },
    cashBalance: {
      type: Number,
      default: 10000,
    },
    holdings: [HoldingSchema],
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Portfolio', PortfolioSchema);
