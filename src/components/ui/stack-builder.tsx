import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Sparkles,
  Copy,
  Check,
  X,
  Trash2,
  Terminal,
  Code2,
  Package,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { transitions } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';

export interface StackBuilderProps {
  stack: string[];
  onRemove: (name: string) => void;
  onClear: () => void;
  onAdd: (name: string) => void;
}

const STORAGE_KEY = 'doni_ui_stack';

export const useComponentStack = () => {
  const [stack, setStack] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['Button', 'Card', 'Badge', 'SpotlightCard', 'FlameButton'];
    } catch {
      return ['Button', 'Card', 'Badge', 'SpotlightCard', 'FlameButton'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
    } catch (e) {
      console.error(e);
    }
  }, [stack]);

  const add = (name: string) => {
    if (!stack.includes(name)) {
      setStack((prev) => [...prev, name]);
      playUiSound('pop');
    }
  };

  const remove = (name: string) => {
    setStack((prev) => prev.filter((item) => item !== name));
    playUiSound('click');
  };

  const clear = () => {
    setStack([]);
    playUiSound('switch');
  };

  return { stack, add, remove, clear };
};

export const StackBuilder: React.FC<StackBuilderProps> = ({
  stack,
  onRemove,
  onClear,
}) => {
  const [open, setOpen] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedImport, setCopiedImport] = useState(false);

  // Convert component names to CLI kebab-case
  const toKebab = (str: string) =>
    str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

  const cliCommand =
    stack.length > 0
      ? `npx doni-ui add ${stack.map(toKebab).join(' ')}`
      : 'npx doni-ui init';

  const importStatement =
    stack.length > 0
      ? `import { ${stack.join(', ')} } from 'doni-ui';`
      : `import { Button } from 'doni-ui';`;

  // Approximate compressed bundle size (avg 2.8 KB per component)
  const estGzipSize = (stack.length * 2.8).toFixed(1);

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    playUiSound('success');
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleCopyImport = () => {
    navigator.clipboard.writeText(importStatement);
    setCopiedImport(true);
    playUiSound('success');
    setTimeout(() => setCopiedImport(false), 2000);
  };

  return (
    <>
      {/* Floating Bottom-Left Trigger Pill */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          type="button"
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          transition={transitions.springGentle}
          onClick={() => {
            setOpen((prev) => !prev);
            playUiSound('chime');
          }}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-card/90 border border-primary/40 text-foreground shadow-glow backdrop-blur-md cursor-pointer group"
          title="Open Component Stack & Quick Bundle Exporter"
        >
          <div className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold font-sans">
            My Stack
          </span>
          <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-mono text-[10px] font-bold">
            {stack.length}
          </span>
        </motion.button>
      </div>

      {/* Modal Drawer Dialog */}
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
                setOpen(false);
              }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={transitions.springGentle}
              className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/70 bg-muted/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shadow-glow">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-foreground">My Component Stack</h3>
                      <Badge variant="glow" className="text-[10px]">v1.2.0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      {stack.length} components selected • ~{estGzipSize} kB est. gzip
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {stack.length > 0 && (
                    <button
                      type="button"
                      onClick={onClear}
                      className="px-2 py-1 text-[11px] rounded-lg border border-border/60 hover:border-red-500/50 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Clear Stack"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound('click');
                      setOpen(false);
                    }}
                    className="w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Component Badges */}
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Selected Components ({stack.length})
                  </span>
                  {stack.length === 0 ? (
                    <div className="p-6 text-center rounded-xl border border-dashed border-border mt-2">
                      <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-xs text-muted-foreground">No components in your stack yet. Browse the gallery and click &quot;+ Stack&quot; to bookmark!</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {stack.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-primary/30 bg-primary/10 text-foreground text-xs font-mono font-medium shadow-xs"
                        >
                          <Sparkles className="w-3 h-3 text-primary" />
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => onRemove(item)}
                            className="text-muted-foreground hover:text-red-400 cursor-pointer ml-0.5"
                            title={`Remove ${item}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* CLI Command Generator */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-primary" />
                      CLI Batch Install Command
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyCli}
                      className="h-6 text-[11px] px-2"
                      disabled={stack.length === 0}
                    >
                      {copiedCli ? (
                        <>
                          <Check className="w-3 h-3 mr-1 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy CLI
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="p-3 rounded-xl bg-muted/40 border border-border/70 font-mono text-xs text-foreground overflow-x-auto select-all">
                    <code>{cliCommand}</code>
                  </pre>
                </div>

                {/* Import Statement */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-muted-foreground flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-primary" />
                      Single Import Statement
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyImport}
                      className="h-6 text-[11px] px-2"
                      disabled={stack.length === 0}
                    >
                      {copiedImport ? (
                        <>
                          <Check className="w-3 h-3 mr-1 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy Import
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="p-3 rounded-xl bg-muted/40 border border-border/70 font-mono text-xs text-foreground overflow-x-auto select-all">
                    <code>{importStatement}</code>
                  </pre>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-border/60 bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
                <span>0ms runtime overhead • 100% Tree-shakable</span>
                <span className="font-mono text-primary font-bold">Doni UI v1.2.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
