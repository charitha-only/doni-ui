import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DirectionAwareHoverProps extends HTMLMotionProps<'div'> {
  imageUrl?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  imageClassName?: string;
}

export const DirectionAwareHover: React.FC<DirectionAwareHoverProps> = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<'top' | 'bottom' | 'left' | 'right'>('left');

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const directionIndex = getDirection(event, ref.current);
    switch (directionIndex) {
      case 0:
        setDirection('top');
        break;
      case 1:
        setDirection('right');
        break;
      case 2:
        setDirection('bottom');
        break;
      case 3:
        setDirection('left');
        break;
      default:
        setDirection('left');
        break;
    }
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  const slideVariants = {
    initial: {
      x: 0,
      y: 0,
    },
    exit: {
      x: 0,
      y: 0,
    },
    top: {
      y: 20,
    },
    bottom: {
      y: -20,
    },
    left: {
      x: 20,
    },
    right: {
      x: -20,
    },
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        'group/card relative h-64 md:h-80 w-full overflow-hidden rounded-2xl bg-transparent border border-border/80',
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          {/* Background Image or Surface */}
          <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-tr from-card via-muted/40 to-primary/20">
            {imageUrl && (
              <img
                alt="Card visual"
                className={cn(
                  'h-full w-full object-cover scale-100 group-hover/card:scale-110 transition-transform duration-500 ease-out',
                  imageClassName
                )}
                src={imageUrl}
              />
            )}
          </div>

          {/* Directional Slide-in Overlay */}
          <motion.div
            variants={slideVariants}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300',
              childrenClassName
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
