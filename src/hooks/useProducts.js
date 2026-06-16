import { useCallback, useEffect, useState } from 'react';
import * as productService from '../services/productService';
import { getErrorMessage } from '../utils/error';

export function useProducts({ skip = 0, limit = 10 } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const clearSuccess = useCallback(() => {
    setSuccessMessage('');
  }, []);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await productService.getProducts({ skip, limit });
      setProducts(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load products'));
    } finally {
      setLoading(false);
    }
  }, [skip, limit]);

  const createProduct = useCallback(
    async (data) => {
      setSubmitting(true);
      setError(null);
      clearSuccess();

      try {
        const created = await productService.createProduct(data);
        await refreshProducts();
        setSuccessMessage('Product created successfully.');
        return created;
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to create product');
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [refreshProducts, clearSuccess]
  );

  const updateProduct = useCallback(
    async (id, data) => {
      setSubmitting(true);
      setError(null);
      clearSuccess();

      try {
        const updated = await productService.updateProduct(id, data);
        await refreshProducts();
        setSuccessMessage('Product updated successfully.');
        return updated;
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to update product');
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [refreshProducts, clearSuccess]
  );

  const deleteProduct = useCallback(
    async (id) => {
      setSubmitting(true);
      setError(null);
      clearSuccess();

      try {
        await productService.deleteProduct(id);
        await refreshProducts();
        setSuccessMessage('Product deleted successfully.');
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to delete product');
        setError(message);
        throw new Error(message);
      } finally {
        setSubmitting(false);
      }
    },
    [refreshProducts, clearSuccess]
  );

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return {
    products,
    loading,
    submitting,
    error,
    successMessage,
    refreshProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    clearSuccess,
  };
}
