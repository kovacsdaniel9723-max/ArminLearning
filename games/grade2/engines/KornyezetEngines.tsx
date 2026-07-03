/**
 * Környezetismeret játékmotorok
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { grade2GameStyles as g2 } from '../../../theme/grade2GameStyles';
import { useGameSession } from '../../../hooks/useGameSession';
import { GameSessionLayout } from '../../../components/game/GameSessionLayout';
import {
  pickSeasonMatch,
  pickAnimalSort,
  ANIMAL_GROUPS,
  pickBodyPart,
  pickTrafficTask,
  pickHealthItem,
} from '../../../content/grade2/kornyezetData';
import { SortBasketEngine, type SortItem } from './SortBasketEngine';
import { TimedChoiceEngine } from './TimedChoiceEngine';

export const SeasonSpinEngine: React.FC = () => (
  <TimedChoiceEngine
    title="🌀 évszak-forgó"
    roundSeconds={45}
    getQuestion={() => {
      const { item, options, correct } = pickSeasonMatch();
      return {
        prompt: `${item.itemEmoji} ${item.item} – melyik évszakban van?`,
        options: options.map((o) => ({ label: o, emoji: o === 'tavasz' ? '🌸' : o === 'nyár' ? '☀️' : o === 'ősz' ? '🍂' : '❄️' })),
        correct,
      };
    }}
  />
);

export const AnimalSortEngine: React.FC = () => (
  <SortBasketEngine
    title="🦁 állat-csoportosító"
    categories={ANIMAL_GROUPS.map((g) => ({
      id: g,
      label: g,
      emoji: g === 'emlős' ? '🐻' : g === 'madár' ? '🐦' : g === 'hal' ? '🐟' : '🦋',
    }))}
    getItems={() =>
      pickAnimalSort(4).map((a, i) => ({
        id: `${a.name}-${i}`,
        label: a.name,
        emoji: a.emoji,
        category: a.group,
      })) as SortItem[]
    }
  />
);

export const BodyLabelEngine: React.FC = () => (
  <TimedChoiceEngine
    title="🙂 testrész-kvíz"
    roundSeconds={40}
    getQuestion={() => {
      const b = pickBodyPart();
      return {
        prompt: 'a képen melyik testrész látható?',
        subtitle: `👉 ${b.emoji}`,
        options: b.options.map((o) => ({ label: o })),
        correct: b.options.indexOf(b.part),
      };
    }}
  />
);

const LIGHT_COLORS = { red: '#E74C3C', yellow: '#F1C40F', green: '#2ECC71' };

export const TrafficLightEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 40 });
  const [task, setTask] = useState(() => pickTrafficTask());
  const reset = () => setTask(pickTrafficTask());

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === task.correct) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🚦 közlekedés-lámpa"
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
      <View style={[styles.light, { backgroundColor: LIGHT_COLORS[task.light] }]} />
      <Text style={g2.prompt}>mit kell tenned?</Text>
      <View style={styles.grid}>
        {task.options.map((opt, i) => (
          <TouchableOpacity key={i} style={g2.option} onPress={() => onPick(i)} disabled={session.isProcessing}>
            <Text style={g2.optionTextBody}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

export const HealthSortEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 50 });
  const [item, setItem] = useState(() => pickHealthItem());
  const reset = () => setItem(pickHealthItem());

  const onPick = async (healthy: boolean) => {
    if (session.isProcessing) return;
    if (healthy === item.healthy) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🥗 egészség-választó"
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
      <Text style={g2.emojiHero}>{item.emoji}</Text>
      <Text style={g2.prompt}>{item.item} – egészséges?</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.bigBtn, styles.yes]} onPress={() => onPick(true)} disabled={session.isProcessing}>
          <Text style={styles.bigBtnText}>igen ✅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bigBtn, styles.no]} onPress={() => onPick(false)} disabled={session.isProcessing}>
          <Text style={styles.bigBtnText}>nem ❌</Text>
        </TouchableOpacity>
      </View>
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  light: { width: 80, height: 80, borderRadius: 40, alignSelf: 'center', marginBottom: spacing.lg, borderWidth: 3, borderColor: colors.cardBorder },
  grid: { gap: spacing.sm },
  row: { flexDirection: 'row', gap: spacing.md, justifyContent: 'center' },
  bigBtn: { padding: spacing.lg, borderRadius: 16, minWidth: 120, alignItems: 'center' },
  yes: { backgroundColor: colors.successLight, borderWidth: 2, borderColor: colors.success },
  no: { backgroundColor: '#3a2030', borderWidth: 2, borderColor: '#E74C3C' },
  bigBtnText: { ...typography.button, color: colors.text, fontWeight: '800' },
});
