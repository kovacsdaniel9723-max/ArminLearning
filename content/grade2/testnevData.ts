/**
 * 2. osztály – testnevelés / mozgásos szünet tartalom
 */

export interface MovementChallenge {
  id: string;
  text: string;
  seconds: number;
  emoji: string;
}

export const MOVEMENT_CHALLENGES: MovementChallenge[] = [
  { id: 'jump10', text: 'ugorj 10-et!', seconds: 15, emoji: '🦘' },
  { id: 'spin3', text: 'pörögj körbe 3-szor!', seconds: 12, emoji: '🌀' },
  { id: 'oneleg', text: 'állj félláb 5 másodpercig!', seconds: 8, emoji: '🦩' },
  { id: 'clap20', text: 'tapsolj 20-szor!', seconds: 15, emoji: '👏' },
  { id: 'stretch', text: 'nyújtózz fel magasra!', seconds: 10, emoji: '🙆' },
  { id: 'march', text: 'menetelj a helyeden 10 lépést!', seconds: 12, emoji: '🚶' },
  { id: 'squat5', text: 'guggolj le 5-ször!', seconds: 15, emoji: '🏋️' },
  { id: 'wave', text: 'integetj mindkét kezeddel!', seconds: 8, emoji: '👋' },
];

export const COORDINATION_PATTERNS: { id: string; steps: string[]; emoji: string[] }[] = [
  { id: 'p1', steps: ['emeld fel a jobb kezed', 'emeld fel a bal kezed', 'tapsolj'], emoji: ['👉', '👈', '👏'] },
  { id: 'p2', steps: ['érintsd meg a fejed', 'érintsd meg a térded', 'fordulj meg'], emoji: ['🙂', '🦵', '🔄'] },
  { id: 'p3', steps: ['lépj előre', 'lépj hátra', 'ugorj'], emoji: ['⬆️', '⬇️', '⬆️'] },
  { id: 'p4', steps: ['mutass felfelé', 'mutass lefelé', 'pacsizd be magad'], emoji: ['☝️', '👇', '🤝'] },
];

export function pickMovementChallenge(): MovementChallenge {
  return MOVEMENT_CHALLENGES[Math.floor(Math.random() * MOVEMENT_CHALLENGES.length)];
}

export function pickCoordinationPattern() {
  return COORDINATION_PATTERNS[Math.floor(Math.random() * COORDINATION_PATTERNS.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickCoordinationPatternShuffled() {
  const p = pickCoordinationPattern();
  return { ...p, steps: shuffle(p.steps), emoji: shuffle(p.emoji) };
}
