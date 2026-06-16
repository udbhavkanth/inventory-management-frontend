import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import { useOrders } from '../hooks/useOrders';

function Orders() {
  const { orders, loading, error, refreshOrders } = useOrders();

  return (
    <section className="page">
      <h2 className="page__title">Order Management</h2>

      {loading && <Loader message="Loading orders..." />}
      {error && <ErrorMessage message={error} onRetry={refreshOrders} />}
      {!loading && !error && orders.length === 0 && (
        <EmptyState
          title="No orders found"
          message="There are no orders to display yet."
          actionLabel="Refresh"
          onAction={refreshOrders}
        />
      )}

      <div className="page__section">
        <div className="placeholder-card">Order Form Coming Soon</div>
      </div>

      <div className="page__section">
        <div className="placeholder-card">Order List Coming Soon</div>
      </div>
    </section>
  );
}

export default Orders;
