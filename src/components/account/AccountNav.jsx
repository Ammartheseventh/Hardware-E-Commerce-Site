import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const navItems = [
  { to: '/account/orders', label: 'My Orders' },
  { to: '/account/addresses', label: 'Addresses' },
  { to: '/account/settings', label: 'Settings' },
];

const PAD = 6;

const CONFIG = {
  mobile: {
    width: 'w-40',
    row: 28,
    font: 'text-xs',
    indent: 32,
    trunk: 12,
    radius: 8,
    headerFont: 'text-sm',
  },
  tablet: {
    width: 'w-40',
    row: 32,
    font: 'text-sm',
    indent: 36,
    trunk: 13,
    radius: 9,
    headerFont: 'text-sm',
  },
  desktop: {
    width: 'w-44',
    row: 40,
    font: 'text-md',
    indent: 40,
    trunk: 14,
    radius: 12,
    headerFont: 'text-[18px]',
  },
};

export default function AccountNav() {
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(false);

  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const config = isLg ? CONFIG.desktop : isMd ? CONFIG.tablet : CONFIG.mobile;

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const rowY = (k) => PAD + k * config.row + config.row / 2;
  const branchPath = (k) =>
    `M ${config.trunk} ${rowY(k) - config.radius} A ${config.radius} ${config.radius} 0 0 0 ${config.trunk + config.radius} ${rowY(k)} H ${config.indent - 8}`;
  const tracePath = (k) =>
    `M ${config.trunk} 0 V ${rowY(k) - config.radius} A ${config.radius} ${config.radius} 0 0 0 ${config.trunk + config.radius} ${rowY(k)} H ${config.indent - 8}`;
  const traceLength = (k) =>
    rowY(k) -
    config.radius +
    (Math.PI * config.radius) / 2 +
    (config.indent - 8 - config.trunk - config.radius);

  const bodyHeight = PAD * 2 + navItems.length * config.row;
  const trunkHeight = rowY(navItems.length - 1) - config.radius;

  return (
    <nav
      className={`relative flex ${config.width} shrink-0 flex-col leading-[1.2]`}
    >
      <div className={`py-2.25 ${config.headerFont} font-semibold text-zinc-900`}>
        Account
      </div>

      <div
        className="relative"
        style={{ paddingTop: PAD, paddingBottom: PAD }}
      >
        <svg
          className="pointer-events-none absolute left-0 top-0 overflow-visible"
          width={config.indent}
          height={bodyHeight}
          aria-hidden="true"
        >
          <path
            className="fill-none stroke-#d4d4d8 stroke-1.5 [stroke-linecap:round] [stroke-linejoin:round] [transition:stroke-dashoffset_400ms_cubic-bezier(0.23,1,0.32,1)]"
            d={`M ${config.trunk} 0 V ${trunkHeight}`}
            style={{
              strokeDasharray: trunkHeight,
              strokeDashoffset: mounted ? 0 : trunkHeight,
            }}
          />

          {navItems.map((item, k) => (
            <path
              key={`branch-${item.to}`}
              className="fill-none stroke-#d4d4d8 stroke-1.5 [stroke-linecap:round] [stroke-linejoin:round] [transition:stroke-dashoffset_400ms_cubic-bezier(0.23,1,0.32,1)]"
              d={branchPath(k)}
              style={{
                strokeDasharray: traceLength(k),
                strokeDashoffset: mounted ? 0 : traceLength(k),
                transitionDelay: `${(k + 1) * 80}ms`,
              }}
            />
          ))}

          {navItems.map((item, k) => {
            const isActive = pathname.startsWith(item.to);
            const len = traceLength(k);
            return (
              <path
                key={`trace-${item.to}`}
                className="fill-none stroke:#18181b stroke-1.5 [stroke-linecap:round] [stroke-linejoin:round] [transition:stroke-dashoffset_400ms_cubic-bezier(0.23,1,0.32,1)]"
                d={tracePath(k)}
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: isActive ? 0 : len,
                }}
              />
            );
          })}
        </svg>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center ${config.font} transition-[color,transform] duration-200 origin-left ${
                isActive
                  ? 'text-zinc-900 font-medium'
                  : 'text-zinc-500 hover:text-zinc-900'
              } hover:scale-110`
            }
            style={{ height: config.row, paddingLeft: config.indent }}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}