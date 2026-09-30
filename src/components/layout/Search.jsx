import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

const SCROLL_THRESHOLD = 200;

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isProductsPage = location.pathname === '/products';
  const urlQuery = isProductsPage ? (searchParams.get('q') ?? '') : '';

  const [typedValue, setTypedValue] = useState(null);
  const query = typedValue ?? urlQuery;

  const [expanded, setExpanded] = useState(false);
  const [focused, setFocused] = useState(false);

  const [scrolledPast, setScrolledPast] = useState(
    () =>
      typeof window !== 'undefined' && window.scrollY >= SCROLL_THRESHOLD
  );

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isProductsPage) return;
    const onScroll = () =>
      setScrolledPast(window.scrollY >= SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isProductsPage]);

  const hidden = isProductsPage && !scrolledPast;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setExpanded(false);
        setFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (!query.trim()) {
          setExpanded(false);
          setFocused(false);
        }
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [expanded, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/products?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/products');
    }
    setTypedValue(null);
    setExpanded(false);
    setFocused(false);
    inputRef.current?.blur();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIconClick = () => {
    setExpanded(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleMouseEnter = () => {
    if (!hidden) setExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!focused && !query.trim()) {
      setExpanded(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative flex items-center h-9 rounded-full
        transition-[width,background-color,border-color,opacity] duration-300 ease-out
        ${expanded ? 'w-56 bg-white border border-gray-300' : 'w-9'}
        ${focused ? 'border-black' : ''}
        ${hidden ? 'opacity-0 pointer-events-none w-0' : 'opacity-100'}
      `}
    >
      <form onSubmit={handleSubmit} className="flex-1 min-w-0 h-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setTypedValue(e.target.value)}
          onFocus={() => {
            setFocused(true);
            setExpanded(true);
          }}
          onBlur={() => setFocused(false)}
          placeholder="Search products…"
          tabIndex={expanded ? 0 : -1}
          className={`
            w-full h-full bg-transparent border-0 outline-none
            text-sm text-gray-900 placeholder:text-gray-400
            transition-opacity duration-200
            ${expanded ? 'opacity-100 pl-5 pr-12' : 'opacity-0 pointer-events-none'}
          `}
        />
      </form>

      <button
        type="button"
        onClick={handleIconClick}
        aria-label="Search"
        className="
          absolute right-0 top-0
          w-9 h-9 flex items-center justify-center
          rounded-full
          text-gray-700 hover:text-black
          transition-colors
        "
      >
        <svg
          className="w-5 h-5"
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
      </button>
    </div>
  );
}