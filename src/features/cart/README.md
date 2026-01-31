# Cart Feature

Shopping cart functionality with persistent state management

## Components

- **CartDrawer** - CartDrawer component
- **CartIcon** - CartIcon component
- **CartItem** - CartItem component
- **CartSummary** - CartSummary component

## Hooks

- **useCartStore** - Custom hook for cart functionality

## Key Features

- Add/remove items
- Quantity management
- Price calculations
- Persistent storage

## Structure

```
cart/
├── components/     # UI components
├── hooks/         # Custom hooks
├── types/         # TypeScript types
├── api/          # API functions
├── stores/       # State management
└── utils/        # Utility functions
```

## Usage

```typescript
import { CartDrawer } from '@/features/cart/components';
import { useCartStore } from '@/features/cart/hooks';
```
