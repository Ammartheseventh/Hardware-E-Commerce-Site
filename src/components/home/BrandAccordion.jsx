import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const DEFAULT_BRANDS = [];

export default function BrandAccordion({
  items = DEFAULT_BRANDS,
  defaultIndex = 0,
  height = 220,
  gap = 8,
  radius = 12,
  expandRatio = 0.4,
  duration = 0.5,
  ease = 'power3.out',
  className = '',
  brandClassName = '',
}) {
  const panelRefs = useRef([]);
  const textRefs = useRef([]);
  const logoRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);

  const count = items.length;
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0))
  );

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    (animate) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const text = textRefs.current[i];
        const logo = logoRefs.current[i];

        tl.to(
          panel,
          { flexGrow: isActive ? grow : 1, duration: dur, ease },
          0
        );

        if (text) {
          tl.to(
            text,
            { opacity: isActive ? 0 : 1, duration: dur, ease },
            0
          );
        }

        if (logo) {
          tl.to(
            logo,
            {
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.9,
              duration: dur,
              ease,
            },
            0
          );
        }
      });

      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, prefersReduced]
  );

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i) => setActive(i);
  const handleFocus = (i) => setActive(i);

  const handleClick = (i, e) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <>
      {/* ============================================================ */}
      {/* MOBILE — only renders below md. Square logo cards, no text.  */}
      {/* ============================================================ */}
      <div
        className={`
          md:hidden flex flex-row overflow-x-auto snap-x snap-proximity
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
          ${className}
        `}
        style={{ gap: `${gap}px` }}
        role="list"
        aria-label="Brand list"
      >
        {items.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="shrink-0 snap-start w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center p-4 no-underline outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label={item.name}
            role="listitem"
          >
            <img
              src={item.logo}
              alt={item.name}
              className="w-full h-full object-contain select-none"
              draggable="false"
            />
          </a>
        ))}
      </div>

      {/* ============================================================ */}
      {/* DESKTOP — only renders at md and up. Untouched accordion.    */}
      {/* ============================================================ */}
      <div
        className={`
          hidden md:flex flex-row w-full
          max-md:overflow-x-auto max-md:snap-x max-md:snap-proximity
          max-md:[scrollbar-width:none] max-md:[-ms-overflow-style:none]
          max-md:[&::-webkit-scrollbar]:hidden
          ${className}
        `}
        style={{ gap: `${gap}px`, height: `${height}px` }}
        role="list"
        aria-label="Brand accordion"
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <a
              key={item.name}
              ref={(el) => (panelRefs.current[i] = el)}
              href={item.link}
              className={`
                group relative block min-w-0 min-h-0 flex-[1_1_0]
                max-md:min-w-[72px] max-md:shrink-0 max-md:snap-start
                cursor-pointer overflow-hidden
                bg-gray-50 border border-gray-200 hover:border-gray-300
                transition-colors no-underline outline-none
                focus-visible:ring-2 focus-visible:ring-black
                ${brandClassName}
              `}
              style={{
                borderRadius: `${radius}px`,
                willChange: 'flex-grow',
              }}
              onClick={(e) => handleClick(i, e)}
              onMouseEnter={() => handleEnter(i)}
              onFocus={() => handleFocus(i)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              role="listitem"
              aria-label={item.name}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                ref={(el) => (textRefs.current[i] = el)}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span
                  className="text-lg font-bold  text-gray-900 whitespace-nowrap"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.name}
                </span>
              </span>

              <span
                ref={(el) => (logoRefs.current[i] = el)}
                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 px-4"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  draggable="false"
                  className="max-h-32 max-w-[80%] object-contain select-none"
                  style={{ WebkitUserDrag: 'none' }}
                />
              </span>
            </a>
          );
        })}
      </div>
    </>
  );
}