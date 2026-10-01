import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Zap,
  Coins,
  Flame,
  Award,
  BookOpen,
  Code,
  Target,
  Edit,
  Calendar,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { getRankFromXp } from '../../types/rank';
import { Card } from '../../components/common/Card/Card';
import { Avatar } from '../../components/common/Avatar/Avatar';
import { Badge } from '../../components/common/Badge/Badge';
import { Button } from '../../components/common/Button/Button';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { Modal } from '../../components/common/Modal/Modal';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [bioInput, setBioInput] = useState(user?.bio || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '');

  if (!user) return null;

  const currentRankInfo = getRankFromXp(user.stats.xp);

  const avatarOptions = [
    'https://api.dicebear.com/7.x/bottts/svg?seed=SparkCoder',
    'https://api.dicebear.com/7.x/bottts/svg?seed=PythonMaster',
    'https://api.dicebear.com/7.x/bottts/svg?seed=CyberNinja',
    'https://api.dicebear.com/7.x/bottts/svg?seed=DataQueen',
    'https://api.dicebear.com/7.x/bottts/svg?seed=AlgoWizard',
  ];

  const handleSaveProfile = () => {
    updateProfile({
      bio: bioInput,
      avatar: selectedAvatar,
    });
    setShowEditModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card variant="neon" className="p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10 text-center md:text-left">
          <Avatar src={user.avatar} rank={user.rank} size="xl" />
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl font-black text-slate-100">{user.username}</h1>
                <p className="text-xs text-slate-400 font-mono flex items-center justify-center md:justify-start gap-1 mt-1">
                  <Calendar className="w-3.5 h-3.5" /> Joined {user.joinedDate}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditModal(true)}
                leftIcon={<Edit className="w-4 h-4" />}
              >
                Edit Profile
              </Button>
            </div>

            <p className="text-sm text-cyan-200 font-medium italic">{user.bio}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <Badge rank={user.rank} size="md" />
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
                Level {user.stats.currentLevel}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Rank Progress Breakdown */}
      <Card variant="glass" className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-extrabold uppercase text-slate-400">Rank Progress</span>
          <span className="text-xs font-mono text-cyan-300 font-bold">
            {user.stats.xp} / {currentRankInfo.maxXp} XP
          </span>
        </div>
        <ProgressBar
          value={user.stats.xp - currentRankInfo.minXp}
          max={currentRankInfo.maxXp - currentRankInfo.minXp}
          color="cyan"
          size="md"
          showPercentage
        />
      </Card>

      {/* 4 Key Performance Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-100">{user.stats.lessonsCompleted}</div>
            <div className="text-xs text-slate-400 font-semibold">Lessons Finished</div>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-100">{user.stats.challengesSolved}</div>
            <div className="text-xs text-slate-400 font-semibold">Monaco Problems</div>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-100">{user.stats.accuracyRate}%</div>
            <div className="text-xs text-slate-400 font-semibold">Quiz Accuracy</div>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-100">{user.stats.streakDays} Days</div>
            <div className="text-xs text-slate-400 font-semibold">Daily Streak</div>
          </div>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Customize Hero Profile"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Select Avatar</label>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {avatarOptions.map((av, idx) => (
                <img
                  key={idx}
                  src={av}
                  alt="Avatar option"
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-14 h-14 rounded-full border-2 cursor-pointer p-0.5 transition-all ${
                    selectedAvatar === av
                      ? 'border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)] scale-110'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Hero Bio</label>
            <textarea
              rows={3}
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <Button variant="primary" className="w-full py-3" onClick={handleSaveProfile}>
            Save Profile Changes
          </Button>
        </div>
      </Modal>
    </div>
  );
};
