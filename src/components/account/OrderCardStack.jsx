export default function OrderCardStack({ items, size = 56 }) {
  const images = items.slice(0, 3).map((item) => item.images[0]);
  const n = images.length;
  const center = (n - 1) / 2;

  // Each card is offset horizontally and rotated based on its index,
  // producing a fan that leans to the right.
  const cardStyle = (i) => {
    const offsetX = (i - center) * 22;
    const rotation = (i - center) * 10 + 4; // +4 gives the whole fan a rightward lean
    return {
      width: size,
      height: size,
      transform: `translateX(${offsetX}px) rotate(${rotation}deg)`,
      zIndex: i,
    };
  };

  const containerWidth = size + (n - 1) * 22 + 40;

  return (
    <div
      className="relative shrink-0"
      style={{ width: containerWidth, height: size + 20 }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-md overflow-hidden border border-gray-200 bg-gray-100 shadow-sm"
          style={{
            ...cardStyle(i),
            transform: `translate(-50%, -50%) ${cardStyle(i).transform}`,
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}