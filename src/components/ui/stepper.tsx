import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn, transitions } from '@/lib/utils';

export interface StepItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  className,
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={cn(
        'w-full flex',
        isHorizontal ? 'flex-row items-center justify-between' : 'flex-col space-y-6',
        className
      )}
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;
        const isClickable = onStepClick && idx <= currentStep;

        return (
          <React.Fragment key={idx}>
            <div
              onClick={() => isClickable && onStepClick(idx)}
              className={cn(
                'flex items-center gap-3 relative select-none',
                isClickable && 'cursor-pointer'
              )}
            >
              {/* Step Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={transitions.springBouncy}
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 shrink-0 border-2',
                  isCompleted
                    ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                    : isActive
                    ? 'bg-background border-primary text-primary ring-4 ring-primary/20 shadow-sm'
                    : 'bg-muted/40 border-border text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  idx + 1
                )}
              </motion.div>

              {/* Step Labels */}
              <div className="flex flex-col text-left">
                <span
                  className={cn(
                    'text-xs font-semibold tracking-tight transition-colors',
                    isActive
                      ? 'text-foreground font-bold'
                      : isCompleted
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[10px] text-muted-foreground">
                    {step.description}
                  </span>
                )}
              </div>
            </div>

            {/* Connecting Bar */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'transition-all duration-500 overflow-hidden relative',
                  isHorizontal
                    ? 'flex-1 h-0.5 mx-4 bg-border/60 rounded-full'
                    : 'w-0.5 h-8 ml-4 my-1 bg-border/60'
                )}
              >
                <motion.div
                  initial={false}
                  animate={{
                    width: isHorizontal ? (idx < currentStep ? '100%' : '0%') : '100%',
                    height: !isHorizontal ? (idx < currentStep ? '100%' : '0%') : '100%',
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="bg-primary absolute inset-0 shadow-glow"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
