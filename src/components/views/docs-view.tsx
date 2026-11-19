import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  BookOpen,
  Zap,
  Palette,
  Shield,
  Sliders,
  Volume2,
  Keyboard,
  Search,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Globe,
  FileCode,
  Boxes,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { transitions, cn } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';

export interface DocCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  items: {
    id: string;
    title: string;
    badge?: string;
  }[];
}

export const DocsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('getting-started');
  const [activeItem, setActiveItem] = useState<string>('quickstart');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPm, setSelectedPm] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');
  const [selectedFramework, setSelectedFramework] = useState<'nextjs' | 'vite' | 'remix'>('nextjs');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [mobileTopicsOpen, setMobileTopicsOpen] = useState(false);

  const copy = (text: string, _label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    playUiSound('success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const categories: DocCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      items: [
        { id: 'quickstart', title: 'Quickstart & Installation' },
        { id: 'cli', title: 'CLI Setup (init & add)' },
        { id: 'architecture', title: 'Architecture & 0ms Runtime' },
      ],
    },
    {
      id: 'frameworks',
      title: 'Framework Guides',
      icon: Globe,
      badge: 'Popular',
      items: [
        { id: 'nextjs', title: 'Next.js 14 / 15 (App Router)' },
        { id: 'vite', title: 'Vite & React 18 / 19' },
        { id: 'remix', title: 'Remix & Astro Setup' },
      ],
    },
    {
      id: 'theming',
      title: 'Dynamic Any-Color Engine',
      icon: Palette,
      badge: 'Signature',
      items: [
        { id: 'theme-provider', title: 'ThemeProvider & Context' },
        { id: 'custom-colors', title: 'Runtime Any-Hex Studio' },
        { id: 'tailwind-tokens', title: 'Tailwind CSS Variables' },
      ],
    },
    {
      id: 'audio',
      title: 'Procedural Audio Engine',
      icon: Volume2,
      badge: 'v0.6.0',
      items: [
        { id: 'sound-engine', title: 'Web Audio API Synth' },
        { id: 'sound-triggers', title: 'Tactile Sound Profiles' },
      ],
    },
    {
      id: 'navigation',
      title: 'Keyboard & Navigation',
      icon: Keyboard,
      badge: 'v0.7.0',
      items: [
        { id: 'shortcuts-engine', title: 'Global Hotkeys & Keycaps' },
      ],
    },
    {
      id: 'components-guide',
      title: 'Components Guide (55+)',
      icon: Boxes,
      items: [
        { id: 'core-components', title: 'Core UI Foundation' },
        { id: 'data-components', title: 'Data & App Components' },
        { id: 'widgets-kpis', title: 'Widgets, KPIs & Gauges' },
        { id: 'showstoppers', title: 'Showstoppers & 3D Cards' },
      ],
    },
    {
      id: 'icons-guide',
      title: 'Animated Icons (1,000+)',
      icon: Sparkles,
      badge: '1,000+',
      items: [
        { id: 'icons-usage', title: 'Vector Icons Integration' },
        { id: 'icons-customizer', title: 'Live Icon Studio & Props' },
      ],
    },
    {
      id: 'templates-guide',
      title: 'Page Templates Hub',
      icon: FileCode,
      badge: 'v0.9.0',
      items: [
        { id: 'templates-usage', title: 'Pre-built SaaS & AI Blocks' },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'FAQ & Troubleshooting',
      icon: HelpCircle,
      items: [
        { id: 'faq', title: 'Frequently Asked Questions' },
      ],
    },
  ];

  const installCmds = {
    npm: 'npm install doni-ui framer-motion clsx tailwind-merge lucide-react',
    pnpm: 'pnpm add doni-ui framer-motion clsx tailwind-merge lucide-react',
    yarn: 'yarn add doni-ui framer-motion clsx tailwind-merge lucide-react',
    bun: 'bun add doni-ui framer-motion clsx tailwind-merge lucide-react',
  };

  // Filter categories based on search
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  // Navigate to previous / next topic
  const allItemsList = categories.flatMap((cat) =>
    cat.items.map((it) => ({ catId: cat.id, itemId: it.id, itemTitle: it.title, catTitle: cat.title }))
  );
  const currentIdx = allItemsList.findIndex((x) => x.itemId === activeItem);
  const prevItem = currentIdx > 0 ? allItemsList[currentIdx - 1] : null;
  const nextItem = currentIdx < allItemsList.length - 1 ? allItemsList[currentIdx + 1] : null;

  const navigateTo = (catId: string, itemId: string) => {
    setActiveCategory(catId);
    setActiveItem(itemId);
    setMobileTopicsOpen(false);
    playUiSound('tab');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Documentation Top Hero Banner */}
      <div className="relative rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/50 to-background p-8 sm:p-12 overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="glow" withPulse className="px-3 py-1 text-xs">
              📖 Documentation Suite
            </Badge>
            <Badge variant="outline" className="text-xs">
              Categorized &amp; Step-by-Step
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
            Build Faster with <span className="text-primary">Doni UI</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A comprehensive, structured developer manual for high-speed, physics-driven React interfaces with zero runtime style overhead, dynamic color engine, procedural audio, and 1,000+ vector animated icons.
          </p>

          {/* Quick Search */}
          <div className="pt-2 relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter topics (e.g. Next.js, Theming, CLI, Audio)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/80 bg-background/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Mobile Category / Topic Quick Switcher (visible on < lg screens) */}
      <div className="lg:hidden w-full bg-card/80 border border-border/80 rounded-2xl p-3 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <div className="text-xs">
              <span className="text-muted-foreground font-medium">Topic: </span>
              <span className="font-bold text-foreground">
                {allItemsList.find((x) => x.itemId === activeItem)?.itemTitle || 'Select Topic'}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMobileTopicsOpen(!mobileTopicsOpen);
              playUiSound('pop');
            }}
            className="text-xs h-7 px-2.5 cursor-pointer"
          >
            {mobileTopicsOpen ? 'Hide Menu' : 'Browse Topics'}
          </Button>
        </div>

        {/* Collapsible Mobile Topics Menu */}
        {mobileTopicsOpen && (
          <div className="pt-2 border-t border-border/60 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                  {cat.title}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {cat.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigateTo(cat.id, item.id)}
                      className={cn(
                        'px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer',
                        activeItem === item.id
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : 'bg-muted/30 text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Documentation 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Categorized Navigation Sidebar (Hidden on mobile, sticky on desktop) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span>Categories &amp; Guide</span>
              </span>
              <span className="text-[10px] font-mono text-primary font-bold">55+ Components</span>
            </div>

            <nav className="space-y-6 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
              {filteredCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="flex items-center justify-between px-2 py-1 text-xs font-bold text-foreground/90">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <span>{cat.title}</span>
                      </div>
                      {cat.badge && (
                        <Badge variant="glow" className="text-[9px] px-1.5 py-0 h-4">
                          {cat.badge}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1 pl-4 border-l border-border/60 ml-2">
                      {cat.items.map((item) => {
                        const isSelected = activeItem === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => navigateTo(cat.id, item.id)}
                            className={cn(
                              'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer',
                              isSelected
                                ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            )}
                          >
                            <span className="truncate">{item.title}</span>
                            {isSelected && <ArrowRight className="w-3 h-3 ml-1 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Column: Detailed Categorized Content */}
        <main className="lg:col-span-8 space-y-8">
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium pb-2 border-b border-border/60">
            <span className="text-primary font-bold">Docs</span>
            <span>/</span>
            <span>{categories.find((c) => c.id === activeCategory)?.title || 'Guide'}</span>
            <span>/</span>
            <span className="text-foreground font-semibold">
              {allItemsList.find((x) => x.itemId === activeItem)?.itemTitle || 'Topic'}
            </span>
          </div>

          {/* ========================================================================= */}
          {/* TOPIC 1: QUICKSTART & INSTALLATION                                       */}
          {/* ========================================================================= */}
          {activeItem === 'quickstart' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Quickstart &amp; Installation</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Install Doni UI and peer dependencies into your existing or fresh React project.
                </p>
              </div>

              {/* Package Manager Selector Box */}
              <Card className="p-5 bg-card/80 border-border/80 space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div className="flex gap-1.5 bg-muted/40 p-1 rounded-xl">
                    {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => {
                          setSelectedPm(pm);
                          playUiSound('switch');
                        }}
                        className={cn(
                          'px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer',
                          selectedPm === pm
                            ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="glow"
                    size="sm"
                    onClick={() => copy(installCmds[selectedPm], `${selectedPm} installation command`)}
                    className="h-8"
                  >
                    {copiedCode === installCmds[selectedPm] ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        Copy Command
                      </>
                    )}
                  </Button>
                </div>

                <div className="font-mono text-xs sm:text-sm text-primary overflow-x-auto p-2 bg-muted/30 rounded-lg">
                  <code>{installCmds[selectedPm]}</code>
                </div>
              </Card>

              {/* Core Features Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <Card className="p-4 border-border/70 space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm">0ms Style Cost</h4>
                  <p className="text-xs text-muted-foreground">
                    Native Tailwind CSS custom properties. Zero runtime css-in-js parse cost.
                  </p>
                </Card>

                <Card className="p-4 border-border/70 space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm">GPU Spring Physics</h4>
                  <p className="text-xs text-muted-foreground">
                    Fluid 120 FPS natural momentum with Framer Motion spring curves.
                  </p>
                </Card>

                <Card className="p-4 border-border/70 space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Palette className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm">Any-Hex Engine</h4>
                  <p className="text-xs text-muted-foreground">
                    Switch between 7 presets or inject any 6-digit hex color at runtime instantly.
                  </p>
                </Card>
              </div>

              {/* Basic Usage Example */}
              <div className="space-y-3 pt-4">
                <h3 className="text-lg font-bold">First Component Import</h3>
                <div className="relative rounded-xl border border-border/80 bg-muted/30 p-4 font-mono text-xs">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copy(
                        `import { Button, FlameButton, Badge } from 'doni-ui';\n\nexport function MyHero() {\n  return (\n    <div className="space-y-4">\n      <Badge variant="glow">✨ Ready</Badge>\n      <FlameButton>Ignite App</FlameButton>\n    </div>\n  );\n}`,
                        'Basic usage snippet'
                      )
                    }
                    className="absolute right-3 top-3 h-7 px-2 text-[11px]"
                  >
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copy
                  </Button>
                  <pre className="text-foreground/90 overflow-x-auto leading-relaxed">
{`import { Button, FlameButton, Badge } from 'doni-ui';

export function MyHero() {
  return (
    <div className="space-y-4">
      <Badge variant="glow">✨ Ready</Badge>
      <FlameButton>Ignite App</FlameButton>
    </div>
  );
}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 2: CLI SETUP                                                        */}
          {/* ========================================================================= */}
          {activeItem === 'cli' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Doni UI CLI Workflow</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Own your component source code with shadcn-style CLI commands.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-5 flex flex-col justify-between border-border/80">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="glow">1. Initialize</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copy('npx doni-ui init', 'CLI init command')}
                      >
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <code className="text-sm font-bold text-primary font-mono block">npx doni-ui init</code>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      Automatically configures Tailwind CSS color variables, font families, keyframe animations, and utils helper files in your project.
                    </p>
                  </div>
                </Card>

                <Card className="p-5 flex flex-col justify-between border-border/80">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">2. Add Component</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copy('npx doni-ui add flame-button', 'CLI add component')}
                      >
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <code className="text-sm font-bold text-primary font-mono block">
                      npx doni-ui add &lt;component&gt;
                    </code>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      Directly downloads full TypeScript component source into your <code className="bg-muted px-1.5 py-0.5 rounded text-[11px]">src/components/ui/</code> folder for complete customization.
                    </p>
                  </div>
                </Card>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold">Supported CLI Component Targets</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    'data-table',
                    'file-upload',
                    'stepper',
                    'drawer',
                    'breadcrumbs',
                    'carousel',
                    'color-picker',
                    'rating',
                    'progress',
                    'stat-card',
                    'timeline',
                    'flame-button',
                    'confetti-button',
                    'tubelight-navbar',
                    'spotlight-card',
                    'command-palette',
                    'bento-grid',
                    'shortcuts-dialog',
                  ].map((comp) => (
                    <button
                      key={comp}
                      type="button"
                      onClick={() => copy(`npx doni-ui add ${comp}`, `Copy add ${comp}`)}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-muted/50 border border-border/70 hover:border-primary text-muted-foreground hover:text-foreground transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{comp}</span>
                      <Copy className="w-2.5 h-2.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 3: FRAMEWORK GUIDES                                                 */}
          {/* ========================================================================= */}
          {(activeItem === 'nextjs' || activeItem === 'vite' || activeItem === 'remix') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">Framework Integration</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Step-by-step setup for modern React application frameworks.
                  </p>
                </div>

                {/* Framework Selector Pills */}
                <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border/60">
                  {[
                    { id: 'nextjs', label: 'Next.js 14/15' },
                    { id: 'vite', label: 'Vite / React' },
                    { id: 'remix', label: 'Remix / Astro' },
                  ].map((fw) => (
                    <button
                      key={fw.id}
                      type="button"
                      onClick={() => {
                        setSelectedFramework(fw.id as any);
                        setActiveItem(fw.id);
                        playUiSound('tab');
                      }}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                        selectedFramework === fw.id
                          ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {fw.label}
                    </button>
                  ))}
                </div>
              </div>

              {selectedFramework === 'nextjs' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <span className="font-bold text-foreground">App Router &amp; Server Components Compatible:</span>
                      <p className="text-muted-foreground">
                        Framer Motion animated components operate seamlessly in Next.js. Simply mark animated wrapper components with <code className="text-primary font-mono font-bold">'use client'</code> at the top.
                      </p>
                    </div>
                  </div>

                  <Card className="p-5 bg-card/90 space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">app/layout.tsx</span>
                    <pre className="font-mono text-xs sm:text-sm text-foreground overflow-x-auto leading-relaxed">
{`import type { Metadata } from 'next';
import { ThemeProvider } from 'doni-ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Doni App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider defaultPreset="cyber-cyan" defaultMode="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}
                    </pre>
                  </Card>
                </div>
              )}

              {selectedFramework === 'vite' && (
                <div className="space-y-4">
                  <Card className="p-5 bg-card/90 space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">src/main.tsx</span>
                    <pre className="font-mono text-xs sm:text-sm text-foreground overflow-x-auto leading-relaxed">
{`import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'doni-ui';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultPreset="cyber-cyan" defaultMode="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);`}
                    </pre>
                  </Card>
                </div>
              )}

              {selectedFramework === 'remix' && (
                <div className="space-y-4">
                  <Card className="p-5 bg-card/90 space-y-2">
                    <span className="text-xs font-mono text-muted-foreground">app/root.tsx</span>
                    <pre className="font-mono text-xs sm:text-sm text-foreground overflow-x-auto leading-relaxed">
{`import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { ThemeProvider } from 'doni-ui';
import './tailwind.css';

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider defaultPreset="cyber-cyan">
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}`}
                    </pre>
                  </Card>
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 4: DYNAMIC ANY-COLOR ENGINE                                         */}
          {/* ========================================================================= */}
          {(activeItem === 'theme-provider' || activeItem === 'custom-colors' || activeItem === 'tailwind-tokens') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Dynamic Any-Color Engine</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Experience instant runtime color switching to any hex color without css rebuilds.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="font-bold text-xs text-foreground">How it works behind the scenes:</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When you call <code className="text-primary font-mono font-bold">setCustomHex('#hex')</code>, Doni UI mathematically converts the hex code into exact HSL color channels and injects CSS variables (<code className="text-primary font-mono">--primary</code>, <code className="text-primary font-mono">--ring</code>, <code className="text-primary font-mono">--glow</code>) straight into the root DOM node. All 55+ components update in 0ms!
                </p>
              </div>

              {/* Live Theme Code Snippet */}
              <Card className="p-5 bg-card/90 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-xs font-mono text-muted-foreground">Interactive Theming in React</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copy(
                        `import { useTheme } from 'doni-ui';\n\nexport function ThemeSwitcher() {\n  const { setPreset, setCustomHex, mode, toggleMode } = useTheme();\n\n  return (\n    <div>\n      <button onClick={() => setPreset('cyber-cyan')}>Cyber Cyan</button>\n      <button onClick={() => setPreset('lush-emerald')}>Lush Emerald</button>\n      <input type="color" onChange={(e) => setCustomHex(e.target.value)} />\n      <button onClick={toggleMode}>Toggle {mode}</button>\n    </div>\n  );\n}`,
                        'Theming hook snippet'
                      )
                    }
                  >
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="font-mono text-xs sm:text-sm text-foreground overflow-x-auto leading-relaxed">
{`import { useTheme, Button } from 'doni-ui';

export function ThemeSwitcher() {
  const { setPreset, setCustomHex, mode, toggleMode } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* Pick one of 7 curated designer presets */}
      <Button onClick={() => setPreset('cyber-cyan')}>Cyber Cyan</Button>
      <Button onClick={() => setPreset('lush-emerald')}>Lush Emerald</Button>

      {/* Or pass ANY arbitrary 6-character hex code */}
      <input 
        type="color" 
        onChange={(e) => setCustomHex(e.target.value)} 
      />

      {/* Toggle Light / Dark Mode */}
      <Button variant="outline" onClick={toggleMode}>
        Mode: {mode}
      </Button>
    </div>
  );
}`}
                </pre>
              </Card>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 5: PROCEDURAL AUDIO ENGINE (v0.6.0)                                 */}
          {/* ========================================================================= */}
          {(activeItem === 'sound-engine' || activeItem === 'sound-triggers') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Procedural Micro-Sound Audio Engine</h2>
                <Badge variant="glow" className="mt-2 text-xs">New in v0.6.0</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Zero-byte synthesized sound effects powered by native Web Audio API oscillators.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { type: 'click', label: 'Click', desc: 'Crisp mechanical switch' },
                  { type: 'pop', label: 'Pop', desc: 'Bubbly toggle / check' },
                  { type: 'chime', label: 'Chime', desc: '4-tone harmonic chord' },
                  { type: 'switch', label: 'Switch', desc: 'Tactile slider snap' },
                  { type: 'tab', label: 'Tab', desc: 'Soft page selection blip' },
                  { type: 'success', label: 'Success', desc: 'Euphoric 2-tone chime' },
                ].map((s) => (
                  <Card
                    key={s.type}
                    onClick={() => playUiSound(s.type as any)}
                    className="p-3.5 border-border/80 hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors capitalize">
                        {s.label}
                      </span>
                      <Volume2 className="w-3.5 h-3.5 text-primary opacity-70 group-hover:opacity-100" />
                    </div>
                    <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                    <span className="text-[10px] text-primary/80 font-mono mt-2 block">
                      Click to Test 🔊
                    </span>
                  </Card>
                ))}
              </div>

              <Card className="p-5 bg-card/90 space-y-2">
                <span className="text-xs font-mono text-muted-foreground">Using in your own React code:</span>
                <pre className="font-mono text-xs sm:text-sm text-foreground overflow-x-auto leading-relaxed">
{`import { playUiSound, toggleSound, isSoundEnabled } from 'doni-ui';

export function InteractiveButtons() {
  return (
    <div className="flex gap-2">
      <button onClick={() => playUiSound('click')}>Click Me</button>
      <button onClick={() => playUiSound('chime')}>Theme Select</button>
      <button onClick={() => playUiSound('success')}>Save Changes</button>
      <button onClick={toggleSound}>Toggle Audio</button>
    </div>
  );
}`}
                </pre>
              </Card>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 6: KEYBOARD & SHORTCUTS (v0.7.0)                                     */}
          {/* ========================================================================= */}
          {activeItem === 'shortcuts-engine' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Global Keyboard Shortcuts Engine</h2>
                <Badge variant="glow" className="mt-2 text-xs">New in v0.7.0</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Built-in power-user hotkeys and 3D Keycap Cheat-Sheet overlay.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 border-border/80 space-y-2">
                  <h4 className="font-bold text-sm text-foreground">Navigation Hotkeys</h4>
                  <ul className="text-xs text-muted-foreground space-y-1.5 font-mono">
                    <li><span className="text-primary font-bold">H</span> → Home Page</li>
                    <li><span className="text-primary font-bold">D</span> → Documentation</li>
                    <li><span className="text-primary font-bold">C</span> → Components Gallery</li>
                    <li><span className="text-primary font-bold">T</span> → Page Templates</li>
                    <li><span className="text-primary font-bold">I</span> → 1,000+ Icons</li>
                    <li><span className="text-primary font-bold">V</span> → Version Releases</li>
                  </ul>
                </Card>

                <Card className="p-4 border-border/80 space-y-2">
                  <h4 className="font-bold text-sm text-foreground">Controls &amp; Overlays</h4>
                  <ul className="text-xs text-muted-foreground space-y-1.5 font-mono">
                    <li><span className="text-primary font-bold">?</span> or <span className="text-primary font-bold">Shift+/</span> → Shortcuts Overlay</li>
                    <li><span className="text-primary font-bold">⌘K</span> / <span className="text-primary font-bold">Ctrl+K</span> → Command Palette</li>
                    <li><span className="text-primary font-bold">1 - 7</span> → Quick-switch 7 Color Presets</li>
                    <li><span className="text-primary font-bold">M</span> → Toggle Dark/Light Mode</li>
                    <li><span className="text-primary font-bold">S</span> → Toggle UI Audio SFX</li>
                  </ul>
                </Card>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 7: COMPONENTS GUIDE (55+ COMPONENTS)                                 */}
          {/* ========================================================================= */}
          {(activeItem === 'core-components' ||
            activeItem === 'data-components' ||
            activeItem === 'widgets-kpis' ||
            activeItem === 'showstoppers') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Component Suite Overview (55+)</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Categorized enterprise and interactive showcase components ready for production.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-5 border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="glow">Data &amp; Apps</Badge>
                    <span className="text-xs font-mono text-muted-foreground">v0.4.0</span>
                  </div>
                  <h4 className="font-bold text-base">DataTable, FileUpload, Stepper &amp; Drawer</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Full-featured searchable tables, multi-file drag-and-drop zones, multi-step wizards, and bottom/side sheet modals.
                  </p>
                </Card>

                <Card className="p-5 border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="glow">Widgets &amp; KPIs</Badge>
                    <span className="text-xs font-mono text-muted-foreground">v0.4.0</span>
                  </div>
                  <h4 className="font-bold text-base">StatCards, Rating, Progress &amp; Carousel</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Metric stat cards with positive/negative trend pills, interactive star ratings, animated progress bars, and touch carousel.
                  </p>
                </Card>

                <Card className="p-5 border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="glow">Showstoppers</Badge>
                    <span className="text-xs font-mono text-muted-foreground">Physics</span>
                  </div>
                  <h4 className="font-bold text-base">FlameButton, Confetti, 3D Cards &amp; Lamp</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Physics-based particles, 3D perspective hover cards, evervault encryption glare, and retro grid backgrounds.
                  </p>
                </Card>

                <Card className="p-5 border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="glow">Navigation</Badge>
                    <span className="text-xs font-mono text-muted-foreground">Interactive</span>
                  </div>
                  <h4 className="font-bold text-base">Tubelight Navbar, Floating Dock &amp; Palette</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Fluid tubelight sliding pill indicators, macOS inspired magnification dock, and keyboard-driven command palette.
                  </p>
                </Card>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 8: ANIMATED ICONS (1,000+)                                          */}
          {/* ========================================================================= */}
          {(activeItem === 'icons-usage' || activeItem === 'icons-customizer') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">1,000+ Categorized Animated Icons Suite</h2>
                <Badge variant="glow" className="mt-2 text-xs">v0.3.0 Milestone</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Over 1,000 vector animated icons categorized across 20 distinct domains with live customization studio.
                </p>
              </div>

              <Card className="p-5 bg-card/90 space-y-2">
                <span className="text-xs font-mono text-muted-foreground">Using Animated Icons in React</span>
                <pre className="font-mono text-xs sm:text-sm text-foreground overflow-x-auto leading-relaxed">
{`import { AnimatedCatalogIcon } from 'doni-ui';

export function IconShowcase() {
  return (
    <div className="flex gap-4 items-center">
      {/* Any of the 1,000+ icons rendered with spring physics */}
      <AnimatedCatalogIcon 
        iconName="ai-neural-brain" 
        size={36} 
        color="#06b6d4" 
        animationStyle="bounce" 
      />
      <AnimatedCatalogIcon 
        iconName="fintech-crypto-wallet" 
        size={36} 
        color="#10b981" 
        animationStyle="spin" 
      />
    </div>
  );
}`}
                </pre>
              </Card>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 9: PAGE TEMPLATES HUB (v0.9.0)                                      */}
          {/* ========================================================================= */}
          {activeItem === 'templates-usage' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Production Page Templates Hub</h2>
                <Badge variant="glow" className="mt-2 text-xs">New in v0.9.0</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Drop-in ready full page layouts for SaaS, AI startups, developer portfolios, and analytics dashboards.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-xs text-muted-foreground leading-relaxed">
                Click on the <strong className="text-foreground">Templates</strong> tab in the header menu or press <kbd className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono font-bold">T</kbd> to explore interactive fullscreen previews and copy complete TSX templates in 1 click!
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 10: ARCHITECTURE & BENCHMARKS                                       */}
          {/* ========================================================================= */}
          {activeItem === 'architecture' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">0ms Runtime Style Architecture</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Why Doni UI outperforms Emotion, Styled-Components, and heavy UI systems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-5 border-border/80">
                  <Zap className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-bold text-base">0ms Runtime Overhead</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Theme colors are directly mapped to CSS custom properties (<code className="bg-muted px-1 rounded text-[11px]">--primary</code>). No runtime CSS parser lag.
                  </p>
                </Card>

                <Card className="p-5 border-border/80">
                  <Sliders className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-bold text-base">120 FPS Compositor</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    GPU hardware transforms (<code className="bg-muted px-1 rounded text-[11px]">transform</code>, <code className="bg-muted px-1 rounded text-[11px]">opacity</code>) prevent layout thrashing and DOM reflow.
                  </p>
                </Card>

                <Card className="p-5 border-border/80">
                  <Shield className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-bold text-base">100% Tree-Shakeable</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Configured with <code className="bg-muted px-1 rounded text-[11px]">"sideEffects": false</code>. Modern bundlers eliminate all unused code automatically.
                  </p>
                </Card>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TOPIC 11: FAQ & TROUBLESHOOTING                                           */}
          {/* ========================================================================= */}
          {activeItem === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">FAQ &amp; Troubleshooting</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Answers to the most common setup and implementation questions.
                </p>
              </div>

              <div className="space-y-3">
                <Card className="p-4 border-border/80 space-y-1">
                  <h4 className="font-bold text-sm text-foreground">Can I use Doni UI in Next.js 14 / 15 App Router?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Yes! Animated components use Framer Motion client hooks, so simply add <code className="bg-muted px-1 rounded text-[11px]">'use client'</code> at the top of client wrapper files.
                  </p>
                </Card>

                <Card className="p-4 border-border/80 space-y-1">
                  <h4 className="font-bold text-sm text-foreground">Can I customize colors without modifying source code?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Absolutely. You can override CSS variables in your <code className="bg-muted px-1 rounded text-[11px]">index.css</code> or pass any hex dynamically using <code className="bg-muted px-1 rounded text-[11px]">setCustomHex('#yourhex')</code>.
                  </p>
                </Card>

                <Card className="p-4 border-border/80 space-y-1">
                  <h4 className="font-bold text-sm text-foreground">Are the animated icons accessible?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Yes, all icons accept standard ARIA attributes (<code className="bg-muted px-1 rounded text-[11px]">aria-label</code>, <code className="bg-muted px-1 rounded text-[11px]">role="img"</code>), and keyboard focus handlers.
                  </p>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Bottom Step-by-Step Navigation Bar */}
          <div className="pt-8 border-t border-border/60 flex items-center justify-between gap-4">
            {prevItem ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateTo(prevItem.catId, prevItem.itemId)}
                className="flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous: {prevItem.itemTitle}</span>
              </Button>
            ) : <div />}

            {nextItem && (
              <Button
                variant="glow"
                size="sm"
                onClick={() => navigateTo(nextItem.catId, nextItem.itemId)}
                className="flex items-center gap-1.5 ml-auto"
              >
                <span>Next: {nextItem.itemTitle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
