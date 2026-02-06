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
  // Convert from kobo to naira with additional scaling
  // API returns very large numbers, so we divide by 100000 for reasonable display
  const amountInNaira = amount / 100000;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountInNaira);
};
