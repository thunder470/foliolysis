const express = require('express');
const axios = require('axios');
const { logger } = require('../utils/logger');
const { simulationLimiter } = require('../middleware/rateLimiter');
const { monteCarloSchema, validate } = require('../validators/schemas');

const router = express.Router();
const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://127.0.0.1:8000';

const handleMonteCarlo = async (req, res) => {
  try {
    const payload = req.validatedBody;
    logger.info('Forwarding Monte Carlo Simulation', payload);

    const response = await axios.post(`${ANALYTICS_SERVICE_URL}/monte-carlo`, payload, { timeout: 30000 });
    return res.json(response.data);
  } catch (err) {
    logger.error('Monte Carlo Simulation Error', { error: err.message });
    return res.status(502).json({
      error: 'Failed to compute Monte Carlo simulation on analytics cluster.',
      details: err.response?.data || err.message,
    });
  }
};

// Mount handlers
router.post('/analytics/monte-carlo', simulationLimiter, validate(monteCarloSchema), handleMonteCarlo);
router.post('/monte-carlo', simulationLimiter, validate(monteCarloSchema), handleMonteCarlo);

// Macroeconomic Stress Testing Scenario Endpoint
router.all('/analytics/stress-test', (req, res) => {
  const scenario = req.body?.scenario || req.query?.scenario || 'rate-hike';
  const scenarios = {
    'rate-hike': {
      name: 'Interest Rate Hike (+50 bps)',
      impact: -8.4,
      varRatio: 13.3,
      cvarRatio: 8.4,
      portfolioRatio: 45.3,
      cashRatio: 33.0,
      drawdownTrajectory: [0, -1.8, -3.2, -5.6, -8.4, -7.2, -6.5, -5.1, -4.2],
    },
    'market-crash': {
      name: 'Black Swan Market Crash',
      impact: -24.6,
      varRatio: 26.5,
      cvarRatio: 16.2,
      portfolioRatio: 38.0,
      cashRatio: 19.3,
      drawdownTrajectory: [0, -4.5, -9.8, -16.4, -24.6, -23.1, -21.0, -18.8, -17.5],
    },
    'risk-common': {
      name: 'Emerging Market Currency Shock',
      impact: -12.8,
      varRatio: 17.8,
      cvarRatio: 11.5,
      portfolioRatio: 42.1,
      cashRatio: 28.6,
      drawdownTrajectory: [0, -2.4, -4.8, -8.1, -12.8, -11.5, -10.2, -9.1, -8.0],
    },
    'tech-shock': {
      name: 'Tech & AI Valuation Pullback',
      impact: -18.2,
      varRatio: 21.0,
      cvarRatio: 14.0,
      portfolioRatio: 41.5,
      cashRatio: 23.5,
      drawdownTrajectory: [0, -3.1, -7.2, -12.5, -18.2, -16.4, -15.0, -13.2, -12.1],
    },
  };
  const selected = scenarios[scenario] || scenarios['rate-hike'];
  return res.json({ success: true, scenario: selected });
});

module.exports = router;
