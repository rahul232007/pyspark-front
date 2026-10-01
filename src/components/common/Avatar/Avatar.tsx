import React from 'react';
import { RankType, RANKS } from '../../../types/rank';

export interface AvatarProps {
  src: string;
  alt?: string;
  rank?: RankType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showRankGlow?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User Avatar',
  rank = 'Beginner',
  size = 'md',
  showRankGlow = true,
  className = '',
}) => {
  const rankInfo = RANKS[rank] || RANKS.Beginner;

  const sizeClasses = {
    sm: 'w-8 h-8 ring-2',
    md: 'w-12 h-12 ring-2',
    lg: 'w-16 h-16 ring-3',
    xl: 'w-24 h-24 ring-4',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        style={{
          boxShadow: showRankGlow ? `0 0 15px ${rankInfo.glowColor}` : 'none',
          borderColor: rankInfo.color,
        }}
        className={`rounded-full overflow-hidden bg-slate-900 border-2 ${sizeClasses[size]} transition-all`}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
