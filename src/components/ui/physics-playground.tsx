import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Copy,
  Check,
  Sparkles,
  Zap,
  Play,
  X,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Slider } from './slider';
import { Switch } from './switch';
import { playUiSound } from '@/lib/sound-effects';

export interface SpringPhysicsConfig {
  stiffness: number;
  damping: number;
  mass: number;
  velocity?: number;
}

export const DONI_SPRING_PRESETS: Record<string, { label: string; desc: string; config: SpringPhysicsConfig }> = {
  snappy: {
    label: 'Doni Snappy',
    desc: 'Instant tactile micro-clicks & dropdowns',
    config: { stiffness: 420, damping: 30, mass: 0.8 },
  },
  bouncy: {
    label: 'Hyper Bouncy',
    desc: 'Playful gamified reward buttons & confetti',
    config: { stiffness: 480, damping: 14, mass: 1 },
  },
  gentle: {
    label: 'Velvet Gentle',
    desc: 'Smooth modal entrances & drawer slides',
    config: { stiffness: 140, damping: 18, mass: 1 },
  },
  wobbly: {
    label: 'Liquid Wobbly',
    desc: 'Elastic fluid jelly effect',
    config: { stiffness: 280, damping: 9, mass: 1.2 },
  },
};

export const PhysicsPlayground: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stiffness, setStiffness] = useState([420]);
  const [damping, setDamping] = useState([26]);
  const [mass, setMass] = useState([1]);
  const [hapticShake, setHapticShake] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [impulseKey, setImpulseKey] = useState(0);

  // Compute Spring Curve Points for the SVG Waveform
  const curvePoints = useMemo(() => {
    const k = stiffness[0];
    const c = damping[0];
    const m = mass[0];
    const omega0 = Math.sqrt(k / m);
    const gamma = c / (2 * m);
    const omegaD = Math.sqrt(Math.max(0.1, omega0 * omega0 - gamma * gamma));

    const points: string[] = [];
    const steps = 60;
    const width = 360;
    const height = 90;
    const midY = height / 2;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 1.5; // 0 to 1.5s
      const yVal = Math.exp(-gamma * t) * Math.cos(omegaD * t);
      const x = (i / steps) * width;
      const y = midY - yVal * (midY - 10);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  }, [stiffness, damping, mass]);

  const handleApplyPreset = (key: string) => {
    const p = DONI_SPRING_PRESETS[key];
    if (p) {
      setStiffness([p.config.stiffness]);
      setDamping([p.config.damping]);
      setMass([p.config.mass]);
      playUiSound('switch');
      triggerImpulse();
    }
  };

  const triggerImpulse = () => {
    setImpulseKey((k) => k + 1);
    playUiSound('pop');
    if (hapticShake) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 240);
    }
  };

  const copyCode = () => {
    const snippet = `// Doni UI Spring Physics Configuration
export const customSpring = {
  type: 'spring',
  stiffness: ${stiffness[0]},
  damping: ${damping[0]},
  mass: ${mass[0]},
};

// Usage in Framer Motion:
// <motion.div animate={{ scale: 1 }} transition={customSpring} />`;
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
        className="fixed bottom-6 left-28 z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open Spring Physics Playground (v1.6.0)"
      >
        <Activity className="w-4 h-4 text-primary animate-pulse" />
        <span className="hidden sm:inline">Physics Lab</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v1.6.0</Badge>
      </button>

      {/* Modal Studio */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: isShaking ? [0, -4, 4, -3, 3, 0] : 0,
              }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/60 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-glow">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">Spring Physics Lab</h3>
                      <Badge variant="glow" className="text-[10px]">v1.6.0 Live</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Tweak spring harmonic oscillators & simulate micro-interactions</p>
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

              {/* Main Body */}
              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Presets */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                    Doni Spring Curve Presets
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(DONI_SPRING_PRESETS).map(([key, item]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleApplyPreset(key)}
                        className="p-2.5 rounded-xl border border-border/60 hover:border-primary/60 hover:bg-primary/5 transition-all text-left cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Interactive Physics Stage */}
                <div className="relative h-44 rounded-xl border border-border/80 bg-gradient-to-b from-card/60 to-card/20 flex items-center justify-center overflow-hidden shadow-inner p-4">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Interactive draggable spring disc */}
                  <motion.div
                    key={impulseKey}
                    drag
                    dragConstraints={{ left: -140, right: 140, top: -50, bottom: 50 }}
                    dragElastic={0.2}
                    whileHover={{ scale: 1.05 }}
                    whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
                    initial={{ scale: 0.4, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: stiffness[0],
                      damping: damping[0],
                      mass: mass[0],
                    }}
                    onDragEnd={() => playUiSound('pop')}
                    className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary via-cyan-400 to-indigo-500 shadow-glow flex flex-col items-center justify-center text-primary-foreground font-bold text-xs cursor-grab select-none p-2 text-center"
                  >
                    <Sparkles className="w-5 h-5 mb-1" />
                    <span>Drag &amp; Toss</span>
                    <span className="text-[9px] opacity-80 font-mono">Elastic Physics</span>
                  </motion.div>

                  <div className="absolute bottom-2 left-3 text-[10px] text-muted-foreground font-mono">
                    Stiffness: {stiffness[0]} | Damping: {damping[0]} | Mass: {mass[0]}
                  </div>

                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={triggerImpulse}
                      className="h-7 px-2.5 text-[11px]"
                    >
                      <Play className="w-3 h-3 mr-1" /> Test Impulse
                    </Button>
                  </div>
                </div>

                {/* SVG Harmonic Oscillator Waveform */}
                <div className="p-3.5 rounded-xl border border-border/60 bg-muted/30 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      <span>Damped Harmonic Curve:</span>
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">e^(-γt) · cos(ωt)</span>
                  </div>
                  <div className="w-full h-16 flex items-center justify-center overflow-hidden">
                    <svg viewBox="0 0 360 90" className="w-full h-full stroke-primary fill-none">
                      <path
                        d={`M 0,45 L ${curvePoints}`}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line x1="0" y1="45" x2="360" y2="45" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Stiffness */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Stiffness</span>
                      <span className="font-mono text-primary font-bold">{stiffness[0]}</span>
                    </div>
                    <Slider
                      value={stiffness}
                      onValueChange={setStiffness}
                      min={80}
                      max={800}
                      step={10}
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
                      <span>Loose (80)</span>
                      <span>Rigid (800)</span>
                    </div>
                  </div>

                  {/* Damping */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Damping</span>
                      <span className="font-mono text-primary font-bold">{damping[0]}</span>
                    </div>
                    <Slider
                      value={damping}
                      onValueChange={setDamping}
                      min={4}
                      max={60}
                      step={1}
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
                      <span>Bouncy (4)</span>
                      <span>Stiff (60)</span>
                    </div>
                  </div>

                  {/* Mass */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Mass</span>
                      <span className="font-mono text-primary font-bold">{mass[0]}x</span>
                    </div>
                    <Slider
                      value={mass}
                      onValueChange={setMass}
                      min={0.2}
                      max={3}
                      step={0.1}
                    />
                    <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
                      <span>Light (0.2)</span>
                      <span>Heavy (3.0)</span>
                    </div>
                  </div>
                </div>

                {/* Screen Shake Toggle */}
                <div className="flex items-center justify-between pt-1 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-xs font-semibold">Screen Shake / Haptic Simulation</div>
                      <div className="text-[10px] text-muted-foreground">Triggers tactile camera impulse on impact</div>
                    </div>
                  </div>
                  <Switch
                    checked={hapticShake}
                    onCheckedChange={(checked) => {
                      setHapticShake(checked);
                      playUiSound('pop');
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/60 bg-muted/30 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  className="gap-1.5 text-xs h-8"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Spring Snippet Copied!' : 'Copy Spring Preset'}
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
