import { LeaderboardEntry } from '../types/leaderboard';
import { supabaseService } from './supabaseService';

export const MOCK_GLOBAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rankPosition: 1,
    userId: 'usr_1',
    username: 'PythonGod_99',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PythonGod_99',
    userRank: 'Grandmaster',
    xp: 18450,
    weeklyXp: 2400,
    streakDays: 42,
  },
  {
    rankPosition: 2,
    userId: 'usr_2',
    username: 'CyberCoder_X',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberCoder_X',
    userRank: 'Master',
    xp: 14200,
    weeklyXp: 1950,
    streakDays: 28,
  },
  {
    rankPosition: 3,
    userId: 'usr_3',
    username: 'DataQueen',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DataQueen',
    userRank: 'Diamond',
    xp: 9800,
    weeklyXp: 1600,
    streakDays: 19,
  },
  {
    rankPosition: 4,
    userId: 'usr_4',
    username: 'Sparky_Dev',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sparky_Dev',
    userRank: 'Platinum',
    xp: 6400,
    weeklyXp: 1200,
    streakDays: 14,
  },
  {
    rankPosition: 5,
    userId: 'usr_5',
    username: 'ByteNinja',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ByteNinja',
    userRank: 'Gold',
    xp: 4100,
    weeklyXp: 850,
    streakDays: 9,
  },
  {
    rankPosition: 42,
    userId: 'usr_pyspark_101',
    username: 'SparkCoder',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SparkCoder',
    userRank: 'Bronze',
    xp: 850,
    weeklyXp: 450,
    streakDays: 5,
    isCurrentUser: true,
  },
];

export const leaderboardService = {
  async getLeaderboard(type: 'global' | 'weekly' | 'friends'): Promise<LeaderboardEntry[]> {
    const supabaseData = await supabaseService.fetchLeaderboard();
    if (supabaseData && supabaseData.length > 0) {
      if (type === 'weekly') {
        return [...supabaseData].sort((a, b) => b.weeklyXp - a.weeklyXp);
      }
      return supabaseData;
    }

    await new Promise((r) => setTimeout(r, 200));
    if (type === 'weekly') {
      return [...MOCK_GLOBAL_LEADERBOARD].sort((a, b) => b.weeklyXp - a.weeklyXp);
    }
    return MOCK_GLOBAL_LEADERBOARD;
  },
};
