import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords: React.FC<FlipWordsProps> = ({
  words,
  duration = 2500,
  className,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  const currentWord = words[currentWordIndex];

  return (
    <span className="inline-block relative text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 25,
          }}
          className={cn(
            'inline-block font-extrabold text-primary select-none px-1 whitespace-nowrap',
            className
          )}
        >
          {currentWord.split('').map((letter, index) => (
            <motion.span
              key={currentWord + index}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: index * 0.02,
                duration: 0.18,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
