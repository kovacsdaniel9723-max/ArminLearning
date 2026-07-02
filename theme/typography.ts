/**
 * Typography – vastag, jól olvasható, játékos
 */

export const typography = {
  h1: {
    fontSize: 34,
    fontWeight: '800' as const,
    lineHeight: 42,
    letterSpacing: 0.5,
  },
  h2: {
    fontSize: 26,
    fontWeight: '800' as const,
    lineHeight: 34,
    letterSpacing: 0.3,
  },
  h3: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 30,
    letterSpacing: 0.2,
  },
  body: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: 20,
    fontWeight: '500' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  button: {
    fontSize: 20,
    fontWeight: '800' as const,
    lineHeight: 28,
    letterSpacing: 0.8,
  },
  buttonLarge: {
    fontSize: 24,
    fontWeight: '800' as const,
    lineHeight: 32,
    letterSpacing: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '700' as const,
    lineHeight: 18,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  gameLetter: {
    fontSize: 112,
    fontWeight: '800' as const,
    lineHeight: 130,
    letterSpacing: 0,
  },
  gameNumber: {
    fontSize: 96,
    fontWeight: '800' as const,
    lineHeight: 112,
    letterSpacing: 0,
  },
  gameWord: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: 0.5,
  },
};
