import React from 'react';
import AppRoutes from './router/AppRoutes';
import { CartProvider } from './contexts/CartContext';
import { PrerollProvider } from './contexts/PrerollContext';
import WhatsAppWidget from './components/UI/WhatsAppWidget';

function App() {
  return (
    <PrerollProvider>
      <CartProvider>
        <AppRoutes />
        <WhatsAppWidget />
      </CartProvider>
    </PrerollProvider>
  );
}

export default App;