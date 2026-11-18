import { useState } from 'react';
import {
  Sparkles,
  Github,
  Sun,
  Moon,
  Copy,
  Check,
  Zap,
  Sliders,
  Palette,
  Eye,
  Flame,
  Gauge,
  Feather,
  Cpu,
  Home,
  Compass,
  Boxes,
  Settings,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Switch } from './components/ui/switch';
import { Tabs } from './components/ui/tabs';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './components/ui/dialog';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/ui/accordion';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
import { Slider } from './components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './components/ui/dropdown-menu';
import { TubelightNavbar } from './components/ui/tubelight-navbar';
import { SpotlightCard } from './components/ui/spotlight-card';
import { FlameButton } from './components/ui/flame-button';
import { Marquee } from './components/ui/marquee';
import { Typewriter } from './components/ui/typewriter';
import { CodeDialog } from './components/showcase/code-dialog';
import { useToast } from './components/ui/toast';
import { useTheme, RadiusOption } from './theme/theme-context';
import { COLOR_PRESETS } from './theme/themes';
import { transitions } from './lib/utils';
import { COMPONENT_SNIPPETS } from './data/component-snippets';

export function App() {
  const {
    mode,
    toggleMode,
    activePreset,
    setPreset,
    customHex,
    setCustomHex,
    isCustom,
    radius,
    setRadius,
  } = useTheme();

  const { toast, triggerConfetti } = useToast();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('spotlight');
  const [demoSwitch1, setDemoSwitch1] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState([65]);
  const [packageManager, setPackageManager] = useState<'npm' | 'yarn' | 'pnpm' | 'bun'>('npm');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    toast({
      title: 'Copied to clipboard!',
      description: `${label} copied successfully.`,
      type: 'success',
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const copySnippet = (snippetId: string) => {
    const s = COMPONENT_SNIPPETS[snippetId];
    if (!s) return;
    const full = `${s.importCode}\n\n${s.usageCode}`;
    copyToClipboard(full, `${s.name} Code`);
  };

  const getInstallCommand = () => {
    switch (packageManager) {
      case 'yarn':
        return 'yarn add doni-ui';
      case 'pnpm':
        return 'pnpm add doni-ui';
      case 'bun':
        return 'bun add doni-ui';
      default:
        return 'npm i doni-ui';
    }
  };

  const handleTestLoading = () => {
    setIsBtnLoading(true);
    setTimeout(() => {
      setIsBtnLoading(false);
      triggerConfetti();
      toast({
        title: 'Action Completed! 🚀',
        description: 'Smooth spring animations with 0ms runtime lag.',
        type: 'success',
      });
    }, 1800);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Ambient decorative glow */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-primary/15 rounded-full blur-[140px]" />
        </div>

        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={transitions.springBouncy}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center text-primary-foreground shadow-glow cursor-pointer"
              >
                <Sparkles className="w-5 h-5 fill-current" />
              </motion.div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary">
                  Doni UI
                </span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  v0.0.1
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMode}
                    className="rounded-full"
                  >
                    {mode === 'dark' ? (
                      <Sun className="h-5 w-5 text-amber-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-indigo-600" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Switch to {mode === 'dark' ? 'Light' : 'Dark'} Mode
                </TooltipContent>
              </Tooltip>

              <a
                href="https://github.com/charitha-only/doni-ui"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-3.5 py-2 rounded-lg border border-border bg-card/60 hover:bg-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* Floating Tubelight Island Navbar Showcase */}
        <div className="relative z-30 flex justify-center pt-6 px-4">
          <TubelightNavbar
            items={[
              { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
              { id: 'components', label: 'Components', icon: <Boxes className="w-3.5 h-3.5" /> },
              { id: 'explore', label: 'Explore', icon: <Compass className="w-3.5 h-3.5" /> },
              { id: 'settings', label: 'Theming', icon: <Settings className="w-3.5 h-3.5" /> },
            ]}
          />
        </div>

        {/* Hero Section with Typewriter */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitions.springGentle}
            className="flex justify-center"
          >
            <Badge variant="glow" withPulse className="mb-6 px-4 py-1.5 text-sm">
              ✨ Doni UI v0.0.1 — Ultra Fast, Lightest & Spring Animated
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitions.springGentle, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]"
          >
            Build interfaces that are{' '}
            <span className="text-primary underline decoration-primary/40 decoration-wavy underline-offset-8">
              <Typewriter
                words={['ultra fast.', 'super lightweight.', 'fluidly animated.', '100% themeable.']}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitions.springGentle, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Engineered with <strong>zero runtime CSS overhead</strong>, <strong>100% tree-shaking</strong>, 
            GPU-accelerated spring physics, and an instant <strong>Dynamic Any-Color Engine</strong>.
          </motion.p>

          {/* Quick CTA Actions with Flame Button & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitions.springGentle, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <FlameButton
              onClick={() => {
                triggerConfetti();
                toast({
                  title: 'Ignited with Doni UI! 🔥',
                  description: 'Zero runtime style lag. 120 FPS smooth.',
                  type: 'success',
                });
              }}
            >
              <Flame className="w-4 h-4 text-primary fill-primary mr-1" />
              Flame Button Demo
            </FlameButton>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const el = document.getElementById('playground');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Explore Components
            </Button>
          </motion.div>

          {/* Package Manager Install Tabs: npm, yarn, pnpm, bun */}
          <div className="mt-10 max-w-lg mx-auto">
            <div className="flex items-center justify-between bg-muted/60 p-1.5 rounded-xl border border-border">
              <div className="flex items-center gap-1">
                {(['npm', 'yarn', 'pnpm', 'bun'] as const).map((pm) => (
                  <button
                    key={pm}
                    type="button"
                    onClick={() => setPackageManager(pm)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      packageManager === pm
                        ? 'bg-background text-foreground shadow-sm font-bold border border-border'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {pm}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pl-3">
                <code className="text-xs font-mono font-bold text-primary">
                  {getInstallCommand()}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(getInstallCommand(), getInstallCommand())}
                >
                  {copiedCode === getInstallCommand() ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Infinite Feature Marquee */}
        <div className="py-6 border-y border-border/40 bg-muted/20">
          <Marquee speed={25}>
            {[
              '🚀 0ms Runtime Style Lag',
              '📦 100% Tree-Shakeable',
              '✨ Framer Motion Spring Physics',
              '🎨 Any-Hex Dynamic Color Engine',
              '⚡ Faster Than MUI & Chakra',
              '♿ Radix UI a11y Standards',
              '🛡️ Full TypeScript Safety',
              '🌈 Tubelight & Spotlight Glows',
            ].map((text, idx) => (
              <span
                key={idx}
                className="mx-4 text-xs sm:text-sm font-bold tracking-wider text-muted-foreground/90 uppercase flex items-center gap-2"
              >
                {text}
              </span>
            ))}
          </Marquee>
        </div>

        {/* PERFORMANCE & SPEED BENCHMARK CARDS */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight">Why Doni UI is so blazingly fast</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Unlike traditional heavy UI libraries, Doni UI eliminates runtime bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="border-primary/20">
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-4 border border-primary/20">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">0ms Runtime CSS Parsing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                MUI & Chakra use Emotion to parse CSS at runtime on every user render. Doni UI uses native CSS variables and atomic Tailwind classes for instant 0ms painting.
              </p>
            </SpotlightCard>

            <SpotlightCard className="border-primary/20">
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-4 border border-primary/20">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">Featherweight Tree-Shaking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Configured with <code className="text-xs bg-muted px-1.5 py-0.5 rounded">"sideEffects": false</code>. When you import only the Button, your final bundle only includes ~3KB instead of shipping the entire library.
              </p>
            </SpotlightCard>

            <SpotlightCard className="border-primary/20">
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-4 border border-primary/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">120 FPS GPU Acceleration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every animation uses hardware transforms (<code className="text-xs bg-muted px-1.5 py-0.5 rounded">transform</code> and <code className="text-xs bg-muted px-1.5 py-0.5 rounded">opacity</code>) on the GPU compositor thread without triggering layout reflow.
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* DYNAMIC THEME STUDIO (ANY COLOR ENGINE) */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-primary/30 shadow-glow bg-card/90">
            <CardHeader className="pb-4 border-b border-border/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Theme Studio & Color Engine</CardTitle>
                    <CardDescription>
                      Change to ANY color you want in real time. Watch every component instantly adapt!
                    </CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-muted/60 p-2 rounded-xl border border-border">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
                    Custom Hex:
                  </span>
                  <div className="relative flex items-center">
                    <input
                      type="color"
                      value={customHex}
                      onChange={(e) => setCustomHex(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                      title="Pick ANY custom color"
                    />
                  </div>
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => setCustomHex(e.target.value)}
                    className="w-24 bg-background font-mono text-xs px-2.5 py-1.5 rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-primary uppercase font-bold text-center"
                    maxLength={7}
                  />
                  {isCustom && (
                    <Badge variant="glow" className="text-[10px]">
                      Live
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Preset Color Palettes
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {COLOR_PRESETS.map((p) => {
                    const isSelected = !isCustom && activePreset.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPreset(p.id)}
                        className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-left cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/40'
                            : 'border-border/70 hover:border-border hover:bg-accent/40'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full shadow-md flex items-center justify-center text-white"
                          style={{ backgroundColor: p.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold truncate max-w-full">
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">Border Radius:</span>
                </div>
                <div className="flex items-center gap-2">
                  {(['0.3rem', '0.5rem', '0.75rem', '1rem', '1.5rem'] as RadiusOption[]).map(
                    (r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRadius(r)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                          radius === r
                            ? 'bg-primary text-primary-foreground border-primary font-bold'
                            : 'border-border hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        {r}
                      </button>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* COMPONENT PLAYGROUND & SHOWCASE */}
        <section id="playground" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Component Gallery</h2>
              <p className="text-muted-foreground mt-1">
                Every component includes 1-click code copying and CLI commands.
              </p>
            </div>

            <Tabs
              tabs={[
                { id: 'spotlight', label: 'Spotlight & Navbar' },
                { id: 'buttons', label: 'Buttons & Flame' },
                { id: 'inputs', label: 'Forms & Slider' },
                { id: 'display', label: 'Avatar & Dropdown' },
                { id: 'feedback', label: 'Dialog & Accordion' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {/* 1. SPOTLIGHT & NAVBAR SECTION */}
          {activeTab === 'spotlight' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SpotlightCard>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="glow">Spotlight</Badge>
                    <CodeDialog snippetId="spotlight" />
                  </div>
                  <h3 className="text-lg font-bold">Interactive Spotlight</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Move your cursor over this card. A radiant flashlight beam follows your pointer with zero lag.
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Button
                      variant="glow"
                      size="sm"
                      className="w-full"
                      onClick={() => copySnippet('spotlight')}
                    >
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Code
                    </Button>
                  </div>
                </SpotlightCard>

                <SpotlightCard>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="neon">Tubelight</Badge>
                    <CodeDialog snippetId="tubelight" />
                  </div>
                  <h3 className="text-lg font-bold">Tubelight Island Navbar</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Floating dock navigation equipped with an electric glowing lamp beam indicator.
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => copySnippet('tubelight')}
                    >
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Code
                    </Button>
                  </div>
                </SpotlightCard>

                <SpotlightCard>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">Marquee</Badge>
                    <CodeDialog snippetId="marquee" />
                  </div>
                  <h3 className="text-lg font-bold">Infinite Marquee</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    GPU-accelerated horizontal scrolling row with bilateral fade masks and hover-pause.
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Button
                      variant="glow"
                      size="sm"
                      className="w-full"
                      onClick={() => copySnippet('marquee')}
                    >
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Code
                    </Button>
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          )}

          {/* 2. BUTTONS & FLAME SECTION */}
          {activeTab === 'buttons' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Button Variants & Physics</CardTitle>
                    <CardDescription>
                      Tactile hover scale, spring click depressions, glowing states, and shimmer reflections.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <CodeDialog snippetId="button" />
                    <CodeDialog snippetId="flame" trigger={<Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">Flame Code</Button>} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="default">Default Primary</Button>
                    <Button variant="glow">
                      <Zap className="w-4 h-4 mr-2" />
                      Glow Variant
                    </Button>
                    <Button variant="shimmer">Shimmer Shine</Button>
                    <FlameButton>
                      <Flame className="w-4 h-4 mr-1 text-primary" />
                      Flame Beam
                    </FlameButton>
                    <Button variant="glass">Glassmorphism</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button
                      variant="glow"
                      isLoading={isBtnLoading}
                      onClick={handleTestLoading}
                    >
                      {isBtnLoading ? 'Saving...' : 'Click for Loading State'}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t border-border/50 justify-between">
                  <span className="text-xs text-muted-foreground font-mono">
                    import &#123; Button, FlameButton &#125; from 'doni-ui';
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={() => copySnippet('button')}
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Copy Button Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copySnippet('flame')}
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Copy Flame Code
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* 3. FORMS & SLIDER SECTION */}
          {activeTab === 'inputs' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Glow Focus Inputs</CardTitle>
                    <CardDescription>
                      Expanding glowing focus ring bloom with icon slots.
                    </CardDescription>
                  </div>
                  <CodeDialog snippetId="input" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      Email Address
                    </label>
                    <Input
                      placeholder="charitha@example.com"
                      icon={<Sparkles className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      Search Components
                    </label>
                    <Input
                      placeholder="Type a component name..."
                      rightIcon={<Badge variant="outline" className="text-[10px]">⌘K</Badge>}
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t border-border/50 justify-end">
                  <Button variant="glow" size="sm" onClick={() => copySnippet('input')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Input Code
                  </Button>
                </CardFooter>
              </Card>

              {/* Slider & Switch */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Slider & Spring Switch</CardTitle>
                    <CardDescription>
                      Dynamic theme range sliders and tactile spring switches.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CodeDialog snippetId="slider" trigger={<Button variant="ghost" size="sm" className="h-8 text-xs">Slider Code</Button>} />
                    <CodeDialog snippetId="switch" trigger={<Button variant="ghost" size="sm" className="h-8 text-xs">Switch Code</Button>} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-muted-foreground">Range Value:</span>
                      <span className="text-xs font-bold text-primary">{sliderValue[0]}%</span>
                    </div>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/60">
                    <div>
                      <p className="text-sm font-semibold">Micro-animations</p>
                      <p className="text-xs text-muted-foreground">Spring layout toggle</p>
                    </div>
                    <Switch
                      checked={demoSwitch1}
                      onCheckedChange={setDemoSwitch1}
                      size="default"
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t border-border/50 justify-end">
                  <Button variant="glow" size="sm" onClick={() => copySnippet('slider')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Slider Code
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* 4. AVATAR & DROPDOWN SECTION */}
          {activeTab === 'display' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Avatar Component */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Avatars with Status Indicators</CardTitle>
                    <CardDescription>
                      Pulsing online, busy, and away live status badges.
                    </CardDescription>
                  </div>
                  <CodeDialog snippetId="avatar" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar status="online" className="h-12 w-12">
                      <AvatarImage src="https://github.com/charitha-only.png" alt="Charitha" />
                      <AvatarFallback>CH</AvatarFallback>
                    </Avatar>

                    <Avatar status="away" className="h-11 w-11">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <Avatar status="busy" className="h-10 w-10">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>

                    <Avatar status="offline" className="h-9 w-9">
                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Avatars support images with fallback initials and pulsing live status dots.
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t border-border/50 justify-end">
                  <Button variant="glow" size="sm" onClick={() => copySnippet('avatar')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Avatar Code
                  </Button>
                </CardFooter>
              </Card>

              {/* Dropdown Menu */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Spring Dropdown Menu</CardTitle>
                    <CardDescription>
                      Radix popover with spring entrance and shortcuts.
                    </CardDescription>
                  </div>
                  <CodeDialog snippetId="dropdown" />
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="glow" size="lg">
                        <User className="w-4 h-4 mr-2" />
                        Open Account Menu
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                      <DropdownMenuItem>Billing & Invoices</DropdownMenuItem>
                      <DropdownMenuItem>Team Management</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive font-bold">
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t border-border/50 justify-end">
                  <Button variant="outline" size="sm" onClick={() => copySnippet('dropdown')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Dropdown Code
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {/* 5. FEEDBACK SECTION (DIALOG & ACCORDION) */}
          {activeTab === 'feedback' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Animated Modal Dialog</CardTitle>
                    <CardDescription>
                      Spring scale-up entry, frosted backdrop blur, and smooth exit.
                    </CardDescription>
                  </div>
                  <CodeDialog snippetId="dialog" />
                </CardHeader>
                <CardContent className="flex items-center justify-center p-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="glow" size="lg">
                        Open Animated Modal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Customize Doni UI Experience</DialogTitle>
                        <DialogDescription>
                          This modal is powered by Radix UI primitive with spring animation curves.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-3">
                        <Input placeholder="Enter workspace name" />
                        <p className="text-xs text-muted-foreground">
                          All components inside modals inherit your dynamic custom theme color automatically.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="glow"
                          onClick={() => {
                            toast({
                              title: 'Saved Successfully!',
                              type: 'success',
                            });
                          }}
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t border-border/50 justify-end">
                  <Button variant="glow" size="sm" onClick={() => copySnippet('dialog')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Dialog Code
                  </Button>
                </CardFooter>
              </Card>

              {/* Accordion */}
              <Card>
                <CardHeader>
                  <CardTitle>Smooth Accordion</CardTitle>
                  <CardDescription>
                    Animated height collapse and expanding rotating chevrons.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How to copy components to my project?</AccordionTrigger>
                      <AccordionContent>
                        Click any "Copy Code" button in this gallery, or click "View Code" to see the full import statement, installation instructions, and TypeScript usage.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How is the website hosted?</AccordionTrigger>
                      <AccordionContent>
                        Doni UI is automatically deployed to GitHub Pages with continuous integration workflows on every release.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Does it support dark and light mode?</AccordionTrigger>
                      <AccordionContent>
                        Full first-class dark and light mode support with high-contrast accessibility across all color presets.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-border/60 py-12 bg-background/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-bold text-base">Doni UI Library v0.0.1</span>
              <span className="text-xs text-muted-foreground">
                — Built with love by Charitha
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Live on{' '}
              <a
                href="https://charitha-only.github.io/doni-ui/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                GitHub Pages
              </a>
              {' '}&amp;{' '}
              <a
                href="https://github.com/charitha-only/doni-ui"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                GitHub Repo
              </a>
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
