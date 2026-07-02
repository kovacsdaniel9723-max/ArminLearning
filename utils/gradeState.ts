/**
 * Aktuális osztályszint – memóriában (játékok, stats, jutalom)
 */

import type { GradeLevel } from '../types/grade';

let currentGrade: GradeLevel = 1;

export function setCurrentGrade(grade: GradeLevel): void {
  currentGrade = grade;
}

export function getCurrentGrade(): GradeLevel {
  return currentGrade;
}
