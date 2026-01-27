/**
 * Missing Letter játék logika
 * 
 * Használja a textGameData.ts-ből a missingLetterQuestions listát
 */

import { MissingLetterQuestion } from '../../types';
import { getRandomMissingLetterQuestion } from './textGameData';

export interface MissingLetterGameState {
  currentQuestion: MissingLetterQuestion | null;
  score: number;
  totalQuestions: number;
}

export const initializeMissingLetterGame = (): MissingLetterGameState => {
  return {
    currentQuestion: getRandomMissingLetterQuestion(),
    score: 0,
    totalQuestions: 0,
  };
};

export const checkAnswer = (
  state: MissingLetterGameState,
  selectedIndex: number
): { isCorrect: boolean; newState: MissingLetterGameState } => {
  if (!state.currentQuestion) {
    return { isCorrect: false, newState: state };
  }

  const isCorrect = selectedIndex === state.currentQuestion.correctIndex;
  const newState: MissingLetterGameState = {
    ...state,
    totalQuestions: state.totalQuestions + 1,
    score: isCorrect ? state.score + 1 : state.score,
  };

  return { isCorrect, newState };
};

export const loadNextQuestion = (state: MissingLetterGameState): MissingLetterGameState => {
  return {
    ...state,
    currentQuestion: getRandomMissingLetterQuestion(),
  };
};

/**
 * Hiányzó betűvel rendelkező szó formázása
 * 
 * MEGJEGYZÉS: A word már tartalmazza az aláhúzásokat (pl. "B_A", "C_C_A")
 * Ezért csak visszaadjuk a word-ot, esetleg formázva szóközökkel a jobb olvashatóságért
 */
export const formatWordWithMissingLetter = (question: MissingLetterQuestion): string => {
  // A word már tartalmazza az aláhúzásokat, csak szóközöket adunk hozzá a jobb olvashatóságért
  return question.word.split('').join(' ');
};
