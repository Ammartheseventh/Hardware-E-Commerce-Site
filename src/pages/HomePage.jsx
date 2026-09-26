import { Link } from 'react-router-dom';
import { getFeatured, getLatest } from '../api/products';
import { useAsync } from '../hooks/useAsync';
import ProductSection from '../components/catalog/ProductSection';

export default function HomePage() {
  const { data: featured, loading: featuredLoading } = useAsync(getFeatured);
  const { data: latest, loading: latestLoading } = useAsync(getLatest);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Hardware, without the hassle.
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Curated components and equipment, hand-picked for performance and
          reliability.
        </p>
        <Link
          to="/products"
          className="inline-block mt-8 px-8 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
        >
          Shop Now
        </Link>
      </section>

      <ProductSection
        title="Featured"
        products={featured}
        loading={featuredLoading}
        viewAllTo="/products"
      />

      <ProductSection
        title="New Arrivals"
        products={latest}
        loading={latestLoading}
        viewAllTo="/products"
      />
    </div>
  );
}