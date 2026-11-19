import React from 'react';
import { cn } from '@/lib/utils';

export interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  angle?: number;
  cellSize?: number;
  opacity?: number;
  children?: React.ReactNode;
}

export const RetroGrid: React.FC<RetroGridProps> = ({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 size-full overflow-hidden [perspective:200px]',
        className
      )}
      style={{ opacity }}
      {...props}
    >
      {/* 3D Moving Horizon Plane */}
      <div className="absolute inset-0 [transform-origin:100%_0_0]">
        <div
          className="animate-grid [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]"
          style={{
            transform: `rotateX(${angle}deg)`,
            backgroundImage: `linear-gradient(to right, hsl(var(--foreground)/0.2) 1px, transparent 0), linear-gradient(to bottom, hsl(var(--foreground)/0.2) 1px, transparent 0)`,
            backgroundSize: `${cellSize}px ${cellSize}px`,
          }}
        />
      </div>

      {/* Top Horizon Fade Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
