import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Sparkles, Volume2, Moon, Search, Compass, Palette } from 'lucide-react';
import { Keycap } from './keycap';
import { Badge } from './badge';
import { transitions } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';

export interface ShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
  onToggleMode?: () => void;
  onToggleSound?: () => void;
  onSelectPreset?: (presetId: string) => void;
  onOpenCommandPalette?: () => void;
}

export const ShortcutsDialog: React.FC<ShortcutsDialogProps> = ({
  open,
  onClose,
  onNavigate,
  onToggleMode,
  onToggleSound,
  onSelectPreset,
  onOpenCommandPalette,
}) => {
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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={transitions.springGentle}
            className="relative w-full max-w-2xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shadow-glow">
                  <Keyboard className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold tracking-tight">Keyboard Shortcuts</h2>
                    <Badge variant="glow" className="text-[10px]">Power User</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Press any key or click keycaps to trigger actions</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playUiSound('click');
                  onClose();
                }}
                className="w-8 h-8 rounded-lg border border-border/60 hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Group 1: Navigation */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-primary" />
                  <span>Instant Navigation</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'H', label: 'Home Page', action: () => onNavigate?.('home') },
                    { key: 'D', label: 'Documentation', action: () => onNavigate?.('docs') },
                    { key: 'C', label: 'Components (55+)', action: () => onNavigate?.('components') },
                    { key: 'I', label: 'Animated Icons (1,000+)', action: () => onNavigate?.('icons') },
                    { key: 'V', label: 'Version History', action: () => onNavigate?.('versions') },
                    { key: 'A', label: 'About & Philosophy', action: () => onNavigate?.('about') },
                  ].map((item) => (
                    <div
                      key={item.key}
                      onClick={item.action}
                      className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                      <Keycap className="w-8 h-8 text-xs">{item.key}</Keycap>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 2: Theme & Audio Engine */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Palette className="w-3.5 h-3.5 text-primary" />
                  <span>Theme & Audio Controls</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div
                    onClick={onToggleMode}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                        Toggle Theme Mode
                      </span>
                    </div>
                    <Keycap className="w-8 h-8 text-xs">M</Keycap>
                  </div>

                  <div
                    onClick={onToggleSound}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                        Toggle UI Audio
                      </span>
                    </div>
                    <Keycap className="w-8 h-8 text-xs">S</Keycap>
                  </div>

                  <div className="p-2.5 rounded-xl border border-border/60 bg-muted/30 col-span-2 sm:col-span-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-foreground">
                        7 Presets Quick-Switch
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Keycap className="w-6 h-6 text-[10px]" onClick={() => onSelectPreset?.('cyber-cyan')}>1</Keycap>
                      <span className="text-xs text-muted-foreground self-center">-</span>
                      <Keycap className="w-6 h-6 text-[10px]" onClick={() => onSelectPreset?.('acid-lime')}>7</Keycap>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group 3: Global System */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Search className="w-3.5 h-3.5 text-primary" />
                  <span>Global Controls</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={onOpenCommandPalette}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                      Command Palette
                    </span>
                    <div className="flex gap-1">
                      <Keycap className="w-7 h-7 text-[10px]">⌘</Keycap>
                      <Keycap className="w-7 h-7 text-[10px]">K</Keycap>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      playUiSound('chime');
                    }}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                      Shortcuts Cheat-Sheet
                    </span>
                    <Keycap className="w-8 h-8 text-xs">?</Keycap>
                  </div>

                  <div
                    onClick={onClose}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                      Dismiss / Close Modal
                    </span>
                    <Keycap className="w-10 h-8 text-[10px]">Esc</Keycap>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border/60 bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono text-[11px]">Tip: Press Shift + / anywhere to show this overlay</span>
              <button
                type="button"
                onClick={() => {
                  playUiSound('click');
                  onClose();
                }}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                Close (Esc)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
