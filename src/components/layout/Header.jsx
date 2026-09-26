import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export default function Header() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          MYSTORE
        </Link>

        <nav className="flex items-center gap-8">
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
              key={itemCount}
              className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse-scale"
            >
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}