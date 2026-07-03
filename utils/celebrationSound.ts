/**
 * Ünnepi hangok – web AudioContext (megosztott kontextus, resume)
 */

import { isWeb } from './platform';

let sharedCtx: AudioContext | null = null;

async function getAudioContext(): Promise<AudioContext | null> {
  if (!isWeb || typeof window === 'undefined') return null;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    if (!sharedCtx) sharedCtx = new Ctx();
    if (sharedCtx.state === 'suspended') await sharedCtx.resume();
    return sharedCtx;
  } catch {
    return null;
  }
}

/** Első kattintásra érdemes meghívni (autoplay policy) */
export function primeCelebrationAudio(): void {
  void getAudioContext();
}

function playTone(
  ctx: AudioContext,
  freq: number,
  start: number,
  duration: number,
  volume = 0.12,
  type: OscillatorType = 'sine',
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration);
}

/** Szintlépés – rövid „rakéta” ascension + csillag csengés */
export function playLevelUpFanfare(): void {
  void (async () => {
    const ctx = await getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    playTone(ctx, 220, t, 0.15, 0.1, 'sawtooth');
    playTone(ctx, 330, t + 0.12, 0.15, 0.1, 'sawtooth');
    playTone(ctx, 440, t + 0.24, 0.2, 0.12, 'square');
    playTone(ctx, 554, t + 0.38, 0.25, 0.1, 'sine');
    playTone(ctx, 660, t + 0.5, 0.35, 0.14, 'sine');
    playTone(ctx, 880, t + 0.65, 0.5, 0.08, 'triangle');
  })();
}

/** Rakéta indítás – alacsony whoosh */
export function playRocketLaunch(): void {
  void (async () => {
    const ctx = await getAudioContext();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(280, t + 0.8);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.95);
  })();
}
