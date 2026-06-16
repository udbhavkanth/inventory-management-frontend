import { useState } from 'react';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import SuccessMessage from '../components/common/SuccessMessage';
import ProductForm from '../components/products/ProductForm';
import ProductTable from '../components/products/ProductTable';
import { useProducts } from '../hooks/useProducts';

function Products() {
  const [editingProduct, setEditingProduct] = useState(null);
  const {
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
  } = useProducts();

  const handleCreate = async (data) => {
    try {
      await createProduct(data);
    } catch {
      // Error handled by hook
    }
  };

  const handleUpdate = async (data) => {
    if (!editingProduct) {
      return;
    }

    try {
      await updateProduct(editingProduct.id, data);
      setEditingProduct(null);
    } catch {
      // Error handled by hook
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      if (editingProduct?.id === id) {
        setEditingProduct(null);
      }
    } catch {
      // Error handled by hook
    }
  };

  const isInitialLoad = loading && products.length === 0;

  return (
    <section className="page">
      <div className="page__header">
        <h2 className="page__title">Product Management</h2>
      </div>

      {successMessage && (
        <SuccessMessage message={successMessage} onDismiss={clearSuccess} />
      )}
      {error && <ErrorMessage message={error} onRetry={refreshProducts} />}
      {isInitialLoad && <Loader message="Loading products..." />}

      <div className="page__section">
        <ProductForm
          initialData={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={() => setEditingProduct(null)}
          submitting={submitting}
        />
      </div>

      {!isInitialLoad && !error && products.length === 0 && (
        <EmptyState
          title="No products found"
          message="Create your first product using the form above."
          actionLabel="Refresh"
          onAction={refreshProducts}
        />
      )}

      {products.length > 0 && (
        <div className="page__section">
          <ProductTable
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
            onRefresh={refreshProducts}
            submitting={submitting || loading}
          />
        </div>
      )}
    </section>
  );
}

export default Products;
