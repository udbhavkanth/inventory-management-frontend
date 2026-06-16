import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import { useProducts } from '../hooks/useProducts';

function Products() {
  const { products, loading, error, refreshProducts } = useProducts();

  return (
    <section className="page">
      <h2 className="page__title">Product Management</h2>

      {loading && <Loader message="Loading products..." />}
      {error && (
        <ErrorMessage message={error} onRetry={refreshProducts} />
      )}
      {!loading && !error && products.length === 0 && (
        <EmptyState
          title="No products found"
          message="There are no products to display yet."
          actionLabel="Refresh"
          onAction={refreshProducts}
        />
      )}

      <div className="page__section">
        <div className="placeholder-card">Product Form Coming Soon</div>
      </div>

      <div className="page__section">
        <div className="placeholder-card">Product Table Coming Soon</div>
      </div>
    </section>
  );
}

export default Products;
