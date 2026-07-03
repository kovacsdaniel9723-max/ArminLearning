/**
 * Kosárba rendezős játékmotor (tap word → tap basket)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { grade2GameStyles as g2 } from '../../../theme/grade2GameStyles';
import { useGameSession } from '../../../hooks/useGameSession';
import { GameSessionLayout } from '../../../components/game/GameSessionLayout';

export interface SortItem {
  id: string;
  label: string;
  emoji?: string;
  category: string;
}

interface SortBasketEngineProps {
  title: string;
  categories: { id: string; label: string; emoji: string }[];
  getItems: () => SortItem[];
}

export const SortBasketEngine: React.FC<SortBasketEngineProps> = ({ title, categories, getItems }) => {
  const session = useGameSession({ roundSeconds: 60 });
  const [items, setItems] = useState(getItems);
  const [selected, setSelected] = useState<string | null>(null);
  const [sorted, setSorted] = useState<Set<string>>(new Set());

  const reset = () => {
    setItems(getItems());
    setSelected(null);
    setSorted(new Set());
    session.resetTimer();
  };

  const onBasket = async (catId: string) => {
    if (!selected || session.isProcessing) return;
    const item = items.find((i) => i.id === selected);
    if (!item) return;
    const ok = item.category === catId;
    setSelected(null);
    if (ok) {
      const nextSorted = new Set(sorted);
      nextSorted.add(item.id);
      setSorted(nextSorted);
      if (nextSorted.size >= items.length) {
        await session.handleCorrect(reset);
      }
    } else {
      await session.handleWrong();
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
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.hint}>érintsd meg a szót, aztán a kosarat!</Text>
      <View style={styles.words}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              g2.optionCompact,
              styles.chip,
              selected === item.id && styles.chipSel,
              sorted.has(item.id) && styles.chipDone,
            ]}
            onPress={() => !sorted.has(item.id) && setSelected(item.id)}
            disabled={sorted.has(item.id) || session.isProcessing}
          >
            {item.emoji ? <Text style={styles.chipEmoji}>{item.emoji}</Text> : null}
            <Text style={g2.optionTextBody}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.baskets}>
        {categories.map((c) => (
          <TouchableOpacity key={c.id} style={styles.basket} onPress={() => onBasket(c.id)} disabled={!selected || session.isProcessing}>
            <Text style={styles.basketEmoji}>{c.emoji}</Text>
            <Text style={styles.basketLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  hint: { ...typography.body, textAlign: 'center', color: colors.textLight, marginBottom: spacing.md },
  words: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.lg },
  chip: { minWidth: 88 },
  chipSel: {
    borderColor: colors.accent,
    backgroundColor: colors.panelLightWarm,
    borderBottomColor: colors.accentDark,
  },
  chipDone: { opacity: 0.35 },
  chipEmoji: { fontSize: 28, marginBottom: spacing.xs },
  baskets: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.md },
  basket: {
    backgroundColor: colors.secondaryLight,
    padding: spacing.md,
    borderRadius: 16,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderBottomWidth: 4,
    borderBottomColor: colors.secondaryDark,
  },
  basketEmoji: { fontSize: 32 },
  basketLabel: { ...typography.bodySmall, fontWeight: '800', marginTop: spacing.xs, color: colors.backgroundDark },
});
