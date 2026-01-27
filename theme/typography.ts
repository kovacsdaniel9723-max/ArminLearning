/**
 * Typography rendszer
 * Nagy, olvasható betűtípusok gyerekeknek
 */

export const typography = {
  // Címsorok
  h1: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    lineHeight: 44,
    letterSpacing: 0,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    lineHeight: 36,
    letterSpacing: 0,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: 0,
  },
  
  // Szöveg
  body: {
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: 20,
    fontWeight: '400' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  
  // Gombok
  button: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  buttonLarge: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: 0.5,
  },
  
  // Játék specifikus
  gameLetter: {
    fontSize: 120,
    fontWeight: 'bold' as const,
    lineHeight: 140,
    letterSpacing: 0,
  },
  gameNumber: {
    fontSize: 100,
    fontWeight: 'bold' as const,
    lineHeight: 120,
    letterSpacing: 0,
  },
  gameWord: {
    fontSize: 32,
    fontWeight: '600' as const,
    lineHeight: 40,
    letterSpacing: 1,
  },
};
