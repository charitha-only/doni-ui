import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  delay = 0,
}) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i + delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      filter: 'blur(8px)',
      y: 12,
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn('flex flex-wrap gap-x-2', className)}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
