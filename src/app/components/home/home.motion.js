// HeroSection motion primitives for Framer Motion

export const heroFade = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

export const idlePulse = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [1, 0.95, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
};
