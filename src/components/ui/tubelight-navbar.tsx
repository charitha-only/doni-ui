import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TubelightNavbarProps {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const TubelightNavbar: React.FC<TubelightNavbarProps> = ({
  items,
  activeId: controlledActiveId,
  onSelect,
  className,
}) => {
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState(
    items[0]?.id || ''
  );
  const activeId =
    controlledActiveId !== undefined ? controlledActiveId : uncontrolledActiveId;

  const handleSelect = (id: string) => {
    if (controlledActiveId === undefined) {
      setUncontrolledActiveId(id);
    }
    onSelect?.(id);
  };

  return (
    <nav
      className={cn(
        'relative inline-flex items-center gap-1 rounded-full border border-border/80 bg-background/80 p-1.5 shadow-xl backdrop-blur-xl max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelect(item.id)}
            className={cn(
              'relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 outline-none select-none cursor-pointer',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {item.icon}
            <span>{item.label}</span>

            {/* Glowing Tubelight Lamp Beam Indicator */}
            {isActive && (
              <motion.div
                layoutId="tubelight-indicator"
                transition={transitions.springBouncy}
                className="absolute inset-0 -z-10 rounded-full bg-primary/10"
              >
                {/* Tubelight Lamp Fixture at top */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary shadow-glow" />
                {/* Downward Light Cone Glow */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-6 rounded-full bg-primary/25 blur-md" />
                <div className="absolute inset-0 rounded-full border border-primary/40" />
              </motion.div>
            )}
          </button>
        );
      })}
    </nav>
  );
};
