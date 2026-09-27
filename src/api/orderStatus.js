export const ORDER_STATUS = {
  pending_payment: {
    label: 'Pending payment',
    className: 'text-amber-700',
  },
  verifying: {
    label: 'Verifying payment',
    className: 'text-amber-700',
  },
  shipping: {
    label: 'Being shipped',
    className: 'text-blue-700',
  },
  preparing_order: {
    label: 'Preparing order',
    className: 'text-blue-700',
  },
  ready_for_pickup: {
    label: 'Ready for pickup',
    className: 'text-green-700',
  },
  received: {
    label: 'Received',
    className: 'text-gray-500',
  },
};

export function getOrderStatus(status) {
  return ORDER_STATUS[status] ?? ORDER_STATUS.pending_payment;
}