import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Button } from '../Button/Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass-card border border-slate-800 rounded-3xl my-6">
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
        {icon || <Gamepad2 className="w-10 h-10" />}
      </div>
      <h3 className="text-xl font-bold text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 max-w-md mt-1 mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
