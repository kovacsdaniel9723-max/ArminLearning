/**
 * 2. osztály – magyar nyelv tartalom
 */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface StoryQuiz {
  story: string;
  questions: { q: string; options: { emoji: string; label: string }[]; correct: number }[];
}

const STORIES: StoryQuiz[] = [
  {
    story: 'a kis nyúl reggel kiment az erdőbe. talált egy nagy sárga répát. hazavitte anyukájának.',
    questions: [
      { q: 'ki a főszereplő?', options: [{ emoji: '🐰', label: 'nyúl' }, { emoji: '🐻', label: 'medve' }, { emoji: '🦊', label: 'róka' }], correct: 0 },
      { q: 'hol játszódik a mese?', options: [{ emoji: '🏠', label: 'otthon' }, { emoji: '🌲', label: 'erdő' }, { emoji: '🏫', label: 'iskola' }], correct: 1 },
      { q: 'mit talált?', options: [{ emoji: '🥕', label: 'répa' }, { emoji: '🍎', label: 'alma' }, { emoji: '🍞', label: 'kenyér' }], correct: 0 },
    ],
  },
  {
    story: 'panni és bence a parkban játszottak. labdáztak, aztán ettek egy fagyit. este hazamentek.',
    questions: [
      { q: 'kik játszottak?', options: [{ emoji: '👧👦', label: 'panni és bence' }, { emoji: '👴', label: 'nagypapa' }, { emoji: '🐕', label: 'kutya' }], correct: 0 },
      { q: 'hol voltak?', options: [{ emoji: '🌳', label: 'park' }, { emoji: '🏊', label: 'strand' }, { emoji: '🏪', label: 'bolt' }], correct: 0 },
      { q: 'mit ettek?', options: [{ emoji: '🍦', label: 'fagyi' }, { emoji: '🍕', label: 'pizza' }, { emoji: '🥣', label: 'leves' }], correct: 0 },
    ],
  },
];

export function pickStoryQuiz(): StoryQuiz {
  const s = STORIES[Math.floor(Math.random() * STORIES.length)];
  const qi = Math.floor(Math.random() * s.questions.length);
  return { story: s.story, questions: [s.questions[qi]] };
}

export interface PunctuationTask {
  sentence: string;
  missing: string;
  options: string[];
  correct: number;
}

const SENTENCE_END_MARKS = ['.', '!', '?'] as const;
type SentenceEndMark = (typeof SENTENCE_END_MARKS)[number];

/** Csak mondatvégi írásjel hiányzik – pont, felkiáltó, kérdő */
const PUNCTUATION_SENTENCES: { sentence: string; missing: SentenceEndMark }[] = [
  { sentence: 'Ma iskolába megyek___', missing: '.' },
  { sentence: 'A kutya az udvaron játszik___', missing: '.' },
  { sentence: 'Este mesét olvasunk___', missing: '.' },
  { sentence: 'Szeretek rajzolni___', missing: '.' },
  { sentence: 'Milyen szép az idő___', missing: '!' },
  { sentence: 'Figyelj rám___', missing: '!' },
  { sentence: 'Ne szaladj az utcán___', missing: '!' },
  { sentence: 'Milyen jó ez a játék___', missing: '!' },
  { sentence: 'Hol van a tollad___', missing: '?' },
  { sentence: 'Mikor jön a vonat___', missing: '?' },
  { sentence: 'Ki hívogat___', missing: '?' },
  { sentence: 'Hány alma van a kosárban___', missing: '?' },
];

export function pickPunctuationTask(): PunctuationTask {
  const base = PUNCTUATION_SENTENCES[Math.floor(Math.random() * PUNCTUATION_SENTENCES.length)];
  const options = shuffle([...SENTENCE_END_MARKS]);
  return {
    sentence: base.sentence,
    missing: base.missing,
    options: [...options],
    correct: options.indexOf(base.missing),
  };
}

export interface SortWord {
  word: string;
  category: 'főnév' | 'ige' | 'melléknév';
}

const SZOFAJ: SortWord[] = [
  { word: 'ház', category: 'főnév' },
  { word: 'fut', category: 'ige' },
  { word: 'szép', category: 'melléknév' },
  { word: 'iskola', category: 'főnév' },
  { word: 'olvas', category: 'ige' },
  { word: 'nagy', category: 'melléknév' },
  { word: 'kutya', category: 'főnév' },
  { word: 'eszik', category: 'ige' },
  { word: 'vidám', category: 'melléknév' },
  { word: 'toll', category: 'főnév' },
  { word: 'ír', category: 'ige' },
  { word: 'okos', category: 'melléknév' },
];

export function pickSortWords(count = 4): SortWord[] {
  return shuffle(SZOFAJ).slice(0, count);
}

export const SZOFAJ_CATEGORIES = ['főnév', 'ige', 'melléknév'] as const;

export interface MemoryPair {
  id: string;
  text: string;
  type: string;
  typeEmoji: string;
}

const MONDATFAJTA: MemoryPair[] = [
  { id: '1', text: 'Ma suli van.', type: 'kijelentő', typeEmoji: '📢' },
  { id: '2', text: 'Hol a kabátod?', type: 'kérdő', typeEmoji: '❓' },
  { id: '3', text: 'Ülj le!', type: 'felszólító', typeEmoji: '👉' },
  { id: '4', text: 'Szép az idő.', type: 'kijelentő', typeEmoji: '📢' },
  { id: '5', text: 'Mikor jössz?', type: 'kérdő', typeEmoji: '❓' },
  { id: '6', text: 'Nyisd ki!', type: 'felszólító', typeEmoji: '👉' },
];

export function pickMemoryPair(): { sentence: MemoryPair; type: MemoryPair } {
  const s = MONDATFAJTA[Math.floor(Math.random() * MONDATFAJTA.length)];
  const t = MONDATFAJTA.find((m) => m.type === s.type && m.id !== s.id) ?? s;
  return { sentence: s, type: t };
}

export interface ScaffoldPrompt {
  theme: string;
  slots: { prompt: string; options: string[]; correct: number }[];
}

const SCAFFOLDS: ScaffoldPrompt[] = [
  {
    theme: 'egy nap a parkban',
    slots: [
      { prompt: 'reggel…', options: ['suli volt', 'a parkba mentem', 'aludtam egész nap'], correct: 1 },
      { prompt: 'ott…', options: ['labdáztam', 'alvás volt', 'főztem levest'], correct: 0 },
      { prompt: 'délután…', options: ['hazamentem', 'repültem', 'úsztam a tengerben'], correct: 0 },
    ],
  },
  {
    theme: 'a kedvenc állatom',
    slots: [
      { prompt: 'a kedvenc állatom…', options: ['egy kutya', 'egy autó', 'egy ház'], correct: 0 },
      { prompt: 'szeret…', options: ['játszani velem', 'repülni az égen', 'főzni'], correct: 0 },
      { prompt: 'este…', options: ['együtt pihenünk', 'repülünk', 'matekot tanítunk'], correct: 0 },
    ],
  },
];

export function pickScaffold(): ScaffoldPrompt {
  return SCAFFOLDS[Math.floor(Math.random() * SCAFFOLDS.length)];
}

export { shuffle };
