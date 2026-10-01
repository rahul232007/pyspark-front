import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Zap,
  CheckCircle2,
  Lock,
  Play,
  Filter,
  Search,
  MapPin,
  Trophy,
  HelpCircle,
  Coins,
  ArrowRight,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';
import { lessonService } from '../../services/lesson';
import { Topic } from '../../types/lesson';
import { LevelNode, ZONES } from '../../data/pythonLevels';
import { LevelMap } from '../../components/Map/LevelMap';
import { useAuthStore } from '../../store/useAuthStore';
import { Card } from '../../components/common/Card/Card';
import { Badge } from '../../components/common/Badge/Badge';
import { Button } from '../../components/common/Button/Button';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { Loader } from '../../components/common/Loader/Loader';
import { Modal } from '../../components/common/Modal/Modal';

export const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Level Node Modal state
  const [activeLevelNode, setActiveLevelNode] = useState<LevelNode | null>(null);

  useEffect(() => {
    lessonService.getTopics().then((res) => {
      setTopics(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader text="Loading Python Campaign Map & Realms..." />;

  const userCurrentLevel = user?.stats.currentLevel || 4;

  const handleSelectLevelNode = (level: LevelNode) => {
    setActiveLevelNode(level);
  };

  const handleStartLevelQuest = () => {
    if (!activeLevelNode) return;

    if (activeLevelNode.type === 'boss') {
      navigate(`/coding/code_level_${activeLevelNode.id}`);
    } else if (activeLevelNode.type === 'quiz') {
      navigate(`/quiz/quiz_level_${activeLevelNode.id}`);
    } else {
      navigate(`/learn/top_basics/lesson/les_level_${activeLevelNode.id}`);
    }
    setActiveLevelNode(null);
  };

  const filteredTopics = topics.filter((t) => {
    const matchesDiff = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiff && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner & View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div>
          <h1 className="text-3xl font-black text-slate-100 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-cyan-400" />
            <span>Python Learning Campaign</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Conquer 100 Python levels across 8 themed zones or explore individual topic modules.
          </p>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'map'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>100-Level Map</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Topic Modules</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: Interactive 100-Level Serpentine Vector Map */}
      {viewMode === 'map' && (
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <LevelMap
            userCurrentLevel={userCurrentLevel}
            onSelectLevel={handleSelectLevelNode}
          />
        </div>
      )}

      {/* VIEW MODE 2: Topic Modules Grid */}
      {viewMode === 'grid' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Python topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedDifficulty === diff
                      ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <Card key={topic.id} hoverEffect className="flex flex-col justify-between p-0 overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={topic.thumbnail}
                    alt={topic.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge text={topic.difficulty} variant="difficulty" size="sm" />
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 border border-amber-400/40 text-amber-400 text-xs font-black">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" />
                    <span>+{topic.xpReward} XP</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{topic.description}</p>
                  </div>

                  <div className="space-y-3">
                    <ProgressBar
                      value={topic.completedLessons}
                      max={topic.totalLessons}
                      label={`${topic.completedLessons} of ${topic.totalLessons} Lessons Completed`}
                      color="cyan"
                      size="sm"
                      showPercentage
                    />

                    <div className="space-y-1.5 pt-2">
                      {topic.lessons.map((les) => (
                        <div
                          key={les.id}
                          onClick={() => navigate(`/learn/${topic.id}/lesson/${les.id}`)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all group/item"
                        >
                          <div className="flex items-center gap-2">
                            {les.isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Play className="w-4 h-4 text-cyan-400 shrink-0 group-hover/item:scale-110" />
                            )}
                            <span className="text-xs font-bold text-slate-200 group-hover/item:text-cyan-300">
                              {les.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-amber-400">+{les.xpReward} XP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Level Detail Modal */}
      <Modal
        isOpen={!!activeLevelNode}
        onClose={() => setActiveLevelNode(null)}
        title={activeLevelNode ? `Level ${activeLevelNode.id}: ${activeLevelNode.title}` : ''}
        maxWidth="md"
      >
        {activeLevelNode && (
          <div className="space-y-5">
            {/* Zone Tag & Type Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                {activeLevelNode.zone}
              </span>

              <span
                className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase ${
                  activeLevelNode.type === 'boss'
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                    : activeLevelNode.type === 'quiz'
                    ? 'bg-purple-500 text-white'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {activeLevelNode.type === 'boss'
                  ? '⚡ BOSS CHALLENGE'
                  : activeLevelNode.type === 'quiz'
                  ? '❓ QUIZ ASSESSMENT'
                  : '📘 CONCEPT LESSON'}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeLevelNode.description ||
                `Master ${activeLevelNode.title} in the ${activeLevelNode.zone} realm of Py-Spark.`}
            </p>

            {/* Rewards Card */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                <div>
                  <span className="text-xs text-slate-400 font-bold block">XP Reward</span>
                  <span className="text-sm font-black text-cyan-300">+{activeLevelNode.xpReward} XP</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-xs text-slate-400 font-bold block">Coins Reward</span>
                  <span className="text-sm font-black text-amber-300">+{activeLevelNode.coinReward || 20}</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <Button
              variant={activeLevelNode.type === 'boss' ? 'gold' : 'primary'}
              size="lg"
              className="w-full py-3.5 font-black text-slate-950"
              onClick={handleStartLevelQuest}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Start Challenge
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
