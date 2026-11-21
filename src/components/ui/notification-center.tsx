import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  CheckCheck,
  Trash2,
  Sparkles,
  Zap,
  ShieldCheck,
  Users,
  Plus,
} from 'lucide-react';
import { Badge } from './badge';
import { transitions } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'deploy' | 'security' | 'team' | 'system';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Doni UI v1.4.0 Deployed',
    description: 'Notification Center & Offline Service Worker live in production.',
    time: 'Just now',
    read: false,
    type: 'deploy',
  },
  {
    id: '2',
    title: 'WCAG 2.1 Audit Passed',
    description: 'Contrast ratio 8.4:1 exceeds AAA accessibility compliance.',
    time: '5m ago',
    read: false,
    type: 'security',
  },
  {
    id: '3',
    title: 'New Star on GitHub',
    description: 'Developer starred charitha-only/doni-ui repository.',
    time: '24m ago',
    read: true,
    type: 'team',
  },
  {
    id: '4',
    title: 'Theme Config Exported',
    description: 'Tailwind CSS preset was copied to clipboard.',
    time: '1h ago',
    read: true,
    type: 'system',
  },
];

export const NotificationCenter: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    playUiSound('pop');
  };

  const clearAll = () => {
    setNotifications([]);
    playUiSound('switch');
  };

  const toggleItem = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
    playUiSound('click');
  };

  const addSimulated = () => {
    const newItem: NotificationItem = {
      id: Date.now().toString(),
      title: 'Realtime Activity Event',
      description: 'Spring animated interaction triggered with audio feedback.',
      time: 'Just now',
      read: false,
      type: 'deploy',
    };
    setNotifications((prev) => [newItem, ...prev]);
    playUiSound('success');
  };

  const filtered =
    filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications;

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'deploy':
        return <Zap className="w-3.5 h-3.5 text-primary" />;
      case 'security':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case 'team':
        return <Users className="w-3.5 h-3.5 text-amber-400" />;
      case 'system':
        return <Sparkles className="w-3.5 h-3.5 text-violet-400" />;
    }
  };

  return (
    <div className="relative">
      {/* Trigger Bell Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          setOpen((prev) => !prev);
          playUiSound('tab');
        }}
        className="relative w-9 h-9 rounded-xl border border-border/70 hover:border-primary/50 bg-card hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs"
        title="Notification Center (N)"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-glow">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {/* Popover Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop click dismiss */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={transitions.springGentle}
              className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/70 bg-muted/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-sm text-foreground">Activity Center</span>
                  <Badge variant="glow" className="text-[10px] py-0 px-1.5">v1.4.0</Badge>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={addSimulated}
                    className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    title="Simulate Event"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title="Mark all as read"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-red-400 transition-colors cursor-pointer"
                      title="Clear all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-border/40 bg-muted/10 text-xs">
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`font-semibold cursor-pointer ${
                    filter === 'all' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All ({notifications.length})
                </button>
                <span className="text-border">•</span>
                <button
                  type="button"
                  onClick={() => setFilter('unread')}
                  className={`font-semibold cursor-pointer ${
                    filter === 'unread' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              {/* Notification List */}
              <div className="max-h-[340px] overflow-y-auto divide-y divide-border/40 p-1">
                {filtered.length === 0 ? (
                  <div className="py-10 text-center text-xs text-muted-foreground">
                    No notifications to display.
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 hover:bg-muted/40 ${
                        !item.read ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center shrink-0 mt-0.5 border border-border/60">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`text-xs font-semibold truncate ${!item.read ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                            {item.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-border/60 bg-muted/10 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Press <strong>N</strong> to toggle</span>
                <span className="font-mono text-primary font-bold">Doni UI v1.4.0</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
