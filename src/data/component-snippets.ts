export interface ComponentSnippet {
  id: string;
  name: string;
  description: string;
  category: string;
  importCode: string;
  usageCode: string;
}

export const COMPONENT_SNIPPETS: Record<string, ComponentSnippet> = {
  meteors: {
    id: 'meteors',
    name: 'Meteors & Shooting Stars',
    description: 'Falling shooting stars animation with glowing linear tails.',
    category: 'Special',
    importCode: `import { Meteors, Card } from 'doni-ui';`,
    usageCode: `<Card className="relative overflow-hidden p-6 bg-gradient-to-b from-card to-background">
  <h3 className="font-bold text-xl">Meteor Shower Card</h3>
  <p className="text-sm text-muted-foreground mt-2">
    Ambient animated stars streak behind content.
  </p>
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
  <p className="text-sm text-muted-foreground mt-2">
    Move your cursor over this card to watch the radiant beam bloom.
  </p>
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
    description: 'Vintage 3D mechanical keyboard keycap with realistic tactile press depression.',
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
  <BentoGridItem
    title="Type-Safe"
    description="Full autocompletion and prop validation."
    icon={<Shield />}
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
  typewriter: {
    id: 'typewriter',
    name: 'Typewriter Text',
    description: 'Dynamic character typewriter stream with blinking cursor.',
    category: 'Typography',
    importCode: `import { Typewriter } from 'doni-ui';`,
    usageCode: `<h1>
  Build with{' '}
  <Typewriter words={['speed.', 'motion.', 'elegance.']} />
</h1>`,
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
};
