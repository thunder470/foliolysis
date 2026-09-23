const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

dotenv.config();

const { logger, requestLogger } = require('./utils/logger');
const { generalLimiter } = require('./middleware/rateLimiter');
const { connectDB } = require('./config/db');
const setupRoutes = require('./routes');

// Runtime Environment Configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foliolysis';
const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://127.0.0.1:8000';
const CORS_ORIGINS = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  logger.warn('JWT_SECRET is not set in production environment! Using fallback key is insecure.');
}

const app = express();

// Application Security (AppSec) Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
        connectSrc: ["'self'", 'http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:8000'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (CORS_ORIGINS.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error(`CORS origin ${origin} not permitted`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));

// Handle JSON parse errors safely
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON payload' });
  }
  next();
});

// Observability & Rate Limiting
app.use(requestLogger);
app.use('/api/', generalLimiter);

// Connect Database & In-Memory Fallback Store
connectDB(MONGO_URI);

// Register Modular Route Handlers
setupRoutes(app);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled application error', { error: err.stack || err.message, path: req.url });
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
    requestId: req.requestId,
  });
});

// Server Listen
app.listen(PORT, () => {
  logger.info(`====================================================`);
  logger.info(` foliolysis Enterprise API Server v2.5 running`);
  logger.info(` Listening on Port: ${PORT}`);
  logger.info(` Analytics Engine URL: ${ANALYTICS_SERVICE_URL}`);
  logger.info(` Security: Helmet + CORS + Cookie JWT + Rate Limiting Active`);
  logger.info(`====================================================`);
});

module.exports = app;
