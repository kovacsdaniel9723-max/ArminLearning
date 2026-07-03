/**
 * 2. osztály játékregiszter – gameId → komponens
 */

import React from 'react';
import { StoryQuizEngine } from './engines/StoryQuizEngine';
import { MemoryTypeEngine } from './engines/MemoryTypeEngine';
import { ScaffoldEngine } from './engines/ScaffoldEngine';
import {
  NumberLineEngine,
  SharingEngine,
  ShoppingEngine,
  ClockEngine,
  WordProblemEngine,
  ShapeHuntEngine,
  MeasureEngine,
} from './engines/MathExtraEngines';
import {
  SeasonSpinEngine,
  AnimalSortEngine,
  BodyLabelEngine,
  TrafficLightEngine,
  HealthSortEngine,
} from './engines/KornyezetEngines';
import {
  PunctuationEngine,
  WordTypeSafariEngine,
  RhythmEngine,
  SoundPickEngine,
  DanceEngine,
  CoordinationEngine,
  ClickTargetEngine,
  NetSafetyEngine,
  DrawingEngine,
  CollageEngine,
} from './engines/CreativeEngines';
import { RimVadaszEngine, PenzermeEngine, SzorzotablaEngine } from './engines/ExtraGamesEngines';

export type Grade2Subject =
  | 'magyar'
  | 'matematika'
  | 'kornyezet'
  | 'rajz'
  | 'zene'
  | 'testnev'
  | 'digitalis';

export interface Grade2GameDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  subject: Grade2Subject;
  component: React.ComponentType;
}

export const SUBJECT_LABELS: Record<Grade2Subject, string> = {
  magyar: 'magyar nyelv',
  matematika: 'matematika',
  kornyezet: 'környezetismeret',
  rajz: 'rajz és technika',
  zene: 'ének-zene',
  testnev: 'testnevelés',
  digitalis: 'digitális kultúra',
};

export const GRADE2_REGISTRY: Grade2GameDef[] = [
  { id: 'meseNyomozo', title: 'mese-nyomozó', description: 'olvasd el és fejtsd meg!', icon: '🔍', subject: 'magyar', component: StoryQuizEngine },
  { id: 'irasjelVadasz', title: 'írásjel-vadász', description: 'találd meg a hiányzó jelet!', icon: '❗', subject: 'magyar', component: PunctuationEngine },
  { id: 'szofajSzafari', title: 'szófaj-szafari', description: 'rendezd a szavakat!', icon: '🌴', subject: 'magyar', component: WordTypeSafariEngine },
  { id: 'mondatfajtaMemoria', title: 'mondatfajta memória', description: 'párosítsd a mondatot!', icon: '🧠', subject: 'magyar', component: MemoryTypeEngine },
  { id: 'fogalmazasEpito', title: 'fogalmazás-építő', description: 'építs mini-történetet!', icon: '✍️', subject: 'magyar', component: ScaffoldEngine },
  { id: 'rimVadasz', title: 'rím-vadász', description: 'melyik szó rímelt?', icon: '🎵', subject: 'magyar', component: RimVadaszEngine },
  { id: 'szorzoUgras', title: 'szorzó-ugrás', description: 'ugrálj a számsoron!', icon: '🦘', subject: 'matematika', component: NumberLineEngine },
  { id: 'osztoParti', title: 'osztó-parti', description: 'oszd el egyenlően!', icon: '🎉', subject: 'matematika', component: SharingEngine },
  { id: 'vasarlosJatek', title: 'vásárlós játék', description: 'számold a visszajárót!', icon: '🛒', subject: 'matematika', component: ShoppingEngine },
  { id: 'oraKaland', title: 'óra-kaland', description: 'olvasd az órát!', icon: '🕐', subject: 'matematika', component: ClockEngine },
  { id: 'szovegesFeladat', title: 'szöveges feladat nyomozó', description: 'oldd meg képekkel!', icon: '🔎', subject: 'matematika', component: WordProblemEngine },
  { id: 'alakzatVadasz', title: 'alakzat-vadászat', description: 'keresd meg az alakzatot!', icon: '🔺', subject: 'matematika', component: ShapeHuntEngine },
  { id: 'meromester', title: 'mérőmester', description: 'mérj centiméterben!', icon: '📏', subject: 'matematika', component: MeasureEngine },
  { id: 'penzerme', title: 'pénzérmék', description: 'számold össze az érméket!', icon: '🪙', subject: 'matematika', component: PenzermeEngine },
  { id: 'szorzotabla', title: 'szorzótábla', description: '2×, 5×, 10× gyakorló!', icon: '✖️', subject: 'matematika', component: SzorzotablaEngine },
  { id: 'evszakForgo', title: 'évszak-forgó', description: 'párosítsd az évszakot!', icon: '🌀', subject: 'kornyezet', component: SeasonSpinEngine },
  { id: 'allatCsoport', title: 'állat-csoportosító', description: 'rendezd az állatokat!', icon: '🦁', subject: 'kornyezet', component: AnimalSortEngine },
  { id: 'testreszKvíz', title: 'testrész-kvíz', description: 'nevezd meg a testrészt!', icon: '🙂', subject: 'kornyezet', component: BodyLabelEngine },
  { id: 'kozlekedesLampa', title: 'közlekedés-lámpa', description: 'biztonságosan az úton!', icon: '🚦', subject: 'kornyezet', component: TrafficLightEngine },
  { id: 'egeszsegValaszto', title: 'egészség-választó', description: 'mi az egészséges?', icon: '🥗', subject: 'kornyezet', component: HealthSortEngine },
  { id: 'alkotoSzoba', title: 'alkotó szoba', description: 'paint-szerű rajzolás feladatokkal!', icon: '🎨', subject: 'rajz', component: DrawingEngine },
  { id: 'formaKollazs', title: 'forma-kollázs', description: 'építs képet alakzatokból!', icon: '🧩', subject: 'rajz', component: CollageEngine },
  { id: 'ritmusKopogo', title: 'ritmus-kopogó', description: 'kövesd a ritmust!', icon: '🥁', subject: 'zene', component: RhythmEngine },
  { id: 'hangfelismero', title: 'hangfelismerő', description: 'melyik hang ez?', icon: '👂', subject: 'zene', component: SoundPickEngine },
  { id: 'mozgasZenere', title: 'mozgás a zenére', description: 'táncolj a zenére!', icon: '💃', subject: 'zene', component: DanceEngine },
  { id: 'koordinacio', title: 'koordinációs kihívás', description: 'simon mondja mozgás!', icon: '🎯', subject: 'testnev', component: CoordinationEngine },
  { id: 'egerVadasz', title: 'egér-vadász', description: 'kattints a célra!', icon: '🖱️', subject: 'digitalis', component: ClickTargetEngine },
  { id: 'netbiztonsag', title: 'netbiztonság-mese', description: 'biztonságos netezés!', icon: '🛡️', subject: 'digitalis', component: NetSafetyEngine },
];

export function getGrade2Game(id: string): Grade2GameDef | undefined {
  return GRADE2_REGISTRY.find((g) => g.id === id);
}

export function getGrade2GamesBySubject(): { subject: Grade2Subject; label: string; games: Grade2GameDef[] }[] {
  const subjects: Grade2Subject[] = ['magyar', 'matematika', 'kornyezet', 'rajz', 'zene', 'testnev', 'digitalis'];
  return subjects.map((subject) => ({
    subject,
    label: SUBJECT_LABELS[subject],
    games: GRADE2_REGISTRY.filter((g) => g.subject === subject),
  }));
}
