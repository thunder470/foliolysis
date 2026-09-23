const express = require('express');
const axios = require('axios');
const { getIsMongoConnected, inMemoryUsers } = require('../config/db');

const router = express.Router();
const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://127.0.0.1:8000';

router.get('/health', (req, res) => {
  const isMongoConnected = getIsMongoConnected();
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'foliolysis-backend',
    version: '2.5.0',
    database: isMongoConnected ? 'connected' : 'in-memory-fallback',
  });
});

router.get('/ready', async (req, res) => {
  let analyticsAvailable = false;
  try {
    const aCheck = await axios.get(`${ANALYTICS_SERVICE_URL}/health`, { timeout: 2500 });
    analyticsAvailable = aCheck.status === 200;
  } catch (e) {
    analyticsAvailable = false;
  }

  const isMongoConnected = getIsMongoConnected();
  const isReady = isMongoConnected || inMemoryUsers.size > 0;
  const statusCode = isReady ? 200 : 503;

  return res.status(statusCode).json({
    ready: isReady,
    checks: {
      backend: 'ok',
      database: isMongoConnected ? 'mongodb-connected' : 'in-memory-active',
      analyticsMicroservice: analyticsAvailable ? 'reachable' : 'degraded',
    },
    timestamp: new Date().toISOString(),
  });
});

router.get('/api/health', (req, res) => {
  const isMongoConnected = getIsMongoConnected();
  res.json({
    status: 'ok',
    version: '2.5.0',
    service: 'foliolysis-backend',
    database: isMongoConnected ? 'connected' : 'in-memory-fallback',
    analyticsUrl: ANALYTICS_SERVICE_URL,
  });
});

module.exports = router;
