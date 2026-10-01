import { supabase, isSupabaseConfigured } from './supabaseClient';
import { UserProfile } from '../types/user';
import { LeaderboardEntry } from '../types/leaderboard';
import { Friend } from '../types/friends';

export const supabaseService = {
  /**
   * Sync user stats, XP, coins, rank, and level progress to Supabase database.
   */
  async syncUserProfile(user: UserProfile): Promise<boolean> {
    if (!isSupabaseConfigured || !user.id || user.id.startsWith('usr_pyspark_')) {
      return false;
    }

    try {
      // 1. Upsert Profile Stats
      const { error: profileError } = await supabase.from('profiles').upsert(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          rank: user.rank,
          bio: user.bio,
          xp: user.stats.xp,
          coins: user.stats.coins,
          current_level: user.stats.currentLevel,
          streak_days: user.stats.streakDays,
          lessons_completed: user.stats.lessonsCompleted,
          quizzes_completed: user.stats.quizzesCompleted,
          challenges_solved: user.stats.challengesSolved,
          accuracy_rate: user.stats.accuracyRate,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

      if (profileError) {
        console.warn('Supabase profile sync error:', profileError.message);
      }

      // 2. Upsert Completed Progress Arrays
      const { error: progressError } = await supabase.from('user_progress').upsert(
        {
          user_id: user.id,
          completed_lessons: user.completedLessonIds,
          completed_quizzes: user.completedQuizIds,
          completed_challenges: user.completedChallengeIds,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );

      if (progressError) {
        console.warn('Supabase progress sync error:', progressError.message);
      }

      return true;
    } catch (err) {
      console.warn('Supabase sync exception:', err);
      return false;
    }
  },

  /**
   * Fetch real-time leaderboard entries from Supabase profiles table.
   */
  async fetchLeaderboard(): Promise<LeaderboardEntry[] | null> {
    if (!isSupabaseConfigured) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('xp', { ascending: false })
        .limit(50);

      if (error || !data) return null;

      return data.map((row: any, idx: number) => ({
        rankPosition: idx + 1,
        userId: row.id,
        username: row.username,
        avatar: row.avatar,
        userRank: row.rank || 'Bronze',
        xp: row.xp || 0,
        weeklyXp: Math.round((row.xp || 0) * 0.3),
        streakDays: row.streak_days || 0,
      }));
    } catch {
      return null;
    }
  },

  /**
   * Supabase Auth: Sign Up with email & password
   */
  async signUp(username: string, email: string, password?: string) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase.auth.signUp({
      email,
      password: password || 'PySparkPass123!',
      options: {
        data: {
          username,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
        },
      },
    });

    if (error) throw error;
    return data.user;
  },

  /**
   * Supabase Auth: Sign In
   */
  async signIn(email: string, password?: string) {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password || 'PySparkPass123!',
    });

    if (error) throw error;
    return data.user;
  },

  /**
   * Supabase Auth: Sign In with Google OAuth
   */
  async signInWithGoogle() {
    if (!isSupabaseConfigured) return null;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    });

    if (error) throw error;
    return data;
  },

  /**
   * Supabase Auth: Sign Out
   */
  async signOut() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  },
};
