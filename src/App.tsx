import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/api';
import { Home } from './screens/Home';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;