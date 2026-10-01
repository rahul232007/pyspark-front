import { RankType } from './rank';

export interface UserStats {
  xp: number;
  coins: number;
  currentLevel: number;
  streakDays: number;
  lessonsCompleted: number;
  quizzesCompleted: number;
  challengesSolved: number;
  accuracyRate: number;
  globalRankPosition: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  rank: RankType;
  bio?: string;
  joinedDate: string;
  stats: UserStats;
  completedLessonIds: string[];
  completedQuizIds: string[];
  completedChallengeIds: string[];
  unlockedAchievementIds: string[];
}

export interface UserSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  theme: 'dark' | 'neon' | 'cyberpunk';
  emailNotifications: boolean;
  pushNotifications: boolean;
  publicProfile: boolean;
  showOnLeaderboard: boolean;
}
