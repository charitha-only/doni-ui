import React from 'react';
import { cn } from '@/lib/utils';

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}) => {
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-border/70 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      <div
        style={
          {
            '--duration': calculatedDuration,
            '--radius': radius,
            '--delay': -delay,
            '--icon-size': `${iconSize}px`,
          } as React.CSSProperties
        }
        className={cn(
          'absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full border border-border/80 bg-background/90 shadow-md backdrop-blur-md',
          { '[animation-direction:reverse]': reverse },
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
};
