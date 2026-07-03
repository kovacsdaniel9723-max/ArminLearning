/**
 * 2. osztály – matematika (összeadás, kivonás, szorzás, osztás)
 */

export type MathGrade2Op = 'add' | 'subtract' | 'multiply' | 'divide';

export interface MathGrade2Task {
  op: MathGrade2Op;
  a: number;
  b: number;
  answer: number;
  /** szorzás/osztás: csoportok */
  groups?: number;
  perGroup?: number;
}

const TABLES = [2, 5, 10];

function pickOp(): MathGrade2Op {
  const ops: MathGrade2Op[] = ['add', 'subtract', 'multiply', 'divide'];
  return ops[Math.floor(Math.random() * ops.length)];
}

export function generateMathGrade2Task(): MathGrade2Task {
  const op = pickOp();

  if (op === 'add') {
    const a = 10 + Math.floor(Math.random() * 26);
    const b = 2 + Math.floor(Math.random() * Math.min(12, 40 - a));
    return { op, a, b, answer: a + b };
  }

  if (op === 'subtract') {
    const a = 12 + Math.floor(Math.random() * 28);
    const b = 2 + Math.floor(Math.random() * Math.min(10, a - 8));
    return { op, a, b, answer: a - b };
  }

  const table = TABLES[Math.floor(Math.random() * TABLES.length)];

  if (op === 'multiply') {
    const b = 1 + Math.floor(Math.random() * 10);
    return { op, a: table, b, answer: table * b, groups: b, perGroup: table };
  }

  const b = 1 + Math.floor(Math.random() * 10);
  const product = table * b;
  return { op, a: product, b: table, answer: b, groups: b, perGroup: table };
}

export interface MathGrade2State {
  currentTask: MathGrade2Task | null;
  score: number;
  totalQuestions: number;
}

export function initializeMathGrade2(): MathGrade2State {
  return {
    currentTask: generateMathGrade2Task(),
    score: 0,
    totalQuestions: 0,
  };
}

export function checkMathGrade2Answer(
  state: MathGrade2State,
  answer: number
): { isCorrect: boolean; newState: MathGrade2State } {
  if (!state.currentTask) return { isCorrect: false, newState: state };
  const isCorrect = answer === state.currentTask.answer;
  return {
    isCorrect,
    newState: {
      ...state,
      totalQuestions: state.totalQuestions + 1,
      score: isCorrect ? state.score + 1 : state.score,
    },
  };
}

export function loadNextMathGrade2Task(state: MathGrade2State): MathGrade2State {
  return { ...state, currentTask: generateMathGrade2Task() };
}

export function getQuestionText(task: MathGrade2Task): string {
  switch (task.op) {
    case 'add':
      return 'hány alma van összesen?';
    case 'subtract':
      return 'hány alma marad?';
    case 'multiply':
      return `${task.b} csoport, mindegyikben ${task.perGroup} alma. hány alma van összesen?`;
    case 'divide':
      return `${task.a} alma van. csoportonként ${task.perGroup} alma. hány csoport lesz?`;
    default:
      return 'mennyi az eredmény?';
  }
}

export function getAnswerOptions(task: MathGrade2Task): number[] {
  const correct = task.answer;
  const opts = new Set<number>([correct]);
  while (opts.size < 4) {
    const delta = Math.floor(Math.random() * 11) - 5;
    const v = Math.max(0, correct + delta);
    if (v !== correct) opts.add(v);
  }
  return [...opts].sort(() => Math.random() - 0.5);
}
