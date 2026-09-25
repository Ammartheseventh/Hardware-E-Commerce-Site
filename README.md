# MyStore — E-Commerce Frontend

A minimal e-commerce storefront built for a 3-day sprint. Reserve items online, pay in person.

## Stack

- **Vite + React** — fast dev server, minimal config
- **React Router v7** — client-side routing
- **Zustand** — cart and toast state, persisted to localStorage
- **Tailwind CSS v4** — utility-first styling
- **Mock data** — products live in `src/data/products.js` for now

## Features

- Product listing with responsive grid
- Product detail via card → "Add to Cart"
- Cart with quantity controls, remove, and clear
- Booking modal for in-person payment ("checkout")
- Cart persists across refreshes via localStorage
- Toast notifications on add-to-cart

## Not Included (Out of Scope For Now)

- Real payment gateway
- Backend / API
- User authentication
- Admin panel

## Running Locally

```bash
npm install
npm run dev