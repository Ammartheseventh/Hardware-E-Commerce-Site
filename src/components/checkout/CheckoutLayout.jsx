import { Link, Outlet } from 'react-router-dom';
import Toast from '../common/Toast';
import logo from '../../assets/logo.png';

export default function CheckoutLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-center">
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="CBGinfotech" className="h-8 w-auto" />
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