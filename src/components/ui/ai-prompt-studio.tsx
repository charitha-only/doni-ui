import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Copy,
  Check,
  X,
  RotateCcw,
  Code2,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { transitions } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'saas' | 'web3' | 'dashboard' | 'marketing';
  prompt: string;
  generatedCode: string;
}

const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'pricing-card',
    title: 'SaaS Pro Pricing Tier Card',
    category: 'saas',
    prompt: 'Create a modern dark-mode SaaS Pro pricing card with annual discount badge, feature checklist, and glowing action button.',
    generatedCode: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'doni-ui';
import { Button, Badge } from 'doni-ui';
import { Check, Sparkles } from 'lucide-react';

export function PricingCard() {
  return (
    <Card className="max-w-sm border-primary/40 bg-card/90 shadow-glow relative overflow-hidden">
      <div className="absolute top-3 right-3">
        <Badge variant="glow" withPulse>Popular</Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">Pro Enterprise</CardTitle>
        <CardDescription>Ideal for scaling startups and modern teams.</CardDescription>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-foreground">$49</span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {['Unlimited seats', '120 FPS Framer animations', 'Dynamic any-hex color engine', 'Priority 24/7 support'].map((feat, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span>{feat}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="glow" className="w-full">
          <Sparkles className="w-4 h-4 mr-2" />
          Get Started Now
        </Button>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    id: 'crypto-stake',
    title: 'Web3 Staking & Yield Card',
    category: 'web3',
    prompt: 'Design a Web3 DeFi staking widget with APY counter, lockup duration selector, and interactive slider.',
    generatedCode: `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from 'doni-ui';
import { Button, BadgeDelta, Slider, FlameButton } from 'doni-ui';
import { Zap, Coins } from 'lucide-react';

export function StakingWidget() {
  return (
    <Card className="max-w-md border-border/70 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            <Coins className="w-4 h-4" />
          </div>
          <CardTitle className="text-base">ETH Liquid Staking</CardTitle>
        </div>
        <BadgeDelta deltaType="increase" value="+18.4% APY" />
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Staking Pool Capacity</span>
          <span className="font-mono font-bold text-foreground">84.2%</span>
        </div>
        <Slider defaultValue={[84]} max={100} step={1} />
        <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Estimated Daily Rewards:</span>
          <span className="font-mono font-bold text-primary">0.042 ETH (~$142.50)</span>
        </div>
      </CardContent>
      <CardFooter>
        <FlameButton flameColor="#06b6d4" className="w-full py-2.5">
          <Zap className="w-4 h-4 mr-2" />
          Stake Tokens Instantly
        </FlameButton>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    id: 'analytics-kpi',
    title: 'Live Realtime Metrics Tile',
    category: 'dashboard',
    prompt: 'Build a high-impact SaaS KPI tile with 3D Spotlight hover, live ticker count, and trending status badge.',
    generatedCode: `import { SpotlightCard, StatCard, NumberTicker, BadgeDelta } from 'doni-ui';
import { Users, ArrowUpRight } from 'lucide-react';

export function MetricsCard() {
  return (
    <SpotlightCard className="p-6 border border-border/80 bg-card rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Active Subscribers</p>
            <h3 className="text-2xl font-bold font-mono tracking-tight text-foreground">
              <NumberTicker value={128450} />
            </h3>
          </div>
        </div>
        <BadgeDelta deltaType="moderateIncrease" value="+12.5%" />
      </div>
      <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-emerald-400 font-semibold">+1,420</span> new developers joined this week
      </p>
    </SpotlightCard>
  );
}`,
  },
  {
    id: 'interactive-auth',
    title: 'Modern Minimal Glass Auth Card',
    category: 'marketing',
    prompt: 'Create a sleek glassmorphic login card with tabbed Magic Link or Password inputs, remember me switch, and animated submit button.',
    generatedCode: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'doni-ui';
import { Input, Button, Switch } from 'doni-ui';
import { Sparkles, Mail, Lock } from 'lucide-react';

export function GlassAuthCard() {
  return (
    <Card className="max-w-sm backdrop-blur-xl bg-card/80 border-border/80 shadow-2xl">
      <CardHeader className="text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary mx-auto flex items-center justify-center shadow-glow mb-2">
          <Sparkles className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl">Welcome to Doni UI</CardTitle>
        <CardDescription>Enter your credentials to enter your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold">Email address</label>
          <Input placeholder="developer@company.com" type="email" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold">Password</label>
          <Input placeholder="••••••••••••" type="password" />
        </div>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <span className="text-muted-foreground">Remember me</span>
          </div>
          <a href="#" className="text-primary hover:underline font-semibold">Forgot?</a>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="glow" className="w-full">Sign In to Dashboard</Button>
      </CardFooter>
    </Card>
  );
}`,
  },
];

