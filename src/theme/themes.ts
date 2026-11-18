export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  hsl: string;
  description: string;
  gradient: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'violet',
    name: 'Electric Violet',
    hex: '#8b5cf6',
    hsl: '262 83% 58%',
    description: 'Modern, high-energy purple inspired by Linear and Raycast',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    hex: '#06b6d4',
    hsl: '189 94% 43%',
    description: 'Crisp, futuristic neon cyan for tech & futuristic dashboards',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'emerald',
    name: 'Lush Emerald',
    hex: '#10b981',
    hsl: '160 84% 39%',
    description: 'Fresh, organic green ideal for fintech, health, and SaaS',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'rose',
    name: 'Neon Rose',
    hex: '#f43f5e',
    hsl: '350 89% 60%',
    description: 'Punchy vibrant pink-red that commands attention',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'amber',
    name: 'Sunfire Amber',
    hex: '#f59e0b',
    hsl: '38 92% 50%',
    description: 'Warm, golden sunset glow with maximum friendliness',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'indigo',
    name: 'Deep Indigo',
    hex: '#6366f1',
    hsl: '239 84% 67%',
    description: 'Sophisticated, classic developer-first indigo accent',
    gradient: 'from-indigo-500 to-blue-700',
  },
  {
    id: 'lime',
    name: 'Acid Lime',
    hex: '#84cc16',
    hsl: '84 81% 44%',
    description: 'High contrast electric lime for cutting-edge Web3 and dev tools',
    gradient: 'from-lime-400 to-green-600',
  },
];
