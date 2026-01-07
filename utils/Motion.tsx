import React, { useEffect, useState } from 'react';

interface MotionProps {
  children: React.ReactNode;
  initial?: React.CSSProperties;
  animate?: React.CSSProperties;
  exit?: React.CSSProperties;
  transition?: string;
  className?: string;
  style?: React.CSSProperties;
  whileHover?: React.CSSProperties;
  whileTap?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Custom Motion component as a lightweight alternative to framer-motion
 * Provides basic animation capabilities using CSS transitions
 */
export const Motion: React.FC<MotionProps> = ({
  children,
  initial = {},
  animate = {},
  exit = {},
  transition = 'all 0.3s ease-out',
  className = '',
  style = {},
  whileHover,
  whileTap,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const [currentStyle, setCurrentStyle] = useState<React.CSSProperties>(initial);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setCurrentStyle(animate), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.();
  };

  const computedStyle: React.CSSProperties = {
    ...style,
    ...currentStyle,
    ...(isHovered && whileHover),
    ...(isTapped && whileTap),
    transition
  };

  return (
    <div
      className={className}
      style={computedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsTapped(true)}
      onMouseUp={() => setIsTapped(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
