/**
 * Hangman (Építsük meg a robotot!) játék típusai
 */

export type HangmanState = {
  word: string;
  guessedLetters: string[];
  wrongGuesses: number;
  maxWrong: number;
  hintRevealedFirst?: boolean;
  hintRevealedRandom?: string[];
};

export type HangmanGamePhase = 'playing' | 'won' | 'finished';

export type RobotPartKey =
  | 'base'
  | 'torso_lower'
  | 'torso_upper'
  | 'head'
  | 'eyes'
  | 'mouth'
  | 'arm_left_upper'
  | 'arm_left_lower'
  | 'arm_right_upper'
  | 'arm_right_lower'
  | 'legs'
  | 'antenna';
