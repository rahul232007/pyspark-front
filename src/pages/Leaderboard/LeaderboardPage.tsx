import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Flame, Zap, Award, Users, Globe } from 'lucide-react';
import { leaderboardService } from '../../services/leaderboard';
import { LeaderboardEntry } from '../../types/leaderboard';
import { Card } from '../../components/common/Card/Card';
import { Badge } from '../../components/common/Badge/Badge';
import { Avatar } from '../../components/common/Avatar/Avatar';
import { Loader } from '../../components/common/Loader/Loader';

export const LeaderboardPage: React.FC = () => {
  const [tab, setTab] = useState<'weekly' | 'global' | 'friends'>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    leaderboardService.getLeaderboard(tab).then((res) => {
      setEntries(res);
      setLoading(false);
    });
  }, [tab]);

  const topThree = entries.slice(0, 3);
  const remaining = entries.slice(3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-100 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-amber-400" />
            <span>Py-Spark Leaderboards</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Compete with global Python coders and climb the rank hierarchy.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { id: 'weekly', label: 'Weekly', icon: Flame },
            { id: 'global', label: 'Global', icon: Globe },
            { id: 'friends', label: 'Friends', icon: Users },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === t.id
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader text="Fetching Rank Standings..." />
      ) : (
        <div className="space-y-6">
          {/* Top 3 Podium Cards */}
          {topThree.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {/* #2 Silver Podium */}
              <Card variant="glass" className="order-2 md:order-1 p-6 text-center space-y-3 border-slate-400/40">
                <div className="relative inline-block">
                  <Avatar src={topThree[1].avatar} rank={topThree[1].userRank} size="xl" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center border-2 border-slate-950 shadow-md">
                    2
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{topThree[1].username}</h3>
                  <Badge rank={topThree[1].userRank} size="sm" />
                </div>
                <div className="text-sm font-black text-cyan-300">
                  {tab === 'weekly' ? topThree[1].weeklyXp : topThree[1].xp} XP
                </div>
              </Card>

              {/* #1 Gold Champion Podium */}
              <Card variant="gold" className="order-1 md:order-2 p-8 text-center space-y-3 border-amber-400/60 shadow-[0_0_35px_rgba(251,191,36,0.3)] scale-105">
                <Crown className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
                <div className="relative inline-block">
                  <Avatar src={topThree[0].avatar} rank={topThree[0].userRank} size="xl" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center border-2 border-slate-950 shadow-md">
                    1
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gradient-gold">{topThree[0].username}</h3>
                  <Badge rank={topThree[0].userRank} size="sm" />
                </div>
                <div className="text-lg font-black text-amber-300">
                  {tab === 'weekly' ? topThree[0].weeklyXp : topThree[0].xp} XP
                </div>
              </Card>

              {/* #3 Bronze Podium */}
              <Card variant="glass" className="order-3 p-6 text-center space-y-3 border-amber-700/40">
                <div className="relative inline-block">
                  <Avatar src={topThree[2].avatar} rank={topThree[2].userRank} size="xl" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-700 text-amber-200 font-black text-xs flex items-center justify-center border-2 border-slate-950 shadow-md">
                    3
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">{topThree[2].username}</h3>
                  <Badge rank={topThree[2].userRank} size="sm" />
                </div>
                <div className="text-sm font-black text-cyan-300">
                  {tab === 'weekly' ? topThree[2].weeklyXp : topThree[2].xp} XP
                </div>
              </Card>
            </div>
          )}

          {/* Remaining Rankings Table */}
          <Card variant="glass" className="p-0 overflow-hidden">
            <div className="divide-y divide-slate-800">
              {remaining.map((entry) => (
                <div
                  key={entry.userId}
                  className={`p-4 flex items-center justify-between transition-colors ${
                    entry.isCurrentUser
                      ? 'bg-cyan-500/10 border-l-4 border-l-cyan-400'
                      : 'hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center font-mono font-bold text-sm text-slate-400">
                      #{entry.rankPosition}
                    </span>
                    <Avatar src={entry.avatar} rank={entry.userRank} size="sm" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        {entry.username}
                        {entry.isCurrentUser && (
                          <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-cyan-400 text-slate-950">
                            YOU
                          </span>
                        )}
                      </h4>
                      <Badge rank={entry.userRank} size="sm" />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Flame className="w-4 h-4" />
                      <span>{entry.streakDays}d</span>
                    </div>
                    <div className="text-sm font-mono font-black text-cyan-300 w-24 text-right">
                      {tab === 'weekly' ? entry.weeklyXp : entry.xp} XP
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
