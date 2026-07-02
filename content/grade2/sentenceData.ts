/**
 * 2. osztály – mondatépítés (szórend)
 */

export interface SentenceTask {
  words: string[];
  shuffled: string[];
}

const SENTENCE_TASKS_RAW: string[][] = [
  ['A', 'macska', 'alszik', 'szépen'],
  ['Péter', 'iskolába', 'megy', 'reggel'],
  ['Az', 'alma', 'piros', 'és', 'édes'],
  ['A', 'kutya', 'játszik', 'a', 'kertben'],
  ['Ma', 'süt', 'a', 'nap'],
  ['Anna', 'olvas', 'egy', 'mesét'],
  ['Télen', 'havazik', 'és', 'hideg', 'van'],
  ['A', 'tanár', 'ír', 'a', 'táblán'],
  ['Esténként', 'mesét', 'olvasunk'],
  ['A', 'fiú', 'focizik', 'barátokkal'],
  ['Anyu', 'süteményt', 'süt', 'otthon'],
  ['A', 'vonat', 'gyorsan', 'halad'],
  ['A', 'madarak', 'énekelnek', 'a', 'fán'],
  ['Szeretek', 'tanulni', 'és', 'játszani'],
  ['A', 'virágok', 'szépen', 'nyílnak'],
];

export function createSentenceTask(): SentenceTask {
  const words = SENTENCE_TASKS_RAW[Math.floor(Math.random() * SENTENCE_TASKS_RAW.length)];
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return { words, shuffled };
}

export function checkSentenceOrder(words: string[], built: string[]): boolean {
  return built.join(' ') === words.join(' ');
}
