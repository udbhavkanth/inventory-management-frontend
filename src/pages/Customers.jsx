import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import { useCustomers } from '../hooks/useCustomers';

function Customers() {
  const { customers, loading, error, refreshCustomers } = useCustomers();

  return (
    <section className="page">
      <h2 className="page__title">Customer Management</h2>

      {loading && <Loader message="Loading customers..." />}
      {error && (
        <ErrorMessage message={error} onRetry={refreshCustomers} />
      )}
      {!loading && !error && customers.length === 0 && (
        <EmptyState
          title="No customers found"
          message="There are no customers to display yet."
          actionLabel="Refresh"
          onAction={refreshCustomers}
        />
      )}

      <div className="page__section">
        <div className="placeholder-card">Customer Form Coming Soon</div>
      </div>

      <div className="page__section">
        <div className="placeholder-card">Customer Table Coming Soon</div>
      </div>
    </section>
  );
}

export default Customers;
