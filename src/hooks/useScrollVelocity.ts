import { useEffect, useRef, useState } from 'react';
import { useScroll, useVelocity, useSpring, MotionValue } from 'framer-motion';

export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  return smoothVelocity;
}

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      if (latest > lastScrollY.current) {
        setDirection('down');
      } else if (latest < lastScrollY.current) {
        setDirection('up');
      }
      lastScrollY.current = latest;
    });
  }, [scrollY]);

  return direction;
}

export function useScrollBasedValue(
  scrollProgress: MotionValue<number>,
  inputRange: number[],
  outputRange: number[]
) {
  const [value, setValue] = useState(outputRange[0]);

  useEffect(() => {
    return scrollProgress.on('change', (latest) => {
      for (let i = 0; i < inputRange.length - 1; i++) {
        if (latest >= inputRange[i] && latest <= inputRange[i + 1]) {
          const progress = (latest - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
          const newValue = outputRange[i] + progress * (outputRange[i + 1] - outputRange[i]);
          setValue(newValue);
          break;
        }
      }
    });
  }, [scrollProgress, inputRange, outputRange]);

  return value;
}
