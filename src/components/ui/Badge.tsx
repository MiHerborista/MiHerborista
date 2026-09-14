import React from 'react';
import { cn } from '../../lib/cn';

interface BadgeProps {
  variant?: 'emerald' | 'amber' | 'rose' | 'stone' | 'teal' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'emerald',
  children,
  className
}) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap';

  const variants = {
    emerald: 'bg-emerald-100 text-emerald-900 border border-emerald-200',
    amber: 'bg-amber-100 text-amber-900 border border-amber-200',
    rose: 'bg-rose-100 text-rose-900 border border-rose-200',
    stone: 'bg-stone-200/80 text-stone-800 border border-stone-300',
    teal: 'bg-teal-100 text-teal-900 border border-teal-200',
    outline: 'bg-white/80 border border-stone-300 text-stone-700'
  };

  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  );
};
