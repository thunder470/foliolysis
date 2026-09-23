import { api } from './apiClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const backtestService = {
  /**
   * Executes backtest on backend/analytics engine
   */
  async runBacktest(params) {
    return api.post(API_ENDPOINTS.BACKTEST.RUN, params, {
      invalidateTags: ['/api/backtest/history'],
      retries: 0,
    });
  },

  /**
   * Retrieves past audited backtest history
   */
  async getHistory(options = {}) {
    return api.get(API_ENDPOINTS.BACKTEST.HISTORY, {
      staleTime: 15000,
      ...options,
    });
  },

  /**
   * Retrieves detailed dossier report by backtest ID
   */
  async getReport(id) {
    return api.get(API_ENDPOINTS.BACKTEST.REPORT(id), {
      staleTime: 60000,
    });
  },
};

export default backtestService;
