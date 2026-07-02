/**
 * 2. osztály – környezetismeret tartalom
 */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface SeasonMatch {
  season: string;
  emoji: string;
  item: string;
  itemEmoji: string;
}

const SEASON_ITEMS: SeasonMatch[] = [
  { season: 'tavasz', emoji: '🌸', item: 'esernyő', itemEmoji: '☔' },
  { season: 'tavasz', emoji: '🌸', item: 'virág', itemEmoji: '🌷' },
  { season: 'nyár', emoji: '☀️', item: 'fürdőruha', itemEmoji: '👙' },
  { season: 'nyár', emoji: '☀️', item: 'fagyi', itemEmoji: '🍦' },
  { season: 'ősz', emoji: '🍂', item: 'sál', itemEmoji: '🧣' },
  { season: 'ősz', emoji: '🍂', item: 'levél', itemEmoji: '🍁' },
  { season: 'tél', emoji: '❄️', item: 'sapka', itemEmoji: '🧢' },
  { season: 'tél', emoji: '❄️', item: 'hóember', itemEmoji: '⛄' },
];

export function pickSeasonMatch(): { item: SeasonMatch; options: string[]; correct: number } {
  const item = SEASON_ITEMS[Math.floor(Math.random() * SEASON_ITEMS.length)];
  const seasons = shuffle(['tavasz', 'nyár', 'ősz', 'tél']);
  const correct = seasons.indexOf(item.season);
  return { item, options: seasons, correct };
}

export interface AnimalSort {
  name: string;
  emoji: string;
  group: 'emlős' | 'madár' | 'hal' | 'rovar';
}

const ANIMALS: AnimalSort[] = [
  { name: 'kutya', emoji: '🐕', group: 'emlős' },
  { name: 'macska', emoji: '🐈', group: 'emlős' },
  { name: 'medve', emoji: '🐻', group: 'emlős' },
  { name: 'galamb', emoji: '🕊️', group: 'madár' },
  { name: 'veréb', emoji: '🐦', group: 'madár' },
  { name: 'papagáj', emoji: '🦜', group: 'madár' },
  { name: 'hal', emoji: '🐟', group: 'hal' },
  { name: 'ponty', emoji: '🐠', group: 'hal' },
  { name: 'lepke', emoji: '🦋', group: 'rovar' },
  { name: 'méh', emoji: '🐝', group: 'rovar' },
];

export function pickAnimalSort(count = 4): AnimalSort[] {
  return shuffle(ANIMALS).slice(0, count);
}

export const ANIMAL_GROUPS = ['emlős', 'madár', 'hal', 'rovar'] as const;

export interface BodyPartTask {
  part: string;
  emoji: string;
  options: string[];
  correct: number;
}

const BODY: BodyPartTask[] = [
  { part: 'fej', emoji: '🙂', options: ['fej', 'láb', 'kezek', 'has'], correct: 0 },
  { part: 'szem', emoji: '👁️', options: ['szem', 'fül', 'orr', 'száj'], correct: 0 },
  { part: 'kezek', emoji: '🙌', options: ['kezek', 'lábak', 'fej', 'térd'], correct: 0 },
  { part: 'lábak', emoji: '🦵', options: ['lábak', 'karok', 'haj', 'fog'], correct: 0 },
];

export function pickBodyPart(): BodyPartTask {
  const b = BODY[Math.floor(Math.random() * BODY.length)];
  return { ...b, options: shuffle(b.options) };
}

export type TrafficLight = 'red' | 'yellow' | 'green';

export interface TrafficTask {
  light: TrafficLight;
  action: string;
  options: string[];
  correct: number;
}

const TRAFFIC: TrafficTask[] = [
  { light: 'red', action: 'állj meg!', options: ['állj meg!', 'mehetsz!', 'lassíts!'], correct: 0 },
  { light: 'yellow', action: 'lassíts!', options: ['állj meg!', 'mehetsz!', 'lassíts!'], correct: 2 },
  { light: 'green', action: 'mehetsz!', options: ['állj meg!', 'mehetsz!', 'lassíts!'], correct: 1 },
];

export function pickTrafficTask(): TrafficTask {
  return TRAFFIC[Math.floor(Math.random() * TRAFFIC.length)];
}

export interface HealthSort {
  item: string;
  emoji: string;
  healthy: boolean;
}

const HEALTH: HealthSort[] = [
  { item: 'alma', emoji: '🍎', healthy: true },
  { item: 'saláta', emoji: '🥗', healthy: true },
  { item: 'víz', emoji: '💧', healthy: true },
  { item: 'futás', emoji: '🏃', healthy: true },
  { item: 'cukorka', emoji: '🍬', healthy: false },
  { item: 'üdítő', emoji: '🥤', healthy: false },
  { item: 'chips', emoji: '🍟', healthy: false },
  { item: 'sok tv', emoji: '📺', healthy: false },
];

export function pickHealthItem(): HealthSort {
  return HEALTH[Math.floor(Math.random() * HEALTH.length)];
}

export { shuffle };
