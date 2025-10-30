import React from 'react';
import AppRoutes from './router/AppRoutes';
import { CartProvider } from './contexts/CartContext';
import { PrerollProvider } from './contexts/PrerollContext';

function App() {
  return (
    <PrerollProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </PrerollProvider>
  );
}

export default App;