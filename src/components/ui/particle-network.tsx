import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  X,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Slider } from './slider';
import { playUiSound } from '@/lib/sound-effects';

export const ParticleNetwork: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [particleCount, setParticleCount] = useState([45]);
  const [linkDistance, setLinkDistance] = useState([110]);
  const [speed, setSpeed] = useState([1.5]);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Canvas Particle Simulation Engine
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    const height = (canvas.height = 240);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const particles: Particle[] = [];
    const count = particleCount[0];
    const maxDist = linkDistance[0];
    const spd = speed[0];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * spd,
        vy: (Math.random() - 0.5) * spd,
        radius: Math.random() * 1.5 + 1.5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction/repulsion
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            p.x -= (dx / dist) * 1.2;
            p.y -= (dy / dist) * 1.2;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, particleCount, linkDistance, speed]);

  const copyComponentCode = () => {
    const snippet = `// Doni UI Neural Particle Network Component
import React, { useEffect, useRef } from 'react';

export function ParticleNetwork({ count = ${particleCount[0]}, linkDistance = ${linkDistance[0]} }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 300);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * ${speed[0]},
      vy: (Math.random() - 0.5) * ${speed[0]},
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x = (p.x + p.vx + width) % width;
        p.y = (p.y + p.vy + height) % height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = \`rgba(6, 182, 212, \${1 - dist / linkDistance})\`;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [count, linkDistance]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}`;
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
        className="fixed bottom-6 left-[1130px] z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open Interactive Particle Network Studio (v2.6.0)"
      >
        <Share2 className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="hidden sm:inline">Constellation</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v2.6.0</Badge>
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
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">Neural Constellation &amp; Particle Network</h3>
                      <Badge variant="glow" className="text-[10px]">v2.6.0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Interactive distance-linked nodes with cursor repulsion physics</p>
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
                {/* Live Canvas Simulation */}
                <div
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                  }}
                  onMouseLeave={() => {
                    mouseRef.current = { x: null, y: null };
                  }}
                  className="relative h-60 rounded-2xl border border-border/80 bg-gradient-to-b from-card/80 to-card/40 flex items-center justify-center overflow-hidden shadow-inner cursor-crosshair"
                >
                  <canvas ref={canvasRef} className="w-full h-full block" />

                  <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono pointer-events-none">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Move cursor over canvas to repel nodes</span>
                  </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Node Count */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Particle Nodes</span>
                      <span className="font-mono text-primary font-bold">{particleCount[0]}</span>
                    </div>
                    <Slider value={particleCount} onValueChange={setParticleCount} min={20} max={100} step={5} />
                  </div>

                  {/* Link Distance */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Link Distance</span>
                      <span className="font-mono text-primary font-bold">{linkDistance[0]} px</span>
                    </div>
                    <Slider value={linkDistance} onValueChange={setLinkDistance} min={60} max={160} step={5} />
                  </div>

                  {/* Velocity */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Drift Velocity</span>
                      <span className="font-mono text-primary font-bold">{speed[0]}x</span>
                    </div>
                    <Slider value={speed} onValueChange={setSpeed} min={0.5} max={3.5} step={0.2} />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/60 bg-muted/30 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyComponentCode}
                  className="gap-1.5 text-xs h-8"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Component Copied!' : 'Export React Component'}
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
