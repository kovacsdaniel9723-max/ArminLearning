/**
 * Mondatépítés – 2. osztály
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import { createSentenceTask, checkSentenceOrder, type SentenceTask } from '../content/grade2/sentenceData';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import { GameScreenTopBar } from '../components/GameScreenTopBar';
import type { Reward } from '../rewards/rewards';

export const SentenceGameScreen: React.FC = () => {
  const [task, setTask] = useState<SentenceTask>(() => createSentenceTask());
  const [built, setBuilt] = useState<string[]>([]);
  const [used, setUsed] = useState<Set<number>>(new Set());
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
    setUsed(new Set());
  };

  const handleWordTap = async (shufIdx: number) => {
    if (isProcessing || used.has(shufIdx)) return;
    const nextBuilt = [...built, task.shuffled[shufIdx]];
    const nextUsed = new Set(used);
    nextUsed.add(shufIdx);
    setBuilt(nextBuilt);
    setUsed(nextUsed);

    if (nextBuilt.length < task.words.length) return;

    setIsProcessing(true);
    setTotal((t) => t + 1);
    const ok = checkSentenceOrder(task.words, nextBuilt);
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

  return (
    <SafeAreaView style={styles.container}>
      <GameScreenTopBar />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.score}>pontszám: {score} / {total}</Text>
        <Text style={styles.prompt}>rakd össze a mondatot!</Text>
        <View style={styles.builtBox}>
          <Text style={styles.builtText}>{built.length ? built.join(' ') : '…'}</Text>
        </View>
        <View style={styles.wordsRow}>
          {task.shuffled.map((w, i) => (
            <TouchableOpacity
              key={`${w}-${i}`}
              style={[styles.chip, used.has(i) && styles.chipUsed]}
              onPress={() => handleWordTap(i)}
              disabled={isProcessing || used.has(i)}
            >
              <Text style={styles.chipText}>{w}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FeedbackAnimation visible={showFeedback} message={feedbackMessage} type={feedbackMessage.includes('ügyes') ? 'success' : 'encouragement'} />
      <LevelUpRocketScreen visible={showLevelUp} level={levelUpLevel} reward={levelUpReward} onClose={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  score: { ...typography.body, color: colors.primary, textAlign: 'center', marginBottom: spacing.md },
  prompt: { ...typography.h3, color: colors.text, textAlign: 'center', marginBottom: spacing.md },
  builtBox: { minHeight: 56, backgroundColor: colors.backgroundLight, padding: spacing.md, borderRadius: spacing.cardBorderRadius, marginBottom: spacing.lg, borderWidth: 2, borderColor: colors.primaryLight, justifyContent: 'center' },
  builtText: { ...typography.bodyLarge, color: colors.text, textAlign: 'center' },
  wordsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center' },
  chip: { backgroundColor: colors.cardBackground, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: spacing.cardBorderRadius, borderWidth: 2, borderColor: colors.primaryLight },
  chipUsed: { opacity: 0.35 },
  chipText: { ...typography.body, color: colors.text },
});
