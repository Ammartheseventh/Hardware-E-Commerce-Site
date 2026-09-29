import { shippingRates, defaultBaseRate } from '../data/shippingRates';

function getBrackets(state) {
  if (shippingRates[state]) return shippingRates[state];
  const fallbackKey = Object.keys(shippingRates)[0];
  return (
    shippingRates[fallbackKey] ?? [{ maxKg: Infinity, price: defaultBaseRate }]
  );
}

/**
 * Calculate shipping cost from cart items and a destination state.
 *
 * In-memory for now. When the backend is live, this becomes:
 *   return request('/api/shipping/quote', { items, state });
 */
export async function calculateShipping({ items, state }) {
  const totalWeight = items.reduce(
    (sum, i) => sum + (i.weight ?? 0) * i.quantity,
    0
  );

  const brackets = getBrackets(state);
  const bracket = brackets.find((b) => totalWeight <= b.maxKg);

  return {
    price: bracket?.price ?? defaultBaseRate,
    weight: Number(totalWeight.toFixed(2)),
    state,
  };
}