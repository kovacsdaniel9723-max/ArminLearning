/**
 * Matematika – 2. osztály (összeadás, kivonás, szorzás, osztás)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import {
  initializeMathGrade2,
  checkMathGrade2Answer,
  loadNextMathGrade2Task,
  getQuestionText,
  getAnswerOptions,
  type MathGrade2State,
} from '../games/mathGrade2/MathGrade2Logic';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import type { Reward } from '../rewards/rewards';

const APPLE = '🍎';

function AppleRow({ count }: { count: number }) {
  const shown = Math.min(count, 12);
  const extra = count > 12 ? count - 12 : 0;
  return (
    <View style={styles.appleRow}>
      {Array.from({ length: shown }, (_, i) => (
        <Text key={i} style={styles.apple}>{APPLE}</Text>
      ))}
      {extra > 0 && <Text style={styles.more}>+{extra}</Text>}
    </View>
  );
}

function TaskVisual({ state }: { state: MathGrade2State }) {
  const t = state.currentTask;
  if (!t) return null;

  if (t.op === 'add') {
    return (
      <View style={styles.visual}>
        <AppleRow count={t.a} />
        <Text style={styles.opSign}>+</Text>
        <AppleRow count={t.b} />
      </View>
    );
  }
  if (t.op === 'subtract') {
    return (
      <View style={styles.visual}>
        <AppleRow count={t.a} />
        <Text style={styles.opSign}>−</Text>
        <AppleRow count={t.b} />
      </View>
    );
  }
  if (t.op === 'multiply' && t.groups != null && t.perGroup != null) {
    return (
      <View style={styles.visual}>
        {Array.from({ length: t.groups }, (_, g) => (
          <View key={g} style={styles.group}>
            <AppleRow count={t.perGroup!} />
          </View>
        ))}
      </View>
    );
  }
  if (t.op === 'divide' && t.groups != null && t.perGroup != null) {
    return (
      <View style={styles.visual}>
        <AppleRow count={t.a} />
        <Text style={styles.hint}>{t.perGroup} alma / csoport</Text>
      </View>
    );
  }
  return null;
}

export const MathGrade2Screen: React.FC = () => {
  const [gameState, setGameState] = useState<MathGrade2State>(initializeMathGrade2());
  const [options, setOptions] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>();

  useEffect(() => {
    recordGamePlayed();
    if (gameState.currentTask) setOptions(getAnswerOptions(gameState.currentTask));
  }, []);

  useEffect(() => {
    if (gameState.currentTask) setOptions(getAnswerOptions(gameState.currentTask));
  }, [gameState.currentTask]);

  const handleAnswer = async (answer: number) => {
    if (isProcessing || !gameState.currentTask) return;
    setIsProcessing(true);
    const { isCorrect, newState } = checkMathGrade2Answer(gameState, answer);
    if (isCorrect) {
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
    setGameState(newState);
    setTimeout(() => {
      setShowFeedback(false);
      setGameState(loadNextMathGrade2Task(newState));
      setIsProcessing(false);
    }, 2000);
  };

  if (!gameState.currentTask) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>betöltés...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.score}>pontszám: {gameState.score} / {gameState.totalQuestions}</Text>
        <Text style={styles.question}>{getQuestionText(gameState.currentTask)}</Text>
        <TaskVisual state={gameState} />
        <View style={styles.keypad}>
          {options.map((num) => (
            <TouchableOpacity key={num} style={styles.key} onPress={() => handleAnswer(num)} disabled={isProcessing}>
              <Text style={styles.keyText}>{num}</Text>
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
  loading: { ...typography.h2, textAlign: 'center', marginTop: spacing.xxl },
  score: { ...typography.body, color: colors.primary, textAlign: 'center', marginBottom: spacing.md },
  question: { ...typography.h3, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  visual: { alignItems: 'center', marginVertical: spacing.lg },
  appleRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, maxWidth: 280 },
  apple: { fontSize: 32 },
  more: { ...typography.body, color: colors.textLight, alignSelf: 'center' },
  opSign: { ...typography.h1, color: colors.primary, marginVertical: spacing.sm },
  group: { marginBottom: spacing.sm },
  hint: { ...typography.body, color: colors.textLight, marginTop: spacing.sm },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.md, marginTop: spacing.xl },
  key: { width: 72, height: 64, backgroundColor: colors.cardBackground, borderRadius: spacing.cardBorderRadius, borderWidth: 3, borderColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  keyText: { ...typography.gameNumber, fontSize: 24, fontWeight: '700', color: colors.primary, lineHeight: 28 },
});
