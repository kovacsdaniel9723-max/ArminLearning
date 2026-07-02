/**
 * 2. osztály – hiányzó betű (hosszabb szavak)
 */

import { MissingLetterQuestion } from '../../types';

export const MISSING_LETTER_GRADE2: MissingLetterQuestion[] = [
  { word: 'iskola', missingIndex: 2, options: ['k', 'g', 't'], correctIndex: 0 },
  { word: 'tanuló', missingIndex: 1, options: ['a', 'e', 'o'], correctIndex: 0 },
  { word: 'macska', missingIndex: 3, options: ['s', 'z', 'c'], correctIndex: 0 },
  { word: 'virág', missingIndex: 2, options: ['r', 'l', 'n'], correctIndex: 0 },
  { word: 'könyv', missingIndex: 1, options: ['ö', 'o', 'ü'], correctIndex: 0 },
  { word: 'ceruza', missingIndex: 2, options: ['r', 'l', 'n'], correctIndex: 0 },
  { word: 'repülő', missingIndex: 2, options: ['p', 'b', 'f'], correctIndex: 0 },
  { word: 'csillag', missingIndex: 2, options: ['i', 'e', 'a'], correctIndex: 0 },
  { word: 'barát', missingIndex: 2, options: ['r', 'l', 'n'], correctIndex: 0 },
  { word: 'játék', missingIndex: 1, options: ['á', 'a', 'e'], correctIndex: 0 },
  { word: 'sütemény', missingIndex: 3, options: ['e', 'a', 'i'], correctIndex: 0 },
  { word: 'gyümölcs', missingIndex: 2, options: ['ü', 'u', 'ű'], correctIndex: 0 },
  { word: 'vonat', missingIndex: 1, options: ['o', 'a', 'e'], correctIndex: 0 },
  { word: 'kertész', missingIndex: 3, options: ['t', 'd', 'b'], correctIndex: 0 },
  { word: 'hétvége', missingIndex: 4, options: ['g', 'k', 't'], correctIndex: 0 },
];

export function getRandomMissingLetterGrade2(): MissingLetterQuestion {
  const i = Math.floor(Math.random() * MISSING_LETTER_GRADE2.length);
  return MISSING_LETTER_GRADE2[i];
}
