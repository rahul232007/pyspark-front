import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Lock, CheckCircle2, Flame, Code, Users, Star } from 'lucide-react';
import { achievementService } from '../../services/achievements';
import { Achievement } from '../../types/achievement';
import { Card } from '../../components/common/Card/Card';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { Loader } from '../../components/common/Loader/Loader';

export const AchievementsPage: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    achievementService.getAchievements().then((res) => {
      setAchievements(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader text="Loading Trophy Room..." />;

  const categories = ['All', 'Streak', 'Quiz', 'Coding', 'Level', 'Social'];

  const filteredAchievements = achievements.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-100 flex items-center gap-2">
            <Award className="w-8 h-8 text-amber-400" />
            <span>Achievement Trophies</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Unlock badges to earn bonus XP and showcase your Python prowess.
          </p>
        </div>

        {/* Unlocked Summary Badge */}
        <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-sm flex items-center gap-2">
          <Star className="w-4 h-4 fill-amber-400" />
          <span>
            {unlockedCount} / {achievements.length} Unlocked
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((ach) => (
          <Card
            key={ach.id}
            hoverEffect
            className={`flex flex-col justify-between p-6 ${
              ach.isUnlocked
                ? 'border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                : 'opacity-70 border-slate-800'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                    ach.isUnlocked
                      ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 border-amber-300 shadow-md'
                      : 'bg-slate-900 text-slate-600 border-slate-800'
                  }`}
                >
                  {ach.isUnlocked ? (
                    <Award className="w-7 h-7" />
                  ) : (
                    <Lock className="w-6 h-6" />
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs font-black text-cyan-400">
                  <Zap className="w-3.5 h-3.5 fill-cyan-400" />
                  <span>+{ach.xpReward} XP</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
                  {ach.title}
                  {ach.isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{ach.description}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <ProgressBar
                value={ach.progress}
                max={ach.maxProgress}
                label={`${ach.progress} / ${ach.maxProgress}`}
                color={ach.isUnlocked ? 'gold' : 'purple'}
                size="sm"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
