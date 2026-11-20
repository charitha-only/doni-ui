import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Copy, Check, X, Sparkles, Terminal, FileCode, ShieldCheck } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { transitions } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';
import { useTheme } from '@/theme/theme-context';

export interface ThemeExportModalProps {
  open: boolean;
  onClose: () => void;
}

const hexToLuminance = (hex: string) => {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

const getContrastRatio = (lum1: number, lum2: number) => {
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export const ThemeExportModal: React.FC<ThemeExportModalProps> = ({ open, onClose }) => {
  const { activePreset, customHex, isCustom, radius } = useTheme();
  const [activeTab, setActiveTab] = useState<'tailwind' | 'css' | 'cli'>('tailwind');
  const [copied, setCopied] = useState(false);

  const hex = isCustom ? customHex : activePreset.hex;
  const themeName = isCustom ? 'Custom Theme' : activePreset.name;

  const colorLum = hexToLuminance(hex);
  const contrastOnDark = getContrastRatio(colorLum, 0.002).toFixed(1);
  const isDarkAAA = Number(contrastOnDark) >= 7.0;
  const isDarkAA = Number(contrastOnDark) >= 4.5;

  const tailwindSnippet = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${hex}',
          foreground: '#ffffff',
        },
      },
      borderRadius: {
        lg: '${radius}',
        md: 'calc(${radius} - 2px)',
        sm: 'calc(${radius} - 4px)',
      },
    },
  },
};`;

  const cssSnippet = `/* globals.css / index.css */
:root {
  --primary: ${hex};
  --primary-foreground: #ffffff;
  --radius: ${radius};
  --glow: ${hex}66;
}`;

  const cliSnippet = `# Initialize Doni UI with your current theme
npx doni-ui init --color="${hex}" --radius="${radius}"`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'tailwind':
        return tailwindSnippet;
      case 'css':
        return cssSnippet;
      case 'cli':
        return cliSnippet;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    playUiSound('success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/70 bg-muted/20">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-glow"
                  style={{ backgroundColor: hex }}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold tracking-tight">Export Theme Configuration</h3>
                    <Badge variant="glow" className="text-[10px]">{themeName}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">Hex: {hex.toUpperCase()} • Radius: {radius}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playUiSound('click');
                  onClose();
                }}
                className="w-8 h-8 rounded-lg border border-border/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1.5 px-6 pt-4 border-b border-border/40 bg-muted/10">
              {[
                { id: 'tailwind', label: 'tailwind.config.js', icon: FileCode },
                { id: 'css', label: 'CSS Variables', icon: Code2 },
                { id: 'cli', label: 'CLI Flag', icon: Terminal },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(t.id as any);
                      playUiSound('tab');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary text-primary font-bold'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Code Box */}
            <div className="p-6 space-y-4">
              <div className="relative rounded-xl border border-border/80 bg-muted/40 p-4 font-mono text-xs">
                <Button
                  variant="glow"
                  size="sm"
                  onClick={handleCopy}
                  className="absolute right-3 top-3 h-7 px-2.5 text-[11px]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Copy Code
                    </>
                  )}
                </Button>
                <pre className="text-foreground/90 overflow-x-auto leading-relaxed pt-2">
                  <code>{getActiveCode()}</code>
                </pre>
              </div>

              {/* WCAG 2.1 Accessibility Audit */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-card/60 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">WCAG 2.1 Contrast:</span>
                  <span className="text-muted-foreground font-mono">
                    <strong className="text-primary font-bold">{contrastOnDark}:1</strong> vs Dark Canvas
                  </span>
                </div>
                <Badge variant={isDarkAAA ? 'glow' : isDarkAA ? 'default' : 'outline'} className="text-[10px]">
                  {isDarkAAA ? 'AAA Compliant (Optimal)' : isDarkAA ? 'AA Compliant' : 'Custom Contrast'}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Paste this into your Next.js, Vite, or Tailwind CSS project to instantly match your Doni UI custom theme.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
