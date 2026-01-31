import { type CartItem } from "../types/cart.types";

export const VAT_RATE = 0.075;

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
};

export const calculateVAT = (subtotal: number): number => {
  return subtotal * VAT_RATE;
};

export const calculateTotal = (subtotal: number, vat: number): number => {
  return subtotal + vat;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};
