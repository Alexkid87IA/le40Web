import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface StickySectionProps {
  children: ReactNode;
  index: number;
  totalSections: number;
}

export default function StickySection({ children, index, totalSections }: StickySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(
    smoothProgress,
    [0, 1],
    [1, 0.85]
  );

  const y = useTransform(
    smoothProgress,
    [0, 1],
    [0, -100]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.8, 1],
    [1, 0.8, 0.5]
  );

  const rotateX = useTransform(
    smoothProgress,
    [0, 1],
    [0, 8]
  );

  const borderRadius = useTransform(
    smoothProgress,
    [0, 1],
    ['0px', '40px']
  );

  const boxShadow = useTransform(
    smoothProgress,
    [0, 1],
    [
      '0 0 0 rgba(0, 0, 0, 0)',
      '0 -20px 80px rgba(0, 0, 0, 0.8)'
    ]
  );

  return (
    <div
      ref={sectionRef}
      className="sticky top-0 h-screen"
      style={{ zIndex: totalSections - index }}
    >
      <motion.div
        style={{
          scale,
          y,
          opacity,
          rotateX,
          borderRadius,
          boxShadow,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center bottom'
        }}
        className="h-full w-full overflow-hidden will-change-transform"
      >
        <motion.div
          className="h-full w-full"
          style={{
            filter: useTransform(smoothProgress, [0, 1], ['brightness(1)', 'brightness(0.7)'])
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
