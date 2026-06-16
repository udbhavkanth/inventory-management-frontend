import { useCallback, useEffect, useState } from 'react';
import * as orderService from '../services/orderService';
import { getErrorMessage } from '../utils/error';

export function useOrders({ skip = 0, limit = 10 } = {}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [orderDetails, setOrderDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const clearSuccess = useCallback(() => {
    setSuccessMessage('');
  }, []);

  const clearOrderDetails = useCallback(() => {
    setOrderDetails(null);
    setDetailsError(null);
    setDetailsLoading(false);
  }, []);

  const refreshOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await orderService.getOrders({ skip, limit });
      setOrders(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load orders'));
    } finally {
      setLoading(false);
    }
  }, [skip, limit]);

  const getOrderDetails = useCallback(async (id) => {
    setDetailsLoading(true);
    setDetailsError(null);
    setOrderDetails(null);

    try {
      const data = await orderService.getOrderById(id);
      setOrderDetails(data);
      return data;
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to load order details');
      setDetailsError(message);
      throw new Error(message);
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  const createOrder = useCallback(
    async (data) => {
      setSubmitting(true);
      setError(null);
      clearSuccess();

      try {
        const created = await orderService.createOrder(data);
        await refreshOrders();
        setSuccessMessage('Order created successfully.');
        return created;
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to create order');
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [refreshOrders, clearSuccess]
  );

  const cancelOrder = useCallback(
    async (id) => {
      setSubmitting(true);
      setError(null);
      clearSuccess();

      try {
        await orderService.deleteOrder(id);
        await refreshOrders();
        setSuccessMessage('Order cancelled successfully.');
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to cancel order');
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [refreshOrders, clearSuccess]
  );

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  return {
    orders,
    loading,
    submitting,
    error,
    successMessage,
    orderDetails,
    detailsLoading,
    detailsError,
    refreshOrders,
    createOrder,
    cancelOrder,
    getOrderDetails,
    clearSuccess,
    clearOrderDetails,
  };
}
