/**
 * Extra 2. osztályos játék tartalom – rím, pénz, szorzótábla
 */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface RhymeTask {
  word: string;
  options: string[];
  correct: number;
}

const RHYMES: RhymeTask[] = [
  { word: 'kutya', options: ['bugya', 'asztal', 'erdő'], correct: 0 },
  { word: 'ház', options: ['ráz', 'kék', 'fut'], correct: 0 },
  { word: 'toll', options: ['zokni', 'roll', 'kő'], correct: 1 },
  { word: 'virág', options: ['barát', 'ág', 'asztal'], correct: 1 },
  { word: 'iskola', options: ['bicikli', 'ola', 'kert'], correct: 1 },
  { word: 'macska', options: ['pacska', 'vonat', 'szék'], correct: 0 },
  { word: 'alma', options: ['palma', 'toll', 'kő'], correct: 0 },
  { word: 'kocsi', options: ['papír', 'roci', 'ház'], correct: 1 },
];

export function pickRhymeTask(): RhymeTask {
  const t = RHYMES[Math.floor(Math.random() * RHYMES.length)];
  const correctWord = t.options[t.correct];
  const options = shuffle(t.options);
  return { word: t.word, options, correct: options.indexOf(correctWord) };
}

export interface CoinTask {
  coins: { emoji: string; value: number }[];
  answer: number;
  options: number[];
  correct: number;
}

export function pickCoinTask(): CoinTask {
  const sets = [
    { coins: [{ emoji: '🪙', value: 10 }, { emoji: '🪙', value: 10 }, { emoji: '🪙', value: 5 }], answer: 25 },
    { coins: [{ emoji: '🪙', value: 20 }, { emoji: '🪙', value: 5 }], answer: 25 },
    { coins: [{ emoji: '🪙', value: 10 }, { emoji: '🪙', value: 10 }, { emoji: '🪙', value: 10 }], answer: 30 },
    { coins: [{ emoji: '🪙', value: 50 }, { emoji: '🪙', value: 10 }], answer: 60 },
    { coins: [{ emoji: '🪙', value: 5 }, { emoji: '🪙', value: 5 }, { emoji: '🪙', value: 5 }], answer: 15 },
  ];
  const set = sets[Math.floor(Math.random() * sets.length)];
  const opts = new Set<number>([set.answer]);
  while (opts.size < 4) opts.add(set.answer + (Math.floor(Math.random() * 5) - 2) * 5);
  const options = shuffle([...opts].filter((v) => v > 0).slice(0, 4));
  return { ...set, options, correct: options.indexOf(set.answer) };
}

export interface MultiplyDrillTask {
  a: number;
  b: number;
  answer: number;
  options: number[];
  correct: number;
}

const TABLES = [2, 5, 10];

export function pickMultiplyDrill(): MultiplyDrillTask {
  const a = TABLES[Math.floor(Math.random() * TABLES.length)];
  const b = 1 + Math.floor(Math.random() * 10);
  const answer = a * b;
  const opts = new Set<number>([answer]);
  while (opts.size < 4) {
    const delta = Math.floor(Math.random() * 7) - 3;
    const v = answer + delta;
    if (v > 0 && v !== answer) opts.add(v);
  }
  const options = shuffle([...opts]);
  return { a, b, answer, options, correct: options.indexOf(answer) };
}

export { shuffle };
