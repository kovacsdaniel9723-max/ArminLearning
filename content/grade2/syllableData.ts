/**
 * 2. osztály – szótagolás feladatok
 */

export interface SyllableTask {
  word: string;
  syllables: string[];
  options: string[][];
  correctIndex: number;
}

export const SYLLABLE_TASKS: SyllableTask[] = [
  { word: 'alma', syllables: ['al', 'ma'], options: [['al', 'ma'], ['a', 'lma'], ['alm', 'a']], correctIndex: 0 },
  { word: 'iskola', syllables: ['is', 'ko', 'la'], options: [['is', 'kola'], ['is', 'ko', 'la'], ['isko', 'la']], correctIndex: 1 },
  { word: 'tanuló', syllables: ['ta', 'nu', 'ló'], options: [['tan', 'uló'], ['ta', 'nu', 'ló'], ['ta', 'nuló']], correctIndex: 1 },
  { word: 'macska', syllables: ['macs', 'ka'], options: [['macs', 'ka'], ['mac', 'ska'], ['ma', 'cska']], correctIndex: 0 },
  { word: 'kutya', syllables: ['ku', 'tya'], options: [['ku', 'tya'], ['kut', 'ya'], ['k', 'utya']], correctIndex: 0 },
  { word: 'virág', syllables: ['vi', 'rág'], options: [['vir', 'ág'], ['vi', 'rág'], ['v', 'irág']], correctIndex: 1 },
  { word: 'erdő', syllables: ['er', 'dő'], options: [['er', 'dő'], ['erd', 'ő'], ['e', 'rdő']], correctIndex: 0 },
  { word: 'könyv', syllables: ['kö', 'nyv'], options: [['kön', 'yv'], ['kö', 'nyv'], ['k', 'önyv']], correctIndex: 1 },
  { word: 'ceruza', syllables: ['ce', 'ru', 'za'], options: [['ce', 'ru', 'za'], ['cer', 'uza'], ['ce', 'ruza']], correctIndex: 0 },
  { word: 'autó', syllables: ['au', 'tó'], options: [['au', 'tó'], ['aut', 'ó'], ['a', 'utó']], correctIndex: 0 },
  { word: 'repülő', syllables: ['re', 'pü', 'lő'], options: [['re', 'pülő'], ['re', 'pü', 'lő'], ['rep', 'ülő']], correctIndex: 1 },
  { word: 'csillag', syllables: ['csil', 'lag'], options: [['csil', 'lag'], ['csi', 'llag'], ['cs', 'illag']], correctIndex: 0 },
  { word: 'barát', syllables: ['ba', 'rát'], options: [['bar', 'át'], ['ba', 'rát'], ['b', 'arát']], correctIndex: 1 },
  { word: 'család', syllables: ['csa', 'lád'], options: [['csa', 'lád'], ['csal', 'ád'], ['cs', 'alád']], correctIndex: 0 },
  { word: 'játék', syllables: ['já', 'ték'], options: [['ját', 'ék'], ['já', 'ték'], ['j', 'áték']], correctIndex: 1 },
  { word: 'sütemény', syllables: ['sü', 'te', 'mény'], options: [['sü', 'te', 'mény'], ['süte', 'mény'], ['süt', 'emény']], correctIndex: 0 },
  { word: 'gyümölcs', syllables: ['gyü', 'mölcs'], options: [['gyüm', 'ölcs'], ['gyü', 'mölcs'], ['gy', 'ümölcs']], correctIndex: 1 },
  { word: 'kertész', syllables: ['ker', 'tész'], options: [['ker', 'tész'], ['kert', 'ész'], ['ke', 'rtész']], correctIndex: 0 },
  { word: 'vonat', syllables: ['vo', 'nat'], options: [['von', 'at'], ['vo', 'nat'], ['v', 'onat']], correctIndex: 1 },
  { word: 'hétvége', syllables: ['hét', 'vé', 'ge'], options: [['hét', 'vé', 'ge'], ['hét', 'vege'], ['hétv', 'ége']], correctIndex: 0 },
];

export function getRandomSyllableTask(): SyllableTask {
  const i = Math.floor(Math.random() * SYLLABLE_TASKS.length);
  return SYLLABLE_TASKS[i];
}
