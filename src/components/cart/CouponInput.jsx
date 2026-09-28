import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { validateCoupon } from '../../api/coupons';

export default function CouponInput() {
  const coupon = useCartStore((s) => s.coupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmed = code.trim();
    if (!trimmed) return;

    setChecking(true);
    const result = await validateCoupon(trimmed);
    setChecking(false);

    if (!result) {
      setError('Invalid coupon code');
      return;
    }

    applyCoupon(result);
    setCode('');
  };

  if (coupon) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-md">
          <span className="font-mono text-gray-900">{coupon.code}</span>
          <button
            type="button"
            onClick={removeCoupon}
            aria-label="Remove coupon"
            className="text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          className="flex-1 min-w-0 px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:border-black uppercase"
        />
        <button
          type="submit"
          disabled={!code.trim() || checking}
          className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:border-black hover:bg-black hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900 disabled:hover:border-gray-300"
        >
          {checking ? '…' : 'Apply'}
        </button>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </form>
  );
}