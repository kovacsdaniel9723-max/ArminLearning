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
 * A word mezőben a teljes szó van (pl. "béka"), és a missingIndex mutatja,
 * hogy melyik betű hiányzik. Csak az adott indexű betűt cseréljük "_"-re.
 */
export const formatWordWithMissingLetter = (question: MissingLetterQuestion): string => {
  const word = question.word;
  const missingIndex = question.missingIndex;
  
  // Szó karakterekre bontása (hogy az ékezetes betűk is helyesen működjenek)
  const chars = Array.from(word);
  
  // Csak a hiányzó betű indexén cseréljük "_"-re
  const maskedChars = chars.map((char, index) => 
    index === missingIndex ? '_' : char
  );
  
  // Szóközökkel elválasztva visszaadás (olvashatóságért)
  return maskedChars.join(' ');
};
