import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface GlareCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlareCard: React.FC<GlareCardProps> = ({ children, className, ...props }) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rotateFactor = 0.4;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    const percentage = {
      x: (100 / rect.width) * position.x,
      y: (100 / rect.height) * position.y,
    };
    const delta = {
      x: percentage.x - 50,
      y: percentage.y - 50,
    };

    const { background, rotate, glare } = state;
    background.x = 50 + percentage.x / 4 - 12.5;
    background.y = 50 + percentage.y / 4 - 12.5;
    rotate.x = -(delta.x / 3.5) * rotateFactor;
    rotate.y = (delta.y / 2) * rotateFactor;
    glare.x = percentage.x;
    glare.y = percentage.y;

    setState({
      glare: { ...glare },
      background: { ...background },
      rotate: { ...rotate },
    });
  };

  const handlePointerEnter = () => {
    isPointerInside.current = true;
  };

  const handlePointerLeave = () => {
    isPointerInside.current = false;
    setState({
      glare: { x: 50, y: 50 },
      background: { x: 50, y: 50 },
      rotate: { x: 0, y: 0 },
    });
  };

  return (
    <div
      ref={refElement}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-200 ease-out will-change-transform w-full h-full rounded-2xl cursor-pointer',
        className
      )}
      style={
        {
          '--m-x': `${state.glare.x}%`,
          '--m-y': `${state.glare.y}%`,
          '--r-x': `${state.rotate.x}deg`,
          '--r-y': `${state.rotate.y}deg`,
          '--bg-x': `${state.background.x}%`,
          '--bg-y': `${state.background.y}%`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className="h-full w-full rounded-2xl border border-border/80 bg-card overflow-hidden relative [transform-style:preserve-3d] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateY(var(--r-x)) rotateX(var(--r-y))`,
        }}
      >
        {/* Card Content */}
        <div className="relative z-10 h-full w-full">{children}</div>

        {/* Holographic Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 mix-blend-color-dodge transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--m-x) var(--m-y), rgba(255, 255, 255, 0.4) 10%, rgba(255, 255, 255, 0.1) 40%, transparent 80%)`,
          }}
        />

        {/* Rainbow Spectral Shimmer */}
        <div
          className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-30 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, rgba(255,0,128,0.3) 0%, rgba(0,255,255,0.3) 50%, rgba(255,255,0,0.3) 100%)`,
            backgroundPosition: `var(--bg-x) var(--bg-y)`,
          }}
        />
      </div>
    </div>
  );
};
