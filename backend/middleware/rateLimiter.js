const rateLimit = require('express-rate-limit');

// Rate limiter for authentication routes (login, register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per windowMs
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    error: 'Too many authentication attempts from this IP address. Please try again in 15 minutes.',
  },
});

// Rate limiter for CPU-intensive quantitative simulations (Monte Carlo, Backtests)
const simulationLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 45, // Limit each IP to 45 simulations per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Simulation rate limit exceeded. Please wait a moment before launching more stochastic runs.',
  },
});

// General API protection rate limiter
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200, // 200 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'API rate limit exceeded. Please slow down your requests.',
  },
});

module.exports = {
  authLimiter,
  simulationLimiter,
  generalLimiter,
};
