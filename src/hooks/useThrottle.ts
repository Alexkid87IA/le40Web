import { useCallback, useRef } from 'react';

/**
 * Hook pour throttler une fonction (limite le nombre d'appels)
 * Utile pour optimiser les événements haute fréquence (scroll, mousemove, resize)
 *
 * @param callback - La fonction à throttler
 * @param delay - Le délai minimum entre chaque appel (en ms)
 * @returns Une version throttlée de la fonction
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;

      if (timeSinceLastRun >= delay) {
        callback(...args);
        lastRun.current = now;
      } else {
        // Planifier l'appel pour la fin du délai
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    }) as T,
    [callback, delay]
  );
}
