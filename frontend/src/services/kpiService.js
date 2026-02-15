/**
 * KPI Service - API calls for KPI endpoints
 */
import apiClient from './api';

export const kpiService = {
  /**
   * Get KPI summary data
   * @returns {Promise} KPI summary response
   */
  getSummary: async () => {
    const response = await apiClient.get('/kpi/summary');
    return response.data;
  },

  /**
   * Get SLA chart statistics
   * @returns {Promise} SLA chart data response
   */
  getSlaStats: async () => {
    const response = await apiClient.get('/kpi/charts/sla-stats');
    return response.data;
  },
};

export default kpiService;
