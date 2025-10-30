import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.92]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -40]
  );

  const brightness = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.9, 0.75]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 4]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 20]
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
          rotateX,
          borderRadius,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center bottom'
        }}
        className="h-full w-full overflow-hidden"
      >
        <motion.div
          className="h-full w-full"
          style={{
            filter: `brightness(${brightness.get()})`
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
