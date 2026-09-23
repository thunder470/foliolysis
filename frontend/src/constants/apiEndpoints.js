/**
 * Foliolysis Canonical API Endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    ME: '/api/auth/me',
    LOGOUT: '/api/auth/logout',
  },
  MARKET: {
    OVERVIEW: '/api/market/overview',
    HISTORY: (ticker) => `/api/market/history/${encodeURIComponent(ticker)}`,
  },
  BACKTEST: {
    RUN: '/api/backtest/run',
    HISTORY: '/api/backtest/history',
    REPORT: (id) => `/api/backtest/report/${id}`,
  },
  SIMULATION: {
    MONTE_CARLO: '/api/monte-carlo/simulate',
  },
  PORTFOLIO: {
    BASE: '/api/portfolios',
    BY_ID: (id) => `/api/portfolios/${id}`,
  },
  SYSTEM: {
    HEALTH: '/health',
    READY: '/ready',
  },
};

export default API_ENDPOINTS;
