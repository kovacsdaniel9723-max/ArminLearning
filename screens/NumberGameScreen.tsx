/**
 * NumberGameScreen
 * Számfelismerő játék képernyő (Skeleton implementáció)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors, spacing, typography } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import {
  initializeNumberGame,
  checkAnswer,
  loadNextQuestion,
  NumberGameState,
} from '../games/numberGame/NumberGameLogic';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import type { Reward } from '../rewards/rewards';

type NumberGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NumberGame'>;

interface NumberGameScreenProps {
  navigation: NumberGameScreenNavigationProp;
}

export const NumberGameScreen: React.FC<NumberGameScreenProps> = ({ navigation }) => {
  const [gameState, setGameState] = useState<NumberGameState>(initializeNumberGame());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>(undefined);

  useEffect(() => {
    recordGamePlayed();
  }, []);

  const handleAnswer = async (selectedIndex: number) => {
    if (isProcessing || !gameState.currentQuestion) return;

    setIsProcessing(true);
    const { isCorrect, newState } = checkAnswer(gameState, selectedIndex);

    if (isCorrect) {
      setFeedbackMessage('Nagyszerű! 🎉');
      const { leveledUp, newLevel, reward } = await recordCorrectAnswerAndCheckLevelUp();
      if (leveledUp && newLevel != null) {
        setLevelUpLevel(newLevel);
        setLevelUpReward(reward);
        setShowLevelUp(true);
      }
    } else {
      setFeedbackMessage('Próbáld újra! 💪');
      await recordIncorrectAnswer();
    }

    setShowFeedback(true);
    setGameState(newState);

    setTimeout(() => {
      setShowFeedback(false);
      setGameState(loadNextQuestion(newState));
      setIsProcessing(false);
    }, 2000);
  };

  if (!gameState.currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Betöltés...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Pontszám */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Pontszám: {gameState.score} / {gameState.totalQuestions}
          </Text>
        </View>

        {/* Szám megjelenítése */}
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{gameState.currentQuestion.number}</Text>
        </View>

        {/* Ikon csoportok */}
        <View style={styles.optionsContainer}>
          {gameState.currentQuestion.iconGroups.map((group, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isProcessing && styles.optionButtonDisabled,
              ]}
              onPress={() => handleAnswer(index)}
              disabled={isProcessing}
              activeOpacity={0.7}
            >
              <View style={styles.iconGroup}>
                {group.icons.map((icon, iconIndex) => (
                  <Text key={iconIndex} style={styles.icon}>
                    {icon}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Visszajelzés animáció */}
        <FeedbackAnimation
          visible={showFeedback}
          message={feedbackMessage}
          type={showFeedback && feedbackMessage.includes('Nagyszerű') ? 'success' : 'encouragement'}
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
    marginBottom: spacing.lg,
  },
  scoreText: {
    ...typography.bodyLarge,
    color: colors.primary,
    fontWeight: '600',
  },
  numberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    minHeight: 200,
  },
  number: {
    ...typography.gameNumber,
    color: colors.primary,
  },
  optionsContainer: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  optionButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    minHeight: spacing.touchTargetMin,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primaryLight,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionButtonDisabled: {
    opacity: 0.5,
  },
  iconGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: 32,
  },
});
