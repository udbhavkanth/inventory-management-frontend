import { useCallback, useEffect, useState } from 'react';
import * as customerService from '../services/customerService';
import { getErrorMessage } from '../utils/error';

export function useCustomers({ skip = 0, limit = 10 } = {}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const clearSuccess = useCallback(() => {
    setSuccessMessage('');
  }, []);

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
      setSubmitting(true);
      setError(null);
      clearSuccess();

      try {
        const created = await customerService.createCustomer(data);
        await refreshCustomers();
        setSuccessMessage('Customer created successfully.');
        return created;
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to create customer');
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [refreshCustomers, clearSuccess]
  );

  const deleteCustomer = useCallback(
    async (id) => {
      setSubmitting(true);
      setError(null);
      clearSuccess();

      try {
        await customerService.deleteCustomer(id);
        await refreshCustomers();
        setSuccessMessage('Customer deleted successfully.');
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to delete customer');
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [refreshCustomers, clearSuccess]
  );

  useEffect(() => {
    refreshCustomers();
  }, [refreshCustomers]);

  return {
    customers,
    loading,
    submitting,
    error,
    successMessage,
    refreshCustomers,
    createCustomer,
    deleteCustomer,
    clearSuccess,
  };
}
