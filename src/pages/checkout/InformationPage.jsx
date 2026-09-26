import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../../store/useCheckoutStore';
import { provinces } from '../../data/provinces';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  province: '',
  postal: '',
  country: 'Malaysia',
};

export default function InformationPage() {
  const navigate = useNavigate();
  const storedInfo = useCheckoutStore((s) => s.info);
  const setInfo = useCheckoutStore((s) => s.setInfo);

  const [form, setForm] = useState(() => {
    if (!storedInfo) return emptyForm;
    return {
      name: storedInfo.name ?? '',
      email: storedInfo.email ?? '',
      phone: storedInfo.phone ?? '',
      street: storedInfo.address?.street ?? '',
      city: storedInfo.address?.city ?? '',
      province: storedInfo.address?.province ?? '',
      postal: storedInfo.address?.postal ?? '',
      country: storedInfo.address?.country ?? 'Malaysia',
    };
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = 'Checkout · Information';
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Required';
    if (!form.email.trim()) next.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Invalid email';
    if (!form.phone.trim()) next.phone = 'Required';
    if (!form.street.trim()) next.street = 'Required';
    if (!form.city.trim()) next.city = 'Required';
    if (!form.province) next.province = 'Required';
    if (!form.postal.trim()) next.postal = 'Required';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setInfo({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: {
        street: form.street.trim(),
        city: form.city.trim(),
        province: form.province,
        postal: form.postal.trim(),
        country: form.country,
      },
    });
    navigate('/checkout/delivery');
  };

  return (
    <div>
      <CheckoutSteps current="information" />

      <h1 className="text-2xl font-semibold tracking-tight mb-1">
        Contact & Shipping
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        We'll use this to reach you and deliver your order.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <section>
          <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
            Contact
          </h2>
          <div className="flex flex-col gap-3">
            <Field
              label="Full name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
            Shipping address
          </h2>
          <div className="flex flex-col gap-3">
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
              <label className="text-sm text-gray-700">Province</label>
              <select
                name="province"
                value={form.province}
                onChange={handleChange}
                className={`px-3 py-2 text-sm border rounded-md focus:outline-none focus:border-black bg-white ${
                  errors.province ? 'border-red-400' : 'border-gray-300'
                }`}
              >
                <option value="">Select a province</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.province && (
                <span className="text-xs text-red-500">{errors.province}</span>
              )}
            </div>
            <Field
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              disabled
            />
          </div>
        </section>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="text-sm text-gray-500 hover:text-black underline"
          >
            Back to cart
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
          >
            Continue to Delivery
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, error, disabled }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-3 py-2 text-sm border rounded-md focus:outline-none focus:border-black ${
          error ? 'border-red-400' : 'border-gray-300'
        } ${disabled ? 'bg-gray-50 text-gray-500' : ''}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}