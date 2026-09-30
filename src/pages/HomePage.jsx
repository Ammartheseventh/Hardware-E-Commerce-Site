import { getFeatured, getLatest } from '../api/products';
import { useAsync } from '../hooks/useAsync';
import { usePageTitle } from '../hooks/usePageTitle';
import ProductSection from '../components/catalog/ProductSection';
import BrandsSection from '../components/home/BrandsSection';
import { Link } from 'react-router-dom';

export default function HomePage() {
  usePageTitle();

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
          className="inline-block mt-10 px-8 py-3 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
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
        viewAllTo="/products?sort=newest"
      />

      <BrandsSection />
    </div>
  );
}