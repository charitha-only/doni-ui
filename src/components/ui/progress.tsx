import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ProgressProps {
  value?: number;
  max?: number;
  showValue?: boolean;
  withGlow?: boolean;
  variant?: 'primary' | 'emerald' | 'amber' | 'rose' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  showValue = false,
  withGlow = true,
  variant = 'primary',
  size = 'md',
  indeterminate = false,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  const variantGradients = {
    primary: 'bg-primary',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    gradient: 'bg-gradient-to-r from-primary via-purple-500 to-pink-500',
  }[variant];

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {showValue && (
        <div className="flex justify-between text-xs font-mono font-semibold text-muted-foreground">
          <span>Progress</span>
          <span className="text-foreground">{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          'w-full bg-muted/60 rounded-full overflow-hidden relative shadow-inner border border-border/40',
          sizeClasses
        )}
      >
        {indeterminate ? (
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className={cn('h-full w-1/3 rounded-full', variantGradients, withGlow && 'shadow-glow')}
          />
        ) : (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={cn(
              'h-full rounded-full transition-all relative',
              variantGradients,
              withGlow && 'shadow-glow'
            )}
          >
            {withGlow && (
              <span className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 blur-xs rounded-full" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
