/**
 * 2. osztály – mondatépítés (szórend)
 * Egyedi chip-index alapú ellenőrzés (dupla „a” / „A” miatt nem hibázik)
 */

export interface SentenceChip {
  /** Eredeti pozíció a helyes mondatban (0..n-1) */
  origIndex: number;
  word: string;
}

export interface SentenceTask {
  words: string[];
  chips: SentenceChip[];
}

const SENTENCES: string[][] = [
  ['A', 'macska', 'szépen', 'alszik'],
  ['Péter', 'reggel', 'iskolába', 'megy'],
  ['Az', 'alma', 'piros', 'és', 'édes'],
  ['A', 'kutya', 'a', 'kertben', 'játszik'],
  ['Ma', 'sütni', 'fog', 'a', 'nap'],
  ['Anna', 'egy', 'mesét', 'olvas'],
  ['Télen', 'havazik', 'és', 'hideg', 'van'],
  ['A', 'tanár', 'a', 'táblán', 'ír'],
  ['Esténként', 'mesét', 'olvasunk'],
  ['A', 'fiú', 'barátokkal', 'focizik'],
  ['Anyu', 'otthon', 'süteményt', 'süt'],
  ['A', 'vonat', 'gyorsan', 'halad'],
  ['A', 'madarak', 'a', 'fán', 'énekelnek'],
  ['Szeretek', 'tanulni', 'és', 'játszani'],
  ['A', 'virágok', 'szépen', 'nyílnak'],
];

function shuffleChips<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createSentenceTask(): SentenceTask {
  const words = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  const chips = shuffleChips(
    words.map((word, origIndex) => ({ origIndex, word }))
  );
  return { words, chips };
}

/** Helyes, ha a kiválasztott chip-ek eredeti indexei 0,1,2… sorrendben vannak */
export function checkSentenceBuild(selectedOrigIndices: number[]): boolean {
  return selectedOrigIndices.every((origIdx, position) => origIdx === position);
}

/** @deprecated – régi string-alapú; ne használd */
export function checkSentenceOrder(words: string[], built: string[]): boolean {
  if (built.length !== words.length) return false;
  return built.every((w, i) => w === words[i]);
}
