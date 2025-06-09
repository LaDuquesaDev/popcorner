import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import { TabParamList } from './types';
import { Home } from 'lucide-react-native';
import { Bookmark } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import WatchlistStack from './WatchlistStack';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS = {
  Home: ({ color, size }: { color: string; size: number }) => <Home color={color} size={size} />,
  Watchlist: ({ color, size }: { color: string; size: number }) => <Bookmark color={color} size={size} />,
};

const renderTabBarIcon = (routeName: keyof typeof TAB_ICONS) => ({ color, size }: { color: string; size: number }) => {
  const IconComponent = TAB_ICONS[routeName];
  return IconComponent ? <IconComponent color={color} size={size} /> : null;
};

const screenOptions = ({ route }: { route: { name: string } }) => ({
  tabBarIcon: renderTabBarIcon(route.name as keyof typeof TAB_ICONS),
  headerShown: false,
  tabBarActiveTintColor: COLORS.buttonActive,
  tabBarInactiveTintColor: COLORS.shadowColor,
});

const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistStack}
        options={{ title: 'Watchlist' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
