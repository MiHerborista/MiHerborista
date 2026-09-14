import React from 'react';
import { cn } from '../../lib/cn';

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({
  children,
  className,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-stone-50/90 border border-emerald-900/10 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:border-emerald-900/20',
        onClick && 'cursor-pointer hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('mb-3 flex flex-col space-y-1', className)}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={cn('text-lg font-semibold text-stone-900 tracking-tight font-serif', className)}>{children}</h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={cn('text-xs text-stone-600 leading-relaxed', className)}>{children}</p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('space-y-3', className)}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between', className)}>{children}</div>
);
