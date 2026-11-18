import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn, transitions } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground border-border hover:border-primary/60',
        glow: 'border-primary/30 bg-primary/10 text-primary shadow-glow hover:bg-primary/20',
        neon: 'border-transparent bg-gradient-to-r from-primary to-accent text-white shadow-glow',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
    VariantProps<typeof badgeVariants> {
  withPulse?: boolean;
  children?: React.ReactNode;
}

export const Badge = ({
  className,
  variant,
  withPulse = false,
  children,
  ...props
}: BadgeProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={transitions.springSnappy}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {withPulse && (
        <span className="relative flex h-2 w-2 mr-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {children}
    </motion.div>
  );
};
