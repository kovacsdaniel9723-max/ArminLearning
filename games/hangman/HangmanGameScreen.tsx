/**
 * „Építsük meg a robotot!” – gyerekbarát, 12 lépéses robot építő
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import { colors, spacing, typography } from '../../theme';
import { FeedbackAnimation } from '../../components/FeedbackAnimation';
import { RobotProgress } from './RobotProgress';
import {
  startNewGame,
  guessLetter,
  isWin,
  isGameOver,
  revealFirstLetter,
  revealRandomLetter,
  getDisplayWord,
  generateLetterOptions,
} from './HangmanLogic';
import type { HangmanState } from './types';
import { recordGamePlayed } from '../../utils/stats';
import { addCorrectAnswer, markLevelRewardSeen } from '../../rewards/RewardLogic';
import { LevelUpRocketScreen } from '../../components/LevelUpRocketScreen';
import { GameScreenTopBar } from '../../components/GameScreenTopBar';
import type { Reward } from '../../rewards/rewards';
import * as Speech from 'expo-speech';

type Nav = NativeStackNavigationProp<RootStackParamList, 'HangmanGame'>;

interface Props {
  navigation: Nav;
}

const initGame = (): { state: HangmanState; letters: string[] } => {
  const g = startNewGame();
  return { state: g, letters: generateLetterOptions(g.word) };
};

export const HangmanGameScreen: React.FC<Props> = () => {
  const [{ state, letters: letterOptions }, setGame] = useState(initGame);
  const [helpLevel, setHelpLevel] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'encouragement'>('success');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>(undefined);

  useEffect(() => {
    recordGamePlayed();
  }, []);

  const won = isWin(state);
  const over = isGameOver(state);
  const playing = !won && !over;
  const guessedSet = useMemo(() => new Set(state.guessedLetters), [state.guessedLetters]);

  const handleLetter = async (letter: string) => {
    if (!playing) return;
    const next = guessLetter(state, letter);
    setGame((prev) => ({ ...prev, state: next }));
    if (next.guessedLetters.includes(letter.toLowerCase().trim())) {
      setFeedbackMessage('Nagyszerű! ⭐');
      setFeedbackType('success');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1200);
    }
    if (isWin(next)) {
      setFeedbackMessage('Megvan! 🎉');
      setFeedbackType('success');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
      const { leveledUp, newLevel, reward } = await addCorrectAnswer();
      if (leveledUp && newLevel != null) {
        setLevelUpLevel(newLevel);
        setLevelUpReward(reward);
        setShowLevelUp(true);
      }
    }
  };

  const handleHelp = () => {
    if (!playing) return;
    if (helpLevel === 0) {
      Speech.speak(state.word, { language: 'hu-HU', rate: 0.9 });
      setFeedbackMessage('Hallgasd meg! 👂');
      setFeedbackType('encouragement');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
      setHelpLevel(1);
      return;
    }
    if (helpLevel === 1) {
      setGame((prev) => ({ ...prev, state: revealFirstLetter(state) }));
      setFeedbackMessage('Első betű megmutatva ✨');
      setFeedbackType('encouragement');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1200);
      setHelpLevel(2);
      return;
    }
    if (helpLevel === 2) {
      setGame((prev) => ({ ...prev, state: revealRandomLetter(state) }));
      setFeedbackMessage('Még egy betű segít! ✨');
      setFeedbackType('encouragement');
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1200);
    }
  };

  const handleNewGame = () => {
    setGame(initGame());
    setHelpLevel(0);
    setShowFeedback(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameScreenTopBar />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Építsük meg a robotot!</Text>
        </View>

        <View style={styles.robotWrap}>
          <RobotProgress wrongGuesses={state.wrongGuesses} isWin={won} />
        </View>

        <View style={styles.wordWrap}>
          <Text style={styles.word}>{getDisplayWord(state)}</Text>
        </View>

        {playing && (
          <>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={handleHelp}
              activeOpacity={0.8}
            >
              <Text style={styles.helpButtonText}>
                {helpLevel === 0
                  ? 'Segítség: felolvasom'
                  : helpLevel === 1
                    ? 'Segítség: első betű'
                    : 'Segítség: egy betű'}
              </Text>
            </TouchableOpacity>

            <View style={styles.lettersWrap}>
              {letterOptions.map((letter) => {
                const used = guessedSet.has(letter);
                return (
                  <TouchableOpacity
                    key={letter}
                    style={[styles.letterButton, used && styles.letterButtonUsed]}
                    onPress={() => handleLetter(letter)}
                    disabled={used}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.letterButtonText,
                        used && styles.letterButtonTextUsed,
                      ]}
                    >
                      {letter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {(won || over) && (
          <View style={styles.endWrap}>
            {won && (
              <Text style={styles.endText}>Sikerült! A szó: {state.word}</Text>
            )}
            {over && !won && (
              <Text style={styles.endText}>
                A robot elkészült! A szó: {state.word}
              </Text>
            )}
            <TouchableOpacity
              style={styles.newGameButton}
              onPress={handleNewGame}
              activeOpacity={0.8}
            >
              <Text style={styles.newGameButtonText}>Új játék</Text>
            </TouchableOpacity>
          </View>
        )}

        {playing && (
          <TouchableOpacity
            style={styles.newGameButtonSmall}
            onPress={handleNewGame}
            activeOpacity={0.8}
          >
            <Text style={styles.newGameButtonSmallText}>Új játék</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <FeedbackAnimation
        visible={showFeedback}
        message={feedbackMessage}
        type={feedbackType}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.screenPadding,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center',
  },
  robotWrap: {
    alignItems: 'center',
    marginVertical: spacing.lg,
    minHeight: 320,
  },
  wordWrap: {
    alignItems: 'center',
    marginVertical: spacing.lg,
    minHeight: 56,
  },
  word: {
    ...typography.gameWord,
    fontSize: 36,
    letterSpacing: 8,
    color: colors.primary,
  },
  helpButton: {
    alignSelf: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: spacing.cardBorderRadius,
    marginBottom: spacing.xl,
  },
  helpButtonText: {
    ...typography.button,
    color: colors.white,
  },
  lettersWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  letterButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterButtonUsed: {
    backgroundColor: colors.grayLight,
    borderColor: colors.gray,
    opacity: 0.7,
  },
  letterButtonText: {
    ...typography.button,
    fontSize: 22,
    color: colors.primary,
  },
  letterButtonTextUsed: {
    color: colors.grayDark,
  },
  endWrap: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  endText: {
    ...typography.h3,
    fontSize: 22,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  newGameButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: spacing.cardBorderRadius,
    minHeight: spacing.touchTargetMin,
    justifyContent: 'center',
  },
  newGameButtonText: {
    ...typography.buttonLarge,
    color: colors.white,
  },
  newGameButtonSmall: {
    alignSelf: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  newGameButtonSmallText: {
    ...typography.body,
    color: colors.primary,
  },
});
