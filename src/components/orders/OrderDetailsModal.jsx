import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { formatCurrency, formatDate } from '../../utils/format';

function OrderDetailsModal({ isOpen, onClose, order, loading, error, onRetry }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
      >
        <div className="modal__header">
          <h3 id="order-details-title" className="modal__title">
            Order Details
          </h3>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Close order details"
          >
            &times;
          </button>
        </div>

        <div className="modal__body">
          {loading && <Loader message="Loading order details..." />}
          {error && <ErrorMessage message={error} onRetry={onRetry} />}

          {order && !loading && (
            <>
              <dl className="order-details">
                <div className="order-details__row">
                  <dt>Order ID</dt>
                  <dd className="data-table__mono">{order.id}</dd>
                </div>
                <div className="order-details__row">
                  <dt>Customer ID</dt>
                  <dd className="data-table__mono">{order.customer_id}</dd>
                </div>
                <div className="order-details__row">
                  <dt>Customer Name</dt>
                  <dd>{order.customer_name}</dd>
                </div>
                <div className="order-details__row">
                  <dt>Customer Email</dt>
                  <dd>{order.customer_email}</dd>
                </div>
                <div className="order-details__row">
                  <dt>Created Date</dt>
                  <dd>{formatDate(order.created_at)}</dd>
                </div>
                <div className="order-details__row">
                  <dt>Total Amount</dt>
                  <dd>{formatCurrency(order.total_amount)}</dd>
                </div>
              </dl>

              <h4 className="order-details__items-title">Order Items</h4>

              <div className="data-table">
                <div className="data-table__wrapper">
                  <table className="data-table__table">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(order.items ?? []).map((item, index) => (
                        <tr key={`${item.product_id}-${index}`}>
                          <td className="data-table__mono">{item.product_id}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.unit_price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="modal__footer">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
