import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

// Web Audio API synthesized mechanical keyboard click (zero audio asset downloads required!)
function playMechanicalClick() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // High click attack oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch {
    // Graceful fallback if audio context not allowed
  }
}

export interface KeycapProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  subText?: string;
  className?: string;
  enableSound?: boolean;
}

export const Keycap = React.forwardRef<HTMLButtonElement, KeycapProps>(
  ({ children, subText, className, onClick, enableSound = true, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableSound) {
        playMechanicalClick();
      }
      onClick?.(e);
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ y: 3, boxShadow: '0 1px 0 0 rgba(0,0,0,0.4)' }}
        transition={transitions.springSnappy}
        onClick={handleClick}
        className={cn(
          'relative inline-flex flex-col items-center justify-center rounded-xl border-t border-l border-white/20 bg-gradient-to-b from-card to-muted p-3 min-w-[50px] min-h-[50px] text-foreground font-mono font-bold select-none cursor-pointer',
          'shadow-[0_6px_0_0_hsl(var(--primary)/0.3),0_8px_12px_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_0_hsl(var(--primary)/0.3)] transition-shadow duration-150',
          'border border-border/70 hover:border-primary/50',
          className
        )}
        {...props}
      >
        <span className="text-sm tracking-wide leading-none">{children}</span>
        {subText && (
          <span className="text-[10px] text-muted-foreground mt-1 font-normal">
            {subText}
          </span>
        )}
      </motion.button>
    );
  }
);
Keycap.displayName = 'Keycap';
