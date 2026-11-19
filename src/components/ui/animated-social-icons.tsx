import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AnimatedIconBaseProps extends HTMLMotionProps<'div'> {
  size?: number;
  color?: string;
  hoverColor?: string;
  withGlow?: boolean;
}

// 1. GITHUB - Octocat with spring ear wiggle & tilt
export const AnimatedGithub: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [0, -8, 8, -4, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-white hover:bg-neutral-900 hover:border-neutral-700',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(255,255,255,0.25)]',
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
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <motion.path
          d="M9 18c-4.51 2-5-2-7-2"
          animate={isHovered ? { pathLength: [0.7, 1, 0.8, 1] } : { pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
      </svg>
    </motion.div>
  );
};

// 2. TWITTER / X - Neon strike cut & 3D flip
export const AnimatedTwitter: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotateY: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 350, damping: 14 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-white hover:bg-black hover:border-neutral-700',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(255,255,255,0.3)]',
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
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </motion.div>
  );
};

// 3. YOUTUBE - Play button pulse and beam
export const AnimatedYoutube: React.FC<AnimatedIconBaseProps> = ({
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
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
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
        <rect width="20" height="15" x="2" y="4.5" rx="4" />
        <motion.polygon
          points="10 15 15 12 10 9"
          fill="currentColor"
          animate={isHovered ? { scale: [1, 1.3, 1], x: [0, 1, 0] } : { scale: 1, x: 0 }}
          transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0, repeatDelay: 0.8 }}
        />
      </svg>
    </motion.div>
  );
};

// 4. LINKEDIN - Ripple letter bounce
export const AnimatedLinkedin: React.FC<AnimatedIconBaseProps> = ({
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
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-[#0a66c2] hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/10',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(10,102,194,0.4)]',
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
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <motion.circle
          cx="4"
          cy="4"
          r="2"
          animate={isHovered ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      </svg>
    </motion.div>
  );
};

// 5. INSTAGRAM - Rainbow shutter spin
export const AnimatedInstagram: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: 12 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-pink-500 hover:border-pink-500/40 hover:bg-gradient-to-tr hover:from-amber-500/10 hover:via-pink-500/10 hover:to-purple-500/10',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(236,72,153,0.4)]',
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
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <motion.path
          d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </motion.div>
  );
};

// 6. DISCORD - Controller wiggle & eyes blink
export const AnimatedDiscord: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [0, -10, 10, -5, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-[#5865F2] hover:border-[#5865F2]/40 hover:bg-[#5865F2]/10',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(88,101,242,0.4)]',
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
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    </motion.div>
  );
};

// 7. TELEGRAM - Paper airplane launch
export const AnimatedTelegram: React.FC<AnimatedIconBaseProps> = ({
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
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-[#229ED9] hover:border-[#229ED9]/40 hover:bg-[#229ED9]/10',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(34,158,217,0.4)]',
        className
      )}
      {...props}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        animate={isHovered ? { x: [0, 4, -2, 0], y: [0, -4, 2, 0], rotate: [0, -10, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </motion.svg>
    </motion.div>
  );
};

// 8. TIKTOK - Glitch chromatic split
export const AnimatedTiktok: React.FC<AnimatedIconBaseProps> = ({
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
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-white hover:bg-neutral-950 hover:border-neutral-700',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(37,244,238,0.4)]',
        className
      )}
      {...props}
    >
      <div className="relative">
        {/* Cyan chromatic split */}
        {isHovered && (
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: -2, opacity: 0.8 }}
            className="absolute inset-0 text-[#25F4EE] pointer-events-none"
          >
            <TiktokSvg size={size} />
          </motion.div>
        )}
        {/* Red chromatic split */}
        {isHovered && (
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 2, opacity: 0.8 }}
            className="absolute inset-0 text-[#FE2C55] pointer-events-none"
          >
            <TiktokSvg size={size} />
          </motion.div>
        )}
        <TiktokSvg size={size} />
      </div>
    </motion.div>
  );
};

function TiktokSvg({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43 6.27 6.27 0 0 0 1.93-4.52v-6.9a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.97-.1z" />
    </svg>
  );
}

// 9. FACEBOOK - 3D thumbs bounce & 'f' pop
export const AnimatedFacebook: React.FC<AnimatedIconBaseProps> = ({
  size = 28,
  className,
  withGlow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [0, -6, 6, 0] }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(24,119,242,0.4)]',
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
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </motion.div>
  );
};

// 10. DRIBBBLE - Basketball bounce & spin
export const AnimatedDribbble: React.FC<AnimatedIconBaseProps> = ({
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
        'relative inline-flex items-center justify-center rounded-xl p-2.5 cursor-pointer bg-card/80 border border-border/80 text-foreground transition-all duration-300 hover:text-[#EA4C89] hover:border-[#EA4C89]/40 hover:bg-[#EA4C89]/10',
        withGlow && isHovered && 'shadow-[0_0_20px_rgba(234,76,137,0.4)]',
        className
      )}
      {...props}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 1.5, ease: 'linear' }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </motion.svg>
    </motion.div>
  );
};

// Unified Icon Component
export type SocialIconName =
  | 'github'
  | 'twitter'
  | 'youtube'
  | 'linkedin'
  | 'instagram'
  | 'discord'
  | 'telegram'
  | 'tiktok'
  | 'facebook'
  | 'dribbble';

export interface AnimatedSocialIconProps extends AnimatedIconBaseProps {
  name: SocialIconName;
}

export const AnimatedSocialIcon: React.FC<AnimatedSocialIconProps> = ({ name, ...props }) => {
  switch (name) {
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
    default:
      return null;
  }
};

// Social Icon Dock Bar
export interface SocialIconDockProps extends React.HTMLAttributes<HTMLDivElement> {
  icons?: SocialIconName[];
  iconSize?: number;
}

export const SocialIconDock: React.FC<SocialIconDockProps> = ({
  icons = [
    'github',
    'twitter',
    'youtube',
    'linkedin',
    'instagram',
    'discord',
    'telegram',
    'tiktok',
    'facebook',
    'dribbble',
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
        <AnimatedSocialIcon key={iconName} name={iconName} size={iconSize} />
      ))}
    </div>
  );
};
