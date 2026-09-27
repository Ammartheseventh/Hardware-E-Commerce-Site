import { Outlet } from 'react-router-dom';
import AccountNav from './AccountNav';

export default function AccountLayout() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-10">
        <AccountNav />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}