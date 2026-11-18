import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

export interface FlameButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  flameColor?: string;
  className?: string;
}

export const FlameButton = React.forwardRef<HTMLButtonElement, FlameButtonProps>(
  ({ className, children, flameColor, ...props }, ref) => {
    return (
      <div className="relative inline-flex group">
        {/* Ambient background radiant flame bloom */}
        <div
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary via-accent to-primary opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse-glow"
        />

        {/* Rotating border beam */}
        <div className="absolute inset-0 rounded-xl overflow-hidden p-[1.5px]">
          <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,hsl(var(--primary))_100%)]" />
        </div>

        {/* Core button body */}
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={transitions.springSnappy}
          className={cn(
            'relative z-10 inline-flex items-center justify-center gap-2 rounded-xl bg-background/95 px-6 py-3 text-sm font-bold text-foreground shadow-2xl backdrop-blur-xl border border-primary/30 transition-colors hover:bg-background/80 hover:text-primary cursor-pointer select-none',
            className
          )}
          {...props}
        >
          {children}
        </motion.button>
      </div>
    );
  }
);
FlameButton.displayName = 'FlameButton';
