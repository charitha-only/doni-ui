import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { transitions } from '@/lib/utils';

interface VersionRelease {
  version: string;
  title: string;
  date: string;
  isLatest?: boolean;
  isMilestone?: boolean;
  highlights: string[];
  componentsAdded: string[];
  githubUrl: string;
}

export const VersionsView: React.FC = () => {
  const releases: VersionRelease[] = [
    {
      version: 'v0.6.0',
      title: 'Web Audio Micro-Sound Effects Engine: Zero-Byte Procedural Sound Synthesis for Modern UI',
      date: 'November 20, 2026',
      isLatest: true,
      isMilestone: true,
      highlights: [
        'Zero-Byte Web Audio API Synthesis: Native procedural audio synthesis using browser oscillators — 0 external audio files (.mp3/.wav), 0 network overhead, and zero latency.',
        '6 Tactile Sound Profiles: Mechanical clicks, bubbly UI pops, harmonic theme chimes, tactile switches, tab blips, and 2-tone euphoric success chords.',
        'Global Audio SFX Controller: 1-click audio toggle button integrated directly into the pinned theme bar with localStorage persistence.',
        'Interactive Sound Integration: Real-time tactile feedback on theme color swatches, radius sliders, nav tabs, dark/light mode toggle, and code snippet copying.',
        'Exportable Audio Engine: Fully tree-shakeable `playUiSound`, `toggleSound`, and `isSoundEnabled` utilities exported for any React app.',
      ],
      componentsAdded: [
        'WebAudioSynth',
        'SoundEffectsEngine',
        'SoundToggleButton',
      ],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.6.0',
    },
    {
      version: 'v0.5.0',
      title: 'OpenGraph Social Sharing Engine, Branded Vector Card, Pinned Theme Engine & Cyber Cyan Default',
      date: 'November 20, 2026',
      isLatest: false,
      isMilestone: true,
      highlights: [
        'OpenGraph & Twitter Card SEO Engine: Rich meta tags, preview images, high-contrast title and description for professional link sharing across WhatsApp, Twitter/X, Discord, Slack, and LinkedIn.',
        'Branded Vector Social Banner (og-image.svg): Crisp 1200x630 vector preview card featuring Doni UI brand glow, Cyber Cyan radial beam, stats badges, and modern grid background.',
        'Pinned Theme Studio & Color Engine: High-end glassmorphic control bar pinned persistently across every single tab and page (Home, Docs, Components, Icons, Versions, About) with custom hex picker, preset swatches, and live border-radius selector.',
        'Cyber Cyan (#06b6d4) Default Theme: Replaced violet with the world\'s #1 highest-attraction, modern high-contrast neon cyan primary theme for dark mode UI.',
      ],
      componentsAdded: [
        'PinnedThemeBar',
        'SocialShareCard',
        'OpenGraphMeta',
      ],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.5.0',
    },
    {
      version: 'v0.4.0',
      title: '15 High-Demand Production Core Components: Data Table, File Upload, Stepper, Drawer, Widgets & KPIs',
      date: 'November 20, 2026',
      isLatest: false,
      isMilestone: true,
      highlights: [
        'Added 15 new enterprise-grade, production-ready React UI components: Data Table, File Upload Dropzone, Multi-Step Stepper, Drawer (Sheet Modal), Breadcrumbs, Animated Carousel, Color Picker, Toggle Group, Standalone Pagination, Star Rating, Animated Progress, Metric Stat Cards, Vertical Timeline, Badge Delta, and Aspect Ratio.',
        'DataTable: Full-featured table with animated sorting indicators, instant live search filtering, row selection checkboxes, and paginated controls.',
        'FileUpload: Drag-and-drop file upload zone with spring physics, file size validation, file type icons, and remove actions.',
        'Stepper: Multi-step wizard with animated progress line, active step glow, and checkmarks.',
        'Drawer: Fluid bottom and side drawer sheets with gesture handles, spring animations, and accessible keyboard dismissal.',
        'Interactive Widgets & KPIs: Metric StatCards with positive/negative trend pills, Star Rating with hover preview, Color Picker with presets and hex copy, and Touch-friendly Carousel.',
        'Component Gallery Expansion: Added dedicated "Data & App" and "Widgets & KPIs" tabs with live interactive playgrounds and 1-click code copying.',
      ],
      componentsAdded: [
        'DataTable',
        'FileUpload',
        'Stepper',
        'Drawer',
        'Breadcrumbs',
        'Carousel',
        'ColorPicker',
        'ToggleGroup',
        'Pagination',
        'Rating',
        'Progress',
        'StatCard',
        'Timeline',
        'BadgeDelta',
        'AspectRatio',
      ],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.4.0',
    },
    {
      version: 'v0.3.0',
      title: '1,000+ Categorized Animated Icons Suite, High-Performance Paginated Studio & Global Search',
      date: 'November 20, 2026',
      isLatest: false,
      isMilestone: true,
      highlights: [
        'Expanded Animated Icon Suite to over 1,100 total vector icons, featuring a 1,000-icon Super Catalog across 20 distinct domains (50 icons each) plus 100 signature handcrafted 3D animated icons.',
        '20 Curated Icon Domains: Navigation & Arrows, Devices & Hardware, Code & Development, Media, Commerce & Finance, Communication & Chat, Security & Warnings, Weather & Climate, Files & Documents, Interface & Controls, Health & Medical, Design & Graphics, Travel & Transport, Gaming & Play, Science & Education, Food & Dining, Tools & Hardware, Nature & Ecology, Sports & Fitness, and Badges & Symbols.',
        'High-Performance Paginated Rendering Engine (60 icons per page) ensuring 120 FPS hardware-accelerated animations with zero DOM lag or browser stutter.',
        'One-by-One Customization Studio integration: Every single icon from the 1,000+ catalog can be customized with size (18-96px), stroke width (1-3px), custom hex colors + palette swatches, hover tint, neon glow, animation triggers, and container tile styles.',
        'Global Studio Quick Toolbar: Instant live search across all 1,000+ icons, horizontal category filter pills with live counters, size slider, tile shape selector, glow switch, and loop-all mode.',
        'Added AnimatedCatalogIcon and ICON_1000_CATALOG to core library exports.',
      ],
      componentsAdded: [
        'AnimatedCatalogIcon',
        'ICON_1000_CATALOG',
        'ICON_1000_CATEGORIES',
        'getLucideComponent',
      ],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.3.0',
    },
    {
      version: 'v0.2.0',
      title: '100+ Handcrafted Animated Icons Suite, Live Icon Customizer Studio & Clean Homepage Redesign',
      date: 'November 19, 2026',
      isLatest: false,
      isMilestone: true,
      highlights: [
        'Massive 100 Animated Vector Icons suite across 10 rich categories (10 icons each): Social & Dev, Vehicles & Transport, Warning & Security, Entertainment & Gaming, Weather & Nature, Interface & Controls, Business & Finance, Communication & Network, Content & Creative, and Tools & Productivity.',
        'Interactive Live Customizer Studio modal: Customize size (18px-96px), stroke thickness, live color pickers + palette swatches, ambient neon glow, animation trigger loops (hover / continuous / click), and tile shape (none, glass dock, rounded box, circle tile).',
        'Direct 1-Click Code Exporter: Generates dynamic customized React JSX snippet and ready-to-run CLI copy command.',
        'Redesigned Homepage layout: Removed duplicate stacked navigation bars, cleaned up Hero actions, eliminated visual clutter, and organized layout with ample visual breathing room.',
        'Enhanced Global Icons Grid: Real-time search by icon name, category, or keyword, global size adjuster, glow toggle, and loop-all mode.',
        'Updated CLI bundler to automatically package full icon suite and customizer studio dependencies.',
      ],
      componentsAdded: [
        'IconCustomizerModal',
        'IconGithub',
        'IconTwitter',
        'IconYoutube',
        'IconLinkedin',
        'IconInstagram',
        'IconDiscord',
        'IconTelegram',
        'IconTiktok',
        'IconFacebook',
        'IconDribbble',
        'IconRocket',
        'IconPlane',
        'IconCar',
        'IconBicycle',
        'IconTrain',
        'IconShip',
        'IconHelicopter',
        'IconTruck',
        'IconDrone',
        'IconScooter',
        'IconAlertTriangle',
        'IconShieldCheck',
        'IconFlameDanger',
        'IconBellRing',
        'IconLockKey',
        'IconFingerprint',
        'IconEyeScanner',
        'IconBugFix',
        'IconShieldAlert',
        'IconCpuChip',
        'IconGamepad',
        'IconHeadphones',
        'IconFilmReel',
        'IconSparkleStar',
        'IconTrophy',
        'IconDice',
        'IconCamera',
        'IconMusicNote',
        'IconClapperboard',
        'IconTvMonitor',
        'IconSun',
        'IconMoonStars',
        'IconCloudRain',
        'IconSnowflake',
        'IconLightningBolt',
        'IconWindBreeze',
        'IconPlanetSaturn',
        'IconCompassRose',
        'IconMountainPeak',
        'IconLeafEco',
        'IconSearchLens',
        'IconTrashCan',
        'IconSettingsCog',
        'IconHeartLike',
        'IconBookmarkPin',
        'IconShareNodes',
        'IconDownloadArrow',
        'IconUploadArrow',
        'IconRefreshSync',
        'IconPowerSwitch',
        'IconCreditCard',
        'IconWalletMoney',
        'IconShoppingCart',
        'IconShoppingBag',
        'IconBankVault',
        'IconBarChart',
        'IconTrendingUp',
        'IconDollarCoin',
        'IconReceiptBill',
        'IconBriefcase',
        'IconMessageChat',
        'IconMailEnvelope',
        'IconPhoneCall',
        'IconVideoCamera',
        'IconSendPlane',
        'IconAtSign',
        'IconGlobeWeb',
        'IconUserProfile',
        'IconUsersGroup',
        'IconThumbsUp',
        'IconFileText',
        'IconFolderOpen',
        'IconEditPencil',
        'IconCopyClipboard',
        'IconScissorsCut',
        'IconPaperclipAttach',
        'IconSaveDisk',
        'IconCodeBrackets',
        'IconImagePic',
        'IconPaletteColor',
        'IconLightbulbIdea',
        'IconBatteryCharging',
        'IconWifiSignal',
        'IconCalendarDate',
        'IconClockTimer',
        'IconGaugeMeter',
        'IconMagnetPhysics',
        'IconAtomScience',
        'IconWrenchTool',
        'IconAwardBadge',
      ],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.2.0',
    },
    {
      version: 'v0.1.2',
      title: 'Modular Multi-Page Architecture & 30 Animated Component Icons Suite',
      date: 'November 19, 2026',
      isLatest: false,
      isMilestone: true,
      highlights: [
        'Complete top-level navigation system with dedicated Home, Documentation, Components, Icons, Versions, and About pages.',
        'Expanded Animated Icon Suite to 30 handcrafted component icons across 6 categories: Social Media (10), Vehicles & Transport (4), Warning & Status (4), Entertainment & Media (4), Weather & Nature (4), and Interface & Controls (4).',
        'Added dynamic icon controls: Live size slider (20px-48px), neon glow toggler, and search filter.',
        'New AnimatedIconDock and SocialIconDock glassmorphic floating bars.',
        'Official Documentation Hub with package manager selector, CLI guide, Any-Color Engine docs, and FAQ.',
        'Enhanced CLI with automatic dependency bundling (e.g. npx doni-ui add animated-icons).',
        'Detailed Version History hub with release notes for every version.',
      ],
      componentsAdded: [
        'AnimatedRocket',
        'AnimatedPlane',
        'AnimatedCar',
        'AnimatedBicycle',
        'AnimatedAlertTriangle',
        'AnimatedShieldCheck',
        'AnimatedFlameDanger',
        'AnimatedBellRing',
        'AnimatedGamepad',
        'AnimatedHeadphones',
        'AnimatedFilm',
        'AnimatedSparkleStar',
        'AnimatedSun',
        'AnimatedMoonStars',
        'AnimatedCloudRain',
        'AnimatedSnowflake',
        'AnimatedSearch',
        'AnimatedTrash',
        'AnimatedSettingsGear',
        'AnimatedHeart',
        'AnimatedIconDock',
      ],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.1.2',
    },
    {
      version: 'v0.1.1',
      title: 'Handcrafted Animated Social Media Icons Suite (10 Icons)',
      date: 'November 19, 2026',
      highlights: [
        'Introduced 10 spring-animated social media micro-interaction icons with neon brand glows.',
        'Created glassmorphic SocialIconDock bar for website footers and headers.',
        'Integrated dedicated Icons tab in showcase with 1-click code copying.',
        'Added CLI component support via npx doni-ui add animated-social-icons.',
      ],
      componentsAdded: [
        'AnimatedGithub',
        'AnimatedTwitter',
        'AnimatedYoutube',
        'AnimatedLinkedin',
        'AnimatedInstagram',
        'AnimatedDiscord',
        'AnimatedTelegram',
        'AnimatedTiktok',
        'AnimatedFacebook',
        'AnimatedDribbble',
        'SocialIconDock',
      ],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.1.1',
    },
    {
      version: 'v0.1.0',
      title: 'Milestone Release — Holographic GlareCard, Direction-Aware Hover & Tracing Beam',
      date: 'November 19, 2026',
      isMilestone: true,
      highlights: [
        'Reached v0.1.0 milestone with 40+ production-grade components.',
        'Added 3D Holographic Rainbow Glare Card with dynamic pointer glint.',
        'Added Direction-Aware Hover Card calculating angle entry vector.',
        'Added SVG Scroll Tracing Beam with glowing spring tracer.',
        'Enhanced package CLI with commandPalette and component generators.',
      ],
      componentsAdded: ['GlareCard', 'DirectionAwareHover', 'TracingBeam'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.1.0',
    },
    {
      version: 'v0.0.9',
      title: 'WavyBackground Canvas Waves & ExpandableCard Morphing',
      date: 'November 19, 2026',
      highlights: [
        'High-performance Canvas 2D fluid sine waves with customizable speeds and wave colors.',
        'Framer Motion layoutId morphing cards that expand into full modal dialogs with smooth backdrops.',
      ],
      componentsAdded: ['WavyBackground', 'ExpandableCard'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.9',
    },
    {
      version: 'v0.0.8',
      title: 'OrbitingCircles Concentric Orbits, RetroGrid Cyber Horizon & ConfettiButton',
      date: 'November 19, 2026',
      highlights: [
        'Planetary orbiting circles with counter-rotation lock keeping child icons upright.',
        '3D perspective cyber grid rolling infinitely into the horizon.',
        'Tactile ConfettiButton triggering hardware canvas celebration bursts.',
      ],
      componentsAdded: ['OrbitingCircles', 'RetroGrid', 'ConfettiButton'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.8',
    },
    {
      version: 'v0.0.7',
      title: 'InteractiveHoverButton, Lens Zoom, ShimmerText & NumberTicker',
      date: 'November 19, 2026',
      highlights: [
        'Interactive expanding circular fill button with sliding typography.',
        'Cursor-tracking zoom lens with 2.0x magnification and lens flare.',
        'Apple-style shimmer text sheen animation.',
        'Spring-interpolated number counter ticker for KPIs.',
      ],
      componentsAdded: ['InteractiveHoverButton', 'Lens', 'ShimmerText', 'NumberTicker'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.7',
    },
    {
      version: 'v0.0.6',
      title: 'EvervaultCard Matrix Mask, SparklesCore & Dot Grid Background',
      date: 'November 19, 2026',
      highlights: [
        'Real-time pointer cryptographic random character mask with holographic glow.',
        'Hardware-accelerated 60 FPS canvas particle sparkles.',
        'Radial-masked geometric dot matrix and linear grid pattern.',
      ],
      componentsAdded: ['EvervaultCard', 'SparklesCore', 'GridBackground', 'LampContainer', 'Magnetic'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.6',
    },
    {
      version: 'v0.0.5',
      title: '3D Perspective Tilt Card, 3D FlipWords & Staggered TextReveal',
      date: 'November 19, 2026',
      highlights: [
        'Mouse-tracking CardContainer with true 3D perspective and translateZ child layer elevation.',
        'Letter-by-letter 3D flip rotation between rotating keyword arrays.',
        'Apple & Linear inspired blur-to-focus word reveal entrance.',
      ],
      componentsAdded: ['CardContainer', 'CardItem', 'FlipWords', 'TextReveal'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.5',
    },
    {
      version: 'v0.0.4',
      title: 'CommandPalette ⌘K Spotlight & FloatingDock macOS Magnification',
      date: 'November 19, 2026',
      highlights: [
        'Global spotlight search dialog with instant component filtering and 1-click CLI copy.',
        'macOS dock magnification with spring distance interpolation.',
      ],
      componentsAdded: ['CommandPalette', 'FloatingDock'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.4',
    },
    {
      version: 'v0.0.3',
      title: 'Keycap Mechanical Audio Synthesizer, BorderBeam Laser & Meteors',
      date: 'November 19, 2026',
      highlights: [
        'Vintage mechanical 3D keycap with Web Audio API synthesized switch clicks.',
        'Continuous perimeter laser border beam.',
        'Shooting stars and meteors with glowing linear tails.',
        'Concentric pulsing water ripple waves and Bento Grid layout.',
      ],
      componentsAdded: ['Keycap', 'BorderBeam', 'Meteors', 'Ripple', 'BentoGrid'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.3',
    },
    {
      version: 'v0.0.2',
      title: 'TubelightNavbar, SpotlightCard & FlameButton',
      date: 'November 19, 2026',
      highlights: [
        'Electric glowing lamp beam indicator with spring slide physics.',
        'Mouse-tracking radial flashlight spotlight card.',
        'Rotating conic gradient border beam button with ambient flame bloom.',
        'Continuous GPU marquee and typewriter text effect.',
      ],
      componentsAdded: ['TubelightNavbar', 'SpotlightCard', 'FlameButton', 'Marquee', 'Typewriter'],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.2',
    },
    {
      version: 'v0.0.1',
      title: 'Initial Foundation Release — 14 Core Radix & Framer Motion Components',
      date: 'November 19, 2026',
      highlights: [
        'Initial release of Doni UI library.',
        'Dynamic Any-Color Engine with ThemeProvider, useTheme, and 7 preset themes.',
        '14 core accessible Radix UI primitives with spring animations.',
        'Dual Vite build pipeline: Showcase app + standalone library bundle.',
        'GitHub Pages CI/CD automated deployment action.',
      ],
      componentsAdded: [
        'Button',
        'Card',
        'Badge',
        'Input',
        'Switch',
        'Tabs',
        'Dialog',
        'Accordion',
        'Tooltip',
        'Toast',
        'Avatar',
        'Slider',
        'DropdownMenu',
        'Skeleton',
      ],
      githubUrl: 'https://github.com/charitha-only/doni-ui/releases/tag/v0.0.1',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.smoothEase}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="glow" withPulse className="px-3 py-1 text-xs">
          📜 Release History & Semantic Versioning
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Doni UI <span className="text-primary">Version Timeline</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          Complete, transparent changelog of every milestone and release from v0.0.1 to {releases[0].version}.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-border/80 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12">
        {releases.map((rel) => (
          <div key={rel.version} className="relative group">
            {/* Timeline node */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-background flex items-center justify-center transition-transform group-hover:scale-125 ${
                rel.isLatest
                  ? 'bg-primary ring-4 ring-primary/20'
                  : rel.isMilestone
                  ? 'bg-cyan-500'
                  : 'bg-muted-foreground'
              }`}
            />

            <Card className="p-6 bg-card/80 border-border/80 backdrop-blur-sm group-hover:border-primary/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-black text-foreground">
                    {rel.version}
                  </span>
                  {rel.isLatest && (
                    <Badge variant="glow" className="text-xs">
                      Latest Release
                    </Badge>
                  )}
                  {rel.isMilestone && (
                    <Badge variant="outline" className="text-xs border-cyan-500/40 text-cyan-400">
                      Major Milestone
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {rel.date}
                  </span>
                  <a
                    href={rel.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                  >
                    GitHub Release
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <h3 className="font-bold text-lg text-foreground mb-3">
                {rel.title}
              </h3>

              {/* Highlights */}
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Key Highlights & Improvements:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed">
                  {rel.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Added Components */}
              {rel.componentsAdded.length > 0 && (
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    Components / Icons Added ({rel.componentsAdded.length}):
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {rel.componentsAdded.map((comp) => (
                      <span
                        key={comp}
                        className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-mono text-primary font-medium border border-border/60"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
