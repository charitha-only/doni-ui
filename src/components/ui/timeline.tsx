import React from 'react';
import { motion } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  tag?: string;
  status?: 'completed' | 'active' | 'upcoming';
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events, className }) => {
  return (
    <div className={cn('relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/70', className)}>
      {events.map((ev, idx) => {
        const isActive = ev.status === 'active';
        const isCompleted = ev.status === 'completed';

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...transitions.springGentle, delay: idx * 0.08 }}
            className="relative flex items-start gap-4"
          >
            {/* Timeline Dot Node */}
            <div
              className={cn(
                'absolute -left-6 mt-1 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-background transition-all',
                isActive
                  ? 'border-primary ring-4 ring-primary/20 bg-primary shadow-glow'
                  : isCompleted
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-muted'
              )}
            >
              <div
                className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  isActive ? 'bg-primary-foreground' : isCompleted ? 'bg-primary-foreground' : 'bg-muted-foreground'
                )}
              />
            </div>

            {/* Event Content */}
            <div className="flex-1 p-4 rounded-2xl bg-card/60 border border-border/80 shadow-xs hover:border-primary/40 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-mono font-semibold text-primary">
                  {ev.date}
                </span>
                {ev.tag && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60">
                    {ev.tag}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-foreground">{ev.title}</h4>
              {ev.description && (
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {ev.description}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
