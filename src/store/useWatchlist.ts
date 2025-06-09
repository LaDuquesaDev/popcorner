import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Movie } from '../types/interfaces';

type WatchlistState = {
  watchlist: Movie[];
  addToWatchlist: (movie: any) => void;
  removeFromWatchlist: (id: number) => void;
  toggleWatchlist: (movie: any) => void;
  isInWatchlist: (id: number) => boolean;
};

export const useWatchlist = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist: (movie) => {
        const exists = get().watchlist.some((m) => m.id === movie.id);
        if (!exists) {
          set({ watchlist: [...get().watchlist, movie] });
        }
      },
      removeFromWatchlist: (id) => {
        set({ watchlist: get().watchlist.filter((m) => m.id !== id) });
      },
      toggleWatchlist: (movie) => {
        const exists = get().watchlist.some((m) => m.id === movie.id);
        if (exists) {
          get().removeFromWatchlist(movie.id);
        } else {
          get().addToWatchlist(movie);
        }
      },
      isInWatchlist: (id) => {
        return get().watchlist.some((m) => m.id === id);
      },
    }),
    {
      name: 'watchlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
