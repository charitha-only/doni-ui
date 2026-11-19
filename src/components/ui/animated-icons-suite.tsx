import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface IconCustomProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  size?: number;
  color?: string;
  hoverColor?: string;
  strokeWidth?: number;
  withGlow?: boolean;
  glowColor?: string;
  continuous?: boolean;
  trigger?: 'hover' | 'continuous' | 'click';
  bgShape?: 'none' | 'square' | 'circle' | 'glass';
  children?: React.ReactNode;
}

export interface IconItemDef {
  id: string;
  name: string;
  category:
    | 'social'
    | 'vehicles'
    | 'warning'
    | 'entertainment'
    | 'weather'
    | 'interface'
    | 'business'
    | 'communication'
    | 'content'
    | 'tools';
  exportName: string;
  desc: string;
  component: React.FC<IconCustomProps>;
}

// Helper wrapper for customizable interactive container
export const IconWrapper: React.FC<
  Omit<IconCustomProps, 'children'> & {
    children: (active: boolean) => React.ReactNode;
    defaultColor?: string;
    defaultHoverColor?: string;
  }
> = ({
  size = 28,
  color,
  hoverColor,
  defaultColor = 'currentColor',
  defaultHoverColor = 'var(--primary)',
  strokeWidth = 2,
  withGlow = true,
  glowColor,
  continuous = false,
  trigger = 'hover',
  bgShape = 'none',
  className,
  children,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isActive = continuous || trigger === 'continuous' || (trigger === 'click' ? isClicked : isHovered);

  const finalColor = isHovered && (hoverColor || defaultHoverColor)
    ? hoverColor || defaultHoverColor
    : color || defaultColor;

  const bgClasses = {
    none: '',
    square: 'rounded-xl bg-card/80 border border-border/80 p-2.5',
    circle: 'rounded-full bg-card/80 border border-border/80 p-2.5',
    glass: 'rounded-2xl bg-card/50 border border-border/50 backdrop-blur-md p-3 shadow-sm',
  }[bgShape];

  return (
    <motion.div
      whileHover={{ scale: 1.12 }}
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
        withGlow && isActive && 'drop-shadow-[0_0_12px_rgba(var(--primary),0.5)]',
        className
      )}
      style={{
        color: finalColor,
        filter: withGlow && isActive && glowColor ? `drop-shadow(0 0 10px ${glowColor})` : undefined,
      }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children(isActive)}
      </svg>
    </motion.div>
  );
};

// ============================================================================
// 1. SOCIAL & DEV PLATFORMS (10 ICONS)
// ============================================================================

export const IconGithub: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ffffff" {...props}>
    {(active) => (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <motion.path
          d="M9 18c-4.51 2-5-2-7-2"
          animate={active ? { pathLength: [0.6, 1, 0.7, 1] } : { pathLength: 1 }}
          transition={{ duration: 0.6, repeat: active ? Infinity : 0 }}
        />
      </>
    )}
  </IconWrapper>
);

export const IconTwitter: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ffffff" {...props}>
    {(active) => (
      <motion.path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill="currentColor"
        stroke="none"
        animate={active ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 14 }}
      />
    )}
  </IconWrapper>
);

export const IconYoutube: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ff0000" glowColor="rgba(255,0,0,0.5)" {...props}>
    {(active) => (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <motion.polygon
          points="10 15 15 12 10 9 10 15"
          fill="currentColor"
          animate={active ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ repeat: active ? Infinity : 0, duration: 0.5 }}
        />
      </>
    )}
  </IconWrapper>
);

export const IconLinkedin: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0077b5" glowColor="rgba(0,119,181,0.5)" {...props}>
    {(active) => (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <motion.circle
          cx="4"
          cy="4"
          r="2"
          fill="currentColor"
          animate={active ? { y: [-2, 0, -2] } : { y: 0 }}
          transition={{ repeat: active ? Infinity : 0, duration: 0.4 }}
        />
      </>
    )}
  </IconWrapper>
);

export const IconInstagram: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#E1306C" glowColor="rgba(225,48,108,0.5)" {...props}>
    {(active) => (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <motion.path
          d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
          animate={active ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1.5, ease: 'linear', repeat: active ? Infinity : 0 }}
        />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    )}
  </IconWrapper>
);

export const IconDiscord: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#5865F2" glowColor="rgba(88,101,242,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [0, -6, 6, -3, 0] } : { rotate: 0 }} transition={{ duration: 0.5 }}>
        <path d="M18 6h0a14.5 14.5 0 0 0-4-1.2 12.2 12.2 0 0 0-.5 1.2 14.3 14.3 0 0 0-3 0 12.2 12.2 0 0 0-.5-1.2A14.5 14.5 0 0 0 6 6C3.5 10 3 13.5 3 17a14.7 14.7 0 0 0 4.5 2.3c.4-.5.7-1.1 1-1.7-.5-.2-1-.4-1.5-.7.1-.1.2-.2.3-.3a10.5 10.5 0 0 0 9.4 0c.1.1.2.2.3.3-.5.3-1 .5-1.5.7.3.6.6 1.2 1 1.7 1.5-.7 3-1.5 4.5-2.3 0-3.5-.5-7-3-11z" />
        <motion.circle cx="8.5" cy="12" r="1.5" fill="currentColor" animate={active ? { scaleY: [1, 0.2, 1] } : {}} transition={{ repeat: Infinity, duration: 0.8 }} />
        <motion.circle cx="15.5" cy="12" r="1.5" fill="currentColor" animate={active ? { scaleY: [1, 0.2, 1] } : {}} transition={{ repeat: Infinity, duration: 0.8 }} />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconTelegram: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0088cc" glowColor="rgba(0,136,204,0.5)" {...props}>
    {(active) => (
      <motion.path
        d="m22 2-7 20-4-9-9-4Z"
        animate={active ? { x: [0, 2, -2, 0], y: [0, -2, 2, 0] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
      />
    )}
  </IconWrapper>
);

export const IconTiktok: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#25F4EE" glowColor="rgba(37,244,238,0.5)" {...props}>
    {(active) => (
      <motion.path
        d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
        animate={active ? { x: [0, -2, 2, 0] } : { x: 0 }}
        transition={{ repeat: active ? Infinity : 0, duration: 0.2 }}
      />
    )}
  </IconWrapper>
);

export const IconFacebook: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#1877F2" glowColor="rgba(24,119,242,0.5)" {...props}>
    {(active) => (
      <motion.path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        animate={active ? { scale: [1, 1.15, 1], rotate: [0, -4, 4, 0] } : {}}
        transition={{ repeat: active ? Infinity : 0, duration: 0.5 }}
      />
    )}
  </IconWrapper>
);

export const IconDribbble: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#EA4C89" glowColor="rgba(234,76,137,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 2, ease: 'linear', repeat: active ? Infinity : 0 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </motion.g>
    )}
  </IconWrapper>
);

