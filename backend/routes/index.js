const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const marketRoutes = require('./market.routes');
const simulationRoutes = require('./simulation.routes');
const backtestRoutes = require('./backtest.routes');
const portfolioRoutes = require('./portfolio.routes');

function setupRoutes(app) {
  // Observability & Health Check Routes
  app.use('/', healthRoutes);

  // Authentication & Identity
  app.use('/api/auth', authRoutes);

  // Market Data & Overview
  app.use('/api/market', marketRoutes);

  // Quantitative Simulations & Stress Tests
  app.use('/api', simulationRoutes);

  // Strategy Backtest Execution & History
  app.use('/api/backtest', backtestRoutes);

  // Portfolio Management
  app.use('/api/portfolios', portfolioRoutes);
}

module.exports = setupRoutes;
