import { type Product } from "@/features/products/types/product.types";

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getVAT: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}
