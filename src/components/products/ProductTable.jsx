import { formatCurrency, formatDate } from '../../utils/format';

function ProductTable({ products, onEdit, onDelete, onRefresh, submitting }) {
  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (confirmed) {
      onDelete(product.id);
    }
  };

  return (
    <div className="data-table">
      <div className="table-toolbar">
        <h3 className="table-toolbar__title">Products</h3>
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
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.stock_quantity}</td>
                <td>{formatDate(product.created_at)}</td>
                <td>
                  <div className="data-table__actions">
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      onClick={() => onEdit(product)}
                      disabled={submitting}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn--danger btn--sm"
                      onClick={() => handleDelete(product)}
                      disabled={submitting}
                    >
                      Delete
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

export default ProductTable;
