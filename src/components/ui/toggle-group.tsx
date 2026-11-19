import React from 'react';
import { motion } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

export interface ToggleItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  items: ToggleItem[];
  value: string | string[];
  onChange: (value: any) => void;
  type?: 'single' | 'multiple';
  variant?: 'pill' | 'outline' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  items,
  value,
  onChange,
  type = 'single',
  variant = 'pill',
  size = 'md',
  className,
}) => {
  const isSelected = (val: string) => {
    if (type === 'single') return value === val;
    return Array.isArray(value) && value.includes(val);
  };

  const handleSelect = (val: string) => {
    if (type === 'single') {
      onChange(val);
    } else {
      const arr = Array.isArray(value) ? [...value] : [];
      const idx = arr.indexOf(val);
      if (idx > -1) arr.splice(idx, 1);
      else arr.push(val);
      onChange(arr);
    }
  };

  const sizeClasses = {
    sm: 'text-[11px] py-1 px-2.5 h-7',
    md: 'text-xs py-1.5 px-3.5 h-9',
    lg: 'text-sm py-2 px-4 h-11',
  }[size];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-2xl bg-muted/40 border border-border/70 backdrop-blur-sm',
        className
      )}
    >
      {items.map((item) => {
        const active = isSelected(item.value);

        return (
          <button
            key={item.value}
            type="button"
            disabled={item.disabled}
            onClick={() => handleSelect(item.value)}
            className={cn(
              'relative rounded-xl font-semibold transition-colors duration-200 cursor-pointer select-none flex items-center justify-center gap-1.5 shrink-0',
              sizeClasses,
              item.disabled && 'opacity-40 cursor-not-allowed',
              active
                ? 'text-primary-foreground font-bold'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {active && (
              <motion.div
                layoutId="toggleGroupActive"
                transition={transitions.springBouncy}
                className={cn(
                  'absolute inset-0 rounded-xl bg-primary',
                  variant === 'glow' && 'shadow-glow',
                  variant === 'outline' && 'bg-background text-foreground border border-border shadow-xs'
                )}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {item.icon}
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
