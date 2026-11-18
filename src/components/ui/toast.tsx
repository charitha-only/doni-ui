import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn, transitions } from '@/lib/utils';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastContextType {
  toast: (options: Omit<ToastMessage, 'id'>) => void;
  triggerConfetti: () => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toast = React.useCallback(
    ({ title, description, type = 'info' }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = React.useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f43f5e', '#f59e0b'],
    });
  }, []);

  return (
    <ToastContext.Provider value={{ toast, triggerConfetti }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={transitions.springBouncy}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-lg bg-card/95',
                t.type === 'success' && 'border-emerald-500/40 text-foreground',
                t.type === 'error' && 'border-destructive/40 text-foreground',
                t.type === 'info' && 'border-primary/40 text-foreground'
              )}
            >
              <div className="mt-0.5 shrink-0">
                {t.type === 'success' && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                )}
                {t.type === 'error' && (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                )}
                {t.type === 'info' && (
                  <Info className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-muted-foreground">
                    {t.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
