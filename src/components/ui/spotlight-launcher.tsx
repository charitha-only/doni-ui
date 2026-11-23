import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Search,
  Sparkles,
  Zap,
  BookOpen,
  Palette,
  Volume2,
  Copy,
  ArrowRight,
} from 'lucide-react';
import { Badge } from './badge';
import { playUiSound, toggleSound } from '@/lib/sound-effects';
import { useTheme } from '@/theme/theme-context';

interface QuickAction {
  id: string;
  title: string;
  category: 'Components' | 'Tools' | 'Preferences' | 'Documentation';
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const SpotlightLauncher: React.FC<{
  onNavigate?: (page: string) => void;
}> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggleMode, mode } = useTheme();

  const actions: QuickAction[] = [
    {
      id: 'docs',
      title: 'Documentation Manual & Guides',
      category: 'Documentation',
      shortcut: '⌘D',
      icon: BookOpen,
      action: () => {
        onNavigate?.('docs');
        setIsOpen(false);
      },
    },
    {
      id: 'components',
      title: 'Explore 60+ Animated Components',
      category: 'Components',
      shortcut: '⌘C',
      icon: Sparkles,
      action: () => {
        onNavigate?.('components');
        setIsOpen(false);
      },
    },
    {
      id: 'icons',
      title: 'Browse 1,000+ Vector Lucide Icons',
      category: 'Components',
      shortcut: '⌘I',
      icon: Zap,
      action: () => {
        onNavigate?.('icons');
        setIsOpen(false);
      },
    },
    {
      id: 'theme-mode',
      title: `Toggle Theme Mode (Currently: ${mode.toUpperCase()})`,
      category: 'Preferences',
      shortcut: 'M',
      icon: Palette,
      action: () => {
        toggleMode();
        playUiSound('chime');
        setIsOpen(false);
      },
    },
    {
      id: 'audio-toggle',
      title: 'Toggle Web Audio Micro-SFX',
      category: 'Preferences',
      shortcut: 'S',
      icon: Volume2,
      action: () => {
        toggleSound();
        setIsOpen(false);
      },
    },
    {
      id: 'copy-install',
      title: 'Copy CLI Setup (npx doni-ui init)',
      category: 'Tools',
      shortcut: 'Enter',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText('npx doni-ui init');
        playUiSound('success');
        setIsOpen(false);
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  // Global Hotkey (⌘+Space or Ctrl+Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        playUiSound('chime');
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % Math.max(1, filtered.length));
      playUiSound('tab');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length));
      playUiSound('tab');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
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
        className="fixed bottom-6 left-[905px] z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open Spotlight Quick Launcher 2.0 (⌘Space / Ctrl+Space)"
      >
        <Compass className="w-4 h-4 text-cyan-400" />
        <span className="hidden sm:inline">Spotlight</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v2.4.0</Badge>
      </button>

      {/* Modal Spotlight HUD */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-background/80 backdrop-blur-xl animate-in fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Search Header */}
              <div className="relative flex items-center px-4 py-3.5 border-b border-border/60 bg-muted/20">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or jump to component (⌘Space)..."
                  className="w-full bg-transparent text-sm font-medium focus:outline-none text-foreground placeholder:text-muted-foreground"
                />
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border text-muted-foreground">
                  ESC to close
                </kbd>
              </div>

              {/* Action List */}
              <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="p-8 text-center text-xs text-muted-foreground">
                    No matching commands or components found.
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          item.action();
                          playUiSound('click');
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                            : 'hover:bg-muted/40 text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg border ${
                            isSelected ? 'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground' : 'border-border/60 bg-muted/40 text-primary'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{item.title}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                              {item.category}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.shortcut && (
                            <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                              isSelected
                                ? 'bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground'
                                : 'bg-muted border-border text-muted-foreground'
                            }`}>
                              {item.shortcut}
                            </kbd>
                          )}
                          <ArrowRight className={`w-3.5 h-3.5 opacity-60 ${isSelected ? 'translate-x-0.5' : ''} transition-transform`} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-border/60 bg-muted/30 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="font-mono text-primary">↑↓</span> to navigate
                  <span className="font-mono text-primary ml-2">↵</span> to select
                </span>
                <span className="font-mono text-[10px]">Doni Spotlight 2.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
