const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { logger } = require('../utils/logger');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

let isMongoConnected = false;
const inMemoryUsers = new Map();
const inMemoryHistory = [];
let inMemoryPortfolios = [
  {
    _id: 'port_default_1',
    name: 'Tech Alpha Growth',
    description: 'High-conviction exposure to mega-cap semiconductor and cloud infrastructure leaders.',
    initialCapital: 100000,
    cashBalance: 8000,
    holdings: [
      { ticker: 'NVDA', name: 'NVIDIA Corp', shares: 250, avgPrice: 120.5, allocationPct: 35, sector: 'Semiconductors' },
      { ticker: 'AAPL', name: 'Apple Inc', shares: 120, avgPrice: 215.0, allocationPct: 25, sector: 'Consumer Tech' },
      { ticker: 'MSFT', name: 'Microsoft Corp', shares: 60, avgPrice: 410.2, allocationPct: 22, sector: 'Cloud & AI' },
      { ticker: 'TSLA', name: 'Tesla Inc', shares: 50, avgPrice: 205.0, allocationPct: 10, sector: 'Automotive & CleanTech' },
      { ticker: 'USD', name: 'Cash Reserves', shares: 8000, avgPrice: 1.0, allocationPct: 8, sector: 'Cash' },
    ],
    createdAt: new Date(),
  },
  {
    _id: 'port_default_2',
    name: 'All-Weather Macro Balanced',
    description: 'Risk-parity inspired allocation across equities, fixed income hedges, and inflation protectors.',
    initialCapital: 250000,
    cashBalance: 25000,
    holdings: [
      { ticker: 'SPY', name: 'SPDR S&P 500 ETF', shares: 180, avgPrice: 520.0, allocationPct: 40, sector: 'Broad Equity' },
      { ticker: 'TLT', name: 'iShares 20+ Year Treasury', shares: 400, avgPrice: 95.0, allocationPct: 25, sector: 'Fixed Income' },
      { ticker: 'GLD', name: 'SPDR Gold Shares', shares: 150, avgPrice: 220.0, allocationPct: 15, sector: 'Commodities' },
      { ticker: 'BTC-USD', name: 'Bitcoin', shares: 0.35, avgPrice: 62000.0, allocationPct: 10, sector: 'Digital Assets' },
      { ticker: 'USD', name: 'Cash Reserves', shares: 25000, avgPrice: 1.0, allocationPct: 10, sector: 'Cash' },
    ],
    createdAt: new Date(),
  },
];

// Seed initial memory demo user
(async () => {
  const defaultHash = await bcrypt.hash('AnshTrader@2026', 10);
  inMemoryUsers.set('ansh@foliolysis.in', {
    _id: 'usr_default_ansh',
    name: 'Ansh Trader',
    email: 'ansh@foliolysis.in',
    passwordHash: defaultHash,
    tier: 'Pro Tier',
    role: 'Quantitative Fund Manager',
    initialCapital: 3500000,
    handle: '@ansh_quant',
    createdAt: new Date(),
  });
})();

async function connectDB(mongoUri) {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    logger.info(`[MongoDB] Connected to database: ${mongoUri}`);

    // Seed default user if not exists
    const existingUser = await User.findOne({ email: 'ansh@foliolysis.in' });
    if (!existingUser) {
      const passwordHash = await User.hashPassword('AnshTrader@2026');
      await User.create({
        name: 'Ansh Trader',
        email: 'ansh@foliolysis.in',
        passwordHash,
        tier: 'Pro Tier',
        role: 'Quantitative Fund Manager',
        initialCapital: 3500000,
        handle: '@ansh_quant',
      });
      logger.info('[MongoDB] Seeded default user ansh@foliolysis.in');
    }

    const portCount = await Portfolio.countDocuments();
    if (portCount === 0) {
      await Portfolio.insertMany(inMemoryPortfolios.map((p) => ({ ...p, _id: undefined })));
      logger.info('[MongoDB] Seeded default portfolios.');
    }
  } catch (err) {
    isMongoConnected = false;
    logger.warn(`[MongoDB Notice] Operating with in-memory persistence fallback: ${err.message}`);
  }
}

module.exports = {
  connectDB,
  getIsMongoConnected: () => isMongoConnected,
  inMemoryUsers,
  inMemoryHistory,
  getInMemoryPortfolios: () => inMemoryPortfolios,
  setInMemoryPortfolios: (ports) => {
    inMemoryPortfolios = ports;
  },
};
