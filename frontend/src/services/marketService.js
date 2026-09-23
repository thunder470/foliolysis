import { api } from './apiClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const marketService = {
  /**
   * Fetches Indian market indices and top volume telemetry
   */
  async getOverview(options = {}) {
    return api.get(API_ENDPOINTS.MARKET.OVERVIEW, {
      staleTime: 20000,
      ...options,
    });
  },

  /**
   * Fetches historical OHLCV data for a specific ticker
   */
  async getHistory(ticker, period = '1y', options = {}) {
    const url = `${API_ENDPOINTS.MARKET.HISTORY(ticker)}?period=${period}`;
    return api.get(url, {
      staleTime: 60000,
      ...options,
    });
  },
};

export default marketService;
