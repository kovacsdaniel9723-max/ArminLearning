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
