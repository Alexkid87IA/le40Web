import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si pas de hash dans l'URL, scroll en haut immédiatement
    if (!hash) {
      // Force immédiate
      window.scrollTo(0, 0);
      // Double check après un court délai
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, [pathname, hash]);

  return null;
}
