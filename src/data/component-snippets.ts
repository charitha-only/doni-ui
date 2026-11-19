export interface ComponentSnippet {
  id: string;
  name: string;
  description: string;
  category: string;
  importCode: string;
  usageCode: string;
}

export const COMPONENT_SNIPPETS: Record<string, ComponentSnippet> = {
  evervault: {
    id: 'evervault-card',
    name: 'Evervault Scramble Card',
    description: 'Matrix encrypted text scramble card that reveals random characters beneath cursor.',
    category: 'Cards',
    importCode: `import { EvervaultCard } from 'doni-ui';`,
    usageCode: `<div className="w-80 h-96">
  <EvervaultCard text="secure" />
</div>`,
  },
  sparkles: {
    id: 'sparkles',
    name: 'Sparkles Core Particles',
    description: 'Floating ambient radiant sparkling stars canvas.',
    category: 'Special',
    importCode: `import { SparklesCore } from 'doni-ui';`,
    usageCode: `<div className="relative h-60 w-full flex items-center justify-center">
  <h1 className="text-3xl font-bold z-20">Glowing Universe</h1>
  <SparklesCore minSize={0.4} maxSize={2} particleDensity={70} />
</div>`,
  },
  gridBackground: {
    id: 'grid-background',
    name: 'Dot & Grid Background',
    description: 'Subtle SVG dot pattern or square grid with soft radial center mask.',
    category: 'Layout',
    importCode: `import { GridBackground } from 'doni-ui';`,
    usageCode: `<GridBackground variant="dots" className="h-64">
  <p className="text-xl font-bold">Subtle Dot Grid</p>
</GridBackground>`,
  },
  flipWords: {
    id: 'flip-words',
    name: 'Flip Words',
    description: 'Dynamic 3D letter flip text transitions between rotating keywords.',
    category: 'Typography',
    importCode: `import { FlipWords } from 'doni-ui';`,
    usageCode: `<h2>
  Build websites that are{' '}
  <FlipWords words={['modern', 'ultra-fast', 'animated', 'delightful']} />
</h2>`,
  },
  card3d: {
    id: 'card-3d',
    name: '3D Perspective Tilt Card',
    description: 'Perspective 3D mouse tracking container with translateZ layered depth.',
    category: 'Cards',
    importCode: `import { CardContainer, CardItem, Button } from 'doni-ui';`,
    usageCode: `<CardContainer className="inter-var">
  <div className="bg-card border border-border/80 p-6 rounded-2xl w-auto sm:w-[30rem] [transform-style:preserve-3d]">
    <CardItem translateZ="50" className="text-xl font-bold">
      Interactive 3D Card
    </CardItem>
    <CardItem as="p" translateZ="60" className="text-muted-foreground text-sm mt-2">
      Hover over this card to watch perspective physics elevate layers into 3D space.
    </CardItem>
    <div className="flex justify-between items-center mt-6">
      <CardItem translateZ="20" as="button" className="text-xs text-primary font-bold">
        Explore
      </CardItem>
      <CardItem translateZ="40" as={Button} variant="glow" size="sm">
        Sign Up
      </CardItem>
    </div>
  </div>
</CardContainer>`,
  },
  textReveal: {
    id: 'text-reveal',
    name: 'Text Reveal',
    description: 'Staggered word blur-to-focus reveal animation.',
    category: 'Typography',
    importCode: `import { TextReveal } from 'doni-ui';`,
    usageCode: `<TextReveal
  text="Doni UI is engineered from the ground up for maximum visual impact and zero runtime overhead."
  className="text-2xl font-bold leading-relaxed"
/>`,
  },
  meteors: {
    id: 'meteors',
    name: 'Meteors & Shooting Stars',
    description: 'Falling shooting stars animation with glowing linear tails.',
    category: 'Special',
    importCode: `import { Meteors, Card } from 'doni-ui';`,
    usageCode: `<Card className="relative overflow-hidden p-6 bg-gradient-to-b from-card to-background">
  <h3 className="font-bold text-xl">Meteor Shower Card</h3>
  <Meteors number={25} />
</Card>`,
  },
  ripple: {
    id: 'ripple',
    name: 'Ripple Background',
    description: 'Concentric water ripples expanding with spring physics.',
    category: 'Special',
    importCode: `import { Ripple, Avatar, AvatarFallback } from 'doni-ui';`,
    usageCode: `<div className="relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-background">
  <div className="z-10 flex items-center justify-center">
    <Avatar status="online" className="h-16 w-16">
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  </div>
  <Ripple />
</div>`,
  },
  floatingDock: {
    id: 'floating-dock',
    name: 'Floating Dock',
    description: 'macOS inspired magnification dock with fluid spring physics.',
    category: 'Navigation',
    importCode: `import { FloatingDock } from 'doni-ui';
import { Home, Terminal, Sparkles, Settings } from 'lucide-react';`,
    usageCode: `<FloatingDock
  items={[
    { title: 'Home', icon: <Home /> },
    { title: 'Terminal', icon: <Terminal /> },
    { title: 'Explore', icon: <Sparkles /> },
    { title: 'Settings', icon: <Settings /> },
  ]}
/>`,
  },
  skeleton: {
    id: 'skeleton',
    name: 'Skeleton Loader',
    description: 'Shimmering placeholder cards for smooth data loading.',
    category: 'Feedback',
    importCode: `import { Skeleton } from 'doni-ui';`,
    usageCode: `<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`,
  },
  tubelight: {
    id: 'tubelight',
    name: 'Tubelight Navbar',
    description: 'Floating dock island navbar with a glowing lamp beam that slides between tabs.',
    category: 'Navigation',
    importCode: `import { TubelightNavbar } from 'doni-ui';
import { Home, Boxes, Compass, Settings } from 'lucide-react';`,
    usageCode: `<TubelightNavbar
  items={[
    { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'components', label: 'Components', icon: <Boxes className="w-3.5 h-3.5" /> },
    { id: 'explore', label: 'Explore', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-3.5 h-3.5" /> },
  ]}
/>`,
  },
  spotlight: {
    id: 'spotlight',
    name: 'Spotlight Card',
    description: 'Card with a GPU-accelerated flashlight radial glow that tracks mouse movement.',
    category: 'Cards',
    importCode: `import { SpotlightCard, Badge, Button } from 'doni-ui';`,
    usageCode: `<SpotlightCard className="p-6">
  <Badge variant="glow" className="mb-3">Feature</Badge>
  <h3 className="text-xl font-bold">Interactive Spotlight</h3>
  <Button variant="glow" size="sm" className="mt-4">Explore</Button>
</SpotlightCard>`,
  },
  flame: {
    id: 'flame',
    name: 'Flame Button',
    description: 'High-energy rotating conic gradient border beam with ambient flame bloom.',
    category: 'Buttons',
    importCode: `import { FlameButton } from 'doni-ui';
import { Flame } from 'lucide-react';`,
    usageCode: `<FlameButton onClick={() => alert('Ignited!')}>
  <Flame className="w-4 h-4 mr-2 text-primary" />
  Ignite Experience
</FlameButton>`,
  },
  keycap: {
    id: 'keycap',
    name: 'Mechanical Keycap',
    description: 'Vintage 3D mechanical keyboard keycap with realistic tactile press depression & Web Audio sound.',
    category: 'Buttons',
    importCode: `import { Keycap } from 'doni-ui';`,
    usageCode: `<div className="flex gap-2">
  <Keycap subText="CMD">⌘</Keycap>
  <Keycap subText="OPT">⌥</Keycap>
  <Keycap subText="SHIFT">⇧</Keycap>
  <Keycap subText="ENTER">↵</Keycap>
</div>`,
  },
  borderBeam: {
    id: 'border-beam',
    name: 'Border Beam',
    description: 'Laser beam running continuously around the perimeter of any card or container.',
    category: 'Special',
    importCode: `import { BorderBeam, Card } from 'doni-ui';`,
    usageCode: `<Card className="relative overflow-hidden p-6">
  <h3 className="font-bold text-lg">Border Beam Card</h3>
  <BorderBeam size={250} duration={10} delay={0} />
</Card>`,
  },
  bento: {
    id: 'bento-grid',
    name: 'Bento Grid',
    description: 'Apple and Linear style responsive dashboard bento grid layout.',
    category: 'Layout',
    importCode: `import { BentoGrid, BentoGridItem } from 'doni-ui';
import { Zap, Shield } from 'lucide-react';`,
    usageCode: `<BentoGrid>
  <BentoGridItem
    title="Spring Physics"
    description="Zero-lag hardware acceleration."
    icon={<Zap />}
  />
</BentoGrid>`,
  },
  button: {
    id: 'button',
    name: 'Animated Button',
    description: 'Physics-based spring buttons with glow, shimmer, glass, and loading states.',
    category: 'Buttons',
    importCode: `import { Button } from 'doni-ui';
import { Zap } from 'lucide-react';`,
    usageCode: `<Button variant="glow">
  <Zap className="w-4 h-4 mr-2" />
  Glow Button
</Button>`,
  },
  input: {
    id: 'input',
    name: 'Glow Focus Input',
    description: 'Input field with animated glowing focus ring and icon support.',
    category: 'Forms',
    importCode: `import { Input } from 'doni-ui';
import { Sparkles } from 'lucide-react';`,
    usageCode: `<Input
  placeholder="Enter your email..."
  icon={<Sparkles className="w-4 h-4" />}
  isGlow={true}
/>`,
  },
  switch: {
    id: 'switch',
    name: 'Spring Switch',
    description: 'Mechanical tactile toggle with Framer Motion spring physics bounce.',
    category: 'Forms',
    importCode: `import { Switch } from 'doni-ui';`,
    usageCode: `<Switch defaultChecked={true} />`,
  },
  tabs: {
    id: 'tabs',
    name: 'Sliding Pill Tabs',
    description: 'iOS & Linear-inspired animated sliding highlight pill with layoutId.',
    category: 'Navigation',
    importCode: `import { Tabs } from 'doni-ui';`,
    usageCode: `<Tabs
  tabs={[{ id: '1', label: 'Tab 1' }, { id: '2', label: 'Tab 2' }]}
  activeTab="1"
  onChange={() => {}}
/>`,
  },
  dialog: {
    id: 'dialog',
    name: 'Animated Modal Dialog',
    description: 'Accessible modal dialog with spring bounce entry and frosted backdrop blur.',
    category: 'Feedback',
    importCode: `import { Dialog, DialogTrigger, DialogContent, Button } from 'doni-ui';`,
    usageCode: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="glow">Open Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <h3>Dialog Content</h3>
  </DialogContent>
</Dialog>`,
  },
  marquee: {
    id: 'marquee',
    name: 'Infinite Marquee',
    description: 'GPU-accelerated seamless horizontal scrolling row with hover pause.',
    category: 'Display',
    importCode: `import { Marquee } from 'doni-ui';`,
    usageCode: `<Marquee speed={25}>
  <span className="mx-4 font-bold">🚀 0ms Runtime Lag</span>
</Marquee>`,
  },
  avatar: {
    id: 'avatar',
    name: 'Avatar & Status',
    description: 'Radix UI avatar with pulsing live online/busy status indicators.',
    category: 'Data Display',
    importCode: `import { Avatar, AvatarFallback } from 'doni-ui';`,
    usageCode: `<Avatar status="online">
  <AvatarFallback>CH</AvatarFallback>
</Avatar>`,
  },
  slider: {
    id: 'slider',
    name: 'Glowing Slider',
    description: 'Radix slider primitive with dynamic theme color track.',
    category: 'Forms',
    importCode: `import { Slider } from 'doni-ui';`,
    usageCode: `<Slider defaultValue={[50]} max={100} step={1} />`,
  },
  dropdown: {
    id: 'dropdown',
    name: 'Dropdown Menu',
    description: 'Radix dropdown menu with animated spring popover entrance.',
    category: 'Navigation',
    importCode: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from 'doni-ui';`,
    usageCode: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  magnetic: {
    id: 'magnetic',
    name: 'Magnetic Cursor Pull',
    description: 'Spring physics cursor attraction wrapper for buttons and avatars.',
    category: 'Special',
    importCode: `import { Magnetic, Button } from 'doni-ui';`,
    usageCode: `<Magnetic range={90} strength={0.4}>
  <Button variant="glow">Magnetic Button</Button>
</Magnetic>`,
  },
  shimmerText: {
    id: 'shimmerText',
    name: 'Shimmer Text',
    description: 'Apple and Linear-style animated light streak reflection across typography.',
    category: 'Typography',
    importCode: `import { ShimmerText } from 'doni-ui';`,
    usageCode: `<ShimmerText className="text-3xl font-extrabold">
  Lightning-Fast Interface
</ShimmerText>`,
  },
  numberTicker: {
    id: 'numberTicker',
    name: 'Number Ticker',
    description: 'Smooth spring-interpolated counter ticker for dashboard metrics.',
    category: 'Data Display',
    importCode: `import { NumberTicker } from 'doni-ui';`,
    usageCode: `<NumberTicker value={99.9} decimalPlaces={1} suffix="%" />`,
  },
  lamp: {
    id: 'lamp',
    name: 'Lamp Hero Header',
    description: 'Conic glowing neon lamp beam illuminating hero headlines.',
    category: 'Special',
    importCode: `import { LampContainer } from 'doni-ui';`,
    usageCode: `<LampContainer>
  <h1 className="text-5xl font-black tracking-tight text-center">
    Future of Web Interfaces
  </h1>
</LampContainer>`,
  },
  interactiveHoverButton: {
    id: 'interactiveHoverButton',
    name: 'Interactive Hover Button',
    description: 'Expanding pill button with sliding text and arrow transition.',
    category: 'Buttons',
    importCode: `import { InteractiveHoverButton } from 'doni-ui';`,
    usageCode: `<InteractiveHoverButton text="Get Started" />`,
  },
  lens: {
    id: 'lens',
    name: 'Interactive Zoom Lens',
    description: 'Cursor-following magnifying glass lens with dynamic zoom magnification.',
    category: 'Special',
    importCode: `import { Lens } from 'doni-ui';`,
    usageCode: `<Lens zoomFactor={2} lensSize={160}>
  <img src="preview.jpg" alt="Preview" className="rounded-xl" />
</Lens>`,
  },
};
