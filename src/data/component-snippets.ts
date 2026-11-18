export interface ComponentSnippet {
  id: string;
  name: string;
  description: string;
  category: string;
  importCode: string;
  usageCode: string;
}

export const COMPONENT_SNIPPETS: Record<string, ComponentSnippet> = {
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
  onSelect={(id) => console.log('Selected:', id)}
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
  <p className="text-sm text-muted-foreground mt-1">
    Continuous perimeter laser animation.
  </p>
  <BorderBeam size={250} duration={10} delay={0} />
</Card>`,
  },
  bento: {
    id: 'bento-grid',
    name: 'Bento Grid',
    description: 'Apple and Linear style responsive dashboard bento grid layout.',
    category: 'Layout',
    importCode: `import { BentoGrid, BentoGridItem } from 'doni-ui';
import { Zap, Shield, Cpu } from 'lucide-react';`,
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
  <BentoGridItem
    title="GPU Compositor"
    description="Smooth 120 FPS transforms."
    icon={<Cpu />}
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
    usageCode: `{/* Glow Variant */}
<Button variant="glow">
  <Zap className="w-4 h-4 mr-2" />
  Glow Button
</Button>

{/* Shimmer Variant */}
<Button variant="shimmer">
  Shimmer Shine
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
    usageCode: `<Switch
  defaultChecked={true}
  size="default"
  onCheckedChange={(checked) => console.log('Toggled:', checked)}
/>`,
  },
  tabs: {
    id: 'tabs',
    name: 'Sliding Pill Tabs',
    description: 'iOS & Linear-inspired animated sliding highlight pill with layoutId.',
    category: 'Navigation',
    importCode: `import { Tabs } from 'doni-ui';`,
    usageCode: `<Tabs
  tabs={[
    { id: 'all', label: 'All Projects' },
    { id: 'active', label: 'Active' },
    { id: 'archived', label: 'Archived' },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="pill"
/>`,
  },
  dialog: {
    id: 'dialog',
    name: 'Animated Modal Dialog',
    description: 'Accessible modal dialog with spring bounce entry and frosted backdrop blur.',
    category: 'Feedback',
    importCode: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from 'doni-ui';`,
    usageCode: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="glow">Open Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Animated Dialog</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button variant="glow">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  marquee: {
    id: 'marquee',
    name: 'Infinite Marquee',
    description: 'GPU-accelerated seamless horizontal scrolling row with hover pause.',
    category: 'Display',
    importCode: `import { Marquee } from 'doni-ui';`,
    usageCode: `<Marquee speed={25} pauseOnHover={true}>
  <span className="mx-4 font-bold">🚀 0ms Runtime Lag</span>
  <span className="mx-4 font-bold">📦 100% Tree-Shakeable</span>
</Marquee>`,
  },
  typewriter: {
    id: 'typewriter',
    name: 'Typewriter Text',
    description: 'Dynamic character typewriter stream with blinking cursor.',
    category: 'Typography',
    importCode: `import { Typewriter } from 'doni-ui';`,
    usageCode: `<h1>
  Build interfaces that are{' '}
  <Typewriter words={['ultra fast.', 'super lightweight.', 'fluidly animated.']} />
</h1>`,
  },
  avatar: {
    id: 'avatar',
    name: 'Avatar & Status',
    description: 'Radix UI avatar with pulsing live online/busy status indicators.',
    category: 'Data Display',
    importCode: `import { Avatar, AvatarImage, AvatarFallback } from 'doni-ui';`,
    usageCode: `<Avatar status="online">
  <AvatarImage src="https://github.com/charitha-only.png" alt="Charitha" />
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
    importCode: `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from 'doni-ui';`,
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
