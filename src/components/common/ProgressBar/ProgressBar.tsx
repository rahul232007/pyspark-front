import React from 'react';
import { motion } from 'framer-motion';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'cyan' | 'purple' | 'gold' | 'green';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = false,
  color = 'cyan',
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const gradientColors = {
    cyan: 'from-cyan-400 to-blue-600 shadow-[0_0_12px_rgba(0,240,255,0.6)]',
    purple: 'from-purple-400 to-indigo-600 shadow-[0_0_12px_rgba(168,85,247,0.6)]',
    gold: 'from-amber-300 to-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]',
    green: 'from-emerald-400 to-teal-600 shadow-[0_0_12px_rgba(52,211,153,0.6)]',
  };

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3.5',
    lg: 'h-5',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
          {label && <span className="text-slate-300">{label}</span>}
          {showPercentage && <span className="text-cyan-300 font-extrabold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 p-0.5 ${heightClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${gradientColors[color]}`}
        />
      </div>
    </div>
  );
};
