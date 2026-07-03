/**
 * Haladás – avatar, rang, jutalom kártyák
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, shadows } from '../theme';
import { ScreenBackground } from '../components/ScreenBackground';
import {
  getLevelFromAnswers,
  getProgressTowardNextLevel,
  getTotalCorrectAnswers,
  getRewardForLevel,
} from '../rewards/RewardLogic';
import { getRankForLevel, getNextRank } from '../rewards/ranks';
import { useGrade } from '../context/GradeContext';
import { GRADE_LABELS } from '../types/grade';
import type { Reward } from '../rewards/rewards';

function RewardCard({ level, reward, isCurrent }: { level: number; reward: Reward | undefined; isCurrent: boolean }) {
  return (
    <View style={[styles.rewardCard, isCurrent && styles.rewardCardCurrent]}>
      <Text style={styles.rewardCardIcon}>🎁</Text>
      <Text style={styles.rewardCardLevel}>szint {level}</Text>
      <Text style={styles.rewardCardDesc} numberOfLines={2}>{reward?.description ?? '–'}</Text>
    </View>
  );
}

export const RewardsScreen: React.FC = () => {
  const { grade } = useGrade();
  const g = grade ?? 1;
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState({ current: 0, required: 20 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const total = await getTotalCorrectAnswers();
      if (cancelled) return;
      setLevel(getLevelFromAnswers(total));
      setProgress(getProgressTowardNextLevel(total));
    })();
    return () => { cancelled = true; };
  }, []);

  const rank = getRankForLevel(level);
  const nextRank = getNextRank(level);
  const cardLevels = [level, level + 1, level + 2, level + 3].filter((l) => l >= 1 && l <= 100);
  const xpPercent = Math.round((progress.current / progress.required) * 100);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>🏆 haladás</Text>
          <Text style={styles.gradeLabel}>{GRADE_LABELS[g]}</Text>

          {/* Avatar + rang */}
          <View style={[styles.avatarCard, shadows.glow(rank.color)]}>
            <View style={[styles.avatarRing, { borderColor: rank.color }]}>
              <Text style={styles.avatarEmoji}>{rank.emoji}</Text>
            </View>
            <Text style={[styles.rankTitle, { color: rank.color }]}>{rank.title}</Text>
            <Text style={styles.rankLevel}>szint {level}</Text>
            {nextRank && level < 100 && (
              <Text style={styles.nextRank}>
                következő rang: {nextRank.emoji} {nextRank.title} (szint {nextRank.minLevel})
              </Text>
            )}
            {level >= 100 && (
              <Text style={styles.nextRank}>max szint elérve! 👑</Text>
            )}
          </View>

          {/* XP sáv */}
          <View style={styles.xpBox}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpLabel}>xp a következő szintig</Text>
              <Text style={styles.xpNumbers}>{progress.current} / {progress.required}</Text>
            </View>
            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: `${xpPercent}%`, backgroundColor: rank.color }]} />
            </View>
          </View>

          {/* Jutalom kártyák */}
          <Text style={styles.sectionTitle}>🚀 következő jutalmak</Text>
          {cardLevels.map((l) => (
            <RewardCard
              key={l}
              level={l}
              reward={getRewardForLevel(l)}
              isCurrent={l === level}
            />
          ))}
          <Text style={styles.hint}>a szülő adja oda a jutalmat</Text>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  pageTitle: { ...typography.h1, color: colors.primary, textAlign: 'center', marginBottom: spacing.xs },
  gradeLabel: { ...typography.body, color: colors.textLight, textAlign: 'center', marginBottom: spacing.lg },
  avatarCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  avatarRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarEmoji: { fontSize: 64 },
  rankTitle: { ...typography.h1, fontSize: 30, fontWeight: '800', marginBottom: spacing.xs },
  rankLevel: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  nextRank: { ...typography.bodySmall, color: colors.textLight, textAlign: 'center' },
  xpBox: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  xpHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  xpLabel: { ...typography.bodySmall, color: colors.textLight, fontWeight: '700' },
  xpNumbers: { ...typography.bodySmall, color: colors.primary, fontWeight: '800' },
  xpTrack: {
    height: 16,
    backgroundColor: colors.backgroundDark,
    borderRadius: 8,
    overflow: 'hidden',
  },
  xpFill: { height: '100%', borderRadius: 8 },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  rewardCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    alignItems: 'center',
  },
  rewardCardCurrent: {
    borderColor: colors.accent,
    borderWidth: 3,
    backgroundColor: colors.panelLightWarm,
  },
  rewardCardIcon: { fontSize: 36, marginBottom: spacing.xs },
  rewardCardLevel: { ...typography.body, fontWeight: '800', color: colors.textOnLight },
  rewardCardDesc: { ...typography.bodySmall, color: colors.textOnLightMuted, textAlign: 'center', marginTop: spacing.xs },
  hint: { ...typography.bodySmall, color: colors.textLight, textAlign: 'center', marginTop: spacing.md, fontStyle: 'italic' },
});
