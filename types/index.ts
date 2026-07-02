/**
 * TypeScript típusok
 * Központi típus definíciók
 */

// Játék típusok
export type GameType = 
  | 'letter' 
  | 'number' 
  | 'wordPicture' 
  | 'missingLetter' 
  | 'firstLetter' 
  | 'voice'
  | 'mathAddition';

// Betűfelismerő játék
export interface LetterQuestion {
  letter: string;
  options: Array<{ image?: string; word: string }>;
  correctIndex: number;
}

// Számfelismerő játék
export interface NumberQuestion {
  number: number;
  iconGroups: Array<{ count: number; icons: string[] }>;
  correctIndex: number;
}

// Szövegalapú játékok
export interface WordPictureQuestion {
  image: string;
  words: string[];
  correctIndex: number;
}

export interface MissingLetterQuestion {
  word: string;
  missingIndex: number;
  options: string[];
  correctIndex: number;
}

export interface FirstLetterQuestion {
  image: string;
  word: string;
  options: string[];
  correctIndex: number;
}

// Statisztikák
export interface GameStats {
  gamesPlayed: number;
  correctAnswers: number;
  totalAnswers: number;
  playTimeToday: number; // másodpercekben
  lastPlayed?: Date;
}

// Szülői beállítások
export interface ParentSettings {
  dailyPlaytimeLimit: number; // másodpercekben (pl. 600 = 10 perc)
  pin: string; // hardcoded PIN
}

// Navigáció
export type RootStackParamList = {
  GradeSelection: undefined;
  Home: undefined;
  GameSelection: undefined;
  LetterGame: undefined;
  NumberGame: undefined;
  TextGame: { gameType: 'wordPicture' | 'missingLetter' | 'firstLetter' };
  HangmanGame: undefined;
  VoiceGame: undefined;
  MathAdditionGame: undefined;
  SyllableGame: undefined;
  ReadingGame: undefined;
  SentenceGame: undefined;
  PatternGame: undefined;
  MathGrade2Game: undefined;
  Parent: undefined;
  Rewards: undefined;
};
