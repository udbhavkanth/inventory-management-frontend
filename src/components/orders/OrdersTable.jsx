import { formatCurrency, formatDate } from '../../utils/format';

function OrdersTable({ orders, onViewDetails, onCancel, onRefresh, submitting }) {
  const handleCancel = (order) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this order?'
    );

    if (confirmed) {
      onCancel(order.id);
    }
  };

  return (
    <div className="data-table">
      <div className="table-toolbar">
        <h3 className="table-toolbar__title">Orders</h3>
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          onClick={onRefresh}
          disabled={submitting}
        >
          Refresh
        </button>
      </div>

      <div className="data-table__wrapper">
        <table className="data-table__table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="data-table__mono">{order.id}</td>
                <td className="data-table__mono">{order.customer_id}</td>
                <td>{order.customer_name}</td>
                <td>{formatCurrency(order.total_amount)}</td>
                <td>{formatDate(order.created_at)}</td>
                <td>
                  <div className="data-table__actions">
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      onClick={() => onViewDetails(order.id)}
                      disabled={submitting}
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="btn btn--danger btn--sm"
                      onClick={() => handleCancel(order)}
                      disabled={submitting}
                    >
                      Cancel Order
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;
