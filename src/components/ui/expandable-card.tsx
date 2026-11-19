import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface ExpandableCardItem {
  id: string;
  title: string;
  description: string;
  content: string;
  ctaText?: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface ExpandableCardProps {
  items: ExpandableCardItem[];
  className?: string;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({ items, className }) => {
  const [active, setActive] = useState<ExpandableCardItem | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md h-full w-full z-50 cursor-pointer"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      {/* Expanded Modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50 p-4 pointer-events-none">
            <motion.div
              layoutId={`card-${active.id}`}
              className="w-full max-w-lg bg-card border border-border/80 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div className="p-6 flex items-start justify-between border-b border-border/50">
                <div className="flex items-center gap-3">
                  {active.icon && (
                    <motion.div
                      layoutId={`icon-${active.id}`}
                      className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20"
                    >
                      {active.icon}
                    </motion.div>
                  )}
                  <div>
                    <motion.h3
                      layoutId={`title-${active.id}`}
                      className="text-xl font-bold tracking-tight"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`desc-${active.id}`}
                      className="text-xs text-muted-foreground mt-0.5"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => setActive(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.1 }}
                className="p-6 overflow-y-auto space-y-4 text-sm text-muted-foreground leading-relaxed"
              >
                <p>{active.content}</p>
                <div className="pt-4 flex justify-end gap-3 border-t border-border/50">
                  <Button variant="outline" size="sm" onClick={() => setActive(null)}>
                    Dismiss
                  </Button>
                  <Button variant="glow" size="sm" onClick={() => setActive(null)}>
                    {active.ctaText || 'Learn More'}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid of collapsed cards */}
      <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
        {items.map((item) => (
          <motion.div
            layoutId={`card-${item.id}`}
            key={item.id}
            onClick={() => setActive(item)}
            className="p-5 rounded-2xl border border-border/70 bg-card hover:border-primary/50 hover:shadow-lg transition-colors cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <motion.div
                  layoutId={`icon-${item.id}`}
                  className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform"
                >
                  {item.icon}
                </motion.div>
              )}
              <div>
                <motion.h4
                  layoutId={`title-${item.id}`}
                  className="font-bold text-base group-hover:text-primary transition-colors"
                >
                  {item.title}
                </motion.h4>
                <motion.p
                  layoutId={`desc-${item.id}`}
                  className="text-xs text-muted-foreground mt-0.5 line-clamp-1"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="text-xs pointer-events-none group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
            >
              Expand
            </Button>
          </motion.div>
        ))}
      </div>
    </>
  );
};
