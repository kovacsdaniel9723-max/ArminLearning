/**
 * Játéklista osztályszintenként
 */

import type { GradeLevel } from '../types/grade';
import type { RootStackParamList } from '../types';
import type { Grade2Subject } from '../games/grade2/registry';
import { SUBJECT_LABELS } from '../games/grade2/registry';

export interface GameCatalogEntry {
  id: string;
  title: string;
  description: string;
  icon: string;
  screen: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList];
  /** 2. osztály tantárgy csoportosításhoz */
  subject?: Grade2Subject;
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
  // Alap – meglévő motorok
  { id: 'letter', title: 'betűfelismerő', description: 'ismerd fel a betűket!', icon: '🔤', screen: 'LetterGame', subject: 'magyar' },
  { id: 'syllable', title: 'szótagolás', description: 'bontsd szótagokra!', icon: '📝', screen: 'SyllableGame', subject: 'magyar' },
  { id: 'reading', title: 'olvasás', description: 'olvasd el a mondatot!', icon: '📖', screen: 'ReadingGame', subject: 'magyar' },
  { id: 'sentence', title: 'mondatépítő', description: 'rakd össze a mondatot!', icon: '🧩', screen: 'SentenceGame', subject: 'magyar' },
  { id: 'meseNyomozo', title: 'mese-nyomozó', description: 'olvasd el és fejtsd meg!', icon: '🔍', screen: 'Grade2Game', params: { gameId: 'meseNyomozo' }, subject: 'magyar' },
  { id: 'irasjelVadasz', title: 'írásjel-vadász', description: 'találd meg a hiányzó jelet!', icon: '❗', screen: 'Grade2Game', params: { gameId: 'irasjelVadasz' }, subject: 'magyar' },
  { id: 'szofajSzafari', title: 'szófaj-szafari', description: 'rendezd a szavakat!', icon: '🌴', screen: 'Grade2Game', params: { gameId: 'szofajSzafari' }, subject: 'magyar' },
  { id: 'mondatfajtaMemoria', title: 'mondatfajta memória', description: 'párosítsd a mondatot!', icon: '🧠', screen: 'Grade2Game', params: { gameId: 'mondatfajtaMemoria' }, subject: 'magyar' },
  { id: 'fogalmazasEpito', title: 'fogalmazás-építő', description: 'építs mini-történetet!', icon: '✍️', screen: 'Grade2Game', params: { gameId: 'fogalmazasEpito' }, subject: 'magyar' },
  { id: 'rimVadasz', title: 'rím-vadász', description: 'melyik szó rímelt?', icon: '🎵', screen: 'Grade2Game', params: { gameId: 'rimVadasz' }, subject: 'magyar' },
  { id: 'missingLetter', title: 'hiányzó betű', description: 'hosszabb szavak!', icon: '✏️', screen: 'TextGame', params: { gameType: 'missingLetter' }, subject: 'magyar' },
  { id: 'hangman', title: 'építsük meg a robotot!', description: 'nehézebb szavak!', icon: '🤖', screen: 'HangmanGame', subject: 'magyar' },
  { id: 'voice', title: 'mondd ki hangosan!', description: 'mondatok hangosan!', icon: '🎤', screen: 'VoiceGame', subject: 'magyar' },
  // Matematika
  { id: 'number', title: 'számfelismerő', description: 'számok 1–100!', icon: '🔢', screen: 'NumberGame', subject: 'matematika' },
  { id: 'mathGrade2', title: 'matematika', description: 'összeadás, kivonás, szorzás!', icon: '🧮', screen: 'MathGrade2Game', subject: 'matematika' },
  { id: 'pattern', title: 'sorozat', description: 'mi jön ezután?', icon: '🔮', screen: 'PatternGame', subject: 'matematika' },
  { id: 'szorzoUgras', title: 'szorzó-ugrás', description: 'ugrálj a számsoron!', icon: '🦘', screen: 'Grade2Game', params: { gameId: 'szorzoUgras' }, subject: 'matematika' },
  { id: 'osztoParti', title: 'osztó-parti', description: 'oszd el egyenlően!', icon: '🎉', screen: 'Grade2Game', params: { gameId: 'osztoParti' }, subject: 'matematika' },
  { id: 'vasarlosJatek', title: 'vásárlós játék', description: 'számold a visszajárót!', icon: '🛒', screen: 'Grade2Game', params: { gameId: 'vasarlosJatek' }, subject: 'matematika' },
  { id: 'oraKaland', title: 'óra-kaland', description: 'olvasd az órát!', icon: '🕐', screen: 'Grade2Game', params: { gameId: 'oraKaland' }, subject: 'matematika' },
  { id: 'szovegesFeladat', title: 'szöveges feladat nyomozó', description: 'oldd meg képekkel!', icon: '🔎', screen: 'Grade2Game', params: { gameId: 'szovegesFeladat' }, subject: 'matematika' },
  { id: 'alakzatVadasz', title: 'alakzat-vadászat', description: 'keresd meg az alakzatot!', icon: '🔺', screen: 'Grade2Game', params: { gameId: 'alakzatVadasz' }, subject: 'matematika' },
  { id: 'meromester', title: 'mérőmester', description: 'mérj centiméterben!', icon: '📏', screen: 'Grade2Game', params: { gameId: 'meromester' }, subject: 'matematika' },
  { id: 'penzerme', title: 'pénzérmék', description: 'számold össze az érméket!', icon: '🪙', screen: 'Grade2Game', params: { gameId: 'penzerme' }, subject: 'matematika' },
  { id: 'szorzotabla', title: 'szorzótábla', description: '2×, 5×, 10× gyakorló!', icon: '✖️', screen: 'Grade2Game', params: { gameId: 'szorzotabla' }, subject: 'matematika' },
  // Környezet
  { id: 'evszakForgo', title: 'évszak-forgó', description: 'párosítsd az évszakot!', icon: '🌀', screen: 'Grade2Game', params: { gameId: 'evszakForgo' }, subject: 'kornyezet' },
  { id: 'allatCsoport', title: 'állat-csoportosító', description: 'rendezd az állatokat!', icon: '🦁', screen: 'Grade2Game', params: { gameId: 'allatCsoport' }, subject: 'kornyezet' },
  { id: 'testreszKvíz', title: 'testrész-kvíz', description: 'nevezd meg a testrészt!', icon: '🙂', screen: 'Grade2Game', params: { gameId: 'testreszKvíz' }, subject: 'kornyezet' },
  { id: 'kozlekedesLampa', title: 'közlekedés-lámpa', description: 'biztonságosan az úton!', icon: '🚦', screen: 'Grade2Game', params: { gameId: 'kozlekedesLampa' }, subject: 'kornyezet' },
  { id: 'egeszsegValaszto', title: 'egészség-választó', description: 'mi az egészséges?', icon: '🥗', screen: 'Grade2Game', params: { gameId: 'egeszsegValaszto' }, subject: 'kornyezet' },
  // Rajz
  { id: 'alkotoSzoba', title: 'alkotó szoba', description: 'paint-szerű rajzolás feladatokkal!', icon: '🎨', screen: 'Grade2Game', params: { gameId: 'alkotoSzoba' }, subject: 'rajz' },
  { id: 'formaKollazs', title: 'forma-kollázs', description: 'építs képet alakzatokból!', icon: '🧩', screen: 'Grade2Game', params: { gameId: 'formaKollazs' }, subject: 'rajz' },
  // Zene
  { id: 'ritmusKopogo', title: 'ritmus-kopogó', description: 'kövesd a ritmust!', icon: '🥁', screen: 'Grade2Game', params: { gameId: 'ritmusKopogo' }, subject: 'zene' },
  { id: 'hangfelismero', title: 'hangfelismerő', description: 'melyik hang ez?', icon: '👂', screen: 'Grade2Game', params: { gameId: 'hangfelismero' }, subject: 'zene' },
  { id: 'mozgasZenere', title: 'mozgás a zenére', description: 'táncolj a zenére!', icon: '💃', screen: 'Grade2Game', params: { gameId: 'mozgasZenere' }, subject: 'zene' },
  // Testnevelés
  { id: 'koordinacio', title: 'koordinációs kihívás', description: 'simon mondja mozgás!', icon: '🎯', screen: 'Grade2Game', params: { gameId: 'koordinacio' }, subject: 'testnev' },
  // Digitális
  { id: 'egerVadasz', title: 'egér-vadász', description: 'kattints a célra!', icon: '🖱️', screen: 'Grade2Game', params: { gameId: 'egerVadasz' }, subject: 'digitalis' },
  { id: 'netbiztonsag', title: 'netbiztonság-mese', description: 'biztonságos netezés!', icon: '🛡️', screen: 'Grade2Game', params: { gameId: 'netbiztonsag' }, subject: 'digitalis' },
];

export function getGamesForGrade(grade: GradeLevel): GameCatalogEntry[] {
  return grade === 1 ? GRADE1_GAMES : GRADE2_GAMES;
}

export function getGrade2GamesGrouped(): { subject: Grade2Subject; label: string; games: GameCatalogEntry[] }[] {
  const subjects: Grade2Subject[] = ['magyar', 'matematika', 'kornyezet', 'rajz', 'zene', 'testnev', 'digitalis'];
  return subjects.map((subject) => ({
    subject,
    label: SUBJECT_LABELS[subject],
    games: GRADE2_GAMES.filter((g) => g.subject === subject),
  }));
}
