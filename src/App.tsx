import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import { UnifiedCartProvider } from './contexts/UnifiedCartContext';
import { PrerollProvider } from './contexts/PrerollContext';
import { AnnouncerProvider } from './components/A11y/Announcer';
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
      <AnnouncerProvider>
        <ScrollToTop />
        <PrerollProvider>
          <UnifiedCartProvider>
            <main id="main-content">
              <AppRoutes />
            </main>
          </UnifiedCartProvider>
        </PrerollProvider>
      </AnnouncerProvider>
    </BrowserRouter>
  );
}

export default App;
