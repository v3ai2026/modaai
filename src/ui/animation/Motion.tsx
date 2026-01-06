import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import './animations.css';
import { TransitionConfig, createTransition } from './transitions';

export interface MotionProps {
  children?: React.ReactNode;
  initial?: CSSProperties;
  animate?: CSSProperties;
  exit?: CSSProperties;
  transition?: TransitionConfig;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  // Legacy framer-motion props (ignored for compatibility)
  whileHover?: any;
  whileTap?: any;
  variants?: any;
  [key: string]: any; // Allow other props
}

export const Motion: React.FC<MotionProps> = ({
  children,
  initial = {},
  animate = {},
  exit,
  transition,
  className = '',
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave,
  whileHover, // Ignored
  whileTap, // Ignored
  variants, // Ignored
  ...rest // Capture other props
}) => {
  const [currentStyle, setCurrentStyle] = useState<CSSProperties>(initial);

  useEffect(() => {
    // Trigger animation after initial render
    const timer = setTimeout(() => {
      setCurrentStyle({
        ...animate,
        transition: createTransition(transition),
      });
    }, 10);

    return () => clearTimeout(timer);
  }, [animate, transition]);

  const combinedStyle: CSSProperties = {
    ...style,
    ...currentStyle,
  };

  // Filter out non-DOM props
  const domProps = Object.keys(rest).reduce((acc: any, key) => {
    if (!['initial', 'animate', 'exit', 'transition'].includes(key)) {
      acc[key] = rest[key];
    }
    return acc;
  }, {});

  return (
    <div
      className={className}
      style={combinedStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...domProps}
    >
      {children}
    </div>
  );
};

export interface AnimatePresenceProps {
  children: React.ReactNode;
  mode?: 'wait' | 'sync';
}

export const AnimatePresence: React.FC<AnimatePresenceProps> = ({
  children,
}) => {
  // Simple wrapper that just renders children
  // For more complex exit animations, we'd need to track mounting/unmounting
  return <>{children}</>;
};

// Utility component for common animation patterns
export interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 300,
  delay = 0,
  className = '',
}) => (
  <Motion
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </Motion>
);

export const SlideIn: React.FC<FadeInProps & { direction?: 'up' | 'down' | 'left' | 'right' }> = ({
  children,
  duration = 300,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translateY(100%)';
      case 'down': return 'translateY(-100%)';
      case 'left': return 'translateX(-100%)';
      case 'right': return 'translateX(100%)';
    }
  };

  return (
    <Motion
      initial={{ transform: getInitialTransform(), opacity: 0 }}
      animate={{ transform: 'translate(0)', opacity: 1 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </Motion>
  );
};

export const ScaleIn: React.FC<FadeInProps> = ({
  children,
  duration = 300,
  delay = 0,
  className = '',
}) => (
  <Motion
    initial={{ transform: 'scale(0)', opacity: 0 }}
    animate={{ transform: 'scale(1)', opacity: 1 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </Motion>
);
