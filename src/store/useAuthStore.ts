import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, UserSettings } from '../types/user';
import { getRankFromXp, RankType } from '../types/rank';
import { supabaseService } from '../services/supabaseService';

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  settings: UserSettings;

  // Actions
  login: (email: string, password?: string) => Promise<boolean>;
  register: (username: string, email: string) => Promise<boolean>;
  logout: () => void;
  addXpAndCoins: (xpAmount: number, coinsAmount: number) => void;
  markLessonComplete: (lessonId: string) => void;
  markQuizComplete: (quizId: string) => void;
  markChallengeComplete: (challengeId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_pyspark_101',
  username: 'SparkCoder',
  email: 'spark.coder@pyspark.game',
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SparkCoder',
  rank: 'Bronze',
  bio: 'Learning Python loops and mastering Py-Spark challenges!',
  joinedDate: 'August 2026',
  stats: {
    xp: 850,
    coins: 140,
    currentLevel: 4,
    streakDays: 5,
    lessonsCompleted: 6,
    quizzesCompleted: 4,
    challengesSolved: 3,
    accuracyRate: 92,
    globalRankPosition: 42,
  },
  completedLessonIds: ['les_variables', 'les_data_types', 'les_operators'],
  completedQuizIds: ['quiz_variables', 'quiz_data_types'],
  completedChallengeIds: ['code_variables_1'],
  unlockedAchievementIds: ['ach_first_lesson', 'ach_streak_3'],
};

const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  musicEnabled: true,
  theme: 'dark',
  emailNotifications: true,
  pushNotifications: true,
  publicProfile: true,
  showOnLeaderboard: true,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: true, // Default to true for demo interactive experience
      user: DEFAULT_USER,
      settings: DEFAULT_SETTINGS,

      login: async (email, password) => {
        try {
          const supabaseUser = await supabaseService.signIn(email, password);
          if (supabaseUser) {
            const username = supabaseUser.user_metadata?.username || email.split('@')[0];
            const updatedUser: UserProfile = {
              ...DEFAULT_USER,
              id: supabaseUser.id,
              email: supabaseUser.email || email,
              username,
            };
            set({ isAuthenticated: true, user: updatedUser });
            supabaseService.syncUserProfile(updatedUser);
            return true;
          }
        } catch {
          // Fallback to local demo auth if Supabase is offline/not configured
        }

        const username = email.split('@')[0] || 'PythonMaster';
        const updatedUser: UserProfile = get().user
          ? { ...get().user!, email }
          : { ...DEFAULT_USER, email, username };

        set({ isAuthenticated: true, user: updatedUser });
        supabaseService.syncUserProfile(updatedUser);
        return true;
      },

      register: async (username, email) => {
        try {
          const supabaseUser = await supabaseService.signUp(username, email);
          if (supabaseUser) {
            const newUser: UserProfile = {
              ...DEFAULT_USER,
              id: supabaseUser.id,
              username,
              email,
              avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
              stats: {
                ...DEFAULT_USER.stats,
                xp: 100,
                coins: 50,
              },
            };
            set({ isAuthenticated: true, user: newUser });
            supabaseService.syncUserProfile(newUser);
            return true;
          }
        } catch {
          // Fallback to local demo registration
        }

        const newUser: UserProfile = {
          ...DEFAULT_USER,
          username,
          email,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`,
          stats: {
            ...DEFAULT_USER.stats,
            xp: 100,
            coins: 50,
          },
        };
        set({ isAuthenticated: true, user: newUser });
        supabaseService.syncUserProfile(newUser);
        return true;
      },

      logout: () => {
        supabaseService.signOut();
        set({ isAuthenticated: false });
      },

      addXpAndCoins: (xpAmount, coinsAmount) => {
        const { user } = get();
        if (!user) return;

        const newXp = user.stats.xp + xpAmount;
        const newCoins = user.stats.coins + coinsAmount;
        const newRankInfo = getRankFromXp(newXp);

        const updatedUser: UserProfile = {
          ...user,
          rank: newRankInfo.name as RankType,
          stats: {
            ...user.stats,
            xp: newXp,
            coins: newCoins,
          },
        };

        set({ user: updatedUser });
        supabaseService.syncUserProfile(updatedUser);
      },

      markLessonComplete: (lessonId) => {
        const { user } = get();
        if (!user) return;
        const isNew = !user.completedLessonIds.includes(lessonId);

        const updatedUser: UserProfile = {
          ...user,
          completedLessonIds: isNew ? [...user.completedLessonIds, lessonId] : user.completedLessonIds,
          stats: {
            ...user.stats,
            lessonsCompleted: isNew ? user.stats.lessonsCompleted + 1 : user.stats.lessonsCompleted,
            currentLevel: isNew ? Math.min(100, user.stats.currentLevel + 1) : user.stats.currentLevel,
          },
        };

        set({ user: updatedUser });
        supabaseService.syncUserProfile(updatedUser);
      },

      markQuizComplete: (quizId) => {
        const { user } = get();
        if (!user) return;
        const isNew = !user.completedQuizIds.includes(quizId);

        const updatedUser: UserProfile = {
          ...user,
          completedQuizIds: isNew ? [...user.completedQuizIds, quizId] : user.completedQuizIds,
          stats: {
            ...user.stats,
            quizzesCompleted: isNew ? user.stats.quizzesCompleted + 1 : user.stats.quizzesCompleted,
            currentLevel: isNew ? Math.min(100, user.stats.currentLevel + 1) : user.stats.currentLevel,
          },
        };

        set({ user: updatedUser });
        supabaseService.syncUserProfile(updatedUser);
      },

      markChallengeComplete: (challengeId) => {
        const { user } = get();
        if (!user) return;
        const isNew = !user.completedChallengeIds.includes(challengeId);

        const updatedUser: UserProfile = {
          ...user,
          completedChallengeIds: isNew ? [...user.completedChallengeIds, challengeId] : user.completedChallengeIds,
          stats: {
            ...user.stats,
            challengesSolved: isNew ? user.stats.challengesSolved + 1 : user.stats.challengesSolved,
            currentLevel: isNew ? Math.min(100, user.stats.currentLevel + 1) : user.stats.currentLevel,
          },
        };

        set({ user: updatedUser });
        supabaseService.syncUserProfile(updatedUser);
      },

      unlockAchievement: (achievementId) => {
        const { user } = get();
        if (!user) return;
        if (user.unlockedAchievementIds.includes(achievementId)) return;

        const updatedUser: UserProfile = {
          ...user,
          unlockedAchievementIds: [...user.unlockedAchievementIds, achievementId],
        };

        set({ user: updatedUser });
        supabaseService.syncUserProfile(updatedUser);
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      updateProfile: (updatedData) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = { ...user, ...updatedData };
        set({ user: updatedUser });
        supabaseService.syncUserProfile(updatedUser);
      },
    }),
    {
      name: 'pyspark_auth_store',
    }
  )
);
