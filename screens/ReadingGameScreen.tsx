/**
 * Olvasás gyakorlat – 2. osztály
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import { getRandomReadingTask, type ReadingTask } from '../content/grade2/readingData';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import type { Reward } from '../rewards/rewards';

export const ReadingGameScreen: React.FC = () => {
  const [task, setTask] = useState<ReadingTask>(() => getRandomReadingTask());
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
      setTask(getRandomReadingTask());
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.score}>pontszám: {score} / {total}</Text>
        <View style={styles.sentenceBox}>
          <Text style={styles.sentence}>{task.sentence}</Text>
        </View>
        <Text style={styles.question}>{task.question}</Text>
        {task.options.map((opt, i) => (
          <TouchableOpacity key={i} style={styles.option} onPress={() => handlePick(i)} disabled={isProcessing}>
            <Text style={styles.optionText}>{opt}</Text>
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
  sentenceBox: { backgroundColor: colors.backgroundLight, padding: spacing.lg, borderRadius: spacing.cardBorderRadius, marginBottom: spacing.lg, borderWidth: 2, borderColor: colors.primaryLight },
  sentence: { ...typography.bodyLarge, color: colors.text, textAlign: 'center', lineHeight: 28 },
  question: { ...typography.h3, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  option: { backgroundColor: colors.cardBackground, padding: spacing.md, borderRadius: spacing.cardBorderRadius, marginBottom: spacing.sm, borderWidth: 2, borderColor: colors.primaryLight },
  optionText: { ...typography.body, color: colors.text, textAlign: 'center' },
});
