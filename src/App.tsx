import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './services/api';
import {NavigationContainer} from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import MainNavigator from './navigation/MainNavigator';

enableScreens();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <MainNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
