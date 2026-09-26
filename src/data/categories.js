export const categories = [
  { slug: 'gpus', name: 'GPUs' },
  { slug: 'cpus', name: 'CPUs' },
  { slug: 'memory', name: 'Memory' },
  { slug: 'storage', name: 'Storage' },
  { slug: 'motherboards', name: 'Motherboards' },
  { slug: 'power', name: 'Power' },
  { slug: 'cooling', name: 'Cooling' },
  { slug: 'cases', name: 'Cases' },
  { slug: 'peripherals', name: 'Peripherals' },
  { slug: 'monitors', name: 'Monitors' },
  { slug: 'accessories', name: 'Accessories' },
];

export function getCategoryName(slug) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export function getCategorySlug(name) {
  return categories.find((c) => c.name === name)?.slug ?? null;
}