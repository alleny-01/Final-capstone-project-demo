// Import Zustand for state management and cart types
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CartState } from "../types/cart.types";
import { type Product } from "@/features/products/types/product.types";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          );

          if (existingItem) {
            // Check stock limit
            if (existingItem.quantity >= product.stock) {
              return state;
            }
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity: 1,
                addedAt: new Date().toISOString(),
              },
            ],
          };
        }),

      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId: string, quantity: number) =>
        set((state) => {
          if (quantity < 1) return state;

          return {
            items: state.items.map((item) => {
              if (item.product.id === productId) {
                // Check stock limit
                const newQuantity = Math.min(quantity, item.product.stock);
                return { ...item, quantity: newQuantity };
              }
              return item;
            }),
          };
        }),

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const items = get().items;
        return items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );
      },

      getVAT: () => {
        const subtotal = get().getSubtotal();
        return subtotal * 0.075;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getVAT();
      },

      getItemCount: () => {
        const items = get().items;
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "quickserve-cart",
    },
  ),
);
