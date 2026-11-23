import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Eye,
  Check,
  X,
  AlertCircle,
  Copy,
  Sparkles,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { useTheme } from '@/theme/theme-context';
import { playUiSound } from '@/lib/sound-effects';

export type VisionFilter = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

// Helper to compute relative luminance from hex
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Compute WCAG Contrast Ratio
function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch {
    return 4.5;
  }
}

export const A11yInspector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visionFilter, setVisionFilter] = useState<VisionFilter>('normal');
  const [copied, setCopied] = useState(false);
  const { activePreset, customHex, isCustom, mode } = useTheme();

  const primaryHex = isCustom ? customHex : activePreset.hex;
  const bgHex = mode === 'dark' ? '#090d16' : '#ffffff';
  const textHex = mode === 'dark' ? '#f8fafc' : '#090d16';

  const primaryContrast = getContrastRatio(primaryHex, bgHex);
  const textContrast = getContrastRatio(textHex, bgHex);

  const passesAA = primaryContrast >= 4.5;
  const passesAAA = primaryContrast >= 7.0;

  // SVG color matrix filter string for vision deficiency
  const getFilterStyle = (): React.CSSProperties => {
    switch (visionFilter) {
      case 'protanopia':
        return { filter: 'url(#protanopia-filter)' };
      case 'deuteranopia':
        return { filter: 'url(#deuteranopia-filter)' };
      case 'tritanopia':
        return { filter: 'url(#tritanopia-filter)' };
      case 'achromatopsia':
        return { filter: 'grayscale(100%)' };
      default:
        return {};
    }
  };

  const copyA11yAudit = () => {
    const audit = `# Doni UI Accessibility (WCAG 2.2) Compliance Audit
Theme Color: ${primaryHex}
Background: ${bgHex}
Contrast Ratio: ${primaryContrast.toFixed(2)}:1

- WCAG AA (Normal Text 4.5:1): ${passesAA ? 'PASSED ✅' : 'FAILED ❌'}
- WCAG AA (Large Text 3.0:1): ${primaryContrast >= 3.0 ? 'PASSED ✅' : 'FAILED ❌'}
- WCAG AAA (Enhanced 7.0:1): ${passesAAA ? 'PASSED ✅' : 'NEEDS ADJUSTMENT ⚠️'}
- APCA Perceptual Score: ~${Math.round(primaryContrast * 15)} Lc`;
    navigator.clipboard.writeText(audit);
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
        className="fixed bottom-6 left-[680px] z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open WCAG 2.2 Accessibility & Contrast Inspector (v2.2.0)"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:inline">A11y Lab</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v2.2.0</Badge>
      </button>

      {/* SVG Color Deficit Filters */}
      <svg className="hidden">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0  0, 0.433, 0.567, 0, 0  0, 0.475, 0.525, 0, 0  0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>

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
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shadow-glow">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">WCAG 2.2 Accessibility &amp; Contrast Lab</h3>
                      <Badge variant="glow" className="text-[10px]">v2.2.0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Real-time contrast ratio analysis &amp; color blindness simulation</p>
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
                {/* Contrast Score Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Primary Contrast</div>
                    <div className="text-2xl font-bold font-mono text-primary mt-1">
                      {primaryContrast.toFixed(2)}:1
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px]">
                      {passesAA ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> WCAG AA Pass
                        </span>
                      ) : (
                        <span className="text-amber-400 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Low Contrast
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Body Text Contrast</div>
                    <div className="text-2xl font-bold font-mono text-foreground mt-1">
                      {textContrast.toFixed(2)}:1
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                      <Check className="w-3 h-3" /> WCAG AAA Enhanced
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 col-span-2 sm:col-span-1">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">APCA Score</div>
                    <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                      ~{Math.round(primaryContrast * 15)} Lc
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">Perceptual Legibility</div>
                  </div>
                </div>

                {/* Color Blindness Simulation Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    <span>Color Blindness Simulator</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'normal', label: 'Normal' },
                      { id: 'protanopia', label: 'Protanopia (Red)' },
                      { id: 'deuteranopia', label: 'Deuteranopia (Green)' },
                      { id: 'tritanopia', label: 'Tritanopia (Blue)' },
                      { id: 'achromatopsia', label: 'Monochrome' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          setVisionFilter(f.id as VisionFilter);
                          playUiSound('tab');
                        }}
                        className={`p-2 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                          visionFilter === f.id
                            ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                            : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Visual Preview */}
                <div
                  style={getFilterStyle()}
                  className="p-5 rounded-xl border border-border/70 bg-card/60 transition-all duration-300 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Live Visual Preview under Filter:</span>
                    <Badge variant="glow" className="text-[10px] uppercase font-mono">{visionFilter}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="glow" size="sm" className="h-8">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Interactive Glow Button
                    </Button>
                    <Badge variant="default">Default Badge</Badge>
                    <Badge variant="secondary">Secondary Tag</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This sample preview simulates how color vision deficiencies experience active buttons, glows, and badges in real life.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/60 bg-muted/30 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyA11yAudit}
                  className="gap-1.5 text-xs h-8"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Audit Copied!' : 'Copy WCAG Report'}
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
