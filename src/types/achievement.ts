import { RankType } from './rank';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Streak' | 'Quiz' | 'Coding' | 'Level' | 'Social' | 'Special';
  xpReward: number;
  coinReward: number;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  rankPosition: number;
  userId: string;
  username: string;
  avatar: string;
  userRank: RankType;
  xp: number;
  weeklyXp: number;
  streakDays: number;
  isCurrentUser?: boolean;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  rank: RankType;
  xp: number;
  streakDays: number;
  status: 'online' | 'offline' | 'in_game';
  lastActive: string;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRank: RankType;
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined';
}
