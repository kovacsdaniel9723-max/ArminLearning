/**
 * Hangman (Építsük meg a robotot!) játék logika
 */

import type { HangmanState } from './types';
import { getRandomHangmanWord } from './HangmanWordData';

const MAX_WRONG_GUESSES = 12;

const MAGYAR_BETUK = [
  'A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L',
  'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z',
];

function hasEkezet(c: string): boolean {
  return 'ÁÉÍÓÖŐÚÜŰ'.includes(c);
}

function nehezseg(c: string): number {
  return hasEkezet(c) ? 1 : 0;
}

/**
 * Csak a szó betűi + 4–6 véletlen, hasonló nehézségű betű
 */
export function generateLetterOptions(word: string): string[] {
  const upper = word.toUpperCase();
  const wordSet = new Set(upper.split(''));
  const wordLetters = [...wordSet];
  const wordNehezseg = wordLetters.reduce((s, c) => s + nehezseg(c), 0) / Math.max(1, wordLetters.length);
  const hasonlo = MAGYAR_BETUK.filter(
    (c) => !wordSet.has(c) && Math.abs(nehezseg(c) - wordNehezseg) <= 1
  );
  const extra = 4 + Math.floor(Math.random() * 3);
  const shuffled = [...hasonlo].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, extra);
  const opts = [...wordLetters, ...picked].sort(() => Math.random() - 0.5);
  return opts;
}

export const startNewGame = (): HangmanState => ({
  word: getRandomHangmanWord(),
  guessedLetters: [],
  wrongGuesses: 0,
  maxWrong: MAX_WRONG_GUESSES,
});

export const guessLetter = (
  state: HangmanState,
  letter: string
): HangmanState => {
  const upper = letter.toUpperCase();
  const inWord = state.word.includes(upper);

  if (inWord) {
    if (state.guessedLetters.includes(upper)) return state;
    return {
      ...state,
      guessedLetters: [...state.guessedLetters, upper],
    };
  }

  return {
    ...state,
    wrongGuesses: Math.min(state.wrongGuesses + 1, state.maxWrong),
  };
};

export const isWin = (state: HangmanState): boolean => {
  const unique = [...new Set(state.word.split(''))];
  return unique.every((c) => state.guessedLetters.includes(c));
};

export const isGameOver = (state: HangmanState): boolean =>
  state.wrongGuesses >= state.maxWrong;

/**
 * Segítség 2: első betű felfedése
 */
export const revealFirstLetter = (state: HangmanState): HangmanState => {
  if (state.hintRevealedFirst) return state;
  const first = state.word[0];
  if (state.guessedLetters.includes(first)) return state;
  return {
    ...state,
    guessedLetters: [...state.guessedLetters, first],
    hintRevealedFirst: true,
  };
};

/**
 * Segítség 3: egy véletlen még rejtett betű felfedése
 */
export const revealRandomLetter = (state: HangmanState): HangmanState => {
  const missing = state.word
    .split('')
    .filter((c) => !state.guessedLetters.includes(c));
  if (missing.length === 0) return state;
  const pick = missing[Math.floor(Math.random() * missing.length)];
  const revealed = state.hintRevealedRandom ?? [];
  if (revealed.includes(pick)) return state;
  return {
    ...state,
    guessedLetters: [...state.guessedLetters, pick],
    hintRevealedRandom: [...revealed, pick],
  };
};

export const getDisplayWord = (state: HangmanState): string =>
  state.word
    .split('')
    .map((c) => (state.guessedLetters.includes(c) ? c : '_'))
    .join(' ');

export const MAX_WRONG = MAX_WRONG_GUESSES;
