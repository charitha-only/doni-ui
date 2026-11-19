import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />,
  showHome = true,
  onItemClick,
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs', className)}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {showHome && (
          <li className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onItemClick?.({ label: 'Home', href: '/' }, -1)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50 cursor-pointer flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </button>
            <span aria-hidden="true" className="shrink-0">{separator}</span>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-bold text-foreground flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-muted/30"
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onItemClick?.(item, index)}
                  className="text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded-md hover:bg-muted/50 cursor-pointer flex items-center gap-1 font-medium"
                >
                  {item.icon}
                  {item.label}
                </button>
              )}

              {!isLast && <span aria-hidden="true" className="shrink-0">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
