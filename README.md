<div align="center">

# ⚡ Doni UI

**Ultra-fast, spring-animated, and hyper-customizable React UI component library.**  
Inspired by **shadcn/ui**, **Radix UI**, and **Magic UI**.

[![GitHub Stars](https://img.shields.io/github/stars/charitha-only/doni-ui?style=social)](https://github.com/charitha-only/doni-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_18-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer&logoColor=blue)](https://www.framer.com/motion/)

</div>

---

## ✨ Features

- 🎭 **Every Component is Animated:** Built with Framer Motion spring physics — tactile click depressions, hover floats, neon glowing blooms, and layout pills.
- 🎨 **Instant Any-Color Engine:** Change to ANY custom Hex/HSL color at runtime. The entire palette, borders, glows, and inputs react instantaneously.
- ♿ **Accessible Primitives:** Fully keyboard operable, ARIA compliant, and focus-trapped powered by **Radix UI**.
- 🌓 **Dark & Light Mode:** Seamless first-class dark and light theme switching.
- 🧩 **Zero Overhead Copy-Paste or Package:** Use components modularly like `shadcn/ui` or import from `@/components/ui`.
- 🛠️ **Type-Safe:** Written 100% in TypeScript with full autocompletion and prop validation.

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/charitha-only/doni-ui.git
cd doni-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start local development server

```bash
npm run dev
```

---

## 🎨 Dynamic Theming & Custom Colors

Doni UI comes with dynamic CSS variable bindings. You can switch to preset palettes or pass **ANY hex color** dynamically:

```tsx
import { ThemeProvider, useTheme } from '@/theme/theme-context';

function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

function MainContent() {
  const { setCustomHex, activePreset } = useTheme();

  return (
    <input 
      type="color" 
      onChange={(e) => setCustomHex(e.target.value)} 
    />
  );
}
```

### Preset Palettes Included:
- 🟣 **Electric Violet** (`#8b5cf6`)
- 🔵 **Cyber Cyan** (`#06b6d4`)
- 🟢 **Lush Emerald** (`#10b981`)
- 🔴 **Neon Rose** (`#f43f5e`)
- 🟠 **Sunfire Amber** (`#f59e0b`)
- 🟦 **Deep Indigo** (`#6366f1`)
- 🍏 **Acid Lime** (`#84cc16`)
- 🌈 **Any Custom Hex** (`#...`)

---

## 🧩 Components Included

| Component | Description | Animation Highlight |
|---|---|---|
| **Button** | Primary, Glow, Shimmer, Glass, Outline, Destructive | Tactile spring click, shimmer shine, hover scale |
| **Card** | Content containers & feature cards | 3D hover elevation & ambient border glow |
| **Input** | Clean inputs with icon slots | Smooth expanding glow focus ring |
| **Switch** | Mechanical tactile toggle | Framer Motion spring knob bounce |
| **Tabs** | iOS & Linear-style tab switchers | Sliding layoutId indicator pill & underline |
| **Badge** | Status chips and labels | Ambient ping pulse & neon gradient borders |
| **Dialog** | Accessible modal dialogs | Spring scale-up entry & frosted backdrop blur |
| **Accordion** | Collapsible FAQ & disclosure panels | Smooth height animation with rotating chevrons |
| **Tooltip** | Hover micro-tooltips | Fast spring popover with arrow offset |
| **Toast** | Context-driven alert toasts | Slide-up notification & celebratory confetti 🎉 |

---

## 💻 Example Usage

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export function HeroCard() {
  return (
    <Card glow={true}>
      <CardHeader>
        <CardTitle>Supercharged Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="glow">
          <Zap className="w-4 h-4 mr-2" />
          Click Me
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## 📜 License

MIT License © 2026 [Charitha](https://github.com/charitha-only)
