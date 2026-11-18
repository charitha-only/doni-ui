import React, { useState } from 'react';
import { Search, Sparkles, Terminal, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { COMPONENT_SNIPPETS } from '@/data/component-snippets';
import { useToast } from '@/components/ui/toast';

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectComponent?: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onOpenChange,
  onSelectComponent,
}) => {
  const [query, setQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const snippets = Object.values(COMPONENT_SNIPPETS);
  const filtered = snippets.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopyCLI = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const cmd = `npx doni-ui add ${id}`;
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    toast({
      title: 'Command Copied!',
      description: cmd,
      type: 'success',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden bg-card/95 backdrop-blur-2xl border-border/80">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Components</DialogTitle>
        </DialogHeader>

        {/* Search input bar */}
        <div className="flex items-center px-4 border-b border-border/60">
          <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components, categories, or keywords..."
            className="w-full h-14 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted border border-border rounded">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No components found matching "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectComponent?.(item.id);
                  onOpenChange(false);
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground group-hover:text-primary">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleCopyCLI(e, item.id)}
                  title="Copy npx add command"
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Terminal className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-border/60 bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            Showing <strong>{filtered.length}</strong> components
          </span>
          <span>Press ESC to close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
