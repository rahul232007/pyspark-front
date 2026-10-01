import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 bg-cyber-grid text-center">
      <div className="p-4 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-6 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
        <Gamepad2 className="w-16 h-16 animate-bounce" />
      </div>
      <h1 className="text-6xl font-black text-gradient-electric mb-2">404</h1>
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Quest Route Not Found</h2>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        You've wandered into an uncharted Python syntax void. Return back to safety!
      </p>
      <Button
        variant="primary"
        size="lg"
        leftIcon={<ArrowLeft className="w-5 h-5" />}
        onClick={() => navigate('/dashboard')}
      >
        Return to Dashboard Realm
      </Button>
    </div>
  );
};
