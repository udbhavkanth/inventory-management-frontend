# Inventory Management System — Frontend

A production-ready React frontend for managing inventory, products, customers, and orders. Built with Vite for fast development and optimized production builds.

## Project Overview

This application provides the client-side interface for an Inventory Management System. Phase 1 includes:

- **Dashboard** — Overview and key metrics (placeholder)
- **Products** — Product catalog management (placeholder)
- **Customers** — Customer records management (placeholder)
- **Orders** — Order tracking and management (placeholder)

The project is structured for scalability with clear separation of concerns: pages, layouts, routes, services, and shared context.

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool and dev server
- **React Router DOM** — Client-side routing
- **Axios** — HTTP client for API communication

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

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
├── components/       # Reusable UI components
├── pages/            # Route-level page components
├── services/         # API and external service integrations
├── routes/           # Route definitions
├── context/          # React context providers
├── layouts/          # Layout wrappers (e.g. MainLayout)
├── App.jsx           # Root application component
└── main.jsx          # Application entry point
```

## License

Private — All rights reserved.
