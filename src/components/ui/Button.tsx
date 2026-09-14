import React from 'react';
import { cn } from '../../lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl cursor-pointer';

  const variants = {
    primary: 'bg-emerald-800 text-stone-50 hover:bg-emerald-900 active:bg-emerald-950 shadow-sm shadow-emerald-900/10',
    secondary: 'bg-stone-200/80 text-stone-800 hover:bg-stone-300/80 active:bg-stone-300',
    outline: 'border border-emerald-800/20 text-emerald-900 bg-emerald-50/50 hover:bg-emerald-100/60 hover:border-emerald-800/40',
    ghost: 'text-stone-700 hover:bg-stone-200/50 hover:text-stone-900',
    danger: 'bg-rose-700 text-white hover:bg-rose-800 active:bg-rose-900',
    accent: 'bg-amber-700 text-amber-50 hover:bg-amber-800 active:bg-amber-900 shadow-sm shadow-amber-800/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
