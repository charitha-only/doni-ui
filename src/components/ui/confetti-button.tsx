import React, { useRef } from 'react';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

export interface ConfettiButtonProps extends ButtonProps {
  particleCount?: number;
  spread?: number;
}

export const ConfettiButton = React.forwardRef<HTMLButtonElement, ConfettiButtonProps>(
  ({ children, particleCount = 45, spread = 60, className, onClick, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const triggerBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);

      // Create temporary overlay canvas for confetti burst
      const canvas = document.createElement('canvas');
      canvasRef.current = canvas;
      canvas.className = 'fixed inset-0 pointer-events-none z-[9999]';
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        document.body.removeChild(canvas);
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: string;
        alpha: number;
        rotation: number;
        vRotation: number;
      }> = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.random() - 0.5) * (spread * (Math.PI / 180)) - Math.PI / 2;
        const speed = Math.random() * 12 + 6;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          rotation: Math.random() * 360,
          vRotation: (Math.random() - 0.5) * 10,
        });
      }

      let animationId: number;
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeParticles = 0;

        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35; // gravity
          p.vx *= 0.98; // drag
          p.alpha -= 0.015;
          p.rotation += p.vRotation;

          if (p.alpha > 0) {
            activeParticles++;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            ctx.restore();
          }
        }

        if (activeParticles > 0) {
          animationId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationId);
          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        }
      };

      animationId = requestAnimationFrame(render);
    };

    return (
      <Button
        ref={ref}
        className={cn('relative', className)}
        onClick={triggerBurst}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ConfettiButton.displayName = 'ConfettiButton';
