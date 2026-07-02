/**
 * Betűfelismerő játék adatok
 * Magyar ABC - 44 betű, ékezetekkel
 * Könnyen bővíthető struktúra
 */

export type LetterItem = {
  id: string;
  letter: string;
  image?: any;
  sound?: any;
};

export const LETTERS: LetterItem[] = [
  { id: "a", letter: "a" },
  { id: "á", letter: "á" },
  { id: "b", letter: "b" },
  { id: "c", letter: "c" },
  { id: "d", letter: "d" },
  { id: "e", letter: "e" },
  { id: "é", letter: "é" },
  { id: "f", letter: "f" },
  { id: "g", letter: "g" },
  { id: "h", letter: "h" },
  { id: "i", letter: "i" },
  { id: "í", letter: "í" },
  { id: "j", letter: "j" },
  { id: "k", letter: "k" },
  { id: "l", letter: "l" },
  { id: "m", letter: "m" },
  { id: "n", letter: "n" },
  { id: "o", letter: "o" },
  { id: "ó", letter: "ó" },
  { id: "ö", letter: "ö" },
  { id: "ő", letter: "ő" },
  { id: "p", letter: "p" },
  { id: "r", letter: "r" },
  { id: "s", letter: "s" },
  { id: "t", letter: "t" },
  { id: "u", letter: "u" },
  { id: "ú", letter: "ú" },
  { id: "ü", letter: "ü" },
  { id: "ű", letter: "ű" },
  { id: "v", letter: "v" },
  { id: "z", letter: "z" },
];

// Régi kompatibilitás - LetterQuestion interface
import { LetterQuestion } from '../../types';

export const letterQuestions: LetterQuestion[] = [
  {
    letter: 'a',
    options: [
      { word: 'alma', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'ház', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'á',
    options: [
      { word: 'ágy', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'b',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'bicikli', image: undefined },
      { word: 'fa', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'c',
    options: [
      { word: 'cica', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'kutya', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'd',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'daru', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'e',
    options: [
      { word: 'erdő', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'ház', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'é',
    options: [
      { word: 'ének', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'f',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'fa', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'g',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'gép', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'h',
    options: [
      { word: 'ház', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'i',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'ima', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'í',
    options: [
      { word: 'ír', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'j',
    options: [
      { word: 'játék', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'k',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'ház', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'l',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'ló', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'm',
    options: [
      { word: 'macska', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'n',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'nap', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'o',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'óra', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'ó',
    options: [
      { word: 'óra', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'ö',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'ökör', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'ő',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'őz', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'p',
    options: [
      { word: 'pillangó', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'r',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'rák', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 's',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'szó', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 't',
    options: [
      { word: 'toll', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'u',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'ujj', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'ú',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'út', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'ü',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'üveg', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'ű',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'űr', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'v',
    options: [
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
      { word: 'víz', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'z',
    options: [
      { word: 'zebra', image: undefined },
      { word: 'kutya', image: undefined },
      { word: 'alma', image: undefined },
    ],
    correctIndex: 0,
  },
];

/**
 * Véletlenszerű kérdés kiválasztása
 */
export const getRandomLetterQuestion = (): LetterQuestion => {
  const randomIndex = Math.floor(Math.random() * letterQuestions.length);
  return letterQuestions[randomIndex];
};

/**
 * Véletlenszerű kérdések kiválasztása (ismétlődés nélkül)
 */
export const getRandomLetterQuestions = (count: number): LetterQuestion[] => {
  const shuffled = [...letterQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, letterQuestions.length));
};