// ============================================================================
// 2. VEHICLES & TRANSPORT (10 ICONS)
// ============================================================================

export const IconRocket: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f97316" glowColor="rgba(249,115,22,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [-3, -6, -3] } : {}} transition={{ repeat: Infinity, duration: 0.4 }}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <circle cx="15" cy="9" r="1.5" fill="currentColor" />
        {active && <motion.path d="M5 19l-3 3M2 17l2 2" stroke="#f97316" strokeWidth="2.5" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.2 }} />}
      </motion.g>
    )}
  </IconWrapper>
);

export const IconPlane: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#38bdf8" glowColor="rgba(56,189,248,0.5)" {...props}>
    {(active) => (
      <motion.path
        d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
        animate={active ? { x: [0, 2, 0], y: [0, -2, 0], rotate: [-10, -15, -10] } : {}}
        transition={{ repeat: Infinity, duration: 0.7 }}
      />
    )}
  </IconWrapper>
);

export const IconCar: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#34d399" glowColor="rgba(52,211,153,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [0, -1.5, 0] } : {}} transition={{ repeat: Infinity, duration: 0.3 }}>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
        <motion.circle cx="7" cy="17" r="2" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }} />
        <path d="M9 17h6" />
        <motion.circle cx="17" cy="17" r="2" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }} />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconBicycle: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#2dd4bf" glowColor="rgba(45,212,191,0.5)" {...props}>
    {(active) => (
      <>
        <motion.circle cx="5.5" cy="17.5" r="3.5" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }} />
        <motion.circle cx="18.5" cy="17.5" r="3.5" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }} />
        <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 9l3-3h3" />
        <path d="m12 17.5 4.5-8.5" />
        <path d="M5.5 17.5 9 9" />
      </>
    )}
  </IconWrapper>
);

export const IconTrain: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#06b6d4" {...props}>
    {(active) => (
      <motion.g animate={active ? { x: [-2, 2, -2] } : {}} transition={{ repeat: Infinity, duration: 0.35 }}>
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <circle cx="8" cy="15" r="1.5" fill="currentColor" />
        <circle cx="16" cy="15" r="1.5" fill="currentColor" />
        <path d="m8 19-3 3" />
        <path d="m16 19 3 3" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconShip: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#38bdf8" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [-3, 3, -3], y: [-1, 1, -1] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
        <path d="M2 20a6 6 0 0 0 6 0 6 6 0 0 1 8 0 6 6 0 0 0 6 0" />
        <path d="M4 17l1.5-6h13L20 17" />
        <path d="M12 4v7" />
        <path d="M9 7h6" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconHelicopter: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#eab308" {...props}>
    {(active) => (
      <>
        <motion.line x1="3" y1="3" x2="21" y2="3" animate={active ? { scaleX: [1, 0.2, 1] } : {}} transition={{ repeat: Infinity, duration: 0.15 }} />
        <line x1="12" y1="3" x2="12" y2="7" />
        <path d="M5 12a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5V9H5v3z" />
        <path d="M19 12h3v-2" />
        <line x1="6" y1="21" x2="18" y2="21" />
        <line x1="9" y1="17" x2="9" y2="21" />
        <line x1="15" y1="17" x2="15" y2="21" />
      </>
    )}
  </IconWrapper>
);

export const IconTruck: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f59e0b" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [0, -1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.25 }}>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M14 8h4.5a2 2 0 0 1 1.6.8L22 12v5a1 1 0 0 1-1 1h-2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconDrone: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#a855f7" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [-2, 2, -2] } : {}} transition={{ repeat: Infinity, duration: 0.6 }}>
        <path d="M10 10h4v4h-4z" />
        <line x1="10" y1="10" x2="5" y2="5" />
        <line x1="14" y1="10" x2="19" y2="5" />
        <line x1="10" y1="14" x2="5" y2="19" />
        <line x1="14" y1="14" x2="19" y2="19" />
        <motion.circle cx="4" cy="4" r="2" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.2 }} />
        <motion.circle cx="20" cy="4" r="2" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.2 }} />
        <motion.circle cx="4" cy="20" r="2" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.2 }} />
        <motion.circle cx="20" cy="20" r="2" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.2 }} />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconScooter: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <motion.g animate={active ? { x: [0, 2, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }}>
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M5 17h10l3-12h2" />
        <path d="M15 5h4" />
      </motion.g>
    )}
  </IconWrapper>
);

// ============================================================================
// 3. WARNING, SECURITY & SYSTEM (10 ICONS)
// ============================================================================

