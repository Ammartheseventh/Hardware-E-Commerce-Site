# CBG InfoTech — E-Commerce Storefront

A modern e-commerce storefront built for **CBG InfoTech Sdn Bhd**, a Malaysian IT equipment leasing and supply company. This is the front end of their first self-service ordering platform — a place for customers to browse the catalog, place orders, and manage their account online.

Built with React + Vite + Tailwind, with a Zustand-based state layer and a mock API that's structured to be swapped for a real backend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture Notes](#architecture-notes)
- [State Management](#state-management)
- [The API Layer](#the-api-layer)
- [Routing](#routing)
- [Design System](#design-system)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Features

### Catalog
- Product grid with responsive columns (2 / 3 / 4 / 5 across breakpoints)
- Product detail pages with image gallery and related products
- Category filtering, brand filtering, and full-text search
- Sort options: newest, oldest, price ascending, price descending
- Search matches name, part number, brand, category name, description, and spec values
- 25 products across 7 broad categories

### Cart & Checkout
- Persistent cart (survives refresh via localStorage)
- Multi-step checkout: Information → Delivery → Review & Payment → Confirmation
- Saved address picker with default-address pre-selection
- Province-based shipping calculation
- Two payment methods: DuitNow QR and Bank transfer, each with method-specific instructions
- Receipt upload for manual payment verification
- Coupon code support (percentage and fixed-amount)
- Discount applies to subtotal, not shipping

### Account
- Order history with fanned image stacks and status badges
- Order detail view reusing the shared order renderer
- Address book with a three-address model (one default, up to two alternates)
- Auto-promotion when the default address is deleted
- Profile settings (name, email, phone)

### Content
- `/about/*` route group with a branching nav: Mission & Vision, Contact, Returns, Privacy, Terms
- Compact footer with social links

### Branding
- Client logo in the header and as the favicon
- Red accent tied to the logo palette (cart badge, hover underlines)
- Brand accordion on the homepage — desktop expands on hover, mobile shows a swipe-scrollable row of logo cards

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| State | Zustand (with `persist` middleware) |
| Animation | GSAP (brand accordion only) |
| Icons | Custom SVGs + Simple Icons |
| Hosting | Vercel |

---

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173`.

### Requirements

- Node 18+
- npm 9+

---

## Project Structure

```
src/
├── api/                  # Mock API layer — the backend swap point
│   ├── products.js       # getProducts, getProductById, getFeatured, getLatest, getBrands
│   ├── coupons.js        # validateCoupon, calculateDiscount
│   ├── orderStatus.js    # status config and lookup
│   └── shipping.js       # shipping cost calculation
├── assets/
│   ├── logo.png          # client logo
│   ├── brands/           # monochrome brand SVGs
│   ├── products/         # product photos (local imports)
│   └── socials/          # footer social icons
├── components/
│   ├── account/          # AccountLayout, AccountNav, OrderDetails, AddressCard, AddressForm
│   ├── cart/             # CartItem, CouponInput
│   ├── catalog/          # ProductCard, ProductSection, FilterBar
│   ├── checkout/         # CheckoutLayout, CheckoutSteps, AddressPicker
│   ├── content/          # ContentLayout, ContentNav (branching nav for /about)
│   ├── home/             # HeroSearch, BrandAccordion, BrandsSection
│   ├── layout/           # Header, Footer, Layout, ContentPage
│   └── common/           # Toast
├── data/
│   ├── products.js       # product catalog
│   ├── categories.js     # 7 broad categories
│   ├── brands.js         # 8 homepage brand logos
│   ├── coupons.js        # coupon definitions
│   ├── provinces.js      # Malaysian provinces
│   └── paymentDetails.js # DuitNow QR + bank transfer config
├── hooks/
│   ├── useAsync.js       # async data fetching
│   ├── useFilters.js     # URL-synced filter state
│   └── useMediaQuery.js  # responsive breakpoints
├── pages/
│   ├── account/          # Orders, OrderDetail, Addresses, Settings
│   ├── checkout/         # Information, Delivery, Review, Confirmation
│   └── content/          # Mission, Contact, Returns, Privacy, Terms
├── store/                # Zustand stores
│   ├── useCartStore.js
│   ├── useOrderStore.js
│   ├── useAuthStore.js
│   ├── useAddressStore.js
│   ├── useCheckoutStore.js
│   └── useToastStore.js
├── App.jsx               # route definitions
└── index.css             # Tailwind + global styles
```

---

## Architecture Notes

### No backend yet — by design

Every data-fetching function lives in `src/api/` and returns a Promise, even when the data is local. This is deliberate: when the real backend arrives, each function in `api/` becomes a `fetch()` call, and **no component needs to change**.

```javascript
// today
export async function getProducts(filters = {}) {
  // filter/sort local array
}

// tomorrow
export async function getProducts(filters = {}) {
  const params = new URLSearchParams(filters);
  const res = await fetch(`/api/products?${params}`);
  return res.json();
}
```

The same applies to `api/coupons.js`, `api/shipping.js`, and `api/orderStatus.js`.

### The `useAsync` pattern

Components fetch data through a single hook:

```javascript
const { data, loading, error } = useAsync(fetchProducts);
```

`useAsync` re-runs its function whenever the function's identity changes. That's why filters are passed via `useCallback` — a change in the URL query string produces a new function identity, which triggers a refetch.

### URL-driven filtering

Filters live in the URL, not in local state:

```
/products?category=computers&sort=price-asc&q=laptop
```

`useFilters` reads from and writes to `useSearchParams`. This means:
- Every filtered view is shareable
- Back/forward buttons work
- "View all" links on the homepage land on meaningful URLs

---

## State Management

Six Zustand stores, each with a specific scope. All are persisted to `localStorage` unless noted.

| Store | Persisted | Purpose |
|---|---|---|
| `useCartStore` | ✅ `cart-storage` | Cart items + applied coupon |
| `useOrderStore` | ✅ `order-storage` | Placed orders |
| `useAuthStore` | ✅ `auth-storage` | Current (fake) user |
| `useAddressStore` | ✅ `address-storage` | Saved addresses |
| `useCheckoutStore` | ✅ `checkout-storage` | In-progress checkout info |
| `useToastStore` | ❌ | Transient toast notifications |

### The fake user

`useAuthStore` is seeded with a John Doe placeholder:

```javascript
{
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+60 12-345 6789',
}
```

When real authentication arrives, this store gets a login action that replaces the seeded user, and a logout action that clears it. Everything downstream reads `user` from the store — so nothing else changes.

---

## The API Layer

Every function in `src/api/` is async and returns the same shape whether the data is local or remote.

| Module | Functions |
|---|---|
| `api/products.js` | `getProducts(filters)`, `getProductById(id)`, `getFeatured()`, `getLatest()`, `getBrands()` |
| `api/coupons.js` | `validateCoupon(code)`, `calculateDiscount(coupon, subtotal)` |
| `api/shipping.js` | `calculateShipping(province, weight)` |
| `api/orderStatus.js` | `getOrderStatus(slug)` |

### Order statuses

Six statuses cover every order lifecycle:

```
pending_payment → verifying → (shipping | preparing_order)
                                        ↓
                                   received
```

- `pending_payment` — awaiting receipt upload
- `verifying` — receipt uploaded, awaiting admin review
- `shipping` — paid and dispatched (ship orders)
- `preparing_order` — paid, being prepared (pickup orders)
- `ready_for_pickup` — collected-ready (pickup orders)
- `received` — terminal state

Status config lives in `api/orderStatus.js` — labels and text colors in one place.

---

## Routing

```
/                          Home
/products                  Catalog
/products/:id              Product detail
/cart                      Cart

/account                   → redirects to /account/orders
/account/orders            Order history
/account/orders/:orderId   Order detail
/account/addresses         Address book
/account/settings          Profile settings

/about                     → redirects to /about/mission
/about/mission             Mission & Vision
/about/contact             Contact
/about/returns             Return policy
/about/privacy             Privacy policy
/about/terms               Terms & conditions

/checkout                  Information step
/checkout/delivery         Delivery step
/checkout/review           Review & payment
/checkout/confirmation/:id Confirmation
```

Nested routes (`/account/*`, `/about/*`) share a layout component that provides in-page navigation.

---

## Design System

### Palette

- **Base**: white, `gray-50` through `gray-900`
- **Accent**: `red-600` — tied to the client logo's red
- **Accent usage**: cart badge, hover underlines on "View all" links, link hovers in prose
- **Restraint**: red is used sparingly, never for large fills or backgrounds

### Typography

- Headings: `font-semibold`, tight tracking
- Body: `text-sm` / `text-base`, relaxed line-height
- Product names: clamped to 2 lines with a reserved 2-line height, so cards align

### Motion

- Hover effects: 200ms transitions
- Branching nav: staggered draw-in on mount, animated trace on active change
- Brand accordion: GSAP timeline for flex-grow + opacity, respects `prefers-reduced-motion`
- Toast: fade + slide
- Page transitions: none (each route renders immediately)

---

## Deployment

Hosted on Vercel. The project includes a `vercel.json` that rewrites all unmatched paths to `index.html` — required for client-side routing to work on direct URL access.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Without this, visiting `/about/mission` directly returns a 404 from Vercel, because Vercel looks for a file at that path instead of serving `index.html`.

---

## Roadmap

### Front end — remaining

- **Responsive pass** — mobile header nav (currently `hidden md:flex`, so phone users can't navigate)
- **Loading skeletons** — replace "Loading…" text with placeholder shapes
- **Empty states** — polish cart, orders, search-with-no-results
- **Page titles** — route-aware browser tab text

### Backend — the big phase

- Real product catalog (CMS-managed)
- User authentication
- Order persistence and admin verification flow
- Receipt file uploads
- Coupon management
- Email notifications

The front end is structured so that this phase is a drop-in replacement for the `api/` layer, not a rewrite.

---

## Notes for Reviewers

- **The fake user is intentional.** There's no auth yet, so `useAuthStore` is seeded with a placeholder. Real auth replaces this store's contents; nothing downstream changes.
- **`api/` returns Promises even for local data.** This is not accidental complexity — it's the seam where the backend plugs in.
- **Filters live in the URL.** Try bookmarking a filtered product page, then reloading it.
- **Order IDs are client-generated** (`ORD-YYYY-NNNN`). When the backend arrives, they'll be server-generated — the format is already the right shape.

---

## License

Proprietary. © CBG InfoTech Sdn Bhd.