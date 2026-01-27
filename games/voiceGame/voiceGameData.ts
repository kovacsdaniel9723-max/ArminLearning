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

// Betűk hangjátékhoz
export const VOICE_LETTERS: VoiceItem[] = [
  { id: "a", letter: "A", prompt: "Mondd ki az A betűt!" },
  { id: "á", letter: "Á", prompt: "Mondd ki az Á betűt!" },
  { id: "b", letter: "B", prompt: "Mondd ki a B betűt!" },
  { id: "c", letter: "C", prompt: "Mondd ki a C betűt!" },
  { id: "d", letter: "D", prompt: "Mondd ki a D betűt!" },
  { id: "e", letter: "E", prompt: "Mondd ki az E betűt!" },
  { id: "é", letter: "É", prompt: "Mondd ki az É betűt!" },
  { id: "f", letter: "F", prompt: "Mondd ki az F betűt!" },
  { id: "g", letter: "G", prompt: "Mondd ki a G betűt!" },
  { id: "h", letter: "H", prompt: "Mondd ki a H betűt!" },
  { id: "i", letter: "I", prompt: "Mondd ki az I betűt!" },
  { id: "í", letter: "Í", prompt: "Mondd ki az Í betűt!" },
  { id: "j", letter: "J", prompt: "Mondd ki a J betűt!" },
  { id: "k", letter: "K", prompt: "Mondd ki a K betűt!" },
  { id: "l", letter: "L", prompt: "Mondd ki az L betűt!" },
  { id: "m", letter: "M", prompt: "Mondd ki az M betűt!" },
  { id: "n", letter: "N", prompt: "Mondd ki az N betűt!" },
  { id: "o", letter: "O", prompt: "Mondd ki az O betűt!" },
  { id: "ó", letter: "Ó", prompt: "Mondd ki az Ó betűt!" },
  { id: "ö", letter: "Ö", prompt: "Mondd ki az Ö betűt!" },
  { id: "ő", letter: "Ő", prompt: "Mondd ki az Ő betűt!" },
  { id: "p", letter: "P", prompt: "Mondd ki a P betűt!" },
  { id: "r", letter: "R", prompt: "Mondd ki az R betűt!" },
  { id: "s", letter: "S", prompt: "Mondd ki az S betűt!" },
  { id: "t", letter: "T", prompt: "Mondd ki a T betűt!" },
  { id: "u", letter: "U", prompt: "Mondd ki az U betűt!" },
  { id: "ú", letter: "Ú", prompt: "Mondd ki az Ú betűt!" },
  { id: "ü", letter: "Ü", prompt: "Mondd ki az Ü betűt!" },
  { id: "ű", letter: "Ű", prompt: "Mondd ki az Ű betűt!" },
  { id: "v", letter: "V", prompt: "Mondd ki a V betűt!" },
  { id: "z", letter: "Z", prompt: "Mondd ki a Z betűt!" },
];

// Szavak hangjátékhoz (választott szavak a WORDS listából)
import { WORDS } from '../textGames/wordData';

export const VOICE_WORDS: VoiceItem[] = [
  { id: "alma", letter: "ALMA", prompt: "Mondd ki: ALMA" },
  { id: "kutya", letter: "KUTYA", prompt: "Mondd ki: KUTYA" },
  { id: "ház", letter: "HÁZ", prompt: "Mondd ki: HÁZ" },
  { id: "macska", letter: "MACSKA", prompt: "Mondd ki: MACSKA" },
  { id: "béka", letter: "BÉKA", prompt: "Mondd ki: BÉKA" },
  { id: "cica", letter: "CICA", prompt: "Mondd ki: CICA" },
  { id: "ló", letter: "LÓ", prompt: "Mondd ki: LÓ" },
  { id: "medve", letter: "MEDVE", prompt: "Mondd ki: MEDVE" },
  { id: "pillangó", letter: "PILLANGÓ", prompt: "Mondd ki: PILLANGÓ" },
  { id: "bicikli", letter: "BICIKLI", prompt: "Mondd ki: BICIKLI" },
  { id: "labda", letter: "LABDA", prompt: "Mondd ki: LABDA" },
  { id: "óra", letter: "ÓRA", prompt: "Mondd ki: ÓRA" },
  { id: "toll", letter: "TOLL", prompt: "Mondd ki: TOLL" },
  { id: "zebra", letter: "ZEBRA", prompt: "Mondd ki: ZEBRA" },
  { id: "gyertya", letter: "GYERTYA", prompt: "Mondd ki: GYERTYA" },
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
