import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrderStore } from '../../store/useOrderStore';
import CheckoutSteps from '../../components/checkout/CheckoutSteps';
import { useToastStore } from '../../store/useToastStore';

export default function ConfirmationPage() {
  const { orderId } = useParams();
  const order = useOrderStore((s) =>
    s.orders.find((o) => o.id === orderId)
  );
  const updateOrder = useOrderStore((s) => s.updateOrder);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const showToast = useToastStore((s) => s.show);

  useEffect(() => {
    document.title = orderId
      ? `Order ${orderId} · Confirmation`
      : 'Confirmation';
  }, [orderId]);

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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

  const receipt = order.receipt;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Release old preview if any
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    updateOrder(order.id, {
      status: 'receipt_uploaded',
      receipt: {
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });
  };

  const handleRemoveReceipt = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    updateOrder(order.id, {
      status: 'pending_payment',
      receipt: null,
    });
  };

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

      {/* Payment instructions */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          Payment instructions
        </h2>
        <div className="border border-gray-200 rounded-md p-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Please transfer <strong className="text-gray-900">${order.total}</strong>{' '}
            using <strong className="text-gray-900">{paymentLabel(order.paymentMethod)}</strong>.
          </p>
          <p className="mt-2">
            Once paid, upload your receipt below. Your order will be
            processed once the payment is verified.
          </p>
        </div>
      </section>

      {/* Receipt upload */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          Payment receipt
        </h2>

        {receipt ? (
          <div className="border border-gray-200 rounded-md p-4">
            {previewUrl && (
              <div className="mb-3 rounded-md overflow-hidden bg-gray-100">
                <img
                  src={previewUrl}
                  alt="Receipt preview"
                  className="w-full max-h-64 object-contain"
                />
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm">
                <p className="text-gray-900 break-all">{receipt.fileName}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Uploaded {new Date(receipt.uploadedAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveReceipt}
                className="text-xs text-gray-500 hover:text-red-600 underline whitespace-nowrap"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label className="block border-2 border-dashed border-gray-300 hover:border-black rounded-md p-8 text-center cursor-pointer transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-sm font-medium text-gray-900">
              Click to upload receipt
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Image or PDF, up to 10MB
            </p>
          </label>
        )}
      </section>

      {/* Order summary */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          Order summary
        </h2>
        <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4">
              <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-t-0 border-gray-200 rounded-b-md p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">${order.subtotal}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">
              {order.delivery === 'ship' ? 'Shipping' : 'Pickup'}
            </span>
            <span className="text-gray-900">
              {order.delivery === 'ship'
                ? `$${order.shipping}`
                : 'Free'}
            </span>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">${order.total}</span>
          </div>
        </div>
      </section>

      {/* Delivery details */}
      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
          {order.delivery === 'ship' ? 'Shipping to' : 'Pickup'}
        </h2>
        <div className="border border-gray-200 rounded-md p-4 text-sm text-gray-500">
          {order.delivery === 'ship' && order.address ? (
            <>
              <p className="text-gray-900">{order.customer.name}</p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.postal}
              </p>
              <p>{order.address.province}</p>
            </>
          ) : (
            <>
              <p className="text-gray-900">Pick up in person</p>
              <p className="mt-1">
                We'll contact you at {order.customer.phone} to arrange a
                pickup time.
              </p>
            </>
          )}
        </div>
      </section>

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

function paymentLabel(method) {
  switch (method) {
    case 'duitnow':
      return 'DuitNow';
    case 'maybank2u':
      return 'Maybank2u';
    case 'cimb':
      return 'CIMB Bank';
    default:
      return 'the selected payment method';
  }
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