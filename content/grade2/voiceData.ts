/**
 * 2. osztály – hangjáték mondatok és szavak
 */

import type { VoiceItem } from '../../games/voiceGame/voiceGameData';

export const VOICE_GRADE2_WORDS: VoiceItem[] = [
  { id: 'g2-iskola', letter: 'iskola', prompt: 'mondd ki: iskola' },
  { id: 'g2-tanár', letter: 'tanár', prompt: 'mondd ki: tanár' },
  { id: 'g2-tábla', letter: 'tábla', prompt: 'mondd ki: tábla' },
  { id: 'g2-füzet', letter: 'füzet', prompt: 'mondd ki: füzet' },
  { id: 'g2-barát', letter: 'barát', prompt: 'mondd ki: barát' },
  { id: 'g2-játszótér', letter: 'játszótér', prompt: 'mondd ki: játszótér' },
  { id: 'g2-kert', letter: 'kert', prompt: 'mondd ki: kert' },
  { id: 'g2-virág', letter: 'virág', prompt: 'mondd ki: virág' },
  { id: 'g2-eső', letter: 'eső', prompt: 'mondd ki: eső' },
  { id: 'g2-nap', letter: 'nap', prompt: 'mondd ki: nap' },
];

export const VOICE_GRADE2_SENTENCES: VoiceItem[] = [
  { id: 'g2-s1', letter: 'Ma suli van.', prompt: 'mondd ki hangosan a mondatot!' },
  { id: 'g2-s2', letter: 'Szeretek olvasni.', prompt: 'mondd ki hangosan a mondatot!' },
  { id: 'g2-s3', letter: 'A kutya az udvaron játszik.', prompt: 'mondd ki hangosan a mondatot!' },
  { id: 'g2-s4', letter: 'Hol a tollam?', prompt: 'mondd ki hangosan a mondatot!' },
  { id: 'g2-s5', letter: 'Szép az idő ma.', prompt: 'mondd ki hangosan a mondatot!' },
  { id: 'g2-s6', letter: 'Együtt tanulunk.', prompt: 'mondd ki hangosan a mondatot!' },
  { id: 'g2-s7', letter: 'A macska alszik.', prompt: 'mondd ki hangosan a mondatot!' },
  { id: 'g2-s8', letter: 'Szeretem a fagyit.', prompt: 'mondd ki hangosan a mondatot!' },
];

export function getRandomGrade2VoiceItem(): VoiceItem {
  const all = [...VOICE_GRADE2_WORDS, ...VOICE_GRADE2_SENTENCES];
  return all[Math.floor(Math.random() * all.length)];
}
