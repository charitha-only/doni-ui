import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Sparkles,
  Copy,
  Check,
  X,
  Palette,
  Eye,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Slider } from './slider';
import { Switch } from './switch';
import { playUiSound } from '@/lib/sound-effects';

export const GlassmorphismStudio: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blurVal, setBlurVal] = useState([16]);
  const [opacityVal, setOpacityVal] = useState([15]);
  const [borderVal, setBorderVal] = useState([30]);
  const [saturationVal, setSaturationVal] = useState([140]);
  const [noiseGrain, setNoiseGrain] = useState(true);
  const [meshColor1, setMeshColor1] = useState('#06b6d4');
  const [meshColor2, setMeshColor2] = useState('#8b5cf6');
  const [meshColor3, setMeshColor3] = useState('#ec4899');
  const [copied, setCopied] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);

  const getTailwindClasses = () => {
    return `backdrop-blur-[${blurVal[0]}px] backdrop-saturate-[${saturationVal[0]}%] bg-background/${opacityVal[0]} border border-border/${borderVal[0]} shadow-2xl`;
  };

  const getCssSnippet = () => {
    return `/* Doni UI Specular Glassmorphism Card */
.glass-pane {
  background: rgba(255, 255, 255, ${opacityVal[0] / 100});
  backdrop-filter: blur(${blurVal[0]}px) saturate(${saturationVal[0]}%);
  -webkit-backdrop-filter: blur(${blurVal[0]}px) saturate(${saturationVal[0]}%);
  border: 1px solid rgba(255, 255, 255, ${borderVal[0] / 100});
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 1rem;
}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCssSnippet());
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
        className="fixed bottom-6 left-56 z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open Glassmorphism Studio (v1.7.0)"
      >
        <Layers className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">Glass Lab</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v1.7.0</Badge>
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
              className="w-full max-w-3xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/60 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-glow">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">Glassmorphism &amp; Mesh Studio</h3>
                      <Badge variant="glow" className="text-[10px]">v1.7.0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Craft specular blurred glass panes &amp; chromatic mesh light gradients</p>
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
                {/* Live Specular Stage */}
                <div className="relative min-h-[220px] rounded-2xl border border-border/80 overflow-hidden flex items-center justify-center p-8 shadow-inner">
                  {/* Chromatic Mesh Gradient Background */}
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: `radial-gradient(at 20% 30%, ${meshColor1}55 0px, transparent 50%),
                                   radial-gradient(at 80% 20%, ${meshColor2}55 0px, transparent 50%),
                                   radial-gradient(at 50% 80%, ${meshColor3}55 0px, transparent 50%),
                                   linear-gradient(to bottom right, #0f172a, #020617)`,
                    }}
                  />

                  {/* Noise Texture */}
                  {noiseGrain && (
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff18_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none" />
                  )}

                  {/* Glass Pane Preview */}
                  <div
                    className="relative z-10 max-w-sm w-full p-6 rounded-2xl transition-all duration-200"
                    style={{
                      backgroundColor: `rgba(255, 255, 255, ${opacityVal[0] / 100})`,
                      backdropFilter: `blur(${blurVal[0]}px) saturate(${saturationVal[0]}%)`,
                      WebkitBackdropFilter: `blur(${blurVal[0]}px) saturate(${saturationVal[0]}%)`,
                      border: `1px solid rgba(255, 255, 255, ${borderVal[0] / 100})`,
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-300" />
                        <span className="font-bold text-sm text-white">Liquid Glass Card</span>
                      </div>
                      <Badge variant="glow" className="text-[10px]">Realtime</Badge>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed mb-4">
                      Ultra-smooth refractive glass pane with hardware-accelerated background diffusion and chromatic vibrancy.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button variant="glow" size="sm" className="h-7 text-xs" onClick={() => playUiSound('click')}>
                        Explore
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={() => playUiSound('pop')}>
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mesh Color Swatches */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-primary" />
                    <span>Mesh Light Emittance Sources</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    {[
                      { label: 'Cyan Aurora', c1: '#06b6d4', c2: '#3b82f6', c3: '#ec4899' },
                      { label: 'Solar Sunset', c1: '#f43f5e', c2: '#fb923c', c3: '#eab308' },
                      { label: 'Emerald Mint', c1: '#10b981', c2: '#06b6d4', c3: '#3b82f6' },
                      { label: 'Deep Violet', c1: '#8b5cf6', c2: '#a855f7', c3: '#ec4899' },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => {
                          setMeshColor1(p.c1);
                          setMeshColor2(p.c2);
                          setMeshColor3(p.c3);
                          playUiSound('chime');
                        }}
                        className="px-3 py-1.5 rounded-xl border border-border/60 hover:border-primary/60 text-xs font-medium transition-all cursor-pointer flex items-center gap-2 bg-muted/20"
                      >
                        <div className="flex -space-x-1">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.c1 }} />
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.c2 }} />
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.c3 }} />
                        </div>
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glass Controls Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Blur Radius */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Diffusion Blur</span>
                      <span className="font-mono text-primary font-bold">{blurVal[0]}px</span>
                    </div>
                    <Slider value={blurVal} onValueChange={setBlurVal} min={0} max={40} step={1} />
                  </div>

                  {/* Glass Opacity */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Surface Opacity</span>
                      <span className="font-mono text-primary font-bold">{opacityVal[0]}%</span>
                    </div>
                    <Slider value={opacityVal} onValueChange={setOpacityVal} min={5} max={85} step={1} />
                  </div>

                  {/* Border Specular Shine */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Border Reflection</span>
                      <span className="font-mono text-primary font-bold">{borderVal[0]}%</span>
                    </div>
                    <Slider value={borderVal} onValueChange={setBorderVal} min={10} max={80} step={1} />
                  </div>

                  {/* Color Saturation */}
                  <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Vibrancy Saturation</span>
                      <span className="font-mono text-primary font-bold">{saturationVal[0]}%</span>
                    </div>
                    <Slider value={saturationVal} onValueChange={setSaturationVal} min={100} max={200} step={5} />
                  </div>
                </div>

                {/* Noise Toggle */}
                <div className="flex items-center justify-between pt-1 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-xs font-semibold">Micro-Texture Grain Noise</div>
                      <div className="text-[10px] text-muted-foreground">Subtle frosted texture eliminating banding artifacts</div>
                    </div>
                  </div>
                  <Switch
                    checked={noiseGrain}
                    onCheckedChange={(checked) => {
                      setNoiseGrain(checked);
                      playUiSound('pop');
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/60 bg-muted/30 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-1.5 text-xs h-8"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'CSS Copied!' : 'Copy CSS'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(getTailwindClasses());
                      setCopiedTailwind(true);
                      playUiSound('success');
                      setTimeout(() => setCopiedTailwind(false), 2000);
                    }}
                    className="gap-1.5 text-xs h-8"
                  >
                    {copiedTailwind ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTailwind ? 'Tailwind Copied!' : 'Copy Tailwind'}
                  </Button>
                </div>

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
