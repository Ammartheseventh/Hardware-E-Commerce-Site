export default function FilterBar({
  categories,
  brands,
  category,
  brand,
  q,
  onCategoryChange,
  onBrandChange,
  onSearchChange,
  onClear,
  hasFilters,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
      <input
        type="text"
        value={q}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search name or part number…"
        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-black"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={brand}
        onChange={(e) => onBrandChange(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white"
      >
        <option value="">All brands</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={onClear}
          className="px-3 py-2 text-sm text-gray-500 hover:text-black underline whitespace-nowrap"
        >
          Clear
        </button>
      )}
    </div>
  );
}