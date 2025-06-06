import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './services/api';
import {Home} from './screens/Home';

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
        <Home />
    </QueryClientProvider>
  );
}

export default App;