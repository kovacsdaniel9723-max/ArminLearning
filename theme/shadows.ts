/**
 * Árnyékok és „neon glow” – web + natív
 */

import { Platform } from 'react-native';

export const shadows = {
  card: Platform.select({
    web: { boxShadow: '0 4px 20px rgba(0, 212, 255, 0.15)' } as object,
    default: {
      shadowColor: '#00D4FF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    },
  }),
  button: Platform.select({
    web: { boxShadow: '0 6px 0 #0099CC, 0 8px 16px rgba(0,0,0,0.35)' } as object,
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
      elevation: 5,
    },
  }),
  glow: (color: string) =>
    Platform.select({
      web: { boxShadow: `0 0 16px ${color}55` } as object,
      default: {
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 4,
      },
    }),
};
