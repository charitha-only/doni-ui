import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn, transitions } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number; // e.g. +14.2% or -3.5%
  changePeriod?: string; // e.g. 'vs last month'
  icon?: React.ReactNode;
  sparkline?: number[];
  withGlow?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePeriod = 'from last month',
  icon,
  withGlow = true,
  className,
}) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={transitions.springGentle}
      className={cn(
        'p-5 rounded-3xl bg-card/70 border border-border/80 shadow-xs backdrop-blur-sm relative overflow-hidden flex flex-col justify-between space-y-3',
        withGlow && 'hover:border-primary/50 hover:shadow-glow',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">{title}</span>
        {icon && (
          <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          {value}
        </div>

        {change !== undefined && (
          <div className="flex items-center gap-1.5 mt-2 text-[11px]">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold font-mono',
                isPositive && 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
                isNegative && 'bg-rose-500/10 text-rose-500 border border-rose-500/20',
                !isPositive && !isNegative && 'bg-muted text-muted-foreground'
              )}
            >
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
              {change > 0 ? `+${change}%` : `${change}%`}
            </span>
            <span className="text-muted-foreground truncate">{changePeriod}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
