import { useState } from 'react';
import { formatCurrency } from '../../utils/format';
import OrderItemsTable from './OrderItemsTable';

const EMPTY_ADD_ITEM = {
  selectedProductId: '',
  quantity: '',
};

function OrderForm({
  customers,
  products,
  customersLoading,
  onSubmit,
  submitting,
}) {
  const [customerId, setCustomerId] = useState('');
  const [addItem, setAddItem] = useState(EMPTY_ADD_ITEM);
  const [items, setItems] = useState([]);
  const [formError, setFormError] = useState('');

  const orderTotal = items.reduce((sum, item) => sum + item.line_total, 0);

  const resetForm = () => {
    setCustomerId('');
    setAddItem(EMPTY_ADD_ITEM);
    setItems([]);
    setFormError('');
  };

  const handleAddItem = () => {
    setFormError('');

    if (!addItem.selectedProductId) {
      setFormError('Please select a product.');
      return;
    }

    const quantity = Number(addItem.quantity);

    if (!addItem.quantity || quantity <= 0) {
      setFormError('Quantity must be greater than zero.');
      return;
    }

    if (items.some((item) => item.product_id === addItem.selectedProductId)) {
      setFormError('This product is already in the order. Remove it first to change quantity.');
      return;
    }

    const product = products.find((p) => p.id === addItem.selectedProductId);

    if (!product) {
      setFormError('Selected product not found.');
      return;
    }

    const unitPrice = Number(product.price);
    const lineTotal = unitPrice * quantity;

    setItems((prev) => [
      ...prev,
      {
        product_id: product.id,
        product_name: product.name,
        quantity,
        unit_price: unitPrice,
        line_total: lineTotal,
      },
    ]);

    setAddItem(EMPTY_ADD_ITEM);
  };

  const handleRemoveItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.product_id !== productId));
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!customerId) {
      setFormError('Please select a customer.');
      return;
    }

    if (items.length === 0) {
      setFormError('Please add at least one product to the order.');
      return;
    }

    try {
      await onSubmit({
        customer_id: customerId,
        items: items.map(({ product_id, quantity }) => ({
          product_id,
          quantity,
        })),
      });

      resetForm();
    } catch {
      // Error handled by hook
    }
  };

  return (
    <form className="form order-form" onSubmit={handleSubmit}>
      <h3 className="form__title">Create Order</h3>

      {formError && <p className="form__error">{formError}</p>}

      <div className="form__group">
        <label className="form__label" htmlFor="order-customer">
          Customer
        </label>
        <select
          id="order-customer"
          className="form__input"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          disabled={submitting || customersLoading}
          required
        >
          <option value="">
            {customersLoading ? 'Loading customers...' : 'Select a customer'}
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className="order-form__row">
        <div className="form__group">
          <label className="form__label" htmlFor="order-product">
            Product
          </label>
          <select
            id="order-product"
            className="form__input"
            value={addItem.selectedProductId}
            onChange={(e) =>
              setAddItem((prev) => ({
                ...prev,
                selectedProductId: e.target.value,
              }))
            }
            disabled={submitting}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="order-quantity">
            Quantity
          </label>
          <input
            id="order-quantity"
            className="form__input"
            type="number"
            min="1"
            step="1"
            value={addItem.quantity}
            onChange={(e) =>
              setAddItem((prev) => ({ ...prev, quantity: e.target.value }))
            }
            disabled={submitting}
          />
        </div>

        <div className="form__group order-form__add-btn">
          <label className="form__label form__label--hidden">Add</label>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleAddItem}
            disabled={submitting}
          >
            Add Item
          </button>
        </div>
      </div>

      <div className="page__section">
        <OrderItemsTable
          items={items}
          onRemove={handleRemoveItem}
          disabled={submitting}
        />
      </div>

      <div className="order-form__total">
        <span className="order-form__total-label">Order Total</span>
        <span className="order-form__total-value">
          {formatCurrency(orderTotal)}
        </span>
        <p className="order-form__total-note">
          Preview only. The backend calculates the final total.
        </p>
      </div>

      <div className="form__actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={submitting || customersLoading}
        >
          {submitting ? 'Creating Order...' : 'Create Order'}
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
