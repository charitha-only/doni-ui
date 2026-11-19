import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface WavyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: 'slow' | 'fast';
  waveOpacity?: number;
}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill,
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeed = () => {
    switch (speed) {
      case 'slow':
        return 0.001;
      case 'fast':
        return 0.002;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    'hsl(var(--primary))',
    '#06b6d4',
    '#8b5cf6',
    '#3b82f6',
    '#10b981',
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);
    let nt = 0;

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener('resize', handleResize);
    ctx.filter = `blur(${blur}px)`;

    let animationId: number;
    const render = () => {
      ctx.fillStyle = backgroundFill || 'transparent';
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);

      nt += getSpeed();
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = Math.sin(x * 0.003 + nt + i * 0.8) * 45 + h * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [blur, speed, waveWidth, waveOpacity, backgroundFill]);

  return (
    <div
      className={cn(
        'relative h-full flex flex-col items-center justify-center overflow-hidden',
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
        ref={canvasRef}
      />
      <div className={cn('relative z-10', className)} {...props}>
        {children}
      </div>
    </div>
  );
};
