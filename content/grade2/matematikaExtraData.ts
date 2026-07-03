/**
 * 2. osztály – matematika extra tartalom
 */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface NumberLineTask {
  table: 2 | 5 | 10;
  jumps: number;
  start: number;
  answer: number;
}

export function pickNumberLineTask(): NumberLineTask {
  const tables = [2, 5, 10] as const;
  const table = tables[Math.floor(Math.random() * tables.length)];
  const jumps = 1 + Math.floor(Math.random() * 5);
  const start = table * (1 + Math.floor(Math.random() * 3));
  return { table, jumps, start, answer: start + table * jumps };
}

export interface SharingTask {
  total: number;
  groups: number;
  perGroup: number;
}

export function pickSharingTask(): SharingTask {
  const groups = 2 + Math.floor(Math.random() * 3);
  const perGroup = 2 + Math.floor(Math.random() * 4);
  return { total: groups * perGroup, groups, perGroup };
}

export interface ShoppingTask {
  item: string;
  emoji: string;
  price: number;
  paid: number;
  change: number;
}

const SHOP_ITEMS: Omit<ShoppingTask, 'paid' | 'change'>[] = [
  { item: 'alma', emoji: '🍎', price: 15 },
  { item: 'kenyér', emoji: '🍞', price: 25 },
  { item: 'tej', emoji: '🥛', price: 30 },
  { item: 'ceruza', emoji: '✏️', price: 10 },
  { item: 'füzet', emoji: '📓', price: 40 },
];

export function pickShoppingTask(): ShoppingTask {
  const base = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
  const paidOptions = [base.price + 5, base.price + 10, base.price + 20].filter((p) => p > base.price);
  const paid = paidOptions[Math.floor(Math.random() * paidOptions.length)];
  return { ...base, paid, change: paid - base.price };
}

export interface ClockTask {
  hours: number;
  minutes: 0 | 15 | 30 | 45;
  question: 'read' | 'set';
}

export function pickClockTask(): ClockTask {
  const hours = 1 + Math.floor(Math.random() * 12);
  const minutesList = [0, 15, 30, 45] as const;
  const minutes = minutesList[Math.floor(Math.random() * minutesList.length)];
  return { hours, minutes, question: Math.random() > 0.5 ? 'read' : 'set' };
}

export function formatClock(h: number, m: number): string {
  return `${h}:${m.toString().padStart(2, '0')}`;
}

export interface WordProblemTask {
  text: string;
  a: number;
  b: number;
  op: 'add' | 'subtract';
  answer: number;
  icons: string;
}

const WORD_PROBLEMS: WordProblemTask[] = [
  { text: '3 madár ült a fán. jött még 2. hány madár van most?', a: 3, b: 2, op: 'add', answer: 5, icons: '🐦' },
  { text: '8 alma volt a tányéron. megettem 3-at. hány maradt?', a: 8, b: 3, op: 'subtract', answer: 5, icons: '🍎' },
  { text: '4 gyerek játszott. jött még 4 barát. hányan vannak?', a: 4, b: 4, op: 'add', answer: 8, icons: '👧' },
  { text: '10 toll volt a tolltartóban. 6 elveszett. hány maradt?', a: 10, b: 6, op: 'subtract', answer: 4, icons: '✏️' },
];

export function pickWordProblem(): WordProblemTask {
  return WORD_PROBLEMS[Math.floor(Math.random() * WORD_PROBLEMS.length)];
}

export interface ShapeHuntTask {
  target: string;
  targetEmoji: string;
  scene: { emoji: string; shape: string }[];
  correctIndex: number;
}

const SHAPES = [
  { name: 'négyzet', emoji: '🟥' },
  { name: 'téglalap', emoji: '🟦' },
  { name: 'háromszög', emoji: '🔺' },
  { name: 'kör', emoji: '⚪' },
];

export function pickShapeHunt(): ShapeHuntTask {
  const target = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const decoys = shuffle(SHAPES.filter((s) => s.name !== target.name)).slice(0, 3);
  const scene = shuffle([
    { emoji: target.emoji, shape: target.name },
    ...decoys.map((d) => ({ emoji: d.emoji, shape: d.name })),
  ]);
  return {
    target: target.name,
    targetEmoji: target.emoji,
    scene,
    correctIndex: scene.findIndex((s) => s.shape === target.name),
  };
}

export interface MeasureTask {
  object: string;
  emoji: string;
  lengthCm: number;
  options: number[];
  correct: number;
}

export function pickMeasureTask(): MeasureTask {
  const lengths = [5, 8, 10, 12, 15, 20];
  const lengthCm = lengths[Math.floor(Math.random() * lengths.length)];
  const objects = [
    { object: 'ceruza', emoji: '✏️' },
    { object: 'olló', emoji: '✂️' },
    { object: 'füzet', emoji: '📓' },
  ];
  const obj = objects[Math.floor(Math.random() * objects.length)];
  const opts = new Set<number>([lengthCm]);
  while (opts.size < 4) {
    const v = lengths[Math.floor(Math.random() * lengths.length)];
    if (v !== lengthCm) opts.add(v);
  }
  return {
    ...obj,
    lengthCm,
    options: shuffle([...opts]),
    correct: lengthCm,
  };
}

export { shuffle };
