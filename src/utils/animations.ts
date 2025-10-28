import { Variants } from 'framer-motion';

/**
 * Constantes d'animations réutilisables pour Framer Motion
 * Évite la duplication de code et assure la cohérence
 */

// Animations de base
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 }
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 }
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 }
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

// Animations de hover communes
export const hoverLift = {
  y: -12,
  scale: 1.02,
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2, ease: 'easeOut' }
};

export const hoverRotate = {
  scale: 1.1,
  rotate: 360,
  transition: { duration: 0.6, ease: 'easeInOut' }
};

// Transitions communes
export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30
};

export const smoothTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] // Cubic bezier pour animations fluides
};

export const fastTransition = {
  duration: 0.3,
  ease: 'easeOut'
};

// Animations de liste (pour stagger)
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Animations de chargement
export const pulse = {
  scale: [1, 1.05, 1],
  opacity: [1, 0.8, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const spin = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: 'linear'
  }
};

// Animations de background (orbs, gradients)
export const floatingOrb = {
  animate: {
    scale: [1, 1.2, 1],
    x: [0, 60, 0],
    y: [0, -40, 0]
  },
  transition: {
    duration: 10,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

// Configuration viewport par défaut
export const defaultViewport = {
  once: true,
  amount: 0.3,
  margin: '-100px'
};

/**
 * Helper pour créer une animation whileInView standard
 */
export const createWhileInView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
});

/**
 * Helper pour créer une animation de stagger
 */
export const createStagger = (items: number, baseDelay = 0.1) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: (index: number) => ({
    duration: 0.6,
    delay: baseDelay * index,
    ease: [0.16, 1, 0.3, 1]
  })
});
