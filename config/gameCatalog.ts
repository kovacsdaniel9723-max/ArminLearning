/**
 * Játéklista osztályszintenként
 */

import type { GradeLevel } from '../types/grade';
import type { RootStackParamList } from '../types';

export interface GameCatalogEntry {
  id: string;
  title: string;
  description: string;
  icon: string;
  screen: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList];
}

const GRADE1_GAMES: GameCatalogEntry[] = [
  { id: 'letter', title: 'Betűfelismerő', description: 'Ismerd fel a betűket!', icon: '🔤', screen: 'LetterGame' },
  { id: 'number', title: 'Számfelismerő', description: 'Számolj és tanulj!', icon: '🔢', screen: 'NumberGame' },
  { id: 'wordPicture', title: 'Szó-Kép Párosítás', description: 'Párosítsd a szavakat a képekkel!', icon: '🖼️', screen: 'TextGame', params: { gameType: 'wordPicture' } },
  { id: 'missingLetter', title: 'Hiányzó Betű', description: 'Találd ki a hiányzó betűt!', icon: '✏️', screen: 'TextGame', params: { gameType: 'missingLetter' } },
  { id: 'firstLetter', title: 'Első Betű', description: 'Melyik betűvel kezdődik?', icon: '🔍', screen: 'TextGame', params: { gameType: 'firstLetter' } },
  { id: 'hangman', title: 'Építsük meg a robotot!', description: 'Találd ki a szót, építsd meg a robotot!', icon: '🤖', screen: 'HangmanGame' },
  { id: 'voice', title: 'Mondd ki hangosan!', description: 'Ismételd meg a szavakat!', icon: '🎤', screen: 'VoiceGame' },
  { id: 'mathAddition', title: 'Összeadás', description: 'Hány alma van összesen?', icon: '🧮', screen: 'MathAdditionGame' },
];

const GRADE2_GAMES: GameCatalogEntry[] = [
  { id: 'letter', title: 'Betűfelismerő', description: 'Ismerd fel a betűket!', icon: '🔤', screen: 'LetterGame' },
  { id: 'number', title: 'Számfelismerő', description: 'Számok 1–100!', icon: '🔢', screen: 'NumberGame' },
  { id: 'syllable', title: 'Szótagolás', description: 'Bontsd szótagokra!', icon: '📝', screen: 'SyllableGame' },
  { id: 'reading', title: 'Olvasás', description: 'Olvasd el a mondatot!', icon: '📖', screen: 'ReadingGame' },
  { id: 'sentence', title: 'Mondatépítés', description: 'Rakd össze a mondatot!', icon: '🧩', screen: 'SentenceGame' },
  { id: 'missingLetter', title: 'Hiányzó Betű', description: 'Hosszabb szavak!', icon: '✏️', screen: 'TextGame', params: { gameType: 'missingLetter' } },
  { id: 'hangman', title: 'Építsük meg a robotot!', description: 'Nehézebb szavak!', icon: '🤖', screen: 'HangmanGame' },
  { id: 'pattern', title: 'Sorozat', description: 'Mi jön ezután?', icon: '🔮', screen: 'PatternGame' },
  { id: 'mathGrade2', title: 'Matematika', description: 'Összeadás, kivonás, szorzás!', icon: '🧮', screen: 'MathGrade2Game' },
  { id: 'voice', title: 'Mondd ki hangosan!', description: 'Mondatok hangosan!', icon: '🎤', screen: 'VoiceGame' },
];

export function getGamesForGrade(grade: GradeLevel): GameCatalogEntry[] {
  return grade === 1 ? GRADE1_GAMES : GRADE2_GAMES;
}
