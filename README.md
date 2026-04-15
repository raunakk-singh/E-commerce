# E-Commerce Site

Full-stack e-commerce application built with React, Vite and Sequelize. The project covers the core online shopping flow end to end: browsing products, searching the catalog, managing a cart, selecting delivery options, reviewing payment totals, placing orders, and viewing order history.

This repository is strong because it demonstrates both frontend and backend ownership, API-driven state management, persistent data handling, routing, testing, and responsive UI work in one project.

## Project Highlights

- Built a multi-page shopping experience with product listing, search, cart, checkout, orders, and tracking views.
- Connected a React frontend to an Express REST API using Axios and a Vite development proxy.
- Implemented persistent cart and order flows backed by Sequelize and a file-backed SQLite-compatible database.
- Added search behavior through a shared header so users can search from anywhere and land on filtered home-page results.
- Wrote component tests with Vitest and React Testing Library for checkout payment summary behavior.

## Features

- Product catalog with image, rating, price, and quantity selection
- Header search that filters products by name and keywords
- Cart management with add, update, and delete behavior
- Checkout flow with delivery-option selection and live payment summary
- Order placement that converts cart items into persisted orders
- Orders page showing purchase history, totals, and estimated delivery dates
- Tracking page UI for shipment progress
- Seeded backend data for products, delivery options, cart items, and orders
- Responsive layout across home, checkout, and account-related pages

## Tech Stack

**Frontend**

- React 19
- Vite 8
- React Router 7
- Axios
- Day.js
- Custom CSS
- Vitest
- React Testing Library

**Backend**

- Node.js
- Sequelize
- `sql.js-as-sqlite3` for local SQLite-style persistence
- CORS

## Architecture Overview

The frontend lives in `src/` and handles routing, page rendering, and API-driven UI updates.

The backend lives in `ecommerce-backend/` and exposes REST endpoints for:

- `/api/products`
- `/api/cart-items`
- `/api/delivery-options`
- `/api/payment-summary`
- `/api/orders`
- `/api/reset`

In development, Vite proxies `/api` and `/images` requests to the backend running on `http://localhost:3000`.

## Key Implementation Details

- Shared header component keeps navigation and search consistent across pages.
- Home page filters products using the query string so searches are linkable and state survives navigation.
- Checkout calculates totals through the backend, including shipping and tax.
- Orders are sorted by most recent and can be expanded with product details.
- Local database state is written to `database.sqlite` after create, update, and delete operations.

## Folder Structure

```text
E-commerce-site-1/
|-- src/
|   |-- components/
|   |-- pages/
|   |   |-- home/
|   |   |-- Checkout/
|   |   |-- orders/
|   |-- test/
|   |-- App.jsx
|   `-- main.jsx
|-- public/
|-- ecommerce-backend/
|   |-- models/
|   |-- routes/
|   |-- defaultData/
|   `-- server.js
|-- package.json
`-- vite.config.js
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd ecommerce-backend
npm install
cd ..
```

### 3. Start the backend

```bash
cd ecommerce-backend
npm start
```

The backend runs on `http://localhost:3000`.

### 4. Start the frontend

Open a second terminal in the project root:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Available Scripts

From the project root:

```bash
npm run dev
npm run build
npm run test
```

From `ecommerce-backend/`:

```bash
npm start
npm run dev
```

## Testing

Frontend tests are set up with Vitest and React Testing Library.

```bash
npm run test
```

The current suite includes checkout payment summary rendering verification.

## Why This Project Is Resume-Worthy

- Shows end-to-end product thinking across browsing, checkout, and post-purchase flows
- Demonstrates full-stack integration rather than a static frontend mockup
- Includes persistent data, API design, routing, and test coverage
- Uses modern React tooling and a modular code structure that is easy to extend

## Suggested Resume Summary

If you want, you can adapt this project into a resume bullet like:

> Built a full-stack e-commerce web application using React, Vite, Express, and Sequelize with product search, cart management, checkout, order history, and persistent local data storage.

