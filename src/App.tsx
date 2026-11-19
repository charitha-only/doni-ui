import { useState, useEffect } from 'react';
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
  Flame,
  Gauge,
  Feather,
  Cpu,
  Compass,
  Boxes,
  User,
  Shield,
  Layers,
  Search,
  Stars,
  Radio,
  Eye,
  Type,
  BookOpen,
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
import { Skeleton } from './components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './components/ui/dropdown-menu';
import { SpotlightCard } from './components/ui/spotlight-card';
import { FlameButton } from './components/ui/flame-button';
import { Keycap } from './components/ui/keycap';
import { BorderBeam } from './components/ui/border-beam';
import { BentoGrid, BentoGridItem } from './components/ui/bento-grid';
import { Meteors } from './components/ui/meteors';
import { Ripple } from './components/ui/ripple';
import { CommandPalette } from './components/ui/command-palette';
import { FlipWords } from './components/ui/flip-words';
import { CardContainer, CardItem } from './components/ui/card-3d';
import { TextReveal } from './components/ui/text-reveal';
import { Marquee } from './components/ui/marquee';
import { EvervaultCard } from './components/ui/evervault-card';
import { SparklesCore } from './components/ui/sparkles';
import { GridBackground } from './components/ui/grid-background';
import { Magnetic } from './components/ui/magnetic';
import { ShimmerText } from './components/ui/shimmer-text';
import { NumberTicker } from './components/ui/number-ticker';
import { LampContainer } from './components/ui/lamp';
import { InteractiveHoverButton } from './components/ui/interactive-hover-button';
import { Lens } from './components/ui/lens';
import { OrbitingCircles } from './components/ui/orbiting-circles';
import { RetroGrid } from './components/ui/retro-grid';
import { ConfettiButton } from './components/ui/confetti-button';
import { WavyBackground } from './components/ui/wavy-background';
import { ExpandableCard } from './components/ui/expandable-card';
import { GlareCard } from './components/ui/glare-card';
import { DirectionAwareHover } from './components/ui/direction-aware-hover';
import { TracingBeam } from './components/ui/tracing-beam';
import {
  SocialIconDock,
  AnimatedGithub,
  AnimatedTwitter,
  AnimatedYoutube,
  AnimatedLinkedin,
  AnimatedInstagram,
  AnimatedDiscord,
  AnimatedTelegram,
  AnimatedTiktok,
  AnimatedFacebook,
  AnimatedDribbble,
} from './components/ui/animated-social-icons';
import { CodeDialog } from './components/showcase/code-dialog';
import { useToast } from './components/ui/toast';
import { useTheme, RadiusOption } from './theme/theme-context';
import { COLOR_PRESETS } from './theme/themes';
import { transitions } from './lib/utils';
import { COMPONENT_SNIPPETS } from './data/component-snippets';
import { DocsView } from './components/views/docs-view';
import { IconsView } from './components/views/icons-view';
import { VersionsView } from './components/views/versions-view';
import { AboutView } from './components/views/about-view';

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
  const [currentPage, setCurrentPage] = useState<'home' | 'docs' | 'components' | 'icons' | 'versions' | 'about'>('home');
  const [activeTab, setActiveTab] = useState('card3d');
  const [demoSwitch1, setDemoSwitch1] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState([65]);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [packageManager, setPackageManager] = useState<'npm' | 'yarn' | 'pnpm' | 'bun'>('npm');
  const [gallerySearch, setGallerySearch] = useState('');

  // Keyboard shortcut ⌘K or Ctrl+K to open search command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

        {/* Global Command Palette (⌘K) */}
        <CommandPalette
          open={commandPaletteOpen}
          onOpenChange={setCommandPaletteOpen}
          onSelectComponent={(id) => {
            copySnippet(id);
          }}
        />

        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={transitions.springBouncy}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center text-primary-foreground shadow-glow"
              >
                <Sparkles className="w-5 h-5 fill-current" />
              </motion.div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary">
                  Doni UI
                </span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  v0.3.0
                </span>
              </div>
            </div>

            {/* Menu Bar: Home / Documentation / Components / Icons / Versions / About */}
            <nav className="hidden lg:flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/60">
              {[
                { id: 'home', label: 'Home' },
                { id: 'docs', label: 'Documentation' },
                { id: 'components', label: 'Components' },
                { id: 'icons', label: 'Icons (1,000+)' },
                { id: 'versions', label: 'Versions' },
                { id: 'about', label: 'About' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentPage(item.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground shadow-sm font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/60 hover:bg-accent text-xs text-muted-foreground transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-primary" />
                <span>Search...</span>
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border">
                  ⌘K
                </kbd>
              </button>

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

        {/* Mobile Navigation Pills Bar (visible on < lg screens) */}
        <div className="lg:hidden flex items-center justify-center p-2 bg-muted/30 border-b border-border/40 overflow-x-auto gap-1">
          {[
            { id: 'home', label: 'Home' },
            { id: 'docs', label: 'Docs' },
            { id: 'components', label: 'Components' },
            { id: 'icons', label: 'Icons (1,000+)' },
            { id: 'versions', label: 'Versions' },
            { id: 'about', label: 'About' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentPage(item.id as any)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                currentPage === item.id
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 1. VIEW: HOME PAGE                                                        */}
        {/* ========================================================================= */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section with 3D Flip Words */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transitions.springGentle}
                className="flex justify-center"
              >
                <Badge variant="glow" withPulse className="mb-6 px-4 py-1.5 text-xs">
                  ✨ Doni UI v0.3.0 — 1,000+ Spring Animated Icons Suite &amp; Live Customizer Studio
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitions.springGentle, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.2]"
              >
                Build interfaces that are{' '}
                <FlipWords
                  words={['ultra-fast.', '3D-animated.', 'super-light.', '100% themeable.']}
                  duration={2400}
                />
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

              {/* Clean, Prominent Hero Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transitions.springGentle, delay: 0.3 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <Button
                  variant="glow"
                  size="lg"
                  onClick={() => {
                    triggerConfetti();
                    setCurrentPage('components');
                  }}
                  className="h-12 px-7 text-sm font-bold shadow-glow"
                >
                  <Boxes className="w-4 h-4 mr-2" />
                  Explore 45+ Components
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentPage('icons')}
                  className="h-12 px-6 text-sm font-semibold border-primary/30 hover:border-primary/60 bg-card/60"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Browse 1,000+ Icons &amp; Studio
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setCurrentPage('docs')}
                  className="h-12 px-5 text-sm"
                >
                  <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                  Documentation
                </Button>
              </motion.div>

              {/* Package Manager Install Bar */}
              <div className="mt-10 max-w-lg mx-auto">
                <div className="flex items-center justify-between bg-card/60 p-1.5 rounded-xl border border-border shadow-sm">
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
              '⌨️ Vintage 3D Keycaps',
              '💫 Shooting Stars & Meteors',
              '🧊 3D Perspective Tilt Cards',
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

          {/* Animated KPI Stats Bar with NumberTicker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-primary">
                <NumberTicker value={0} suffix="ms" />
              </div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">Runtime Style Lag</div>
            </div>
            <div className="p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-foreground">
                <NumberTicker value={120} suffix=" FPS" />
              </div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">Hardware Framerate</div>
            </div>
            <div className="p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-primary">
                <NumberTicker value={100} suffix="%" />
              </div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">Tree-Shakeable</div>
            </div>
            <div className="p-4 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-black text-foreground">
                <NumberTicker value={1145} suffix="+" />
              </div>
              <div className="text-xs text-muted-foreground font-semibold mt-1">Components &amp; Icons</div>
            </div>
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

        {/* Featured Showcase on Home */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Featured Showstoppers</h2>
              <p className="text-sm text-muted-foreground">A quick taste of our physics-driven components & animated icons</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage('components')}>
                Explore All 45+ Components →
              </Button>
              <Button variant="glow" size="sm" onClick={() => setCurrentPage('icons')}>
                View 1,000+ Animated Icons &amp; Studio →
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardContainer className="w-full">
              <div className="bg-card border border-border/80 p-6 rounded-2xl w-full [transform-style:preserve-3d]">
                <CardItem translateZ="50" className="text-lg font-bold">
                  3D Perspective Tilt
                </CardItem>
                <CardItem as="p" translateZ="60" className="text-xs text-muted-foreground mt-2">
                  Hover to experience true 3D spatial elevation with spring return physics.
                </CardItem>
                <div className="mt-4 flex justify-between items-center">
                  <CardItem translateZ="40" as={Button} variant="glow" size="sm" onClick={() => setCurrentPage('components')}>
                    Test in Playground
                  </CardItem>
                </div>
              </div>
            </CardContainer>

            <GlareCard className="p-6 flex flex-col justify-between">
              <div>
                <Badge variant="glow" className="text-[10px] mb-2">Holographic</Badge>
                <h3 className="font-bold text-lg">Rainbow Foil Glare</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Tilt pointer across this surface to watch iridescent light reflections dance.
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-fit" onClick={() => setCurrentPage('components')}>
                View Code
              </Button>
            </GlareCard>

            <Card className="p-6 flex flex-col justify-between bg-card/70 border-border/80">
              <div>
                <Badge variant="outline" className="text-[10px] mb-2">Micro-Interactions &amp; Studio</Badge>
                <h3 className="font-bold text-lg">1,000+ Animated Icons</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Pure SVG spring physics across 20+ rich categories with interactive live Studio, customizable size, stroke, colors &amp; trigger loops.
                </p>
                <div className="mt-4 flex gap-2 justify-center">
                  <AnimatedGithub size={28} />
                  <AnimatedTwitter size={28} />
                  <AnimatedYoutube size={28} />
                  <AnimatedInstagram size={28} />
                </div>
              </div>
              <Button variant="glow" size="sm" className="w-fit mx-auto mt-4" onClick={() => setCurrentPage('icons')}>
                Open 1,000+ Icon Studio
              </Button>
            </Card>
          </div>

          {/* Home Bottom CTA Banner */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-card via-primary/10 to-card border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Ready to build hyper-fast interfaces?</h3>
              <p className="text-xs text-muted-foreground">
                Get started in under 60 seconds with our CLI or browse the complete component directory.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="glow" size="lg" onClick={() => setCurrentPage('docs')}>
                <BookOpen className="w-4 h-4 mr-2" />
                Read Documentation
              </Button>
              <Button variant="outline" size="lg" onClick={() => setCurrentPage('components')}>
                Browse Components
              </Button>
            </div>
          </div>
        </section>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW: DOCUMENTATION PAGE                                               */}
      {/* ========================================================================= */}
      {currentPage === 'docs' && <DocsView />}

      {/* ========================================================================= */}
      {/* 3. VIEW: COMPONENTS PAGE                                                  */}
      {/* ========================================================================= */}
      {currentPage === 'components' && (
        <section id="playground" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col gap-5 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Component Gallery</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  Explore 40+ spring-animated, lightweight components with 1-click code copying and CLI commands.
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Instant filter 40+ components..."
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  className="pl-10 h-10 bg-card/70 rounded-xl border-border/80"
                />
                {gallerySearch && (
                  <button
                    type="button"
                    onClick={() => setGallerySearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {!gallerySearch && (
              <Tabs
                tabs={[
                  { id: 'card3d', label: '3D Tilt, Glare & Morph' },
                  { id: 'cosmic', label: 'Wavy & Cosmic' },
                  { id: 'showstopper', label: 'Orbit, Grid & Keycaps' },
                  { id: 'spotlight', label: 'Spotlight & Lamp' },
                  { id: 'buttons', label: 'Buttons & Confetti' },
                  { id: 'inputs', label: 'Forms & Slider' },
                  { id: 'display', label: 'Avatar & Dropdown' },
                  { id: 'feedback', label: 'Dialog & Accordion' },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            )}
          </div>

          {gallerySearch ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-4"
            >
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Filtering components matching "<strong className="text-foreground">{gallerySearch}</strong>"
                </span>
                <Button variant="ghost" size="sm" onClick={() => setGallerySearch('')}>
                  Reset Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(COMPONENT_SNIPPETS)
                  .filter(
                    (c) =>
                      c.name.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                      c.description.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                      c.category.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                      c.id.toLowerCase().includes(gallerySearch.toLowerCase())
                  )
                  .map((c) => (
                    <Card key={c.id} className="p-5 flex flex-col justify-between hover:border-primary/50 transition-colors">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="glow">{c.category}</Badge>
                          <CodeDialog snippetId={c.id} />
                        </div>
                        <h3 className="font-bold text-lg">{c.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {c.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                        <span className="text-xs font-mono text-primary font-semibold">npx doni-ui add {c.id}</span>
                        <Button variant="glow" size="sm" onClick={() => copySnippet(c.id)}>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </motion.div>
          ) : (
            <>

          {/* ANIMATED SOCIAL ICONS SECTION */}
          {activeTab === 'icons' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-8"
            >
              {/* Header card with glassmorphic dock */}
              <Card className="p-8 relative overflow-hidden bg-gradient-to-b from-card via-card to-background border-border/80">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <Badge variant="glow" className="gap-1 mb-2">
                      <Sparkles className="w-3 h-3" /> Micro-Interactions
                    </Badge>
                    <h3 className="text-2xl font-black tracking-tight">Animated Social Media Icons</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      10 hand-crafted spring-animated SVG icons with brand-colored glowing blooms and micro-physics.
                    </p>
                  </div>
                  <CodeDialog snippetId="animatedIcons" />
                </div>

                {/* Floating Glassmorphic Social Dock */}
                <div className="py-6 flex flex-col items-center justify-center gap-3">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono font-semibold">
                    Interactive Social Dock
                  </p>
                  <SocialIconDock iconSize={26} />
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap justify-between items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">
                    import &#123; SocialIconDock, AnimatedGithub, ... &#125; from 'doni-ui';
                  </span>
                  <Button variant="glow" size="sm" onClick={() => copySnippet('animatedIcons')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Icons Code
                  </Button>
                </div>
              </Card>

              {/* Individual 10 Animated Icons Showcase Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { id: 'github', name: 'GitHub', icon: <AnimatedGithub size={32} />, desc: 'Wiggle & tail stroke' },
                  { id: 'twitter', name: 'X / Twitter', icon: <AnimatedTwitter size={32} />, desc: '3D Y-axis flip' },
                  { id: 'youtube', name: 'YouTube', icon: <AnimatedYoutube size={32} />, desc: 'Play pulse & glow' },
                  { id: 'linkedin', name: 'LinkedIn', icon: <AnimatedLinkedin size={32} />, desc: 'Letter bounce & dot pop' },
                  { id: 'instagram', name: 'Instagram', icon: <AnimatedInstagram size={32} />, desc: 'Aperture shutter spin' },
                  { id: 'discord', name: 'Discord', icon: <AnimatedDiscord size={32} />, desc: 'Controller wiggle' },
                  { id: 'telegram', name: 'Telegram', icon: <AnimatedTelegram size={32} />, desc: 'Paper plane flight' },
                  { id: 'tiktok', name: 'TikTok', icon: <AnimatedTiktok size={32} />, desc: 'Chromatic aberration glitch' },
                  { id: 'facebook', name: 'Facebook', icon: <AnimatedFacebook size={32} />, desc: '3D "f" pop' },
                  { id: 'dribbble', name: 'Dribbble', icon: <AnimatedDribbble size={32} />, desc: 'Basketball spinning seams' },
                ].map((item) => (
                  <Card key={item.id} className="p-5 flex flex-col items-center justify-between text-center hover:border-primary/50 transition-all group">
                    <div className="my-2">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mt-2">{item.name}</h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{item.desc}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 w-full text-xs h-7 opacity-80 group-hover:opacity-100"
                      onClick={() => {
                        copyToClipboard(
                          `import { Animated${item.name.replace(/[^a-zA-Z]/g, '')} } from 'doni-ui';\n\n<Animated${item.name.replace(/[^a-zA-Z]/g, '')} size={28} />`,
                          `${item.name} Icon Code`
                        );
                      }}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* 0. 3D TILT & EVERVAULT SECTION */}
          {activeTab === 'card3d' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* 3D Perspective Tilt Card */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="glow" className="gap-1">
                      <Eye className="w-3 h-3" /> 3D Mouse Tilt
                    </Badge>
                    <CodeDialog snippetId="card3d" />
                  </div>
                  <CardContainer className="py-2">
                    <div className="bg-card border border-border/80 p-6 rounded-2xl w-full max-w-sm [transform-style:preserve-3d] shadow-2xl backdrop-blur-xl">
                      <CardItem translateZ="50" className="text-xl font-extrabold tracking-tight">
                        Perspective 3D Card
                      </CardItem>
                      <CardItem as="p" translateZ="60" className="text-muted-foreground text-xs mt-2 leading-relaxed">
                        Move your mouse over this container to watch child items float out into real 3D depth space.
                      </CardItem>
                      <CardItem translateZ="80" className="w-full mt-4">
                        <div className="h-36 w-full rounded-xl bg-gradient-to-tr from-primary/30 to-accent/30 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-inner-glow">
                          Layered 3D Element (Z: 80)
                        </div>
                      </CardItem>
                      <div className="flex justify-between items-center mt-6">
                        <CardItem translateZ="30" as="span" className="text-xs text-primary font-bold">
                          Framer Spring Physics
                        </CardItem>
                        <CardItem translateZ="50" as={Button} variant="glow" size="sm">
                          Hover to Tilt
                        </CardItem>
                      </div>
                    </div>
                  </CardContainer>
                </div>

                {/* Evervault Holographic Encryption Matrix Card */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="glow" className="gap-1">
                      <Shield className="w-3 h-3" /> Holographic Matrix
                    </Badge>
                    <CodeDialog snippetId="evervault" />
                  </div>
                  <div className="h-[340px] w-full flex items-center justify-center">
                    <EvervaultCard text="DONI" className="max-w-xs h-full" />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground font-mono">
                      &lt;EvervaultCard text="DONI" /&gt;
                    </span>
                    <Button variant="glow" size="sm" onClick={() => copySnippet('evervault')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Evervault Code
                    </Button>
                  </div>
                </div>
              </div>

              {/* Interactive Zoom Lens */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge variant="glow" className="gap-1">
                      <Search className="w-3 h-3" /> Cursor Magnifier
                    </Badge>
                    <h3 className="text-xl font-bold mt-1">Interactive Zoom Lens</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Hover and move your mouse across the card to inspect details with smooth 2.0x magnification.
                    </p>
                  </div>
                  <CodeDialog snippetId="lens" />
                </div>

                <div className="flex justify-center py-4">
                  <Lens zoomFactor={2} lensSize={160} className="w-full max-w-xl border border-border/80 shadow-lg">
                    <div className="h-52 w-full bg-gradient-to-tr from-primary/30 via-card to-accent/20 p-6 flex flex-col justify-between rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                          ⚡ DONI UI HARDWARE ENGINE
                        </span>
                        <Badge variant="neon">2.0x Magnification</Badge>
                      </div>
                      <div className="text-center my-auto">
                        <h4 className="text-3xl font-black text-foreground tracking-tight">
                          Inspect Micro-Interactions
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">
                          Framer Motion Spring Physics • 0ms Style Lag • 120 FPS Compositor
                        </p>
                      </div>
                      <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                        <span>Lens Radius: 160px</span>
                        <span>GPU Thread: Active</span>
                      </div>
                    </div>
                  </Lens>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    &lt;Lens zoomFactor=&#123;2&#125;&gt;...&lt;/Lens&gt;
                  </span>
                  <Button variant="glow" size="sm" onClick={() => copySnippet('lens')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Lens Code
                  </Button>
                </div>
              </Card>

              {/* Staggered Text Reveal & Typography */}
              <Card className="p-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="neon" className="gap-1">
                      <Type className="w-3 h-3" /> Blur Stagger
                    </Badge>
                    <CodeDialog snippetId="textReveal" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Staggered Word Blur Reveal</h3>
                  <TextReveal
                    text="Doni UI is engineered from the ground up for maximum visual impact, 120 FPS hardware acceleration, and zero runtime styling overhead."
                    className="text-base text-muted-foreground font-medium leading-relaxed"
                  />
                </div>

                <div className="pt-6 border-t border-border/60 mt-6 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    &lt;TextReveal text="..." /&gt;
                  </span>
                  <Button variant="glow" size="sm" onClick={() => copySnippet('textReveal')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Text Reveal
                  </Button>
                </div>
              </Card>

              {/* Shared Layout Morphing Expandable Card */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge variant="glow">Shared Layout Physics</Badge>
                    <h3 className="text-xl font-bold mt-1">Morphing Expandable Cards</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Click any card to smoothly morph into an expanded modal dialog with backdrop blur and escape key dismiss.
                    </p>
                  </div>
                  <CodeDialog snippetId="expandableCard" />
                </div>

                <ExpandableCard
                  items={[
                    {
                      id: 'perf-1',
                      title: '0ms Runtime CSS Evaluation',
                      description: 'Native CSS variables with 0ms evaluation lag',
                      content: 'Doni UI compiles styles to atomic CSS custom properties. Unlike Emotion or styled-components, there is zero JavaScript parsing delay on user interactions.',
                      ctaText: 'Explore Docs',
                      icon: <Zap className="w-4 h-4" />,
                    },
                    {
                      id: 'tree-2',
                      title: '100% Tree-Shakeable Bundles',
                      description: 'Drop unused code automatically',
                      content: 'Configured with "sideEffects": false. When you import only the Button, bundlers discard the rest of the library (~3KB bundle footprint).',
                      ctaText: 'View Bundle Size',
                      icon: <Shield className="w-4 h-4" />,
                    },
                  ]}
                />

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    &lt;ExpandableCard items=&#123;[...]&#125; /&gt;
                  </span>
                  <Button variant="glow" size="sm" onClick={() => copySnippet('expandableCard')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Expandable Code
                  </Button>
                </div>
              </Card>

              {/* Holographic Glare Card & Direction-Aware Hover */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Holographic Rainbow Glare Card */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="glow" className="gap-1">
                      <Sparkles className="w-3 h-3" /> Spectral Foil Glare
                    </Badge>
                    <CodeDialog snippetId="glareCard" />
                  </div>
                  <div className="h-64 sm:h-72 w-full">
                    <GlareCard className="p-6 flex flex-col justify-between">
                      <div>
                        <Badge variant="neon">Trading Card Holo</Badge>
                        <h4 className="text-xl font-bold mt-2">Holographic Glare Card</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Move your pointer across this card to watch dynamic rainbow foil and light glare reflect in 3D depth.
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono text-primary font-bold">
                        <span>DONI FOIL #001</span>
                        <span>120 FPS SHINE</span>
                      </div>
                    </GlareCard>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground font-mono">&lt;GlareCard /&gt;</span>
                    <Button variant="glow" size="sm" onClick={() => copySnippet('glareCard')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Glare Code
                    </Button>
                  </div>
                </div>

                {/* Direction-Aware Hover Card */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="neon" className="gap-1">
                      <Compass className="w-3 h-3" /> Directional Vector
                    </Badge>
                    <CodeDialog snippetId="directionAwareHover" />
                  </div>
                  <div className="h-64 sm:h-72 w-full">
                    <DirectionAwareHover className="h-full w-full">
                      <Badge variant="glow" className="w-fit mb-2">Smart Vector</Badge>
                      <h4 className="text-lg font-bold text-foreground">Direction-Aware Slide</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Notice how the overlay tracks the exact angle of your cursor entry (top, right, bottom, left).
                      </p>
                    </DirectionAwareHover>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground font-mono">&lt;DirectionAwareHover /&gt;</span>
                    <Button variant="glow" size="sm" onClick={() => copySnippet('directionAwareHover')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Vector Code
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 1. COSMIC & MOTION SECTION */}
          {activeTab === 'cosmic' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              {/* Canvas Wavy Sine Wave Lines Background */}
              <Card className="relative overflow-hidden p-6 border-border/80 min-h-[300px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4 z-10">
                  <div>
                    <Badge variant="glow">Canvas Sine Waves</Badge>
                    <h3 className="text-xl font-bold mt-1">Wavy Sine Wave Lines</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      60 FPS hardware-accelerated waving canvas sine lines reactive to active theme colors.
                    </p>
                  </div>
                  <CodeDialog snippetId="wavyBackground" />
                </div>

                <div className="relative h-48 w-full rounded-xl overflow-hidden border border-border/60 bg-card my-2 flex items-center justify-center">
                  <WavyBackground waveWidth={35} blur={10} speed="fast" className="flex flex-col items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-foreground drop-shadow-md">
                      FLUID WAVE COMPOSITOR
                    </span>
                    <Badge variant="neon">60 FPS Hardware Acceleration</Badge>
                  </WavyBackground>
                </div>

                <div className="flex justify-between items-center z-10 mt-2">
                  <span className="text-xs text-muted-foreground font-mono">&lt;WavyBackground /&gt;</span>
                  <Button variant="glow" size="sm" onClick={() => copySnippet('wavyBackground')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Wavy Code
                  </Button>
                </div>
              </Card>
              {/* Sparkles Particle Engine with Grid Background */}
              <Card className="relative overflow-hidden p-6 border-border/80 min-h-[300px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4 z-10">
                  <div>
                    <Badge variant="glow" className="gap-1">
                      <Sparkles className="w-3 h-3" /> Canvas Particle Engine
                    </Badge>
                    <h3 className="text-xl font-bold mt-1">Interactive Sparkles &amp; Grid Background</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      60 FPS canvas particle physics reactive to active theme colors, with radial dot-matrix background.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <CodeDialog snippetId="sparkles" />
                    <CodeDialog
                      snippetId="gridBackground"
                      trigger={
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          Grid Code
                        </Button>
                      }
                    />
                  </div>
                </div>

                <div className="relative h-48 w-full rounded-xl overflow-hidden border border-border/60 bg-card my-2 flex items-center justify-center">
                  <GridBackground variant="dots" className="absolute inset-0">
                    <SparklesCore
                      minSize={0.8}
                      maxSize={2.4}
                      particleDensity={70}
                      className="w-full h-full"
                    />
                  </GridBackground>
                  <div className="relative z-20 flex flex-col items-center gap-2">
                    <span className="text-2xl font-black tracking-wider text-foreground">
                      DONI SPARKLES
                    </span>
                    <Badge variant="neon">Theme-Reactive Particles</Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center z-10 mt-2">
                  <span className="text-xs text-muted-foreground font-mono">
                    &lt;SparklesCore /&gt; + &lt;GridBackground /&gt;
                  </span>
                  <div className="flex gap-2">
                    <Button variant="glow" size="sm" onClick={() => copySnippet('sparkles')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Sparkles Code
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="relative overflow-hidden p-6 bg-gradient-to-b from-card to-background border-border/80 min-h-[260px] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4 z-10">
                    <div>
                      <Badge variant="glow" className="gap-1">
                        <Stars className="w-3 h-3" /> Meteors Effect
                      </Badge>
                      <h3 className="text-xl font-bold mt-1">Meteor Shower Stars</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Ambient animated shooting stars streak diagonally with glowing linear tails.
                      </p>
                    </div>
                    <CodeDialog snippetId="meteors" />
                  </div>
                  <Meteors number={25} />
                  <div className="mt-4 flex justify-end z-10">
                    <Button variant="glow" size="sm" onClick={() => copySnippet('meteors')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Meteors Code
                    </Button>
                  </div>
                </Card>

                <Card className="relative overflow-hidden p-6 border-border/80 min-h-[260px] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2 z-10">
                    <div>
                      <Badge variant="neon" className="gap-1">
                        <Radio className="w-3 h-3" /> Water Ripple
                      </Badge>
                      <h3 className="text-xl font-bold mt-1">Concentric Water Ripples</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Fluid circular soundwave ripples expanding outward.
                      </p>
                    </div>
                    <CodeDialog snippetId="ripple" />
                  </div>

                  <div className="relative flex items-center justify-center my-4 py-8">
                    <Avatar status="online" className="h-14 w-14 z-10 ring-4 ring-primary/30">
                      <AvatarImage src="https://github.com/charitha-only.png" alt="Charitha" />
                      <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                    <Ripple numCircles={5} mainCircleSize={120} />
                  </div>

                  <div className="flex justify-end z-10">
                    <Button variant="glow" size="sm" onClick={() => copySnippet('ripple')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Ripple Code
                    </Button>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Shimmering Skeleton Loader</h3>
                    <p className="text-xs text-muted-foreground">
                      Silky-smooth placeholder skeletons for loading profiles, cards, and tables.
                    </p>
                  </div>
                  <CodeDialog snippetId="skeleton" />
                </div>
                <div className="flex items-center gap-4 py-2">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1 max-w-sm">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => copySnippet('skeleton')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Skeleton Code
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* 2. SHOWSTOPPER SECTION */}
          {activeTab === 'showstopper' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge variant="glow">Mechanical 3D &amp; Audio</Badge>
                      <h3 className="text-xl font-bold mt-1">Tactile Mechanical Keycaps</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Authentic 3D key depression physics with synthesized mechanical audio clicks (Web Audio API)!
                      </p>
                    </div>
                    <CodeDialog snippetId="keycap" />
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 py-6 bg-muted/40 rounded-xl border border-border/60">
                    <Keycap subText="CMD" onClick={() => toast({ title: 'Key: Command (⌘)', type: 'info' })}>
                      ⌘
                    </Keycap>
                    <Keycap subText="OPT" onClick={() => toast({ title: 'Key: Option (⌥)', type: 'info' })}>
                      ⌥
                    </Keycap>
                    <Keycap subText="SHIFT" onClick={() => toast({ title: 'Key: Shift (⇧)', type: 'info' })}>
                      ⇧
                    </Keycap>
                    <Keycap subText="ENTER" onClick={() => toast({ title: 'Key: Return (↵)', type: 'success' })}>
                      ↵
                    </Keycap>
                    <Keycap subText="ESC" onClick={() => toast({ title: 'Key: Escape (ESC)', type: 'error' })}>
                      ESC
                    </Keycap>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="glow" size="sm" onClick={() => copySnippet('keycap')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Keycap Code
                    </Button>
                  </div>
                </Card>

                <Card className="relative overflow-hidden p-6 border-border/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge variant="neon">Perimeter Laser</Badge>
                      <h3 className="text-xl font-bold mt-1">Animated Border Beam</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        High-energy laser beam running continuously along the card perimeter.
                      </p>
                    </div>
                    <CodeDialog snippetId="borderBeam" />
                  </div>
                  <div className="py-6 space-y-2 text-sm text-muted-foreground">
                    <p>
                      The beam reacts live to whichever theme color you pick in the Theme Studio above.
                    </p>
                    <p className="font-mono text-xs text-primary font-bold">
                      &lt;BorderBeam size=&#123;250&#125; duration=&#123;10&#125; /&gt;
                    </p>
                  </div>
                  <BorderBeam size={220} duration={8} />
                  <div className="mt-4 flex justify-end">
                    <Button variant="glow" size="sm" onClick={() => copySnippet('borderBeam')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Beam Code
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Responsive Bento Grid Layout</h3>
                    <p className="text-xs text-muted-foreground">
                      Modern Apple and Linear-inspired responsive grid cards with hover physics.
                    </p>
                  </div>
                  <CodeDialog snippetId="bento" />
                </div>
                <BentoGrid>
                  <BentoGridItem
                    title="Zero-Lag Engine"
                    description="0ms runtime CSS evaluation. Pure atomic Tailwind classes compiled at build time."
                    icon={<Zap className="w-5 h-5 text-primary" />}
                    className="md:col-span-2"
                  />
                  <BentoGridItem
                    title="100% Tree-Shakeable"
                    description="Only ship the components you actually import."
                    icon={<Shield className="w-5 h-5 text-primary" />}
                  />
                  <BentoGridItem
                    title="Spring Animations"
                    description="Framer Motion spring physics for tactile micro-interactions."
                    icon={<Cpu className="w-5 h-5 text-primary" />}
                  />
                  <BentoGridItem
                    title="Dynamic Any-Color"
                    description="Adapt the whole library to any custom hex code in microseconds."
                    icon={<Layers className="w-5 h-5 text-primary" />}
                    className="md:col-span-2"
                  />
                </BentoGrid>
              </div>

              {/* Orbiting Circles & Retro Horizon Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Orbiting Circles Showcase */}
                <Card className="relative overflow-hidden p-6 flex flex-col justify-between min-h-[380px]">
                  <div className="flex items-center justify-between mb-4 z-10">
                    <div>
                      <Badge variant="glow">Planetary Orbits</Badge>
                      <h3 className="text-xl font-bold mt-1">Concentric Orbiting Circles</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Planetary orbits rotating smoothly with counter-rotation upright lock.
                      </p>
                    </div>
                    <CodeDialog snippetId="orbitingCircles" />
                  </div>

                  <div className="relative flex h-[240px] w-full items-center justify-center overflow-hidden">
                    <div className="flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground font-black text-xs shadow-glow z-10">
                      DONI
                    </div>
                    {/* Inner orbit */}
                    <OrbitingCircles radius={60} duration={15} iconSize={28}>
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </OrbitingCircles>
                    <OrbitingCircles radius={60} duration={15} delay={7.5} iconSize={28}>
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                    </OrbitingCircles>
                    {/* Outer orbit */}
                    <OrbitingCircles radius={105} duration={22} reverse iconSize={32}>
                      <Shield className="w-4 h-4 text-emerald-500" />
                    </OrbitingCircles>
                    <OrbitingCircles radius={105} duration={22} delay={11} reverse iconSize={32}>
                      <Cpu className="w-4 h-4 text-cyan-500" />
                    </OrbitingCircles>
                  </div>

                  <div className="mt-4 flex justify-between items-center z-10">
                    <span className="text-xs text-muted-foreground font-mono">
                      &lt;OrbitingCircles radius=&#123;105&#125; /&gt;
                    </span>
                    <Button variant="glow" size="sm" onClick={() => copySnippet('orbitingCircles')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Orbit Code
                    </Button>
                  </div>
                </Card>

                {/* Retro 3D Horizon Grid Showcase */}
                <Card className="relative overflow-hidden p-6 flex flex-col justify-between min-h-[380px]">
                  <div className="flex items-center justify-between mb-4 z-10">
                    <div>
                      <Badge variant="neon">Synthwave 3D</Badge>
                      <h3 className="text-xl font-bold mt-1">Retro Horizon Grid</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        3D perspective plane scrolling infinitely towards the horizon.
                      </p>
                    </div>
                    <CodeDialog snippetId="retroGrid" />
                  </div>

                  <div className="relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-background/50">
                    <RetroGrid angle={65} cellSize={50} opacity={0.6} />
                    <div className="relative z-10 flex flex-col items-center gap-1 text-center">
                      <span className="text-3xl font-black tracking-widest text-foreground bg-clip-text">
                        RETRO HORIZON
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        120 FPS Infinite Perspective
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center z-10">
                    <span className="text-xs text-muted-foreground font-mono">
                      &lt;RetroGrid angle=&#123;65&#125; /&gt;
                    </span>
                    <Button variant="glow" size="sm" onClick={() => copySnippet('retroGrid')}>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Grid Code
                    </Button>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* 3. SPOTLIGHT SECTION */}
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

              {/* Conic Lamp Header Showcase */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge variant="glow">Conic Neon Illumination</Badge>
                    <h3 className="text-xl font-bold mt-1">Lamp Hero Header</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Dual conic light beams emitting downwards with ambient blur bloom and neon lamp bar.
                    </p>
                  </div>
                  <CodeDialog snippetId="lamp" />
                </div>

                <LampContainer className="border border-border/80">
                  <motion.h3
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.8,
                      ease: 'easeInOut',
                    }}
                    className="bg-gradient-to-br from-foreground to-muted-foreground py-4 bg-clip-text text-center text-3xl sm:text-5xl font-black tracking-tight text-transparent"
                  >
                    Build Interfaces at 120 FPS
                  </motion.h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    Engineered with zero runtime CSS-in-JS lag and spring micro-interactions.
                  </p>
                </LampContainer>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    &lt;LampContainer&gt;...&lt;/LampContainer&gt;
                  </span>
                  <Button variant="glow" size="sm" onClick={() => copySnippet('lamp')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Lamp Code
                  </Button>
                </div>
              </div>

              {/* Tracing Beam Scroll Timeline Showcase */}
              <div className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge variant="glow">Continuous SVG Tracer</Badge>
                    <h3 className="text-xl font-bold mt-1">Scroll Tracing Beam</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      SVG beam dynamically tracks container scroll position with a spring-guided glowing tracer head.
                    </p>
                  </div>
                  <CodeDialog snippetId="tracingBeam" />
                </div>

                <div className="p-8 rounded-2xl border border-border/80 bg-card overflow-hidden">
                  <TracingBeam>
                    <div className="space-y-8 pl-4">
                      <div>
                        <Badge variant="neon">Phase 1</Badge>
                        <h4 className="text-xl font-bold mt-2">Zero-Lag Microsecond Engine</h4>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          Tailwind atomic CSS custom properties evaluate in 0ms without runtime parser locks.
                        </p>
                      </div>
                      <div>
                        <Badge variant="glow">Phase 2</Badge>
                        <h4 className="text-xl font-bold mt-2">120 FPS Compositor Springs</h4>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          All animations utilize Framer Motion hardware transforms run directly on GPU threads.
                        </p>
                      </div>
                      <div>
                        <Badge variant="secondary">Phase 3</Badge>
                        <h4 className="text-xl font-bold mt-2">Dynamic Any-Hex Palette</h4>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          Real-time CSS variable mutations calculate high-contrast foregrounds on the fly.
                        </p>
                      </div>
                    </div>
                  </TracingBeam>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    &lt;TracingBeam&gt;...&lt;/TracingBeam&gt;
                  </span>
                  <Button variant="glow" size="sm" onClick={() => copySnippet('tracingBeam')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Tracing Code
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. BUTTONS SECTION */}
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
                    <InteractiveHoverButton text="Interactive Hover" />
                    <ConfettiButton variant="glow" particleCount={50}>
                      🎉 Confetti Burst
                    </ConfettiButton>
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

              {/* Magnetic Cursor & Shimmer Text Showcase */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge variant="glow" className="gap-1">
                      <Sparkles className="w-3 h-3" /> Magnetic Pull &amp; Shimmer
                    </Badge>
                    <h3 className="text-xl font-bold mt-1">Magnetic Cursor Physics &amp; Shimmer Text</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Hover near the button — it magnetically tracks and snaps back to your cursor with spring dynamics!
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <CodeDialog snippetId="magnetic" />
                    <CodeDialog
                      snippetId="shimmerText"
                      trigger={
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          Shimmer Code
                        </Button>
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-8 py-8 bg-muted/20 rounded-2xl border border-border/60">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-semibold text-muted-foreground">Hover near this button</span>
                    <Magnetic range={100} strength={0.4}>
                      <Button variant="glow" size="lg" className="shadow-glow">
                        <Zap className="w-4 h-4 mr-2" />
                        Magnetic Spring Pull
                      </Button>
                    </Magnetic>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-semibold text-muted-foreground">Apple / Linear Light Shimmer</span>
                    <ShimmerText className="text-2xl sm:text-3xl font-black">
                      ⚡ Doni UI Ultra Performance
                    </ShimmerText>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-mono">
                    &lt;Magnetic&gt;&lt;Button /&gt;&lt;/Magnetic&gt;
                  </span>
                  <Button variant="glow" size="sm" onClick={() => copySnippet('magnetic')}>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Magnetic Code
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* 5. FORMS SECTION */}
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

          {/* 6. DISPLAY SECTION (AVATAR & DROPDOWN) */}
          {activeTab === 'display' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitions.smoothEase}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
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

          {/* 7. FEEDBACK SECTION */}
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

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Smooth Accordion</CardTitle>
                    <CardDescription>
                      Animated height collapse and expanding rotating chevrons.
                    </CardDescription>
                  </div>
                  <CodeDialog snippetId="accordion" trigger={<Button variant="ghost" size="sm" className="h-8 text-xs">View Code</Button>} />
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How does 3D tilt work?</AccordionTrigger>
                      <AccordionContent>
                        Doni UI uses Framer Motion spring physics mapped to pointer coordinates, computing rotateX and rotateY with preserve-3d layers at 120 FPS.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How to copy components to my project?</AccordionTrigger>
                      <AccordionContent>
                        Click any "Copy Code" button in this gallery, or run "npx doni-ui add &lt;component&gt;" in your project terminal.
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
        </>
      )}
    </section>
    )}

    {/* ========================================================================= */}
    {/* 4. VIEW: ICONS PAGE                                                       */}
    {/* ========================================================================= */}
    {currentPage === 'icons' && <IconsView />}

    {/* ========================================================================= */}
    {/* 5. VIEW: VERSIONS PAGE                                                    */}
    {/* ========================================================================= */}
    {currentPage === 'versions' && <VersionsView />}

    {/* ========================================================================= */}
    {/* 6. VIEW: ABOUT PAGE                                                       */}
    {/* ========================================================================= */}
    {currentPage === 'about' && <AboutView />}

    {/* Footer */}
    <footer className="border-t border-border/60 py-12 bg-background/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold text-base">Doni UI Library v0.1.2</span>
            <span className="text-xs text-muted-foreground">
              — Built with love by Charitha
            </span>
          </div>

          {/* Quick Footer Page Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('docs')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Documentation
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('components')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Components
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('icons')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Icons (30)
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('versions')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Versions
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('about')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

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

        <div className="pt-4 border-t border-border/40 flex justify-center">
          <SocialIconDock iconSize={20} className="p-1.5 gap-2 bg-card/40 border-border/50" />
        </div>
      </div>
    </footer>
      </div>
    </TooltipProvider>
  );
}
