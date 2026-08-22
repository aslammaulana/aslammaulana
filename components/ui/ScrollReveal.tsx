'use client';

import React, { useEffect, useRef, useState } from 'react';

export type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade';

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;   // dalam ms (default: 700)
  delay?: number;      // dalam ms (default: 0)
  distance?: string;   // jarak pergeseran (default: '30px')
  threshold?: number;  // 0.0 - 1.0 (default: 0.15)
  once?: boolean;      // default: true
  className?: string;  // styling tambahan
  as?: React.ElementType; // default: 'div'
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  duration = 700,
  delay = 0,
  distance = '30px',
  threshold = 0.15,
  once = true,
  className = '',
  as: Component = 'div',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Dukungan Aksesibilitas (Reduced Motion)
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setIsVisible(true);
        return;
      }
    }

    // 2. Setup IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && domRef.current) {
            observer.unobserve(domRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [threshold, once]);

  // 3. Mapping kalkulasi transform awal
  const getInitialTransform = () => {
    switch (animation) {
      case 'fade-up':    return `translate3d(0, ${distance}, 0)`;
      case 'fade-down':  return `translate3d(0, -${distance}, 0)`;
      case 'fade-left':  return `translate3d(${distance}, 0, 0)`;
      case 'fade-right': return `translate3d(-${distance}, 0, 0)`;
      case 'fade':       return 'translate3d(0, 0, 0)';
      default:           return `translate3d(0, ${distance}, 0)`;
    }
  };

  const animationStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth ease-out
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      ref={domRef as any}
      style={animationStyle}
      className={className}
    >
      {children}
    </Component>
  );
}
