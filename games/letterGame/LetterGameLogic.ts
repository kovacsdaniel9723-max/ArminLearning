/**
 * Betűfelismerő játék logika
 * Újrafelhasználható játék logika funkciók
 */

import { LetterQuestion } from '../../types';
import { getRandomLetterQuestion } from './letterData';

export interface LetterGameState {
  currentQuestion: LetterQuestion | null;
  score: number;
  totalQuestions: number;
  currentQuestionIndex: number;
}

/**
 * Játék inicializálása
 */
export const initializeLetterGame = (): LetterGameState => {
  return {
    currentQuestion: getRandomLetterQuestion(),
    score: 0,
    totalQuestions: 0,
    currentQuestionIndex: 0,
  };
};

/**
 * Válasz ellenőrzése
 */
export const checkAnswer = (
  state: LetterGameState,
  selectedIndex: number
): { isCorrect: boolean; newState: LetterGameState } => {
  if (!state.currentQuestion) {
    return { isCorrect: false, newState: state };
  }

  const isCorrect = selectedIndex === state.currentQuestion.correctIndex;
  const newState: LetterGameState = {
    ...state,
    totalQuestions: state.totalQuestions + 1,
    score: isCorrect ? state.score + 1 : state.score,
    currentQuestionIndex: state.currentQuestionIndex + 1,
  };

  return { isCorrect, newState };
};

/**
 * Következő kérdés betöltése
 */
export const loadNextQuestion = (state: LetterGameState): LetterGameState => {
  return {
    ...state,
    currentQuestion: getRandomLetterQuestion(),
  };
};

/**
 * Játék újraindítása
 */
export const resetGame = (): LetterGameState => {
  return initializeLetterGame();
};
