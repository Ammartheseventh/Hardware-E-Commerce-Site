import { products } from '../data/products';

// All functions are async so that when this file is swapped for real fetch()
// calls, no component code needs to change.

export async function getProducts() {
  return products;
}

export async function getProductById(id) {
  return products.find((p) => p.id === Number(id)) ?? null;
}

export async function getFeatured() {
  return products.filter((p) => p.isFeatured);
}

export async function getBestsellers() {
  return products.filter((p) => p.isBestseller);
}

export async function getLatest(limit = 4) {
  return [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

export async function getCategories() {
  return [...new Set(products.map((p) => p.category))].sort();
}

export async function getBrands() {
  return [...new Set(products.map((p) => p.brand))].sort();
}