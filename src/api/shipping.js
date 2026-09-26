import { shippingRates, defaultBaseRate } from '../data/shippingRates';

function getBrackets(province) {
  if (shippingRates[province]) return shippingRates[province];
  const fallbackKey = Object.keys(shippingRates)[0];
  return (
    shippingRates[fallbackKey] ?? [{ maxKg: Infinity, price: defaultBaseRate }]
  );
}

/**
 * Calculate shipping cost from cart items and a destination province.
 *
 * In-memory for now. When the backend is live, this becomes:
 *   return request('/api/shipping/quote', { items, province });
 */
export async function calculateShipping({ items, province }) {
  const totalWeight = items.reduce(
    (sum, i) => sum + (i.weight ?? 0) * i.quantity,
    0
  );

  const brackets = getBrackets(province);
  const bracket = brackets.find((b) => totalWeight <= b.maxKg);

  return {
    price: bracket?.price ?? defaultBaseRate,
    weight: Number(totalWeight.toFixed(2)),
    province,
  };
}