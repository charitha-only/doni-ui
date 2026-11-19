import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn, transitions } from '@/lib/utils';
import { Button } from './button';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'bottom' | 'right' | 'left' | 'top';
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'bottom',
  title,
  description,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const slideVariants = {
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
      posClass: 'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl border-t',
    },
    top: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '-100%' },
      posClass: 'top-0 left-0 right-0 max-h-[85vh] rounded-b-3xl border-b',
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
      posClass: 'top-0 right-0 bottom-0 w-full sm:w-[420px] rounded-l-3xl border-l',
    },
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      posClass: 'top-0 left-0 bottom-0 w-full sm:w-[420px] rounded-r-3xl border-r',
    },
  }[position];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={slideVariants.initial}
            animate={slideVariants.animate}
            exit={slideVariants.exit}
            transition={transitions.springGentle}
            className={cn(
              'fixed z-50 bg-card border-border/80 shadow-2xl flex flex-col overflow-hidden',
              slideVariants.posClass,
              className
            )}
          >
            {/* Grab handle for bottom drawer */}
            {position === 'bottom' && (
              <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mt-3 mb-1" />
            )}

            {/* Header */}
            {(title || description) && (
              <div className="flex items-start justify-between p-6 pb-4 border-b border-border/60">
                <div className="space-y-1">
                  {title && <h2 className="text-lg font-bold tracking-tight">{title}</h2>}
                  {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
