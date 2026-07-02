/**
 * Matematika – 2. osztály (összeadás, kivonás, szorzás, osztás)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, typography } from '../theme';
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
import { ClassicGameLayout, GameHeroBox } from '../components/game/ClassicGameLayout';
import { classicGameStyles as gs } from '../theme/classicGameStyles';
import type { Reward } from '../rewards/rewards';

const APPLE = '🍎';

function AppleRow({ count }: { count: number }) {
  const shown = Math.min(count, 12);
  const extra = count > 12 ? count - 12 : 0;
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, maxWidth: 280 }}>
      {Array.from({ length: shown }, (_, i) => (
        <Text key={i} style={{ fontSize: 32 }}>{APPLE}</Text>
      ))}
      {extra > 0 && <Text style={{ ...typography.body, color: colors.textLight }}>+{extra}</Text>}
    </View>
  );
}

function TaskVisual({ state }: { state: MathGrade2State }) {
  const t = state.currentTask;
  if (!t) return null;
  if (t.op === 'add') {
    return (
      <View style={{ alignItems: 'center' }}>
        <AppleRow count={t.a} />
        <Text style={gs.heroNumber}>+</Text>
        <AppleRow count={t.b} />
      </View>
    );
  }
  if (t.op === 'subtract') {
    return (
      <View style={{ alignItems: 'center' }}>
        <AppleRow count={t.a} />
        <Text style={gs.heroNumber}>−</Text>
        <AppleRow count={t.b} />
      </View>
    );
  }
  if (t.op === 'multiply' && t.groups != null && t.perGroup != null) {
    return (
      <View style={{ alignItems: 'center' }}>
        {Array.from({ length: t.groups }, (_, g) => (
          <View key={g} style={{ marginBottom: 8 }}>
            <AppleRow count={t.perGroup!} />
          </View>
        ))}
      </View>
    );
  }
  if (t.op === 'divide' && t.groups != null && t.perGroup != null) {
    return (
      <View style={{ alignItems: 'center' }}>
        <AppleRow count={t.a} />
        <Text style={gs.prompt}>{t.perGroup} alma / csoport</Text>
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
      <ClassicGameLayout
        title="🔢 matek"
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

  return (
    <ClassicGameLayout
      title="🔢 matek"
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
      <Text style={gs.prompt}>{getQuestionText(gameState.currentTask)}</Text>
      <GameHeroBox>
        <TaskVisual state={gameState} />
      </GameHeroBox>
      <View style={gs.optionsGrid}>
        {options.map((num) => (
          <TouchableOpacity
            key={num}
            style={[gs.letterGridBtn, { width: 72, height: 64 }, isProcessing && gs.optionBtnDisabled]}
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
