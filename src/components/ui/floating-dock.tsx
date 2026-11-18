import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface FloatingDockProps {
  items: FloatingDockItem[];
  className?: string;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto flex h-16 gap-3 items-end rounded-2xl border border-border/80 bg-background/80 px-4 pb-3 shadow-2xl backdrop-blur-xl',
        className
      )}
    >
      {items.map((item) => (
        <DockIcon mouseX={mouseX} key={item.title} item={item} />
      ))}
    </motion.div>
  );
};

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: FloatingDockItem;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 68, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onClick={item.onClick}
      className="aspect-square rounded-full bg-card/90 border border-border/80 flex items-center justify-center relative group cursor-pointer hover:border-primary/50 shadow-md"
    >
      {/* Tooltip Title */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-0.5 text-[10px] font-bold text-background opacity-0 shadow transition-opacity group-hover:opacity-100">
        {item.title}
      </span>
      <div className="flex items-center justify-center text-foreground group-hover:text-primary transition-colors [&>svg]:w-5 [&>svg]:h-5">
        {item.icon}
      </div>
    </motion.div>
  );
}
