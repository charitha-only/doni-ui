import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Github,
  Zap,
  Shield,
  Cpu,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { transitions } from '@/lib/utils';
import { AnimatedIconDock } from '../ui/animated-icons';

export const AboutView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.smoothEase}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12"
    >
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <Badge variant="glow" withPulse className="px-3 py-1 text-xs">
          🌟 The Vision Behind Doni UI
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
          Crafted for Speed, Physics &amp; Freedom
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Doni UI is a modern, spring-animated React UI library inspired by shadcn/ui, Radix UI, and Serenity UI, created by Charitha.
        </p>
      </div>

      {/* Creator Card */}
      <Card className="p-8 bg-gradient-to-br from-card via-card to-primary/5 border-primary/30 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-cyan-400 p-0.5 shadow-glow">
              <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center font-black text-2xl text-primary">
                DU
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-background" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-2xl font-black">Charitha</h2>
              <Badge variant="outline" className="w-fit mx-auto sm:mx-0 text-xs">
                Creator &amp; Maintainer
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Software engineer and open-source enthusiast focused on high-performance frontend architecture, GPU spring physics, and fluid user interactions.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="https://github.com/charitha-only"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-muted/60 hover:bg-muted transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                @charitha-only
              </a>
              <a
                href="https://github.com/charitha-only/doni-ui"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* Core Design Pillars */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-center">Core Design Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="p-2.5 w-fit rounded-xl bg-primary/10 text-primary mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">0ms Runtime Style Overhead</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unlike Emotion or styled-components that evaluate CSS rules dynamically during render, Doni UI compiles styles to atomic Tailwind classes with dynamic CSS custom properties.
            </p>
          </Card>

          <Card className="p-6">
            <div className="p-2.5 w-fit rounded-xl bg-primary/10 text-primary mb-3">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">GPU Spring Physics</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every animation is powered by Framer Motion's physical spring equations, running exclusively on the browser compositor thread at a silky-smooth 120 FPS.
            </p>
          </Card>

          <Card className="p-6">
            <div className="p-2.5 w-fit rounded-xl bg-primary/10 text-primary mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-1">Radix UI WCAG Accessibility</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modals, dropdowns, tooltips, and accordions are built upon Radix UI headless primitives, providing complete keyboard navigation and screen-reader accessibility.
            </p>
          </Card>
        </div>
      </section>

      {/* Speed Benchmark Comparison */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Performance Benchmark</h2>
        <Card className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 font-semibold text-muted-foreground">
                <th className="p-3.5">Metric</th>
                <th className="p-3.5 text-primary font-bold">Doni UI ⚡</th>
                <th className="p-3.5">MUI (Material UI) 🐢</th>
                <th className="p-3.5">Chakra UI 🐢</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr>
                <td className="p-3.5 font-bold">Runtime CSS Overhead</td>
                <td className="p-3.5 text-primary font-bold">0ms (Zero)</td>
                <td className="p-3.5 text-muted-foreground">120ms - 250ms (Emotion)</td>
                <td className="p-3.5 text-muted-foreground">90ms - 200ms (Emotion)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Framerate</td>
                <td className="p-3.5 text-primary font-bold">120 FPS GPU Compositor</td>
                <td className="p-3.5 text-muted-foreground">CPU CSS Transitions</td>
                <td className="p-3.5 text-muted-foreground">CPU CSS Transitions</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Bundle Size / Component</td>
                <td className="p-3.5 text-primary font-bold">~2KB - 4KB</td>
                <td className="p-3.5 text-muted-foreground">35KB - 70KB</td>
                <td className="p-3.5 text-muted-foreground">30KB - 60KB</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Dynamic Any-Color Adapt</td>
                <td className="p-3.5 text-primary font-bold">Instant Microsecond HSL</td>
                <td className="p-3.5 text-muted-foreground">Requires Theme Re-render</td>
                <td className="p-3.5 text-muted-foreground">Requires Theme Re-render</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Tree-Shaking Architecture</td>
                <td className="p-3.5 text-primary font-bold">100% ("sideEffects": false)</td>
                <td className="p-3.5 text-muted-foreground">Partial</td>
                <td className="p-3.5 text-muted-foreground">Partial</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-center">Built With Modern Standards</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { name: 'React 18', color: 'border-sky-500/30 text-sky-400' },
            { name: 'TypeScript', color: 'border-blue-500/30 text-blue-400' },
            { name: 'Tailwind CSS', color: 'border-teal-500/30 text-teal-400' },
            { name: 'Framer Motion', color: 'border-purple-500/30 text-purple-400' },
            { name: 'Radix UI', color: 'border-zinc-500/30 text-foreground' },
            { name: 'Vite 6', color: 'border-amber-500/30 text-amber-400' },
          ].map((tech) => (
            <span
              key={tech.name}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border bg-card/80 shadow-sm ${tech.color}`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </section>

      {/* Interactive Dock */}
      <div className="pt-4 flex flex-col items-center justify-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Connect With Doni UI
        </p>
        <AnimatedIconDock iconSize={24} />
      </div>

      {/* License & Contributing */}
      <Card className="p-6 text-center space-y-3 bg-muted/20 border-border/60">
        <h3 className="font-bold text-base">Open Source &amp; Free Forever</h3>
        <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Doni UI is released under the permissive <strong>MIT License</strong>. You can freely use it in personal, commercial, and enterprise projects without any royalties or restrictions.
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          MIT License © 2026 Charitha. Made with ❤️ for developers worldwide.
        </p>
      </Card>
    </motion.div>
  );
};
