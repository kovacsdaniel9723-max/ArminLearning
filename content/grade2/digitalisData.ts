/**
 * 2. osztály – digitális kultúra tartalom
 */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface NetSafetyStep {
  text: string;
  choices: { label: string; emoji: string; safe: boolean }[];
}

export const NET_SAFETY_STORY: NetSafetyStep[] = [
  {
    text: 'egy idegen ír neked online. mit teszel?',
    choices: [
      { label: 'megmondom anyának', emoji: '👩', safe: true },
      { label: 'elmondom a címem', emoji: '🏠', safe: false },
      { label: 'találkozom vele', emoji: '🚶', safe: false },
    ],
  },
  {
    text: 'valaki jelszót kér. mit teszel?',
    choices: [
      { label: 'nem adom oda', emoji: '🔒', safe: true },
      { label: 'odaadom', emoji: '🔑', safe: false },
      { label: 'beírom a chatbe', emoji: '💬', safe: false },
    ],
  },
  {
    text: 'furcsa kép jelenik meg. mit teszel?',
    choices: [
      { label: 'bezárás és szülő', emoji: '❌', safe: true },
      { label: 'rákattintok', emoji: '👆', safe: false },
      { label: 'továbbküldöm', emoji: '📤', safe: false },
    ],
  },
  {
    text: 'sokáig néznéd a tabletet. mit teszel?',
    choices: [
      { label: 'szünet és mozgás', emoji: '🏃', safe: true },
      { label: 'még egy órát', emoji: '📱', safe: false },
      { label: 'éjjel is', emoji: '🌙', safe: false },
    ],
  },
];

export function pickNetSafetyStep(): NetSafetyStep {
  const step = NET_SAFETY_STORY[Math.floor(Math.random() * NET_SAFETY_STORY.length)];
  return { ...step, choices: shuffle(step.choices) };
}

export const DRAWING_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#4A90E2', '#FFB84D', '#9B59B6', '#2ECC71'];

export const DRAWING_STAMPS = ['⭐', '❤️', '🌸', '🐱', '🌈', '☀️', '🎈', '🦋'];

export const COLLAGE_SHAPES = [
  { shape: 'négyzet', color: '#FF6B6B' },
  { shape: 'kör', color: '#4ECDC4' },
  { shape: 'háromszög', color: '#FFE66D' },
  { shape: 'téglalap', color: '#4A90E2' },
];

export { shuffle };
