import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  offset?: [string, string];
  clamp?: boolean;
}

export function useScrollParallax(
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const { speed = 0.5, offset = ['start end', 'end start'], clamp = true } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as [string, string],
  });

  const range = 200 * speed;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-range, range],
    { clamp }
  );

  return { y, scrollYProgress };
}

export function useScrollScale(
  ref: RefObject<HTMLElement>,
  options: { from?: number; to?: number; offset?: [string, string] } = {}
) {
  const { from = 0.8, to = 1, offset = ['start end', 'end start'] } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as [string, string],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, from]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { scale, opacity, scrollYProgress };
}

export function useScrollRotate(
  ref: RefObject<HTMLElement>,
  options: { maxRotation?: number; offset?: [string, string] } = {}
) {
  const { maxRotation = 15, offset = ['start end', 'end start'] } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as [string, string],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-maxRotation, 0, maxRotation]
  );

  return { rotate, scrollYProgress };
}

export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return scrollYProgress;
}

export function useColorMorph(
  scrollProgress: MotionValue<number>,
  colors: string[]
) {
  if (colors.length < 2) return colors[0] || '#000000';

  const segments = colors.length - 1;
  const points = Array.from({ length: colors.length }, (_, i) => i / segments);

  return useTransform(scrollProgress, points, colors);
}
