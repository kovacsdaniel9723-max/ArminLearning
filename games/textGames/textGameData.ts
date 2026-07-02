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
    words: ['alma', 'kutya', 'ház'],
    correctIndex: 0,
  },
  {
    image: '🐱',
    words: ['macska', 'kutya', 'ló'],
    correctIndex: 0,
  },
  {
    image: '🐶',
    words: ['macska', 'kutya', 'ló'],
    correctIndex: 1,
  },
  {
    image: '🐴',
    words: ['macska', 'kutya', 'ló'],
    correctIndex: 2,
  },
  {
    image: '🏠',
    words: ['ház', 'autó', 'fa'],
    correctIndex: 0,
  },
  {
    image: '🐸',
    words: ['béka', 'cica', 'kutya'],
    correctIndex: 0,
  },
  {
    image: '🦋',
    words: ['pillangó', 'bogár', 'csiga'],
    correctIndex: 0,
  },
  {
    image: '🐻',
    words: ['medve', 'farkas', 'nyúl'],
    correctIndex: 0,
  },
  {
    image: '🐰',
    words: ['medve', 'farkas', 'nyúl'],
    correctIndex: 2,
  },
  {
    image: '🦀',
    words: ['rák', 'hal', 'csiga'],
    correctIndex: 0,
  },
  {
    image: '🐟',
    words: ['rák', 'hal', 'csiga'],
    correctIndex: 1,
  },
  {
    image: '🦌',
    words: ['őz', 'ökör', 'ló'],
    correctIndex: 0,
  },
  {
    image: '🚲',
    words: ['bicikli', 'autó', 'ló'],
    correctIndex: 0,
  },
  {
    image: '⚽',
    words: ['labda', 'golyó', 'kulcs'],
    correctIndex: 0,
  },
  {
    image: '🕐',
    words: ['óra', 'toll', 'kulcs'],
    correctIndex: 0,
  },
  {
    image: '🕯️',
    words: ['gyertya', 'lámpa', 'fény'],
    correctIndex: 0,
  },
  {
    image: '🏳️',
    words: ['zászló', 'kép', 'tányér'],
    correctIndex: 0,
  },
  {
    image: '🦓',
    words: ['zebra', 'ló', 'ökör'],
    correctIndex: 0,
  },
];

// Hiányzó betű minták - teljes szavakkal, missingIndex mutatja a hiányzó betű pozícióját
export const missingLetterQuestions: MissingLetterQuestion[] = [
  {
    word: 'béka',
    missingIndex: 1,
    options: ['b', 'é', 'k'],
    correctIndex: 1,
  },
  {
    word: 'cica',
    missingIndex: 1,
    options: ['c', 'i', 'a'],
    correctIndex: 1,
  },
  {
    word: 'alma',
    missingIndex: 1,
    options: ['a', 'l', 'm'],
    correctIndex: 1,
  },
  {
    word: 'macska',
    missingIndex: 1,
    options: ['m', 'a', 'c'],
    correctIndex: 1,
  },
  {
    word: 'pillangó',
    missingIndex: 1,
    options: ['p', 'i', 'l'],
    correctIndex: 1,
  },
  {
    word: 'kutya',
    missingIndex: 1,
    options: ['k', 'u', 't'],
    correctIndex: 1,
  },
  {
    word: 'hal',
    missingIndex: 1,
    options: ['h', 'a', 'l'],
    correctIndex: 1,
  },
  {
    word: 'ház',
    missingIndex: 1,
    options: ['h', 'á', 'z'],
    correctIndex: 1,
  },
  {
    word: 'labda',
    missingIndex: 1,
    options: ['l', 'a', 'b'],
    correctIndex: 1,
  },
  {
    word: 'medve',
    missingIndex: 1,
    options: ['m', 'e', 'd'],
    correctIndex: 1,
  },
  {
    word: 'toll',
    missingIndex: 1,
    options: ['t', 'o', 'l'],
    correctIndex: 1,
  },
  {
    word: 'tányér',
    missingIndex: 1,
    options: ['t', 'á', 'n'],
    correctIndex: 1,
  },
  {
    word: 'szó',
    missingIndex: 1,
    options: ['s', 'z', 'ó'],
    correctIndex: 1,
  },
  {
    word: 'szín',
    missingIndex: 1,
    options: ['s', 'z', 'í'],
    correctIndex: 1,
  },
  {
    word: 'szél',
    missingIndex: 1,
    options: ['s', 'z', 'é'],
    correctIndex: 1,
  },
  {
    word: 'zászló',
    missingIndex: 1,
    options: ['z', 'á', 's'],
    correctIndex: 1,
  },
  {
    word: 'zebra',
    missingIndex: 1,
    options: ['z', 'e', 'b'],
    correctIndex: 1,
  },
  {
    word: 'gyertya',
    missingIndex: 1,
    options: ['g', 'y', 'e'],
    correctIndex: 1,
  },
  {
    word: 'fakó',
    missingIndex: 1,
    options: ['f', 'a', 'k'],
    correctIndex: 1,
  },
  {
    word: 'farkas',
    missingIndex: 1,
    options: ['f', 'a', 'r'],
    correctIndex: 1,
  },
];

