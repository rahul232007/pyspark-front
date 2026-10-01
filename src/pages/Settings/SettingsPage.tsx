import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Volume2,
  VolumeX,
  Moon,
  Shield,
  Bell,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Card } from '../../components/common/Card/Card';
import { Button } from '../../components/common/Button/Button';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, logout, user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-100 flex items-center gap-2">
          <Settings className="w-8 h-8 text-cyan-400" />
          <span>Game Preferences & Settings</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Customize audio sound effects, themes, privacy options, and account details.
        </p>
      </div>

      {/* Audio & Sound FX */}
      <Card variant="glass" className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-cyan-400" />
          <span>Audio & Sound FX</span>
        </h3>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-slate-100">Sound Effects (SFX)</h4>
            <p className="text-xs text-slate-400">Play button clicks, quiz success, and level up fanfares</p>
          </div>
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              settings.soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Visual Theme */}
      <Card variant="glass" className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Moon className="w-5 h-5 text-purple-400" />
          <span>Visual Theme & Aesthetics</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => updateSettings({ theme: 'dark' })}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              settings.theme === 'dark'
                ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'border-slate-800 bg-slate-900'
            }`}
          >
            <h4 className="text-sm font-bold text-slate-100">Deep Cyber Dark</h4>
            <p className="text-xs text-slate-400 mt-1">Neon electric blue with dark slate glassmorphism</p>
          </div>
        </div>
      </Card>

      {/* Privacy & Social */}
      <Card variant="glass" className="p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <span>Privacy & Leaderboards</span>
        </h3>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <h4 className="text-sm font-bold text-slate-100">Public Leaderboard Visibility</h4>
            <p className="text-xs text-slate-400">Show profile and rank on global leaderboards</p>
          </div>
          <button
            onClick={() => updateSettings({ showOnLeaderboard: !settings.showOnLeaderboard })}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              settings.showOnLeaderboard ? 'bg-cyan-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                settings.showOnLeaderboard ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Logout Action */}
      <div className="pt-4">
        <Button
          variant="danger"
          className="w-full py-3"
          onClick={() => {
            logout();
            navigate('/login');
          }}
          leftIcon={<LogOut className="w-4 h-4" />}
        >
          Logout from Py-Spark Realm
        </Button>
      </div>
    </div>
  );
};
