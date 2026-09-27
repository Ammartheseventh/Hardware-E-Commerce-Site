import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+60 12-345 6789',
      },
      // Real auth will replace these later
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
);