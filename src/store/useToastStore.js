import { create } from 'zustand';

export const useToastStore = create((set) => ({
  message: null,
  show: (message) => {
    set({ message });
    setTimeout(() => set({ message: null }), 2000);
  },
  hide: () => set({ message: null }),
}));