import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Copy,
  Check,
  BookOpen,
  Zap,
  Palette,
  Shield,
  Code,
  Sliders,
  Cpu,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { transitions } from '@/lib/utils';
import { useToast } from '../ui/toast';

export const DocsView: React.FC = () => {
  const { toast } = useToast();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedPm, setSelectedPm] = useState<'npm' | 'yarn' | 'pnpm' | 'bun'>('npm');

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    toast({
      title: 'Copied to clipboard!',
      description: label,
      type: 'success',
    });
    setTimeout(() => setCopiedText(null), 2000);
  };

  const installCmds = {
    npm: 'npm install doni-ui framer-motion clsx tailwind-merge',
    yarn: 'yarn add doni-ui framer-motion clsx tailwind-merge',
    pnpm: 'pnpm add doni-ui framer-motion clsx tailwind-merge',
    bun: 'bun add doni-ui framer-motion clsx tailwind-merge',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.smoothEase}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12"
    >
      {/* Docs Header */}
      <div className="text-center space-y-3">
        <Badge variant="glow" withPulse className="px-3 py-1 text-xs">
          📖 Official Documentation
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Getting Started with <span className="text-primary">Doni UI</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          Everything you need to build hyper-fast, spring-animated, accessible React interfaces with zero runtime style overhead.
        </p>
      </div>

      {/* 1. Installation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">1. Quick Installation</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Install Doni UI and peer dependencies using your preferred package manager:
        </p>

        <Card className="p-4 bg-card/80 border-border/80">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-3">
            <div className="flex gap-2">
              {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setSelectedPm(pm)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                    selectedPm === pm
                      ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(installCmds[selectedPm], `${selectedPm} install command`)}
            >
              {copiedText === installCmds[selectedPm] ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="ml-1 text-xs">Copy</span>
            </Button>
          </div>
          <pre className="font-mono text-sm text-primary overflow-x-auto p-2">
            <code>{installCmds[selectedPm]}</code>
          </pre>
        </Card>
      </section>

      {/* 2. CLI Usage */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">2. CLI Setup (shadcn/ui workflow)</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Use the Doni UI CLI to initialize configuration or copy components directly into your codebase:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">Initialize</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => copy('npx doni-ui init', 'CLI init')}
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
              <p className="font-mono text-sm text-primary font-bold">npx doni-ui init</p>
              <p className="text-xs text-muted-foreground mt-2">
                Sets up Tailwind CSS variables, theme configuration, and utility helpers in your project.
              </p>
            </div>
          </Card>

          <Card className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">Add Component</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => copy('npx doni-ui add tubelight-navbar', 'CLI add component')}
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
              <p className="font-mono text-sm text-primary font-bold">npx doni-ui add &lt;component&gt;</p>
              <p className="text-xs text-muted-foreground mt-2">
                Copies full source code with TypeScript types into your <code className="bg-muted px-1 rounded text-[11px]">src/components/ui/</code> directory.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Dynamic Any-Color Theming Engine */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">3. Instant Dynamic Any-Color Engine</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Wrap your root layout with <code className="text-primary font-mono text-xs">ThemeProvider</code>. All Doni UI components dynamically react to runtime hex changes instantly without re-rendering CSS:
        </p>

        <Card className="p-5 bg-card/90">
          <pre className="font-mono text-xs sm:text-sm text-foreground overflow-x-auto leading-relaxed">
{`import React from 'react';
import { ThemeProvider, useTheme, Button } from 'doni-ui';

export function App() {
  return (
    <ThemeProvider defaultMode="dark" defaultPreset="neon-violet">
      <MainScreen />
    </ThemeProvider>
  );
}

function MainScreen() {
  const { setCustomHex, mode, toggleMode } = useTheme();

  return (
    <div>
      {/* Pick ANY hex color at runtime! */}
      <input 
        type="color" 
        onChange={(e) => setCustomHex(e.target.value)} 
      />
      <Button variant="glow" onClick={toggleMode}>
        Toggle {mode === 'dark' ? 'Light' : 'Dark'}
      </Button>
    </div>
  );
}`}
          </pre>
        </Card>
      </section>

      {/* 4. Architecture & Benchmarks */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">4. 0ms Runtime Style Evaluation</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Why is Doni UI significantly faster than traditional libraries like MUI or Chakra UI?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 border-border/80">
            <Zap className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-bold text-base">0ms Runtime Overhead</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Styles are mapped to CSS custom properties (<code className="bg-muted px-1 rounded text-[11px]">--primary</code>). No runtime Emotion or styled-components parse phase.
            </p>
          </Card>

          <Card className="p-5 border-border/80">
            <Sliders className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-bold text-base">120 FPS Compositor</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Hardware-accelerated CSS GPU transforms (<code className="bg-muted px-1 rounded text-[11px]">transform</code>, <code className="bg-muted px-1 rounded text-[11px]">opacity</code>) prevent browser layout recalculation.
            </p>
          </Card>

          <Card className="p-5 border-border/80">
            <Shield className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-bold text-base">100% Tree-Shakeable</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Configured with <code className="bg-muted px-1 rounded text-[11px]">"sideEffects": false</code>. Bundlers eliminate any component you don't import.
            </p>
          </Card>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">5. FAQ & Troubleshooting</h2>
        </div>

        <div className="space-y-3">
          <Card className="p-4">
            <h4 className="font-bold text-sm">Can I use Doni UI in Next.js 14 / 15 App Router?</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Yes! Because animated components use Framer Motion client hooks, simply add <code className="bg-muted px-1 rounded text-[11px]">'use client'</code> at the top of your component or wrapper file.
            </p>
          </Card>

          <Card className="p-4">
            <h4 className="font-bold text-sm">Can I customize colors without modifying source code?</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Absolutely. You can override CSS variables in your <code className="bg-muted px-1 rounded text-[11px]">index.css</code> or pass any hex dynamically using <code className="bg-muted px-1 rounded text-[11px]">setCustomHex('#yourhex')</code>.
            </p>
          </Card>

          <Card className="p-4">
            <h4 className="font-bold text-sm">Are the animated icons accessible?</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Yes, all icons accept standard ARIA attributes (<code className="bg-muted px-1 rounded text-[11px]">aria-label</code>, <code className="bg-muted px-1 rounded text-[11px]">role="img"</code>), and keyboard focus handlers.
            </p>
          </Card>
        </div>
      </section>
    </motion.div>
  );
};
