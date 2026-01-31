# Checkout Feature

Checkout process with Paystack payment integration

## Components

- **CheckoutForm** - CheckoutForm component
- **OrderSummary** - OrderSummary component
- **CheckoutPage** - CheckoutPage component
- **ConfirmationPage** - ConfirmationPage component

## Hooks

- **usePaystack** - Custom hook for checkout functionality

## Key Features

- Form validation
- Payment processing
- Order confirmation
- Error handling

## Structure

```
checkout/
├── components/     # UI components
├── hooks/         # Custom hooks
├── types/         # TypeScript types
├── api/          # API functions
├── stores/       # State management
└── utils/        # Utility functions
```

## Usage

```typescript
import { CheckoutForm } from '@/features/checkout/components';
import { usePaystack } from '@/features/checkout/hooks';
```
