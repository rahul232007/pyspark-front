import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Trophy, Zap, Coins, ArrowRight, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { useAuthStore } from '../../store/useAuthStore';
import { triggerCelebration } from '../../utils/confetti';
import { soundEffects } from '../../utils/sound';
import { Card } from '../../components/common/Card/Card';
import { Button } from '../../components/common/Button/Button';
import { Badge } from '../../components/common/Badge/Badge';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { getRankFromXp } from '../../types/rank';

export const LevelCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const soundEnabled = useAuthStore((s) => s.settings.soundEnabled);
  const user = useAuthStore((s) => s.user);
  const completedSummary = useGameStore((s) => s.completedSummary);

  useEffect(() => {
    // Trigger confetti & level up sound on mount!
    triggerCelebration();
    soundEffects.playLevelUp(soundEnabled);
  }, [soundEnabled]);

  const xpEarned = completedSummary?.xpEarned || 150;
  const coinsEarned = completedSummary?.coinsEarned || 30;
  const stars = completedSummary?.stars || 3;
  const lessonTitle = completedSummary?.lessonTitle || 'Python Quest Cleared!';

  const currentRankInfo = getRankFromXp(user?.stats.xp || 850);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 bg-cyber-grid relative overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', damping: 20 }}
        className="w-full max-w-lg z-10"
      >
        <Card variant="gold" className="p-8 text-center space-y-6 border-amber-400/60 shadow-[0_0_50px_rgba(251,191,36,0.3)]">
          {/* Trophy Header */}
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)]"
            >
              <Trophy className="w-10 h-10 text-slate-950" />
            </motion.div>
            <Sparkles className="w-6 h-6 text-amber-300 absolute -top-2 -right-2 animate-ping" />
          </div>

          <div>
            <h1 className="text-3xl font-black text-gradient-gold">VICTORY CLEARED!</h1>
            <p className="text-sm font-extrabold text-slate-200 mt-1">{lessonTitle}</p>
          </div>

          {/* Stars Rating */}
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3].map((starNum) => (
              <motion.div
                key={starNum}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + starNum * 0.15 }}
              >
                <Star
                  className={`w-10 h-10 ${
                    starNum <= stars
                      ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                      : 'fill-slate-800 text-slate-700'
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* Reward Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center gap-3">
              <Zap className="w-7 h-7 fill-cyan-400 text-cyan-400" />
              <div className="text-left">
                <span className="text-2xl font-black text-cyan-300">+{xpEarned}</span>
                <span className="block text-[10px] uppercase font-bold text-slate-400">XP Earned</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-3">
              <Coins className="w-7 h-7 text-amber-400" />
              <div className="text-left">
                <span className="text-2xl font-black text-amber-300">+{coinsEarned}</span>
                <span className="block text-[10px] uppercase font-bold text-slate-400">Coins Earned</span>
              </div>
            </div>
          </div>

          {/* Rank Progress Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Current Rank Tier</span>
              <Badge rank={user?.rank || 'Bronze'} size="sm" />
            </div>
            <ProgressBar value={user?.stats.xp || 850} max={currentRankInfo.maxXp} color="cyan" size="sm" />
          </div>

          {/* Continue Action */}
          <Button
            variant="gold"
            size="lg"
            className="w-full py-4 text-slate-950 font-black tracking-wider"
            onClick={() => {
              soundEffects.playClick(soundEnabled);
              navigate('/learn');
            }}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Claim Rewards & Continue
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};
