/**
 * Alkotó szoba – rajzolási feladatok
 */

export interface DrawingTask {
  id: string;
  prompt: string;
  emoji: string;
  /** Minimum ecsetvonás a „kész” gombhoz */
  minStrokes: number;
}

export const DRAWING_TASKS: DrawingTask[] = [
  { id: 'csalad', prompt: 'rajzold le a családodat!', emoji: '👨‍👩‍👧', minStrokes: 10 },
  { id: 'erdo', prompt: 'rajzolj egy erdőt!', emoji: '🌲', minStrokes: 8 },
  { id: 'haz', prompt: 'rajzolj egy házat!', emoji: '🏠', minStrokes: 8 },
  { id: 'medence', prompt: 'rajzolj egy medencét!', emoji: '🏊', minStrokes: 8 },
  { id: 'dinnye', prompt: 'rajzolj egy dinnyét!', emoji: '🍉', minStrokes: 6 },
  { id: 'nap', prompt: 'rajzolj egy napot az égen!', emoji: '☀️', minStrokes: 6 },
  { id: 'virag', prompt: 'rajzolj egy virágot!', emoji: '🌸', minStrokes: 6 },
  { id: 'auto', prompt: 'rajzolj egy autót!', emoji: '🚗', minStrokes: 8 },
  { id: 'kutya', prompt: 'rajzolj egy kutyát!', emoji: '🐕', minStrokes: 8 },
  { id: 'arc', prompt: 'rajzolj egy boldog arcot!', emoji: '😊', minStrokes: 8 },
  { id: 'hegy', prompt: 'rajzolj hegyeket!', emoji: '⛰️', minStrokes: 6 },
  { id: 'hajó', prompt: 'rajzolj egy hajót a tengeren!', emoji: '⛵', minStrokes: 8 },
];

export function pickDrawingTask(excludeId?: string): DrawingTask {
  const pool = excludeId ? DRAWING_TASKS.filter((t) => t.id !== excludeId) : DRAWING_TASKS;
  return pool[Math.floor(Math.random() * pool.length)];
}
