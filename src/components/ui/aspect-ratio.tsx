import React from 'react';
import { cn } from '@/lib/utils';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number; // e.g. 16 / 9 = 1.777
  children: React.ReactNode;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio = 16 / 9,
  children,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-2xl', className)}
      style={{
        paddingBottom: `${(1 / ratio) * 100}%`,
        ...style,
      }}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>video]:w-full [&>video]:h-full [&>video]:object-cover">
        {children}
      </div>
    </div>
  );
};
