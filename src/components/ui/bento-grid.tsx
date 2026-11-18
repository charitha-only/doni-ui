import React from 'react';
import { motion } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

export interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

export interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={transitions.springGentle}
      className={cn(
        'row-span-1 rounded-2xl group/bento hover:shadow-2xl transition duration-200 shadow-input dark:shadow-none p-5 dark:bg-card/70 bg-card border border-border/80 justify-between flex flex-col space-y-4 backdrop-blur-sm',
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        <div className="text-primary mb-2">{icon}</div>
        <div className="font-bold text-foreground mb-1 text-base tracking-tight">
          {title}
        </div>
        <div className="font-normal text-muted-foreground text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
