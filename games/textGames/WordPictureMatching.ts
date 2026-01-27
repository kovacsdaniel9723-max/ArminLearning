/**
 * Word-Picture Matching játék logika
 * 
 * Használja a wordData.ts-ből a WORDS listát
 */

import { WordPictureQuestion } from '../../types';
import { getRandomWordPictureQuestion } from './textGameData';
import { WORDS } from './wordData';

export interface WordPictureGameState {
  currentQuestion: WordPictureQuestion | null;
  score: number;
  totalQuestions: number;
}

export const initializeWordPictureGame = (): WordPictureGameState => {
  return {
    currentQuestion: getRandomWordPictureQuestion(),
    score: 0,
    totalQuestions: 0,
  };
};

export const checkAnswer = (
  state: WordPictureGameState,
  selectedIndex: number
): { isCorrect: boolean; newState: WordPictureGameState } => {
  if (!state.currentQuestion) {
    return { isCorrect: false, newState: state };
  }

  const isCorrect = selectedIndex === state.currentQuestion.correctIndex;
  const newState: WordPictureGameState = {
    ...state,
    totalQuestions: state.totalQuestions + 1,
    score: isCorrect ? state.score + 1 : state.score,
  };

  return { isCorrect, newState };
};

export const loadNextQuestion = (state: WordPictureGameState): WordPictureGameState => {
  return {
    ...state,
    currentQuestion: getRandomWordPictureQuestion(),
  };
};
