const express = require('express');
const axios = require('axios');
const { logger } = require('../utils/logger');
const { simulationLimiter } = require('../middleware/rateLimiter');
const { backtestSchema, validate } = require('../validators/schemas');
const Backtest = require('../models/Backtest');
const { getIsMongoConnected, inMemoryHistory } = require('../config/db');

const router = express.Router();
const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://127.0.0.1:8000';

router.post('/run', simulationLimiter, validate(backtestSchema), async (req, res) => {
  try {
    const { ticker, shortWindow, longWindow, initialCapital, stopLossPct, rsiLower, rsiUpper } = req.validatedBody;
    const isMongoConnected = getIsMongoConnected();

    let formattedTicker = String(ticker).trim().toUpperCase();
    if (
      !formattedTicker.startsWith('^') &&
      !formattedTicker.endsWith('.NS') &&
      !formattedTicker.endsWith('.BO') &&
      !formattedTicker.includes('-')
    ) {
      formattedTicker = `${formattedTicker}.NS`;
    }

    const payload = {
      ticker: formattedTicker,
      shortWindow,
      longWindow,
      initialCapital,
      stopLossPct,
      rsiLower,
      rsiUpper,
    };

    logger.info(`Running backtest for ${formattedTicker} (${shortWindow}/${longWindow})`);

    let analyticsResponse;
    try {
      analyticsResponse = await axios.post(`${ANALYTICS_SERVICE_URL}/backtest`, payload, { timeout: 45000 });
    } catch (apiErr) {
      logger.error('Analytics backtest communication error', { error: apiErr.message });
      return res.status(502).json({
        error: 'Failed to communicate with Python Analytics Microservice.',
        details: apiErr.response ? apiErr.response.data : apiErr.message,
      });
    }

    const resultData = analyticsResponse.data;

    const recordData = {
      ticker: payload.ticker,
      shortWindow: payload.shortWindow,
      longWindow: payload.longWindow,
      initialCapital: payload.initialCapital,
      stopLossPct: payload.stopLossPct,
      metrics: resultData.metrics,
      aiRiskReport: resultData.aiRiskReport,
      status: 'SUCCESS',
      createdAt: new Date(),
    };

    if (isMongoConnected) {
      try {
        const savedDoc = await Backtest.create(recordData);
        recordData._id = savedDoc._id;
      } catch (dbErr) {
        logger.warn('MongoDB backtest save warning', { error: dbErr.message });
      }
    } else {
      recordData._id = 'mem_' + Date.now();
      inMemoryHistory.unshift(recordData);
      if (inMemoryHistory.length > 60) inMemoryHistory.pop();
    }

    return res.json({
      success: true,
      simulationId: recordData._id,
      ticker: payload.ticker,
      shortWindow: payload.shortWindow,
      longWindow: payload.longWindow,
      initialCapital: payload.initialCapital,
      stopLossPct: payload.stopLossPct,
      metrics: resultData.metrics,
      aiRiskReport: resultData.aiRiskReport,
      chartData: resultData.chartData,
      signals: resultData.signals,
    });
  } catch (err) {
    logger.error('Server error executing backtest', { error: err.message });
    return res.status(500).json({
      error: 'Internal server error executing backtest.',
      message: err.message,
    });
  }
});

router.get('/history', async (req, res) => {
  try {
    const isMongoConnected = getIsMongoConnected();
    if (isMongoConnected) {
      const records = await Backtest.find().sort({ createdAt: -1 }).limit(30);
      return res.json({ source: 'mongodb', records });
    }
    return res.json({ source: 'in-memory', records: inMemoryHistory });
  } catch (err) {
    logger.error('Failed to fetch history', { error: err.message });
    return res.status(500).json({ error: 'Failed to fetch history', message: err.message });
  }
});

module.exports = router;
