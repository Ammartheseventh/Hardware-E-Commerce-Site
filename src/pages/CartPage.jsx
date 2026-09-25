import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import CartItem from '../components/cart/CartItem';
import BookingModal from '../components/cart/BookingModal';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isBooking, setIsBooking] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="text-sm text-gray-500 mt-2">
          Add some products to get started.
        </p>
        <Link
          to="/products"
          className="inline-block mt-6 px-6 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold tracking-tight">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs text-gray-500 hover:text-red-600 underline"
        >
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mt-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Summary
            </h2>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${getTotal()}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${getTotal()}</span>
            </div>

            <button
              onClick={() => setIsBooking(true)}
              className="mt-6 w-full py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
            >
              Book In-Person Payment
            </button>

            <Link
              to="/products"
              className="block mt-3 text-center text-xs text-gray-500 hover:text-black underline"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBooking} onClose={() => setIsBooking(false)} />
    </div>
  );
}