import { useState } from 'react';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import SuccessMessage from '../components/common/SuccessMessage';
import OrderForm from '../components/orders/OrderForm';
import OrdersTable from '../components/orders/OrdersTable';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import { useOrders } from '../hooks/useOrders';
import { useCustomers } from '../hooks/useCustomers';
import { useProducts } from '../hooks/useProducts';

function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const {
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
  } = useOrders();

  const { customers, loading: customersLoading } = useCustomers({ limit: 100 });
  const { products, refreshProducts } = useProducts({ limit: 100 });

  const handleCreateOrder = async (data) => {
    await createOrder(data);
    await refreshProducts();
  };

  const handleViewDetails = async (orderId) => {
    setSelectedOrderId(orderId);

    try {
      await getOrderDetails(orderId);
    } catch {
      // Error handled by hook
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
    } catch {
      // Error handled by hook
    }
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    clearOrderDetails();
  };

  const handleRetryDetails = () => {
    if (selectedOrderId) {
      getOrderDetails(selectedOrderId);
    }
  };

  const isInitialLoad = loading && orders.length === 0;

  return (
    <section className="page">
      <div className="page__header">
        <h2 className="page__title">Order Management</h2>
      </div>

      {successMessage && (
        <SuccessMessage message={successMessage} onDismiss={clearSuccess} />
      )}
      {error && <ErrorMessage message={error} onRetry={refreshOrders} />}
      {isInitialLoad && <Loader message="Loading orders..." />}

      <div className="page__section">
        <OrderForm
          customers={customers}
          products={products}
          customersLoading={customersLoading}
          onSubmit={handleCreateOrder}
          submitting={submitting}
        />
      </div>

      {!isInitialLoad && !error && orders.length === 0 && (
        <EmptyState
          title="No orders found"
          message="Create your first order using the form above."
          actionLabel="Refresh"
          onAction={refreshOrders}
        />
      )}

      {orders.length > 0 && (
        <div className="page__section">
          <OrdersTable
            orders={orders}
            onViewDetails={handleViewDetails}
            onCancel={handleCancelOrder}
            onRefresh={refreshOrders}
            submitting={submitting || loading}
          />
        </div>
      )}

      <OrderDetailsModal
        isOpen={Boolean(selectedOrderId)}
        onClose={handleCloseModal}
        order={orderDetails}
        loading={detailsLoading}
        error={detailsError}
        onRetry={handleRetryDetails}
      />
    </section>
  );
}

export default Orders;
