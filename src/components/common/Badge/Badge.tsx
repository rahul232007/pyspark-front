import React from 'react';
import { RankType, RANKS } from '../../../types/rank';
import * as Icons from 'lucide-react';

export interface BadgeProps {
  rank?: RankType;
  text?: string;
  variant?: 'rank' | 'difficulty' | 'category' | 'gold';
  icon?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  rank = 'Beginner',
  text,
  variant = 'rank',
  icon,
  size = 'md',
  className = '',
}) => {
  const rankInfo = RANKS[rank] || RANKS.Beginner;

  const IconComponent = icon
    ? (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon] || Icons.Award
    : (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[rankInfo.icon] || Icons.Award;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs font-bold',
  };

  if (variant === 'rank') {
    return (
      <span
        style={{ borderColor: rankInfo.color }}
        className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${rankInfo.badgeBg} ${sizeClasses[size]} ${className}`}
      >
        <IconComponent className="w-3.5 h-3.5" />
        <span>{text || rankInfo.name}</span>
      </span>
    );
  }

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    Intermediate: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    Advanced: 'bg-rose-500/20 border-rose-500/40 text-rose-300',
    Master: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
  };

  const badgeStyle = difficultyColors[text || 'Beginner'] || 'bg-slate-700/40 border-slate-600 text-slate-200';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-bold ${badgeStyle} ${sizeClasses[size]} ${className}`}
    >
      {IconComponent && <IconComponent className="w-3 h-3" />}
      <span>{text}</span>
    </span>
  );
};
