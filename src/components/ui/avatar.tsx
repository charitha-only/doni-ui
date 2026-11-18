import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, status, children, ...props }, ref) => (
  <div className="relative inline-block">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border shadow-md transition-transform hover:scale-105 duration-200',
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Root>
    {status && (
      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-background">
        <span
          className={cn(
            'block h-full w-full rounded-full',
            status === 'online' && 'bg-emerald-500 shadow-glow',
            status === 'offline' && 'bg-muted-foreground',
            status === 'busy' && 'bg-destructive',
            status === 'away' && 'bg-amber-500'
          )}
        />
        {status === 'online' && (
          <span className="animate-ping absolute inset-0 inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
      </span>
    )}
  </div>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted font-bold text-xs text-muted-foreground uppercase',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
