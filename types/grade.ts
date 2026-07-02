/**
 * Osztályszint – 1. osztály (meglévő) és 2. osztály (új tartalom)
 */

export type GradeLevel = 1 | 2;

export const GRADE_LABELS: Record<GradeLevel, string> = {
  1: '1. osztály',
  2: '2. osztály',
};
