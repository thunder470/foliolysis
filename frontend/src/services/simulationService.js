import { api } from './apiClient';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const simulationService = {
  /**
   * Triggers server-side Monte Carlo simulation run
   */
  async runMonteCarlo(params) {
    return api.post(API_ENDPOINTS.SIMULATION.MONTE_CARLO, params, {
      retries: 1,
    });
  },
};

export default simulationService;
