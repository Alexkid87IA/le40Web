import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { initWebVitals } from './lib/webVitals.ts';
import { preloadCriticalRoutes } from './lib/preload.ts';
import './index.css';

// Initialize Web Vitals monitoring
initWebVitals();

// Preload critical routes for better navigation performance
preloadCriticalRoutes();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
