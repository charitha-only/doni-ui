import React, { useState } from 'react';
import { Copy, Check, Code2, Terminal } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { COMPONENT_SNIPPETS } from '@/data/component-snippets';

export interface CodeDialogProps {
  snippetId: string;
  trigger?: React.ReactNode;
}

export const CodeDialog: React.FC<CodeDialogProps> = ({ snippetId, trigger }) => {
  const snippet = COMPONENT_SNIPPETS[snippetId];
  const { toast } = useToast();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!snippet) return null;

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(label);
    toast({
      title: 'Copied to Clipboard!',
      description: `${label} code snippet is ready to paste.`,
      type: 'success',
    });
    setTimeout(() => setCopiedType(null), 2000);
  };

  const fullCode = `${snippet.importCode}\n\n${snippet.usageCode}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            <Code2 className="w-3.5 h-3.5" />
            <span>View Code</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <div>
              <DialogTitle className="text-xl flex items-center gap-2">
                <span>{snippet.name}</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {snippet.category}
                </span>
              </DialogTitle>
              <DialogDescription className="mt-1">
                {snippet.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* CLI Add Command */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/60 p-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Terminal className="w-4 h-4 text-primary" />
              <span>npx doni-ui add {snippet.id}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => handleCopy(`npx doni-ui add ${snippet.id}`, 'CLI Command')}
            >
              {copiedType === 'CLI Command' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 mr-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1" />
              )}
              Copy
            </Button>
          </div>

          {/* Import Statement */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              1. Import
            </span>
            <div className="relative rounded-xl border border-border bg-card p-3 font-mono text-xs">
              <pre className="text-primary overflow-x-auto">{snippet.importCode}</pre>
            </div>
          </div>

          {/* Usage Code */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                2. Usage
              </span>
              <Button
                variant="glow"
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={() => handleCopy(fullCode, `${snippet.name} Component`)}
              >
                {copiedType === `${snippet.name} Component` ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                Copy Full Snippet
              </Button>
            </div>
            <div className="relative rounded-xl border border-border bg-card p-3.5 font-mono text-xs overflow-x-auto leading-relaxed">
              <pre className="text-foreground/90">{snippet.usageCode}</pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
