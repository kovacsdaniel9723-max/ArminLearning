/**
 * 2. osztály játékmotorok – válasz kártyák (sötét téma, jó kontraszt)
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './index';

export const grade2GameStyles = StyleSheet.create({
  option: {
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: 16,
    minWidth: '40%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomWidth: 4,
    borderBottomColor: colors.primaryDark,
  },
  optionCompact: {
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: 16,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderBottomWidth: 4,
    borderBottomColor: colors.primaryDark,
  },
  optionText: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
  },
  optionTextBody: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
  },
  optionLabel: {
    ...typography.bodySmall,
    color: colors.textLight,
    fontWeight: '700',
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  prompt: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emojiHero: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  infoPanel: {
    backgroundColor: colors.backgroundLight,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  infoPanelText: {
    ...typography.bodyLarge,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
