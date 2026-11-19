import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Copy,
  Check,
  Search,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { transitions } from '@/lib/utils';
import { useToast } from '../ui/toast';
import {
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
  AnimatedRocket,
  AnimatedPlane,
  AnimatedCar,
  AnimatedBicycle,
  AnimatedAlertTriangle,
  AnimatedShieldCheck,
  AnimatedFlameDanger,
  AnimatedBellRing,
  AnimatedGamepad,
  AnimatedHeadphones,
  AnimatedFilm,
  AnimatedSparkleStar,
  SocialIconDock,
  AnimatedIconDock,
} from '../ui/animated-icons';

interface IconMeta {
  id: string;
  name: string;
  category: 'social' | 'vehicles' | 'warning' | 'entertainment';
  component: React.ReactNode;
  exportName: string;
  effect: string;
}

export const IconsView: React.FC = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [iconSize, setIconSize] = useState(32);
  const [withGlow, setWithGlow] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast({
      title: 'Copied Component Code!',
      description: code,
      type: 'success',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const icons: IconMeta[] = [
    // Social Media
    {
      id: 'github',
      name: 'GitHub',
      category: 'social',
      exportName: 'AnimatedGithub',
      effect: 'Octocat ear wiggle & tail stroke animation',
      component: <AnimatedGithub size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      category: 'social',
      exportName: 'AnimatedTwitter',
      effect: '3D Y-axis neon spin & hover scale',
      component: <AnimatedTwitter size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      category: 'social',
      exportName: 'AnimatedYoutube',
      effect: 'Play triangle pulse & neon bloom glow',
      component: <AnimatedYoutube size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      category: 'social',
      exportName: 'AnimatedLinkedin',
      effect: 'Letter bounce & dot pop spring physics',
      component: <AnimatedLinkedin size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      category: 'social',
      exportName: 'AnimatedInstagram',
      effect: 'Center aperture shutter spin & rainbow glow',
      component: <AnimatedInstagram size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'discord',
      name: 'Discord',
      category: 'social',
      exportName: 'AnimatedDiscord',
      effect: 'Game controller wiggle & eye blink',
      component: <AnimatedDiscord size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'telegram',
      name: 'Telegram',
      category: 'social',
      exportName: 'AnimatedTelegram',
      effect: 'Paper plane banking & flight glide',
      component: <AnimatedTelegram size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      category: 'social',
      exportName: 'AnimatedTiktok',
      effect: 'Cyan & Magenta chromatic aberration glitch',
      component: <AnimatedTiktok size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      category: 'social',
      exportName: 'AnimatedFacebook',
      effect: "3D spring 'f' pop & rotation",
      component: <AnimatedFacebook size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'dribbble',
      name: 'Dribbble',
      category: 'social',
      exportName: 'AnimatedDribbble',
      effect: 'Basketball spinning seams & squash bounce',
      component: <AnimatedDribbble size={iconSize} withGlow={withGlow} />,
    },

    // Vehicles & Transport
    {
      id: 'rocket',
      name: 'Rocket',
      category: 'vehicles',
      exportName: 'AnimatedRocket',
      effect: 'Thruster flame flicker & liftoff elevation',
      component: <AnimatedRocket size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'plane',
      name: 'Airplane',
      category: 'vehicles',
      exportName: 'AnimatedPlane',
      effect: 'Aerodynamic banking tilt & flight glide',
      component: <AnimatedPlane size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'car',
      name: 'Electric Car',
      category: 'vehicles',
      exportName: 'AnimatedCar',
      effect: 'Suspension bounce & spinning wheel rims',
      component: <AnimatedCar size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'bicycle',
      name: 'Bicycle',
      category: 'vehicles',
      exportName: 'AnimatedBicycle',
      effect: 'Dual spinning wheel spokes & forward pedal glide',
      component: <AnimatedBicycle size={iconSize} withGlow={withGlow} />,
    },

    // Warning & Status
    {
      id: 'alert-triangle',
      name: 'Alert Hazard',
      category: 'warning',
      exportName: 'AnimatedAlertTriangle',
      effect: 'Warning vibration shake & pulsating exclamation',
      component: <AnimatedAlertTriangle size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'shield-check',
      name: 'Shield Verified',
      category: 'warning',
      exportName: 'AnimatedShieldCheck',
      effect: 'Checkmark SVG path drawing & emerald glow',
      component: <AnimatedShieldCheck size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'flame-danger',
      name: 'Danger Flame',
      category: 'warning',
      exportName: 'AnimatedFlameDanger',
      effect: 'Dancing multi-layer flame tongues & heat bloom',
      component: <AnimatedFlameDanger size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'bell-ring',
      name: 'Notification Bell',
      category: 'warning',
      exportName: 'AnimatedBellRing',
      effect: 'Pendulum bell swing & radiating sound ring',
      component: <AnimatedBellRing size={iconSize} withGlow={withGlow} />,
    },

    // Entertainment & Media
    {
      id: 'gamepad',
      name: 'Gamepad Console',
      category: 'entertainment',
      exportName: 'AnimatedGamepad',
      effect: 'Tactile button clicks & neon violet glow',
      component: <AnimatedGamepad size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'headphones',
      name: 'Audio Headphones',
      category: 'entertainment',
      exportName: 'AnimatedHeadphones',
      effect: 'Dynamic sound equalizer wave bars bouncing',
      component: <AnimatedHeadphones size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'film',
      name: 'Cinema Film Reel',
      category: 'entertainment',
      exportName: 'AnimatedFilm',
      effect: 'Film spool frame steps & projector glow',
      component: <AnimatedFilm size={iconSize} withGlow={withGlow} />,
    },
    {
      id: 'sparkle-star',
      name: 'Magic Star',
      category: 'entertainment',
      exportName: 'AnimatedSparkleStar',
      effect: '180° Twinkle star rotation & golden aura',
      component: <AnimatedSparkleStar size={iconSize} withGlow={withGlow} />,
    },
  ];

  const filteredIcons = icons.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.effect.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.smoothEase}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="glow" withPulse className="px-3 py-1 text-xs">
          ✨ Component Icons Suite (22 Animated Icons)
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Animated <span className="text-primary">Component Icons</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          Micro-interaction vector icons built as pure React components. Hover or tap to trigger spring animations, neon glows, and tactile responses.
        </p>
      </div>

      {/* Floating Docks Showcase */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Ready-to-Use Glassmorphic Floating Docks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-card/70 border-border/70 flex flex-col items-center justify-between gap-4 text-center">
            <div>
              <h3 className="font-bold text-sm">Social Media Icon Dock</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Displays 10 social channels with hover spring magnification
              </p>
            </div>
            <SocialIconDock iconSize={22} className="w-full justify-center" />
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                copyCode(
                  `import { SocialIconDock } from 'doni-ui';\n\n<SocialIconDock iconSize={24} />`,
                  'dock-social'
                )
              }
            >
              {copiedId === 'dock-social' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 mr-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1" />
              )}
              Copy Social Dock Code
            </Button>
          </Card>

          <Card className="p-6 bg-card/70 border-border/70 flex flex-col items-center justify-between gap-4 text-center">
            <div>
              <h3 className="font-bold text-sm">Multi-Category Animated Dock</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configurable dock accepting any mix of animated icons
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
              onClick={() =>
                copyCode(
                  `import { AnimatedIconDock } from 'doni-ui';\n\n<AnimatedIconDock icons={['rocket', 'shield-check', 'gamepad', 'headphones', 'sparkle-star']} iconSize={24} />`,
                  'dock-multi'
                )
              }
            >
              {copiedId === 'dock-multi' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 mr-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1" />
              )}
              Copy Multi Dock Code
            </Button>
          </Card>
        </div>
      </div>

      {/* Controls & Category Bar */}
      <Card className="p-4 bg-card/90 border-border/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: `All (${icons.length})` },
              { id: 'social', label: 'Social Media (10)' },
              { id: 'vehicles', label: 'Vehicles & Transport (4)' },
              { id: 'warning', label: 'Warning & Status (4)' },
              { id: 'entertainment', label: 'Entertainment & Media (4)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Interactive Adjusters */}
          <div className="flex flex-wrap items-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-border/50">
            {/* Live Size Slider */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Size:</span>
              <input
                type="range"
                min={20}
                max={48}
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
                className="w-20 accent-primary cursor-pointer"
              />
              <span className="text-xs font-mono font-bold w-7 text-right">{iconSize}px</span>
            </div>

            {/* Glow Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Neon Glow:</span>
              <Switch checked={withGlow} onCheckedChange={setWithGlow} />
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Filter icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs bg-background"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Icons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredIcons.map((icon) => (
          <Card
            key={icon.id}
            className="p-5 flex flex-col justify-between hover:border-primary/50 transition-all group bg-card/60 backdrop-blur-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">
                  {icon.category}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-mono">React Component</span>
              </div>

              {/* Icon Interactive Display */}
              <div className="py-6 flex items-center justify-center">
                {icon.component}
              </div>

              <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                {icon.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {icon.effect}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between gap-2">
              <code className="text-[11px] font-mono text-primary font-semibold truncate">
                &lt;{icon.exportName} /&gt;
              </code>
              <Button
                variant="glow"
                size="sm"
                className="h-7 text-xs px-2.5"
                onClick={() =>
                  copyCode(
                    `import { ${icon.exportName} } from 'doni-ui';\n\n<${icon.exportName} size={${iconSize}} withGlow={${withGlow}} />`,
                    icon.id
                  )
                }
              >
                {copiedId === icon.id ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3 mr-1" />
                )}
                {copiedId === icon.id ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div className="p-12 text-center border border-dashed border-border rounded-2xl">
          <p className="text-muted-foreground text-sm">No icons match your search.</p>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => setSearchQuery('')}>
            Clear Filter
          </Button>
        </div>
      )}

      {/* Documentation & Props API Section */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <h2 className="text-2xl font-bold tracking-tight">Animated Icon Component API</h2>
        <p className="text-sm text-muted-foreground">
          All animated icons are fully typed, accept all Framer Motion props, and can be customized with dynamic sizing, brand glows, and event handlers:
        </p>

        <Card className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 font-semibold text-muted-foreground">
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              <tr>
                <td className="p-3 text-primary font-bold">size</td>
                <td className="p-3 text-muted-foreground">number</td>
                <td className="p-3">28</td>
                <td className="p-3 font-sans text-foreground">Pixel width and height of the icon SVG</td>
              </tr>
              <tr>
                <td className="p-3 text-primary font-bold">withGlow</td>
                <td className="p-3 text-muted-foreground">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3 font-sans text-foreground">Whether to display brand-colored neon bloom on hover</td>
              </tr>
              <tr>
                <td className="p-3 text-primary font-bold">className</td>
                <td className="p-3 text-muted-foreground">string</td>
                <td className="p-3">""</td>
                <td className="p-3 font-sans text-foreground">Additional Tailwind CSS classes applied to container</td>
              </tr>
              <tr>
                <td className="p-3 text-primary font-bold">whileHover</td>
                <td className="p-3 text-muted-foreground">TargetAndTransition</td>
                <td className="p-3">Custom Spring</td>
                <td className="p-3 font-sans text-foreground">Framer Motion hover animation overrides</td>
              </tr>
              <tr>
                <td className="p-3 text-primary font-bold">onClick</td>
                <td className="p-3 text-muted-foreground">(e) =&gt; void</td>
                <td className="p-3">undefined</td>
                <td className="p-3 font-sans text-foreground">Click interaction handler</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </motion.div>
  );
};
