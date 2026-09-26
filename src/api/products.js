import { products } from '../data/products';

/*
 * Fetch products, optionally filtered.
 *
 * In-memory filtering for now. When the backend is live, this becomes:
 *   return request(`/api/products?${new URLSearchParams(filters)}`);
 */
export async function getProducts(filters = {}) {
  const { category, brand, q } = filters;
  const query = (q ?? '').trim().toLowerCase();

  return products.filter((p) => {
    if (category && p.category !== category) return false;
    if (brand && p.brand !== brand) return false;
    if (query) {
      const haystack = `${p.name} ${p.partNumber}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export async function getProductById(id) {
  return products.find((p) => p.id === Number(id)) ?? null;
}

export async function getFeatured(limit = 4) {
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getLatest(limit = 4) {
  return [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

export async function getBrands() {
  return [...new Set(products.map((p) => p.brand))].sort();
}

export async function getRelated(product, limit = 4) {
  const pool = products.filter((p) => p.id !== product.id);

  const sameCategoryAndBrand = pool.filter(
    (p) => p.category === product.category && p.brand === product.brand
  );
  const sameCategoryOnly = pool.filter(
    (p) => p.category === product.category && p.brand !== product.brand
  );
  const sameBrandOnly = pool.filter(
    (p) => p.brand === product.brand && p.category !== product.category
  );
  const featured = pool.filter(
    (p) =>
      p.isFeatured &&
      p.category !== product.category &&
      p.brand !== product.brand
  );

  const result = [];
  const seen = new Set();

  const addUnique = (list) => {
    for (const p of list) {
      if (result.length >= limit) break;
      if (!seen.has(p.id)) {
        seen.add(p.id);
        result.push(p);
      }
    }
  };

  addUnique(sameCategoryAndBrand);
  addUnique(sameCategoryOnly);
  addUnique(sameBrandOnly);
  addUnique(featured);

  if (result.length < limit) {
    addUnique(pool);
  }

  return result;
}