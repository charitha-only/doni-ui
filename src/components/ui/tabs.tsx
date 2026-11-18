import * as React from 'react';
import { motion } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'pill' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'pill',
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl p-1 max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
        variant === 'pill'
          ? 'bg-muted/70 backdrop-blur-sm border border-border/50'
          : 'border-b border-border w-full gap-2',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors outline-none cursor-pointer select-none rounded-lg shrink-0 whitespace-nowrap',
              isActive
                ? 'text-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {/* Sliding Pill Indicator */}
            {isActive && variant === 'pill' && (
              <motion.div
                layoutId="active-tab-pill"
                transition={transitions.springBouncy}
                className="absolute inset-0 bg-background shadow-md rounded-lg border border-border/80"
              />
            )}

            {/* Sliding Underline Indicator */}
            {isActive && variant === 'underline' && (
              <motion.div
                layoutId="active-tab-underline"
                transition={transitions.springBouncy}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow"
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
