import React from 'react';
import { cn } from '@/lib/utils';

export interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dots' | 'grid';
  children?: React.ReactNode;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  variant = 'dots',
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative w-full h-full flex items-center justify-center overflow-hidden',
        variant === 'dots'
          ? 'bg-[radial-gradient(hsl(var(--muted-foreground)/0.18)_1px,transparent_1px)] [background-size:16px_16px]'
          : 'bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.1)_1px,transparent_1px)] [background-size:24px_24px]',
        className
      )}
      {...props}
    >
      {/* Radial fade mask */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
