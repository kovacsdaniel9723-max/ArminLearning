/**
 * Közös játék képernyő keret: időzítő, sorozat, visszajelzés, szintlépés
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme';
import { FeedbackAnimation } from '../FeedbackAnimation';
import { LevelUpRocketScreen } from '../LevelUpRocketScreen';
import { MovementBreakModal } from './MovementBreakModal';
import type { Reward } from '../../rewards/rewards';
import type { MovementChallenge } from '../../content/grade2/testnevData';

interface GameSessionLayoutProps {
  title?: string;
  timeLeft: number;
  streak: number;
  children: React.ReactNode;
  scroll?: boolean;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  showFeedback: boolean;
  feedbackMessage: string;
  feedbackType: 'success' | 'encouragement';
  showLevelUp: boolean;
  levelUpLevel: number;
  levelUpReward?: Reward;
  onCloseLevelUp: () => void;
  showMovement: boolean;
  movementChallenge: MovementChallenge;
  onMovementComplete: () => void;
  onMovementSkip: () => void;
}

export const GameSessionLayout: React.FC<GameSessionLayoutProps> = ({
  title,
  timeLeft,
  streak,
  children,
  scroll = true,
  contentContainerStyle,
  showFeedback,
  feedbackMessage,
  feedbackType,
  showLevelUp,
  levelUpLevel,
  levelUpReward,
  onCloseLevelUp,
  showMovement,
  movementChallenge,
  onMovementComplete,
  onMovementSkip,
}) => {
  const header = (
    <View style={styles.header}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.statsRow}>
        <View style={styles.statBadge}>
          <Text style={styles.statLabel}>⏱️ {timeLeft}s</Text>
        </View>
        <View style={[styles.statBadge, streak >= 2 && styles.streakHot]}>
          <Text style={styles.statLabel}>🔥 {streak}</Text>
        </View>
      </View>
    </View>
  );

  const body = scroll ? (
    <ScrollView contentContainerStyle={[styles.content, contentContainerStyle]} showsVerticalScrollIndicator={false}>
      {header}
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.flex, contentContainerStyle as object]}>
      {header}
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {body}
      <FeedbackAnimation visible={showFeedback} message={feedbackMessage} type={feedbackType} />
      <LevelUpRocketScreen visible={showLevelUp} level={levelUpLevel} reward={levelUpReward} onClose={onCloseLevelUp} />
      <MovementBreakModal
        visible={showMovement}
        challenge={movementChallenge}
        onComplete={onMovementComplete}
        onSkip={onMovementSkip}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.md },
  title: { ...typography.h2, color: colors.primary, textAlign: 'center', marginBottom: spacing.sm },
  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  statBadge: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  streakHot: { borderColor: colors.accent, backgroundColor: colors.accentLight },
  statLabel: { ...typography.body, fontWeight: '700', color: colors.text },
});
