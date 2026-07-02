/**
 * Összeadás játék logika
 * Véletlen feladatok: a + b, ahol a >= 1, b >= 1, a + b <= 10
 */

export interface AdditionTask {
  a: number;
  b: number;
  sum: number;
}

export interface MathAdditionState {
  currentTask: AdditionTask | null;
  score: number;
  totalQuestions: number;
}

const MIN = 1;
const MAX_SUM = 10;

/**
 * Véletlen feladat generálása.
 * a >= 1, b >= 1, a + b <= 10.
 * Összesen 45 lehetséges (a,b) pár: a 1..9, b 1..(10-a).
 */
export function generateTask(): AdditionTask {
  const a = MIN + Math.floor(Math.random() * (MAX_SUM - MIN)); // 1..9
  const maxB = MAX_SUM - a; // 1..(10-a)
  const b = MIN + Math.floor(Math.random() * maxB); // 1..maxB
  return { a, b, sum: a + b };
}

/**
 * Játék inicializálása
 */
export function initializeMathAddition(): MathAdditionState {
  return {
    currentTask: generateTask(),
    score: 0,
    totalQuestions: 0,
  };
}

/**
 * Válasz ellenőrzése (a megadott szám egyezik-e a helyes összeggel)
 */
export function checkAnswer(
  state: MathAdditionState,
  answer: number
): { isCorrect: boolean; newState: MathAdditionState } {
  if (!state.currentTask) {
    return { isCorrect: false, newState: state };
  }

  const isCorrect = answer === state.currentTask.sum;
  const newState: MathAdditionState = {
    ...state,
    totalQuestions: state.totalQuestions + 1,
    score: isCorrect ? state.score + 1 : state.score,
  };

  return { isCorrect, newState };
}

/**
 * Következő feladat betöltése (új véletlen a + b)
 */
export function loadNextTask(state: MathAdditionState): MathAdditionState {
  return {
    ...state,
    currentTask: generateTask(),
  };
}

/**
 * Játék újraindítása
 */
export function resetGame(): MathAdditionState {
  return initializeMathAddition();
}
