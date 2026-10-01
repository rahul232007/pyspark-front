import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'solid' | 'neon' | 'gold';
  glow?: boolean;
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  glow = false,
  hoverEffect = false,
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    glass: 'glass-card text-slate-100',
    solid: 'bg-slate-900/90 border border-slate-800 text-slate-100',
    neon: 'glass-card border-cyan-500/40 text-slate-100 shadow-[0_0_25px_rgba(0,240,255,0.15)]',
    gold: 'glass-card border-amber-400/40 text-slate-100 shadow-[0_0_25px_rgba(251,191,36,0.15)]',
  };

  return (
    <motion.div
      initial={hoverEffect ? { y: 0 } : undefined}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-2xl p-5 relative overflow-hidden ${variantStyles[variant]} ${
        glow ? 'glow-blue' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
