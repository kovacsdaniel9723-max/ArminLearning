/**
 * 2. osztály – sorozat / minta feladatok
 */

export interface PatternTask {
  sequence: (string | number)[];
  options: (string | number)[];
  correctIndex: number;
}

export const PATTERN_TASKS: PatternTask[] = [
  { sequence: [2, 4, 6, 8], options: [9, 10, 12], correctIndex: 1 },
  { sequence: [5, 10, 15, 20], options: [22, 25, 30], correctIndex: 1 },
  { sequence: [1, 3, 5, 7], options: [8, 9, 10], correctIndex: 1 },
  { sequence: [10, 20, 30, 40], options: [45, 50, 55], correctIndex: 1 },
  { sequence: ['🔴', '🔵', '🔴', '🔵'], options: ['🟢', '🔴', '🟡'], correctIndex: 1 },
  { sequence: ['⭐', '⭐', '🌙', '⭐', '⭐'], options: ['🌙', '☀️', '⭐'], correctIndex: 2 },
  { sequence: [3, 6, 9, 12], options: [14, 15, 16], correctIndex: 1 },
  { sequence: [20, 18, 16, 14], options: [13, 12, 11], correctIndex: 1 },
  { sequence: [12, 14, 16, 18], options: [19, 20, 21], correctIndex: 1 },
  { sequence: ['🍎', '🍎', '🍐', '🍎', '🍎'], options: ['🍐', '🍊', '🍎'], correctIndex: 2 },
  { sequence: [25, 50, 75, 100], options: [110, 125, 150], correctIndex: 1 },
  { sequence: [11, 22, 33, 44], options: [54, 55, 56], correctIndex: 1 },
  { sequence: ['▲', '■', '▲', '■'], options: ['●', '▲', '◆'], correctIndex: 1 },
  { sequence: [7, 14, 21, 28], options: [32, 35, 36], correctIndex: 1 },
  { sequence: [30, 27, 24, 21], options: [19, 18, 17], correctIndex: 1 },
];

export function getRandomPatternTask(): PatternTask {
  const i = Math.floor(Math.random() * PATTERN_TASKS.length);
  return PATTERN_TASKS[i];
}
