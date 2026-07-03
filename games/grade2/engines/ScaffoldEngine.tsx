/**
 * Fogalmazás-építő – mondatok összeállítása
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { grade2GameStyles as g2 } from '../../../theme/grade2GameStyles';
import { useGameSession } from '../../../hooks/useGameSession';
import { GameSessionLayout } from '../../../components/game/GameSessionLayout';
import { pickScaffold } from '../../../content/grade2/magyarData';

export const ScaffoldEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 70 });
  const [scaffold, setScaffold] = useState(() => pickScaffold());
  const [slotIdx, setSlotIdx] = useState(0);
  const [built, setBuilt] = useState<string[]>([]);

  const reset = () => {
    setScaffold(pickScaffold());
    setSlotIdx(0);
    setBuilt([]);
  };

  const slot = scaffold.slots[slotIdx];

  const onPick = async (idx: number) => {
    if (session.isProcessing || !slot) return;
    if (idx === slot.correct) {
      const nextBuilt = [...built, slot.options[idx]];
      setBuilt(nextBuilt);
      if (slotIdx + 1 >= scaffold.slots.length) {
        await session.handleCorrect(reset);
      } else {
        setSlotIdx(slotIdx + 1);
      }
    } else {
      await session.handleWrong();
    }
  };

  return (
    <GameSessionLayout
      title="✍️ fogalmazás-építő"
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
      <Text style={styles.theme}>téma: {scaffold.theme}</Text>
      <View style={g2.infoPanel}>
        {built.map((s, i) => (
          <Text key={i} style={styles.builtLine}>{s}</Text>
        ))}
        {slot ? <Text style={styles.prompt}>{slot.prompt}</Text> : null}
      </View>
      {slot ? (
        <View style={styles.options}>
          {slot.options.map((opt, i) => (
            <TouchableOpacity key={i} style={g2.option} onPress={() => onPick(i)} disabled={session.isProcessing}>
              <Text style={g2.optionTextBody}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  theme: { ...typography.body, textAlign: 'center', color: colors.primary, marginBottom: spacing.md },
  builtLine: { ...typography.body, color: colors.text, marginBottom: spacing.xs },
  prompt: { ...typography.h3, color: colors.accent, marginTop: spacing.sm, textAlign: 'center' },
  options: { gap: spacing.sm },
});
