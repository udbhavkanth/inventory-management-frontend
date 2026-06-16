import { useCallback, useEffect, useState } from 'react';
import * as orderService from '../services/orderService';
import { getErrorMessage } from '../utils/error';

export function useOrders({ skip = 0, limit = 10 } = {}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const createOrder = useCallback(
    async (data) => {
      setError(null);

      try {
        const created = await orderService.createOrder(data);
        await refreshOrders();
        return created;
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to create order');
        setError(message);
        throw new Error(message);
      }
    },
    [refreshOrders]
  );

  const deleteOrder = useCallback(
    async (id) => {
      setError(null);

      try {
        await orderService.deleteOrder(id);
        await refreshOrders();
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to delete order');
        setError(message);
        throw new Error(message);
      }
    },
    [refreshOrders]
  );

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  return {
    orders,
    loading,
    error,
    refreshOrders,
    createOrder,
    deleteOrder,
  };
}
