import React from 'react';

interface AnimatePresenceProps {
  children: React.ReactNode;
  mode?: 'wait' | 'sync';
}

/**
 * Custom AnimatePresence component as a lightweight alternative to framer-motion
 * This is a simplified version that just renders children without complex animation orchestration
 * For full animation capabilities, use framer-motion's AnimatePresence
 */
export const AnimatePresence: React.FC<AnimatePresenceProps> = ({ 
  children, 
  mode = 'sync' 
}) => {
  return <>{children}</>;
};
