// Structured JSON logger for production observability
function formatLog(level, message, meta = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    service: 'foliolysis-backend',
    message,
    ...meta,
  };
  return JSON.stringify(logEntry);
}

const logger = {
  info: (msg, meta) => console.log(formatLog('info', msg, meta)),
  warn: (msg, meta) => console.warn(formatLog('warn', msg, meta)),
  error: (msg, meta) => console.error(formatLog('error', msg, meta)),
  debug: (msg, meta) => {
    if (process.env.NODE_ENV !== 'production' || process.env.DEBUG) {
      console.log(formatLog('debug', msg, meta));
    }
  },
};

// Express request logging middleware
function requestLogger(req, res, next) {
  const start = Date.now();
  const requestId = req.headers['x-request-id'] || 'req_' + Math.random().toString(36).substring(2, 9);
  req.requestId = requestId;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const meta = {
      requestId,
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode: res.statusCode,
      latencyMs: duration,
      ip: req.ip || req.socket?.remoteAddress,
      userAgent: req.headers['user-agent'],
    };

    if (res.statusCode >= 500) {
      logger.error(`HTTP ${req.method} ${meta.path} ${res.statusCode} (${duration}ms)`, meta);
    } else if (res.statusCode >= 400) {
      logger.warn(`HTTP ${req.method} ${meta.path} ${res.statusCode} (${duration}ms)`, meta);
    } else {
      logger.info(`HTTP ${req.method} ${meta.path} ${res.statusCode} (${duration}ms)`, meta);
    }
  });

  next();
}

module.exports = {
  logger,
  requestLogger,
};
