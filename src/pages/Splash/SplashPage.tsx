import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2 } from 'lucide-react';
import { ProgressBar } from '../../components/common/ProgressBar/ProgressBar';
import { soundEffects } from '../../utils/sound';

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          soundEffects.playSuccess();
          setTimeout(() => navigate('/landing'), 400);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 bg-cyber-grid relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center z-10 max-w-sm w-full"
      >
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-cyan-400 via-purple-600 to-amber-400 p-1 shadow-[0_0_40px_rgba(0,240,255,0.5)]"
          />
          <div className="absolute inset-1 bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse" />
          </div>
        </div>

        <h1 className="text-4xl font-black tracking-wider text-gradient-electric mb-2">
          PY-SPARK
        </h1>
        <p className="text-sm font-extrabold text-cyan-400 tracking-widest uppercase mb-8 flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" /> Learn Python Through Gaming
        </p>

        <div className="w-full space-y-2">
          <ProgressBar value={progress} max={100} color="cyan" size="md" />
          <p className="text-xs text-slate-400 font-mono">
            {progress < 100 ? `Loading Py-Spark Engines... ${progress}%` : 'Ready to Start!'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
