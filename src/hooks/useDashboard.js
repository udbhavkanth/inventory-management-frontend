import { useCallback, useEffect, useState } from 'react';
import * as dashboardService from '../services/dashboardService';
import { getErrorMessage } from '../utils/error';

export function useDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await dashboardService.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load dashboard stats'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return {
    stats,
    loading,
    error,
    refreshStats,
  };
}
