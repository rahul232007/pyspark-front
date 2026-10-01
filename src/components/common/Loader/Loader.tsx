import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  text = 'Powering up Py-Spark...',
  fullScreen = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-cyan-400 border-r-purple-500 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        />
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute text-cyan-400"
        >
          <Zap className="w-7 h-7 fill-cyan-400" />
        </motion.div>
      </div>
      {text && (
        <p className="text-sm font-semibold tracking-wider text-cyan-300 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-lg">
        {content}
      </div>
    );
  }

  return <div className="py-12 flex justify-center">{content}</div>;
};
