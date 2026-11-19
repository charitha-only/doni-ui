import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn, transitions } from '@/lib/utils';

export type DeltaType = 'increase' | 'moderateIncrease' | 'decrease' | 'moderateDecrease' | 'unchanged';

export interface BadgeDeltaProps {
  deltaType?: DeltaType;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const BadgeDelta: React.FC<BadgeDeltaProps> = ({
  deltaType = 'increase',
  children,
  size = 'sm',
  className,
}) => {
  const config = {
    increase: {
      icon: TrendingUp,
      classes: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20',
    },
    moderateIncrease: {
      icon: ArrowUpRight,
      classes: 'bg-teal-500/10 text-teal-500 border-teal-500/20 hover:bg-teal-500/20',
    },
    decrease: {
      icon: TrendingDown,
      classes: 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20',
    },
    moderateDecrease: {
      icon: ArrowDownRight,
      classes: 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20',
    },
    unchanged: {
      icon: Minus,
      classes: 'bg-muted text-muted-foreground border-border/80 hover:bg-muted/80',
    },
  }[deltaType];

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 gap-0.5',
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
  }[size];

  const IconComp = config.icon;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={transitions.springGentle}
      className={cn(
        'inline-flex items-center font-bold font-mono rounded-full border transition-colors select-none',
        config.classes,
        sizeClasses,
        className
      )}
    >
      <IconComp className="w-3.5 h-3.5 shrink-0" />
      <span>{children}</span>
    </motion.span>
  );
};
