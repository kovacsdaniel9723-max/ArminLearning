/**
 * 2. osztály játékmotorok – világos válasz + sötét infó panel (jó kontraszt)
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './index';

export const grade2GameStyles = StyleSheet.create({
  /** Világos „válasz gomb” – a legfontosabb interakció */
  option: {
    backgroundColor: colors.panelLight,
    padding: spacing.md,
    borderRadius: 18,
    minWidth: '40%',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
    borderBottomWidth: 5,
    borderBottomColor: colors.primaryDark,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  optionCompact: {
    backgroundColor: colors.panelLight,
    padding: spacing.md,
    borderRadius: 18,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.secondary,
    borderBottomWidth: 5,
    borderBottomColor: colors.secondaryDark,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  optionText: {
    ...typography.h3,
    color: colors.textOnLight,
    fontWeight: '800',
    textAlign: 'center',
  },
  optionTextBody: {
    ...typography.body,
    color: colors.textOnLight,
    fontWeight: '800',
    textAlign: 'center',
  },
  optionLabel: {
    ...typography.bodySmall,
    color: colors.textOnLightMuted,
    fontWeight: '700',
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  /** Sötét infó doboz – mondat, feladat szövege */
  promptBanner: {
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: 18,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
    borderLeftWidth: 6,
    borderLeftColor: colors.accent,
  },
  prompt: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 0,
    fontWeight: '800',
  },
  subtitle: {
    ...typography.body,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  emojiHero: {
    fontSize: 72,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  infoPanel: {
    backgroundColor: colors.cardBackground,
    padding: spacing.lg,
    borderRadius: 20,
    marginBottom: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomWidth: 4,
    borderBottomColor: colors.primaryDark,
  },
  infoPanelText: {
    ...typography.bodyLarge,
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },
});
