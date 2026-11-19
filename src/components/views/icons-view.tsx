import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Copy,
  Check,
  Search,
  Sliders,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { transitions } from '@/lib/utils';
import { useToast } from '../ui/toast';
import {
  ALL_ANIMATED_ICONS,
  IconItemDef,
  IconCustomProps,
} from '../ui/animated-icons-suite';
import { AnimatedCatalogIcon } from '../ui/animated-catalog-icon';
import {
  ICON_1000_CATALOG,
  ICON_1000_CATEGORIES,
} from '@/data/icons-catalog-1000';
import { IconCustomizerModal } from '../ui/icon-customizer-modal';
import { SocialIconDock, AnimatedIconDock } from '../ui/animated-icons';

// Unified unified icon definition for both 100 handcrafted icons and 1,000 catalog icons
export interface UnifiedIconItem extends IconItemDef {
  isHandcrafted?: boolean;
}

export const IconsView: React.FC = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSize, setGlobalSize] = useState<number>(32);
  const [globalGlow, setGlobalGlow] = useState<boolean>(true);
  const [globalLoop, setGlobalLoop] = useState<boolean>(false);
  const [globalShape, setGlobalShape] = useState<'none' | 'square' | 'circle' | 'glass'>('glass');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 60;

  // Customizer modal state
  const [selectedIcon, setSelectedIcon] = useState<IconItemDef | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Combine handcrafted icons + 1,000 catalog icons into unified registry
  const allUnifiedIcons: UnifiedIconItem[] = useMemo(() => {
    // 1. Signature Handcrafted Icons (100)
    const handcrafted: UnifiedIconItem[] = ALL_ANIMATED_ICONS.map((h) => ({
      ...h,
      isHandcrafted: true,
    }));

    // 2. 1,000 Catalog Icons
    const catalog: UnifiedIconItem[] = ICON_1000_CATALOG.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      exportName: item.exportName,
      desc: item.desc,
      isHandcrafted: false,
      component: (props: IconCustomProps) => (
        <AnimatedCatalogIcon iconItem={item} {...props} />
      ),
    }));

    return [...handcrafted, ...catalog];
  }, []);

  // Category filters list
  const categoryFilters = useMemo(() => {
    const list = [
      { id: 'all', label: `All Icons (${allUnifiedIcons.length})` },
      { id: 'signature', label: `Handcrafted 3D (${ALL_ANIMATED_ICONS.length})` },
    ];

    ICON_1000_CATEGORIES.forEach((cat) => {
      list.push({
        id: cat.id,
        label: `${cat.label} (${cat.count})`,
      });
    });

    return list;
  }, [allUnifiedIcons.length]);

  // Filter icons based on category and search query
  const filteredIcons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allUnifiedIcons.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'signature'
          ? item.isHandcrafted
          : item.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.exportName.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [allUnifiedIcons, selectedCategory, searchQuery]);

  // Reset to page 1 whenever category or search query changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredIcons.length / PAGE_SIZE));
  const paginatedIcons = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredIcons.slice(start, start + PAGE_SIZE);
  }, [filteredIcons, currentPage, PAGE_SIZE]);

  const openCustomizer = (iconDef: IconItemDef) => {
    setSelectedIcon(iconDef);
    setIsModalOpen(true);
  };

  const copyQuickCode = (e: React.MouseEvent, iconDef: UnifiedIconItem) => {
    e.stopPropagation();
    const code = `import { ${iconDef.exportName} } from 'doni-ui';\n\n<${iconDef.exportName} size={${globalSize}} withGlow={${globalGlow}} bgShape="${globalShape}" />`;
    navigator.clipboard.writeText(code);
    setCopiedId(iconDef.id);
    toast({
      title: 'Copied Code!',
      description: `<${iconDef.exportName} /> ready to paste`,
      type: 'success',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.smoothEase}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10"
    >
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <Badge variant="glow" withPulse className="px-4 py-1.5 text-xs">
          ✨ 1,000+ Spring-Animated Icons Suite &amp; Live Customizer Studio
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
          1,000+ Animated <span className="text-primary">Icons &amp; Studio</span>
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg">
          Over <strong>1,100 vector icons</strong> across 20+ rich categories with Framer Motion spring physics, neon glows, and custom micro-interactions. <strong>Click any icon to customize size, stroke, colors &amp; animation trigger!</strong>
        </p>
      </div>

      {/* Floating Docks Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Glassmorphic Interactive Floating Docks
          </h2>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Hover icons to test spring physics magnification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-card/70 border-border/70 flex flex-col items-center justify-between gap-4 text-center">
            <div>
              <h3 className="font-bold text-sm">Social Channels Floating Dock</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Preconfigured social channels with hover neon bloom and spring scale
              </p>
            </div>
            <SocialIconDock iconSize={24} />
          </Card>

          <Card className="p-6 bg-card/70 border-border/70 flex flex-col items-center justify-between gap-4 text-center">
            <div>
              <h3 className="font-bold text-sm">Custom Action Dock</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mix and match any icons from the 1,000+ suite into dynamic docks
              </p>
            </div>
            <AnimatedIconDock
              icons={['rocket', 'shield-check', 'gamepad', 'headphones', 'sparkle-star']}
              iconSize={24}
            />
          </Card>
        </div>
      </div>

      {/* Global Studio Quick Toolbar */}
      <Card className="p-5 bg-card/80 border-border/80 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={`Search 1,000+ icons (e.g. arrow, database, lock, sun)...`}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-10 text-sm bg-background/60"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Studio Adjusters */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            {/* Global Size Slider */}
            <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-xl border border-border/60">
              <span className="text-muted-foreground flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-primary" />
                Size:
              </span>
              <input
                type="range"
                min="20"
                max="48"
                value={globalSize}
                onChange={(e) => setGlobalSize(Number(e.target.value))}
                className="w-20 accent-primary cursor-pointer"
              />
              <span className="font-mono font-bold text-primary w-8 text-right">
                {globalSize}px
              </span>
            </div>

            {/* Container Shape Selector */}
            <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/60">
              {(['none', 'square', 'circle', 'glass'] as const).map((sh) => (
                <button
                  key={sh}
                  type="button"
                  onClick={() => setGlobalShape(sh)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all capitalize cursor-pointer ${
                    globalShape === sh
                      ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {sh}
                </button>
              ))}
            </div>

            {/* Neon Glow Toggle */}
            <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-xl border border-border/60">
              <span className="text-muted-foreground">Neon Glow:</span>
              <Switch checked={globalGlow} onCheckedChange={setGlobalGlow} />
            </div>

            {/* Loop All Animations Toggle */}
            <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-xl border border-border/60">
              <span className="text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                Loop All:
              </span>
              <Switch checked={globalLoop} onCheckedChange={setGlobalLoop} />
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Scrollable horizontally) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0 mr-1" />
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/70 hover:text-foreground border border-border/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Results Count & Current Page Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div>
          Showing <strong>{paginatedIcons.length}</strong> of <strong>{filteredIcons.length}</strong> icons matching filters
          {searchQuery && (
            <span> for query &ldquo;<span className="text-foreground font-semibold">{searchQuery}</span>&rdquo;</span>
          )}
        </div>

        {/* Pagination Bar Top */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              title="First Page"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>

            <span className="px-3 py-1 rounded-lg bg-card border border-border font-mono font-semibold text-foreground text-[11px]">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              title="Last Page"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}
      </div>

      {/* 1,000+ Animated Icons Grid */}
      {paginatedIcons.length === 0 ? (
        <Card className="p-12 text-center bg-card/50 border-dashed border-border/80">
          <p className="text-muted-foreground text-sm">
            No icons found matching &ldquo;{searchQuery}&rdquo;. Try another keyword or select &ldquo;All Icons&rdquo;.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setCurrentPage(1);
            }}
          >
            Reset Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {paginatedIcons.map((item) => {
            const IconComponent = item.component;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={transitions.springGentle}
              >
                <Card
                  onClick={() => openCustomizer(item)}
                  className="group relative p-4 flex flex-col items-center justify-between text-center bg-card/60 hover:bg-card border-border/70 hover:border-primary/50 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-glow hover:-translate-y-1 h-[175px]"
                >
                  {/* Category Pill Tag */}
                  <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground/80 group-hover:text-primary transition-colors">
                    {item.category}
                  </span>

                  {/* Animated Icon Target */}
                  <div className="my-auto py-2">
                    <IconComponent
                      size={globalSize}
                      withGlow={globalGlow}
                      continuous={globalLoop}
                      trigger={globalLoop ? 'continuous' : 'hover'}
                      bgShape={globalShape}
                    />
                  </div>

                  {/* Icon Name & Quick Copy */}
                  <div className="w-full flex items-center justify-between gap-1 pt-2 border-t border-border/40">
                    <span className="text-xs font-semibold truncate text-foreground group-hover:text-primary transition-colors text-left" title={item.name}>
                      {item.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => copyQuickCode(e, item)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all cursor-pointer shrink-0"
                      title="Quick Copy JSX"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar Bottom */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40">
          <span className="text-xs text-muted-foreground">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredIcons.length} total icons)
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(1);
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
            >
              <ChevronsLeft className="w-3.5 h-3.5 mr-1" />
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              Prev
            </Button>

            <span className="px-4 py-1.5 rounded-xl bg-card border border-border font-mono font-bold text-xs text-primary">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
            >
              Next
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(totalPages);
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
            >
              Last
              <ChevronsRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Developer API Reference Table */}
      <Card className="p-6 bg-card/60 border-border/80 space-y-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" />
            Animated Icon Props API Reference
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Every icon from the 1,000+ suite accepts the standard Doni UI icon props API:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-muted-foreground">
                <th className="py-2.5 px-3 font-semibold">Prop</th>
                <th className="py-2.5 px-3 font-semibold">Type</th>
                <th className="py-2.5 px-3 font-semibold">Default</th>
                <th className="py-2.5 px-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">size</td>
                <td className="py-2.5 px-3 text-muted-foreground">number</td>
                <td className="py-2.5 px-3 text-foreground">28</td>
                <td className="py-2.5 px-3 font-sans text-muted-foreground">
                  Icon dimension in pixels (width and height).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">strokeWidth</td>
                <td className="py-2.5 px-3 text-muted-foreground">number</td>
                <td className="py-2.5 px-3 text-foreground">2</td>
                <td className="py-2.5 px-3 font-sans text-muted-foreground">
                  SVG stroke outline thickness (1, 1.5, 2, 2.5, 3).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">color</td>
                <td className="py-2.5 px-3 text-muted-foreground">string</td>
                <td className="py-2.5 px-3 text-foreground">&apos;currentColor&apos;</td>
                <td className="py-2.5 px-3 font-sans text-muted-foreground">
                  Primary stroke/fill color or custom hex code (#38bdf8).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">hoverColor</td>
                <td className="py-2.5 px-3 text-muted-foreground">string</td>
                <td className="py-2.5 px-3 text-foreground">undefined</td>
                <td className="py-2.5 px-3 font-sans text-muted-foreground">
                  Dynamic hover color transition on mouse pointer hover.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">withGlow</td>
                <td className="py-2.5 px-3 text-muted-foreground">boolean</td>
                <td className="py-2.5 px-3 text-foreground">true</td>
                <td className="py-2.5 px-3 font-sans text-muted-foreground">
                  Enable soft neon halo bloom drop-shadow effect.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">trigger</td>
                <td className="py-2.5 px-3 text-muted-foreground">&apos;hover&apos; | &apos;continuous&apos; | &apos;click&apos;</td>
                <td className="py-2.5 px-3 text-foreground">&apos;hover&apos;</td>
                <td className="py-2.5 px-3 font-sans text-muted-foreground">
                  Physics spring trigger mode (hover, infinite loop, or click toggle).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-primary">bgShape</td>
                <td className="py-2.5 px-3 text-muted-foreground">&apos;none&apos; | &apos;square&apos; | &apos;circle&apos; | &apos;glass&apos;</td>
                <td className="py-2.5 px-3 text-foreground">&apos;none&apos;</td>
                <td className="py-2.5 px-3 font-sans text-muted-foreground">
                  Container tile styling (glassmorphic dock, rounded box, or circle).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Interactive Live Customizer Studio Modal */}
      <AnimatePresence>
        {isModalOpen && selectedIcon && (
          <IconCustomizerModal
            iconDef={selectedIcon}
            allIcons={filteredIcons}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelectIcon={(newIcon) => setSelectedIcon(newIcon)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
