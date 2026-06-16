import { formatCurrency } from '../../utils/format';

function OrderItemsTable({ items, onRemove, disabled }) {
  if (items.length === 0) {
    return (
      <p className="order-items-empty">
        No items added yet. Select a product and quantity above, then click Add
        Item.
      </p>
    );
  }

  return (
    <div className="data-table">
      <div className="table-toolbar">
        <h4 className="table-toolbar__title">Order Items</h4>
      </div>

      <div className="data-table__wrapper">
        <table className="data-table__table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Line Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product_id}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.unit_price)}</td>
                <td>{formatCurrency(item.line_total)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn--danger btn--sm"
                    onClick={() => onRemove(item.product_id)}
                    disabled={disabled}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderItemsTable;
