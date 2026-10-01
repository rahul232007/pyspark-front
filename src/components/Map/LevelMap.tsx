import React, { useState } from 'react';
import { PYTHON_100_LEVELS, ZONES, LevelNode } from '../../data/pythonLevels';
import { playSound } from '../../utils/sound';

interface LevelMapProps {
  userCurrentLevel: number;
  onSelectLevel: (level: LevelNode) => void;
}

export const LevelMap: React.FC<LevelMapProps> = ({ userCurrentLevel, onSelectLevel }) => {
  const [selectedNode, setSelectedNode] = useState<LevelNode | null>(null);

  // Smooth serpentine X-positioning curve calculation
  const getXCoordinate = (index: number): number => {
    const amplitude = 120; // Horizontal wave distance in pixels
    return Math.sin(index * 0.5) * amplitude;
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F19] bg-cyber-grid py-12 px-4 flex flex-col items-center overflow-y-auto">
      {/* Sticky Header Indicator */}
      <div className="sticky top-4 z-30 backdrop-blur-md bg-[#0F172A]/80 border border-[#00F0FF]/30 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.2)] mb-12 flex items-center gap-4">
        <span className="h-2 w-2 rounded-full bg-[#00F0FF] animate-ping" />
        <h1 className="text-sm font-mono tracking-wider text-[#00F0FF] uppercase">
          Curriculum Map • Progress: Level {userCurrentLevel} / 100
        </h1>
      </div>

      {/* Map Nodes & SVG Path Stream */}
      <div className="relative flex flex-col items-center gap-16 w-full max-w-xl pb-24">
        {PYTHON_100_LEVELS.map((level, index) => {
          const xPos = getXCoordinate(index);
          const nextXPos = index < PYTHON_100_LEVELS.length - 1 ? getXCoordinate(index + 1) : xPos;
          
          const isCompleted = level.id < userCurrentLevel;
          const isCurrent = level.id === userCurrentLevel;
          const isLocked = level.id > userCurrentLevel;

          const currentZone = ZONES.find(z => level.id >= z.minLevel && level.id <= z.maxLevel);

          return (
            <React.Fragment key={level.id}>
              {/* Zone Transition Header */}
              {level.id === currentZone?.minLevel && (
                <div className="z-10 my-6 px-4 py-1.5 rounded bg-[#1E293B]/90 border border-slate-700 text-xs font-mono tracking-widest text-slate-300 uppercase shadow-lg">
                  {currentZone.name}
                </div>
              )}

              <div
                className="relative flex flex-col items-center transition-transform duration-300 z-10"
                style={{ transform: `translateX(${xPos}px)` }}
              >
                {/* Vector Connector Line */}
                {index < PYTHON_100_LEVELS.length - 1 && (
                  <svg
                    className="absolute top-12 left-1/2 -translate-x-1/2 w-80 h-20 pointer-events-none z-0 overflow-visible"
                  >
                    <path
                      d={`M 160 0 C 160 40, ${160 + (nextXPos - xPos)} 40, ${160 + (nextXPos - xPos)} 80`}
                      fill="none"
                      stroke={isCompleted ? '#00F0FF' : '#1E293B'}
                      strokeWidth="4"
                      strokeDasharray={isLocked ? '6,6' : '0'}
                      className="transition-all duration-500"
                    />
                  </svg>
                )}

                {/* Level Node Trigger */}
                <button
                  disabled={isLocked}
                  onClick={() => {
                    playSound('click');
                    setSelectedNode(level);
                  }}
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-base transition-all duration-200 border cursor-pointer ${
                    isCurrent
                      ? 'bg-[#00F0FF] text-[#0B0F19] border-white shadow-[0_0_25px_rgba(0,240,255,0.8)] scale-110'
                      : isCompleted
                      ? 'bg-[#0F172A] text-[#00F0FF] border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'bg-[#1E293B]/40 text-slate-600 border-slate-800 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    level.id
                  )}

                  {/* Boss Node Badge */}
                  {level.type === 'boss' && (
                    <span className="absolute -top-2 -right-2 bg-[#FBBF24] text-[#0B0F19] text-[10px] font-black tracking-tighter px-1.5 py-0.5 rounded border border-black shadow-md">
                      BOSS
                    </span>
                  )}
                </button>

                {/* Node Title Label */}
                <div className="mt-2 text-center max-w-[130px]">
                  <p className={`text-[11px] font-medium leading-tight ${isCurrent ? 'text-[#00F0FF] font-semibold' : 'text-slate-400'}`}>
                    {level.title}
                  </p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Level Detail Modal Drawer */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#0F172A] border border-[#00F0FF]/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,240,255,0.2)] flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">Level {selectedNode.id} • {selectedNode.type}</span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedNode.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedNode(null)} 
                className="text-slate-400 hover:text-white text-sm font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between bg-[#0B0F19] p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span>XP Reward</span>
              <span className="font-mono text-[#FBBF24] font-bold">+{selectedNode.xpReward} XP</span>
            </div>

            <button
              onClick={() => {
                onSelectLevel(selectedNode);
                setSelectedNode(null);
              }}
              className="w-full py-3 rounded-xl bg-[#00F0FF] text-[#0B0F19] font-bold text-sm hover:bg-[#00F0FF]/90 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
            >
              Start Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
