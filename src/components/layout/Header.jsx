import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function Header() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const user = useAuthStore((s) => s.user);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

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
          <Link
            to="/products"
            className="text-sm text-gray-700 hover:text-black"
          >
            Products
          </Link>
        </nav>

        <div className="flex items-center gap-4">
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

          {/* User menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Account menu"
              aria-expanded={isOpen}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              <span className="hidden sm:inline">
                {user?.name?.split(' ')[0] ?? 'Account'}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name ?? 'Guest'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email ?? ''}
                  </p>
                </div>

                <ul className="py-1">
                  <li>
                    <Link
                      to="/account/orders"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/addresses"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Addresses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/settings"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}