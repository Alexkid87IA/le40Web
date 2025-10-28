import React from 'react';
import AppRoutes from './router/AppRoutes';
import { CartProvider } from './contexts/CartContext';
import { PrerollProvider } from './contexts/PrerollContext';
import CookieConsent from './components/GDPR/CookieConsent';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <PrerollProvider>
        <CartProvider>
          <AppRoutes />
          <CookieConsent />
        </CartProvider>
      </PrerollProvider>
    </ErrorBoundary>
  );
}

export default App;