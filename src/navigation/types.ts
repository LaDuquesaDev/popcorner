import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  MovieDetails: { id: number; title: string };
};

export type TabParamList = {
  Home: undefined;
  Watchlist: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
