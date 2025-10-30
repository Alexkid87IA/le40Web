import { Variants } from 'framer-motion';

export const elegantFadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const elegantScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

export const revealClipPath: Variants = {
  hidden: {
    clipPath: 'inset(0% 100% 0% 0%)',
    opacity: 0
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1]
    }
  }
};

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -90
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

export const imageReveal: Variants = {
  hidden: {
    scale: 1.2,
    opacity: 0,
    filter: 'blur(20px)'
  },
  visible: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const cardFloat: Variants = {
  initial: {
    y: 0,
    rotateX: 0,
    rotateY: 0
  },
  hover: {
    y: -12,
    rotateX: 5,
    rotateY: 5,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

export const shimmerEffect = {
  initial: {
    backgroundPosition: '-200% center'
  },
  animate: {
    backgroundPosition: '200% center',
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 1
    }
  }
};

export const breathingGlow = {
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

export const floatingParticle = (delay = 0) => ({
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 8,
      delay,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
});

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const liquidMorph = {
  animate: {
    borderRadius: [
      '60% 40% 30% 70% / 60% 30% 70% 40%',
      '30% 60% 70% 40% / 50% 60% 30% 60%',
      '60% 40% 30% 70% / 60% 30% 70% 40%'
    ],
    transition: {
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

export const perspective3D = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    transformPerspective: 1000
  },
  animate: (i: number) => ({
    rotateX: [0, 2, 0],
    rotateY: [0, -2, 0],
    transition: {
      duration: 4,
      delay: i * 0.2,
      ease: 'easeInOut',
      repeat: Infinity
    }
  })
};
