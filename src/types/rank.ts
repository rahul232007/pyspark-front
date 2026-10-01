export type RankType =
  | 'Beginner'
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Platinum'
  | 'Diamond'
  | 'Master'
  | 'Grandmaster';

export interface RankInfo {
  id: RankType;
  name: RankType;
  minXp: number;
  maxXp: number;
  icon: string; // Lucide icon name or emoji badge
  color: string; // TailWind color or hex
  glowColor: string;
  badgeBg: string;
  description: string;
}

export const RANKS: Record<RankType, RankInfo> = {
  Beginner: {
    id: 'Beginner',
    name: 'Beginner',
    minXp: 0,
    maxXp: 499,
    icon: 'Sprout',
    color: '#94A3B8',
    glowColor: 'rgba(148, 163, 184, 0.4)',
    badgeBg: 'bg-slate-500/20 border-slate-500/40 text-slate-300',
    description: 'Starting your Python adventure!',
  },
  Bronze: {
    id: 'Bronze',
    name: 'Bronze',
    minXp: 500,
    maxXp: 1499,
    icon: 'Shield',
    color: '#CD7F32',
    glowColor: 'rgba(205, 127, 50, 0.4)',
    badgeBg: 'bg-amber-800/30 border-amber-700/50 text-amber-300',
    description: 'Mastered basic variables and loops.',
  },
  Silver: {
    id: 'Silver',
    name: 'Silver',
    minXp: 1500,
    maxXp: 2999,
    icon: 'Award',
    color: '#E2E8F0',
    glowColor: 'rgba(226, 232, 240, 0.5)',
    badgeBg: 'bg-slate-300/20 border-slate-300/40 text-slate-100',
    description: 'Functions and list manipulations mastered.',
  },
  Gold: {
    id: 'Gold',
    name: 'Gold',
    minXp: 3000,
    maxXp: 4999,
    icon: 'Crown',
    color: '#FBBF24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    badgeBg: 'bg-amber-400/20 border-amber-400/50 text-amber-300',
    description: 'Dictionaries and OOP wizardry in training.',
  },
  Platinum: {
    id: 'Platinum',
    name: 'Platinum',
    minXp: 5000,
    maxXp: 7499,
    icon: 'Zap',
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    badgeBg: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300',
    description: 'Complex data structures handled with ease.',
  },
  Diamond: {
    id: 'Diamond',
    name: 'Diamond',
    minXp: 7500,
    maxXp: 10999,
    icon: 'Gem',
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    badgeBg: 'bg-purple-500/20 border-purple-400/50 text-purple-300',
    description: 'Algorithms and decorators mastered.',
  },
  Master: {
    id: 'Master',
    name: 'Master',
    minXp: 11000,
    maxXp: 14999,
    icon: 'Flame',
    color: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    badgeBg: 'bg-pink-500/20 border-pink-400/50 text-pink-300',
    description: 'Advanced Pythonista crafting clean frameworks.',
  },
  Grandmaster: {
    id: 'Grandmaster',
    name: 'Grandmaster',
    minXp: 15000,
    maxXp: Infinity,
    icon: 'Sparkles',
    color: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.7)',
    badgeBg: 'bg-cyan-400/30 border-cyan-300/60 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.4)]',
    description: 'Python God standing at the peak of the Py-Spark realm!',
  },
};

export const getRankFromXp = (xp: number): RankInfo => {
  if (xp >= 15000) return RANKS.Grandmaster;
  if (xp >= 11000) return RANKS.Master;
  if (xp >= 7500) return RANKS.Diamond;
  if (xp >= 5000) return RANKS.Platinum;
  if (xp >= 3000) return RANKS.Gold;
  if (xp >= 1500) return RANKS.Silver;
  if (xp >= 500) return RANKS.Bronze;
  return RANKS.Beginner;
};
