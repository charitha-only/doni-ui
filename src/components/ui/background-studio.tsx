import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Waves,
  Copy,
  Check,
  X,
  Code2,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Slider } from './slider';
import { transitions } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';
import { useTheme } from '@/theme/theme-context';
import { AuroraBackground } from './aurora-background';

export interface BackgroundStudioProps {
  open: boolean;
  onClose: () => void;
}

export const BackgroundStudio: React.FC<BackgroundStudioProps> = ({ open, onClose }) => {
  const { activePreset, customHex, isCustom } = useTheme();
  const hex = isCustom ? customHex : activePreset.hex;

  const [intensity, setIntensity] = useState<'subtle' | 'vibrant' | 'hyper'>('vibrant');
  const [showRadial, setShowRadial] = useState(true);
  const [blurVal, setBlurVal] = useState([12]);
  const [copied, setCopied] = useState(false);

  const getAuroraSnippet = () => {
    return `import { AuroraBackground } from 'doni-ui';

export function HeroAurora() {
  return (
    <AuroraBackground showRadialGradient={${showRadial}} className="min-h-screen py-24">
      <div className="relative z-10 text-center max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Next-Gen Interface
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Powered by Doni UI GPU spring physics and dynamic color channels.
        </p>
      </div>
    </AuroraBackground>
  );
}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getAuroraSnippet());
    setCopied(true);
    playUiSound('success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={transitions.springGentle}
            className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/70 bg-muted/20">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-glow"
                  style={{ backgroundColor: hex }}
                >
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">Aurora &amp; Mesh Background Studio</h3>
                    <Badge variant="glow" className="text-[10px]">v1.3.0</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    GPU-accelerated ambient atmospheric light streams with dynamic theme adapting.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playUiSound('click');
                  onClose();
                }}
                className="w-8 h-8 rounded-lg border border-border/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-y-auto flex-1">
              {/* Left Controls (5 cols) */}
              <div className="md:col-span-5 p-5 border-b md:border-b-0 md:border-r border-border/60 space-y-5 bg-muted/10">
                {/* Preset Intensity Modes */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Atmosphere Intensity
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'subtle', label: 'Subtle' },
                      { id: 'vibrant', label: 'Vibrant' },
                      { id: 'hyper', label: 'Hyper' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          setIntensity(mode.id as any);
                          playUiSound('tab');
                        }}
                        className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          intensity === mode.id
                            ? 'bg-primary text-primary-foreground border-primary font-bold shadow-glow'
                            : 'border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blur Level Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground">Diffusion Blur</span>
                    <span className="font-mono text-primary font-bold">{blurVal[0]}px</span>
                  </div>
                  <Slider
                    value={blurVal}
                    onValueChange={(val) => {
                      setBlurVal(val);
                      playUiSound('click');
                    }}
                    min={4}
                    max={24}
                    step={1}
                  />
                </div>

                {/* Radial Mask Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-card/60 text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">Radial Edge Mask</span>
                    <span className="text-muted-foreground text-[11px]">Vignettes edges gently into canvas</span>
                  </div>
                  <Button
                    variant={showRadial ? 'glow' : 'outline'}
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      setShowRadial((prev) => !prev);
                      playUiSound('pop');
                    }}
                  >
                    {showRadial ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                {/* Code Copy Button */}
                <Button
                  variant="glow"
                  size="sm"
                  onClick={handleCopy}
                  className="w-full"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                      Snippet Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Component Code
                    </>
                  )}
                </Button>
              </div>

              {/* Right Live Preview Canvas (7 cols) */}
              <div className="md:col-span-7 p-6 flex flex-col justify-between bg-card/40">
                <div className="relative rounded-2xl overflow-hidden border border-border/80 min-h-[300px] flex items-center justify-center p-8 shadow-inner">
                  <AuroraBackground
                    showRadialGradient={showRadial}
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="relative z-10 text-center space-y-2 max-w-sm">
                    <div
                      className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-white shadow-glow mb-2"
                      style={{ backgroundColor: hex }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-xl font-bold tracking-tight text-foreground">
                      Luminous Aurora Experience
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Adapts automatically to your active theme color ({hex.toUpperCase()}) with zero CSS compilation lag.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-mono">
                    <Code2 className="w-3.5 h-3.5 text-primary" />
                    AuroraBackground.tsx
                  </span>
                  <span className="font-semibold text-primary">0ms CSS-in-JS Lag</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
