import { useCallback, useEffect, useState } from 'react';
import * as productService from '../services/productService';
import { getErrorMessage } from '../utils/error';

export function useProducts({ skip = 0, limit = 10 } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError(null);

      try {
        const created = await productService.createProduct(data);
        await refreshProducts();
        return created;
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to create product');
        setError(message);
        throw new Error(message);
      }
    },
    [refreshProducts]
  );

  const updateProduct = useCallback(
    async (id, data) => {
      setError(null);

      try {
        const updated = await productService.updateProduct(id, data);
        await refreshProducts();
        return updated;
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to update product');
        setError(message);
        throw new Error(message);
      }
    },
    [refreshProducts]
  );

  const deleteProduct = useCallback(
    async (id) => {
      setError(null);

      try {
        await productService.deleteProduct(id);
        await refreshProducts();
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to delete product');
        setError(message);
        throw new Error(message);
      }
    },
    [refreshProducts]
  );

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return {
    products,
    loading,
    error,
    refreshProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
