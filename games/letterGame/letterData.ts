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
  { id: "a", letter: "A" },
  { id: "á", letter: "Á" },
  { id: "b", letter: "B" },
  { id: "c", letter: "C" },
  { id: "d", letter: "D" },
  { id: "e", letter: "E" },
  { id: "é", letter: "É" },
  { id: "f", letter: "F" },
  { id: "g", letter: "G" },
  { id: "h", letter: "H" },
  { id: "i", letter: "I" },
  { id: "í", letter: "Í" },
  { id: "j", letter: "J" },
  { id: "k", letter: "K" },
  { id: "l", letter: "L" },
  { id: "m", letter: "M" },
  { id: "n", letter: "N" },
  { id: "o", letter: "O" },
  { id: "ó", letter: "Ó" },
  { id: "ö", letter: "Ö" },
  { id: "ő", letter: "Ő" },
  { id: "p", letter: "P" },
  { id: "r", letter: "R" },
  { id: "s", letter: "S" },
  { id: "t", letter: "T" },
  { id: "u", letter: "U" },
  { id: "ú", letter: "Ú" },
  { id: "ü", letter: "Ü" },
  { id: "ű", letter: "Ű" },
  { id: "v", letter: "V" },
  { id: "z", letter: "Z" },
];

// Régi kompatibilitás - LetterQuestion interface
import { LetterQuestion } from '../../types';

export const letterQuestions: LetterQuestion[] = [
  {
    letter: 'A',
    options: [
      { word: 'Alma', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Ház', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'Á',
    options: [
      { word: 'Ágy', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'B',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Bicikli', image: undefined },
      { word: 'Fa', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'C',
    options: [
      { word: 'Cica', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Kutya', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'D',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Daru', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'E',
    options: [
      { word: 'Erdő', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Ház', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'É',
    options: [
      { word: 'Ének', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'F',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Fa', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'G',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Gép', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'H',
    options: [
      { word: 'Ház', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'I',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Ima', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'Í',
    options: [
      { word: 'Ír', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'J',
    options: [
      { word: 'Játék', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'K',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Ház', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'L',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Ló', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'M',
    options: [
      { word: 'Macska', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'N',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Nap', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'O',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Óra', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'Ó',
    options: [
      { word: 'Óra', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'Ö',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Ökör', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'Ő',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Őz', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'P',
    options: [
      { word: 'Pillangó', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'R',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Rák', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'S',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Szó', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'T',
    options: [
      { word: 'Toll', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 0,
  },
  {
    letter: 'U',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Ujj', image: undefined },
      { word: 'Alma', image: undefined },
    ],
    correctIndex: 1,
  },
  {
    letter: 'Ú',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Út', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'Ü',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Üveg', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'Ű',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Űr', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'V',
    options: [
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
      { word: 'Víz', image: undefined },
    ],
    correctIndex: 2,
  },
  {
    letter: 'Z',
    options: [
      { word: 'Zebra', image: undefined },
      { word: 'Kutya', image: undefined },
      { word: 'Alma', image: undefined },
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
