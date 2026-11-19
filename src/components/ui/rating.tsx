import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn, transitions } from '@/lib/utils';

export interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
  withGlow?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = 22,
  withGlow = true,
  className,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={cn('inline-flex items-center gap-1 select-none', className)}>
      {Array.from({ length: max }, (_, idx) => {
        const starIndex = idx + 1;
        const isFilled = starIndex <= displayValue;

        return (
          <motion.button
            key={idx}
            type="button"
            disabled={readOnly}
            whileHover={!readOnly ? { scale: 1.25, rotate: 5 } : undefined}
            whileTap={!readOnly ? { scale: 0.85 } : undefined}
            transition={transitions.springBouncy}
            onMouseEnter={() => !readOnly && setHoverValue(starIndex)}
            onMouseLeave={() => !readOnly && setHoverValue(null)}
            onClick={() => !readOnly && onChange?.(starIndex)}
            className={cn(
              'p-1 transition-colors relative',
              readOnly ? 'cursor-default' : 'cursor-pointer'
            )}
          >
            <Star
              size={size}
              className={cn(
                'transition-all duration-200',
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-transparent text-muted-foreground/40 hover:text-muted-foreground'
              )}
            />
            {withGlow && isFilled && (
              <span className="absolute inset-0 rounded-full bg-amber-400/20 blur-sm pointer-events-none" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
