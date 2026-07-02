/**
 * Mondatépítés – 2. osztály
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, shadows } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import { createSentenceTask, checkSentenceBuild, type SentenceTask } from '../content/grade2/sentenceData';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import { GameBackButton } from '../components/navigation/GameBackButton';
import type { Reward } from '../rewards/rewards';

export const SentenceGameScreen: React.FC = () => {
  const [task, setTask] = useState<SentenceTask>(() => createSentenceTask());
  const [built, setBuilt] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [usedChipIdx, setUsedChipIdx] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>();

  useEffect(() => { recordGamePlayed(); }, []);

  const resetRound = () => {
    setTask(createSentenceTask());
    setBuilt([]);
    setSelectedIndices([]);
    setUsedChipIdx(new Set());
  };

  const handleChipTap = async (chipIdx: number) => {
    if (isProcessing || usedChipIdx.has(chipIdx)) return;

    const chip = task.chips[chipIdx];
    const nextBuilt = [...built, chip.word];
    const nextSelected = [...selectedIndices, chip.origIndex];
    const nextUsed = new Set(usedChipIdx);
    nextUsed.add(chipIdx);

    setBuilt(nextBuilt);
    setSelectedIndices(nextSelected);
    setUsedChipIdx(nextUsed);

    if (nextSelected.length < task.words.length) return;

    setIsProcessing(true);
    setTotal((t) => t + 1);
    const ok = checkSentenceBuild(nextSelected);

    if (ok) {
      setScore((s) => s + 1);
      setFeedbackMessage('ügyes vagy! 🎉');
      const { leveledUp, newLevel, reward } = await recordCorrectAnswerAndCheckLevelUp();
      if (leveledUp && newLevel != null) {
        setLevelUpLevel(newLevel);
        setLevelUpReward(reward);
        setShowLevelUp(true);
      }
    } else {
      setFeedbackMessage('próbáld újra 🙂');
      await recordIncorrectAnswer();
    }
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      resetRound();
      setIsProcessing(false);
    }, 2000);
  };

  const handleUndo = () => {
    if (isProcessing || built.length === 0) return;
    const lastChipIdx = [...usedChipIdx].pop();
    if (lastChipIdx === undefined) return;
    const nextUsed = new Set(usedChipIdx);
    nextUsed.delete(lastChipIdx);
    setBuilt(built.slice(0, -1));
    setSelectedIndices(selectedIndices.slice(0, -1));
    setUsedChipIdx(nextUsed);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.backRow, shadows.glow(colors.accent)]}>
          <GameBackButton variant="prominent" label="← vissza" />
        </View>

        <Text style={styles.score}>pontszám: {score} / {total}</Text>
        <Text style={styles.prompt}>rakd össze a mondatot!</Text>
        <Text style={styles.hint}>érintsd a szavakat sorrendben · visszavonás: ↩</Text>

        <View style={styles.builtBox}>
          <Text style={styles.builtText}>{built.length ? built.join(' ') : '…'}</Text>
        </View>

        {built.length > 0 && (
          <TouchableOpacity style={styles.undoBtn} onPress={handleUndo} disabled={isProcessing}>
            <Text style={styles.undoText}>↩ utolsó szó vissza</Text>
          </TouchableOpacity>
        )}

        <View style={styles.wordsRow}>
          {task.chips.map((chip, i) => (
            <TouchableOpacity
              key={`chip-${i}-${chip.origIndex}`}
              style={[styles.chip, usedChipIdx.has(i) && styles.chipUsed]}
              onPress={() => handleChipTap(i)}
              disabled={isProcessing || usedChipIdx.has(i)}
            >
              <Text style={styles.chipText}>{chip.word}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.previewBox}>
          <Text style={styles.previewLabel}>így kell kinéznie:</Text>
          <Text style={styles.previewHint}>minden szót egyszer, balról jobbra</Text>
        </View>
      </ScrollView>

      <FeedbackAnimation
        visible={showFeedback}
        message={feedbackMessage}
        type={feedbackMessage.includes('ügyes') ? 'success' : 'encouragement'}
      />
      <LevelUpRocketScreen
        visible={showLevelUp}
        level={levelUpLevel}
        reward={levelUpReward}
        onClose={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  backRow: { marginBottom: spacing.md, alignSelf: 'flex-start' },
  score: { ...typography.body, color: colors.primary, textAlign: 'center', marginBottom: spacing.sm },
  prompt: { ...typography.h2, color: colors.text, textAlign: 'center', marginBottom: spacing.xs },
  hint: { ...typography.bodySmall, color: colors.textLight, textAlign: 'center', marginBottom: spacing.md },
  builtBox: {
    minHeight: 64,
    backgroundColor: colors.backgroundLight,
    padding: spacing.md,
    borderRadius: spacing.cardBorderRadius,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
  },
  builtText: { ...typography.bodyLarge, color: colors.text, textAlign: 'center', fontWeight: '600' },
  undoBtn: {
    alignSelf: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  undoText: { ...typography.bodySmall, color: colors.accent, fontWeight: '700' },
  wordsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center', marginBottom: spacing.lg },
  chip: {
    backgroundColor: colors.cardBackground,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.cardBorderRadius,
    borderWidth: 2,
    borderColor: colors.primary,
    minWidth: 56,
    alignItems: 'center',
  },
  chipUsed: { opacity: 0.3, borderColor: colors.grayLight },
  chipText: { ...typography.body, color: colors.text, fontWeight: '700' },
  previewBox: { alignItems: 'center', opacity: 0.7 },
  previewLabel: { ...typography.bodySmall, color: colors.textLight },
  previewHint: { ...typography.bodySmall, color: colors.textLight, marginTop: 2 },
});
