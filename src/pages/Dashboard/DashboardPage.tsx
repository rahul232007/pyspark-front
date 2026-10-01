import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Zap,
  Coins,
  BookOpen,
  Award,
  ArrowRight,
  Target,
  Code,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { getRankFromXp, RANKS } from '../../types/rank';
import { Card } from '../../components/common/Card/Card';
import { Button } from '../../components/common/Button/Button';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { Badge } from '../../components/common/Badge/Badge';
import { Avatar } from '../../components/common/Avatar/Avatar';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  if (!user) return null;

  const currentRankInfo = getRankFromXp(user.stats.xp);
  const nextRankName =
    currentRankInfo.name === 'Grandmaster'
      ? 'Grandmaster (Max)'
      : currentRankInfo.name === 'Master'
      ? 'Grandmaster'
      : currentRankInfo.name === 'Diamond'
      ? 'Master'
      : currentRankInfo.name === 'Platinum'
      ? 'Diamond'
      : currentRankInfo.name === 'Gold'
      ? 'Platinum'
      : currentRankInfo.name === 'Silver'
      ? 'Gold'
      : currentRankInfo.name === 'Bronze'
      ? 'Silver'
      : 'Bronze';

  const xpProgressInCurrentTier = user.stats.xp - currentRankInfo.minXp;
  const xpNeededInCurrentTier =
    currentRankInfo.maxXp === Infinity ? 1 : currentRankInfo.maxXp - currentRankInfo.minXp + 1;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card variant="neon" className="relative overflow-hidden p-6 sm:p-8">
        <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <Avatar src={user.avatar} rank={user.rank} size="xl" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
                  Welcome back, {user.username}!
                </h1>
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              <p className="text-xs sm:text-sm text-cyan-300 font-semibold mt-1">
                {currentRankInfo.description}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Badge rank={user.rank} size="md" />
                <span className="text-xs text-slate-400 font-mono">
                  Level {user.stats.currentLevel} Adventurer
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="gold"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/learn')}
          >
            Continue Learning
          </Button>
        </div>
      </Card>

      {/* Rank & Level Progress Banner */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
          <div>
            <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              Rank Progression
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-black text-slate-100">{user.rank}</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-bold text-cyan-400">{nextRankName}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-cyan-300">
              {user.stats.xp} / {currentRankInfo.maxXp === Infinity ? 'MAX' : currentRankInfo.maxXp + 1} Total XP
            </span>
          </div>
        </div>
        <ProgressBar
          value={xpProgressInCurrentTier}
          max={xpNeededInCurrentTier}
          color="cyan"
          size="lg"
          showPercentage
        />
      </Card>

      {/* Top 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Streak */}
        <Card hoverEffect className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-100">{user.stats.streakDays} Days</div>
            <div className="text-xs text-slate-400 font-semibold">Daily Streak</div>
          </div>
        </Card>

        {/* Total XP */}
        <Card hoverEffect className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-100">{user.stats.xp}</div>
            <div className="text-xs text-slate-400 font-semibold">Total XP Earned</div>
          </div>
        </Card>

        {/* Coins */}
        <Card hoverEffect className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-100">{user.stats.coins}</div>
            <div className="text-xs text-slate-400 font-semibold">Py-Coins</div>
          </div>
        </Card>

        {/* Global Rank Position */}
        <Card hoverEffect className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-100">#{user.stats.globalRankPosition}</div>
            <div className="text-xs text-slate-400 font-semibold">Global Leaderboard</div>
          </div>
        </Card>
      </div>

      {/* Main Content split: Continue Learning + Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Active Card */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-black text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Continue Your Learning Quest</span>
          </h3>

          <Card hoverEffect className="border-cyan-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge text="Beginner" variant="difficulty" size="sm" />
                  <span className="text-xs font-bold text-cyan-400">+100 XP Reward</span>
                </div>
                <h4 className="text-lg font-black text-slate-100">
                  Topic: Math & Logic Operators
                </h4>
                <p className="text-xs text-slate-400">
                  Master arithmetic (+, -, *, /) and modulo operators in Python.
                </p>
              </div>

              <Button
                variant="primary"
                onClick={() => navigate('/learn/top_basics/lesson/les_operators')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Resume Quest
              </Button>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800">
              <ProgressBar value={66} max={100} label="Topic Progress" color="cyan" size="sm" showPercentage />
            </div>
          </Card>
        </div>

        {/* Recent Achievements */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Recent Achievements</span>
          </h3>

          <div className="space-y-3">
            <Card variant="glass" className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-slate-100">First Python Spark</h5>
                <p className="text-xs text-slate-400">Completed first Python lesson</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </Card>

            <Card variant="glass" className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-slate-100">On Fire!</h5>
                <p className="text-xs text-slate-400">3-day learning streak</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
