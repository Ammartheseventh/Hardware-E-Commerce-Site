import { useState } from 'react';
import { states } from '../../data/shippingStates';

const emptyForm = {
  label: '',
  name: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  postal: '',
};

export default function AddressForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!initial) return emptyForm;
    return {
      label: initial.label ?? '',
      name: initial.name ?? '',
      phone: initial.phone ?? '',
      street: initial.street ?? '',
      city: initial.city ?? '',
      state: initial.state ?? '',
      postal: initial.postal ?? '',
    };
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Required';
    if (!form.phone.trim()) next.phone = 'Required';
    if (!form.street.trim()) next.street = 'Required';
    if (!form.city.trim()) next.city = 'Required';
    if (!form.state) next.state = 'Required';
    if (!form.postal.trim()) next.postal = 'Required';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSubmit({
      label: form.label.trim(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      street: form.street.trim(),
      city: form.city.trim(),
      state: form.state,
      postal: form.postal.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-200 rounded-md p-6 flex flex-col gap-4"
    >
      <Field
        label="Label (optional)"
        name="label"
        value={form.label}
        onChange={handleChange}
        placeholder="Home, Office…"
      />
      <Field
        label="Full name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <Field
        label="Street address"
        name="street"
        value={form.street}
        onChange={handleChange}
        error={errors.street}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          error={errors.city}
        />
        <Field
          label="Postal code"
          name="postal"
          value={form.postal}
          onChange={handleChange}
          error={errors.postal}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-700">State</label>
        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          className={`px-3 py-2 text-sm border rounded-md focus:outline-none focus:border-black bg-white ${
            errors.state ? 'border-red-400' : 'border-gray-300'
          }`}
        >
          <option value="">Select a state</option>
          {states.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.state && (
          <span className="text-xs text-red-500">{errors.state}</span>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-black underline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
        >
          Save address
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  disabled,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`px-3 py-2 text-sm border rounded-md focus:outline-none focus:border-black ${
          error ? 'border-red-400' : 'border-gray-300'
        } ${disabled ? 'bg-gray-50 text-gray-500' : ''}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}