/**
 * Szótagolás játék – 2. osztály
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import { getRandomSyllableTask, type SyllableTask } from '../content/grade2/syllableData';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import { GameScreenTopBar } from '../components/GameScreenTopBar';
import type { Reward } from '../rewards/rewards';

export const SyllableGameScreen: React.FC = () => {
  const [task, setTask] = useState<SyllableTask>(() => getRandomSyllableTask());
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>();

  useEffect(() => { recordGamePlayed(); }, []);

  const handlePick = async (index: number) => {
    if (isProcessing) return;
    setIsProcessing(true);
    const ok = index === task.correctIndex;
    setTotal((t) => t + 1);
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
      setTask(getRandomSyllableTask());
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameScreenTopBar />
      <View style={styles.content}>
        <Text style={styles.score}>pontszám: {score} / {total}</Text>
        <Text style={styles.prompt}>bontsd szótagokra:</Text>
        <Text style={styles.word}>{task.word}</Text>
        {task.options.map((opt, i) => (
          <TouchableOpacity key={i} style={styles.option} onPress={() => handlePick(i)} disabled={isProcessing}>
            <Text style={styles.optionText}>{opt.join(' · ')}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FeedbackAnimation visible={showFeedback} message={feedbackMessage} type={feedbackMessage.includes('ügyes') ? 'success' : 'encouragement'} />
      <LevelUpRocketScreen visible={showLevelUp} level={levelUpLevel} reward={levelUpReward} onClose={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.screenPadding },
  score: { ...typography.body, color: colors.primary, textAlign: 'center', marginBottom: spacing.md },
  prompt: { ...typography.h3, color: colors.text, textAlign: 'center' },
  word: { ...typography.h1, color: colors.primary, textAlign: 'center', marginVertical: spacing.lg },
  option: { backgroundColor: colors.cardBackground, padding: spacing.md, borderRadius: spacing.cardBorderRadius, marginBottom: spacing.sm, borderWidth: 2, borderColor: colors.primaryLight },
  optionText: { ...typography.bodyLarge, color: colors.text, textAlign: 'center' },
});
