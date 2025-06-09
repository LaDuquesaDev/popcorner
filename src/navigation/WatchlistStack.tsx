import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WatchlistScreen } from '../screens/WatchlistScreen';
import { MovieDetailsScreen } from '../screens/MovieDetailsScreen';
import { WatchlistStackParamList } from './types';

const Stack = createNativeStackNavigator<WatchlistStackParamList>();

const WatchlistStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WatchlistMain" component={WatchlistScreen} options={{ title: 'Watchlist', headerShown: false }}/>
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={({ route }) => ({ title: route.params.title, headerShown: true })} />
    </Stack.Navigator>
  );
};

export default WatchlistStack;
