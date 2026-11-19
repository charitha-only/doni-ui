const fs = require('fs');
const path = require('path');

async function main() {
  const m = await import('lucide-react');
  const allNames = Object.keys(m).filter(k => 
    /^[A-Z]/.test(k) && 
    !k.endsWith('Icon') && 
    !['Lucide', 'Icon', 'createLucideIcon'].includes(k) &&
    typeof m[k] === 'object' && m[k] !== null
  );

  const CATEGORY_DEFS = [
    { id: 'navigation', label: 'Navigation & Arrows', keywords: ['Arrow', 'Chevron', 'Corner', 'Move', 'Chevrons', 'Rotate', 'Navigation', 'Compass', 'Locate', 'MapPin', 'Route', 'Milestone', 'Signpost', 'Waypoints', 'Undo', 'Redo', 'Repeat', 'Shuffle', 'Turn', 'Orient', 'Expand', 'Shrink'] },
    { id: 'devices', label: 'Devices & Hardware', keywords: ['Monitor', 'Laptop', 'Smartphone', 'Tablet', 'Watch', 'Server', 'Router', 'HardDrive', 'Cpu', 'Printer', 'Keyboard', 'Mouse', 'Tv', 'Speaker', 'Headphones', 'Camera', 'Radio', 'Projector', 'Webcam', 'Mic', 'Battery', 'Plug', 'Phone', 'Usb'] },
    { id: 'development', label: 'Code & Development', keywords: ['Code', 'Git', 'Terminal', 'Database', 'Bug', 'Binary', 'Brackets', 'Webhook', 'Cpu', 'FileCode', 'Variable', 'Braces', 'Boxes', 'Container', 'Layers', 'Workflow', 'Server', 'FolderGit', 'Binary', 'Regex', 'Puzzle', 'Brackets'] },
    { id: 'media', label: 'Media, Audio & Video', keywords: ['Play', 'Pause', 'FastForward', 'Rewind', 'Volume', 'Mic', 'Film', 'Video', 'Music', 'Disc', 'Radio', 'Cassette', 'Tv', 'Airplay', 'Clapperboard', 'Podcast', 'AudioWaveform', 'BoomBox', 'Headset', 'ListMusic', 'Repeat'] },
    { id: 'commerce', label: 'Commerce & Finance', keywords: ['Dollar', 'Euro', 'Pound', 'CreditCard', 'Wallet', 'Banknote', 'ShoppingCart', 'ShoppingBag', 'Receipt', 'Percent', 'Tag', 'BadgePercent', 'Coins', 'CircleDollar', 'PiggyBank', 'Vault', 'Store', 'Package', 'Barcode', 'Calculator', 'BadgeDollar', 'Landmark'] },
    { id: 'communication', label: 'Communication & Chat', keywords: ['Message', 'Mail', 'Send', 'Phone', 'AtSign', 'Share', 'Globe', 'Users', 'User', 'ThumbsUp', 'ThumbsDown', 'Megaphone', 'Inbox', 'Contact', 'Speech', 'Sparkle', 'HelpCircle', 'MessageSquare', 'MessagesSquare', 'MailCheck'] },
    { id: 'security', label: 'Security & Warnings', keywords: ['Shield', 'Lock', 'Unlock', 'Key', 'Fingerprint', 'Eye', 'EyeOff', 'Alert', 'Bell', 'Siren', 'Radar', 'Scan', 'VenetianMask', 'FileLock', 'KeyRound', 'Vault', 'BadgeAlert', 'Cctv', 'KeySquare', 'ShieldQuestion'] },
    { id: 'weather', label: 'Weather & Climate', keywords: ['Sun', 'Moon', 'Cloud', 'Rain', 'Snow', 'Wind', 'Lightning', 'Sunrise', 'Sunset', 'Flame', 'Droplet', 'Umbrella', 'Tornado', 'Haze', 'Thermometer', 'Rainbow', 'Waves', 'Sunset', 'Cloudy', 'Sparkles'] },
    { id: 'files', label: 'Files & Documents', keywords: ['File', 'Folder', 'Archive', 'Clipboard', 'Bookmark', 'Paperclip', 'Sticky', 'Newspaper', 'Book', 'Notebook', 'Files', 'FileText', 'FileSpreadsheet', 'FileCheck', 'BookOpen', 'BookMarked', 'Folders', 'FileSearch'] },
    { id: 'interface', label: 'Interface & Controls', keywords: ['Search', 'Settings', 'Sliders', 'Menu', 'Filter', 'Grid', 'List', 'More', 'Check', 'Cross', 'X', 'Plus', 'Minus', 'Trash', 'Power', 'Maximize', 'Minimize', 'Toggle', 'SlidersHorizontal', 'Equal', 'CheckSquare'] },
    { id: 'health', label: 'Health & Medical', keywords: ['Heart', 'Pulse', 'Activity', 'Stethoscope', 'Pill', 'Syringe', 'Cross', 'Thermometer', 'Hospital', 'Brain', 'Bone', 'Ambulance', 'Dna', 'Bandage', 'Baby', 'Accessibility', 'Eye', 'ShieldPulse', 'Stretcher'] },
    { id: 'design', label: 'Design & Graphics', keywords: ['Palette', 'Paint', 'Pen', 'Brush', 'Crop', 'Layers', 'Ruler', 'Pipette', 'Stamp', 'Scissors', 'Shapes', 'Spline', 'Vector', 'Wand', 'Highlighter', 'Frame', 'Contrast', 'Blend', 'Eraser', 'Lasso', 'Type'] },
    { id: 'travel', label: 'Travel & Transport', keywords: ['Plane', 'Car', 'Train', 'Ship', 'Compass', 'Map', 'Luggage', 'Fuel', 'Ticket', 'Bus', 'Bike', 'Tram', 'Anchor', 'Sailboat', 'Hotel', 'Palmtree', 'Mountain', 'Tent', 'Caravan', 'PlaneTakeoff', 'PlaneLanding'] },
    { id: 'gaming', label: 'Gaming & Play', keywords: ['Gamepad', 'Trophy', 'Dice', 'Sparkles', 'Wand', 'Swords', 'Ghost', 'Crown', 'Medal', 'Target', 'Joystick', 'Puzzle', 'Club', 'Spade', 'HeartHandshake', 'Bomb', 'Dices', 'Dice1', 'Dice2', 'Dice3', 'Dice4', 'Dice5', 'Dice6', 'Skull', 'Flame', 'Diamond', 'ShieldAlert'] },
    { id: 'science', label: 'Science & Education', keywords: ['Atom', 'Microscope', 'Flask', 'Graduation', 'Lightbulb', 'Compass', 'TestTube', 'Orbit', 'Biohazard', 'Radiation', 'Binary', 'Calculator', 'Pi', 'Sigma', 'TestTubes', 'Scale', 'Compass', 'GlassWater'] },
    { id: 'food', label: 'Food & Dining', keywords: ['Coffee', 'Utensils', 'Pizza', 'Cake', 'Wine', 'Beer', 'Cookie', 'Cup', 'Egg', 'Sandwich', 'Apple', 'Beef', 'Fish', 'Hop', 'Soup', 'ChefHat', 'Grape', 'Citrus', 'Milk', 'Candy', 'Croissant', 'Donut', 'Popcorn'] },
    { id: 'tools', label: 'Tools & Hardware', keywords: ['Wrench', 'Hammer', 'Screwdriver', 'Axe', 'Drill', 'Gauge', 'Scale', 'Magnet', 'Scissors', 'Flashlight', 'Nut', 'Construction', 'Cog', 'Tool', 'Plug', 'Hammer', 'HardHat', 'Anvil', 'Shovel'] },
    { id: 'nature', label: 'Nature & Ecology', keywords: ['Leaf', 'Tree', 'Flower', 'Sprout', 'Clover', 'Wheat', 'Mountain', 'Shrub', 'Paw', 'Bird', 'Bug', 'Fish', 'Cat', 'Dog', 'Feather', 'Rabbit', 'Trees', 'Palmtree', 'SunSnow', 'Earth', 'Eco'] },
    { id: 'sports', label: 'Sports & Fitness', keywords: ['Dumbbell', 'Trophy', 'Medal', 'Target', 'Flag', 'Bike', 'Footprints', 'Flame', 'Timer', 'Stopwatch', 'Award', 'TimerReset', 'TimerOff', 'Hourglass', 'BicepsFlexed', 'Footprints', 'Skateboarding', 'Award'] },
    { id: 'symbols', label: 'Badges & Symbols', keywords: ['Circle', 'Square', 'Triangle', 'Hexagon', 'Star', 'Diamond', 'Infinity', 'Hash', 'Percent', 'AtSign', 'Asterisk', 'Ampersand', 'Check', 'Smile', 'Frown', 'Meh', 'Heart'] }
  ];

  const used = new Set();
  const catalog = {};
  for (const cat of CATEGORY_DEFS) {
    catalog[cat.id] = [];
    for (const name of allNames) {
      if (used.has(name)) continue;
      if (cat.keywords.some(kw => name.includes(kw))) {
        catalog[cat.id].push(name);
        used.add(name);
        if (catalog[cat.id].length >= 50) break;
      }
    }
  }

  const unused = allNames.filter(n => !used.has(n));
  let unIdx = 0;
  for (const cat of CATEGORY_DEFS) {
    while (catalog[cat.id].length < 50 && unIdx < unused.length) {
      catalog[cat.id].push(unused[unIdx++]);
    }
  }

  const animTypes = ['bounce', 'wiggle', 'spin', 'pulse', 'scale'];
  
  function toReadable(str) {
    return str.replace(/([A-Z0-9])/g, ' $1').trim();
  }

  function toKebab(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  const iconItems = [];
  let idx = 0;
  for (const cat of CATEGORY_DEFS) {
    const names = catalog[cat.id];
    names.forEach((name, i) => {
      iconItems.push({
        id: toKebab(name),
        name: toReadable(name),
        category: cat.id,
        categoryLabel: cat.label,
        exportName: name,
        desc: toReadable(name) + ' with responsive kinetic spring micro-interaction.',
        animationType: animTypes[(idx + i) % animTypes.length],
        iconName: name
      });
    });
    idx += names.length;
  }

  const categoriesOutput = CATEGORY_DEFS.map(c => ({ id: c.id, label: c.label, count: 50 }));

  const fileContent = `// Doni UI - 1,000 Animated Icons Catalog (Auto-generated)
// Categorized into 20 rich domains (50 icons each)
import type { ComponentType } from 'react';
import * as Lucide from 'lucide-react';

export interface Icon1000Item {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  exportName: string;
  desc: string;
  animationType: 'bounce' | 'wiggle' | 'spin' | 'pulse' | 'scale';
  iconName: string;
}

export interface IconCategoryDef {
  id: string;
  label: string;
  count: number;
}

export const ICON_1000_CATEGORIES: IconCategoryDef[] = ${JSON.stringify(categoriesOutput, null, 2)};

export const ICON_1000_CATALOG: Icon1000Item[] = ${JSON.stringify(iconItems, null, 2)};

export function getLucideComponent(name: string): ComponentType<any> {
  const comp = (Lucide as any)[name];
  return comp || Lucide.HelpCircle;
}
`;

  const targetPath = path.resolve(__dirname, '../src/data/icons-catalog-1000.ts');
  fs.writeFileSync(targetPath, fileContent, 'utf-8');
  console.log('Successfully wrote src/data/icons-catalog-1000.ts with', iconItems.length, 'icons!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
