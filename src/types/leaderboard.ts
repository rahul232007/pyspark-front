import { RankType } from './rank';

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
