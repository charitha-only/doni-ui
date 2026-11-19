import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  AnimatedIconBaseProps,
  AnimatedGithub,
  AnimatedTwitter,
  AnimatedYoutube,
  AnimatedLinkedin,
  AnimatedInstagram,
  AnimatedDiscord,
  AnimatedTelegram,
  AnimatedTiktok,
  AnimatedFacebook,
  AnimatedDribbble,
  SocialIconName,
} from './animated-social-icons';

// Re-export all social icons and base props
export * from './animated-social-icons';

// ============================================================================
// 1. VEHICLES & TRANSPORT ANIMATED ICONS
// ============================================================================

// 1.1 Animated Rocket
export const AnimatedRocket: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-orange-500 hover:border-orange-500/40 hover:bg-orange-500/10',
        withGlow && isHovered && 'shadow-[0_0_24px_rgba(249,115,22,0.45)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Rocket Body */}
        <motion.path
          d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.4 }}
        />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <circle cx="15" cy="9" r="1.5" fill="currentColor" />
        <path d="M9 22H5a1 1 0 0 1-1-1v-4" />
        <path d="M14 9a2 2 0 0 0-2-2" />
        {/* Thrust Flame / Particles */}
        {isHovered && (
          <motion.path
            d="M5 19l-3 3M2 17l2 2"
            stroke="#f97316"
            strokeWidth="2.5"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], pathLength: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 0.25 }}
          />
        )}
      </svg>
    </motion.div>
  );
};

// 1.2 Animated Plane
export const AnimatedPlane: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: -12, x: 3, y: -3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 14 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-sky-400 hover:border-sky-400/40 hover:bg-sky-400/10',
        withGlow && isHovered && 'shadow-[0_0_22px_rgba(56,189,248,0.4)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
          animate={isHovered ? { y: [0, -1, 1, 0] } : {}}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      </svg>
    </motion.div>
  );
};

// 1.3 Animated Car
export const AnimatedCar: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, x: [0, 2, -2, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-emerald-400/10',
        withGlow && isHovered && 'shadow-[0_0_22px_rgba(52,211,153,0.4)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
        <motion.circle
          cx="7"
          cy="17"
          r="2"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
        />
        <path d="M9 17h6" />
        <motion.circle
          cx="17"
          cy="17"
          r="2"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
        />
      </svg>
    </motion.div>
  );
};

// 1.4 Animated Bicycle
export const AnimatedBicycle: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-teal-400 hover:border-teal-400/40 hover:bg-teal-400/10',
        withGlow && isHovered && 'shadow-[0_0_22px_rgba(45,212,191,0.4)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.circle
          cx="5.5"
          cy="17.5"
          r="3.5"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
        <motion.circle
          cx="18.5"
          cy="17.5"
          r="3.5"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
        <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 9l3-3h3" />
        <path d="m12 17.5 4.5-8.5" />
        <path d="M5.5 17.5 9 9" />
      </svg>
    </motion.div>
  );
};

// ============================================================================
// 2. WARNING & STATUS ANIMATED ICONS
// ============================================================================

// 2.1 Animated Alert Triangle
export const AnimatedAlertTriangle: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [0, -6, 6, -3, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/10',
        withGlow && isHovered && 'shadow-[0_0_24px_rgba(251,191,36,0.45)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <motion.line
          x1="12"
          y1="9"
          x2="12"
          y2="13"
          animate={isHovered ? { y2: [13, 14, 13] } : {}}
          transition={{ repeat: Infinity, duration: 0.4 }}
        />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </motion.div>
  );
};

// 2.2 Animated Shield Check
export const AnimatedShieldCheck: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10',
        withGlow && isHovered && 'shadow-[0_0_24px_rgba(16,185,129,0.45)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <motion.path
          d="m9 12 2 2 4-4"
          initial={{ pathLength: 1 }}
          animate={isHovered ? { pathLength: [0, 1] } : { pathLength: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  );
};

// 2.3 Animated Flame Danger
export const AnimatedFlameDanger: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-rose-500 hover:border-rose-500/40 hover:bg-rose-500/10',
        withGlow && isHovered && 'shadow-[0_0_24px_rgba(244,63,94,0.45)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
          animate={isHovered ? { scale: [1, 1.08, 0.96, 1], rotate: [0, -3, 3, 0] } : {}}
          transition={{ repeat: Infinity, duration: 0.6 }}
        />
      </svg>
    </motion.div>
  );
};

// 2.4 Animated Bell Ring
export const AnimatedBellRing: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [0, -18, 18, -10, 10, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 450, damping: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-yellow-400 hover:border-yellow-400/40 hover:bg-yellow-400/10',
        withGlow && isHovered && 'shadow-[0_0_22px_rgba(250,204,21,0.45)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        {isHovered && (
          <motion.circle
            cx="18"
            cy="4"
            r="3"
            fill="#facc15"
            stroke="none"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        )}
      </svg>
    </motion.div>
  );
};

// ============================================================================
// 3. ENTERTAINMENT & MEDIA ANIMATED ICONS
// ============================================================================

