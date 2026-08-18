// src/features/cart/store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/features/catalog/schemas/product.schema';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        let newItems;
        if (existingItem) {
          newItems = currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...currentItems, { ...product, quantity: 1 }];
        }

        set({
          items: newItems,
          totalItems: get().totalItems + 1,
          totalPrice: get().totalPrice + product.price,
        });
      },

      removeItem: (productId) => {
        const currentItems = get().items;
        const itemToRemove = currentItems.find((item) => item.id === productId);

        if (!itemToRemove) return;

        const newItems = currentItems
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        set({
          items: newItems,
          totalItems: get().totalItems - 1,
          totalPrice: get().totalPrice - itemToRemove.price,
        });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'ecommerce-cart-storage', // Salva no localStorage para persistência
    }
  )
);