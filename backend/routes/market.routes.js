const express = require('express');
const axios = require('axios');
const { logger } = require('../utils/logger');

const router = express.Router();
const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://127.0.0.1:8000';

router.get('/overview', async (req, res) => {
  try {
    const response = await axios.get(`${ANALYTICS_SERVICE_URL}/market-overview`, { timeout: 10000 });
    return res.json(response.data);
  } catch (err) {
    logger.warn('[Market Overview Fallback Triggered]', { reason: err.message });
    return res.json({
      status: 'fallback',
      marketIndices: [
        { symbol: '^NSEI', name: 'NIFTY 50', price: 24823.15, change: 132.4, changePct: 0.54 },
        { symbol: '^BSESN', name: 'SENSEX', price: 81224.75, change: 387.2, changePct: 0.48 },
        { symbol: '^NSEBANK', name: 'BANK NIFTY', price: 51280.4, change: 245.1, changePct: 0.48 },
        { symbol: 'RELIANCE.NS', name: 'Reliance', price: 2984.5, change: 82.5, changePct: 2.84 },
      ],
      marketMovers: [
        { ticker: 'RELIANCE.NS', name: 'Reliance Industries', price: 2984.5, changePct: 2.84, volume: '14.2M', type: 'gainer' },
        { ticker: 'TCS.NS', name: 'Tata Consultancy Services', price: 4192.1, changePct: 1.62, volume: '8.4M', type: 'gainer' },
        { ticker: 'HDFCBANK.NS', name: 'HDFC Bank Ltd', price: 1682.35, changePct: 1.15, volume: '18.1M', type: 'gainer' },
        { ticker: 'INFY.NS', name: 'Infosys Ltd', price: 1895.4, changePct: -1.24, volume: '11.3M', type: 'loser' },
        { ticker: 'TATAMOTORS.NS', name: 'Tata Motors Ltd', price: 978.6, changePct: 3.45, volume: '22.8M', type: 'gainer' },
      ],
      marketSentiment: { vixIndex: 12.84, sentiment: 'Normal Volatility', advancingStocks: 66, decliningStocks: 34 },
    });
  }
});

module.exports = router;
