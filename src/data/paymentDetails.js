export const paymentDetails = {
  duitnow: {
    label: 'DuitNow QR',
    type: 'qr',
    instructions: 'Scan this QR code with your banking app to pay.',
  },
  bank_transfer: {
    label: 'Bank transfer',
    type: 'bank',
    bankName: 'Maybank',
    accountName: 'MyStore Sdn Bhd',
    accountNumber: '1234567890',
    instructions:
      'Transfer the amount to the account below, then upload your receipt.',
  },
};

export function getPaymentDetails(method) {
  return paymentDetails[method] ?? null;
}