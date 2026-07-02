/**
 * Általános időzített választós játékmotor
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { useGameSession } from '../../../hooks/useGameSession';
import { GameSessionLayout } from '../../../components/game/GameSessionLayout';

export interface TimedChoiceQuestion {
  prompt: string;
  subtitle?: string;
  options: { label: string; emoji?: string }[];
  correct: number;
}

interface TimedChoiceEngineProps {
  title: string;
  getQuestion: () => TimedChoiceQuestion;
  roundSeconds?: number;
}

export const TimedChoiceEngine: React.FC<TimedChoiceEngineProps> = ({
  title,
  getQuestion,
  roundSeconds = 45,
}) => {
  const session = useGameSession({ roundSeconds });
  const [q, setQ] = useState(getQuestion);

  useEffect(() => {
    if (session.timerExpired && !session.isProcessing) {
      session.handleTimeout(() => setQ(getQuestion()));
    }
  }, [session.timerExpired]);

  const next = () => setQ(getQuestion());

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === q.correct) {
      const { hasMovement } = await session.handleCorrect(next);
      if (hasMovement) setQ(getQuestion());
    } else {
      await session.handleWrong(next);
    }
  };

  return (
    <GameSessionLayout
      title={title}
      timeLeft={session.timeLeft}
      streak={session.streak}
      showFeedback={session.showFeedback}
      feedbackMessage={session.feedbackMessage}
      feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp}
      levelUpLevel={session.levelUpLevel}
      levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp}
      showMovement={session.showMovement}
      movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(next)}
      onMovementSkip={() => session.skipMovement(next)}
    >
      {q.subtitle ? <Text style={styles.subtitle}>{q.subtitle}</Text> : null}
      <Text style={styles.prompt}>{q.prompt}</Text>
      <View style={styles.grid}>
        {q.options.map((opt, i) => (
          <TouchableOpacity key={i} style={styles.option} onPress={() => onPick(i)} disabled={session.isProcessing}>
            {opt.emoji ? <Text style={styles.emoji}>{opt.emoji}</Text> : null}
            <Text style={styles.optionText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  subtitle: { ...typography.body, color: colors.textLight, textAlign: 'center', marginBottom: spacing.sm },
  prompt: { ...typography.h3, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  option: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.md,
    minWidth: '42%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  emoji: { fontSize: 36, marginBottom: spacing.xs },
  optionText: { ...typography.body, fontWeight: '600', color: colors.text, textAlign: 'center' },
});
