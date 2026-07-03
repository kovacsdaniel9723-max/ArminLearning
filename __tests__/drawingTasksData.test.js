/** drawingTasksData – alap tesztek */

const DRAWING_TASKS = [
  { id: 'csalad', prompt: 'rajzold le a családodat!', emoji: '👨‍👩‍👧', minStrokes: 10 },
  { id: 'erdo', prompt: 'rajzolj egy erdőt!', emoji: '🌲', minStrokes: 8 },
  { id: 'haz', prompt: 'rajzolj egy házat!', emoji: '🏠', minStrokes: 8 },
  { id: 'dinnye', prompt: 'rajzolj egy dinnyét!', emoji: '🍉', minStrokes: 6 },
];

function pickDrawingTask(excludeId) {
  const pool = excludeId ? DRAWING_TASKS.filter((t) => t.id !== excludeId) : DRAWING_TASKS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

for (let i = 0; i < 30; i++) {
  const t = pickDrawingTask();
  assert(t.prompt.length > 5, 'legyen feladat szöveg');
  assert(t.minStrokes >= 4, 'minStrokes ésszerű');
}

const next = pickDrawingTask('csalad');
assert(next.id !== 'csalad', 'exclude működik');

console.log('drawingTasksData tests: ok');
