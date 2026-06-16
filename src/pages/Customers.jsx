import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import SuccessMessage from '../components/common/SuccessMessage';
import CustomerForm from '../components/customers/CustomerForm';
import CustomerTable from '../components/customers/CustomerTable';
import { useCustomers } from '../hooks/useCustomers';

function Customers() {
  const {
    customers,
    loading,
    submitting,
    error,
    successMessage,
    refreshCustomers,
    createCustomer,
    deleteCustomer,
    clearSuccess,
  } = useCustomers();

  const handleCreate = async (data) => {
    try {
      await createCustomer(data);
    } catch {
      // Error handled by hook
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
    } catch {
      // Error handled by hook
    }
  };

  const isInitialLoad = loading && customers.length === 0;

  return (
    <section className="page">
      <div className="page__header">
        <h2 className="page__title">Customer Management</h2>
      </div>

      {successMessage && (
        <SuccessMessage message={successMessage} onDismiss={clearSuccess} />
      )}
      {error && <ErrorMessage message={error} onRetry={refreshCustomers} />}
      {isInitialLoad && <Loader message="Loading customers..." />}

      <div className="page__section">
        <CustomerForm onSubmit={handleCreate} submitting={submitting} />
      </div>

      {!isInitialLoad && !error && customers.length === 0 && (
        <EmptyState
          title="No customers found"
          message="Create your first customer using the form above."
          actionLabel="Refresh"
          onAction={refreshCustomers}
        />
      )}

      {customers.length > 0 && (
        <div className="page__section">
          <CustomerTable
            customers={customers}
            onDelete={handleDelete}
            onRefresh={refreshCustomers}
            submitting={submitting || loading}
          />
        </div>
      )}
    </section>
  );
}

export default Customers;
