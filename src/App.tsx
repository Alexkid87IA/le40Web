import React from 'react';
import AppRoutes from './router/AppRoutes';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;