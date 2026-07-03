/**
 * Mondatfajta memória – mondat + választós fajta
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { grade2GameStyles as g2 } from '../../../theme/grade2GameStyles';
import { useGameSession } from '../../../hooks/useGameSession';
import { GameSessionLayout } from '../../../components/game/GameSessionLayout';

const TYPES = [
  { type: 'kijelentő', emoji: '📢' },
  { type: 'kérdő', emoji: '❓' },
  { type: 'felszólító', emoji: '👉' },
];

const SENTENCES = [
  { text: 'Ma suli van.', type: 'kijelentő' },
  { text: 'Hol a kabátod?', type: 'kérdő' },
  { text: 'Ülj le!', type: 'felszólító' },
  { text: 'Szép az idő.', type: 'kijelentő' },
  { text: 'Mikor jössz?', type: 'kérdő' },
  { text: 'Nyisd ki!', type: 'felszólító' },
];

function pickRound() {
  const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  const options = [...TYPES].sort(() => Math.random() - 0.5);
  const correct = options.findIndex((o) => o.type === sentence.type);
  return { sentence, options, correct };
}

export const MemoryTypeEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 45 });
  const [round, setRound] = useState(() => pickRound());
  const reset = () => setRound(pickRound());

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === round.correct) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🧠 mondatfajta memória"
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
      <Text style={styles.hint}>milyen mondatfajta ez?</Text>
      <View style={g2.infoPanel}>
        <Text style={g2.infoPanelText}>{round.sentence.text}</Text>
      </View>
      <View style={styles.grid}>
        {round.options.map((opt, i) => (
          <TouchableOpacity key={i} style={g2.optionCompact} onPress={() => onPick(i)} disabled={session.isProcessing}>
            <Text style={styles.typeEmoji}>{opt.emoji}</Text>
            <Text style={g2.optionLabel}>{opt.type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  hint: { textAlign: 'center', ...typography.body, color: colors.textLight, marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  typeEmoji: { fontSize: 28 },
});
