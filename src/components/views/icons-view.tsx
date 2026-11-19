import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Copy,
  Check,
  Search,
  Sliders,
  Zap,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { transitions } from '@/lib/utils';
import { useToast } from '../ui/toast';
import {
  ALL_ANIMATED_ICONS,
  IconItemDef,
} from '../ui/animated-icons-suite';
import { IconCustomizerModal } from '../ui/icon-customizer-modal';
import { SocialIconDock, AnimatedIconDock } from '../ui/animated-icons';

export const IconsView: React.FC = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSize, setGlobalSize] = useState<number>(32);
  const [globalGlow, setGlobalGlow] = useState<boolean>(true);
  const [globalLoop, setGlobalLoop] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Customizer modal state
  const [selectedIcon, setSelectedIcon] = useState<IconItemDef | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCustomizer = (iconDef: IconItemDef) => {
    setSelectedIcon(iconDef);
    setIsModalOpen(true);
  };

  const copyQuickCode = (e: React.MouseEvent, iconDef: IconItemDef) => {
    e.stopPropagation();
    const code = `import { ${iconDef.exportName} } from 'doni-ui';\n\n<${iconDef.exportName} size={${globalSize}} withGlow={${globalGlow}} />`;
    navigator.clipboard.writeText(code);
    setCopiedId(iconDef.id);
    toast({
      title: 'Copied Code!',
      description: `<${iconDef.exportName} /> ready to paste`,
      type: 'success',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all', label: `All (${ALL_ANIMATED_ICONS.length})` },
    { id: 'social', label: 'Social & Dev (10)' },
    { id: 'vehicles', label: 'Vehicles & Transport (10)' },
    { id: 'warning', label: 'Warning & Security (10)' },
    { id: 'entertainment', label: 'Entertainment & Gaming (10)' },
    { id: 'weather', label: 'Weather & Nature (10)' },
    { id: 'interface', label: 'Interface & Controls (10)' },
    { id: 'business', label: 'Business & Finance (10)' },
    { id: 'communication', label: 'Communication & Network (10)' },
    { id: 'content', label: 'Content & Creative (10)' },
    { id: 'tools', label: 'Tools & Productivity (10)' },
  ];

  const filteredIcons = ALL_ANIMATED_ICONS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.smoothEase}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10"
    >
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <Badge variant="glow" withPulse className="px-4 py-1.5 text-xs">
          ✨ 100 Handcrafted Animated Icons Suite (10 Categories)
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
          Animated <span className="text-primary">Icons &amp; Studio</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          GPU spring-animated vector icons with interactive micro-physics, brand glows, and customizable properties. <strong>Click any icon to customize it one-by-one!</strong>
        </p>
      </div>

      {/* Floating Docks Teaser */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Glassmorphic Interactive Docks
          </h2>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Hover icons to test spring magnification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-card/70 border-border/70 flex flex-col items-center justify-between gap-4 text-center">
            <div>
              <h3 className="font-bold text-sm">Social Media Channels Dock</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                10 preconfigured social channels with hover neon bloom
              </p>
            </div>
            <SocialIconDock iconSize={22} className="w-full justify-center" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(
                  `import { SocialIconDock } from 'doni-ui';\n\n<SocialIconDock iconSize={24} />`
                );
                toast({ title: 'Copied Social Dock Code!', type: 'success' });
              }}
            >
              <Copy className="w-3.5 h-3.5 mr-1" />
              Copy Social Dock Code
            </Button>
          </Card>

          <Card className="p-6 bg-card/70 border-border/70 flex flex-col items-center justify-between gap-4 text-center">
            <div>
              <h3 className="font-bold text-sm">Custom Multi-Category Dock</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mix and match any icons with responsive magnification
              </p>
            </div>
            <AnimatedIconDock
              iconSize={22}
              icons={['rocket', 'shield-check', 'gamepad', 'headphones', 'sparkle-star', 'github']}
              className="w-full justify-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(
                  `import { AnimatedIconDock } from 'doni-ui';\n\n<AnimatedIconDock icons={['rocket', 'shield-check', 'gamepad', 'headphones', 'sparkle-star']} iconSize={24} />`
                );
                toast({ title: 'Copied Multi Dock Code!', type: 'success' });
              }}
            >
              <Copy className="w-3.5 h-3.5 mr-1" />
              Copy Multi Dock Code
            </Button>
          </Card>
        </div>
      </div>

      {/* Global Controls & Category Pills */}
      <Card className="p-5 bg-card/90 border-border/80 shadow-sm space-y-4">
        {/* Top Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-foreground">Live Studio Quick Controls:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Global Size Slider */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">Grid Size:</span>
              <input
                type="range"
                min={20}
                max={48}
                value={globalSize}
                onChange={(e) => setGlobalSize(Number(e.target.value))}
                className="w-20 accent-primary cursor-pointer"
              />
              <span className="text-xs font-mono font-bold w-7 text-right">{globalSize}px</span>
            </div>

            {/* Neon Glow Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">Neon Glow:</span>
              <Switch checked={globalGlow} onCheckedChange={setGlobalGlow} />
            </div>

            {/* Continuous Loop Mode */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                Loop All:
              </span>
              <Switch checked={globalLoop} onCheckedChange={setGlobalLoop} />
            </div>

            {/* Instant Filter Search */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search 100 icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs bg-background"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm ring-1 ring-primary/40'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Icons Grid (100 Icons) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredIcons.map((item) => {
          const IconComponent = item.component;
          return (
            <Card
              key={item.id}
              onClick={() => openCustomizer(item)}
              className="p-5 flex flex-col justify-between hover:border-primary/60 transition-all group bg-card/60 backdrop-blur-sm cursor-pointer hover:shadow-glow relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0">
                    {item.category}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-0.5">
                    Customize →
                  </span>
                </div>

                {/* Live Icon Component Preview */}
                <div className="py-5 flex items-center justify-center">
                  <IconComponent
                    size={globalSize}
                    withGlow={globalGlow}
                    continuous={globalLoop}
                  />
                </div>

                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {item.name}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 leading-snug">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between gap-1">
                <code className="text-[10px] font-mono text-primary font-semibold truncate max-w-[110px]">
                  &lt;{item.exportName} /&gt;
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[11px] px-2 opacity-80 group-hover:opacity-100"
                  onClick={(e) => copyQuickCode(e, item)}
                >
                  {copiedId === item.id ? (
                    <Check className="w-3 h-3 text-emerald-500 mr-1" />
                  ) : (
                    <Copy className="w-3 h-3 mr-1" />
                  )}
                  {copiedId === item.id ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <div className="p-12 text-center border border-dashed border-border rounded-3xl bg-muted/10">
          <p className="text-muted-foreground text-sm">No icons found matching your query.</p>
          <Button variant="ghost" size="sm" className="mt-3" onClick={() => setSearchQuery('')}>
            Reset Filter
          </Button>
        </div>
      )}

      {/* Component API Props Documentation */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Animated Icon Props &amp; Types</h2>
          <Badge variant="outline" className="font-mono text-xs">
            TypeScript 100% Typed
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Every animated icon in the suite accepts all standard Framer Motion props plus these specialized customization options:
        </p>

        <Card className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 font-semibold text-muted-foreground">
                <th className="p-3.5">Prop Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Default</th>
                <th className="p-3.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              <tr>
                <td className="p-3.5 text-primary font-bold">size</td>
                <td className="p-3.5 text-muted-foreground">number</td>
                <td className="p-3.5">28</td>
                <td className="p-3.5 font-sans text-foreground">Pixel dimensions (width &amp; height) of the SVG icon</td>
              </tr>
              <tr>
                <td className="p-3.5 text-primary font-bold">strokeWidth</td>
                <td className="p-3.5 text-muted-foreground">number</td>
                <td className="p-3.5">2</td>
                <td className="p-3.5 font-sans text-foreground">Vector stroke line thickness (e.g. 1.5, 2, 2.5)</td>
              </tr>
              <tr>
                <td className="p-3.5 text-primary font-bold">color</td>
                <td className="p-3.5 text-muted-foreground">string</td>
                <td className="p-3.5">"currentColor"</td>
                <td className="p-3.5 font-sans text-foreground">Base color or any hex string (e.g. "#06b6d4")</td>
              </tr>
              <tr>
                <td className="p-3.5 text-primary font-bold">hoverColor</td>
                <td className="p-3.5 text-muted-foreground">string</td>
                <td className="p-3.5">"var(--primary)"</td>
                <td className="p-3.5 font-sans text-foreground">Accent color applied smoothly on cursor hover / focus</td>
              </tr>
              <tr>
                <td className="p-3.5 text-primary font-bold">withGlow</td>
                <td className="p-3.5 text-muted-foreground">boolean</td>
                <td className="p-3.5">true</td>
                <td className="p-3.5 font-sans text-foreground">Renders ambient neon color bloom on active trigger</td>
              </tr>
              <tr>
                <td className="p-3.5 text-primary font-bold">trigger</td>
                <td className="p-3.5 text-muted-foreground">"hover" | "continuous" | "click"</td>
                <td className="p-3.5">"hover"</td>
                <td className="p-3.5 font-sans text-foreground">How physics animation is activated</td>
              </tr>
              <tr>
                <td className="p-3.5 text-primary font-bold">bgShape</td>
                <td className="p-3.5 text-muted-foreground">"none" | "square" | "circle" | "glass"</td>
                <td className="p-3.5">"none"</td>
                <td className="p-3.5 font-sans text-foreground">Container framing style (dock, tile, badge, bare)</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Live Customizer Modal */}
      <IconCustomizerModal
        iconDef={selectedIcon}
        allIcons={ALL_ANIMATED_ICONS}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectIcon={(newDef) => setSelectedIcon(newDef)}
      />
    </motion.div>
  );
};
