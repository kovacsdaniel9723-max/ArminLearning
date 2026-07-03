/**
 * Mese-nyomozó – történet + kérdés
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { grade2GameStyles as g2 } from '../../../theme/grade2GameStyles';
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
      <Text style={g2.prompt}>{q.q}</Text>
      <View style={styles.grid}>
        {q.options.map((opt, i) => (
          <TouchableOpacity key={i} style={g2.optionCompact} onPress={() => onPick(i)} disabled={session.isProcessing}>
            <Text style={styles.emoji}>{opt.emoji}</Text>
            <Text style={g2.optionLabel}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  storyBox: { backgroundColor: colors.backgroundLight, padding: spacing.md, borderRadius: 16, marginBottom: spacing.md, borderWidth: 2, borderColor: colors.cardBorder },
  story: { ...typography.bodyLarge, color: colors.text, lineHeight: 28 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  emoji: { fontSize: 40 },
});
