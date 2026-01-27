/**
 * Szövegalapú játékok adatai
 * Könnyen bővíthető struktúra
 * 
 * Használja a wordData.ts-ből a WORDS listát
 */

import {
  WordPictureQuestion,
  MissingLetterQuestion,
  FirstLetterQuestion,
} from '../../types';
import { WORDS } from './wordData';

// Szó-kép párosítás: WORDS listából generáljuk
// Jelenleg emoji-kat használunk, később valódi képekkel lesznek helyettesítve
export const wordPictureQuestions: WordPictureQuestion[] = [
  {
    image: '🍎',
    words: ['ALMA', 'KUTYA', 'HÁZ'],
    correctIndex: 0,
  },
  {
    image: '🐱',
    words: ['MACSKA', 'KUTYA', 'LÓ'],
    correctIndex: 0,
  },
  {
    image: '🐶',
    words: ['MACSKA', 'KUTYA', 'LÓ'],
    correctIndex: 1,
  },
  {
    image: '🐴',
    words: ['MACSKA', 'KUTYA', 'LÓ'],
    correctIndex: 2,
  },
  {
    image: '🏠',
    words: ['HÁZ', 'AUTÓ', 'FA'],
    correctIndex: 0,
  },
  {
    image: '🐸',
    words: ['BÉKA', 'CICA', 'KUTYA'],
    correctIndex: 0,
  },
  {
    image: '🦋',
    words: ['PILLANGÓ', 'BOGÁR', 'CSIGA'],
    correctIndex: 0,
  },
  {
    image: '🐻',
    words: ['MEDVE', 'FARKAS', 'NYÚL'],
    correctIndex: 0,
  },
  {
    image: '🐰',
    words: ['MEDVE', 'FARKAS', 'NYÚL'],
    correctIndex: 2,
  },
  {
    image: '🦀',
    words: ['RÁK', 'HAL', 'CSIGA'],
    correctIndex: 0,
  },
  {
    image: '🐟',
    words: ['RÁK', 'HAL', 'CSIGA'],
    correctIndex: 1,
  },
  {
    image: '🦌',
    words: ['ŐZ', 'ÖKÖR', 'LÓ'],
    correctIndex: 0,
  },
  {
    image: '🚲',
    words: ['BICIKLI', 'AUTÓ', 'LÓ'],
    correctIndex: 0,
  },
  {
    image: '⚽',
    words: ['LABDA', 'GOLYÓ', 'KULCS'],
    correctIndex: 0,
  },
  {
    image: '🕐',
    words: ['ÓRA', 'TOLL', 'KULCS'],
    correctIndex: 0,
  },
  {
    image: '🕯️',
    words: ['GYERTYA', 'LÁMPA', 'FÉNY'],
    correctIndex: 0,
  },
  {
    image: '🏳️',
    words: ['ZÁSZLÓ', 'KÉP', 'TÁNYÉR'],
    correctIndex: 0,
  },
  {
    image: '🦓',
    words: ['ZEBRA', 'LÓ', 'ÖKÖR'],
    correctIndex: 0,
  },
];

