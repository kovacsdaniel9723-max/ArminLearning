/**
 * Hangman szólista – 3–6 betű, magyar egyszerű szavak
 */

export const HANGMAN_WORDS = [
  'NAP',
  'HÓ',
  'LÓ',
  'HAL',
  'ALMA',
  'BÉKA',
  'CICA',
  'KÉZ',
  'HÁZ',
  'LABDA',
  'KUTYA',
  'MEDVE',
  'MACSKA',
  'ZEBRA',
  'ANGYAL',
  'PÁRNA',
  'TÁNYÉR',
  'ZSÁK',
  'BABA',
  'AUTO',
  'TEJ',
  'KENYÉR',
  'CIPŐ',
  'TELEFON',
  'DOB',
  'VILLA',
  'TŰZ',
  'KERT',
  'KÖNYV',
  'CSILLAG',
  'NAP',
  'FAL',
  'AJTÓ',
  'ABLAK',
  'ASZTAL',
  'SZÉK',
  'ÁGY',
  'LÁMPA',
  'TV',
  'RÁDIÓ',
];

export const getRandomHangmanWord = (): string => {
  const i = Math.floor(Math.random() * HANGMAN_WORDS.length);
  return HANGMAN_WORDS[i].toUpperCase();
};
