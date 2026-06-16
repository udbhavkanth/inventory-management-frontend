# Inventory Management System — Frontend

A production-ready React frontend for managing inventory, products, customers, and orders. Built with Vite for fast development and optimized production builds.

## Project Overview

This application provides the client-side interface for an Inventory & Order Management System. The frontend foundation includes:

- **Admin dashboard layout** — Sidebar navigation, responsive navbar, and main content area
- **Service layer** — Axios-based API services mapped to the backend contract
- **Custom hooks** — Data fetching, loading/error state, and mutation actions
- **Reusable components** — Loader, ErrorMessage, EmptyState, StatCard
- **Placeholder pages** — Dashboard stats and entity management sections ready for CRUD implementation

### Pages

| Route | Page | Status |
|-------|------|--------|
| `/` | Dashboard | Static placeholder stat cards |
| `/products` | Product Management | Hook-wired; form/table coming soon |
| `/customers` | Customer Management | Hook-wired; form/table coming soon |
| `/orders` | Order Management | Hook-wired; form/list coming soon |

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool and dev server
- **React Router DOM** — Client-side routing
- **Axios** — HTTP client for API communication

State is managed with React hooks only (no Redux, Zustand, or React Query).

## Architecture

```
Pages → Custom Hooks → Services → Axios (api.js) → Backend API
```

- **Pages** consume hooks and render common UI components
- **Hooks** manage loading, error, data, and refresh/mutation actions
- **Services** contain API method definitions only (no UI logic)
- **Components** are organized by domain (`layout/`, `common/`, `dashboard/`, etc.)

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- Backend API running (default: `http://localhost:8000`)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd inventory-management-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

## Environment Variables

| Variable       | Description              | Default                  |
| -------------- | ------------------------ | ------------------------ |
| `VITE_API_URL` | Backend API base URL     | `http://localhost:8000`  |

Create a `.env` file in the project root (see `.env.example`):

```env
VITE_API_URL=http://localhost:8000
```

> **Note:** Only variables prefixed with `VITE_` are exposed to the client.

## Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Other Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
src/
├── assets/                 # Static assets
├── components/
│   ├── layout/             # Sidebar, Navbar
│   ├── common/             # Loader, ErrorMessage, EmptyState
│   ├── dashboard/          # StatCard
│   ├── products/           # Product UI (Phase 2)
│   ├── customers/          # Customer UI (Phase 2)
│   └── orders/             # Order UI (Phase 2)
├── pages/                  # Route-level page components
├── hooks/                  # Custom data hooks
├── services/               # API service layer
├── routes/                 # Route definitions
├── layouts/                # MainLayout
├── utils/                  # Shared utilities
├── App.jsx
└── main.jsx
```

## API Integration

Services are configured against the backend API:

| Service | Endpoints |
|---------|-----------|
| `dashboardService` | `GET /dashboard` |
| `productService` | `GET/POST /products`, `GET/PUT/DELETE /products/{id}` |
| `customerService` | `GET/POST /customers`, `GET/DELETE /customers/{id}` |
| `orderService` | `GET/POST /orders`, `GET/DELETE /orders/{id}` |

## License

Private — All rights reserved.
