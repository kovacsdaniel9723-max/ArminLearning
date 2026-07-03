/**
 * Játék hangeffektek – web AudioContext
 */

import { isWeb } from './platform';
import { isSoundEnabledSync, primeSoundSettings } from './soundSettings';

let sharedCtx: AudioContext | null = null;

async function getCtx(): Promise<AudioContext | null> {
  if (!isWeb || typeof window === 'undefined' || !isSoundEnabledSync()) return null;
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

function tone(
  ctx: AudioContext,
  freq: number,
  start: number,
  dur: number,
  vol = 0.1,
  type: OscillatorType = 'sine',
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur);
}

export function primeGameAudio(): void {
  primeSoundSettings();
  void getCtx();
}

export function playClickSound(): void {
  void (async () => {
    const ctx = await getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    tone(ctx, 520, t, 0.06, 0.06, 'triangle');
  })();
}

export function playCorrectSound(): void {
  void (async () => {
    const ctx = await getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    tone(ctx, 523, t, 0.1, 0.1, 'sine');
    tone(ctx, 659, t + 0.1, 0.15, 0.1, 'sine');
  })();
}

export function playWrongSound(): void {
  void (async () => {
    const ctx = await getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    tone(ctx, 280, t, 0.2, 0.08, 'sine');
    tone(ctx, 220, t + 0.12, 0.25, 0.07, 'sine');
  })();
}

export function playStreakSound(): void {
  void (async () => {
    const ctx = await getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    tone(ctx, 440, t, 0.08, 0.09, 'square');
    tone(ctx, 554, t + 0.08, 0.08, 0.09, 'square');
    tone(ctx, 659, t + 0.16, 0.12, 0.1, 'square');
  })();
}

export function playTimerTickSound(): void {
  void (async () => {
    const ctx = await getCtx();
    if (!ctx) return;
    const t = ctx.currentTime;
    tone(ctx, 800, t, 0.05, 0.05, 'triangle');
  })();
}

export { playLevelUpFanfare, playRocketLaunch } from './celebrationSound';
