# QuickServe E-commerce

A modern, feature-rich e-commerce application built with React, TypeScript, and Vite. Features a clean product catalog, shopping cart, and integrated Paystack payment processing.

## Features

- **Product Catalog**: Browse products with filtering, search, and pagination
- **Shopping Cart**: Add/remove items with persistent state management
- **Checkout Flow**: Seamless checkout with Paystack payment integration
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type-Safe**: Full TypeScript support throughout the application
- **State Management**: Zustand for cart state, React Query for server state
- **URL-Synced Filters**: Filter state persists in URL query parameters

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **State Management**:
  - Zustand (client state)
  - TanStack Query (server state)
- **Forms**: React Hook Form + Zod validation
- **Payment**: Paystack
- **UI Components**: Custom components with Radix UI primitives
- **HTTP Client**: Axios

## Project Structure

```
quickserve-ecommerce/
├── src/
│   ├── app/                    # App configuration
│   │   ├── providers/         # Global providers
│   │   └── router/            # Route definitions
│   ├── features/              # Feature modules
│   │   ├── products/          # Product catalog
│   │   ├── cart/              # Shopping cart
│   │   └── checkout/          # Checkout & payment
│   ├── components/            # Shared components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # UI primitives
│   ├── lib/                   # Utilities & config
│   │   ├── axios.ts          # API client
│   │   ├── react-query.ts    # Query config
│   │   └── constants/        # App constants
│   └── hooks/                 # Global hooks
├── public/                    # Static assets
└── [config files]
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Paystack account for payment processing

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd quickserve-ecommerce
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Add your Paystack public key to `.env`:

```env
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
```

Get your key from [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer)

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Features Overview

### Products Feature

Browse and filter products with:

- Category filtering
- Search functionality
- Price range filtering
- Server-side pagination
- URL-synced filter state
- Loading skeletons

See [Products README](src/features/products/README.md) for details.

### Cart Feature

Shopping cart with:

- Add/remove items
- Quantity management
- Real-time price calculations
- Persistent storage (localStorage)
- Cart drawer UI

See [Cart README](src/features/cart/README.md) for details.

### Checkout Feature

Complete checkout flow with:

- Customer information form
- Order summary
- Paystack payment integration
- Order confirmation page
- Form validation with Zod

## Routes

- `/` - Landing page with featured products
- `/products` - Full product catalog with filters
- `/checkout` - Checkout and payment
- `/confirmation` - Order confirmation

## Key Dependencies

| Package                    | Purpose                 |
| -------------------------- | ----------------------- |
| `react`                    | UI framework            |
| `react-router-dom`         | Routing                 |
| `@tanstack/react-query`    | Server state management |
| `zustand`                  | Client state management |
| `axios`                    | HTTP client             |
| `react-hook-form`          | Form handling           |
| `zod`                      | Schema validation       |
| `react-paystack`           | Payment integration     |
| `nuqs`                     | URL state management    |
| `@rc-component/pagination` | Pagination component    |
| `lucide-react`             | Icons                   |
| `tailwindcss`              | Styling                 |

## Environment Variables

| Variable                   | Description             | Required |
| -------------------------- | ----------------------- | -------- |
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack public API key | Yes      |

## Architecture Patterns

### Feature-Based Structure

Each feature is self-contained with its own components, hooks, types, and API functions.

### URL-Synced Filters

Filter state is synchronized with URL query parameters using `nuqs`, enabling shareable filtered views.

### Type Safety

Full TypeScript coverage with strict type checking and Zod schema validation.

### Component Composition

Reusable UI components built with Radix UI primitives and styled with Tailwind CSS.

## Contributing

1. Follow the existing folder structure and naming conventions
2. Use TypeScript for all new files
3. Add proper type definitions
4. Follow the component patterns in existing features
5. Run linting before committing

## License

This project is private and not licensed for public use.
