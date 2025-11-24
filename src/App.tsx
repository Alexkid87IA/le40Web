import React from 'react';
import AppRoutes from './router/AppRoutes';
import { UnifiedCartProvider } from './contexts/UnifiedCartContext';
import { PrerollProvider } from './contexts/PrerollContext';

function App() {
  return (
    <PrerollProvider>
      <UnifiedCartProvider>
        <AppRoutes />
      </UnifiedCartProvider>
    </PrerollProvider>
  );
}

export default App;