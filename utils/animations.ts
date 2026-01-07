// Lightweight animation presets for custom Motion components
// These can be used as alternatives to framer-motion when needed

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideUp = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0)' },
  exit: { opacity: 0, transform: 'translateY(20px)' }
};

export const slideDown = {
  initial: { opacity: 0, transform: 'translateY(-20px)' },
  animate: { opacity: 1, transform: 'translateY(0)' },
  exit: { opacity: 0, transform: 'translateY(-20px)' }
};

export const scaleIn = {
  initial: { opacity: 0, transform: 'scale(0.9)' },
  animate: { opacity: 1, transform: 'scale(1)' },
  exit: { opacity: 0, transform: 'scale(0.9)' }
};

export const slideInRight = {
  initial: { opacity: 0, transform: 'translateX(100px)' },
  animate: { opacity: 1, transform: 'translateX(0)' },
  exit: { opacity: 0, transform: 'translateX(100px)' }
};

export const slideInLeft = {
  initial: { opacity: 0, transform: 'translateX(-100px)' },
  animate: { opacity: 1, transform: 'translateX(0)' },
  exit: { opacity: 0, transform: 'translateX(-100px)' }
};

export const rotateIn = {
  initial: { opacity: 0, transform: 'rotate(-10deg) scale(0.95)' },
  animate: { opacity: 1, transform: 'rotate(0deg) scale(1)' },
  exit: { opacity: 0, transform: 'rotate(10deg) scale(0.95)' }
};

export const blurIn = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(10px)' }
};
