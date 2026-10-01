import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Users,
  Award,
  User,
  Settings,
  Flame,
  Zap,
  Coins,
  Volume2,
  VolumeX,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Badge } from '../components/common/Badge/Badge';
import { Avatar } from '../components/common/Avatar/Avatar';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, settings, updateSettings } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/learn', label: 'Learn Python', icon: BookOpen },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/friends', label: 'Friends', icon: Users },
    { path: '/achievements', label: 'Achievements', icon: Award },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col bg-cyber-grid">
      {/* Top Gamified Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-purple-600 to-amber-400 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-gradient-electric">
                PY-SPARK
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                RPG Edition
              </span>
            </div>
          </div>

          {/* Gamified Top Bar Stats (Streak, XP, Coins, Sound, User) */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Daily Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-extrabold">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
              <span>{user?.stats.streakDays || 0}d</span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-extrabold">
              <Zap className="w-4 h-4 fill-cyan-400" />
              <span>{user?.stats.xp || 0} XP</span>
            </div>

            {/* Coins */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-extrabold">
              <Coins className="w-4 h-4 text-purple-300" />
              <span>{user?.stats.coins || 0}</span>
            </div>

            {/* Sound Effects Toggle */}
            <button
              onClick={toggleSound}
              title="Toggle Audio Effects"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            >
              {settings.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* User Quick Menu Avatar */}
            {user && (
              <div
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <Avatar src={user.avatar} rank={user.rank} size="sm" />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {user.username}
                  </div>
                  <Badge rank={user.rank} size="sm" />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid Layout (Sidebar + Page Content) */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 p-4 border-r border-slate-800/80 bg-slate-950/60 shrink-0">
          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 border border-transparent transition-all mt-auto"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </aside>

        {/* Dynamic Page Outlet Container */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Menu */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800 px-2 py-2 flex items-center justify-around">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-bold transition-all ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-400'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
