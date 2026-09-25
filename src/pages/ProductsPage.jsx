import { products } from '../data/products';
import ProductCard from '../components/catalog/ProductCard';

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">All Products</h1>
        <p className="text-sm text-gray-500 mt-1">
          {products.length} items
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}