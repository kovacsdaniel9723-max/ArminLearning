/**
 * Kevert válaszopciók – csak új körnél generálódnak újra (nem minden tick-nél)
 */

import { useMemo } from 'react';

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useRoundOptions<T>(
  roundKey: unknown,
  build: () => { options: T[]; correctIdx: number }
): { options: T[]; correctIdx: number } {
  return useMemo(build, [roundKey]);
}

/** Egyedi numerikus válaszopciók (min. count darab, helyes érték benne) */
export function buildUniqueNumberOptions(
  correct: number,
  count = 4,
  candidates: number[] = [],
): { options: number[]; correctIdx: number } {
  const opts = new Set<number>([correct]);
  for (const v of candidates) {
    if (v > 0 && v !== correct) opts.add(v);
    if (opts.size >= count) break;
  }
  let delta = 1;
  while (opts.size < count && delta < 50) {
    if (correct + delta > 0) opts.add(correct + delta);
    if (opts.size < count && correct - delta > 0) opts.add(correct - delta);
    delta++;
  }
  const options = shuffleArray([...opts].slice(0, count));
  return { options, correctIdx: options.indexOf(correct) };
}
