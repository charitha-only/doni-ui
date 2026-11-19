import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Zap,
  Bot,
  Laptop,
  BarChart3,
  Code2,
  X,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BadgeDelta } from '../ui/badge-delta';
import { StatCard } from '../ui/stat-card';
import { FlameButton } from '../ui/flame-button';
import { Keycap } from '../ui/keycap';
import { Progress } from '../ui/progress';
import { transitions } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';

export interface TemplateDef {
  id: string;
  title: string;
  category: 'SaaS' | 'AI & LLM' | 'Portfolio' | 'Dashboard';
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  code: string;
}

export const TemplatesView: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDef | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const templates: TemplateDef[] = [
    {
      id: 'saas-landing',
      title: 'Hyper-SaaS NextGen Landing',
      category: 'SaaS',
      description: 'Production-ready SaaS landing page with animated hero, dynamic feature bento grid, 3-tier pricing table, and social proof counters.',
      badge: 'Popular',
      icon: Zap,
      features: [
        'Glassmorphic sticky header with CTA',
        'High-converting Hero with Cyber Beam glow',
        'Interactive Pricing Cards with billing switch',
        'Bento Feature Grid with responsive layouts',
        'Physics-driven animated FAQ accordion',
      ],
      code: `// Doni UI — Hyper-SaaS Landing Page Template
import React, { useState } from 'react';
import { Button, Badge, Card, FlameButton, BentoGrid, BentoCard } from 'doni-ui';
import { Sparkles, ArrowRight, Check, Shield } from 'lucide-react';

export default function SaaSPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/60 px-6 py-4 flex items-center justify-between">
        <div className="font-extrabold text-xl tracking-tight text-primary">SaaSFlow</div>
        <div className="flex gap-3">
          <Button variant="ghost">Sign In</Button>
          <Button variant="glow">Start Free Trial</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center space-y-6">
        <Badge variant="glow" withPulse>✨ Launching v2.0 Platform</Badge>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
          Supercharge your workflow with <span className="text-primary">Zero Latency</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The next-generation cloud automation platform built on top of high-performance microservices.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <FlameButton size="lg">Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></FlameButton>
          <Button variant="outline" size="lg">Schedule Demo</Button>
        </div>
      </main>
    </div>
  );
}`,
    },
    {
      id: 'ai-startup',
      title: 'Autonomous AI Agent Platform',
      category: 'AI & LLM',
      description: 'Futuristic AI agent dashboard and landing with prompt execution stage, real-time token streaming telemetry, and model status pills.',
      badge: 'AI Native',
      icon: Bot,
      features: [
        'Prompt command center with glowing flame trigger',
        'Real-time token generation telemetry KPI cards',
        'Model status indicators & latency monitors',
        'Interactive conversation thread cards',
        'Dynamic neural connection animated lines',
      ],
      code: `// Doni UI — AI Platform Template
import React, { useState } from 'react';
import { Button, StatCard, BadgeDelta, FlameButton, Input, Progress } from 'doni-ui';
import { Bot, Cpu, Zap, Sparkles } from 'lucide-react';

export default function AiPlatformPage() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-[#07090e] text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Neural Core AI Hub</h1>
              <p className="text-xs text-muted-foreground">Cluster: us-east-deepmind-01</p>
            </div>
          </div>
          <FlameButton>Deploy Autonomous Agent</FlameButton>
        </div>

        {/* Live KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Throughput" value="48.2k tok/s" delta="+34.2%" trend="up" />
          <StatCard title="P99 Inference" value="42ms" delta="-12ms" trend="up" />
          <StatCard title="Active Clusters" value="1,024 Nodes" delta="+18%" trend="up" />
        </div>
      </div>
    </div>
  );
}`,
    },
    {
      id: 'dev-portfolio',
      title: 'Senior Engineer Bento Portfolio',
      category: 'Portfolio',
      description: 'Modern developer personal website featuring bento grid projects showcase, 3D keycap tech stack badges, and interactive experience timeline.',
      badge: 'Bento Grid',
      icon: Laptop,
      features: [
        'Interactive Bento Grid project showcase',
        'Tactile 3D Keycap interactive tech stack badges',
        'Timeline component for career achievements',
        'Open-source GitHub contributions metric card',
        'Glassmorphic contact card with copy email',
      ],
      code: `// Doni UI — Developer Bento Portfolio Template
import React from 'react';
import { Card, Badge, Keycap, Timeline, Button } from 'doni-ui';
import { Github, ExternalLink, Terminal, Code } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4">
        <Badge variant="glow">Available for select contracts</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Hi, I craft <span className="text-primary">high-speed</span> web systems.
        </h1>
      </div>

      {/* Tech Stack Keycaps */}
      <div className="flex flex-wrap gap-2">
        {['React', 'TypeScript', 'TailwindCSS', 'Rust', 'Go', 'Next.js'].map(tech => (
          <Keycap key={tech}>{tech}</Keycap>
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      id: 'analytics-dashboard',
      title: 'Cloud Metrics & App Dashboard',
      category: 'Dashboard',
      description: 'Full-fledged admin dashboard featuring searchable data table, metric stat cards with delta trends, progress gauges, and activity drawers.',
      badge: 'Full Suite',
      icon: BarChart3,
      features: [
        'Top metric KPI cards with positive/negative delta pills',
        'Full DataTable with sortable headers & search filters',
        'System health animated progress indicators',
        'Multi-step setup wizard stepper',
        'Side drawer sheet for drill-down details',
      ],
      code: `// Doni UI — Enterprise Analytics Dashboard Template
import React from 'react';
import { DataTable, StatCard, BadgeDelta, Progress, Button } from 'doni-ui';
import { BarChart3, Download, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Global Operations</h1>
        <Button variant="glow"><Download className="w-4 h-4 mr-2" /> Export Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Monthly Recurring Revenue" value="$284,520" delta="+22.4%" trend="up" />
        <StatCard title="Active Subscriptions" value="14,290" delta="+12.8%" trend="up" />
        <StatCard title="Churn Rate" value="0.82%" delta="-0.3%" trend="up" />
        <StatCard title="API Success Rate" value="99.98%" delta="+0.04%" trend="up" />
      </div>
    </div>
  );
}`,
    },
  ];

  const handleCopyCode = (template: TemplateDef) => {
    navigator.clipboard.writeText(template.code);
    setCopiedId(template.id);
    playUiSound('success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenPreview = (template: TemplateDef) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
    playUiSound('chime');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* View Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex justify-center">
          <Badge variant="glow" withPulse className="px-4 py-1.5 text-xs">
            ✨ Doni UI v0.9.0 — Pre-built Production Templates Hub
          </Badge>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Complete Production <span className="text-primary">Page Templates</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Drop-in ready, fully responsive full-page layouts crafted with Doni UI components, spring animations, and Tailwind CSS.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          const isCopied = copiedId === tpl.id;

          return (
            <motion.div
              key={tpl.id}
              whileHover={{ y: -4 }}
              transition={transitions.springGentle}
              className="group relative rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 shadow-xl flex flex-col justify-between overflow-hidden"
            >
              {/* Top Row: Icon, Category & Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary border border-primary/25 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">
                        {tpl.category}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {tpl.title}
                      </h3>
                    </div>
                  </div>
                  <Badge variant="glow" className="text-xs">
                    {tpl.badge}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                  {tpl.description}
                </p>

                {/* Key Features List */}
                <div className="space-y-2 mb-6">
                  {tpl.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyCode(tpl)}
                  className="flex-1"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                      Copied Code!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5" />
                      Copy Code
                    </>
                  )}
                </Button>

                <Button
                  variant="glow"
                  size="sm"
                  onClick={() => handleOpenPreview(tpl)}
                  className="flex-1"
                >
                  <Maximize2 className="w-3.5 h-3.5 mr-1.5" />
                  Live Preview
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Interactive Preview Modal */}
      <AnimatePresence>
        {previewOpen && selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playUiSound('click');
                setPreviewOpen(false);
              }}
              className="fixed inset-0 bg-background/85 backdrop-blur-md"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={transitions.springGentle}
              className="relative w-full max-w-4xl max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              {/* Modal Bar */}
              <div className="px-6 py-4 border-b border-border/70 flex items-center justify-between bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {React.createElement(selectedTemplate.icon, { className: 'w-4 h-4' })}
                  </div>
                  <div>
                    <h3 className="text-base font-bold">{selectedTemplate.title}</h3>
                    <p className="text-xs text-muted-foreground">{selectedTemplate.category} Template Preview</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="glow"
                    size="sm"
                    onClick={() => handleCopyCode(selectedTemplate)}
                  >
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy Code
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      playUiSound('click');
                      setPreviewOpen(false);
                    }}
                    className="w-8 h-8 rounded-lg border border-border/60 hover:bg-muted flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Preview Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Simulated Live Render */}
                {selectedTemplate.id === 'saas-landing' && (
                  <div className="rounded-xl border border-border/80 bg-background/60 p-8 text-center space-y-6">
                    <Badge variant="glow" withPulse>✨ Launching v2.0 Platform</Badge>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                      Supercharge workflow with <span className="text-primary">Zero Latency</span>
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                      Enterprise-ready cloud computing platform with automated autoscaling.
                    </p>
                    <div className="flex justify-center gap-3">
                      <FlameButton className="px-4 py-2 text-xs">Get Started Free</FlameButton>
                      <Button variant="outline" size="sm">Schedule Demo</Button>
                    </div>
                  </div>
                )}

                {selectedTemplate.id === 'ai-startup' && (
                  <div className="rounded-xl border border-border/80 bg-background/60 p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-primary" />
                        <h4 className="font-bold">Neural Inference Cluster</h4>
                      </div>
                      <Badge variant="glow">Live Streaming</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <StatCard title="Throughput" value="48.2k tok/s" change={34.2} />
                      <StatCard title="P99 Inference" value="42ms" change={-12.0} />
                      <StatCard title="Active Nodes" value="1,024 Nodes" change={18.0} />
                    </div>
                  </div>
                )}

                {selectedTemplate.id === 'dev-portfolio' && (
                  <div className="rounded-xl border border-border/80 bg-background/60 p-6 space-y-4">
                    <Badge variant="glow">Available for Hire</Badge>
                    <h3 className="text-2xl font-bold">Senior Full-Stack Engineer</h3>
                    <p className="text-xs text-muted-foreground">Architecting high-scale distributed applications.</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {['React', 'TypeScript', 'TailwindCSS', 'Rust', 'Go', 'Next.js'].map(tech => (
                        <Keycap key={tech} className="text-xs">{tech}</Keycap>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTemplate.id === 'analytics-dashboard' && (
                  <div className="rounded-xl border border-border/80 bg-background/60 p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">Cloud Health Monitor</h4>
                      <BadgeDelta deltaType="increase">+99.98% SLA</BadgeDelta>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <StatCard title="Monthly Revenue" value="$284,520" change={22.4} />
                      <StatCard title="Active Subscriptions" value="14,290" change={12.8} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Cluster CPU Load</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} size="md" />
                    </div>
                  </div>
                )}

                {/* Code Block */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-primary" />
                    <span>Template React JSX Code</span>
                  </h4>
                  <pre className="rounded-xl border border-border/70 bg-muted/40 p-4 font-mono text-xs overflow-x-auto text-foreground/90 leading-relaxed">
                    <code>{selectedTemplate.code}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
