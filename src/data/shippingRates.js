//NOTICE: THIS IS MOCK DATA NOT REAL PRICING

// Weight brackets are in kg. The first bracket whose maxKg >= totalWeight wins.
const brackets = (base) => [
  { maxKg: 1, price: base },
  { maxKg: 3, price: base + 3 },
  { maxKg: 5, price: base + 7 },
  { maxKg: 10, price: base + 12 },
  { maxKg: Infinity, price: base + 20 },
];

// Base prices are distance-based from Georgetown.
export const shippingRates = {
  // Home state — cheapest
  'Pulau Pinang': brackets(4),
  Kedah: brackets(5),
  Perak: brackets(5),
  Perlis: brackets(6),

  // Central-west (moderate)
  'Wilayah Persekutuan Kuala Lumpur': brackets(7),
  'Wilayah Persekutuan Putrajaya': brackets(7),
  Selangor: brackets(7),

  // South (farther)
  'Negeri Sembilan': brackets(8),
  Melaka: brackets(8),
  Johor: brackets(9),

  // Northeast / east coast
  Kelantan: brackets(10),
  Terengganu: brackets(10),
  Pahang: brackets(10),

  // Island surcharges
  'Kedah - Langkawi': brackets(12),
  'Pahang - Tioman': brackets(13),

  // East Malaysia (requires air/sea freight)
  Sabah: brackets(15),
  Sarawak: brackets(15),
  'Wilayah Persekutuan Labuan': brackets(15),
};

export const defaultBaseRate = 20;