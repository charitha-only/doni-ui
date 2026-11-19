import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Check, Volume2, VolumeX } from 'lucide-react';
import { useTheme, RadiusOption } from '@/theme/theme-context';
import { COLOR_PRESETS } from '@/theme/themes';
import { cn, transitions } from '@/lib/utils';
import { Badge } from './badge';
import { playUiSound, isSoundEnabled, toggleSound } from '@/lib/sound-effects';

export const PinnedThemeBar: React.FC = () => {
  const {
    activePreset,
    setPreset,
    customHex,
    setCustomHex,
    isCustom,
    radius,
    setRadius,
  } = useTheme();

  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  return (
    <div className="sticky top-16 z-35 w-full border-b border-border/60 bg-background/85 backdrop-blur-2xl shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-3">
          {/* Left Title / Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shadow-glow shrink-0">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold tracking-tight text-foreground flex items-center gap-1.5">
                Theme Studio
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </span>
              <span className="text-[10px] text-muted-foreground font-mono leading-none">
                {isCustom ? customHex.toUpperCase() : activePreset.name}
              </span>
            </div>
          </div>

          {/* Center: 7 Color Preset Swatches */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 scrollbar-none max-w-full">
            {COLOR_PRESETS.map((p) => {
              const isSelected = !isCustom && activePreset.id === p.id;
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  transition={transitions.springBouncy}
                  onClick={() => {
                    setPreset(p.id);
                    playUiSound('chime');
                  }}
                  className={cn(
                    'group relative flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all text-left cursor-pointer shrink-0 select-none text-xs font-semibold',
                    isSelected
                      ? 'border-primary bg-primary/15 ring-2 ring-primary/40 text-foreground font-bold shadow-glow'
                      : 'border-border/60 hover:border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  )}
                  title={`${p.name} (${p.hex})`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs flex items-center justify-center text-white shrink-0 border border-background/20"
                    style={{ backgroundColor: p.hex }}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span className="hidden md:inline text-[11px] whitespace-nowrap">
                    {p.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Controls: Custom Hex & Radius */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Custom Hex Picker */}
            <div className="flex items-center gap-1.5 bg-card/80 border border-border/80 px-2 py-1 rounded-xl shadow-inner">
              <label className="relative w-5 h-5 rounded-md overflow-hidden cursor-pointer shrink-0 border border-border shadow-xs">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                  className="absolute -top-3 -left-3 w-12 h-12 cursor-pointer border-0 p-0"
                  title="Pick ANY custom hex color"
                />
              </label>
              <input
                type="text"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                maxLength={7}
                className="w-16 bg-transparent font-mono text-[11px] font-bold uppercase text-foreground focus:outline-none text-center"
              />
              {isCustom && (
                <Badge variant="glow" className="text-[9px] px-1 py-0 h-4">
                  Custom
                </Badge>
              )}
            </div>

            {/* Radius Selector Pills (Visible on lg+ screens) */}
            <div className="hidden xl:flex items-center gap-1 bg-card/60 p-1 rounded-xl border border-border/70">
              <span className="text-[10px] text-muted-foreground font-semibold px-1">Radius:</span>
              {(['0.3rem', '0.5rem', '0.75rem', '1rem', '1.5rem'] as RadiusOption[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRadius(r);
                    playUiSound('switch');
                  }}
                  className={cn(
                    'px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-semibold transition-all cursor-pointer',
                    radius === r
                      ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* UI Audio SFX Toggle */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleToggleSound}
              className={cn(
                'flex items-center gap-1 px-2 py-1 rounded-xl border text-xs font-semibold transition-all cursor-pointer',
                soundOn
                  ? 'bg-primary/10 border-primary/30 text-primary shadow-glow'
                  : 'bg-muted/40 border-border/70 text-muted-foreground hover:text-foreground'
              )}
              title={soundOn ? 'UI Audio Synthesis: ON (Click to mute)' : 'UI Audio Synthesis: MUTED (Click to enable)'}
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[10px] font-mono">SFX</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 opacity-60" />
                  <span className="hidden sm:inline text-[10px] font-mono opacity-60">MUTED</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
