/**
 * Haladás / Jutalom képernyő
 * Kép alapján: bal oldalon jutalom kártyák (rakéta), jobb oldalon függőleges idővonal.
 * Háttér: ház → ég → űr (csillagok, bolygók, UFO, műhold).
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';
import {
  getLevelFromAnswers,
  getProgressTowardNextLevel,
  getTotalCorrectAnswers,
  getRewardForLevel,
} from '../rewards/RewardLogic';
import { useGrade } from '../context/GradeContext';
import { GRADE_LABELS } from '../types/grade';
import type { Reward } from '../rewards/rewards';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const GROUND_HEIGHT = 100;
const SPACE_RATIO = 0.4;
const TIMELINE_HEIGHT = 260;
const TIMELINE_MARKERS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function StarField() {
  const positions = [
    { top: 8, left: 20 }, { top: 24, left: 80 }, { top: 40, left: 40 }, { top: 56, left: 120 },
    { top: 72, left: 16 }, { top: 88, left: 200 }, { top: 16, left: 160 }, { top: 32, left: 280 },
    { top: 48, left: 240 }, { top: 64, left: 60 }, { top: 80, left: 180 },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <View key={i} style={[styles.star, { top: pos.top, left: pos.left }]} />
      ))}
    </>
  );
}

function SpaceBackground() {
  return (
    <>
      <View style={styles.space} />
      <StarField />
      <Text style={[styles.spaceEmoji, { top: 12, left: SCREEN_WIDTH * 0.15 }]}>🌙</Text>
      <Text style={[styles.spaceEmoji, { top: 36, right: SCREEN_WIDTH * 0.2 }]}>🪐</Text>
      <Text style={[styles.spaceEmoji, { top: 70, left: SCREEN_WIDTH * 0.25 }]}>🛸</Text>
      <Text style={[styles.spaceEmoji, { top: 50, right: SCREEN_WIDTH * 0.15 }]}>📡</Text>
    </>
  );
}

function RewardCard({ level, reward, isCurrent }: { level: number; reward: Reward | undefined; isCurrent: boolean }) {
  const desc = reward?.description ?? '–';
  return (
    <View style={[styles.rewardCard, isCurrent && styles.rewardCardCurrent]}>
      <Text style={styles.rewardCardIcon}>🚀</Text>
      <Text style={styles.rewardCardLevel}>Szint {level}</Text>
      <Text style={styles.rewardCardDesc} numberOfLines={2}>{desc}</Text>
    </View>
  );
}

function ProgressTimeline({ currentLevel }: { currentLevel: number }) {
  return (
    <View style={styles.timelineWrap}>
      <View style={styles.timelineLine} />
      {TIMELINE_MARKERS.map((level) => {
        const fromBottom = (level / 100) * TIMELINE_HEIGHT;
        const isCurrent = level === currentLevel || (currentLevel > level - 10 && currentLevel <= level);
        return (
          <View
            key={level}
            style={[
              styles.timelineMarker,
              { bottom: fromBottom - 10 },
              isCurrent && styles.timelineMarkerCurrent,
            ]}
          >
            <Text style={[styles.timelineMarkerText, isCurrent && styles.timelineMarkerTextCurrent]}>
              {level}
            </Text>
          </View>
        );
      })}
      <View
        style={[
          styles.timelineCurrentBadge,
          { bottom: Math.max(0, (currentLevel / 100) * TIMELINE_HEIGHT - 14) },
        ]}
      >
        <Text style={styles.timelineCurrentText}>{currentLevel}</Text>
      </View>
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

  const cardLevels = [level, level + 1, level + 2, level + 3].filter((l) => l >= 1 && l <= 100);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Háttér: föld (ház), ég, űr */}
      <View style={styles.ground}>
        <Text style={styles.house}>🏠</Text>
      </View>
      <View style={styles.sky} />
      <View style={styles.spaceContainer}>
        <SpaceBackground />
      </View>

      {/* Tartalom */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Haladás</Text>
          <Text style={styles.headerSub}>
            {GRADE_LABELS[g]} · Szint {level} · {progress.current}/{progress.required} helyes válasz
          </Text>
        </View>

        <View style={styles.mainRow}>
          <ScrollView
            style={styles.cardsScroll}
            contentContainerStyle={styles.cardsContent}
            showsVerticalScrollIndicator={false}
          >
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

          <ProgressTimeline currentLevel={level} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: GROUND_HEIGHT,
    backgroundColor: '#8B9A6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  house: {
    fontSize: 48,
  },
  sky: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: GROUND_HEIGHT,
    top: SCREEN_HEIGHT * SPACE_RATIO,
    backgroundColor: '#87CEEB',
  },
  spaceContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT * SPACE_RATIO,
  },
  space: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0f172a',
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    opacity: 0.9,
  },
  spaceEmoji: {
    position: 'absolute',
    fontSize: 26,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: GROUND_HEIGHT + spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '700',
  },
  headerSub: {
    ...typography.bodySmall,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  mainRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
  },
  cardsScroll: {
    flex: 1,
  },
  cardsContent: {
    paddingRight: spacing.sm,
    paddingBottom: spacing.xl,
  },
  rewardCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    alignItems: 'center',
    minHeight: 88,
  },
  rewardCardCurrent: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  rewardCardIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  rewardCardLevel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  rewardCardDesc: {
    ...typography.bodySmall,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  hint: {
    ...typography.bodySmall,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  timelineWrap: {
    width: 48,
    alignItems: 'center',
    height: TIMELINE_HEIGHT,
    alignSelf: 'center',
  },
  timelineLine: {
    position: 'absolute',
    left: 21,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  timelineMarker: {
    position: 'absolute',
    left: 0,
    width: 36,
    alignItems: 'center',
    paddingVertical: 2,
  },
  timelineMarkerCurrent: {
    backgroundColor: 'transparent',
  },
  timelineMarkerText: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  timelineMarkerTextCurrent: {
    color: colors.primary,
    fontWeight: '700',
  },
  timelineCurrentBadge: {
    position: 'absolute',
    left: 4,
    width: 32,
    height: 28,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineCurrentText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.white,
  },
});
