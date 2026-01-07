import React from 'react';
import { motion, MotionProps } from 'framer-motion';

export interface AnimationProps extends MotionProps {
  children: React.ReactNode;
}

export const Motion: React.FC<AnimationProps> = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>
};

export const FadeIn: React.FC<Omit<AnimationProps, 'initial' | 'animate'>> = ({ 
  children, 
  transition = { duration: 0.3 },
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn: React.FC<Omit<AnimationProps, 'initial' | 'animate'> & { direction?: 'left' | 'right' | 'up' | 'down' }> = ({
  children,
  direction = 'up',
  transition = { duration: 0.3 },
  ...props
}) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<Omit<AnimationProps, 'initial' | 'animate'>> = ({
  children,
  transition = { duration: 0.3 },
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};
