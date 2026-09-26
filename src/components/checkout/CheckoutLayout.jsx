import { Link, Outlet } from 'react-router-dom';
import Toast from '../common/Toast';

export default function CheckoutLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-center">
          <Link to="/" className="text-xl font-bold tracking-tight">
            MYSTORE
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        Secure checkout
      </footer>

      <Toast />
    </div>
  );
}