import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeMain: undefined;
  MovieDetails: { id: number; title: string; from: string };
};

export type WatchlistStackParamList = {
  WatchlistMain: undefined;
  MovieDetails: {
    id: number;
    title: string;
    from: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Watchlist: undefined;
};

export type NavigationProp = NativeStackNavigationProp<HomeStackParamList>;
export type WatchlistNavigationProp = NativeStackNavigationProp<WatchlistStackParamList>;
