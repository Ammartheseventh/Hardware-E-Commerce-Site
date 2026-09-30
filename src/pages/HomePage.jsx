import { getFeatured, getLatest } from '../api/products';
import { useAsync } from '../hooks/useAsync';
import { usePageTitle } from '../hooks/usePageTitle';
import ProductSection from '../components/catalog/ProductSection';
import BrandsSection from '../components/home/BrandsSection';
import { Link } from 'react-router-dom';
import heroBg from '../assets/background-full.svg';

export default function HomePage() {
  usePageTitle();

  const { data: featured, loading: featuredLoading } = useAsync(getFeatured);
  const { data: latest, loading: latestLoading } = useAsync(getLatest);

  return (
    <div>
    <section className="relative max-w-7xl mx-auto">
      <div className="relative overflow-hidden bg-white">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-100"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 top-0 h-0 bg-linear-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-white to-transparent" />

        <div className="relative  inset-0 px-8 py-20 text-center">
          <h1 className="text-shadow-white text-shadow-lg mx-auto text-4xl md:text-6xl font-semibold tracking-tight">
            Hardware, without the hassle.
          </h1>
          <p className="text-shadow-white text-shadow-lg font-semibold mt-4 mx-auto">
            Curated components and equipment, hand-picked for performance and
            reliability.
          </p>
          <Link
            to="/products"
            className="inline-block mt-4 px-8 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
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