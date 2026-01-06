import { useState, useEffect, useRef, CSSProperties } from 'react';
import { TransitionConfig, createTransition } from './transitions';

export interface UseAnimationOptions extends TransitionConfig {
  autoPlay?: boolean;
}

export function useAnimation(
  initial: CSSProperties,
  animate: CSSProperties,
  options?: UseAnimationOptions
) {
  const { autoPlay = true, ...transitionConfig } = options || {};
  const [style, setStyle] = useState<CSSProperties>(initial);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (autoPlay) {
      // Small delay to ensure initial state is rendered
      const timer = setTimeout(() => {
        setStyle({
          ...animate,
          transition: createTransition(transitionConfig),
        });
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, animate, transitionConfig]);

  return { style, ref };
}

export function useInView(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { isInView, ref };
}

export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { isHovered, ref };
}
