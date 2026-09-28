import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function generateId() {
  return `addr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useAddressStore = create(
  persist(
    (set, get) => ({
      addresses: [],

      addAddress: (address) => {
        const current = get().addresses;
        const isFirst = current.length === 0;
        const newAddress = {
          id: generateId(),
          ...address,
          isDefault: isFirst ? true : Boolean(address.isDefault),
        };

        // If adding a new default (and it's not the first), demote the old one
        let next = current.map((a) =>
          newAddress.isDefault ? { ...a, isDefault: false } : a
        );

        next = [...next, newAddress];
        set({ addresses: next });
        return newAddress.id;
      },

      updateAddress: (id, patch) => {
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...patch } : a
          ),
        }));
      },

      removeAddress: (id) => {
        const current = get().addresses;
        const wasDefault = current.find((a) => a.id === id)?.isDefault;
        let next = current.filter((a) => a.id !== id);

        // If the default was deleted and alternates remain, promote the first
        if (wasDefault && next.length > 0 && !next.some((a) => a.isDefault)) {
          next = next.map((a, i) => (i === 0 ? { ...a, isDefault: true } : a));
        }

        set({ addresses: next });
      },

      makeDefault: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },
    }),
    { name: 'address-storage' }
  )
);