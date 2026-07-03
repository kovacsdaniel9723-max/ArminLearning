/**
 * Közös stílusok klasszikus játék képernyőkhöz
 */

import { StyleSheet } from 'react-native';
import { colors, spacing, typography, shadows } from './index';

export const classicGameStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  content: { flex: 1, padding: spacing.screenPadding },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { ...typography.h3, color: colors.textLight },

  screenTitle: {
    ...typography.h2,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  scorePill: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  scorePillAccent: {
    borderColor: colors.accent,
  },
  scoreText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '800',
  },
  scoreTextAccent: {
    color: colors.accent,
  },

  heroBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
    minHeight: 160,
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors.primary,
    padding: spacing.lg,
    ...shadows.glow(colors.primary),
  },
  heroLetter: {
    ...typography.gameLetter,
    color: colors.primary,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  heroNumber: {
    ...typography.gameNumber,
    color: colors.secondary,
    textShadowColor: colors.secondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  heroWord: {
    ...typography.gameWord,
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 6,
  },
  heroText: {
    ...typography.bodyLarge,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '600',
  },

  optionsList: { gap: spacing.sm, marginTop: spacing.md },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },

  optionBtn: {
    backgroundColor: colors.panelLight,
    borderRadius: 18,
    padding: spacing.md,
    minHeight: spacing.touchTargetMin,
    justifyContent: 'center',
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
  optionBtnDisabled: { opacity: 0.4 },
  optionBtnUsed: {
    opacity: 0.35,
    borderColor: colors.grayLight,
    borderBottomColor: colors.gray,
  },
  optionText: {
    ...typography.h3,
    color: colors.textOnLight,
    fontWeight: '800',
    textAlign: 'center',
  },
  optionTextSmall: {
    ...typography.body,
    color: colors.textOnLight,
    fontWeight: '800',
    textAlign: 'center',
  },

  letterGridBtn: {
    width: 56,
    height: 56,
    backgroundColor: colors.panelLight,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: colors.primary,
    borderBottomWidth: 4,
    borderBottomColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterGridText: {
    ...typography.button,
    fontSize: 24,
    color: colors.textOnLight,
    fontWeight: '900',
  },

  actionBtn: {
    alignSelf: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.accentDark,
    borderBottomWidth: 4,
    marginVertical: spacing.md,
  },
  actionBtnSecondary: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondaryDark,
  },
  actionBtnText: {
    ...typography.button,
    color: colors.backgroundDark,
    fontWeight: '800',
  },
  actionBtnTextLight: {
    color: colors.white,
  },

  prompt: {
    ...typography.body,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
});
