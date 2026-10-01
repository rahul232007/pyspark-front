import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { X, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Modal } from '../components/common/Modal/Modal';
import { Button } from '../components/common/Button/Button';

export const GameLayout: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useAuthStore();
  const [showExitModal, setShowExitModal] = useState(false);

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    navigate('/learn');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col bg-cyber-grid">
      {/* Top Game Bar Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Quit Button */}
          <button
            onClick={() => setShowExitModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-all font-bold text-xs"
          >
            <X className="w-4 h-4" />
            <span>Quit Quest</span>
          </button>

          {/* Title */}
          <div className="text-center">
            <span className="text-xs font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase">
              Py-Spark Arena
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-all"
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </header>

      {/* Main Game Screen */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col">
        <Outlet />
      </main>

      {/* Confirm Exit Modal */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Quit Current Challenge?"
        maxWidth="sm"
      >
        <div className="text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-slate-300">
            Leaving now will forfeit your uncompleted progress in this session.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setShowExitModal(false)}
            >
              Resume
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={handleConfirmExit}
            >
              Quit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
