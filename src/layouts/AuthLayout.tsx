import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 bg-cyber-grid relative overflow-hidden">
      {/* Background Animated Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Brand */}
      <div
        onClick={() => navigate('/')}
        className="flex items-center gap-3 cursor-pointer mb-8 group select-none"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-600 to-amber-400 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-wider text-gradient-electric">
            PY-SPARK
          </h1>
          <p className="text-xs font-semibold text-cyan-400/80 tracking-widest uppercase">
            Learn Python Through Gaming
          </p>
        </div>
      </div>

      {/* Auth Content Card Container */}
      <div className="w-full max-w-md glass-card border border-slate-700/60 rounded-3xl p-8 shadow-2xl relative z-10">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="mt-8 text-xs text-slate-500 font-semibold text-center">
        © 2026 Py-Spark. All Python leveling rights reserved.
      </footer>
    </div>
  );
};
