import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Gamepad2,
  Code,
  Trophy,
  Zap,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Play,
} from 'lucide-react';
import { Button } from '../../components/common/Button/Button';
import { Card } from '../../components/common/Card/Card';
import { Badge } from '../../components/common/Badge/Badge';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code className="w-7 h-7 text-cyan-400" />,
      title: 'Monaco Python IDE',
      description: 'Write real Python code in a full-featured Monaco editor with instant execution and test suite validation.',
    },
    {
      icon: <Gamepad2 className="w-7 h-7 text-purple-400" />,
      title: 'Gamified RPG Progression',
      description: 'Unlock 8 rank tiers from Beginner to Grandmaster by completing lessons, quizzes, and coding quests.',
    },
    {
      icon: <Zap className="w-7 h-7 text-amber-400" />,
      title: '5 MCQ Quizzes & XP Rewards',
      description: 'Test your python knowledge with interactive timers, score breakdown, sound effects, and XP coins.',
    },
    {
      icon: <Trophy className="w-7 h-7 text-emerald-400" />,
      title: 'Global & Friends Leaderboards',
      description: 'Compete on weekly leaderboards, earn achievement badges, and climb to the top Python rank position.',
    },
  ];

  const screenshots = [
    {
      title: 'Monaco Python Arena',
      subtitle: 'Write code, run test cases, and receive real-time execution feedback.',
      img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Gamified Level Complete',
      subtitle: 'Celebrate your victory with animated XP gains, stars, and rank promotions.',
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'RPG Leaderboard & Ranks',
      subtitle: 'Showcase your badges, daily streak flame, and Grandmaster rank tier.',
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Rivera',
      rank: 'Diamond' as const,
      role: 'Computer Science Student',
      comment: 'Py-Spark turned learning Python from boring textbook reading into an addictive RPG game! I solved 30 coding challenges in 3 days.',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex',
    },
    {
      name: 'Elena Rostova',
      rank: 'Master' as const,
      role: 'Junior Data Scientist',
      comment: 'The Monaco editor integration combined with instant test suite validation makes this the best frontend Python learning platform ever built.',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Elena',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-cyber-grid flex flex-col overflow-x-hidden">
      {/* Landing Navbar */}
      <nav className="w-full glass-panel border-b border-slate-800/80 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-purple-600 to-amber-400 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-black text-gradient-electric">PY-SPARK</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-28 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>The Next-Gen Gamified Python Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight max-w-4xl"
        >
          Master <span className="text-gradient-electric">Python</span> Through Interactive <span className="text-gradient-gold">Gaming</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-lg sm:text-xl max-w-2xl mt-6 font-medium"
        >
          Conquer Python lessons, conquer 5-MCQ quizzes, write live code in Monaco Editor, earn XP, unlock achievements, and level up your rank from Beginner to Grandmaster!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
        >
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={() => navigate('/register')}
          >
            Start Playing Free
          </Button>
          <Button
            variant="purple"
            size="lg"
            leftIcon={<Play className="w-5 h-5 fill-current" />}
            onClick={() => navigate('/dashboard')}
          >
            Enter Demo Realm
          </Button>
        </motion.div>

        {/* Floating Rank Preview Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
          {['Beginner', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'].map((r) => (
            <Badge key={r} rank={r as any} size="md" />
          ))}
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="px-6 py-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100">
            Why Gamified Learning Works
          </h2>
          <p className="text-slate-400 mt-2 text-base">
            Engineered with game mechanics that keep you engaged and writing code daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <Card key={idx} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/60 w-fit mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-extrabold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gamified Screenshots Showcase */}
      <section className="px-6 py-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100">
            Experience Py-Spark in Action
          </h2>
          <p className="text-slate-400 mt-2">
            A glance at our sleek Monaco code editor, quiz runner, and level completion screen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {screenshots.map((s, idx) => (
            <Card key={idx} hoverEffect className="p-0 overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-100">{s.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{s.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100">
            Loved by Py-Spark Adventurers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="flex flex-col justify-between">
              <p className="text-slate-300 italic text-sm mb-6">"{t.comment}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-cyan-400/50" />
                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    {t.name} <Badge rank={t.rank} size="sm" />
                  </h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="px-6 py-16 max-w-5xl mx-auto w-full">
        <div className="glass-card border border-cyan-500/50 rounded-3xl p-10 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)]">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 mb-4">
            Ready to Begin Your Python Quest?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Join thousands of coders leveling up Python skills through interactive games today.
          </p>
          <Button
            variant="gold"
            size="lg"
            onClick={() => navigate('/register')}
          >
            Create Your Py-Spark Hero
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full glass-panel border-t border-slate-800/80 px-6 py-8 mt-auto text-center text-xs text-slate-500">
        <p>© 2026 Py-Spark Platform. Powered by React 19, TypeScript, Monaco Editor & Vite.</p>
      </footer>
    </div>
  );
};
