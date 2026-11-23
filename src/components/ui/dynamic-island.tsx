import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Phone,
  PhoneOff,
  Timer,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Volume2,
  X,
  Music2,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { playUiSound } from '@/lib/sound-effects';

export type DynamicIslandState = 'idle' | 'music' | 'timer' | 'call' | 'notification';

export interface DynamicIslandProps {
  initialState?: DynamicIslandState;
  className?: string;
  enableDockControls?: boolean;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  initialState = 'idle',
  className,
  enableDockControls = true,
}) => {
  const [state, setState] = useState<DynamicIslandState>(initialState);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Timer countdown simulation
  useEffect(() => {
    let interval: any;
    if (state === 'timer' && isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state, isTimerRunning, timerSeconds]);

  const changeState = (newState: DynamicIslandState) => {
    setState(newState);
    playUiSound('pop');
  };

  if (isMinimized) {
    return (
      <div className={cn('fixed top-4 left-1/2 -translate-x-1/2 z-50', className)}>
        <button
          type="button"
          onClick={() => {
            setIsMinimized(false);
            playUiSound('click');
          }}
          className="px-3 py-1.5 rounded-full bg-black/90 text-white/90 text-xs font-mono border border-white/20 shadow-2xl flex items-center gap-2 hover:border-primary transition-all cursor-pointer backdrop-blur-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>Dynamic Island</span>
        </button>
      </div>
    );
  }

  return (
    <div className={cn('fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3', className)}>
      {/* Morphing Floating Island HUD */}
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 30,
          mass: 0.8,
        }}
        className={cn(
          'relative bg-zinc-950/95 text-white border border-white/15 rounded-[28px] shadow-2xl backdrop-blur-2xl overflow-hidden cursor-default',
          state === 'idle' && 'px-5 py-2.5 min-w-[190px]',
          state === 'music' && 'px-5 py-3.5 min-w-[340px] sm:min-w-[380px]',
          state === 'timer' && 'px-5 py-3 min-w-[280px]',
          state === 'call' && 'px-5 py-4 min-w-[320px] sm:min-w-[360px]',
          state === 'notification' && 'px-5 py-3.5 min-w-[320px] sm:min-w-[360px]'
        )}
      >
        <AnimatePresence mode="wait">
          {/* STATE: IDLE */}
          {state === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-between gap-4 text-xs select-none"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-white/90">Doni Active</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 font-mono text-[11px]">
                <span>120 FPS</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-primary font-bold">0ms</span>
              </div>
            </motion.div>
          )}

          {/* STATE: MUSIC */}
          {state === 'music' && (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg relative overflow-hidden group">
                  <Music2 className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-tight line-clamp-1">
                    Cosmic Synapses
                  </div>
                  <div className="text-[11px] text-white/60 font-medium">
                    Doni Soundscapes
                  </div>
                </div>
              </div>

              {/* Animated Waveform & Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-end gap-0.5 h-4">
                  {[0.7, 1, 0.4, 0.9, 0.5, 0.8].map((height, i) => (
                    <motion.span
                      key={i}
                      animate={
                        isPlaying
                          ? { height: ['25%', `${height * 100}%`, '30%'] }
                          : { height: '20%' }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + i * 0.1,
                        ease: 'easeInOut',
                      }}
                      className="w-1 rounded-full bg-primary"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    playUiSound('click');
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE: TIMER */}
          {state === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sprint Focus</div>
                  <div className="text-[11px] text-white/60">00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds} remaining</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(!isTimerRunning);
                    playUiSound('click');
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  {isTimerRunning ? 'Pause' : 'Resume'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimerSeconds(45);
                    playUiSound('pop');
                  }}
                  className="px-2 py-1 rounded-full text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE: CALL */}
          {state === 'call' && (
            <motion.div
              key="call"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  C
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Charitha</div>
                  <div className="text-[11px] text-white/60">Doni UI Lead • Calling...</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    changeState('idle');
                    playUiSound('click');
                  }}
                  className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 cursor-pointer"
                  title="Decline"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    changeState('idle');
                    playUiSound('success');
                  }}
                  className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 cursor-pointer"
                  title="Accept"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE: NOTIFICATION */}
          {state === 'notification' && (
            <motion.div
              key="notification"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Build Succeeded</div>
                  <div className="text-[11px] text-white/60">v2.7.0 deployed to GitHub Pages</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  changeState('idle');
                  playUiSound('click');
                }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Switcher Dock (Quick Controls) */}
      {enableDockControls && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 p-1 bg-zinc-950/80 border border-white/10 rounded-full backdrop-blur-xl shadow-lg"
        >
          {[
            { id: 'idle' as DynamicIslandState, icon: Sparkles, label: 'Idle' },
            { id: 'music' as DynamicIslandState, icon: Volume2, label: 'Music' },
            { id: 'timer' as DynamicIslandState, icon: Timer, label: 'Timer' },
            { id: 'call' as DynamicIslandState, icon: Phone, label: 'Call' },
            { id: 'notification' as DynamicIslandState, icon: Bell, label: 'Alert' },
          ].map((item) => {
            const Icon = item.icon;
            const active = state === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => changeState(item.id)}
                className={cn(
                  'px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer',
                  active
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                )}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="w-[1px] h-3 bg-white/20 mx-0.5" />

          <button
            type="button"
            onClick={() => {
              setIsMinimized(true);
              playUiSound('pop');
            }}
            className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Minimize Dynamic Island"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export const DynamicIslandHUD = DynamicIsland;
