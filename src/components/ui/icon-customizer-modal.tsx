import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Palette,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from 'lucide-react';
import { IconItemDef } from './animated-icons-suite';
import { Button } from './button';
import { Badge } from './badge';
import { Switch } from './switch';
import { useToast } from './toast';
import { transitions } from '@/lib/utils';

interface IconCustomizerModalProps {
  iconDef: IconItemDef | null;
  allIcons: IconItemDef[];
  isOpen: boolean;
  onClose: () => void;
  onSelectIcon: (def: IconItemDef) => void;
}

export const IconCustomizerModal: React.FC<IconCustomizerModalProps> = ({
  iconDef,
  allIcons,
  isOpen,
  onClose,
  onSelectIcon,
}) => {
  const { toast } = useToast();

  // Customization state
  const [size, setSize] = useState<number>(48);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [selectedColor, setSelectedColor] = useState<string>('currentColor');
  const [customHex, setCustomHex] = useState<string>('#38bdf8');
  const [hoverColor, setHoverColor] = useState<string>('#f43f5e');
  const [withGlow, setWithGlow] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<'hover' | 'continuous' | 'click'>('hover');
  const [bgShape, setBgShape] = useState<'none' | 'square' | 'circle' | 'glass'>('glass');
  const [copiedJsx, setCopiedJsx] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  if (!iconDef || !isOpen) return null;

  const currentIndex = allIcons.findIndex((i) => i.id === iconDef.id);
  const prevIcon = allIcons[(currentIndex - 1 + allIcons.length) % allIcons.length];
  const nextIcon = allIcons[(currentIndex + 1) % allIcons.length];

  const effectiveColor = selectedColor === 'custom' ? customHex : selectedColor;

  // Generate copyable JSX code
  const generatedJsx = `<${iconDef.exportName}
  size={${size}}
  strokeWidth={${strokeWidth}}${effectiveColor !== 'currentColor' ? `\n  color="${effectiveColor}"` : ''}${hoverColor ? `\n  hoverColor="${hoverColor}"` : ''}${!withGlow ? '\n  withGlow={false}' : ''}${trigger !== 'hover' ? `\n  trigger="${trigger}"` : ''}${bgShape !== 'none' ? `\n  bgShape="${bgShape}"` : ''}
/>`;

  const copyCode = (text: string, type: 'jsx' | 'cli') => {
    navigator.clipboard.writeText(text);
    if (type === 'jsx') {
      setCopiedJsx(true);
      setTimeout(() => setCopiedJsx(false), 2000);
    } else {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
    toast({
      title: 'Copied to Clipboard!',
      description: text,
      type: 'success',
    });
  };

  const PRESET_COLORS = [
    { label: 'Default', value: 'currentColor', hex: '#94a3b8' },
    { label: 'Cyan', value: '#06b6d4', hex: '#06b6d4' },
    { label: 'Emerald', value: '#10b981', hex: '#10b981' },
    { label: 'Rose', value: '#f43f5e', hex: '#f43f5e' },
    { label: 'Amber', value: '#f59e0b', hex: '#f59e0b' },
    { label: 'Purple', value: '#a855f7', hex: '#a855f7' },
    { label: 'White', value: '#ffffff', hex: '#ffffff' },
  ];

  const IconComp = iconDef.component;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={transitions.springBouncy}
          className="relative w-full max-w-4xl bg-card border border-border shadow-2xl rounded-3xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border/60 bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {iconDef.name}
                  </h2>
                  <Badge variant="glow" className="text-[10px] capitalize">
                    {iconDef.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  &lt;{iconDef.exportName} /&gt; — {iconDef.desc}
                </p>
              </div>
            </div>

            {/* Quick Next/Prev & Close */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSelectIcon(prevIcon)}
                title="Previous Icon"
                className="h-8 w-8 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSelectIcon(nextIcon)}
                title="Next Icon"
                className="h-8 w-8 rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="w-[1px] h-5 bg-border mx-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Main Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto divide-y md:divide-y-0 md:divide-x divide-border/60">
            {/* Left: Live Interactive Stage */}
            <div className="md:col-span-5 p-6 flex flex-col items-center justify-between bg-gradient-to-b from-card via-muted/10 to-card">
              <div className="w-full flex justify-between items-center text-xs text-muted-foreground font-mono">
                <span>Interactive Preview</span>
                <span className="uppercase text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-muted">
                  {trigger} trigger
                </span>
              </div>

              {/* Icon Stage */}
              <div className="my-8 flex flex-col items-center justify-center min-h-[200px] w-full">
                <div className="p-8 rounded-3xl border border-border/80 bg-background/50 shadow-inner flex items-center justify-center transition-all">
                  <IconComp
                    size={size}
                    strokeWidth={strokeWidth}
                    color={effectiveColor}
                    hoverColor={hoverColor}
                    withGlow={withGlow}
                    trigger={trigger}
                    bgShape={bgShape}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  {trigger === 'hover'
                    ? 'Hover your cursor over the icon to trigger animation'
                    : trigger === 'click'
                    ? 'Click the icon to toggle animation'
                    : 'Continuous looping animation active'}
                </p>
              </div>

              {/* Reset Controls Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={() => {
                  setSize(48);
                  setStrokeWidth(2);
                  setSelectedColor('currentColor');
                  setWithGlow(true);
                  setTrigger('hover');
                  setBgShape('glass');
                }}
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Reset Defaults
              </Button>
            </div>

            {/* Right: Customization Controls Panel */}
            <div className="md:col-span-7 p-6 space-y-6 overflow-y-auto">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                Icon Appearance &amp; Physics
              </h3>

              {/* 1. Size Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground">Icon Size:</span>
                  <span className="font-mono font-bold text-primary">{size}px</span>
                </div>
                <input
                  type="range"
                  min={18}
                  max={96}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>18px (Compact)</span>
                  <span>48px (Standard)</span>
                  <span>96px (Hero)</span>
                </div>
              </div>

              {/* 2. Stroke Width */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground">Stroke Thickness:</span>
                  <span className="font-mono font-bold text-primary">{strokeWidth}px</span>
                </div>
                <div className="flex gap-2">
                  {[1, 1.5, 2, 2.5, 3].map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setStrokeWidth(sw)}
                      className={`flex-1 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all cursor-pointer ${
                        strokeWidth === sw
                          ? 'bg-primary text-primary-foreground border-primary font-bold shadow-sm'
                          : 'border-border hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {sw}px
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Base Color Swatches */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-primary" />
                    Color Theme:
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">Custom:</span>
                      <input
                        type="color"
                        value={customHex}
                        onChange={(e) => {
                          setCustomHex(e.target.value);
                          setSelectedColor('custom');
                        }}
                        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">Hover:</span>
                      <input
                        type="color"
                        value={hoverColor}
                        onChange={(e) => setHoverColor(e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setSelectedColor(c.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedColor === c.value
                          ? 'border-primary ring-2 ring-primary/40 font-bold bg-primary/10'
                          : 'border-border/80 hover:bg-muted/80 text-muted-foreground'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-background shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Animation Trigger Mode */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-foreground">Animation Trigger:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hover', label: 'On Hover' },
                    { id: 'continuous', label: 'Continuous Loop' },
                    { id: 'click', label: 'On Tap / Click' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTrigger(t.id as any)}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        trigger === t.id
                          ? 'bg-primary text-primary-foreground border-primary font-bold shadow-sm'
                          : 'border-border hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Tile Background Container */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-foreground">Tile Container:</span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'none', label: 'Bare Icon' },
                    { id: 'glass', label: 'Glass Dock' },
                    { id: 'square', label: 'Rounded Box' },
                    { id: 'circle', label: 'Circle Tile' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setBgShape(bg.id as any)}
                      className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                        bgShape === bg.id
                          ? 'bg-primary text-primary-foreground border-primary font-bold shadow-sm'
                          : 'border-border hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Glow Switch */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-muted/20">
                <div>
                  <p className="text-xs font-bold text-foreground">Ambient Neon Glow</p>
                  <p className="text-[11px] text-muted-foreground">
                    Radiates responsive color bloom on active trigger
                  </p>
                </div>
                <Switch checked={withGlow} onCheckedChange={setWithGlow} />
              </div>
            </div>
          </div>

          {/* Bottom Code Generator Bar */}
          <div className="p-4 sm:p-5 border-t border-border/60 bg-muted/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto font-mono text-xs text-muted-foreground truncate max-w-md">
              <span className="text-primary font-bold">&lt;{iconDef.exportName}</span> size={'{'}{size}{'}'} strokeWidth={'{'}{strokeWidth}{'}'} ... /&gt;
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => copyCode('npx doni-ui add animated-icons', 'cli')}
              >
                {copiedCli ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                ) : (
                  <Terminal className="w-3.5 h-3.5 mr-1.5 text-primary" />
                )}
                CLI Add
              </Button>

              <Button
                variant="glow"
                size="sm"
                className="text-xs"
                onClick={() => copyCode(generatedJsx, 'jsx')}
              >
                {copiedJsx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                )}
                {copiedJsx ? 'Copied Custom JSX!' : 'Copy Customized JSX'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
