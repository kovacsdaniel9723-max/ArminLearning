/**
 * Írásjel-vadász – csak mondatvégi írásjelek (. ! ?)
 */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SENTENCE_END_MARKS = ['.', '!', '?'];
const SENTENCES = [
  { sentence: 'Ma iskolába megyek___', missing: '.' },
  { sentence: 'Hol van a tollad___', missing: '?' },
  { sentence: 'Milyen szép az idő___', missing: '!' },
];

function pickPunctuationTask() {
  const base = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  const options = shuffle(SENTENCE_END_MARKS);
  return {
    sentence: base.sentence,
    missing: base.missing,
    options,
    correct: options.indexOf(base.missing),
  };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

for (let i = 0; i < 40; i++) {
  const task = pickPunctuationTask();
  assert(task.options.length === 3, '3 opció kell');
  task.options.forEach((opt) => assert(SENTENCE_END_MARKS.includes(opt), `tilos opció: ${opt}`));
  assert(task.options[task.correct] === task.missing, 'helyes index');
  assert(SENTENCE_END_MARKS.includes(task.missing), 'hiányzó jel mondatvégi');
  assert(task.sentence.includes('___'), '___ jelöli a hiányzó jelet');
}

console.log('magyarData punctuation tests: ok');
