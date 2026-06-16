import { formatDate } from '../../utils/format';

function CustomerTable({ customers, onDelete, onRefresh, submitting }) {
  const handleDelete = (customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${customer.full_name}"?`
    );

    if (confirmed) {
      onDelete(customer.id);
    }
  };

  return (
    <div className="data-table">
      <div className="table-toolbar">
        <h3 className="table-toolbar__title">Customers</h3>
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
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.full_name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{formatDate(customer.created_at)}</td>
                <td>
                  <div className="data-table__actions">
                    <button
                      type="button"
                      className="btn btn--danger btn--sm"
                      onClick={() => handleDelete(customer)}
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

export default CustomerTable;
