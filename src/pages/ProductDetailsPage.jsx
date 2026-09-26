import { useCallback, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelated } from '../api/products';
import { useAsync } from '../hooks/useAsync';
import { useCartStore } from '../store/useCartStore';
import { useToastStore } from '../store/useToastStore';
import ImageGallery from '../components/catalog/ImageGallery';
import ProductCard from '../components/catalog/ProductCard';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const fetchProduct = useCallback(() => getProductById(id), [id]);
  const { data: product, loading } = useAsync(fetchProduct);

  const fetchRelated = useCallback(
    () => (product ? getRelated(product) : Promise.resolve([])),
    [product]
  );
  const { data: related } = useAsync(fetchRelated);

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.show);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="text-sm text-gray-500 mt-2">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-block mt-6 px-6 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    showToast(`${quantity} × ${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <nav className="text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-black">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        <ImageGallery images={product.images} name={product.name} />

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {product.brand}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Part #: {product.partNumber}
          </p>

          <p className="text-2xl font-semibold mt-4">${product.price}</p>

          <p
            className={`text-sm mt-2 ${
              product.inStock ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {product.inStock ? 'In stock' : 'Out of stock'}
          </p>

          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-4 py-2 border-x border-gray-300 text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex-1 py-2.5 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="text-lg font-semibold tracking-tight">Specifications</h2>
        <dl className="mt-6 grid sm:grid-cols-2 gap-x-12 gap-y-1">
          {Object.entries(product.specs).map(([key, value]) => (
            <div
              key={key}
              className="grid grid-cols-2 py-3 text-sm border-b border-gray-100"
            >
              <dt className="text-gray-500">{key}</dt>
              <dd className="text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {related && related.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-semibold tracking-tight">
            Related Products
          </h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}