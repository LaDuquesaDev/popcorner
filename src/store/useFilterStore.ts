import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FilterStore = {
  filterLetter: string;
  setFilterLetter: (letter: string) => void;
  clearFilter: () => void;
};

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filterLetter: '',
      setFilterLetter: (letter) => set({ filterLetter: letter }),
      clearFilter: () => set({ filterLetter: '' }),
    }),
    {
      name: 'filter-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
