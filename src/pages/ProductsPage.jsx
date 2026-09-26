import { useCallback } from 'react';
import { getProducts, getBrands } from '../api/products';
import { useAsync } from '../hooks/useAsync';
import { useFilters } from '../hooks/useFilters';
import { categories } from '../data/categories';
import ProductCard from '../components/catalog/ProductCard';
import FilterBar from '../components/catalog/FilterBar';

export default function ProductsPage() {
  const { category, brand, q, setFilter, clearFilters, hasFilters } =
    useFilters();

  const fetchProducts = useCallback(
    () => getProducts({ category, brand, q }),
    [category, brand, q]
  );
  const { data: filtered, loading } = useAsync(fetchProducts);
  const { data: brands } = useAsync(getBrands);

  const handleSearchChange = useCallback(
    (value) => setFilter('q', value),
    [setFilter]
  );

  if (loading || !filtered) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-500">Loading products…</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">All Products</h1>
        <p className="text-sm text-gray-500 mt-1">
          Showing {filtered.length} products
        </p>
      </div>

      <FilterBar
        categories={categories}
        brands={brands ?? []}
        category={category}
        brand={brand}
        q={q}
        onCategoryChange={(v) => setFilter('category', v)}
        onBrandChange={(v) => setFilter('brand', v)}
        onSearchChange={handleSearchChange}
        onClear={clearFilters}
        hasFilters={hasFilters}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-sm text-gray-500">
            No products match your filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm underline hover:text-black"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}