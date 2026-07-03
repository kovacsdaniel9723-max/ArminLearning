/**
 * Aktuális játék azonosító – napi küldetés követéshez
 */

let currentGameId: string | null = null;

export function setCurrentGameId(id: string | null): void {
  currentGameId = id;
}

export function getCurrentGameId(): string | null {
  return currentGameId;
}

/** Route név + param → gameId */
export function routeToGameId(routeName: string, params?: Record<string, unknown>): string | null {
  if (routeName === 'Grade2Game' && params && typeof params.gameId === 'string') {
    return params.gameId;
  }
  if (routeName === 'TextGame' && params && typeof params.gameType === 'string') {
    return String(params.gameType);
  }
  const map: Record<string, string> = {
    LetterGame: 'letter',
    NumberGame: 'number',
    HangmanGame: 'hangman',
    VoiceGame: 'voice',
    MathAdditionGame: 'mathAddition',
    SyllableGame: 'syllable',
    ReadingGame: 'reading',
    SentenceGame: 'sentence',
    PatternGame: 'pattern',
    MathGrade2Game: 'mathGrade2',
  };
  return map[routeName] ?? null;
}
