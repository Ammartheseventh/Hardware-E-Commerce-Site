import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export default function Header() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (itemCount === 0) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 300);
    return () => clearTimeout(t);
  }, [itemCount]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          MYSTORE
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-gray-700 hover:text-black">
            Home
          </Link>
          <Link to="/products" className="text-sm text-gray-700 hover:text-black">
            Products
          </Link>
        </nav>

        <Link
          to="/cart"
          className="relative flex items-center gap-2 text-sm font-medium"
        >
          Cart
          {itemCount > 0 && (
            <span
              className={`absolute -top-2 -right-3 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-200 ${
                pulse ? 'scale-125' : 'scale-100'
              }`}
            >
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}