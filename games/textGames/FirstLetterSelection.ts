/**
 * First Letter Selection játék logika
 * 
 * Használja a wordData.ts-ből a WORDS listát
 */

import { FirstLetterQuestion } from '../../types';
import { getRandomFirstLetterQuestion } from './textGameData';
import { WORDS } from './wordData';

export interface FirstLetterGameState {
  currentQuestion: FirstLetterQuestion | null;
  score: number;
  totalQuestions: number;
}

export const initializeFirstLetterGame = (): FirstLetterGameState => {
  return {
    currentQuestion: getRandomFirstLetterQuestion(),
    score: 0,
    totalQuestions: 0,
  };
};

export const checkAnswer = (
  state: FirstLetterGameState,
  selectedIndex: number
): { isCorrect: boolean; newState: FirstLetterGameState } => {
  if (!state.currentQuestion) {
    return { isCorrect: false, newState: state };
  }

  const isCorrect = selectedIndex === state.currentQuestion.correctIndex;
  const newState: FirstLetterGameState = {
    ...state,
    totalQuestions: state.totalQuestions + 1,
    score: isCorrect ? state.score + 1 : state.score,
  };

  return { isCorrect, newState };
};

export const loadNextQuestion = (state: FirstLetterGameState): FirstLetterGameState => {
  return {
    ...state,
    currentQuestion: getRandomFirstLetterQuestion(),
  };
};
