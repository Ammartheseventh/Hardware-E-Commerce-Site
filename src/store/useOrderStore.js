import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function generateOrderId(orders) {
  const year = new Date().getFullYear();
  const seq = String(orders.length + 1).padStart(4, '0');
  return `ORD-${year}-${seq}`;
}

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const id = generateOrderId(get().orders);
        const order = {
          id,
          createdAt: new Date().toISOString(),
          ...orderData,
        };
        set((state) => ({ orders: [...state.orders, order] }));
        return id;
      },

      getOrderById: (id) => get().orders.find((o) => o.id === id) ?? null,

      updateOrder: (id, patch) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, ...patch } : o
          ),
        })),
    }),
    { name: 'order-storage' }
  )
);