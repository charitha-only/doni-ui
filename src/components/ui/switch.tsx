import * as React from 'react';
import { motion } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      className,
      size = 'default',
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] =
      React.useState(defaultChecked);
    const isChecked =
      controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

    const handleToggle = () => {
      if (disabled) return;
      const next = !isChecked;
      if (controlledChecked === undefined) {
        setUncontrolledChecked(next);
      }
      onCheckedChange?.(next);
    };

    const sizeClasses = {
      sm: { track: 'w-9 h-5 p-0.5', thumb: 'w-4 h-4', translate: 'translateX(16px)' },
      default: { track: 'w-12 h-6.5 p-0.5', thumb: 'w-5.5 h-5.5', translate: 'translateX(22px)' },
      lg: { track: 'w-16 h-8.5 p-1', thumb: 'w-6.5 h-6.5', translate: 'translateX(30px)' },
    };

    const currentSize = sizeClasses[size];

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
          isChecked ? 'bg-primary shadow-glow' : 'bg-muted border border-border',
          currentSize.track,
          className
        )}
      >
        <motion.span
          layout
          transition={transitions.springBouncy}
          animate={{
            x: isChecked ? (size === 'sm' ? 16 : size === 'lg' ? 30 : 22) : 2,
          }}
          className={cn(
            'pointer-events-none block rounded-full bg-white shadow-md transform ring-0 transition-transform',
            currentSize.thumb
          )}
        />
      </button>
    );
  }
);
Switch.displayName = 'Switch';