// Hiányzó betű minták - a word_assets_summary.txt alapján
export const missingLetterQuestions: MissingLetterQuestion[] = [
  {
    word: 'B_A',
    missingIndex: 1,
    options: ['B', 'É', 'K'],
    correctIndex: 1, // BÉKA
  },
  {
    word: 'C_C_A',
    missingIndex: 1,
    options: ['C', 'I', 'A'],
    correctIndex: 1, // CICA
  },
  {
    word: 'A_L_A',
    missingIndex: 1,
    options: ['A', 'L', 'M'],
    correctIndex: 1, // ALMA
  },
  {
    word: 'M_C_S_A',
    missingIndex: 1,
    options: ['M', 'A', 'C'],
    correctIndex: 1, // MACSKA
  },
  {
    word: 'P_L_L_A',
    missingIndex: 1,
    options: ['P', 'I', 'L'],
    correctIndex: 1, // PILLANGÓ
  },
  {
    word: 'K_T_Y_A',
    missingIndex: 1,
    options: ['K', 'U', 'T'],
    correctIndex: 1, // KUTYA
  },
  {
    word: 'H_L',
    missingIndex: 1,
    options: ['H', 'A', 'L'],
    correctIndex: 1, // HAL
  },
  {
    word: 'H_Z',
    missingIndex: 1,
    options: ['H', 'Á', 'Z'],
    correctIndex: 1, // HÁZ
  },
  {
    word: 'L_B_D_A',
    missingIndex: 1,
    options: ['L', 'A', 'B'],
    correctIndex: 1, // LABDA
  },
  {
    word: 'M_D_V_E',
    missingIndex: 1,
    options: ['M', 'E', 'D'],
    correctIndex: 1, // MEDVE
  },
  {
    word: 'T_L',
    missingIndex: 1,
    options: ['T', 'O', 'L'],
    correctIndex: 1, // TOLL
  },
  {
    word: 'T_NY_R',
    missingIndex: 1,
    options: ['T', 'Á', 'N'],
    correctIndex: 1, // TÁNYÉR
  },
  {
    word: 'S_Z',
    missingIndex: 1,
    options: ['S', 'Z', 'Ó'],
    correctIndex: 1, // SZÓ
  },
  {
    word: 'S_Z_N',
    missingIndex: 1,
    options: ['S', 'Z', 'Í'],
    correctIndex: 1, // SZÍN
  },
  {
    word: 'S_Z_L',
    missingIndex: 1,
    options: ['S', 'Z', 'É'],
    correctIndex: 1, // SZÉL
  },
  {
    word: 'Z_S',
    missingIndex: 1,
    options: ['Z', 'Á', 'S'],
    correctIndex: 1, // ZÁSZLÓ
  },
  {
    word: 'Z_E_B_R_A',
    missingIndex: 1,
    options: ['Z', 'E', 'B'],
    correctIndex: 1, // ZEBRA
  },
  {
    word: 'G_Y_R_T_Y_A',
    missingIndex: 1,
    options: ['G', 'Y', 'E'],
    correctIndex: 1, // GYERTYA
  },
  {
    word: 'F_A_K',
    missingIndex: 1,
    options: ['F', 'A', 'K'],
    correctIndex: 1, // FAKÓ
  },
  {
    word: 'F_R_K',
    missingIndex: 1,
    options: ['F', 'A', 'R'],
    correctIndex: 1, // FARKAS
  },
];

// Első betű felismerés: WORDS listából generáljuk
// Jelenleg emoji-kat használunk, később valódi képekkel lesznek helyettesítve
export const firstLetterQuestions: FirstLetterQuestion[] = WORDS.slice(0, 30).map((wordItem, index) => {
  // Választunk 2 másik betűt, ami nem az első betű
  const allLetters = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z'];
  const wrongOptions = allLetters
    .filter(letter => letter !== wordItem.firstLetter)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  
  const options = [wordItem.firstLetter, ...wrongOptions].sort(() => Math.random() - 0.5);
  const correctIndex = options.indexOf(wordItem.firstLetter);
  
  return {
    image: '📷', // Placeholder - később valódi kép
    word: wordItem.word,
    options: options,
    correctIndex: correctIndex,
  };
});

/**
 * Véletlenszerű kérdések
 */
export const getRandomWordPictureQuestion = (): WordPictureQuestion => {
  const randomIndex = Math.floor(Math.random() * wordPictureQuestions.length);
  return wordPictureQuestions[randomIndex];
};

export const getRandomMissingLetterQuestion = (): MissingLetterQuestion => {
  const randomIndex = Math.floor(Math.random() * missingLetterQuestions.length);
  return missingLetterQuestions[randomIndex];
};

export const getRandomFirstLetterQuestion = (): FirstLetterQuestion => {
  const randomIndex = Math.floor(Math.random() * firstLetterQuestions.length);
  return firstLetterQuestions[randomIndex];
};
