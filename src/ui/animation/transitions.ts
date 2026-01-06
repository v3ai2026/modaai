export interface TransitionConfig {
  duration?: number;
  delay?: number;
  easing?: string;
}

export const easings = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const defaultTransition: TransitionConfig = {
  duration: 300,
  delay: 0,
  easing: easings.easeInOut,
};

export const springTransition: TransitionConfig = {
  duration: 600,
  delay: 0,
  easing: easings.spring,
};

export const bounceTransition: TransitionConfig = {
  duration: 500,
  delay: 0,
  easing: easings.bounce,
};

export function createTransition(config?: TransitionConfig): string {
  const { duration = 300, delay = 0, easing = easings.easeInOut } = config || {};
  return `all ${duration}ms ${easing} ${delay}ms`;
}
