# Products Feature

Product catalog with filtering and search capabilities

## Components

- **ProductCard** - ProductCard component
- **ProductGrid** - ProductGrid component
- **ProductFilters** - ProductFilters component
- **ProductSkeleton** - ProductSkeleton component

## Hooks

- **useProducts** - Custom hook for products functionality
- **useProductFilters** - Custom hook for products functionality

## Key Features

- Product listing
- Category filtering
- Search functionality
- Loading states

## Structure

```
products/
├── components/     # UI components
├── hooks/         # Custom hooks
├── types/         # TypeScript types
├── api/          # API functions
├── stores/       # State management
└── utils/        # Utility functions
```

## Usage

```typescript
import { ProductCard } from '@/features/products/components';
import { useProducts } from '@/features/products/hooks';
```
