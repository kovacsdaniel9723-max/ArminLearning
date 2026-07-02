/**
 * Jutalom konfiguráció – 1–100 szint, minden szint explicit
 * Csak megjelenítés; a valódi jutalmat a szülő adja oda.
 * Magyar, kisbetű, determinisztikus. Nincs randomizálás.
 */

export type RewardCategory = 'time' | 'treat' | 'money' | 'social' | 'big';

export interface Reward {
  level: number;
  title: string;
  description: string;
  category: RewardCategory;
}

// 1–10: nagyon kicsi, gyakori – főleg idő és dicséret
// 11–30: keverék idő, kis nasi, társas
// 31–50: kevesebb de értelmesebb, 100 ft bevezetése
// 51–70: több idő, alkalmanként nasi/penz
// 71–90: nagyobb idő, 100–200 ft
// 91–100: mérföldkövek, 100. szint különleges

const R: Reward[] = [
  { level: 1, title: 'jutalom', description: '+5 perc játékidő', category: 'time' },
  { level: 2, title: 'jutalom', description: 'nagy dicséret', category: 'social' },
  { level: 3, title: 'jutalom', description: '+5 perc játékidő', category: 'time' },
  { level: 4, title: 'jutalom', description: 'közös játék veled', category: 'social' },
  { level: 5, title: 'jutalom', description: '+5 perc youtube', category: 'time' },
  { level: 6, title: 'jutalom', description: 'ölelés', category: 'social' },
  { level: 7, title: 'jutalom', description: '+5 perc játékidő', category: 'time' },
  { level: 8, title: 'jutalom', description: 'mesélj nekem', category: 'social' },
  { level: 9, title: 'jutalom', description: '+5 perc laptop', category: 'time' },
  { level: 10, title: 'jutalom', description: 'extra esti mese', category: 'social' },
  { level: 11, title: 'jutalom', description: '+10 perc játékidő', category: 'time' },
  { level: 12, title: 'jutalom', description: '1 csoki', category: 'treat' },
  { level: 13, title: 'jutalom', description: 'közös olvasás', category: 'social' },
  { level: 14, title: 'jutalom', description: '+10 perc youtube', category: 'time' },
  { level: 15, title: 'jutalom', description: 'kis nasi', category: 'treat' },
  { level: 16, title: 'jutalom', description: 'játsszunk egyet', category: 'social' },
  { level: 17, title: 'jutalom', description: '+10 perc játékidő', category: 'time' },
  { level: 18, title: 'jutalom', description: 'gyümölcs', category: 'treat' },
  { level: 19, title: 'jutalom', description: 'sétáljunk együtt', category: 'social' },
  { level: 20, title: 'jutalom', description: '+10 perc laptop', category: 'time' },
  { level: 21, title: 'jutalom', description: '1 csoki', category: 'treat' },
  { level: 22, title: 'jutalom', description: 'közös játék veled', category: 'social' },
  { level: 23, title: 'jutalom', description: '+10 perc játékidő', category: 'time' },
  { level: 24, title: 'jutalom', description: 'kis csoki', category: 'treat' },
  { level: 25, title: 'jutalom', description: 'dicséret', category: 'social' },
  { level: 26, title: 'jutalom', description: '+10 perc youtube', category: 'time' },
  { level: 27, title: 'jutalom', description: '1 nasi', category: 'treat' },
  { level: 28, title: 'jutalom', description: 'magyarázd el a napod', category: 'social' },
  { level: 29, title: 'jutalom', description: '+10 perc játékidő', category: 'time' },
  { level: 30, title: 'jutalom', description: 'extra esti mese', category: 'social' },
  { level: 31, title: 'jutalom', description: '+15 perc játékidő', category: 'time' },
  { level: 32, title: 'jutalom', description: 'sütemény', category: 'treat' },
  { level: 33, title: 'jutalom', description: 'közös játék veled', category: 'social' },
  { level: 34, title: 'jutalom', description: '+15 perc youtube', category: 'time' },
  { level: 35, title: 'jutalom', description: '100 forint', category: 'money' },
  { level: 36, title: 'jutalom', description: 'közös olvasás', category: 'social' },
  { level: 37, title: 'jutalom', description: '+15 perc játékidő', category: 'time' },
  { level: 38, title: 'jutalom', description: 'jégkrém', category: 'treat' },
  { level: 39, title: 'jutalom', description: 'különleges program veled', category: 'social' },
  { level: 40, title: 'jutalom', description: '+15 perc laptop', category: 'time' },
  { level: 41, title: 'jutalom', description: '100 forint', category: 'money' },
  { level: 42, title: 'jutalom', description: '1 csoki', category: 'treat' },
  { level: 43, title: 'jutalom', description: 'játsszunk egyet', category: 'social' },
  { level: 44, title: 'jutalom', description: '+15 perc játékidő', category: 'time' },
  { level: 45, title: 'jutalom', description: 'kedvenc nasi', category: 'treat' },
  { level: 46, title: 'jutalom', description: 'sétáljunk együtt', category: 'social' },
  { level: 47, title: 'jutalom', description: '+15 perc youtube', category: 'time' },
  { level: 48, title: 'jutalom', description: '100 forint', category: 'money' },
  { level: 49, title: 'jutalom', description: 'extra esti mese', category: 'social' },
  { level: 50, title: 'jutalom', description: '+15 perc laptop', category: 'time' },
  { level: 51, title: 'jutalom', description: '+20 perc játékidő', category: 'time' },
  { level: 52, title: 'jutalom', description: 'meleg csoki', category: 'treat' },
  { level: 53, title: 'jutalom', description: 'közös játék veled', category: 'social' },
  { level: 54, title: 'jutalom', description: '+20 perc youtube', category: 'time' },
  { level: 55, title: 'jutalom', description: '150 forint', category: 'money' },
  { level: 56, title: 'jutalom', description: 'közös olvasás', category: 'social' },
  { level: 57, title: 'jutalom', description: '+20 perc játékidő', category: 'time' },
  { level: 58, title: 'jutalom', description: '1 csoki', category: 'treat' },
  { level: 59, title: 'jutalom', description: 'különleges program veled', category: 'social' },
  { level: 60, title: 'jutalom', description: '+20 perc laptop', category: 'time' },
  { level: 61, title: 'jutalom', description: '150 forint', category: 'money' },
  { level: 62, title: 'jutalom', description: 'sütemény', category: 'treat' },
  { level: 63, title: 'jutalom', description: 'játsszunk egyet', category: 'social' },
  { level: 64, title: 'jutalom', description: '+20 perc játékidő', category: 'time' },
  { level: 65, title: 'jutalom', description: 'gyümölcs', category: 'treat' },
  { level: 66, title: 'jutalom', description: 'mesélj nekem', category: 'social' },
  { level: 67, title: 'jutalom', description: '+20 perc youtube', category: 'time' },
  { level: 68, title: 'jutalom', description: '150 forint', category: 'money' },
  { level: 69, title: 'jutalom', description: 'extra esti mese', category: 'social' },
  { level: 70, title: 'jutalom', description: '+20 perc laptop', category: 'time' },
  { level: 71, title: 'jutalom', description: '+25 perc játékidő', category: 'time' },
  { level: 72, title: 'jutalom', description: '200 forint', category: 'money' },
  { level: 73, title: 'jutalom', description: 'közös játék veled', category: 'social' },
  { level: 74, title: 'jutalom', description: '+25 perc youtube', category: 'time' },
  { level: 75, title: 'jutalom', description: 'kedvenc nasi', category: 'treat' },
  { level: 76, title: 'jutalom', description: 'közös olvasás', category: 'social' },
  { level: 77, title: 'jutalom', description: '+25 perc játékidő', category: 'time' },
  { level: 78, title: 'jutalom', description: '200 forint', category: 'money' },
  { level: 79, title: 'jutalom', description: 'különleges program veled', category: 'social' },
  { level: 80, title: 'jutalom', description: '+25 perc laptop', category: 'time' },
  { level: 81, title: 'jutalom', description: '200 forint', category: 'money' },
  { level: 82, title: 'jutalom', description: '1 csoki', category: 'treat' },
  { level: 83, title: 'jutalom', description: 'sétáljunk együtt', category: 'social' },
  { level: 84, title: 'jutalom', description: '+25 perc játékidő', category: 'time' },
  { level: 85, title: 'jutalom', description: 'jégkrém', category: 'treat' },
  { level: 86, title: 'jutalom', description: 'játsszunk egyet', category: 'social' },
  { level: 87, title: 'jutalom', description: '+25 perc youtube', category: 'time' },
  { level: 88, title: 'jutalom', description: '200 forint', category: 'money' },
  { level: 89, title: 'jutalom', description: 'extra esti mese', category: 'social' },
  { level: 90, title: 'jutalom', description: '+25 perc laptop', category: 'time' },
  { level: 91, title: 'nagy jutalom', description: 'nagy jutalom 🎁', category: 'big' },
  { level: 92, title: 'jutalom', description: 'kis játék', category: 'big' },
  { level: 93, title: 'jutalom', description: 'különleges program veled', category: 'social' },
  { level: 94, title: 'jutalom', description: 'új könyv', category: 'big' },
  { level: 95, title: 'jutalom', description: 'közös kirándulás', category: 'big' },
  { level: 96, title: 'jutalom', description: 'napi különlegesség', category: 'big' },
  { level: 97, title: 'jutalom', description: 'kívánság (szülővel egyeztetve)', category: 'big' },
  { level: 98, title: 'nagy jutalom', description: 'nagy jutalom 🎁', category: 'big' },
  { level: 99, title: 'jutalom', description: 'különleges program veled', category: 'social' },
  { level: 100, title: 'különleges jutalom', description: 'nagy jutalom 🎁 – 100. szint!', category: 'big' },
];

export const rewards: Reward[] = R;

const REWARD_MAP = new Map(R.map((r) => [r.level, r]));

export function getRewardForLevel(level: number): Reward | undefined {
  if (level < 1 || level > 100) return undefined;
  return REWARD_MAP.get(level);
}
