// Doni UI — Procedural Micro-Sound Effects Engine (v0.6.0)
// Zero-byte runtime: Uses Web Audio API synthesis (0 MP3/WAV files, 0ms latency)

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Initialize sound preference from localStorage (safe for SSR)
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('doni_ui_sound_enabled');
  soundEnabled = saved === null ? true : saved === 'true';
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export type SoundEffectType = 'click' | 'pop' | 'chime' | 'switch' | 'tab' | 'success';

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('doni_ui_sound_enabled', String(enabled));
  }
}

export function toggleSound(): boolean {
  const next = !soundEnabled;
  setSoundEnabled(next);
  if (next) {
    playUiSound('chime');
  }
  return next;
}

/**
 * Play a synthetic micro-sound effect using procedural oscillators.
 */
export function playUiSound(type: SoundEffectType = 'click', volumeMultiplier = 1): void {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    switch (type) {
      case 'click': {
        // Ultra-crisp mechanical micro-click (500Hz -> 150Hz over 30ms)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';

        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

        gain.gain.setValueAtTime(0.09 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.035);
        break;
      }

      case 'pop': {
        // Soft bubbly UI pop for toggles and switches (260Hz -> 680Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';

        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.045);

        gain.gain.setValueAtTime(0.12 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'chime': {
        // Shimmering micro-bell chord for theme color swatch select
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.025);

          const startT = now + idx * 0.025;
          const endT = startT + 0.14;

          gain.gain.setValueAtTime(0.06 * volumeMultiplier, startT);
          gain.gain.exponentialRampToValueAtTime(0.0001, endT);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(startT);
          osc.stop(endT);
        });
        break;
      }

      case 'switch': {
        // Tactile snap for radio pills and slider ticks
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';

        osc.frequency.setValueAtTime(820, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.028);

        gain.gain.setValueAtTime(0.08 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.03);
        break;
      }

      case 'tab': {
        // Subtle soft tab selection blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';

        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(560, now + 0.04);

        gain.gain.setValueAtTime(0.07 * volumeMultiplier, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.045);
        break;
      }

      case 'success': {
        // Euphoric 2-tone success chime for copy code and actions
        [659.25, 880.00].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const startT = now + idx * 0.06;
          const endT = startT + 0.16;

          osc.frequency.setValueAtTime(freq, startT);
          gain.gain.setValueAtTime(0.1 * volumeMultiplier, startT);
          gain.gain.exponentialRampToValueAtTime(0.0001, endT);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(startT);
          osc.stop(endT);
        });
        break;
      }
    }
  } catch {
    // Graceful fallback if AudioContext is blocked by browser policy
  }
}

/**
 * Synthesize and play custom frequency tones on-demand with arbitrary waveforms.
 * Added in v1.5.0 for the Web Audio Frequency Synthesizer Studio.
 */
export function playCustomTone(
  waveform: OscillatorType = 'sine',
  freq = 440,
  durationMs = 150,
  volumeMultiplier = 1
): void {
  if (!soundEnabled || typeof window === 'undefined') return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const durSec = Math.max(0.03, durationMs / 1000);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = waveform;
    osc.frequency.setValueAtTime(Math.max(20, Math.min( freq, 12000 )), now);

    gain.gain.setValueAtTime(0.12 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durSec);
  } catch {
    // Graceful fallback
  }
}
