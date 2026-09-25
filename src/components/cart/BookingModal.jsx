import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';

export default function BookingModal({ isOpen, onClose }) {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({ name: '', email: '', phone: '', time: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, POST this to the backend here.
    setSubmitted(true);
    clearCart();
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: '', email: '', phone: '', time: '' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) handleClose();
      }}
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">✓</div>
            <h2 className="text-lg font-semibold">Booking Confirmed</h2>
            <p className="text-sm text-gray-500 mt-2">
              We'll email you a confirmation with the pickup details.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Book In-Person Payment</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-black text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Reserve your order and pay at pickup. Total:{' '}
              <span className="font-semibold text-black">${getTotal()}</span> ·{' '}
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                required
                type="text"
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
              />
              <input
                required
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
              />
              <select
                required
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
              >
                <option value="">Preferred pickup time</option>
                <option value="morning">Morning (9am–12pm)</option>
                <option value="afternoon">Afternoon (12pm–4pm)</option>
                <option value="evening">Evening (4pm–8pm)</option>
              </select>

              <button
                type="submit"
                className="mt-2 w-full py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
              >
                Confirm Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}