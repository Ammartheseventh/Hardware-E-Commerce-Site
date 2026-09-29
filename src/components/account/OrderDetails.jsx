import { useState, useRef, useEffect } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { useToastStore } from '../../store/useToastStore';
import { formatPrice } from '../../api/formatPrice';
import PaymentInstructions from './PaymentInstructions';

export default function OrderDetails({ order }) {
  const updateOrder = useOrderStore((s) => s.updateOrder);
  const showToast = useToastStore((s) => s.show);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const receipt = order.receipt;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    updateOrder(order.id, {
      status: 'verifying',
      receipt: {
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });
    showToast('Receipt uploaded');
  };

  const handleRemoveReceipt = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    updateOrder(order.id, {
      status: 'pending_payment',
      receipt: null,
    });
    showToast('Receipt removed');
  };

  return (
    <>
      <PaymentInstructions order={order} />

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
              className="sr-only"
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
          {order.coupon && (
            <div className="flex justify-between mt-2">
              <span className="text-gray-500">
                Discount{' '}
                <span className="font-mono text-gray-400">{order.coupon.code}</span>
              </span>
              <span className="text-gray-900">-${order.discount}</span>
            </div>
          )}
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">
              {order.delivery === 'ship' ? 'Shipping' : 'Pickup'}
            </span>
            <span className="text-gray-900">
              {order.delivery === 'ship'
                ? `${formatPrice(order.shipping)}`
                : 'Free'}
            </span>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold text-gray-900">${order.total}</span>
          </div>
        </div>
      </section>

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
                We'll contact you at {order.customer.phone} to arrange a pickup
                time.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}