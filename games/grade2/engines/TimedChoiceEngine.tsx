/**
 * Általános időzített választós játékmotor
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { grade2GameStyles as g2 } from '../../../theme/grade2GameStyles';
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
  const [q, setQ] = useState(getQuestion);
  const session = useGameSession({
    roundSeconds,
    onRoundTimeout: () => setQ(getQuestion()),
  });

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
      {q.subtitle ? <Text style={g2.subtitle}>{q.subtitle}</Text> : null}
      <Text style={g2.prompt}>{q.prompt}</Text>
      <View style={styles.grid}>
        {q.options.map((opt, i) => (
          <TouchableOpacity key={i} style={g2.option} onPress={() => onPick(i)} disabled={session.isProcessing}>
            {opt.emoji ? <Text style={styles.emoji}>{opt.emoji}</Text> : null}
            <Text style={g2.optionTextBody}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  emoji: { fontSize: 36, marginBottom: spacing.xs },
});