export const IconAlertTriangle: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#fbbf24" glowColor="rgba(251,191,36,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [0, -6, 6, -3, 0] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconShieldCheck: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" glowColor="rgba(16,185,129,0.5)" {...props}>
    {(active) => (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <motion.path d="m9 12 2 2 4-4" initial={{ pathLength: 1 }} animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }} transition={{ duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconFlameDanger: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f43f5e" glowColor="rgba(244,63,94,0.5)" {...props}>
    {(active) => (
      <motion.path
        d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
        animate={active ? { scale: [1, 1.1, 0.95, 1], rotate: [0, -3, 3, 0] } : {}}
        transition={{ repeat: Infinity, duration: 0.6 }}
      />
    )}
  </IconWrapper>
);

export const IconBellRing: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#facc15" glowColor="rgba(250,204,21,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [0, -18, 18, -10, 10, 0] } : {}} transition={{ repeat: Infinity, duration: 0.6 }}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconLockKey: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#06b6d4" {...props}>
    {(active) => (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <motion.path d="M7 11V7a5 5 0 0 1 10 0v4" animate={active ? { y: [0, -3, 0] } : {}} transition={{ duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconFingerprint: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#a855f7" {...props}>
    {(active) => (
      <motion.g animate={active ? { opacity: [0.6, 1, 0.6] } : {}} transition={{ repeat: Infinity, duration: 0.8 }}>
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 3" />
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
        <path d="M17.29 21.02c.12-.6.43-2.3.43-3.02 0-2.03-.78-3.41-1.72-4.5" />
        <path d="M2 12a10 10 0 0 1 18-6" />
        <path d="M2 16h.01" />
        <path d="M21.8 16c.2-2 .131-5.354 0-6" />
        <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
        <path d="M8.65 22c.21-.66.45-1.32.57-2" />
        <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconEyeScanner: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#3b82f6" {...props}>
    {(active) => (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <motion.circle cx="12" cy="12" r="3" animate={active ? { scale: [1, 1.4, 0.9, 1] } : {}} transition={{ repeat: Infinity, duration: 0.8 }} />
      </>
    )}
  </IconWrapper>
);

export const IconBugFix: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ef4444" {...props}>
    {(active) => (
      <motion.g animate={active ? { x: [-1, 1, -1] } : {}} transition={{ repeat: Infinity, duration: 0.2 }}>
        <rect width="8" height="14" x="8" y="6" rx="4" />
        <path d="m19 7-3 2" />
        <path d="m5 7 3 2" />
        <path d="m19 19-3-2" />
        <path d="m5 19 3-2" />
        <path d="M20 13h-4" />
        <path d="M4 13h4" />
        <path d="m10 4 1 2" />
        <path d="m14 4-1 2" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconShieldAlert: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f59e0b" {...props}>
    {(active) => (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <motion.path d="M12 8v4" animate={active ? { y: [0, 1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
        <circle cx="12" cy="16" r="0.5" fill="currentColor" />
      </>
    )}
  </IconWrapper>
);

export const IconCpuChip: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#06b6d4" {...props}>
    {(active) => (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <motion.rect x="9" y="9" width="6" height="6" fill={active ? 'currentColor' : 'none'} animate={active ? { scale: [1, 1.1, 1] } : {}} transition={{ repeat: Infinity, duration: 0.5 }} />
        <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
      </>
    )}
  </IconWrapper>
);

// ============================================================================
// 4. ENTERTAINMENT, GAMING & MEDIA (10 ICONS)
// ============================================================================

export const IconGamepad: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#a78bfa" glowColor="rgba(167,139,250,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [0, -4, 4, 0] } : {}} transition={{ repeat: Infinity, duration: 0.6 }}>
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <circle cx="15" cy="13" r="1" fill="currentColor" />
        <circle cx="18" cy="11" r="1" fill="currentColor" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconHeadphones: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#22d3ee" glowColor="rgba(34,211,238,0.5)" {...props}>
    {(active) => (
      <>
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        {active && (
          <>
            <motion.line x1="10" y1="15" x2="10" y2="10" stroke="currentColor" animate={{ y2: [10, 6, 12, 10] }} transition={{ repeat: Infinity, duration: 0.4 }} />
            <motion.line x1="12" y1="16" x2="12" y2="8" stroke="currentColor" animate={{ y2: [8, 14, 6, 8] }} transition={{ repeat: Infinity, duration: 0.45 }} />
            <motion.line x1="14" y1="15" x2="14" y2="11" stroke="currentColor" animate={{ y2: [11, 7, 13, 11] }} transition={{ repeat: Infinity, duration: 0.5 }} />
          </>
        )}
      </>
    )}
  </IconWrapper>
);

export const IconFilmReel: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f59e0b" {...props}>
    {(active) => (
      <motion.g animate={active ? { x: [0, -1, 1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.3 }}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconSparkleStar: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#fde047" glowColor="rgba(253,224,71,0.6)" {...props}>
    {(active) => (
      <motion.path
        d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"
        fill="currentColor"
        animate={active ? { rotate: 180, scale: [1, 1.25, 1] } : { rotate: 0 }}
        transition={{ repeat: active ? Infinity : 0, duration: 1 }}
      />
    )}
  </IconWrapper>
);

export const IconTrophy: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#eab308" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [-2, 0, -2] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconDice: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ec4899" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [0, 90, 180, 270, 360] } : { rotate: 0 }} transition={{ duration: 1, repeat: active ? Infinity : 0 }}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconCamera: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#6366f1" {...props}>
    {(active) => (
      <>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <motion.circle cx="12" cy="13" r="3" animate={active ? { scale: [1, 1.3, 1] } : {}} transition={{ repeat: Infinity, duration: 0.6 }} />
      </>
    )}
  </IconWrapper>
);

export const IconMusicNote: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [-3, 0, -3], rotate: [-4, 4, -4] } : {}} transition={{ repeat: Infinity, duration: 0.6 }}>
        <circle cx="8" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
        <path d="M11 18V6l10-2v12" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconClapperboard: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f43f5e" {...props}>
    {(active) => (
      <>
        <motion.path
          d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z"
          animate={active ? { scale: [1, 1.02, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.4 }}
        />
        <motion.path
          d="m4 11 16-4-1-3L3 8l1 3Z"
          animate={active ? { rotate: [0, -15, 0] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
      </>
    )}
  </IconWrapper>
);

export const IconTvMonitor: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0284c7" {...props}>
    {(active) => (
      <>
        <rect width="20" height="15" x="2" y="7" rx="2" />
        <motion.polyline points="17 2 12 7 7 2" animate={active ? { rotate: [-5, 5, -5] } : {}} transition={{ repeat: Infinity, duration: 0.6 }} />
      </>
    )}
  </IconWrapper>
);

// ============================================================================
// 5. WEATHER, NATURE & SPACE (10 ICONS)
// ============================================================================

export const IconSun: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#fbbf24" glowColor="rgba(251,191,36,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 6, ease: 'linear' }}>
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <path d="M12 2v2M12 20v2m-7.07-15.07 1.41 1.41m12.73 12.73 1.41 1.41M2 12h2m16 0h2m-15.66 5.66-1.41 1.41m12.73-12.73-1.41 1.41" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconMoonStars: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#818cf8" glowColor="rgba(129,140,248,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [-5, 5, -5] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        {active && <motion.path d="M19 3v4M17 5h4" stroke="currentColor" animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ repeat: Infinity, duration: 0.6 }} />}
      </motion.g>
    )}
  </IconWrapper>
);

export const IconCloudRain: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#38bdf8" glowColor="rgba(56,189,248,0.5)" {...props}>
    {(active) => (
      <>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <motion.path d="M16 14v6M8 14v6M12 16v6" stroke="currentColor" animate={active ? { y: [0, 4, 0], opacity: [0.4, 1, 0.4] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconSnowflake: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#67e8f9" glowColor="rgba(103,232,249,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 4, ease: 'linear' }}>
        <path d="M2 12h20M12 2v20m8-4-4-4 4-4M4 8l4 4-4 4m12-12-4 4-4-4m-4 16 4-4 4 4" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconLightningBolt: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#facc15" glowColor="rgba(250,204,21,0.6)" {...props}>
    {(active) => (
      <motion.polygon
        points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
        fill={active ? 'currentColor' : 'none'}
        animate={active ? { scale: [1, 1.15, 0.95, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.3 }}
      />
    )}
  </IconWrapper>
);

export const IconWindBreeze: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#94a3b8" {...props}>
    {(active) => (
      <motion.g animate={active ? { x: [-2, 3, -2] } : {}} transition={{ repeat: Infinity, duration: 0.6 }}>
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconPlanetSaturn: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#c084fc" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [-10, 10, -10] } : {}} transition={{ repeat: Infinity, duration: 1.5 }}>
        <circle cx="12" cy="12" r="6" />
        <path d="M3 15c2.5 2.5 9 3 13.5.5s5.5-6 3.5-7.5" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconCompassRose: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ef4444" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 3, ease: 'linear' }}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconMountainPeak: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <>
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <motion.path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" animate={active ? { y: [0, -1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.5 }} />
      </>
    )}
  </IconWrapper>
);

export const IconLeafEco: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#22c55e" glowColor="rgba(34,197,94,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [-8, 8, -8] } : {}} transition={{ repeat: Infinity, duration: 0.7 }}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </motion.g>
    )}
  </IconWrapper>
);

// ============================================================================
// 6. INTERFACE, CONTROLS & NAVIGATION (10 ICONS)
// ============================================================================

export const IconSearchLens: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="var(--primary)" {...props}>
    {(active) => (
      <>
        <circle cx="11" cy="11" r="8" />
        <motion.path d="m21 21-4.3-4.3" animate={active ? { x: [0, 2, 0], y: [0, 2, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconTrashCan: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ef4444" glowColor="rgba(239,68,68,0.5)" {...props}>
    {(active) => (
      <>
        <motion.path d="M3 6h18" animate={active ? { y: -3, rotate: -8 } : { y: 0, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 10 }} />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </>
    )}
  </IconWrapper>
);

export const IconSettingsCog: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#14b8a6" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: 180 } : { rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconHeartLike: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ec4899" glowColor="rgba(236,72,153,0.6)" {...props}>
    {(active) => (
      <motion.path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        fill={active ? 'currentColor' : 'none'}
        animate={active ? { scale: [1, 1.3, 0.9, 1] } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 10 }}
      />
    )}
  </IconWrapper>
);

export const IconBookmarkPin: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#3b82f6" {...props}>
    {(active) => (
      <motion.path
        d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
        fill={active ? 'currentColor' : 'none'}
        animate={active ? { y: [-2, 0] } : { y: 0 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </IconWrapper>
);

export const IconShareNodes: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#06b6d4" {...props}>
    {(active) => (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <motion.line x1="8.59" y1="13.51" x2="15.42" y2="17.49" animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }} transition={{ duration: 0.4 }} />
        <motion.line x1="15.41" y1="6.51" x2="8.59" y2="10.49" animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }} transition={{ duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconDownloadArrow: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <motion.g animate={active ? { y: [0, 3, 0] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </motion.g>
      </>
    )}
  </IconWrapper>
);

export const IconUploadArrow: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#6366f1" {...props}>
    {(active) => (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <motion.g animate={active ? { y: [0, -3, 0] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </motion.g>
      </>
    )}
  </IconWrapper>
);

export const IconRefreshSync: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0284c7" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 0.8, ease: 'linear' }}>
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconPowerSwitch: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ef4444" glowColor="rgba(239,68,68,0.5)" {...props}>
    {(active) => (
      <>
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <motion.line x1="12" y1="2" x2="12" y2="12" animate={active ? { y2: [12, 10, 12] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

// ============================================================================
// 7. BUSINESS, COMMERCE & FINANCE (10 ICONS)
// ============================================================================

export const IconCreditCard: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#3b82f6" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotateY: [0, 180, 360] } : {}} transition={{ duration: 0.8 }}>
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconWalletMoney: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <>
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <motion.path d="M18 12a2 2 0 0 0 0 4h4v-4z" animate={active ? { x: [-1, 2, -1] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconShoppingCart: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f59e0b" {...props}>
    {(active) => (
      <motion.g animate={active ? { x: [0, 2, 0] } : {}} transition={{ repeat: Infinity, duration: 0.3 }}>
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconShoppingBag: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ec4899" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [-2, 1, -2] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconBankVault: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0284c7" {...props}>
    {(active) => (
      <>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <motion.circle cx="12" cy="12" r="4" animate={active ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} />
        <line x1="12" y1="8" x2="12" y2="12" />
      </>
    )}
  </IconWrapper>
);

export const IconBarChart: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <>
        <line x1="12" y1="20" x2="12" y2="10" />
        <motion.line x1="18" y1="20" x2="18" y2="4" animate={active ? { y2: [4, 8, 4] } : {}} transition={{ repeat: Infinity, duration: 0.6 }} />
        <motion.line x1="6" y1="20" x2="6" y2="14" animate={active ? { y2: [14, 11, 14] } : {}} transition={{ repeat: Infinity, duration: 0.5 }} />
      </>
    )}
  </IconWrapper>
);

export const IconTrendingUp: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#22c55e" glowColor="rgba(34,197,94,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [-2, 0, -2] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconDollarCoin: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#eab308" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotateY: 180 } : { rotateY: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 0.8 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 18V6" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconReceiptBill: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#64748b" {...props}>
    {(active) => (
      <motion.g animate={active ? { y: [-2, 0, -2] } : {}} transition={{ repeat: Infinity, duration: 0.4 }}>
        <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
        <path d="M8 7h8" />
        <path d="M8 12h8" />
        <path d="M8 17h4" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconBriefcase: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#78716c" {...props}>
    {(active) => (
      <>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <motion.path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" animate={active ? { y: [0, -1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

// ============================================================================
// 8. COMMUNICATION & NETWORK (10 ICONS)
// ============================================================================

export const IconMessageChat: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#3b82f6" {...props}>
    {(active) => (
      <motion.path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        animate={active ? { scale: [1, 1.08, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
      />
    )}
  </IconWrapper>
);

export const IconMailEnvelope: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ea580c" {...props}>
    {(active) => (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <motion.path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" animate={active ? { y: [0, -1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconPhoneCall: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#16a34a" {...props}>
    {(active) => (
      <motion.path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        animate={active ? { rotate: [0, -12, 12, -8, 8, 0] } : {}}
        transition={{ repeat: Infinity, duration: 0.6 }}
      />
    )}
  </IconWrapper>
);

export const IconVideoCamera: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#8b5cf6" {...props}>
    {(active) => (
      <>
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
        <motion.polygon points="22 8 16 12 22 16 22 8" animate={active ? { x: [0, 1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.3 }} />
      </>
    )}
  </IconWrapper>
);

export const IconSendPlane: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0284c7" {...props}>
    {(active) => (
      <motion.g animate={active ? { x: [0, 3, 0], y: [0, -3, 0] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconAtSign: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#06b6d4" {...props}>
    {(active) => (
      <>
        <circle cx="12" cy="12" r="4" />
        <motion.path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 3, ease: 'linear' }} />
      </>
    )}
  </IconWrapper>
);

export const IconGlobeWeb: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0ea5e9" glowColor="rgba(14,165,233,0.5)" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 6, ease: 'linear' }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconUserProfile: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#a855f7" {...props}>
    {(active) => (
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <motion.circle cx="12" cy="7" r="4" animate={active ? { y: [-2, 0, -2] } : {}} transition={{ repeat: Infinity, duration: 0.5 }} />
      </>
    )}
  </IconWrapper>
);

export const IconUsersGroup: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#6366f1" {...props}>
    {(active) => (
      <motion.g animate={active ? { scale: [1, 1.05, 1] } : {}} transition={{ repeat: Infinity, duration: 0.5 }}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconThumbsUp: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#3b82f6" {...props}>
    {(active) => (
      <motion.path
        d="M7 10v12M15 10.5a3 3 0 0 0-3-3l-2-5H8v10h11.28a2 2 0 0 1 2 1.7l1.1 7.2A2 2 0 0 1 20.4 23H7"
        animate={active ? { y: [-3, 0, -3] } : {}}
        transition={{ repeat: Infinity, duration: 0.4 }}
      />
    )}
  </IconWrapper>
);

// ============================================================================
// 9. CONTENT & CREATIVE (10 ICONS)
// ============================================================================

export const IconFileText: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0284c7" {...props}>
    {(active) => (
      <>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <motion.line x1="16" y1="13" x2="8" y2="13" animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }} transition={{ duration: 0.4 }} />
        <motion.line x1="16" y1="17" x2="8" y2="17" animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
      </>
    )}
  </IconWrapper>
);

export const IconFolderOpen: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#eab308" {...props}>
    {(active) => (
      <>
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 8 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        <motion.path d="M2 10h20" animate={active ? { y: [0, -1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconEditPencil: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f59e0b" {...props}>
    {(active) => (
      <motion.path
        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
        animate={active ? { rotate: [-10, 10, -10] } : {}}
        transition={{ repeat: Infinity, duration: 0.4 }}
      />
    )}
  </IconWrapper>
);

export const IconCopyClipboard: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <motion.path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" animate={active ? { x: [-1, 0, -1], y: [-1, 0, -1] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconScissorsCut: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f43f5e" {...props}>
    {(active) => (
      <motion.g animate={active ? { scale: [1, 0.9, 1] } : {}} transition={{ repeat: Infinity, duration: 0.3 }}>
        <circle cx="6" cy="6" r="3" />
        <path d="M8.12 8.12 12 12m0 0 6 6m-6-6 6-6" />
        <circle cx="6" cy="18" r="3" />
        <path d="M8.12 15.88 12 12" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconPaperclipAttach: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#64748b" {...props}>
    {(active) => (
      <motion.path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l7.88-7.88"
        animate={active ? { rotate: [-5, 5, -5] } : {}}
        transition={{ repeat: Infinity, duration: 0.6 }}
      />
    )}
  </IconWrapper>
);

export const IconSaveDisk: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#3b82f6" {...props}>
    {(active) => (
      <>
        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <motion.path d="M17 21v-8H7v8" animate={active ? { y: [0, -1, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
        <path d="M7 3v5h8" />
      </>
    )}
  </IconWrapper>
);

export const IconCodeBrackets: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#a855f7" {...props}>
    {(active) => (
      <>
        <motion.polyline points="16 18 22 12 16 6" animate={active ? { x: [0, 2, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
        <motion.polyline points="8 6 2 12 8 18" animate={active ? { x: [0, -2, 0] } : {}} transition={{ repeat: Infinity, duration: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconImagePic: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <>
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <motion.circle cx="9" cy="9" r="2" animate={active ? { scale: [1, 1.25, 1] } : {}} transition={{ repeat: Infinity, duration: 0.5 }} />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </>
    )}
  </IconWrapper>
);

export const IconPaletteColor: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ec4899" {...props}>
    {(active) => (
      <motion.g animate={active ? { rotate: [0, -15, 15, 0] } : {}} transition={{ repeat: Infinity, duration: 0.8 }}>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
      </motion.g>
    )}
  </IconWrapper>
);

// ============================================================================
// 10. TOOLS, SCIENCE & PRODUCTIVITY (10 ICONS)
// ============================================================================

export const IconLightbulbIdea: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#facc15" glowColor="rgba(250,204,21,0.6)" {...props}>
    {(active) => (
      <>
        <motion.path
          d="M9 18h6M10 22h4"
          animate={active ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={{ repeat: Infinity, duration: 0.4 }}
        />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
      </>
    )}
  </IconWrapper>
);

export const IconBatteryCharging: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#22c55e" {...props}>
    {(active) => (
      <>
        <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <motion.path
          d="m11 11-2 2h4l-2 2"
          stroke="currentColor"
          fill={active ? 'currentColor' : 'none'}
          animate={active ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.4 }}
        />
      </>
    )}
  </IconWrapper>
);

export const IconWifiSignal: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#0ea5e9" {...props}>
    {(active) => (
      <>
        <path d="M12 20h.01" />
        <motion.path d="M2 8.82a15 15 0 0 1 20 0" animate={active ? { opacity: [0.2, 1, 0.2] } : {}} transition={{ repeat: Infinity, duration: 0.8 }} />
        <motion.path d="M5 12.859a10 10 0 0 1 14 0" animate={active ? { opacity: [0.2, 1, 0.2] } : {}} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
        <motion.path d="M8.5 16.429a5 5 0 0 1 7 0" animate={active ? { opacity: [0.2, 1, 0.2] } : {}} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
      </>
    )}
  </IconWrapper>
);

export const IconCalendarDate: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#ef4444" {...props}>
    {(active) => (
      <>
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <motion.circle cx="12" cy="15" r="1.5" fill="currentColor" animate={active ? { scale: [1, 1.4, 1] } : {}} transition={{ repeat: Infinity, duration: 0.5 }} />
      </>
    )}
  </IconWrapper>
);

export const IconClockTimer: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#3b82f6" {...props}>
    {(active) => (
      <>
        <circle cx="12" cy="12" r="10" />
        <motion.polyline points="12 6 12 12 16 14" animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 2, ease: 'linear' }} />
      </>
    )}
  </IconWrapper>
);

export const IconGaugeMeter: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#10b981" {...props}>
    {(active) => (
      <>
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        <motion.path d="M12 14v-4" animate={active ? { rotate: [-30, 45, -30] } : {}} transition={{ repeat: Infinity, duration: 0.8 }} />
      </>
    )}
  </IconWrapper>
);

export const IconMagnetPhysics: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#f43f5e" {...props}>
    {(active) => (
      <motion.g animate={active ? { x: [-2, 2, -2] } : {}} transition={{ repeat: Infinity, duration: 0.4 }}>
        <path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15" />
        <path d="m5 8 4 4" />
        <path d="m12 15 4 4" />
      </motion.g>
    )}
  </IconWrapper>
);

export const IconAtomScience: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#a855f7" glowColor="rgba(168,85,247,0.5)" {...props}>
    {(active) => (
      <>
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <motion.ellipse cx="12" cy="12" rx="10" ry="4" animate={active ? { rotate: 360 } : { rotate: 0 }} transition={{ repeat: active ? Infinity : 0, duration: 4, ease: 'linear' }} />
        <motion.ellipse cx="12" cy="12" rx="10" ry="4" animate={active ? { rotate: -360 } : { rotate: 60 }} transition={{ repeat: active ? Infinity : 0, duration: 4, ease: 'linear' }} />
      </>
    )}
  </IconWrapper>
);

export const IconWrenchTool: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#06b6d4" {...props}>
    {(active) => (
      <motion.path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        animate={active ? { rotate: [-15, 15, -15] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
      />
    )}
  </IconWrapper>
);

export const IconAwardBadge: React.FC<IconCustomProps> = (props) => (
  <IconWrapper defaultHoverColor="#eab308" glowColor="rgba(234,179,8,0.5)" {...props}>
    {(active) => (
      <>
        <circle cx="12" cy="8" r="6" />
        <motion.path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" animate={active ? { y: [-1, 1, -1] } : {}} transition={{ repeat: Infinity, duration: 0.5 }} />
      </>
    )}
  </IconWrapper>
);

// ============================================================================
// COMPLETE 100 ANIMATED ICONS REGISTRY
// ============================================================================

export const ALL_ANIMATED_ICONS: IconItemDef[] = [
  // 1. Social & Dev
  { id: 'github', name: 'GitHub', category: 'social', exportName: 'IconGithub', desc: 'Octocat ear wiggle & tail stroke animation', component: IconGithub },
  { id: 'twitter', name: 'X (Twitter)', category: 'social', exportName: 'IconTwitter', desc: '3D Y-axis neon flip & scale', component: IconTwitter },
  { id: 'youtube', name: 'YouTube', category: 'social', exportName: 'IconYoutube', desc: 'Play triangle pulse & neon bloom glow', component: IconYoutube },
  { id: 'linkedin', name: 'LinkedIn', category: 'social', exportName: 'IconLinkedin', desc: 'Letter bounce & dot pop spring physics', component: IconLinkedin },
  { id: 'instagram', name: 'Instagram', category: 'social', exportName: 'IconInstagram', desc: 'Aperture shutter spin & rainbow glow', component: IconInstagram },
  { id: 'discord', name: 'Discord', category: 'social', exportName: 'IconDiscord', desc: 'Game controller wiggle & eye blink', component: IconDiscord },
  { id: 'telegram', name: 'Telegram', category: 'social', exportName: 'IconTelegram', desc: 'Paper plane banking & flight glide', component: IconTelegram },
  { id: 'tiktok', name: 'TikTok', category: 'social', exportName: 'IconTiktok', desc: 'Cyan & Magenta chromatic glitch shift', component: IconTiktok },
  { id: 'facebook', name: 'Facebook', category: 'social', exportName: 'IconFacebook', desc: "3D spring 'f' pop & rotation", component: IconFacebook },
  { id: 'dribbble', name: 'Dribbble', category: 'social', exportName: 'IconDribbble', desc: 'Basketball spinning seams & bounce', component: IconDribbble },

  // 2. Vehicles & Transport
  { id: 'rocket', name: 'Space Rocket', category: 'vehicles', exportName: 'IconRocket', desc: 'Thruster flame flicker & liftoff bounce', component: IconRocket },
  { id: 'plane', name: 'Jet Airplane', category: 'vehicles', exportName: 'IconPlane', desc: 'Aerodynamic banking tilt & flight glide', component: IconPlane },
  { id: 'car', name: 'Electric Car', category: 'vehicles', exportName: 'IconCar', desc: 'Suspension bounce & spinning wheel rims', component: IconCar },
  { id: 'bicycle', name: 'Road Bicycle', category: 'vehicles', exportName: 'IconBicycle', desc: 'Dual spinning spokes & pedal glide', component: IconBicycle },
  { id: 'train', name: 'High-Speed Train', category: 'vehicles', exportName: 'IconTrain', desc: 'Horizontal track sway & headlight shine', component: IconTrain },
  { id: 'ship', name: 'Cruise Ship', category: 'vehicles', exportName: 'IconShip', desc: 'Wave rolling pitch & ocean rocking', component: IconShip },
  { id: 'helicopter', name: 'Helicopter', category: 'vehicles', exportName: 'IconHelicopter', desc: 'Fast rotor blade spinning blur', component: IconHelicopter },
  { id: 'truck', name: 'Cargo Truck', category: 'vehicles', exportName: 'IconTruck', desc: 'Heavy transport chassis suspension bounce', component: IconTruck },
  { id: 'drone', name: 'Quadcopter Drone', category: 'vehicles', exportName: 'IconDrone', desc: 'Quad-propeller rotation & hover stabilization', component: IconDrone },
  { id: 'scooter', name: 'City Scooter', category: 'vehicles', exportName: 'IconScooter', desc: 'Forward glide roll & wheel spin', component: IconScooter },

  // 3. Warning & Security
  { id: 'alert-triangle', name: 'Hazard Alert', category: 'warning', exportName: 'IconAlertTriangle', desc: 'Warning vibration shake & pulsating exclamation', component: IconAlertTriangle },
  { id: 'shield-check', name: 'Shield Verified', category: 'warning', exportName: 'IconShieldCheck', desc: 'Emerald verified glow & checkmark path draw', component: IconShieldCheck },
  { id: 'flame-danger', name: 'Danger Flame', category: 'warning', exportName: 'IconFlameDanger', desc: 'Dancing multi-layer flame tongues & heat bloom', component: IconFlameDanger },
  { id: 'bell-ring', name: 'Notification Bell', category: 'warning', exportName: 'IconBellRing', desc: 'Pendulum bell swing & soundwave ring', component: IconBellRing },
  { id: 'lock-key', name: 'Secure Lock', category: 'warning', exportName: 'IconLockKey', desc: 'Padlock shackle snap-down and unlock spring', component: IconLockKey },
  { id: 'fingerprint', name: 'Fingerprint Scan', category: 'warning', exportName: 'IconFingerprint', desc: 'Biometric scanning laser pulse wave', component: IconFingerprint },
  { id: 'eye-scanner', name: 'Retina Scanner', category: 'warning', exportName: 'IconEyeScanner', desc: 'Iris pupil dilation & focus tracking', component: IconEyeScanner },
  { id: 'bug-fix', name: 'Bug Detector', category: 'warning', exportName: 'IconBugFix', desc: 'Debugging antennae twitch & crawling shake', component: IconBugFix },
  { id: 'shield-alert', name: 'Shield Warning', category: 'warning', exportName: 'IconShieldAlert', desc: 'Security breach exclamation flash', component: IconShieldAlert },
  { id: 'cpu-chip', name: 'Microprocessor', category: 'warning', exportName: 'IconCpuChip', desc: 'Silicon core logic pulse & bus line shine', component: IconCpuChip },

  // 4. Entertainment & Gaming
  { id: 'gamepad', name: 'Console Gamepad', category: 'entertainment', exportName: 'IconGamepad', desc: 'Tactile directional press & button pop', component: IconGamepad },
  { id: 'headphones', name: 'Audio Headphones', category: 'entertainment', exportName: 'IconHeadphones', desc: 'Dynamic sound equalizer wave bars bouncing', component: IconHeadphones },
  { id: 'film-reel', name: 'Cinema Film Reel', category: 'entertainment', exportName: 'IconFilmReel', desc: 'Film frame step rotation & projector rays', component: IconFilmReel },
  { id: 'sparkle-star', name: 'Magic Sparkle', category: 'entertainment', exportName: 'IconSparkleStar', desc: '180° Twinkle star rotation & golden aura', component: IconSparkleStar },
  { id: 'trophy', name: 'Victory Trophy', category: 'entertainment', exportName: 'IconTrophy', desc: 'Champion cup shine & floating celebratory bounce', component: IconTrophy },
  { id: 'dice', name: 'Rolling Dice', category: 'entertainment', exportName: 'IconDice', desc: 'Tumbling 360° spin & chance roll', component: IconDice },
  { id: 'camera', name: 'Photo Camera', category: 'entertainment', exportName: 'IconCamera', desc: 'Aperture focus click & shutter snap', component: IconCamera },
  { id: 'music-note', name: 'Music Melody', category: 'entertainment', exportName: 'IconMusicNote', desc: 'Rhythmic note bounce & pitch vibration', component: IconMusicNote },
  { id: 'clapperboard', name: 'Film Clapper', category: 'entertainment', exportName: 'IconClapperboard', desc: 'Directorial scene clap & snap board', component: IconClapperboard },
  { id: 'tv-monitor', name: 'Retro Television', category: 'entertainment', exportName: 'IconTvMonitor', desc: 'Antenna reception wiggle & screen glow', component: IconTvMonitor },

  // 5. Weather & Nature
  { id: 'sun', name: 'Sun Radiance', category: 'weather', exportName: 'IconSun', desc: 'Rotating solar corona & golden flare bloom', component: IconSun },
  { id: 'moon-stars', name: 'Crescent Moon', category: 'weather', exportName: 'IconMoonStars', desc: 'Floating night rock & star twinkle animation', component: IconMoonStars },
  { id: 'cloud-rain', name: 'Rain Cloud', category: 'weather', exportName: 'IconCloudRain', desc: 'Drifting cloud & falling rain droplet particles', component: IconCloudRain },
  { id: 'snowflake', name: 'Ice Snowflake', category: 'weather', exportName: 'IconSnowflake', desc: '360° Rotating crystal & frost cyan aura', component: IconSnowflake },
  { id: 'lightning-bolt', name: 'Electric Spark', category: 'weather', exportName: 'IconLightningBolt', desc: 'High-voltage lightning strike flash', component: IconLightningBolt },
  { id: 'wind-breeze', name: 'Wind Breeze', category: 'weather', exportName: 'IconWindBreeze', desc: 'Flowing aero wind stream gusts', component: IconWindBreeze },
  { id: 'planet-saturn', name: 'Saturn Planet', category: 'weather', exportName: 'IconPlanetSaturn', desc: 'Planetary orbital ring tilt & celestial sway', component: IconPlanetSaturn },
  { id: 'compass-rose', name: 'Compass Rose', category: 'weather', exportName: 'IconCompassRose', desc: 'Magnetic needle navigation calibration', component: IconCompassRose },
  { id: 'mountain-peak', name: 'Mountain Alpine', category: 'weather', exportName: 'IconMountainPeak', desc: 'Mountain range elevation & valley shimmer', component: IconMountainPeak },
  { id: 'leaf-eco', name: 'Ecology Leaf', category: 'weather', exportName: 'IconLeafEco', desc: 'Organic plant stem flutter & green bloom', component: IconLeafEco },

  // 6. Interface & Controls
  { id: 'search', name: 'Focal Search', category: 'interface', exportName: 'IconSearchLens', desc: 'Lens angle wiggle & center focal laser', component: IconSearchLens },
  { id: 'trash', name: 'Recycle Trash', category: 'interface', exportName: 'IconTrashCan', desc: 'Spring flip lid opening & deletion shake', component: IconTrashCan },
  { id: 'settings-gear', name: 'Settings Cog', category: 'interface', exportName: 'IconSettingsCog', desc: 'Mechanical gear cog rotation & teal bloom', component: IconSettingsCog },
  { id: 'heart', name: 'Like Heart', category: 'interface', exportName: 'IconHeartLike', desc: 'Popping spring scale-up & fill bounce burst', component: IconHeartLike },
  { id: 'bookmark-pin', name: 'Save Bookmark', category: 'interface', exportName: 'IconBookmarkPin', desc: 'Ribbon bookmark tuck-in spring animation', component: IconBookmarkPin },
  { id: 'share-nodes', name: 'Share Network', category: 'interface', exportName: 'IconShareNodes', desc: 'Node interconnect line drawing animation', component: IconShareNodes },
  { id: 'download-arrow', name: 'File Download', category: 'interface', exportName: 'IconDownloadArrow', desc: 'Downward download trajectory arrow slide', component: IconDownloadArrow },
  { id: 'upload-arrow', name: 'Cloud Upload', category: 'interface', exportName: 'IconUploadArrow', desc: 'Upward upload trajectory arrow slide', component: IconUploadArrow },
  { id: 'refresh-sync', name: 'Sync Refresh', category: 'interface', exportName: 'IconRefreshSync', desc: 'Continuous 360° synchronization spin', component: IconRefreshSync },
  { id: 'power-switch', name: 'Power Switch', category: 'interface', exportName: 'IconPowerSwitch', desc: 'App shutdown & restart toggle switch', component: IconPowerSwitch },

  // 7. Business & Finance
  { id: 'credit-card', name: 'Credit Card', category: 'business', exportName: 'IconCreditCard', desc: 'Contactless payment 3D card flip', component: IconCreditCard },
  { id: 'wallet-money', name: 'Cash Wallet', category: 'business', exportName: 'IconWalletMoney', desc: 'Pocket bill slide & leather wallet opening', component: IconWalletMoney },
  { id: 'shopping-cart', name: 'Shopping Cart', category: 'business', exportName: 'IconShoppingCart', desc: 'Retail cart wheel roll & bounce forward', component: IconShoppingCart },
  { id: 'shopping-bag', name: 'Boutique Bag', category: 'business', exportName: 'IconShoppingBag', desc: 'Gift bag handle spring and celebration swing', component: IconShoppingBag },
  { id: 'bank-vault', name: 'Bank Vault', category: 'business', exportName: 'IconBankVault', desc: 'Heavy safe wheel dial rotation', component: IconBankVault },
  { id: 'bar-chart', name: 'Analytics Bars', category: 'business', exportName: 'IconBarChart', desc: 'Dynamic data bar height interpolation', component: IconBarChart },
  { id: 'trending-up', name: 'Growth Market', category: 'business', exportName: 'IconTrendingUp', desc: 'Bullish stock chart trend arrow ascent', component: IconTrendingUp },
  { id: 'dollar-coin', name: 'Gold Coin', category: 'business', exportName: 'IconDollarCoin', desc: 'Spinning currency coin edge rotation', component: IconDollarCoin },
  { id: 'receipt-bill', name: 'Tax Invoice', category: 'business', exportName: 'IconReceiptBill', desc: 'Printing register tape scroll slide', component: IconReceiptBill },
  { id: 'briefcase', name: 'Executive Case', category: 'business', exportName: 'IconBriefcase', desc: 'Business portfolio latch snap & elevation', component: IconBriefcase },

  // 8. Communication & Network
  { id: 'message-chat', name: 'Chat Bubble', category: 'communication', exportName: 'IconMessageChat', desc: 'Instant message pop & talk bubble bounce', component: IconMessageChat },
  { id: 'mail-envelope', name: 'Email Envelope', category: 'communication', exportName: 'IconMailEnvelope', desc: 'Letter flap opening & correspondence slide', component: IconMailEnvelope },
  { id: 'phone-call', name: 'Telephone Call', category: 'communication', exportName: 'IconPhoneCall', desc: 'Handset vibration ring & urgent call shake', component: IconPhoneCall },
  { id: 'video-camera', name: 'Live Stream', category: 'communication', exportName: 'IconVideoCamera', desc: 'Webcam lens flash & broadcast recording', component: IconVideoCamera },
  { id: 'send-plane', name: 'Dispatch Arrow', category: 'communication', exportName: 'IconSendPlane', desc: 'Message send glide & paper flight', component: IconSendPlane },
  { id: 'at-sign', name: 'User Mention', category: 'communication', exportName: 'IconAtSign', desc: 'Email address handle 360° spin', component: IconAtSign },
  { id: 'globe-web', name: 'Worldwide Web', category: 'communication', exportName: 'IconGlobeWeb', desc: 'Global longitude & latitude sphere spin', component: IconGlobeWeb },
  { id: 'user-profile', name: 'Member Profile', category: 'communication', exportName: 'IconUserProfile', desc: 'Avatar head bob & account status check', component: IconUserProfile },
  { id: 'users-group', name: 'Team Crew', category: 'communication', exportName: 'IconUsersGroup', desc: 'Collaborative team member assembly bounce', component: IconUsersGroup },
  { id: 'thumbs-up', name: 'Thumbs Up', category: 'communication', exportName: 'IconThumbsUp', desc: 'Approval reaction praise lift & snap', component: IconThumbsUp },

  // 9. Content & Creative
  { id: 'file-text', name: 'Document Sheet', category: 'content', exportName: 'IconFileText', desc: 'Document line writing path drawing', component: IconFileText },
  { id: 'folder-open', name: 'Directory Folder', category: 'content', exportName: 'IconFolderOpen', desc: 'File system tab expand & drawer reveal', component: IconFolderOpen },
  { id: 'edit-pencil', name: 'Drafting Pencil', category: 'content', exportName: 'IconEditPencil', desc: 'Creative sketch tip drawing oscillation', component: IconEditPencil },
  { id: 'copy-clipboard', name: 'Copy Clipboard', category: 'content', exportName: 'IconCopyClipboard', desc: 'Dual layer clipboard copy snap offset', component: IconCopyClipboard },
  { id: 'scissors-cut', name: 'Scissors Snip', category: 'content', exportName: 'IconScissorsCut', desc: 'Blade snip motion & paper slicing', component: IconScissorsCut },
  { id: 'paperclip-attach', name: 'Paperclip Pin', category: 'content', exportName: 'IconPaperclipAttach', desc: 'Document attachment wire rotation', component: IconPaperclipAttach },
  { id: 'save-disk', name: 'Floppy Save', category: 'content', exportName: 'IconSaveDisk', desc: 'Local storage shutter slide & commit', component: IconSaveDisk },
  { id: 'code-brackets', name: 'Code Syntax', category: 'content', exportName: 'IconCodeBrackets', desc: 'Opening and closing bracket expansion slide', component: IconCodeBrackets },
  { id: 'image-pic', name: 'Gallery Picture', category: 'content', exportName: 'IconImagePic', desc: 'Artwork landscape sun pop & mountain reveal', component: IconImagePic },
  { id: 'palette-color', name: 'Artist Palette', category: 'content', exportName: 'IconPaletteColor', desc: 'Pigment mixing swatch circular wobble', component: IconPaletteColor },

  // 10. Tools & Productivity
  { id: 'lightbulb-idea', name: 'Idea Lightbulb', category: 'tools', exportName: 'IconLightbulbIdea', desc: 'Invention filament glow & radiant eureka pulse', component: IconLightbulbIdea },
  { id: 'battery-charging', name: 'Charging Battery', category: 'tools', exportName: 'IconBatteryCharging', desc: 'Energy accumulator power lightning surge', component: IconBatteryCharging },
  { id: 'wifi-signal', name: 'Wireless Radar', category: 'tools', exportName: 'IconWifiSignal', desc: 'Broadcast ripple concentric wave expansion', component: IconWifiSignal },
  { id: 'calendar-date', name: 'Event Calendar', category: 'tools', exportName: 'IconCalendarDate', desc: 'Day schedule marker focus pulse', component: IconCalendarDate },
  { id: 'clock-timer', name: 'Precision Clock', category: 'tools', exportName: 'IconClockTimer', desc: 'Chronometer second hand sweep rotation', component: IconClockTimer },
  { id: 'gauge-meter', name: 'Speedometer', category: 'tools', exportName: 'IconGaugeMeter', desc: 'Performance tachometer needle revving', component: IconGaugeMeter },
  { id: 'magnet-physics', name: 'Attraction Magnet', category: 'tools', exportName: 'IconMagnetPhysics', desc: 'Electromagnetic field pull & snap attraction', component: IconMagnetPhysics },
  { id: 'atom-science', name: 'Atomic Orbit', category: 'tools', exportName: 'IconAtomScience', desc: 'Subatomic particle multi-axis orbital dance', component: IconAtomScience },
  { id: 'wrench-tool', name: 'Mechanic Wrench', category: 'tools', exportName: 'IconWrenchTool', desc: 'Bolt tightening torque leverage rotation', component: IconWrenchTool },
  { id: 'award-badge', name: 'Medal Honor', category: 'tools', exportName: 'IconAwardBadge', desc: 'Prestige star ribbon celebratory sway', component: IconAwardBadge },
];
