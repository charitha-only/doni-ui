import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface LampContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LampContainer: React.FC<LampContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden bg-background w-full rounded-2xl z-0',
        className
      )}
      {...props}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left Conic Lamp Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: '12rem' }}
          whileInView={{ opacity: 1, width: '24rem' }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-52 overflow-visible w-[24rem] bg-gradient-conic from-primary via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-background h-36 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-36 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Lamp Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: '12rem' }}
          whileInView={{ opacity: 1, width: '24rem' }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-52 w-[24rem] bg-gradient-conic from-transparent via-transparent to-primary text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-36 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-background h-36 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Ambient Top Blur Bloom */}
        <div className="absolute top-1/2 h-44 w-full translate-y-10 scale-x-150 bg-background blur-2xl" />
        <div className="absolute top-1/2 z-50 h-44 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-32 w-[24rem] -translate-y-1/2 rounded-full bg-primary opacity-40 blur-3xl" />

        {/* Glowing Lamp Bar Line */}
        <motion.div
          initial={{ width: '6rem' }}
          whileInView={{ width: '14rem' }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-30 h-32 w-[14rem] -translate-y-[5.5rem] rounded-full bg-primary/40 blur-2xl"
        />
        <motion.div
          initial={{ width: '12rem' }}
          whileInView={{ width: '24rem' }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-50 h-0.5 w-[24rem] -translate-y-[6.5rem] bg-primary"
        />

        <div className="absolute inset-auto z-40 h-40 w-full -translate-y-[11.5rem] bg-background" />
      </div>

      <div className="relative z-50 flex -translate-y-24 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
