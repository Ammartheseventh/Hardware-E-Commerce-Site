import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCheckoutStore = create(
  persist(
    (set) => ({
      info: null,
      delivery: null,
      shipping: null,

      setInfo: (info) => set({ info }),
      setDelivery: (delivery) => set({ delivery }),
      setShipping: (shipping) => set({ shipping }),

      reset: () => set({ info: null, delivery: null, shipping: null }),
    }),
    { name: 'checkout-storage' }
  )
);