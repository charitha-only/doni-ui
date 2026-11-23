import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Type,
  Sparkles,
  Copy,
  Check,
  X,
  Play,
  RotateCcw,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Slider } from './slider';
import { playUiSound } from '@/lib/sound-effects';

export type GlyphMode = 'cyber' | 'binary' | 'ascii' | 'hex';

const GLYPH_SETS: Record<GlyphMode, string> = {
  cyber: 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789!@#$%^&*<>[]{}',
  binary: '01',
  ascii: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  hex: '0123456789ABCDEFabcdef',
};

export const KineticTypeStudio: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState('DONI UI NEXT-GEN 2.3');
  const [displayText, setDisplayText] = useState('DONI UI NEXT-GEN 2.3');
  const [glyphMode, setGlyphMode] = useState<GlyphMode>('cyber');
  const [speed, setSpeed] = useState([35]); // ms per cycle
  const [isScrambling, setIsScrambling] = useState(false);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);
    playUiSound('switch');

    const target = textInput;
    const glyphs = GLYPH_SETS[glyphMode];
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        target
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return target[idx];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
        playUiSound('pop');
      }
      iteration += 1 / 3;
    }, speed[0]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const copyComponentCode = () => {
    const snippet = `// Doni UI Kinetic Text Scramble Component
import React, { useState, useEffect } from 'react';

export function TextScramble({ text = "${textInput}", speed = ${speed[0]} }) {
  const [display, setDisplay] = useState(text);
  const glyphs = "${GLYPH_SETS[glyphMode].substring(0, 20)}";

  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((c, i) => (i < iter ? text[i] : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join('')
      );
      if (iter >= text.length) clearInterval(interval);
      iter += 1 / 3;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className="font-mono tracking-wider">{display}</span>;
}`;
    navigator.clipboard.writeText(snippet);
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
        className="fixed bottom-6 left-[795px] z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open Kinetic Typography & Text Scramble Studio (v2.3.0)"
      >
        <Type className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">Type FX</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v2.3.0</Badge>
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
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-glow">
                    <Type className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">Kinetic Typography &amp; Text FX</h3>
                      <Badge variant="glow" className="text-[10px]">v2.3.0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Matrix decode text scrambler, cyber glyph streams &amp; kinetic typography</p>
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
                {/* Live Display Stage */}
                <div className="relative min-h-[160px] rounded-2xl border border-border/80 bg-gradient-to-b from-card/80 to-card/40 flex flex-col items-center justify-center p-6 overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  <motion.div
                    key={displayText}
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 text-2xl sm:text-3xl font-extrabold font-mono tracking-wider text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-indigo-400 select-all"
                  >
                    {displayText}
                  </motion.div>

                  <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Active Glyph Set: {glyphMode.toUpperCase()}</span>
                  </div>

                  <div className="absolute top-2 right-2">
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={triggerScramble}
                      disabled={isScrambling}
                      className="h-7 text-xs"
                    >
                      {isScrambling ? <RotateCcw className="w-3 h-3 mr-1 animate-spin" /> : <Play className="w-3 h-3 mr-1" />}
                      {isScrambling ? 'Decoding...' : 'Run Decode FX'}
                    </Button>
                  </div>
                </div>

                {/* Input text */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                    Target Text String
                  </label>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => {
                      setTextInput(e.target.value);
                      setDisplayText(e.target.value);
                    }}
                    placeholder="Enter headline or label..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 bg-background/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-mono"
                  />
                </div>

                {/* Glyph Sets */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                    Scramble Glyphs Matrix
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'cyber', label: 'Cyber Matrix', desc: 'Katakana & runes' },
                      { id: 'binary', label: 'Raw Binary', desc: '0 & 1 bits' },
                      { id: 'hex', label: 'Hex Codec', desc: '0x00 - 0xFF' },
                      { id: 'ascii', label: 'Full ASCII', desc: 'Alphanumeric' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          setGlyphMode(g.id as GlyphMode);
                          playUiSound('tab');
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          glyphMode === g.id
                            ? 'border-primary bg-primary/10 text-primary font-bold shadow-xs'
                            : 'border-border/60 text-muted-foreground hover:border-border hover:text-foreground'
                        }`}
                      >
                        <div className="text-xs font-bold capitalize">{g.label}</div>
                        <div className="text-[10px] text-muted-foreground">{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed Slider */}
                <div className="space-y-1.5 bg-muted/20 p-3 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">Decode Cycle Speed</span>
                    <span className="font-mono text-primary font-bold">{speed[0]} ms</span>
                  </div>
                  <Slider value={speed} onValueChange={setSpeed} min={15} max={80} step={5} />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                    <span>Ultra Fast (15ms)</span>
                    <span>Deliberate (80ms)</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/60 bg-muted/30 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyComponentCode}
                  className="gap-1.5 text-xs h-8"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Component Copied!' : 'Export React Component'}
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
