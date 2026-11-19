import React, { useState } from 'react';
import { Copy, Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Input } from './input';

export interface ColorPickerProps {
  color?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showInput?: boolean;
  className?: string;
}

const DEFAULT_PRESETS = [
  '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4',
  '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899',
  '#14b8a6', '#84cc16', '#eab308', '#64748b', '#000000',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color: controlledColor,
  onChange,
  presets = DEFAULT_PRESETS,
  showInput = true,
  className,
}) => {
  const [internalColor, setInternalColor] = useState('#8b5cf6');
  const [copied, setCopied] = useState(false);

  const currentColor = controlledColor ?? internalColor;

  const handleColorChange = (newColor: string) => {
    setInternalColor(newColor);
    onChange?.(newColor);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('p-4 rounded-2xl bg-card border border-border/80 shadow-sm space-y-3 w-fit', className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground">Color Picker</span>
        </div>
        <div
          className="w-5 h-5 rounded-full border border-background shadow-xs ring-1 ring-border"
          style={{ backgroundColor: currentColor }}
        />
      </div>

      {/* Native Color Target & Preview */}
      <div className="flex items-center gap-2">
        <label className="relative w-10 h-10 rounded-xl overflow-hidden cursor-pointer border border-border shrink-0 shadow-inner">
          <input
            type="color"
            value={currentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="absolute -top-4 -left-4 w-20 h-20 cursor-pointer border-0 p-0"
          />
        </label>

        {showInput && (
          <div className="flex items-center gap-1.5 flex-1">
            <Input
              type="text"
              value={currentColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="h-9 text-xs font-mono font-semibold uppercase"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0"
              onClick={copyToClipboard}
              title="Copy hex code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Preset Swatches Grid */}
      {presets.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-border/50">
          <span className="text-[10px] text-muted-foreground font-semibold">Presets</span>
          <div className="grid grid-cols-5 gap-1.5">
            {presets.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleColorChange(c)}
                style={{ backgroundColor: c }}
                className={cn(
                  'w-6 h-6 rounded-lg transition-transform hover:scale-110 cursor-pointer shadow-xs border border-background/20',
                  currentColor.toLowerCase() === c.toLowerCase() && 'ring-2 ring-primary ring-offset-2 ring-offset-card'
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
