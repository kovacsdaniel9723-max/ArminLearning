/**
 * „Építsük meg a robotot!” – gyerekbarát, 12 lépéses robot építő
 */

import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types';
import {
  ClassicGameLayout,
  GameHeroBox,
  GameActionButton,
} from '../../components/game/ClassicGameLayout';
import { classicGameStyles as gs } from '../../theme/classicGameStyles';
import { colors } from '../../theme';
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
  const [feedbackSuccess, setFeedbackSuccess] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>(undefined);

  useEffect(() => { recordGamePlayed(); }, []);

  const won = isWin(state);
  const over = isGameOver(state);
  const playing = !won && !over;
  const guessedSet = useMemo(() => new Set(state.guessedLetters), [state.guessedLetters]);

  const handleLetter = async (letter: string) => {
    if (!playing) return;
    const next = guessLetter(state, letter);
    setGame((prev) => ({ ...prev, state: next }));
    if (next.guessedLetters.includes(letter.toLowerCase().trim())) {
      setFeedbackMessage('ügyes! ⭐');
      setFeedbackSuccess(true);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1200);
    }
    if (isWin(next)) {
      setFeedbackMessage('megvan! 🎉');
      setFeedbackSuccess(true);
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
      setFeedbackMessage('hallgasd meg! 👂');
      setFeedbackSuccess(false);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
      setHelpLevel(1);
      return;
    }
    if (helpLevel === 1) {
      setGame((prev) => ({ ...prev, state: revealFirstLetter(state) }));
      setFeedbackMessage('első betű megmutatva ✨');
      setFeedbackSuccess(false);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1200);
      setHelpLevel(2);
      return;
    }
    if (helpLevel === 2) {
      setGame((prev) => ({ ...prev, state: revealRandomLetter(state) }));
      setFeedbackMessage('még egy betű segít! ✨');
      setFeedbackSuccess(false);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1200);
    }
  };

  const handleNewGame = () => {
    setGame(initGame());
    setHelpLevel(0);
    setShowFeedback(false);
  };

  const helpLabel =
    helpLevel === 0 ? 'segítség: felolvasom' : helpLevel === 1 ? 'segítség: első betű' : 'segítség: egy betű';

  return (
    <ClassicGameLayout
      title="🤖 építsük meg a robotot!"
      scroll
      showFeedback={showFeedback}
      feedbackMessage={feedbackMessage}
      feedbackSuccess={feedbackSuccess}
      showLevelUp={showLevelUp}
      levelUpLevel={levelUpLevel}
      levelUpReward={levelUpReward}
      onCloseLevelUp={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }}
    >
      <View style={{ alignItems: 'center', marginVertical: 8, minHeight: 300 }}>
        <RobotProgress wrongGuesses={state.wrongGuesses} isWin={won} />
      </View>

      <GameHeroBox>
        <Text style={gs.heroWord}>{getDisplayWord(state)}</Text>
      </GameHeroBox>

      {playing && (
        <>
          <GameActionButton label={helpLabel} onPress={handleHelp} />
          <View style={gs.optionsGrid}>
            {letterOptions.map((letter) => {
              const used = guessedSet.has(letter);
              return (
                <TouchableOpacity
                  key={letter}
                  style={[gs.letterGridBtn, used && gs.optionBtnUsed]}
                  onPress={() => handleLetter(letter)}
                  disabled={used}
                  activeOpacity={0.85}
                >
                  <Text style={[gs.letterGridText, used && { color: colors.textOnLightMuted }]}>{letter}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      {(won || over) && (
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          {won && <Text style={gs.prompt}>sikerült! a szó: {state.word}</Text>}
          {over && !won && <Text style={gs.prompt}>a robot elkészült! a szó: {state.word}</Text>}
          <GameActionButton label="új játék" onPress={handleNewGame} secondary />
        </View>
      )}

      {playing && (
        <TouchableOpacity onPress={handleNewGame} style={{ alignSelf: 'center', marginTop: 12 }}>
          <Text style={{ color: '#67E8FF', fontWeight: '700' }}>új játék</Text>
        </TouchableOpacity>
      )}
    </ClassicGameLayout>
  );
};
