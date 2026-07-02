/**
 * Jutalom logika – alap tesztek (determinisztikus)
 * Futtatás: npx tsc --noEmit && node __tests__/rewardLogic.test.js (build után)
 * vagy közvetlenül a tiszta függvények másolata alább.
 */

const ANSWERS_PER_LEVEL = 20;
const MAX_LEVEL = 100;

function getLevelFromAnswers(totalCorrectAnswers) {
  const raw = Math.floor(totalCorrectAnswers / ANSWERS_PER_LEVEL);
  return Math.min(MAX_LEVEL, raw);
}

function getProgressTowardNextLevel(totalCorrectAnswers) {
  const required = ANSWERS_PER_LEVEL;
  if (getLevelFromAnswers(totalCorrectAnswers) >= MAX_LEVEL) {
    return { current: required, required };
  }
  return { current: totalCorrectAnswers % ANSWERS_PER_LEVEL, required };
}

function hasLeveledUp(previousAnswers, currentAnswers) {
  const prevLevel = getLevelFromAnswers(previousAnswers);
  const currLevel = getLevelFromAnswers(currentAnswers);
  return currLevel > prevLevel && currLevel >= 1;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

assert(getLevelFromAnswers(0) === 0, '0 válasz → 0 szint');
assert(getLevelFromAnswers(19) === 0, '19 válasz → 0 szint');
assert(getLevelFromAnswers(20) === 1, '20 válasz → 1 szint');
assert(getLevelFromAnswers(2000) === 100, 'max 100 szint');
assert(getProgressTowardNextLevel(25).current === 5, '25 válasz → 5/20 progress');
assert(hasLeveledUp(19, 20) === true, 'szintlépés 19→20');
assert(hasLeveledUp(20, 21) === false, 'nincs szintlépés 20→21');

console.log('rewardLogic tests: ok');
