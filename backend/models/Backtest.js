const mongoose = require('mongoose');

const BacktestSchema = new mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    shortWindow: {
      type: Number,
      required: true,
      default: 20,
    },
    longWindow: {
      type: Number,
      required: true,
      default: 50,
    },
    initialCapital: {
      type: Number,
      required: true,
      default: 10000,
    },
    stopLossPct: {
      type: Number,
      default: 0,
    },
    metrics: {
      cagr: { type: Number, default: 0 },
      sharpeRatio: { type: Number, default: 0 },
      sortinoRatio: { type: Number, default: 0 },
      maxDrawdown: { type: Number, default: 0 },
      totalReturnPct: { type: Number, default: 0 },
      benchmarkReturnPct: { type: Number, default: 0 },
      annualizedVolatility: { type: Number, default: 0 },
      alpha: { type: Number, default: 0 },
      beta: { type: Number, default: 1 },
      profitFactor: { type: Number, default: 1 },
      finalPortfolioValue: { type: Number, default: 0 },
      totalTrades: { type: Number, default: 0 },
      winRate: { type: Number, default: 0 },
    },
    aiRiskReport: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILED'],
      default: 'SUCCESS',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Backtest', BacktestSchema);
