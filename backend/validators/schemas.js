const { z } = require('zod');

// Authentication schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name cannot exceed 80 characters'),
  email: z.string().email('Please provide a valid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password cannot exceed 100 characters'),
  tier: z.enum(['Pro Tier', 'Standard', 'Guest Sandbox']).optional().default('Pro Tier'),
  initialCapital: z.number().min(10000, 'Initial capital must be at least ₹10,000').optional().default(3500000),
});

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

// Backtest execution schema
const backtestSchema = z.object({
  ticker: z.string().min(1, 'Asset ticker is required').trim().max(30),
  shortWindow: z.coerce.number().int().min(2, 'Short window must be >= 2').max(200, 'Short window must be <= 200').default(20),
  longWindow: z.coerce.number().int().min(5, 'Long window must be >= 5').max(500, 'Long window must be <= 500').default(50),
  initialCapital: z.coerce.number().min(1000, 'Initial capital must be >= 1000').default(1000000),
  stopLossPct: z.coerce.number().min(0).max(50, 'Stop loss cannot exceed 50%').default(0.0),
  rsiLower: z.coerce.number().min(5).max(45).default(30),
  rsiUpper: z.coerce.number().min(55).max(95).default(70),
}).refine((data) => data.shortWindow < data.longWindow, {
  message: 'Short window must be strictly smaller than Long window',
  path: ['shortWindow'],
});

// Monte Carlo simulation schema
const monteCarloSchema = z.object({
  ticker: z.string().min(1, 'Asset ticker is required').trim().max(30).default('SPY'),
  days: z.coerce.number().int().min(10, 'Days horizon must be >= 10').max(1260, 'Days horizon must be <= 1260').default(252),
  simulations: z.coerce.number().int().min(50, 'Simulations must be >= 50').max(5000, 'Simulations capped at 5000 for server health').default(500),
  initialCapital: z.coerce.number().min(1000).default(10000),
  seed: z.coerce.number().int().optional(),
});

// Portfolio creation schema
const portfolioSchema = z.object({
  name: z.string().min(2, 'Portfolio name is required').max(100),
  description: z.string().max(500).optional().default(''),
  initialCapital: z.coerce.number().min(1000).default(100000),
  cashBalance: z.coerce.number().min(0).optional().default(10000),
  holdings: z.array(
    z.object({
      ticker: z.string().min(1),
      name: z.string().optional(),
      shares: z.coerce.number().min(0),
      avgPrice: z.coerce.number().min(0),
      allocationPct: z.coerce.number().min(0).max(100).optional(),
      sector: z.string().optional(),
    })
  ).optional().default([]),
});

// Validation middleware generator
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues || result.error.errors || [];
      const formattedErrors = issues.map((err) => ({
        field: Array.isArray(err.path) ? err.path.join('.') : 'body',
        message: err.message,
      }));
      return res.status(400).json({
        error: 'Validation failed',
        details: formattedErrors,
      });
    }
    req.validatedBody = result.data;
    next();
  };
}

module.exports = {
  registerSchema,
  loginSchema,
  backtestSchema,
  monteCarloSchema,
  portfolioSchema,
  validate,
};
