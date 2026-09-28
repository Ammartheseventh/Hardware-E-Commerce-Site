export const categories = [
  { slug: 'computers', name: 'Computers' },
  { slug: 'components', name: 'Components' },
  { slug: 'peripherals', name: 'Peripherals' },
  { slug: 'displays', name: 'Displays' },
  { slug: 'printing', name: 'Printing' },
  { slug: 'networking', name: 'Networking' },
  { slug: 'accessories', name: 'Accessories' },
];

export function getCategoryName(slug) {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export function getCategorySlug(name) {
  return categories.find((c) => c.name === name)?.slug ?? null;
}