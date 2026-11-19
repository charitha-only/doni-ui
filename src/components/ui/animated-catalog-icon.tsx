import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IconCustomProps } from './animated-icons-suite';
import { Icon1000Item, getLucideComponent } from '@/data/icons-catalog-1000';

export interface AnimatedCatalogIconProps extends IconCustomProps {
  iconItem: Icon1000Item;
}

export const AnimatedCatalogIcon: React.FC<AnimatedCatalogIconProps> = ({
  iconItem,
  size = 28,
  color,
  hoverColor,
  strokeWidth = 2,
  withGlow = true,
  glowColor,
  continuous = false,
  trigger = 'hover',
  bgShape = 'none',
  className,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isActive = continuous || trigger === 'continuous' || (trigger === 'click' ? isClicked : isHovered);

  const finalColor = isHovered && hoverColor
    ? hoverColor
    : color || 'currentColor';

  const bgClasses = {
    none: '',
    square: 'rounded-xl bg-card/80 border border-border/80 p-2.5',
    circle: 'rounded-full bg-card/80 border border-border/80 p-2.5',
    glass: 'rounded-2xl bg-card/50 border border-border/50 backdrop-blur-md p-3 shadow-sm',
  }[bgShape];

  // Dynamic spring physics variants based on item animationType
  const motionVariants = {
    bounce: {
      initial: { scale: 1, y: 0 },
      animate: isActive ? { scale: [1, 1.2, 1.05, 1.15], y: [0, -5, -1, -4] } : { scale: 1, y: 0 },
    },
    wiggle: {
      initial: { rotate: 0 },
      animate: isActive ? { rotate: [0, -14, 14, -8, 8, 0] } : { rotate: 0 },
    },
    spin: {
      initial: { rotate: 0 },
      animate: isActive ? { rotate: [0, 180, 360] } : { rotate: 0 },
    },
    pulse: {
      initial: { scale: 1 },
      animate: isActive ? { scale: [1, 1.28, 1.1, 1.22] } : { scale: 1 },
    },
    scale: {
      initial: { scale: 1 },
      animate: isActive ? { scale: 1.25 } : { scale: 1 },
    },
  }[iconItem.animationType] || {
    initial: { scale: 1 },
    animate: isActive ? { scale: 1.18, y: -4 } : { scale: 1, y: 0 },
  };

  const IconComp = getLucideComponent(iconItem.iconName);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={(e) => {
        setIsClicked((prev) => !prev);
        onClick?.(e);
      }}
      className={cn(
        'relative inline-flex items-center justify-center cursor-pointer transition-all duration-300 select-none',
        bgClasses,
        withGlow && isActive && 'drop-shadow-[0_0_12px_rgba(var(--primary),0.6)]',
        className
      )}
      style={{
        color: finalColor,
        filter: withGlow && isActive && glowColor ? `drop-shadow(0 0 10px ${glowColor})` : undefined,
      }}
      {...props}
    >
      <motion.div
        animate={motionVariants.animate}
        transition={{
          duration: trigger === 'continuous' || continuous ? 1.5 : 0.45,
          repeat: trigger === 'continuous' || continuous ? Infinity : 0,
          ease: 'easeInOut',
        }}
        className="flex items-center justify-center"
      >
        <IconComp size={size} strokeWidth={strokeWidth} color="currentColor" />
      </motion.div>
    </motion.div>
  );
};
