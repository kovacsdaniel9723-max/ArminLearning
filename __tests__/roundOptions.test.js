/**
 * Válaszopció generátor – alap tesztek (roundOptions.ts tükör)
 */

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildUniqueNumberOptions(correct, count = 4, candidates = []) {
  const opts = new Set([correct]);
  for (const v of candidates) {
    if (v > 0 && v !== correct) opts.add(v);
    if (opts.size >= count) break;
  }
  let delta = 1;
  while (opts.size < count && delta < 50) {
    if (correct + delta > 0) opts.add(correct + delta);
    if (opts.size < count && correct - delta > 0) opts.add(correct - delta);
    delta++;
  }
  const options = shuffleArray([...opts].slice(0, count));
  return { options, correctIdx: options.indexOf(correct) };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

for (let i = 0; i < 30; i++) {
  const { options, correctIdx } = buildUniqueNumberOptions(20, 4, [18, 22, 24, 10]);
  assert(options.length === 4, '4 opció kell');
  assert(new Set(options).size === 4, 'minden opció egyedi');
  assert(options[correctIdx] === 20, 'helyes index');
  assert(options.every((v) => v > 0), 'pozitív számok');
}

console.log('roundOptions tests: ok');
