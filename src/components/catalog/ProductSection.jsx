import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function ProductSection({
  title,
  products,
  viewAllTo,
  loading,
}) {
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
            className="text-sm text-gray-500 hover:text-black underline decoration-2 underline-offset-4 hover:decoration-red-600"
          >
            View all
          </Link>
        )}
      </div>

      <div
        className="
          flex gap-6 overflow-x-auto snap-x snap-proximity
          overscroll-x-contain
          scrollbar-none [-ms-overflow-style:none]
          [-webkit-overflow-scrolling:touch]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="
              shrink-0 snap-start
              basis-[calc(50%-0.75rem)]
              sm:basis-[calc(33.333%-1rem)]
              lg:basis-[calc(25%-1.125rem)]
              xl:basis-[calc(20%-1.2rem)]
            "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}