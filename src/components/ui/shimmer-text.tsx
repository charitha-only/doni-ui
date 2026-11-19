import React from 'react';
import { cn } from '@/lib/utils';

export interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  shimmerColor?: string;
  duration?: number;
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({
  children,
  className,
  shimmerColor = 'hsl(var(--primary))',
  duration = 2.5,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-block bg-[linear-gradient(110deg,#a1a1aa,45%,#ffffff,55%,#a1a1aa)] dark:bg-[linear-gradient(110deg,#71717a,45%,#ffffff,55%,#71717a)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shimmer font-semibold',
        className
      )}
      style={{
        animationDuration: `${duration}s`,
        backgroundImage: `linear-gradient(110deg, hsl(var(--foreground)/0.6) 40%, ${shimmerColor} 50%, hsl(var(--foreground)/0.6) 60%)`,
        backgroundSize: '250% 100%',
      }}
      {...props}
    >
      {children}
    </span>
  );
};
