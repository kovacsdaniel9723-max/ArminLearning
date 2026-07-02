/**
 * VoiceGameScreen – hangaktivált játék (V1 fake voice)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { spacing } from '../theme';
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
import {
  ClassicGameLayout,
  GameHeroBox,
} from '../components/game/ClassicGameLayout';
import { classicGameStyles as gs } from '../theme/classicGameStyles';
import type { Reward } from '../rewards/rewards';
import { isWeb } from '../utils/platform';

type VoiceGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VoiceGame'>;

interface VoiceGameScreenProps {
  navigation: VoiceGameScreenNavigationProp;
}

export const VoiceGameScreen: React.FC<VoiceGameScreenProps> = () => {
  const [gameState, setGameState] = useState<VoiceGameState>(initializeVoiceGame());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>(undefined);

  useEffect(() => {
    recordGamePlayed();
    checkMicrophonePermission().then(setHasPermission);
    return () => { cleanupAudio(); };
  }, []);

  const handlePlaySound = async () => {
    try {
      await playLetterOrWord(gameState.currentLetterOrWord);
    } catch {
      Alert.alert('hiba', 'nem sikerült lejátszani a hangot.');
    }
  };

  const handleStartListening = async () => {
    if (isWeb) {
      setIsProcessing(true);
      setGameState({ ...gameState, isListening: true });
      return;
    }
    if (!hasPermission) {
      const granted = await requestMicrophonePermission();
      if (!granted) return;
      setHasPermission(true);
    }
    try {
      setIsProcessing(true);
      await startRecording();
      setGameState({ ...gameState, isListening: true });
    } catch {
      Alert.alert('hiba', 'nem sikerült elindítani a felvételt.');
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
        setFeedbackMessage('próbáld újra! 💪');
        await recordIncorrectAnswer();
      }
      setShowFeedback(true);
      setGameState(newState);
      setIsProcessing(false);
      setTimeout(() => {
        setShowFeedback(false);
        setGameState(loadNextQuestion(newState));
      }, 2000);
    } catch {
      Alert.alert('hiba', 'nem sikerült leállítani a felvételt.');
      setIsProcessing(false);
      setGameState({ ...gameState, isListening: false });
    }
  };

  const isLong = gameState.currentLetterOrWord.length > 12;

  return (
    <ClassicGameLayout
      title="🎤 mondj hangosan!"
      score={gameState.score}
      total={gameState.totalQuestions}
      showFeedback={showFeedback}
      feedbackMessage={feedbackMessage}
      showLevelUp={showLevelUp}
      levelUpLevel={levelUpLevel}
      levelUpReward={levelUpReward}
      onCloseLevelUp={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }}
    >
      <GameHeroBox>
        <Text style={isLong ? gs.heroWord : gs.heroLetter}>{gameState.currentLetterOrWord}</Text>
      </GameHeroBox>

      <View style={styles.instructions}>
        <Text style={gs.prompt}>
          {gameState.isListening
            ? '🎤 mondd ki hangosan!'
            : 'kattints a lejátszás gombra, majd ismételd meg!'}
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title="🔊 lejátszás"
          onPress={handlePlaySound}
          variant="primary"
          size="large"
          disabled={isProcessing || gameState.isListening}
        />
        {!gameState.isListening ? (
          <Button
            title="🎤 mondd ki!"
            onPress={handleStartListening}
            variant="secondary"
            size="large"
            disabled={isProcessing || !hasPermission}
          />
        ) : (
          <Button
            title="⏹️ kész"
            onPress={handleStopListening}
            variant="accent"
            size="large"
            disabled={isProcessing}
          />
        )}
      </View>

      {!hasPermission && !isWeb && (
        <View style={styles.permission}>
          <Text style={gs.prompt}>a játékhoz mikrofon engedély kell.</Text>
        </View>
      )}
    </ClassicGameLayout>
  );
};

const styles = StyleSheet.create({
  instructions: {
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  buttons: { gap: spacing.md, marginTop: spacing.md },
  permission: {
    marginTop: spacing.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
});
