import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { categories } from '../../data/categories';

export default function Header() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const user = useAuthStore((s) => s.user);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const userMenuRef = useRef(null);
  const categoriesRef = useRef(null);

  // Close user menu on outside click / Escape
  useEffect(() => {
    if (!userMenuOpen) return;
    const onDown = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [userMenuOpen]);

  // Close categories menu on outside click / Escape
  useEffect(() => {
    if (!categoriesOpen) return;
    const onDown = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setCategoriesOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setCategoriesOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [categoriesOpen]);

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

          {/* Categories dropdown */}
          <div className="relative" ref={categoriesRef}>
            <button
              type="button"
              onClick={() => setCategoriesOpen((v) => !v)}
              aria-expanded={categoriesOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-black transition-colors"
            >
              Categories
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  categoriesOpen ? 'rotate-180' : ''
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                <ul className="py-1 max-h-96 overflow-y-auto">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <NavLink
                        to={`/products?category=${c.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

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
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((v) => !v)}
              aria-label="Account menu"
              aria-expanded={userMenuOpen}
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
                  userMenuOpen ? 'rotate-180' : ''
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {userMenuOpen && (
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
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/addresses"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Addresses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => setUserMenuOpen(false)}
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