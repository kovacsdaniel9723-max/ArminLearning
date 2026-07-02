/**
 * TextGameScreen
 * Szövegalapú játékok képernyője (3 játék mód)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors, spacing, typography } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import type { Reward } from '../rewards/rewards';

// Word-Picture Matching
import {
  initializeWordPictureGame,
  checkAnswer as checkWordPicture,
  loadNextQuestion as loadNextWordPicture,
  WordPictureGameState,
} from '../games/textGames/WordPictureMatching';

// Missing Letter
import {
  initializeMissingLetterGame,
  checkAnswer as checkMissingLetter,
  loadNextQuestion as loadNextMissingLetter,
  formatWordWithMissingLetter,
  MissingLetterGameState,
} from '../games/textGames/MissingLetter';

// First Letter Selection
import {
  initializeFirstLetterGame,
  checkAnswer as checkFirstLetter,
  loadNextQuestion as loadNextFirstLetter,
  FirstLetterGameState,
} from '../games/textGames/FirstLetterSelection';

type TextGameScreenRouteProp = RouteProp<RootStackParamList, 'TextGame'>;
type TextGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TextGame'>;

interface TextGameScreenProps {
  route: TextGameScreenRouteProp;
  navigation: TextGameScreenNavigationProp;
}

type GameState = WordPictureGameState | MissingLetterGameState | FirstLetterGameState;

export const TextGameScreen: React.FC<TextGameScreenProps> = ({ route, navigation }) => {
  const { gameType } = route.params;
  const [gameState, setGameState] = useState<GameState>(() => {
    switch (gameType) {
      case 'wordPicture':
        return initializeWordPictureGame();
      case 'missingLetter':
        return initializeMissingLetterGame();
      case 'firstLetter':
        return initializeFirstLetterGame();
    }
  });
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
    let result: { isCorrect: boolean; newState: GameState };

    switch (gameType) {
      case 'wordPicture':
        result = checkWordPicture(gameState as WordPictureGameState, selectedIndex);
        break;
      case 'missingLetter':
        result = checkMissingLetter(gameState as MissingLetterGameState, selectedIndex);
        break;
      case 'firstLetter':
        result = checkFirstLetter(gameState as FirstLetterGameState, selectedIndex);
        break;
      default:
        return;
    }

    if (result.isCorrect) {
      setFeedbackMessage('Nagyszerű! 🎉');
      const { leveledUp, newLevel, reward } = await recordCorrectAnswerAndCheckLevelUp();
      if (leveledUp && newLevel != null) {
        setLevelUpLevel(newLevel);
        setLevelUpReward(reward);
        setShowLevelUp(true);
      }
      setShowFeedback(true);
      setGameState(result.newState);

      setTimeout(() => {
        setShowFeedback(false);
        let nextState: GameState;
        switch (gameType) {
          case 'wordPicture':
            nextState = loadNextWordPicture(result.newState as WordPictureGameState);
            break;
          case 'missingLetter':
            nextState = loadNextMissingLetter(result.newState as MissingLetterGameState);
            break;
          case 'firstLetter':
            nextState = loadNextFirstLetter(result.newState as FirstLetterGameState);
            break;
          default:
            return;
        }
        setGameState(nextState);
        setIsProcessing(false);
      }, 2000);
    } else {
      setFeedbackMessage('Próbáld újra! 💪');
      await recordIncorrectAnswer();
      setShowFeedback(true);
      setGameState(result.newState);

      setTimeout(() => {
        setShowFeedback(false);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const renderGameContent = () => {
    if (!gameState.currentQuestion) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Betöltés...</Text>
        </View>
      );
    }

    switch (gameType) {
      case 'wordPicture': {
        const question = gameState.currentQuestion as any;
        return (
          <>
            <View style={styles.imageContainer}>
              <Text style={styles.emoji}>{question.image}</Text>
            </View>
            <View style={styles.optionsContainer}>
              {question.words.map((word: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.optionButton, isProcessing && styles.optionButtonDisabled]}
                  onPress={() => handleAnswer(index)}
                  disabled={isProcessing}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      }
      case 'missingLetter': {
        const question = gameState.currentQuestion as any;
        return (
          <>
            <View style={styles.wordContainer}>
              <Text style={styles.wordText}>
                {formatWordWithMissingLetter(question)}
              </Text>
            </View>
            <View style={styles.optionsContainer}>
              {question.options.map((option: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.letterButton, isProcessing && styles.optionButtonDisabled]}
                  onPress={() => handleAnswer(index)}
                  disabled={isProcessing}
                  activeOpacity={0.7}
                >
                  <Text style={styles.letterButtonText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      }
      case 'firstLetter': {
        const question = gameState.currentQuestion as any;
        return (
          <>
            <View style={styles.imageContainer}>
              <Text style={styles.emoji}>{question.image}</Text>
            </View>
            <Text style={styles.questionText}>
              Melyik betűvel kezdődik ez a szó?
            </Text>
            <View style={styles.optionsContainer}>
              {question.options.map((option: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.letterButton, isProcessing && styles.optionButtonDisabled]}
                  onPress={() => handleAnswer(index)}
                  disabled={isProcessing}
                  activeOpacity={0.7}
                >
                  <Text style={styles.letterButtonText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Pontszám: {gameState.score} / {gameState.totalQuestions}
          </Text>
        </View>

        {renderGameContent()}

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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    minHeight: 150,
  },
  emoji: {
    fontSize: 100,
  },
  wordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    minHeight: 150,
  },
  wordText: {
    ...typography.gameWord,
    color: colors.primary,
    fontSize: 48,
    letterSpacing: 8,
  },
  questionText: {
    ...typography.bodyLarge,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.xl,
    justifyContent: 'center',
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
  letterButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.md,
    minHeight: spacing.touchTargetMin,
    minWidth: 80,
    maxWidth: 120,
    flex: 1,
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
  optionText: {
    ...typography.gameWord,
    color: colors.text,
  },
  letterButtonText: {
    ...typography.gameLetter,
    fontSize: 36,
    color: colors.primary,
    textAlign: 'center',
    flexShrink: 1,
  },
});
