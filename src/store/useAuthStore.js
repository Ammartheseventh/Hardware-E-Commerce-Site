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
      setUser: (user) => set({ user }),
      updateUser: (patch) =>
        set((state) => ({ user: { ...state.user, ...patch } })),
      clearUser: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
);