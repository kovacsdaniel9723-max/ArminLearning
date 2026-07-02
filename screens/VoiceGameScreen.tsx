/**
 * VoiceGameScreen
 * Hangaktivált játék képernyő (V1 - Fake Voice)
 * 
 * FONTOS: Ez a verzió NEM elemezi a beszélt tartalmat.
 * Csak hang detektálást végez (hangerő + időtartam).
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors, spacing, typography } from '../theme';
import { FeedbackAnimation } from '../components/FeedbackAnimation';
import { Button } from '../components/Button';
import {
  initializeVoiceGame,
  checkAnswer,
  loadNextQuestion,
  VoiceGameState,
} from '../games/voiceGame/VoiceGameLogic';
import {
  playLetterOrWord,
  startRecording,
  stopRecording,
  checkSoundDetection,
  cleanupAudio,
} from '../games/voiceGame/audioUtils';
import { requestMicrophonePermission, checkMicrophonePermission } from '../utils/permissions';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../components/LevelUpRocketScreen';
import type { Reward } from '../rewards/rewards';
import { isWeb } from '../utils/platform';

type VoiceGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VoiceGame'>;

interface VoiceGameScreenProps {
  navigation: VoiceGameScreenNavigationProp;
}

export const VoiceGameScreen: React.FC<VoiceGameScreenProps> = ({ navigation }) => {
  const [gameState, setGameState] = useState<VoiceGameState>(initializeVoiceGame());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>(undefined);

  useEffect(() => {
    // Játék lejátszásának rögzítése
    recordGamePlayed();
    
    // Engedély ellenőrzése
    checkMicrophonePermission().then(setHasPermission);
    
    // Cleanup amikor a komponens unmount-ol
    return () => {
      cleanupAudio();
    };
  }, []);

  const handlePlaySound = async () => {
    try {
      await playLetterOrWord(gameState.currentLetterOrWord);
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Hiba', 'Nem sikerült lejátszani a hangot.');
    }
  };

  const handleStartListening = async () => {
    if (isWeb) {
      setIsProcessing(true);
      setGameState({ ...gameState, isListening: true });
      setRecordingStartTime(Date.now());
      return;
    }
    if (!hasPermission) {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        return;
      }
      setHasPermission(true);
    }

    try {
      setIsProcessing(true);
      setRecordingStartTime(Date.now());
      await startRecording();
      setGameState({ ...gameState, isListening: true });
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Hiba', 'Nem sikerült elindítani a felvételt.');
      setIsProcessing(false);
    }
  };

  const handleStopListening = async () => {
    try {
      let soundDetected = false;
      if (isWeb) {
        soundDetected = true;
      } else {
        const status = await stopRecording();
        soundDetected = checkSoundDetection(status, 0.5);
      }
      const { isCorrect, newState } = checkAnswer(gameState, soundDetected);
      
      if (isCorrect) {
        setFeedbackMessage('ügyes vagy! 🎉');
        const { leveledUp, newLevel, reward } = await recordCorrectAnswerAndCheckLevelUp();
        if (leveledUp && newLevel != null) {
          setLevelUpLevel(newLevel);
          setLevelUpReward(reward);
          setShowLevelUp(true);
        }
      } else {
        // V1-ben mindig pozitív visszajelzést adunk
        setFeedbackMessage('próbáld újra! 💪');
        await recordIncorrectAnswer();
      }

      setShowFeedback(true);
      setGameState(newState);
      setIsProcessing(false);
      setRecordingStartTime(null);

      setTimeout(() => {
        setShowFeedback(false);
        setGameState(loadNextQuestion(newState));
      }, 2000);
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Hiba', 'Nem sikerült leállítani a felvételt.');
      setIsProcessing(false);
      setGameState({ ...gameState, isListening: false });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Pontszám */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Pontszám: {gameState.score} / {gameState.totalQuestions}
          </Text>
        </View>

        {/* Betű vagy szó megjelenítése */}
        <View style={styles.letterContainer}>
          <Text style={[
            styles.letter,
            gameState.currentLetterOrWord.length > 12 && styles.sentence,
          ]}>
            {gameState.currentLetterOrWord}
          </Text>
        </View>

        {/* Instrukciók */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionText}>
            {gameState.isListening
              ? '🎤 Mondd ki hangosan!'
              : 'Kattints a lejátszás gombra, majd ismételd meg!'}
          </Text>
        </View>

        {/* Gombok */}
        <View style={styles.buttonContainer}>
          <Button
            title="🔊 Lejátszás"
            onPress={handlePlaySound}
            variant="primary"
            size="large"
            disabled={isProcessing || gameState.isListening}
            style={styles.button}
          />

          {!gameState.isListening ? (
            <Button
              title="🎤 Mondd ki!"
              onPress={handleStartListening}
              variant="secondary"
              size="large"
              disabled={isProcessing || !hasPermission}
              style={styles.button}
            />
          ) : (
            <Button
              title="⏹️ Kész"
              onPress={handleStopListening}
              variant="accent"
              size="large"
              disabled={isProcessing}
              style={styles.button}
            />
          )}
        </View>

        {/* Engedély figyelmeztetés */}
        {!hasPermission && (
          <View style={styles.permissionWarning}>
            <Text style={styles.permissionText}>
              A játék használatához mikrofon engedélyre van szükség.
            </Text>
          </View>
        )}

        {/* Visszajelzés animáció */}
        <FeedbackAnimation
          visible={showFeedback}
          message={feedbackMessage}
          type={showFeedback && feedbackMessage.includes('ügyes') ? 'success' : 'encouragement'}
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
    fontSize: undefined,
  },
  sentence: {
    ...typography.gameWord,
    color: colors.primary,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.backgroundLight,
    borderRadius: spacing.cardBorderRadius,
  },
  instructionText: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  button: {
    marginVertical: spacing.sm,
  },
  permissionWarning: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.accentLight,
    borderRadius: spacing.cardBorderRadius,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  permissionText: {
    ...typography.bodySmall,
    color: colors.text,
    textAlign: 'center',
  },
});
