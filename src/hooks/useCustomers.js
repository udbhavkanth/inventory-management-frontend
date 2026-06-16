import { useCallback, useEffect, useState } from 'react';
import * as customerService from '../services/customerService';
import { getErrorMessage } from '../utils/error';

export function useCustomers({ skip = 0, limit = 10 } = {}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await customerService.getCustomers({ skip, limit });
      setCustomers(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load customers'));
    } finally {
      setLoading(false);
    }
  }, [skip, limit]);

  const createCustomer = useCallback(
    async (data) => {
      setError(null);

      try {
        const created = await customerService.createCustomer(data);
        await refreshCustomers();
        return created;
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to create customer');
        setError(message);
        throw new Error(message);
      }
    },
    [refreshCustomers]
  );

  const deleteCustomer = useCallback(
    async (id) => {
      setError(null);

      try {
        await customerService.deleteCustomer(id);
        await refreshCustomers();
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to delete customer');
        setError(message);
        throw new Error(message);
      }
    },
    [refreshCustomers]
  );

  useEffect(() => {
    refreshCustomers();
  }, [refreshCustomers]);

  return {
    customers,
    loading,
    error,
    refreshCustomers,
    createCustomer,
    deleteCustomer,
  };
}
