/**
 * MathAdditionScreen
 * Összeadás játék: hány alma van összesen? (a + b, összeg max 10)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { colors, spacing, typography } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import {
  initializeMathAddition,
  checkAnswer,
  loadNextTask,
  type MathAdditionState,
} from '../games/mathAddition/MathAdditionLogic';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import { GameScreenTopBar } from '../components/GameScreenTopBar';
import type { Reward } from '../rewards/rewards';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MathAdditionGame'>;

interface Props {
  navigation: Nav;
}

const APPLE_SIZE = 44;
const APPLES_PER_ROW = 5;

function AppleBlock() {
  return <Text style={styles.appleEmoji}>🍎</Text>;
}

function AppleGroup({ count }: { count: number }) {
  const rows: number[] = [];
  let left = count;
  while (left > 0) {
    rows.push(left >= APPLES_PER_ROW ? APPLES_PER_ROW : left);
    left -= APPLES_PER_ROW;
  }
  return (
    <View style={styles.appleGroup}>
      {rows.map((rowCount, rowIndex) => (
        <View key={rowIndex} style={styles.appleRow}>
          {Array.from({ length: rowCount }, (_, i) => (
            <AppleBlock key={`${rowIndex}-${i}`} />
          ))}
        </View>
      ))}
    </View>
  );
}

export const MathAdditionScreen: React.FC<Props> = () => {
  const [gameState, setGameState] = useState<MathAdditionState>(initializeMathAddition());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>(undefined);

  useEffect(() => {
    recordGamePlayed();
  }, []);

  const handleAnswer = async (answer: number) => {
    if (isProcessing || !gameState.currentTask) return;

    setIsProcessing(true);
    const { isCorrect, newState } = checkAnswer(gameState, answer);

    if (isCorrect) {
      setFeedbackMessage('Ügyes vagy! 🎉');
      const { leveledUp, newLevel, reward } = await recordCorrectAnswerAndCheckLevelUp();
      if (leveledUp && newLevel != null) {
        setLevelUpLevel(newLevel);
        setLevelUpReward(reward);
        setShowLevelUp(true);
      }
    } else {
      setFeedbackMessage('Próbáld újra 🙂');
      await recordIncorrectAnswer();
    }

    setShowFeedback(true);
    setGameState(newState);

    setTimeout(() => {
      setShowFeedback(false);
      setGameState(loadNextTask(newState));
      setIsProcessing(false);
    }, 2000);
  };

  if (!gameState.currentTask) {
    return (
      <SafeAreaView style={styles.container}>
        <GameScreenTopBar />
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Betöltés...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { a, b } = gameState.currentTask;

  return (
    <SafeAreaView style={styles.container}>
      <GameScreenTopBar />
      <View style={styles.content}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Pontszám: {gameState.score} / {gameState.totalQuestions}
          </Text>
        </View>

        <Text style={styles.questionText}>Hány alma van összesen?</Text>

        <View style={styles.applesSection}>
          <AppleGroup count={a} />
          <Text style={styles.plusSign}>+</Text>
          <AppleGroup count={b} />
        </View>

        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.keypadButton, isProcessing && styles.keypadButtonDisabled]}
              onPress={() => handleAnswer(num)}
              disabled={isProcessing}
              activeOpacity={0.7}
            >
              <Text style={styles.keypadButtonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FeedbackAnimation
          visible={showFeedback}
          message={feedbackMessage}
          type={feedbackMessage.includes('Ügyes') ? 'success' : 'encouragement'}
        />
        <LevelUpRocketScreen
          visible={showLevelUp}
          level={levelUpLevel}
          reward={levelUpReward}
          onClose={() => {
          markLevelRewardSeen(levelUpLevel);
          setShowLevelUp(false);
        }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.screenPadding,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.h2,
    color: colors.text,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  scoreText: {
    ...typography.bodyLarge,
    color: colors.primary,
    fontWeight: '600',
  },
  questionText: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  applesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  appleGroup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  appleEmoji: {
    fontSize: APPLE_SIZE,
    width: APPLE_SIZE,
    height: APPLE_SIZE,
    textAlign: 'center',
    lineHeight: APPLE_SIZE,
  },
  plusSign: {
    ...typography.gameNumber,
    fontSize: 48,
    color: colors.primary,
    marginHorizontal: spacing.md,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  keypadButton: {
    width: 64,
    height: 64,
    minWidth: spacing.touchTargetMin,
    minHeight: spacing.touchTargetMin,
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    borderWidth: 3,
    borderColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  keypadButtonDisabled: {
    opacity: 0.5,
  },
  keypadButtonText: {
    ...typography.gameNumber,
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    lineHeight: 28,
  },
});
