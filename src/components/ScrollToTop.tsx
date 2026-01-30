import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // useLayoutEffect pour bloquer le rendu et scroller avant le paint
  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  // Fallback après le rendu complet (lazy-loaded pages via Suspense)
  useEffect(() => {
    if (!hash) {
      // Après le premier rendu
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
      // Fallback supplémentaire pour les pages lourdes
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
}
