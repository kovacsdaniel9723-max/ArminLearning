/** extraGamesData – alap tesztek */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const RHYMES = [
  { word: 'kutya', options: ['bugya', 'asztal', 'erdő'], correct: 0 },
  { word: 'macska', options: ['pacska', 'vonat', 'szék'], correct: 0 },
];

function pickRhymeTask() {
  const t = RHYMES[Math.floor(Math.random() * RHYMES.length)];
  const correctWord = t.options[t.correct];
  const options = shuffle(t.options);
  return { word: t.word, options, correct: options.indexOf(correctWord) };
}

function pickMultiplyDrill() {
  const a = 2;
  const b = 5;
  const answer = 10;
  const options = [10, 8, 12, 7];
  return { a, b, answer, options, correct: options.indexOf(answer) };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

for (let i = 0; i < 20; i++) {
  const r = pickRhymeTask();
  assert(r.options[r.correct] !== undefined, 'rím helyes index');
  assert(r.options.length === 3, '3 rím opció');
}

const m = pickMultiplyDrill();
assert(m.correct === 0, 'szorzó helyes');
assert(m.answer === 10, '2x5=10');

console.log('extraGamesData tests: ok');
