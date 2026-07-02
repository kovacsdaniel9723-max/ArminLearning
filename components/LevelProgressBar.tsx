/**
 * Szint és haladás megjelenítése
 * Gyerekbarát, nagy szöveg, nyugodt stílus.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';
import {
  getLevelFromAnswers,
  getProgressTowardNextLevel,
  getTotalCorrectAnswers,
} from '../rewards/RewardLogic';

interface LevelProgressBarProps {
  /** Ha megadva, ezt használja (pl. frissítés után); különben async betölti */
  totalCorrectAnswers?: number;
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ totalCorrectAnswers: propTotal }) => {
  const [level, setLevel] = useState<number>(0);
  const [progress, setProgress] = useState<{ current: number; required: number }>({ current: 0, required: 20 });

  useEffect(() => {
    if (propTotal !== undefined) {
      setLevel(getLevelFromAnswers(propTotal));
      setProgress(getProgressTowardNextLevel(propTotal));
      return;
    }
    let cancelled = false;
    (async () => {
      const total = await getTotalCorrectAnswers();
      if (cancelled) return;
      setLevel(getLevelFromAnswers(total));
      setProgress(getProgressTowardNextLevel(total));
    })();
    return () => { cancelled = true; };
  }, [propTotal]);

  const progressPercent = progress.required > 0 ? (progress.current / progress.required) * 100 : 0;
  const showNextLevel = level < 100;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>szint</Text>
        <Text style={styles.levelNumber}>{level}</Text>
      </View>
      {showNextLevel && (
        <View style={styles.progressWrap}>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {progress.current} / {progress.required}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.textLight,
  },
  levelNumber: {
    ...typography.h3,
    color: colors.primary,
  },
  progressWrap: {
    marginTop: spacing.xs,
  },
  progressBg: {
    height: 12,
    backgroundColor: colors.grayLight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 6,
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
});
