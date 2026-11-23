import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Copy,
  Check,
  X,
  Smartphone,
  Globe,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { useTheme } from '@/theme/theme-context';
import { playUiSound } from '@/lib/sound-effects';

export type TokenFormat = 'figma' | 'tailwind-v4' | 'swift' | 'compose' | 'css';

export const TokenExporter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<TokenFormat>('figma');
  const [copied, setCopied] = useState(false);
  const { activePreset, customHex, isCustom, radius, mode } = useTheme();

  const getExportCode = (): string => {
    const primary = isCustom ? customHex : activePreset.hex;
    const background = mode === 'dark' ? '#090d16' : '#ffffff';
    const card = mode === 'dark' ? '#0e1526' : '#f8fafc';
    const foreground = mode === 'dark' ? '#f8fafc' : '#090d16';

    switch (format) {
      case 'figma':
        return JSON.stringify(
          {
            "doni-ui": {
              "color": {
                "primary": { "value": primary, "type": "color" },
                "background": { "value": background, "type": "color" },
                "card": { "value": card, "type": "color" },
                "foreground": { "value": foreground, "type": "color" }
              },
              "borderRadius": {
                "card": { "value": "16px", "type": "borderRadius" },
                "button": { "value": radius, "type": "borderRadius" }
              }
            }
          },
          null,
          2
        );

      case 'tailwind-v4':
        return `@theme {
  --color-primary: ${primary};
  --color-background: ${background};
  --color-card: ${card};
  --color-foreground: ${foreground};
  --radius-card: 1rem;
  --radius-button: ${radius};
}`;

      case 'swift':
        return `// Doni UI - iOS SwiftUI Color Palette
import SwiftUI

public extension Color {
    static let doniPrimary = Color(hex: "${primary}")
    static let doniBackground = Color(hex: "${background}")
    static let doniCard = Color(hex: "${card}")
    static let doniForeground = Color(hex: "${foreground}")
}

public extension View {
    func doniCardStyle() -> some View {
        self.padding()
            .background(Color.doniCard)
            .cornerRadius(16)
            .shadow(radius: 8)
    }
}`;

      case 'compose':
        return `// Doni UI - Android Jetpack Compose Palette
package com.doni.ui.theme

import androidx.compose.ui.graphics.Color

object DoniTheme {
    val Primary = Color(android.graphics.Color.parseColor("${primary}"))
    val Background = Color(android.graphics.Color.parseColor("${background}"))
    val Card = Color(android.graphics.Color.parseColor("${card}"))
    val Foreground = Color(android.graphics.Color.parseColor("${foreground}"))
}`;

      case 'css':
        return `/* Doni UI Custom CSS Design Tokens */
:root {
  --doni-primary: ${primary};
  --doni-background: ${background};
  --doni-card: ${card};
  --doni-foreground: ${foreground};
  --doni-radius: 1rem;
  --doni-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportCode());
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
        className="fixed bottom-6 left-[445px] z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open Design Token Exporter (v1.9.0)"
      >
        <Code2 className="w-4 h-4 text-cyan-400" />
        <span className="hidden sm:inline">Token Sync</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v1.9.0</Badge>
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
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">Multi-Platform Token Exporter</h3>
                      <Badge variant="glow" className="text-[10px]">v1.9.0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Export Doni design tokens to Figma, Tailwind v4, iOS SwiftUI &amp; Jetpack Compose</p>
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
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Platform Selector Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted/40 rounded-xl border border-border/60">
                  {[
                    { id: 'figma', label: 'Figma Tokens (JSON)', icon: Sparkles },
                    { id: 'tailwind-v4', label: 'Tailwind v4 @theme', icon: FileCode },
                    { id: 'swift', label: 'iOS SwiftUI', icon: Smartphone },
                    { id: 'compose', label: 'Android Compose', icon: Smartphone },
                    { id: 'css', label: 'CSS Variables', icon: Globe },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = format === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setFormat(tab.id as TokenFormat);
                          playUiSound('tab');
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Code Viewer */}
                <div className="relative rounded-xl border border-border/70 bg-muted/40 p-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-border/40 mb-2">
                    <span className="text-muted-foreground text-[11px]">Format: {format.toUpperCase()}</span>
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={handleCopy}
                      className="h-7 px-2.5 text-[11px]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 mr-1 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" /> Copy Snippet
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="text-foreground/90 overflow-x-auto p-1 leading-relaxed selection:bg-primary/20 max-h-64">
                    <code>{getExportCode()}</code>
                  </pre>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/60 bg-muted/30 flex items-center justify-end">
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
