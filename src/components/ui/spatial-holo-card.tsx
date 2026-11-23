import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { playUiSound } from '@/lib/sound-effects';

export type HoloStyle = 'prism' | 'cyber' | 'aurora' | 'obsidian';

export interface SpatialHoloCardProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  style?: HoloStyle;
  children?: React.ReactNode;
  className?: string;
}

export const SpatialHoloCard: React.FC<SpatialHoloCardProps> = ({
  title = 'Spatial Holographic UI 2.0',
  subtitle = 'Interactive 3D iridescent surface with spatial prismatic refraction',
  badge = 'v2.0.0 Core',
  style = 'prism',
  children,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeStyle, setActiveStyle] = useState<HoloStyle>(style);
  const [copied, setCopied] = useState(false);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Calculate 3D tilt
  const rotateX = useTransform(smoothMouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-15, 15]);

  // Sheen light position percentages
  const sheenX = useTransform(smoothMouseX, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(smoothMouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const copyCode = () => {
    const code = `<SpatialHoloCard
  title="${title}"
  subtitle="${subtitle}"
  style="${activeStyle}"
  badge="Doni 2.0"
/>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    playUiSound('success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`perspective-1000 select-none ${className}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-md rounded-3xl border border-white/20 bg-card/60 backdrop-blur-2xl p-7 shadow-2xl transition-shadow duration-300 hover:shadow-cyan-500/20 overflow-hidden"
      >
        {/* Prismatic Holographic Sheen Layer */}
        {activeStyle === 'prism' && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.4) 0%, rgba(6,182,212,0.2) 25%, rgba(168,85,247,0.2) 50%, rgba(236,72,153,0.15) 75%, transparent 100%)`,
            }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 opacity-90"
          />
        )}

        {/* Cyber Grid Sheen */}
        {activeStyle === 'cyber' && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(6,182,212,0.5) 0%, transparent 60%)`,
            }}
            className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#06b6d415_1px,transparent_1px),linear-gradient(to_bottom,#06b6d415_1px,transparent_1px)] bg-[size:16px_16px]"
          />
        )}

        {/* Aurora Sheen */}
        {activeStyle === 'aurora' && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(16,185,129,0.3) 0%, rgba(6,182,212,0.2) 40%, rgba(139,92,246,0.2) 80%, transparent 100%)`,
            }}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
          />
        )}

        {/* Obsidian Glass Sheen */}
        {activeStyle === 'obsidian' && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.25) 0%, transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none bg-black/40"
          />
        )}

        {/* Specular Diagonal Shimmer Glare */}
        <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />

        {/* Card Content with 3D Depth Elevation */}
        <div style={{ transform: 'translateZ(30px)' }} className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4" />
              </div>
              <Badge variant="glow" className="text-[10px] uppercase font-mono">
                {badge}
              </Badge>
            </div>

            <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/50 text-[10px]">
              {(['prism', 'cyber', 'aurora', 'obsidian'] as HoloStyle[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setActiveStyle(s);
                    playUiSound('switch');
                  }}
                  className={`px-2 py-0.5 rounded-lg capitalize transition-all cursor-pointer ${
                    activeStyle === s
                      ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">{subtitle}</p>
          </div>

          {children}

          <div className="pt-2 flex items-center justify-between border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={copyCode}
              className="h-7 text-[11px] gap-1.5"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy JSX'}
            </Button>

            <span className="text-[10px] font-mono text-muted-foreground">Spatial Tilt ±15°</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
