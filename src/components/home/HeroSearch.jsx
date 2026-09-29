import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const hasText = query.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasText) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 mx-auto w-full max-w-xs sm:max-w-xl"
    >
      <div
        className={`
          flex items-center gap-2
          bg-white border border-gray-300 rounded-full
          pl-5 pr-1.5 py-1.5
          transition-all duration-300 ease-out
          ${focused ? 'border-black shadow-sm' : ''}
        `}
      >
        <svg
          className="w-4 h-4 text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search products…"
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-sm text-gray-900 placeholder:text-gray-400 py-2"
        />

        <button
          type="submit"
          className="shrink-0 px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-brand transition-colors relative overflow-hidden"
          style={{ minWidth: '104px' }}
        >
          {/* Crossfade between the two labels */}
          <span
            className={`inline-block transition-opacity duration-200 ${
              hasText ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden={hasText}
          >
            Shop Now
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
              hasText ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={!hasText}
          >
            Search
          </span>
        </button>
      </div>
    </form>
  );
}