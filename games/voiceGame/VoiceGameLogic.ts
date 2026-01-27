/**
 * Voice Game Logic
 * Hangaktivált játék logika (V1 - Fake Voice)
 * 
 * FONTOS: Ez a verzió NEM elemezi a beszélt tartalmat.
 * Csak hang detektálást végez (hangerő + időtartam).
 */

export interface VoiceGameState {
  currentLetterOrWord: string;
  isListening: boolean;
  score: number;
  totalQuestions: number;
  currentQuestionIndex: number;
}

import { getRandomVoiceItem } from './voiceGameData';

/**
 * Játék inicializálása
 */
export const initializeVoiceGame = (): VoiceGameState => {
  const item = getRandomVoiceItem();
  return {
    currentLetterOrWord: item.letter,
    isListening: false,
    score: 0,
    totalQuestions: 0,
    currentQuestionIndex: 0,
  };
};

/**
 * Véletlenszerű betű vagy szó kiválasztása
 */
export const getRandomLetterOrWord = (): string => {
  const item = getRandomVoiceItem();
  return item.letter;
};

/**
 * Válasz ellenőrzése (V1 - csak hang detektálás)
 * 
 * FONTOS: Ez a verzió NEM ellenőrzi, hogy a gyerek
 * helyesen mondta-e ki a betűt vagy szót.
 * Csak azt ellenőrzi, hogy volt-e hang és elég hosszú volt-e.
 */
export const checkAnswer = (
  state: VoiceGameState,
  soundDetected: boolean
): { isCorrect: boolean; newState: VoiceGameState } => {
  // V1-ben mindig pozitív visszajelzést adunk, ha volt hang
  const isCorrect = soundDetected;
  
  const newState: VoiceGameState = {
    ...state,
    totalQuestions: state.totalQuestions + 1,
    score: isCorrect ? state.score + 1 : state.score,
    currentQuestionIndex: state.currentQuestionIndex + 1,
    isListening: false,
  };

  return { isCorrect, newState };
};

/**
 * Következő kérdés betöltése
 */
export const loadNextQuestion = (state: VoiceGameState): VoiceGameState => {
  const item = getRandomVoiceItem();
  return {
    ...state,
    currentLetterOrWord: item.letter,
    isListening: false,
  };
};

/**
 * Játék újraindítása
 */
export const resetGame = (): VoiceGameState => {
  return initializeVoiceGame();
};
