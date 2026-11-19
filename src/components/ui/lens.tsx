import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  className?: string;
}

export const Lens: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.8,
  lensSize = 140,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn('relative overflow-hidden cursor-crosshair rounded-xl select-none', className)}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute rounded-full border-2 border-primary/80 shadow-glow bg-background/20 backdrop-contrast-125 overflow-hidden z-30"
            style={{
              width: lensSize,
              height: lensSize,
              top: mousePosition.y - lensSize / 2,
              left: mousePosition.x - lensSize / 2,
            }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                width: containerRef.current?.clientWidth || '100%',
                height: containerRef.current?.clientHeight || '100%',
                transform: `translate(${-mousePosition.x * zoomFactor + lensSize / 2}px, ${
                  -mousePosition.y * zoomFactor + lensSize / 2
                }px) scale(${zoomFactor})`,
                transformOrigin: 'top left',
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
