/**
 * Preload utilities for critical routes
 * Improves perceived performance by prefetching route components
 */

type PreloadFn = () => Promise<{ default: React.ComponentType }>;

const preloadedModules = new Set<string>();

/**
 * Preload a route component
 */
export function preloadRoute(importFn: PreloadFn, name: string) {
  if (preloadedModules.has(name)) return;

  preloadedModules.add(name);

  // Use requestIdleCallback if available, otherwise setTimeout
  const schedulePreload = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));

  schedulePreload(() => {
    importFn().catch(() => {
      // Remove from set if preload failed so it can be retried
      preloadedModules.delete(name);
    });
  });
}

/**
 * Preload critical routes after initial page load
 */
export function preloadCriticalRoutes() {
  // Wait for initial page to be fully loaded
  if (document.readyState === 'complete') {
    startPreloading();
  } else {
    window.addEventListener('load', startPreloading);
  }
}

function startPreloading() {
  // Delay preloading to not interfere with initial render
  setTimeout(() => {
    // Preload most visited pages
    preloadRoute(() => import('../pages/Studios'), 'Studios');
    preloadRoute(() => import('../pages/Coworking'), 'Coworking');
    preloadRoute(() => import('../pages/Contact'), 'Contact');
    preloadRoute(() => import('../pages/Domiciliation'), 'Domiciliation');
  }, 2000);

  // Preload secondary pages after a longer delay
  setTimeout(() => {
    preloadRoute(() => import('../pages/Salles'), 'Salles');
    preloadRoute(() => import('../pages/BureauxPrives'), 'BureauxPrives');
    preloadRoute(() => import('../pages/Packs'), 'Packs');
  }, 5000);
}

/**
 * Preload route on hover/focus for instant navigation
 */
export function useRoutePreload() {
  const preloadOnHover = (routeName: string, importFn: PreloadFn) => ({
    onMouseEnter: () => preloadRoute(importFn, routeName),
    onFocus: () => preloadRoute(importFn, routeName),
  });

  return { preloadOnHover };
}

// Route preload map for common routes
export const routePreloaders = {
  studios: () => import('../pages/Studios'),
  coworking: () => import('../pages/Coworking'),
  domiciliation: () => import('../pages/Domiciliation'),
  salles: () => import('../pages/Salles'),
  bureaux: () => import('../pages/BureauxPrives'),
  contact: () => import('../pages/Contact'),
  packs: () => import('../pages/Packs'),
  events: () => import('../pages/Events'),
  club: () => import('../pages/Club'),
} as const;

export default { preloadCriticalRoutes, preloadRoute, useRoutePreload };
