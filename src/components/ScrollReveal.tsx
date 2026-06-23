import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export type RevealVariant =
  | 'fadeUp'
  | 'fadeDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp'
  | 'blurIn'
  | 'rotateIn'
  | 'flipUp'
  | 'clipReveal'
  | 'elastic'
  | 'swoopIn'
  | 'glideUp';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  margin?: string;
  /** For staggered children: wraps each direct child with a delay offset */
  stagger?: number;
}

const variants: Record<RevealVariant, { hidden: Record<string, any>; visible: Record<string, any>; transition?: Record<string, any> }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
    transition: { type: 'spring', damping: 25, stiffness: 120 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    transition: { type: 'spring', damping: 20, stiffness: 100 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
    transition: { type: 'spring', damping: 22, stiffness: 100 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
    transition: { type: 'spring', damping: 22, stiffness: 100 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
    transition: { type: 'spring', damping: 18, stiffness: 90 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 30 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -6, y: 40, scale: 0.95 },
    visible: { opacity: 1, rotate: 0, y: 0, scale: 1 },
    transition: { type: 'spring', damping: 20, stiffness: 80 },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 25, y: 50, transformPerspective: 1200 },
    visible: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1200 },
    transition: { type: 'spring', damping: 22, stiffness: 100 },
  },
  clipReveal: {
    hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', y: 20 },
    visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  elastic: {
    hidden: { opacity: 0, scale: 0.6, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0 },
    transition: { type: 'spring', damping: 12, stiffness: 100, mass: 0.8 },
  },
  swoopIn: {
    hidden: { opacity: 0, x: -60, y: 40, rotate: -3 },
    visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
    transition: { type: 'spring', damping: 20, stiffness: 90 },
  },
  glideUp: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  className = '',
  once = true,
  margin = '-80px',
  stagger,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as any });

  const v = variants[variant];

  // If stagger mode: wrap each child
  if (stagger && React.Children.count(children) > 1) {
    return (
      <div ref={ref} className={className}>
        {React.Children.map(children, (child, index) => (
          <motion.div
            initial={v.hidden}
            animate={isInView ? v.visible : v.hidden}
            transition={{
              ...v.transition,
              ...(duration ? { duration } : {}),
              delay: delay + index * stagger,
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={v.hidden}
      animate={isInView ? v.visible : v.hidden}
      transition={{
        ...v.transition,
        ...(duration ? { duration } : {}),
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