// Szó-emoji mapping az első betű játékhoz (kisbetűs kulcsok)
const WORD_EMOJI_MAP: Record<string, string> = {
  'alma': '🍎',
  'angyal': '👼',
  'apác': '👩‍🦲',
  'apó': '👴',
  'ágy': '🛏️',
  'állat': '🐾',
  'ár': '💰',
  'árnyék': '🌑',
  'árpa': '🌾',
  'árva': '👶',
  'baba': '👶',
  'bár': '🍺',
  'bátor': '🛡️',
  'béka': '🐸',
  'bér': '💰',
  'bélyeg': '📮',
  'bicikli': '🚲',
  'bika': '🐂',
  'bili': '🎱',
  'bogár': '🐛',
  'bolt': '🏪',
  'bor': '🍷',
  'bot': '🪄',
  'cica': '🐱',
  'cukor': '🍬',
  'csiga': '🐌',
  'csoki': '🍫',
  'dada': '👶',
  'dallam': '🎵',
  'daru': '🦩',
  'déli': '🌞',
  'dísz': '✨',
  'dolgozó': '👷',
  'dongó': '🐝',
  'elem': '🔋',
  'ébred': '☀️',
  'ég': '☁️',
  'élelem': '🍞',
  'ének': '🎵',
  'ér': '💉',
  'erdő': '🌲',
  'eskü': '✋',
  'és': '➕',
  'étkezik': '🍽️',
  'fakó': '🌳',
  'fák': '🌳',
  'fal': '🧱',
  'farkas': '🐺',
  'fél': '😰',
  'fény': '💡',
  'fiú': '👦',
  'fű': '🌱',
  'gép': '💻',
  'golyó': '⚽',
  'gyertya': '🕯️',
  'gyöngy': '💎',
  'ház': '🏠',
  'hal': '🐟',
  'hang': '🔊',
  'hét': '7️⃣',
  'híd': '🌉',
  'hó': '❄️',
  'igaz': '✅',
  'illat': '🌸',
  'ima': '🙏',
  'ír': '✍️',
  'jár': '🚶',
  'jég': '🧊',
  'jó': '👍',
  'kakas': '🐓',
  'kép': '🖼️',
  'kert': '🌳',
  'kéz': '✋',
  'kis': '👶',
  'kör': '⭕',
  'köz': '📍',
  'kuka': '🗑️',
  'kulcs': '🗝️',
  'kutya': '🐶',
  'labda': '⚽',
  'láb': '🦶',
  'lép': '🐛',
  'ló': '🐴',
  'lóca': '🦌',
  'már': '⏰',
  'macska': '🐱',
  'medve': '🐻',
  'méh': '🐝',
  'méz': '🍯',
  'mű': '🎭',
  'nap': '☀️',
  'néz': '👀',
  'nyár': '☀️',
  'nyúl': '🐰',
  'óra': '🕐',
  'ökör': '🐂',
  'őz': '🦌',
  'párna': '🛏️',
  'pénz': '💰',
  'pillangó': '🦋',
  'rák': '🦀',
  'rét': '🌾',
  'sár': '🌧️',
  'sátor': '⛺',
  'siker': '🎉',
  'szár': '🌱',
  'szél': '💨',
  'szín': '🎨',
  'szó': '💬',
  'tányér': '🍽️',
  'tér': '📍',
  'toll': '✏️',
  'tűz': '🔥',
  'tükör': '🪞',
  'tücsök': '🦗',
  'ujj': '👆',
  'út': '🛣️',
  'üveg': '🥃',
  'üzlet': '🏪',
  'vár': '🏰',
  'víz': '💧',
  'zászló': '🏳️',
  'zebra': '🦓',
  'zene': '🎵',
  'zsák': '👜',
};

// Első betű felismerés: WORDS listából generáljuk
// Jelenleg emoji-kat használunk, később valódi képekkel lesznek helyettesítve
export const firstLetterQuestions: FirstLetterQuestion[] = WORDS.slice(0, 30).map((wordItem, index) => {
  // Választunk 2 másik betűt, ami nem az első betű
  const allLetters = ['a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm', 'n', 'o', 'ó', 'ö', 'ő', 'p', 'r', 's', 't', 'u', 'ú', 'ü', 'ű', 'v', 'z'];
  const wrongOptions = allLetters
    .filter(letter => letter !== wordItem.firstLetter)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  
  const options = [wordItem.firstLetter, ...wrongOptions].sort(() => Math.random() - 0.5);
  const correctIndex = options.indexOf(wordItem.firstLetter);
  
  // Szóhoz tartozó emoji vagy placeholder
  const emoji = WORD_EMOJI_MAP[wordItem.word] || '📷';
  
  return {
    image: emoji,
    word: wordItem.word,
    options: options,
    correctIndex: correctIndex,
  };
});

/**
 * Véletlenszerű kérdések
 */
import { getCurrentGrade } from '../../utils/gradeState';
import { getRandomMissingLetterGrade2 } from '../../content/grade2/missingLetterData';

export const getRandomWordPictureQuestion = (): WordPictureQuestion => {
  const randomIndex = Math.floor(Math.random() * wordPictureQuestions.length);
  return wordPictureQuestions[randomIndex];
};

export const getRandomMissingLetterQuestion = (): MissingLetterQuestion => {
  if (getCurrentGrade() === 2) {
    return getRandomMissingLetterGrade2();
  }
  const randomIndex = Math.floor(Math.random() * missingLetterQuestions.length);
  return missingLetterQuestions[randomIndex];
};

export const getRandomFirstLetterQuestion = (): FirstLetterQuestion => {
  const randomIndex = Math.floor(Math.random() * firstLetterQuestions.length);
  return firstLetterQuestions[randomIndex];
};
