import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function ProductSection({ title, products, viewAllTo, loading }) {
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-xl font-semibold tracking-tight mb-8">{title}</h2>
        <p className="text-sm text-gray-500">Loading…</p>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            className="text-sm text-gray-500 hover:text-black underline"
          >
            View all
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}