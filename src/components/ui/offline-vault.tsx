import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Download,
  RefreshCw,
  X,
  Radio,
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { playUiSound } from '@/lib/sound-effects';
import { useTheme } from '@/theme/theme-context';

export const OfflineVault: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const storageUsed = '12.4 KB';
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  const [syncCount, setSyncCount] = useState(1);
  const { mode, activePreset, customHex, isCustom } = useTheme();

  // Cross-Tab Broadcast Channel Sync
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    const channel = new BroadcastChannel('doni_ui_vault_sync');

    channel.onmessage = () => {
      setSyncCount((c) => c + 1);
      setLastSyncTime(new Date().toLocaleTimeString());
      playUiSound('tab');
    };

    return () => {
      channel.close();
    };
  }, []);

  const exportBackup = () => {
    const data = {
      app: 'doni-ui',
      version: '2.5.0',
      exportedAt: new Date().toISOString(),
      theme: {
        mode,
        activePreset: activePreset.id,
        customHex,
        isCustom,
      },
      settings: {
        soundEnabled: localStorage.getItem('doni_ui_sound_enabled') !== 'false',
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doni-ui-vault-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    playUiSound('success');
  };

  const triggerBroadcastPing = () => {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('doni_ui_vault_sync');
      channel.postMessage({ type: 'PING', timestamp: Date.now() });
      channel.close();
    }
    setLastSyncTime(new Date().toLocaleTimeString());
    setSyncCount((c) => c + 1);
    playUiSound('pop');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          playUiSound('tab');
        }}
        className="fixed bottom-6 left-[1015px] z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-md shadow-glow hover:border-primary/60 text-xs font-semibold text-foreground transition-all cursor-pointer hover:scale-105 active:scale-95"
        title="Open Offline Local Sync Vault (v2.5.0)"
      >
        <Database className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:inline">Sync Vault</span>
        <Badge variant="glow" className="text-[9px] py-0 px-1.5 h-4">v2.5.0</Badge>
      </button>

      {/* Modal Studio */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/60 bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shadow-glow">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">Offline Local Sync Vault</h3>
                      <Badge variant="glow" className="text-[10px]">v2.5.0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Cross-tab broadcast synchronization &amp; zero-server state backup</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Status Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Channel Status</div>
                    <div className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Sync</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">BroadcastChannel</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Local Storage</div>
                    <div className="text-sm font-bold font-mono text-primary mt-1">{storageUsed}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Client Indexed</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Sync Events</div>
                    <div className="text-sm font-bold font-mono text-foreground mt-1">#{syncCount} Events</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{lastSyncTime}</div>
                  </div>
                </div>

                {/* Broadcast Channel Simulation */}
                <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-xs font-semibold">Real-Time Multi-Tab Synchronization</div>
                        <div className="text-[10px] text-muted-foreground">Changes reflect across open tabs with zero server calls</div>
                      </div>
                    </div>
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={triggerBroadcastPing}
                      className="h-7 text-xs"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" /> Ping Tabs
                    </Button>
                  </div>
                </div>

                {/* Backup & Restore */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Workspace Snapshot Backup
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportBackup}
                      className="w-full sm:w-auto text-xs h-8 gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Export Workspace JSON
                    </Button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border/60 bg-muted/30 flex items-center justify-end">
                <Button
                  variant="glow"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-xs h-8 px-4"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
