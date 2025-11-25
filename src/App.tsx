import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import { CartProvider } from './contexts/CartContext';
import { UnifiedCartProvider } from './contexts/UnifiedCartContext';
import { PrerollProvider } from './contexts/PrerollContext';

function App() {
  return (
    <BrowserRouter>
      <PrerollProvider>
        <CartProvider>
          <UnifiedCartProvider>
            <AppRoutes />
          </UnifiedCartProvider>
        </CartProvider>
      </PrerollProvider>
    </BrowserRouter>
  );
}

export default App;