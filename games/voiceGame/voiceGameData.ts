/**
 * Hangjáték adatok
 * Betűk és szavak hangjátékhoz
 */

export type VoiceItem = {
  id: string;
  letter: string;
  prompt: string;
  sound?: any;
};

// Betűk hangjátékhoz (kisbetű, 1. osztály)
export const VOICE_LETTERS: VoiceItem[] = [
  { id: "a", letter: "a", prompt: "Mondd ki az a betűt!" },
  { id: "á", letter: "á", prompt: "Mondd ki az á betűt!" },
  { id: "b", letter: "b", prompt: "Mondd ki a b betűt!" },
  { id: "c", letter: "c", prompt: "Mondd ki a c betűt!" },
  { id: "d", letter: "d", prompt: "Mondd ki a d betűt!" },
  { id: "e", letter: "e", prompt: "Mondd ki az e betűt!" },
  { id: "é", letter: "é", prompt: "Mondd ki az é betűt!" },
  { id: "f", letter: "f", prompt: "Mondd ki az f betűt!" },
  { id: "g", letter: "g", prompt: "Mondd ki a g betűt!" },
  { id: "h", letter: "h", prompt: "Mondd ki a h betűt!" },
  { id: "i", letter: "i", prompt: "Mondd ki az i betűt!" },
  { id: "í", letter: "í", prompt: "Mondd ki az í betűt!" },
  { id: "j", letter: "j", prompt: "Mondd ki a j betűt!" },
  { id: "k", letter: "k", prompt: "Mondd ki a k betűt!" },
  { id: "l", letter: "l", prompt: "Mondd ki az l betűt!" },
  { id: "m", letter: "m", prompt: "Mondd ki az m betűt!" },
  { id: "n", letter: "n", prompt: "Mondd ki az n betűt!" },
  { id: "o", letter: "o", prompt: "Mondd ki az o betűt!" },
  { id: "ó", letter: "ó", prompt: "Mondd ki az ó betűt!" },
  { id: "ö", letter: "ö", prompt: "Mondd ki az ö betűt!" },
  { id: "ő", letter: "ő", prompt: "Mondd ki az ő betűt!" },
  { id: "p", letter: "p", prompt: "Mondd ki a p betűt!" },
  { id: "r", letter: "r", prompt: "Mondd ki az r betűt!" },
  { id: "s", letter: "s", prompt: "Mondd ki az s betűt!" },
  { id: "t", letter: "t", prompt: "Mondd ki a t betűt!" },
  { id: "u", letter: "u", prompt: "Mondd ki az u betűt!" },
  { id: "ú", letter: "ú", prompt: "Mondd ki az ú betűt!" },
  { id: "ü", letter: "ü", prompt: "Mondd ki az ü betűt!" },
  { id: "ű", letter: "ű", prompt: "Mondd ki az ű betűt!" },
  { id: "v", letter: "v", prompt: "Mondd ki a v betűt!" },
  { id: "z", letter: "z", prompt: "Mondd ki a z betűt!" },
];

// Szavak hangjátékhoz (választott szavak a WORDS listából)
import { WORDS } from '../textGames/wordData';

export const VOICE_WORDS: VoiceItem[] = [
  { id: "alma", letter: "alma", prompt: "Mondd ki: alma" },
  { id: "kutya", letter: "kutya", prompt: "Mondd ki: kutya" },
  { id: "ház", letter: "ház", prompt: "Mondd ki: ház" },
  { id: "macska", letter: "macska", prompt: "Mondd ki: macska" },
  { id: "béka", letter: "béka", prompt: "Mondd ki: béka" },
  { id: "cica", letter: "cica", prompt: "Mondd ki: cica" },
  { id: "ló", letter: "ló", prompt: "Mondd ki: ló" },
  { id: "medve", letter: "medve", prompt: "Mondd ki: medve" },
  { id: "pillangó", letter: "pillangó", prompt: "Mondd ki: pillangó" },
  { id: "bicikli", letter: "bicikli", prompt: "Mondd ki: bicikli" },
  { id: "labda", letter: "labda", prompt: "Mondd ki: labda" },
  { id: "óra", letter: "óra", prompt: "Mondd ki: óra" },
  { id: "toll", letter: "toll", prompt: "Mondd ki: toll" },
  { id: "zebra", letter: "zebra", prompt: "Mondd ki: zebra" },
  { id: "gyertya", letter: "gyertya", prompt: "Mondd ki: gyertya" },
];

/**
 * Véletlenszerű betű vagy szó kiválasztása
 */
export const getRandomVoiceItem = (): VoiceItem => {
  const allItems = [...VOICE_LETTERS, ...VOICE_WORDS];
  const randomIndex = Math.floor(Math.random() * allItems.length);
  return allItems[randomIndex];
};

/**
 * Véletlenszerű betű kiválasztása
 */
export const getRandomVoiceLetter = (): VoiceItem => {
  const randomIndex = Math.floor(Math.random() * VOICE_LETTERS.length);
  return VOICE_LETTERS[randomIndex];
};

/**
 * Véletlenszerű szó kiválasztása
 */
export const getRandomVoiceWord = (): VoiceItem => {
  const randomIndex = Math.floor(Math.random() * VOICE_WORDS.length);
  return VOICE_WORDS[randomIndex];
};
