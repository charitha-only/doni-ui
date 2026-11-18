import React from 'react';
import { cn } from '@/lib/utils';

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  duration = 7,
  borderWidth = 1.5,
  colorFrom = 'hsl(var(--primary))',
  colorTo = 'hsl(var(--accent))',
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]',
        className
      )}
      style={{ padding: `${borderWidth}px` }}
    >
      <div
        className="absolute inset-[-150%] animate-[spin_linear_infinite]"
        style={{
          animationDuration: `${duration}s`,
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, ${colorFrom} 330deg, ${colorTo} 360deg)`,
        }}
      />
      <div className="absolute inset-[1.5px] rounded-[inherit] bg-card/90" />
    </div>
  );
};
