import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  Copy,
  Check,
  Sparkles,
  Zap,
  Flame,
  Star,
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  Grid,
  Sun,
  ZoomIn,
  ZoomOut,
  Palette,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { FlameButton } from '../ui/flame-button';
import { ConfettiButton } from '../ui/confetti-button';
import { BadgeDelta } from '../ui/badge-delta';
import { Rating } from '../ui/rating';
import { Progress } from '../ui/progress';
import { transitions } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';

export type CanvasTexture = 'default' | 'dots' | 'blueprint' | 'aurora' | 'light';

export const ComponentSandbox: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<'button' | 'flame' | 'badge' | 'rating' | 'progress' | 'confetti'>('button');
  const [variant, setVariant] = useState<'default' | 'glow' | 'outline' | 'secondary'>('glow');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [hasPulse, setHasPulse] = useState(true);
  const [interactiveRating, setInteractiveRating] = useState(4);
  const [progressVal, setProgressVal] = useState([72]);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [syntaxFormat, setSyntaxFormat] = useState<'react' | 'tailwind' | 'nextjs'>('react');
  const [canvasTexture, setCanvasTexture] = useState<CanvasTexture>('default');
  const [canvasZoom, setCanvasZoom] = useState<number>(100);
  const [isZenMode, setIsZenMode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic code snippet generator based on current interactive state
  const getDynamicCode = () => {
    switch (selectedComponent) {
      case 'button':
        return `<Button
  variant="${variant}"
  size="${size === 'md' ? 'default' : size}"
  ${variant === 'glow' && hasPulse ? 'className="shadow-glow"' : ''}
>
  <Sparkles className="w-4 h-4 mr-2" />
  Interactive Button
</Button>`;

      case 'flame':
        return `<FlameButton
  flameColor="${variant === 'glow' ? '#06b6d4' : '#f97316'}"
  className="${size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'}"
>
  Ignite Experience
</FlameButton>`;

      case 'badge':
        return `<Badge
  variant="${variant}"
  ${hasPulse ? 'withPulse' : ''}
>
  Live Dynamic Badge
</Badge>`;

      case 'rating':
        return `<Rating
  value={${interactiveRating}}
  max={5}
  size={${size === 'sm' ? 16 : size === 'lg' ? 26 : 20}}
  onChange={setRating}
/>`;

      case 'progress':
        return `<Progress
  value={${progressVal[0]}}
  size="${size}"
  withGlow={${hasPulse}}
  showValue
/>`;

      case 'confetti':
        return `<ConfettiButton
  particleCount={60}
  spread={70}
>
  🎉 Trigger Celebration
</ConfettiButton>`;
    }
  };

  const getSyntaxCode = () => {
    const reactCode = getDynamicCode();
    if (syntaxFormat === 'react') return reactCode;

    if (syntaxFormat === 'tailwind') {
      if (selectedComponent === 'button') {
        return `<button class="inline-flex items-center justify-center font-medium transition-all ${
          variant === 'glow'
            ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(6,182,212,0.5)]'
            : variant === 'outline'
            ? 'border border-border bg-transparent text-foreground hover:bg-muted'
            : 'bg-primary text-primary-foreground'
        } ${size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'} rounded-xl cursor-pointer">
  Interactive Button
</button>`;
      }
      return `<!-- Pure Tailwind Atomic Structure -->\n<div class="p-4 rounded-xl border border-border/80 bg-card shadow-sm">\n  ${reactCode}\n</div>`;
    }

    const compName =
      selectedComponent === 'button'
        ? 'Button'
        : selectedComponent === 'flame'
        ? 'FlameButton'
        : selectedComponent === 'badge'
        ? 'Badge'
        : selectedComponent === 'rating'
        ? 'Rating'
        : selectedComponent === 'progress'
        ? 'Progress'
        : 'ConfettiButton';

    return `'use client';\n\nimport React from 'react';\nimport { ${compName} } from 'doni-ui';\n\nexport default function DoniPreview() {\n  return (\n    <div className="flex items-center justify-center p-6">\n      ${reactCode.split('\n').join('\n      ')}\n    </div>\n  );\n}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSyntaxCode());
    setCopied(true);
    playUiSound('success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-card/60 border border-border/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
      {/* Sandbox Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shadow-glow">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold tracking-tight">Interactive Props Sandbox</h3>
              <Badge variant="glow" className="text-[10px]">v0.8.0 Live</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Tweak component attributes and copy reactive JSX code</p>
          </div>
        </div>

        {/* Component Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-muted/40 rounded-xl border border-border/60 scrollbar-none">
          {[
            { id: 'button', label: 'Button', icon: Zap },
            { id: 'flame', label: 'Flame', icon: Flame },
            { id: 'badge', label: 'Badge', icon: Sparkles },
            { id: 'rating', label: 'Rating', icon: Star },
            { id: 'progress', label: 'Progress', icon: Layers },
            { id: 'confetti', label: 'Confetti', icon: Sparkles },
          ].map((c) => {
            const Icon = c.icon;
            const isSelected = selectedComponent === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedComponent(c.id as any);
                  playUiSound('tab');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sandbox Grid: Left Controls | Right Live Stage & Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left: Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-muted/20 p-5 rounded-xl border border-border/60">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-primary" />
            <span>Configurable Props</span>
          </h4>

          {/* Variant Selector */}
          <div>
            <label className="text-xs font-medium text-foreground block mb-2">Variant Style</label>
            <div className="grid grid-cols-2 gap-2">
              {(['glow', 'default', 'outline', 'secondary'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setVariant(v);
                    playUiSound('switch');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer capitalize ${
                    variant === v
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                      : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="text-xs font-medium text-foreground block mb-2">Size Scale</label>
            <div className="grid grid-cols-3 gap-2">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    playUiSound('switch');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer uppercase ${
                    size === s
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                      : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Glow / Animation Pulse Toggle */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-foreground">Aura Pulse Glow</span>
            <Switch
              checked={hasPulse}
              onCheckedChange={(checked) => {
                setHasPulse(checked);
                playUiSound('pop');
              }}
            />
          </div>

          {/* Component-Specific Sliders */}
          {selectedComponent === 'progress' && (
            <div className="space-y-2 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Progress Percentage</span>
                <span className="font-mono text-primary font-bold">{progressVal[0]}%</span>
              </div>
              <Slider
                value={progressVal}
                onValueChange={(val) => {
                  setProgressVal(val);
                  playUiSound('click');
                }}
                min={0}
                max={100}
                step={1}
              />
            </div>
          )}

          {selectedComponent === 'rating' && (
            <div className="space-y-2 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Star Score Value</span>
                <span className="font-mono text-primary font-bold">{interactiveRating} / 5</span>
              </div>
              <Rating
                value={interactiveRating}
                onChange={(val) => {
                  setInteractiveRating(val);
                  playUiSound('chime');
                }}
              />
            </div>
          )}
        </div>

        {/* Right: Live Interactive Stage & Generated Code */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Viewport Breakpoint & Zen Mode Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <span>Viewport:</span>
                <span className="font-mono text-primary uppercase text-[10px]">{deviceView}</span>
              </span>
              <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/50">
                {[
                  { id: 'desktop', label: '100%', icon: Monitor },
                  { id: 'tablet', label: '768px', icon: Tablet },
                  { id: 'mobile', label: '375px', icon: Smartphone },
                ].map((d) => {
                  const Icon = d.icon;
                  const isSelected = deviceView === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setDeviceView(d.id as any);
                        playUiSound('tab');
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-primary-foreground shadow-xs font-bold'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px] font-mono">{d.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Canvas Texture & Zen Mode Controls */}
            <div className="flex items-center gap-1.5">
              {/* Texture Pills */}
              <div className="flex items-center gap-0.5 bg-muted/40 p-1 rounded-xl border border-border/50">
                {[
                  { id: 'default', label: 'Grid', icon: Grid },
                  { id: 'dots', label: 'Dots', icon: Palette },
                  { id: 'blueprint', label: 'Blueprint', icon: Sparkles },
                  { id: 'aurora', label: 'Aurora', icon: Flame },
                  { id: 'light', label: 'Light', icon: Sun },
                ].map((t) => {
                  const Icon = t.icon;
                  const isSelected = canvasTexture === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      title={`Texture: ${t.label}`}
                      onClick={() => {
                        setCanvasTexture(t.id as CanvasTexture);
                        playUiSound('switch');
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span className="hidden md:inline">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-0.5 bg-muted/40 p-1 rounded-xl border border-border/50 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setCanvasZoom((z) => Math.max(50, z - 25));
                    playUiSound('click');
                  }}
                  className="p-1 hover:text-primary transition-colors cursor-pointer text-muted-foreground"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span className="px-1 text-primary font-bold min-w-[34px] text-center">{canvasZoom}%</span>
                <button
                  type="button"
                  onClick={() => {
                    setCanvasZoom((z) => Math.min(150, z + 25));
                    playUiSound('click');
                  }}
                  className="p-1 hover:text-primary transition-colors cursor-pointer text-muted-foreground"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>

              {/* Zen Fullscreen Trigger */}
              <button
                type="button"
                onClick={() => {
                  setIsZenMode(!isZenMode);
                  playUiSound('chime');
                }}
                className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                  isZenMode
                    ? 'border-primary bg-primary text-primary-foreground shadow-glow'
                    : 'border-border/60 bg-muted/40 text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
                title="Toggle Zen Fullscreen Mode"
              >
                {isZenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-[11px]">Zen</span>
              </button>
            </div>
          </div>

          {/* Live Stage */}
          <div className={`relative min-h-[220px] rounded-xl border transition-all flex items-center justify-center p-8 overflow-hidden shadow-inner ${
            canvasTexture === 'blueprint'
              ? 'border-cyan-500/40 bg-cyan-950/20'
              : canvasTexture === 'light'
              ? 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90'
              : 'border-border/80 bg-gradient-to-b from-card/80 to-card/40'
          }`}>
            {/* Background Texture Patterns */}
            {canvasTexture === 'default' && (
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            )}
            {canvasTexture === 'dots' && (
              <div className="absolute inset-0 bg-[radial-gradient(#80808035_1.5px,transparent_1.5px)] bg-[size:16px_16px] pointer-events-none" />
            )}
            {canvasTexture === 'blueprint' && (
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d418_1px,transparent_1px),linear-gradient(to_bottom,#06b6d418_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            )}
            {canvasTexture === 'aurora' && (
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-pink-500/15 animate-pulse pointer-events-none" />
            )}

            <div
              style={{ transform: `scale(${canvasZoom / 100})`, transformOrigin: 'center center' }}
              className={`transition-all duration-300 flex items-center justify-center ${
              deviceView === 'desktop'
                ? 'w-full'
                : deviceView === 'tablet'
                ? 'max-w-md w-full border-2 border-border/70 rounded-2xl p-6 bg-card/60 shadow-xl'
                : 'max-w-[300px] w-full border-2 border-border/70 rounded-3xl p-6 bg-card/60 shadow-2xl relative pt-7'
            }`}>
              {deviceView === 'mobile' && (
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-border/80" />
              )}

            {/* Render selected component */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedComponent}-${variant}-${size}-${hasPulse}-${interactiveRating}-${progressVal[0]}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={transitions.springGentle}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                {selectedComponent === 'button' && (
                  <Button
                    variant={variant}
                    size={size === 'md' ? 'default' : size}
                    className={variant === 'glow' && hasPulse ? 'shadow-glow' : ''}
                    onClick={() => playUiSound('click')}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Interactive Button
                  </Button>
                )}

                {selectedComponent === 'flame' && (
                  <FlameButton
                    flameColor={variant === 'glow' ? '#06b6d4' : '#f97316'}
                    className={size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'}
                    onClick={() => playUiSound('click')}
                  >
                    Ignite Experience
                  </FlameButton>
                )}

                {selectedComponent === 'badge' && (
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={variant} withPulse={hasPulse}>
                      Live Dynamic Badge
                    </Badge>
                    <BadgeDelta deltaType="increase">+24.8%</BadgeDelta>
                  </div>
                )}

                {selectedComponent === 'rating' && (
                  <div className="flex flex-col items-center gap-2">
                    <Rating
                      value={interactiveRating}
                      size={size === 'sm' ? 16 : size === 'lg' ? 26 : 20}
                      onChange={(v) => {
                        setInteractiveRating(v);
                        playUiSound('chime');
                      }}
                    />
                    <span className="text-xs text-muted-foreground font-mono">
                      Rating: {interactiveRating} Stars
                    </span>
                  </div>
                )}

                {selectedComponent === 'progress' && (
                  <div className="w-64 space-y-2">
                    <Progress
                      value={progressVal[0]}
                      size={size}
                      withGlow={hasPulse}
                      showValue
                    />
                  </div>
                )}

                {selectedComponent === 'confetti' && (
                  <ConfettiButton
                    particleCount={60}
                    spread={70}
                    onClick={() => playUiSound('chime')}
                  >
                    🎉 Trigger Celebration
                  </ConfettiButton>
                )}
              </motion.div>
            </AnimatePresence>
            </div>
          </div>

          {/* Generated Code Box with Multi-Syntax Switcher */}
          <div className="relative rounded-xl border border-border/70 bg-muted/40 p-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-border/40 mb-2 gap-2">
              <div className="flex items-center gap-1 bg-background/50 p-0.5 rounded-lg border border-border/40">
                {[
                  { id: 'react', label: 'React TSX' },
                  { id: 'tailwind', label: 'Tailwind HTML' },
                  { id: 'nextjs', label: 'Next.js 15' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => {
                      setSyntaxFormat(fmt.id as any);
                      playUiSound('tab');
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                      syntaxFormat === fmt.id
                        ? 'bg-primary text-primary-foreground font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
              <Button
                variant="glow"
                size="sm"
                onClick={handleCopy}
                className="h-7 px-2.5 text-[11px] self-end sm:self-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 mr-1 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
            <pre className="text-foreground/90 overflow-x-auto p-1 leading-relaxed selection:bg-primary/20">
              <code>{getSyntaxCode()}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Zen Fullscreen Modal Overlay (v1.5.0) */}
      <AnimatePresence>
        {isZenMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={transitions.smoothEase}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8"
          >
            {/* Top Zen HUD Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/30 flex items-center justify-center shadow-glow">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold tracking-tight">Zen Canvas Studio</h3>
                    <Badge variant="glow" className="text-[10px]">v1.5.0</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground hidden sm:block">Immersive distraction-free component testing studio</p>
                </div>
              </div>

              {/* Texture & Zoom HUD Controls */}
              <div className="flex items-center gap-2">
                {/* Texture Selector */}
                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl border border-border/60">
                  {[
                    { id: 'default', label: 'Grid' },
                    { id: 'dots', label: 'Dots' },
                    { id: 'blueprint', label: 'Blueprint' },
                    { id: 'aurora', label: 'Aurora' },
                    { id: 'light', label: 'Light' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setCanvasTexture(t.id as CanvasTexture);
                        playUiSound('switch');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        canvasTexture === t.id
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Zoom HUD */}
                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl border border-border/60 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setCanvasZoom((z) => Math.max(50, z - 25));
                      playUiSound('click');
                    }}
                    className="p-1 hover:text-primary transition-colors cursor-pointer text-muted-foreground"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1 text-primary font-bold min-w-[38px] text-center">{canvasZoom}%</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCanvasZoom((z) => Math.min(150, z + 25));
                      playUiSound('click');
                    }}
                    className="p-1 hover:text-primary transition-colors cursor-pointer text-muted-foreground"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Copy Snippet */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-3 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>

                {/* Close Zen Mode */}
                <button
                  type="button"
                  onClick={() => {
                    setIsZenMode(false);
                    playUiSound('pop');
                  }}
                  className="p-2 rounded-xl border border-border/80 bg-muted/60 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40 transition-colors cursor-pointer"
                  title="Exit Zen Mode (Esc)"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Zen Stage */}
            <div className={`flex-1 my-4 rounded-2xl border relative flex items-center justify-center overflow-hidden transition-all shadow-2xl ${
              canvasTexture === 'blueprint'
                ? 'border-cyan-500/40 bg-cyan-950/20'
                : canvasTexture === 'light'
                ? 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/90'
                : 'border-border/80 bg-gradient-to-b from-card/90 to-card/50'
            }`}>
              {canvasTexture === 'default' && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              )}
              {canvasTexture === 'dots' && (
                <div className="absolute inset-0 bg-[radial-gradient(#80808035_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none" />
              )}
              {canvasTexture === 'blueprint' && (
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d420_1px,transparent_1px),linear-gradient(to_bottom,#06b6d420_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
              )}
              {canvasTexture === 'aurora' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/15 to-pink-500/20 animate-pulse pointer-events-none" />
              )}

              <div
                style={{ transform: `scale(${canvasZoom / 100})`, transformOrigin: 'center center' }}
                className="relative z-10 transition-transform duration-200"
              >
                {selectedComponent === 'button' && (
                  <Button
                    variant={variant}
                    size={size === 'md' ? 'default' : size}
                    className={variant === 'glow' && hasPulse ? 'shadow-glow text-lg py-6 px-8' : 'text-lg py-6 px-8'}
                    onClick={() => playUiSound('click')}
                  >
                    <Sparkles className="w-5 h-5 mr-2.5" />
                    Interactive Button
                  </Button>
                )}

                {selectedComponent === 'flame' && (
                  <FlameButton
                    flameColor={variant === 'glow' ? '#06b6d4' : '#f97316'}
                    className="px-8 py-4 text-base"
                    onClick={() => playUiSound('click')}
                  >
                    Ignite Experience
                  </FlameButton>
                )}

                {selectedComponent === 'badge' && (
                  <div className="flex flex-wrap items-center gap-3 scale-125">
                    <Badge variant={variant} withPulse={hasPulse}>
                      Live Dynamic Badge
                    </Badge>
                    <BadgeDelta deltaType="increase">+24.8%</BadgeDelta>
                  </div>
                )}

                {selectedComponent === 'rating' && (
                  <div className="flex flex-col items-center gap-3 scale-125">
                    <Rating
                      value={interactiveRating}
                      size={28}
                      onChange={(v) => {
                        setInteractiveRating(v);
                        playUiSound('chime');
                      }}
                    />
                    <span className="text-sm text-muted-foreground font-mono">
                      Rating: {interactiveRating} Stars
                    </span>
                  </div>
                )}

                {selectedComponent === 'progress' && (
                  <div className="w-80 space-y-3">
                    <Progress
                      value={progressVal[0]}
                      size="lg"
                      withGlow={hasPulse}
                      showValue
                    />
                  </div>
                )}

                {selectedComponent === 'confetti' && (
                  <ConfettiButton
                    particleCount={80}
                    spread={90}
                    onClick={() => playUiSound('chime')}
                    className="px-8 py-4 text-base"
                  >
                    🎉 Trigger Celebration
                  </ConfettiButton>
                )}
              </div>
            </div>

            {/* Bottom Component Switcher HUD */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1.5 p-1.5 bg-muted/60 rounded-2xl border border-border/80 shadow-lg">
                {[
                  { id: 'button', label: 'Button' },
                  { id: 'flame', label: 'Flame' },
                  { id: 'badge', label: 'Badge' },
                  { id: 'rating', label: 'Rating' },
                  { id: 'progress', label: 'Progress' },
                  { id: 'confetti', label: 'Confetti' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedComponent(c.id as any);
                      playUiSound('tab');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedComponent === c.id
                        ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
