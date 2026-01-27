/**
 * Számfelismerő játék logika
 * Újrafelhasználható logika jövőbeli matematikai játékokhoz
 */

import { NumberQuestion } from '../../types';
import { getRandomNumberQuestion } from './numberData';

export interface NumberGameState {
  currentQuestion: NumberQuestion | null;
  score: number;
  totalQuestions: number;
}

/**
 * Játék inicializálása
 */
export const initializeNumberGame = (): NumberGameState => {
  return {
    currentQuestion: getRandomNumberQuestion(),
    score: 0,
    totalQuestions: 0,
  };
};

/**
 * Válasz ellenőrzése
 */
export const checkAnswer = (
  state: NumberGameState,
  selectedIndex: number
): { isCorrect: boolean; newState: NumberGameState } => {
  if (!state.currentQuestion) {
    return { isCorrect: false, newState: state };
  }

  const isCorrect = selectedIndex === state.currentQuestion.correctIndex;
  const newState: NumberGameState = {
    ...state,
    totalQuestions: state.totalQuestions + 1,
    score: isCorrect ? state.score + 1 : state.score,
  };

  return { isCorrect, newState };
};

/**
 * Következő kérdés betöltése
 */
export const loadNextQuestion = (state: NumberGameState): NumberGameState => {
  return {
    ...state,
    currentQuestion: getRandomNumberQuestion(),
  };
};

/**
 * Játék újraindítása
 */
export const resetGame = (): NumberGameState => {
  return initializeNumberGame();
};
