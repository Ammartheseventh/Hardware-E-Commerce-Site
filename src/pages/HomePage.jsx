import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/catalog/ProductCard';

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Build your dream rig.
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Curated PC hardware, hand-picked for performance. Reserve online, pay in person.
        </p>
        <Link
          to="/products"
          className="inline-block mt-8 px-8 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
        >
          Shop Now
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-xl font-semibold tracking-tight">Featured</h2>
          <Link
            to="/products"
            className="text-sm text-gray-500 hover:text-black underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}