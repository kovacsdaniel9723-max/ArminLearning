/**
 * 2. osztály – ének-zene tartalom
 */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface RhythmPattern {
  beats: ('tap' | 'rest')[];
  label: string;
}

export const RHYTHM_PATTERNS: RhythmPattern[] = [
  { beats: ['tap', 'tap', 'tap', 'tap'], label: 'egyenletes' },
  { beats: ['tap', 'rest', 'tap', 'rest'], label: 'váltakozó' },
  { beats: ['tap', 'tap', 'rest', 'tap'], label: 'kettős' },
  { beats: ['tap', 'rest', 'rest', 'tap'], label: 'lassú' },
];

export function pickRhythmPattern(): RhythmPattern {
  return RHYTHM_PATTERNS[Math.floor(Math.random() * RHYTHM_PATTERNS.length)];
}

export interface SoundPickTask {
  sound: string;
  emoji: string;
  options: { label: string; emoji: string }[];
  correct: number;
}

const SOUNDS: SoundPickTask[] = [
  {
    sound: 'dob',
    emoji: '🥁',
    options: [{ label: 'dob', emoji: '🥁' }, { label: 'hegedű', emoji: '🎻' }, { label: 'fuvola', emoji: '🪈' }],
    correct: 0,
  },
  {
    sound: 'macska',
    emoji: '🐱',
    options: [{ label: 'macska', emoji: '🐱' }, { label: 'kutya', emoji: '🐕' }, { label: 'tehén', emoji: '🐄' }],
    correct: 0,
  },
  {
    sound: 'madár',
    emoji: '🐦',
    options: [{ label: 'madár', emoji: '🐦' }, { label: 'hal', emoji: '🐟' }, { label: 'béka', emoji: '🐸' }],
    correct: 0,
  },
  {
    sound: 'zongora',
    emoji: '🎹',
    options: [{ label: 'zongora', emoji: '🎹' }, { label: 'gitár', emoji: '🎸' }, { label: 'trombita', emoji: '🎺' }],
    correct: 0,
  },
];

export function pickSoundTask(): SoundPickTask {
  const t = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
  return { ...t, options: shuffle(t.options) };
}

export interface DanceMove {
  moves: string[];
  emojis: string[];
}

export const DANCE_SEQUENCES: DanceMove[] = [
  { moves: ['emeld fel a kezed', 'forgass csípőt', 'tapsolj'], emojis: ['🙌', '💃', '👏'] },
  { moves: ['lépj jobbra', 'lépj balra', 'ugorj'], emojis: ['➡️', '⬅️', '⬆️'] },
  { moves: ['bólints', 'integets', 'pacsizd be magad'], emojis: ['🙂', '👋', '🤝'] },
];

export function pickDanceSequence(): DanceMove {
  return DANCE_SEQUENCES[Math.floor(Math.random() * DANCE_SEQUENCES.length)];
}

export { shuffle };
