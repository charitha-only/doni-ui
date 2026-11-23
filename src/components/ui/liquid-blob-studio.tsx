import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Waves,
  Sparkles,
  Copy,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Slider } from './slider';
import { playUiSound } from '@/lib/sound-effects';

export const LiquidBlobStudio: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pointsCount, setPointsCount] = useState([6]);
  const [growth, setGrowth] = useState([6]);
  const [speed, setSpeed] = useState([4]);
  const [color1, setColor1] = useState('#06b6d4');
  const [color2, setColor2] = useState('#8b5cf6');
  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(1);

  // Generate smooth cubic bezier SVG blob path
  const blobPath = useMemo(() => {
    const numPoints = pointsCount[0];
    const size = 300;
    const center = size / 2;
    const baseRadius = 90;
    const variance = growth[0] * 4;

    const angleStep = (Math.PI * 2) / numPoints;
    const rads: number[] = [];

    // Simple deterministic pseudo-random variation based on seed
    for (let i = 0; i < numPoints; i++) {
      const pseudoRand = Math.sin(seed * 10 + i * 2.5);
      rads.push(baseRadius + pseudoRand * variance);
    }

    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < numPoints; i++) {
      const a = i * angleStep;
      points.push({
        x: center + Math.cos(a) * rads[i],
        y: center + Math.sin(a) * rads[i],
      });
    }

    // Connect with smooth cubic beziers
    let d = `M ${points[0].x},${points[0].y} `;
    for (let i = 0; i < numPoints; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % numPoints];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      d += `Q ${p1.x},${p1.y} ${midX},${midY} `;
    }
    d += 'Z';
    return d;
  }, [pointsCount, growth, seed]);

  const copySvg = () => {
    const snippet = `<!-- Doni UI Liquid Organic SVG Blob -->
<svg viewBox="0 0 300 300" className="w-64 h-64 filter drop-shadow-[0_10px_20px_rgba(6,182,212,0.3)]">
  <defs>
    <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="${color1}" />
      <stop offset="100%" stopColor="${color2}" />
    </linearGradient>
  </defs>
  <path d="${blobPath}" fill="url(#blobGrad)" />
</svg>`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    playUiSound('success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          playUiSound('tab');
        }}
        className="fixed bottom-6 left-[565px] z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open Liquid Blob Studio (v2.1.0)"
      >
        <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="hidden sm:inline">Blob Lab</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v2.1.0</Badge>
      </button>

      {/* Modal Studio */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/60 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 flex items-center justify-center shadow-glow">
                    <Waves className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">Liquid Blob &amp; Morph Engine</h3>
                      <Badge variant="glow" className="text-[10px]">v2.1.0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Procedural organic spline curves &amp; animated vector liquid gradients</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Live Morph Stage */}
                <div className="relative min-h-[240px] rounded-2xl border border-border/80 bg-gradient-to-b from-card/80 to-card/40 flex items-center justify-center p-6 overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(#80808018_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Animated Morphing SVG Blob */}
                  <motion.svg
                    viewBox="0 0 300 300"
                    animate={{
                      scale: [1, 1.06, 0.96, 1],
                      rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                      duration: speed[0],
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-56 h-56 filter drop-shadow-[0_15px_30px_rgba(6,182,212,0.35)] cursor-pointer"
                    onClick={() => {
                      setSeed((s) => s + 1);
                      playUiSound('pop');
                    }}
                  >
                    <defs>
                      <linearGradient id="liveBlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={color1} />
                        <stop offset="100%" stopColor={color2} />
                      </linearGradient>
                    </defs>
                    <path d={blobPath} fill="url(#liveBlobGrad)" />
                  </motion.svg>

                  <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Click Blob to Mutate Seed ({seed})</span>
                  </div>

                  <div className="absolute top-2 right-2">
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={() => {
                        setSeed((s) => s + 1);
                        playUiSound('pop');
                      }}
                      className="h-7 text-xs"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" /> Mutate
                    </Button>
                  </div>
                </div>

                {/* Color Scheme Quick Swatches */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground font-semibold">Gradients:</span>
                  {[
                    { label: 'Cyber Cyan', c1: '#06b6d4', c2: '#3b82f6' },
                    { label: 'Sunset Glow', c1: '#f43f5e', c2: '#fb923c' },
                    { label: 'Neon Mint', c1: '#10b981', c2: '#06b6d4' },
                    { label: 'Deep Magenta', c1: '#ec4899', c2: '#8b5cf6' },
                  ].map((g) => (
                    <button
                      key={g.label}
                      type="button"
                      onClick={() => {
                        setColor1(g.c1);
                        setColor2(g.c2);
                        playUiSound('switch');
                      }}
                      className="px-2.5 py-1 rounded-lg border border-border/60 hover:border-primary/60 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 bg-muted/20"
                    >
                      <div className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(to right, ${g.c1}, ${g.c2})` }} />
                      <span>{g.label}</span>
                    </button>
                  ))}
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Vertices */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Spline Vertices</span>
                      <span className="font-mono text-primary font-bold">{pointsCount[0]} pts</span>
                    </div>
                    <Slider value={pointsCount} onValueChange={setPointsCount} min={3} max={10} step={1} />
                  </div>

                  {/* Complexity / Irregularity */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Irregularity</span>
                      <span className="font-mono text-primary font-bold">{growth[0]}x</span>
                    </div>
                    <Slider value={growth} onValueChange={setGrowth} min={2} max={10} step={1} />
                  </div>

                  {/* Morph Speed */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Wave Cycle</span>
                      <span className="font-mono text-primary font-bold">{speed[0]}s</span>
                    </div>
                    <Slider value={speed} onValueChange={setSpeed} min={1} max={8} step={0.5} />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/60 bg-muted/30 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copySvg}
                  className="gap-1.5 text-xs h-8"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'SVG Copied!' : 'Copy SVG Path'}
                </Button>

                <Button
                  variant="glow"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-xs h-8 px-4"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
