export default function ContentPage({ title, subtitle, children }) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      )}
      <div className="mt-10 prose-content">{children}</div>
    </article>
  );
}