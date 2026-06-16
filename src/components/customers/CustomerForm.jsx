import { useState } from 'react';

const EMPTY_FORM = {
  full_name: '',
  email: '',
  phone: '',
};

function CustomerForm({ onSubmit, submitting }) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit({
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    });

    setFormData(EMPTY_FORM);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Create Customer</h3>

      <div className="form__grid">
        <div className="form__group">
          <label className="form__label" htmlFor="customer-full-name">
            Full Name
          </label>
          <input
            id="customer-full-name"
            className="form__input"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="customer-email">
            Email
          </label>
          <input
            id="customer-email"
            className="form__input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={submitting}
          />
        </div>

        <div className="form__group">
          <label className="form__label" htmlFor="customer-phone">
            Phone
          </label>
          <input
            id="customer-phone"
            className="form__input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
          {submitting ? 'Saving...' : 'Create Customer'}
        </button>
      </div>
    </form>
  );
}

export default CustomerForm;