export interface AiPromptStudioProps {
  open: boolean;
  onClose: () => void;
}

export const AiPromptStudio: React.FC<AiPromptStudioProps> = ({ open, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(PROMPT_TEMPLATES[0]);
  const [customPrompt, setCustomPrompt] = useState(PROMPT_TEMPLATES[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedCode, setDisplayedCode] = useState(PROMPT_TEMPLATES[0].generatedCode);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setCustomPrompt(selectedTemplate.prompt);
      setDisplayedCode(selectedTemplate.generatedCode);
    }
  }, [open, selectedTemplate]);

  const handleSelectTemplate = (template: PromptTemplate) => {
    playUiSound('tab');
    setSelectedTemplate(template);
    setCustomPrompt(template.prompt);
    setDisplayedCode(template.generatedCode);
  };

  const handleGenerate = () => {
    playUiSound('chime');
    setIsGenerating(true);
    setDisplayedCode('// ⚡ Doni AI is synthesizing component tree with GPU spring physics...\n');

    const targetCode = selectedTemplate.generatedCode;
    let index = 0;
    const interval = setInterval(() => {
      index += 12;
      if (index >= targetCode.length) {
        setDisplayedCode(targetCode);
        setIsGenerating(false);
        clearInterval(interval);
        playUiSound('success');
      } else {
        setDisplayedCode(targetCode.slice(0, index));
      }
    }, 15);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedCode);
    setCopied(true);
    playUiSound('success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playUiSound('click');
              onClose();
            }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={transitions.springGentle}
            className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/70 bg-muted/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-primary/40 text-primary-foreground flex items-center justify-center shadow-glow">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-foreground">Doni AI Component Studio</h3>
                    <Badge variant="glow" className="text-[10px] py-0 px-1.5">v1.1.0 Experimental</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Describe your UI or pick a prompt to synthesize instant Doni UI JSX.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playUiSound('click');
                  onClose();
                }}
                className="w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-y-auto flex-1">
              {/* Left Column: Prompt Selector & Input (5 cols) */}
              <div className="md:col-span-5 p-4 border-b md:border-b-0 md:border-r border-border/60 space-y-4 bg-muted/10">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Curated AI Prompts</span>
                  <div className="mt-2 space-y-1.5">
                    {PROMPT_TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => handleSelectTemplate(tmpl)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex flex-col gap-1 ${
                          selectedTemplate.id === tmpl.id
                            ? 'bg-primary/10 border-primary/50 text-foreground shadow-xs'
                            : 'border-border/50 hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{tmpl.title}</span>
                          <span className="text-[10px] font-mono uppercase opacity-75">{tmpl.category}</span>
                        </div>
                        <p className="text-[11px] line-clamp-1 opacity-80">{tmpl.prompt}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Natural Language Prompt</label>
                  <textarea
                    rows={3}
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Create a 3D glass card with rating stars and a flame button..."
                    className="w-full text-xs font-sans p-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                  <Button
                    variant="glow"
                    size="sm"
                    className="w-full"
                    disabled={isGenerating}
                    onClick={handleGenerate}
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                        Synthesizing JSX...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                        Generate Component JSX
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Right Column: Code View & Actions (7 cols) */}
              <div className="md:col-span-7 p-4 flex flex-col justify-between bg-card/60">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      <span className="text-xs font-mono font-bold text-foreground">GeneratedComponent.tsx</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-7 text-xs"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copy Code
                        </>
                      )}
                    </Button>
                  </div>

                  <pre className="p-3 rounded-xl bg-muted/40 border border-border/40 font-mono text-[11px] text-foreground leading-relaxed overflow-x-auto max-h-[380px] scrollbar-thin">
                    <code>{displayedCode}</code>
                  </pre>
                </div>

                <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Works seamlessly with all 55+ Doni UI components</span>
                  <span className="font-mono text-primary font-semibold">100% Tree-shakable</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
