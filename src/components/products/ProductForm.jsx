import { useEffect, useState } from 'react';

const EMPTY_FORM = {
  name: '',
  price: '',
  stock_quantity: '',
};

function ProductForm({ onSubmit, onCancel, initialData, submitting }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name ?? '',
        price: initialData.price ?? '',
        stock_quantity: initialData.stock_quantity ?? '',
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit({
        name: formData.name.trim(),
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
      });

      if (!isEditing) {
        setFormData(EMPTY_FORM);
      }
    } catch {
      // Keep form data on error
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">
        {isEditing ? 'Edit Product' : 'Create Product'}
      </h3>

      <div className="form__grid">
        <div className="form__group">
          <label className="form__label" htmlFor="product-name">
            Name
          </label>
          <input
            id="product-name"
            className="form__input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="product-price">
            Price
          </label>
          <input
            id="product-price"
            className="form__input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            disabled={submitting}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="product-quantity">
            Quantity
          </label>
          <input
            id="product-quantity"
            className="form__input"
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            min="0"
            step="1"
            required
            disabled={submitting}
          />
        </div>
      </div>

      <div className="form__actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={submitting}
        >
          {submitting
            ? 'Saving...'
            : isEditing
              ? 'Update Product'
              : 'Create Product'}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
