/**
 * MathAdditionScreen – összeadás játék (a + b, max 10)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import {
  initializeMathAddition,
  checkAnswer,
  loadNextTask,
  type MathAdditionState,
} from '../games/mathAddition/MathAdditionLogic';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { ClassicGameLayout, GameHeroBox } from '../components/game/ClassicGameLayout';
import { classicGameStyles as gs } from '../theme/classicGameStyles';
import type { Reward } from '../rewards/rewards';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MathAdditionGame'>;

interface Props {
  navigation: Nav;
}

const APPLE_SIZE = 44;
const APPLES_PER_ROW = 5;

function AppleGroup({ count }: { count: number }) {
  const rows: number[] = [];
  let left = count;
  while (left > 0) {
    rows.push(left >= APPLES_PER_ROW ? APPLES_PER_ROW : left);
    left -= APPLES_PER_ROW;
  }
  return (
    <View style={{ alignItems: 'center' }}>
      {rows.map((rowCount, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
          {Array.from({ length: rowCount }, (_, i) => (
            <Text key={i} style={{ fontSize: APPLE_SIZE, width: APPLE_SIZE, textAlign: 'center' }}>🍎</Text>
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

  useEffect(() => { recordGamePlayed(); }, []);

  const handleAnswer = async (answer: number) => {
    if (isProcessing || !gameState.currentTask) return;
    setIsProcessing(true);
    const { isCorrect, newState } = checkAnswer(gameState, answer);
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
      setGameState(loadNextTask(newState));
      setIsProcessing(false);
    }, 2000);
  };

  if (!gameState.currentTask) {
    return (
      <ClassicGameLayout
        title="➕ összeadás"
        showFeedback={false}
        feedbackMessage=""
        showLevelUp={false}
        levelUpLevel={0}
        onCloseLevelUp={() => {}}
      >
        <View style={gs.center}><Text style={gs.loadingText}>betöltés…</Text></View>
      </ClassicGameLayout>
    );
  }

  const { a, b } = gameState.currentTask;

  return (
    <ClassicGameLayout
      title="➕ összeadás"
      score={gameState.score}
      total={gameState.totalQuestions}
      scroll
      showFeedback={showFeedback}
      feedbackMessage={feedbackMessage}
      showLevelUp={showLevelUp}
      levelUpLevel={levelUpLevel}
      levelUpReward={levelUpReward}
      onCloseLevelUp={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }}
    >
      <Text style={gs.prompt}>hány alma van összesen?</Text>
      <GameHeroBox>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
          <AppleGroup count={a} />
          <Text style={gs.heroNumber}>+</Text>
          <AppleGroup count={b} />
        </View>
      </GameHeroBox>
      <View style={gs.optionsGrid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <TouchableOpacity
            key={num}
            style={[gs.letterGridBtn, { width: 64, height: 64 }, isProcessing && gs.optionBtnDisabled]}
            onPress={() => handleAnswer(num)}
            disabled={isProcessing}
            activeOpacity={0.85}
          >
            <Text style={gs.letterGridText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ClassicGameLayout>
  );
};
