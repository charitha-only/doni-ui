import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Transition } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert Hex color (#8b5cf6) to HSL string for Tailwind CSS variables (e.g. "258 90% 66%")
export function hexToHsl(hex: string): { h: number; s: number; l: number; str: string } {
  let c = hex.replace(/^#/, '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h = h / 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return {
    h: hDeg,
    s: sPct,
    l: lPct,
    str: `${hDeg} ${sPct}% ${lPct}%`,
  };
}

// Framer motion spring transitions for ultra-snappy and satisfying UI feel
export const transitions: {
  springSnappy: Transition;
  springBouncy: Transition;
  springGentle: Transition;
  smoothEase: Transition;
} = {
  springSnappy: { type: 'spring', stiffness: 450, damping: 25 },
  springBouncy: { type: 'spring', stiffness: 350, damping: 15 },
  springGentle: { type: 'spring', stiffness: 200, damping: 20 },
  smoothEase: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
};
