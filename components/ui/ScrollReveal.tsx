'use client';

import React, { useEffect, useRef, useState } from 'react';

export type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade';

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;   // dalam ms (default: 800)
  delay?: number;      // dalam ms (default: 0)
  distance?: string;   // jarak pergeseran (default: '50px')
  threshold?: number;  // 0.0 - 1.0 (default: 0)
  rootMargin?: string; // default: '0px 0px -50px 0px' (sama seperti margin: "-50px" fariesky)
  once?: boolean;      // default: true
  className?: string;  // styling tambahan
  as?: React.ElementType; // default: 'div'
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  duration = 800,
  delay = 0,
  distance = '50px',
  threshold = 0,
  rootMargin = '0px 0px -50px 0px',
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
      { threshold, rootMargin }
    );

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [threshold, rootMargin, once]);

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

  // Opacity berdurasi 1000ms (1.25x transform duration) dengan ease-in-out persis seperti fariesky
  const opacityDuration = Math.round(duration * 1.25);

  const animationStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${opacityDuration}ms, ${duration}ms`,
    transitionTimingFunction: 'ease-in-out, cubic-bezier(0.21, 0.47, 0.32, 0.98)', // Kurva identik dengan fariesky
    transitionDelay: `${delay}ms, ${delay}ms`,
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
