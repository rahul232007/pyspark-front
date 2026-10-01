import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { soundEffects } from '../../../utils/sound';
import { useAuthStore } from '../../../store/useAuthStore';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'onClick'> {
  variant?: 'primary' | 'purple' | 'gold' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const soundEnabled = useAuthStore((s) => s.settings.soundEnabled);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundEffects.playClick(soundEnabled);
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg',
    md: 'px-5 py-2.5 text-sm font-bold rounded-xl',
    lg: 'px-7 py-3.5 text-base font-extrabold rounded-2xl',
  };

  const variantClasses = {
    primary: 'btn-game-primary text-slate-950 font-black tracking-wide',
    purple: 'btn-game-purple text-white font-black tracking-wide',
    gold: 'btn-game-gold text-slate-950 font-black tracking-wide',
    outline: 'border-2 border-cyan-500/50 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30',
    ghost: 'bg-slate-800/40 hover:bg-slate-700/60 text-slate-200 border border-slate-700/50',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
