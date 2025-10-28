import { useRef, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';
import { useThrottle } from './useThrottle';

interface ParallaxMouseReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  mouseX: ReturnType<typeof useMotionValue>;
  mouseY: ReturnType<typeof useMotionValue>;
}

/**
 * Hook pour créer un effet parallax basé sur la position de la souris
 * Optimisé avec throttle pour éviter les re-renders excessifs
 *
 * @param intensity - Intensité de l'effet parallax (défaut: 20)
 * @param throttleDelay - Délai de throttle en ms (défaut: 16ms = ~60fps)
 * @returns Les refs et motion values nécessaires pour l'effet parallax
 */
export function useParallaxMouse(
  intensity: number = 20,
  throttleDelay: number = 16
): ParallaxMouseReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useThrottle((e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * intensity);
    mouseY.set(y * intensity);
  }, throttleDelay);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove as any);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove as any);
    };
  }, [handleMouseMove]);

  return { containerRef, mouseX, mouseY };
}
