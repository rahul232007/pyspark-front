import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, CheckCircle, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  type?: 'achievement' | 'success' | 'error' | 'xp';
}

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  onClose,
  title,
  description,
  type = 'achievement',
}) => {
  const typeIcons = {
    achievement: <Trophy className="w-6 h-6 text-amber-400" />,
    success: <CheckCircle className="w-6 h-6 text-emerald-400" />,
    error: <AlertCircle className="w-6 h-6 text-rose-400" />,
    xp: <Sparkles className="w-6 h-6 text-cyan-400" />,
  };

  const typeBorders = {
    achievement: 'border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.3)]',
    success: 'border-emerald-400/50 shadow-[0_0_25px_rgba(52,211,153,0.3)]',
    error: 'border-rose-400/50 shadow-[0_0_25px_rgba(244,63,94,0.3)]',
    xp: 'border-cyan-400/50 shadow-[0_0_25px_rgba(0,240,255,0.3)]',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl glass-card border ${typeBorders[type]} max-w-sm`}
        >
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 shrink-0">
            {typeIcons[type]}
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-extrabold text-white">{title}</h4>
            {description && <p className="text-xs text-slate-300 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
