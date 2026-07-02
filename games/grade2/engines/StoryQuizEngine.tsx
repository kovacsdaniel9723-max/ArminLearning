/**
 * Mese-nyomozó – történet + kérdés
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { useGameSession } from '../../../hooks/useGameSession';
import { GameSessionLayout } from '../../../components/game/GameSessionLayout';
import { pickStoryQuiz } from '../../../content/grade2/magyarData';

export const StoryQuizEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 50 });
  const [data, setData] = useState(() => pickStoryQuiz());
  const q = data.questions[0];

  const reset = () => setData(pickStoryQuiz());

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === q.correct) {
      await session.handleCorrect(reset);
    } else {
      await session.handleWrong();
    }
  };

  return (
    <GameSessionLayout
      title="🔍 mese-nyomozó"
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
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <View style={styles.storyBox}>
        <Text style={styles.story}>{data.story}</Text>
      </View>
      <Text style={styles.question}>{q.q}</Text>
      <View style={styles.grid}>
        {q.options.map((opt, i) => (
          <TouchableOpacity key={i} style={styles.option} onPress={() => onPick(i)} disabled={session.isProcessing}>
            <Text style={styles.emoji}>{opt.emoji}</Text>
            <Text style={styles.label}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  storyBox: { backgroundColor: colors.accentLight, padding: spacing.md, borderRadius: 16, marginBottom: spacing.md },
  story: { ...typography.bodyLarge, color: colors.text, lineHeight: 28 },
  question: { ...typography.h3, textAlign: 'center', marginBottom: spacing.md, color: colors.primary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  option: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  emoji: { fontSize: 40 },
  label: { ...typography.bodySmall, fontWeight: '600', marginTop: spacing.xs },
});
