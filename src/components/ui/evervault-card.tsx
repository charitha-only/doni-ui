import React, { useState, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';
import { motion, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface EvervaultCardProps {
  text?: string;
  className?: string;
}

export const EvervaultCard: React.FC<EvervaultCardProps> = ({
  text = 'hover',
  className,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState('');

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        'p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative rounded-2xl overflow-hidden border border-border/80 group/card',
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-2xl w-full relative overflow-hidden bg-card flex items-center justify-center h-full"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-44 w-44 rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <div className="absolute w-full h-full bg-background/80 blur-sm rounded-full" />
            <span className="text-foreground z-20 text-2xl font-mono uppercase tracking-widest">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] opacity-50" />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100 transition duration-500"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words -mt-2 font-mono font-bold text-white transition duration-500 leading-none">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><,./-=';
export const generateRandomString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
