/**
 * LetterGameScreen
 * Betűfelismerő játék képernyő
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
  initializeLetterGame,
  checkAnswer,
  loadNextQuestion,
  LetterGameState,
} from '../games/letterGame/LetterGameLogic';
import { recordCorrectAnswer, recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';

type LetterGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LetterGame'>;

interface LetterGameScreenProps {
  navigation: LetterGameScreenNavigationProp;
}

export const LetterGameScreen: React.FC<LetterGameScreenProps> = ({ navigation }) => {
  const [gameState, setGameState] = useState<LetterGameState>(initializeLetterGame());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Játék lejátszásának rögzítése
    recordGamePlayed();
  }, []);

  const handleAnswer = async (selectedIndex: number) => {
    if (isProcessing || !gameState.currentQuestion) return;

    setIsProcessing(true);
    const { isCorrect, newState } = checkAnswer(gameState, selectedIndex);

    if (isCorrect) {
      setFeedbackMessage('Nagyszerű! 🎉');
      await recordCorrectAnswer();
    } else {
      setFeedbackMessage('Próbáld újra! 💪');
      await recordIncorrectAnswer();
    }

    setShowFeedback(true);
    setGameState(newState);

    // Várunk egy kicsit, majd következő kérdés
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

        {/* Betű megjelenítése */}
        <View style={styles.letterContainer}>
          <Text style={styles.letter}>{gameState.currentQuestion.letter}</Text>
        </View>

        {/* Válaszlehetőségek */}
        <View style={styles.optionsContainer}>
          {gameState.currentQuestion.options.map((option, index) => (
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
              <Text style={styles.optionText}>{option.word}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Visszajelzés animáció */}
        <FeedbackAnimation
          visible={showFeedback}
          message={feedbackMessage}
          type={showFeedback && feedbackMessage.includes('Nagyszerű') ? 'success' : 'encouragement'}
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
  letterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
    minHeight: 200,
  },
  letter: {
    ...typography.gameLetter,
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
  optionText: {
    ...typography.gameWord,
    color: colors.text,
  },
});