// 3.1 Animated Gamepad
export const AnimatedGamepad: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-violet-400 hover:border-violet-400/40 hover:bg-violet-400/10',
        withGlow && isHovered && 'shadow-[0_0_24px_rgba(167,139,250,0.45)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <motion.line
          x1="15"
          y1="13"
          x2="15.01"
          y2="13"
          animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.4 }}
        />
        <motion.line
          x1="18"
          y1="11"
          x2="18.01"
          y2="11"
          animate={isHovered ? { scale: [1, 1.5, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.4, delay: 0.15 }}
        />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    </motion.div>
  );
};

// 3.2 Animated Headphones
export const AnimatedHeadphones: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/10',
        withGlow && isHovered && 'shadow-[0_0_24px_rgba(34,211,238,0.45)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        {/* Equalizer Wavebars inside */}
        {isHovered && (
          <>
            <motion.line
              x1="10"
              y1="15"
              x2="10"
              y2="11"
              stroke="#22d3ee"
              strokeWidth="2"
              animate={{ y2: [11, 8, 14, 11] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
            <motion.line
              x1="12"
              y1="16"
              x2="12"
              y2="9"
              stroke="#22d3ee"
              strokeWidth="2"
              animate={{ y2: [9, 15, 7, 9] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
            />
            <motion.line
              x1="14"
              y1="15"
              x2="14"
              y2="12"
              stroke="#22d3ee"
              strokeWidth="2"
              animate={{ y2: [12, 7, 13, 12] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
};

// 3.3 Animated Film
export const AnimatedFilm: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-amber-500 hover:border-amber-500/40 hover:bg-amber-500/10',
        withGlow && isHovered && 'shadow-[0_0_22px_rgba(245,158,11,0.4)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18" />
        <path d="M3 7.5h4" />
        <path d="M3 12h18" />
        <path d="M3 16.5h4" />
        <path d="M17 3v18" />
        <path d="M17 7.5h4" />
        <path d="M17 16.5h4" />
      </svg>
    </motion.div>
  );
};

// 3.4 Animated Sparkle Star
export const AnimatedSparkleStar: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-yellow-300 hover:border-yellow-300/40 hover:bg-yellow-300/10',
        withGlow && isHovered && 'shadow-[0_0_26px_rgba(253,224,71,0.5)]',
        className
      )}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
      </svg>
    </motion.div>
  );
};

// ============================================================================
// 4. UNIFIED ANIMATED ICON DISPATCHER
// ============================================================================

export type IconCategory = 'social' | 'vehicles' | 'warning' | 'entertainment';

export type AnyAnimatedIconName =
  | SocialIconName
  | 'rocket'
  | 'plane'
  | 'car'
  | 'bicycle'
  | 'alert-triangle'
  | 'shield-check'
  | 'flame-danger'
  | 'bell-ring'
  | 'gamepad'
  | 'headphones'
  | 'film'
  | 'sparkle-star';

export interface AnimatedIconProps extends AnimatedIconBaseProps {
  name: AnyAnimatedIconName;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ name, ...props }) => {
  switch (name) {
    // Social Media
    case 'github':
      return <AnimatedGithub {...props} />;
    case 'twitter':
      return <AnimatedTwitter {...props} />;
    case 'youtube':
      return <AnimatedYoutube {...props} />;
    case 'linkedin':
      return <AnimatedLinkedin {...props} />;
    case 'instagram':
      return <AnimatedInstagram {...props} />;
    case 'discord':
      return <AnimatedDiscord {...props} />;
    case 'telegram':
      return <AnimatedTelegram {...props} />;
    case 'tiktok':
      return <AnimatedTiktok {...props} />;
    case 'facebook':
      return <AnimatedFacebook {...props} />;
    case 'dribbble':
      return <AnimatedDribbble {...props} />;

    // Vehicles
    case 'rocket':
      return <AnimatedRocket {...props} />;
    case 'plane':
      return <AnimatedPlane {...props} />;
    case 'car':
      return <AnimatedCar {...props} />;
    case 'bicycle':
      return <AnimatedBicycle {...props} />;

    // Warning
    case 'alert-triangle':
      return <AnimatedAlertTriangle {...props} />;
    case 'shield-check':
      return <AnimatedShieldCheck {...props} />;
    case 'flame-danger':
      return <AnimatedFlameDanger {...props} />;
    case 'bell-ring':
      return <AnimatedBellRing {...props} />;

    // Entertainment
    case 'gamepad':
      return <AnimatedGamepad {...props} />;
    case 'headphones':
      return <AnimatedHeadphones {...props} />;
    case 'film':
      return <AnimatedFilm {...props} />;
    case 'sparkle-star':
      return <AnimatedSparkleStar {...props} />;

    default:
      return null;
  }
};

// ============================================================================
// 5. GENERIC ANIMATED ICON DOCK
// ============================================================================

export interface AnimatedIconDockProps extends React.HTMLAttributes<HTMLDivElement> {
  icons?: AnyAnimatedIconName[];
  iconSize?: number;
}

export const AnimatedIconDock: React.FC<AnimatedIconDockProps> = ({
  icons = [
    'github',
    'twitter',
    'youtube',
    'rocket',
    'shield-check',
    'gamepad',
    'headphones',
    'sparkle-star',
  ],
  iconSize = 24,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-card/60 border border-border/80 backdrop-blur-xl shadow-lg',
        className
      )}
      {...props}
    >
      {icons.map((iconName) => (
        <AnimatedIcon key={iconName} name={iconName} size={iconSize} />
      ))}
    </div>
  );
};
