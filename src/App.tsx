import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import { CartProvider } from './contexts/CartContext';
import { UnifiedCartProvider } from './contexts/UnifiedCartContext';
import { PrerollProvider } from './contexts/PrerollContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // Disable browser scroll restoration
  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PrerollProvider>
        <CartProvider>
          <UnifiedCartProvider>
            <main id="main-content">
              <AppRoutes />
            </main>
          </UnifiedCartProvider>
        </CartProvider>
      </PrerollProvider>
    </BrowserRouter>
  );
}

export default App;