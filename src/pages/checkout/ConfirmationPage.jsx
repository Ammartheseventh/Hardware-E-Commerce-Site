import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrderStore } from '../../store/useOrderStore';
import { useToastStore } from '../../store/useToastStore';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import OrderDetails from '../../components/account/OrderDetails';

export default function ConfirmationPage() {
  const { orderId } = useParams();
  const order = useOrderStore((s) =>
    s.orders.find((o) => o.id === orderId)
  );
  const showToast = useToastStore((s) => s.show);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = orderId
      ? `Order ${orderId} · Confirmation`
      : 'Confirmation';
  }, [orderId]);

  if (!order) {
    return (
      <div>
        <CheckoutSteps current="confirmation" />
        <div className="text-center py-12">
          <h1 className="text-xl font-semibold">Order not found</h1>
          <p className="text-sm text-gray-500 mt-2">
            We couldn't find an order with ID {orderId}.
          </p>
          <Link
            to="/products"
            className="inline-block mt-6 px-6 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyId = async () => {
    await navigator.clipboard.writeText(order.id);
    setCopied(true);
    showToast('Order ID copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <CheckoutSteps current="confirmation" />

      <div className="text-center mb-10">
        <div className="text-4xl mb-3">✓</div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Order Confirmed
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Thank you, {order.customer.name.split(' ')[0]}. Your order ID is
        </p>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-lg font-mono">{order.id}</span>
          <button
            type="button"
            onClick={handleCopyId}
            aria-label={copied ? 'Copied' : 'Copy order ID'}
            className="text-gray-500 hover:text-black transition-colors"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>

      <OrderDetails order={order} />

      <div className="text-center pt-4">
        <Link
          to="/products"
          className="text-sm text-gray-500 hover:text-black underline"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}