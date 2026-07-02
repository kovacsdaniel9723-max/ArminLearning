/**
 * Hangman szólista – 3–6 betű, magyar egyszerű szavak
 */

import { getCurrentGrade } from '../../utils/gradeState';
import { HANGMAN_WORDS_GRADE2 } from '../../content/grade2/hangmanWords';

export const HANGMAN_WORDS = [
  'nap',
  'hó',
  'ló',
  'hal',
  'alma',
  'béka',
  'cica',
  'kéz',
  'ház',
  'labda',
  'kutya',
  'medve',
  'macska',
  'zebra',
  'angyal',
  'párna',
  'tányér',
  'zsák',
  'baba',
  'autó',
  'tej',
  'kenyér',
  'cipő',
  'telefon',
  'dob',
  'villa',
  'tűz',
  'kert',
  'könyv',
  'csillag',
  'nap',
  'fal',
  'ajtó',
  'ablak',
  'asztal',
  'szék',
  'ágy',
  'lámpa',
  'tv',
  'rádió',
];

const GRADE2_HANGMAN = HANGMAN_WORDS_GRADE2.filter((w) => w.length >= 4 && w.length <= 10);

export const getRandomHangmanWord = (): string => {
  const list = getCurrentGrade() === 2 ? GRADE2_HANGMAN : HANGMAN_WORDS;
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};
