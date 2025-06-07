import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import { TabParamList } from '../types/navigation';
import { Home as HomeIcon, Bookmark } from 'react-native-feather';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS = {
  Home: ({ color, size }: { color: string; size: number }) => <HomeIcon stroke={color} width={size} height={size} />,
  Bookmarks: ({ color, size }: { color: string; size: number }) => <Bookmark stroke={color} width={size} height={size} />,
};

const renderTabBarIcon = (routeName: keyof typeof TAB_ICONS) => ({ color, size }: { color: string; size: number }) => {
  const IconComponent = TAB_ICONS[routeName];
  return IconComponent ? <IconComponent color={color} size={size} /> : null;
};

const screenOptions = ({ route }: { route: { name: string } }) => ({
  tabBarIcon: renderTabBarIcon(route.name as keyof typeof TAB_ICONS),
  headerShown: false,
  tabBarActiveTintColor: '#2196F3',
  tabBarInactiveTintColor: 'gray',
});

const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: 'Inicio' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
