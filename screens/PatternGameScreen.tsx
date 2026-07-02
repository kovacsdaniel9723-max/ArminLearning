/**
 * Sorozat / minta játék – 2. osztály
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getRandomPatternTask, type PatternTask } from '../content/grade2/patternData';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import {
  ClassicGameLayout,
  GameHeroBox,
  GameOptionButton,
} from '../components/game/ClassicGameLayout';
import { classicGameStyles as gs } from '../theme/classicGameStyles';
import type { Reward } from '../rewards/rewards';

export const PatternGameScreen: React.FC = () => {
  const [task, setTask] = useState<PatternTask>(() => getRandomPatternTask());
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>();

  useEffect(() => { recordGamePlayed(); }, []);

  const handlePick = async (index: number) => {
    if (isProcessing) return;
    setIsProcessing(true);
    const ok = index === task.correctIndex;
    setTotal((t) => t + 1);
    if (ok) {
      setScore((s) => s + 1);
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
    setTimeout(() => {
      setShowFeedback(false);
      setTask(getRandomPatternTask());
      setIsProcessing(false);
    }, 2000);
  };

  const seqDisplay = [...task.sequence, '?'].join('  ');

  return (
    <ClassicGameLayout
      title="🔢 sorozat"
      score={score}
      total={total}
      showFeedback={showFeedback}
      feedbackMessage={feedbackMessage}
      showLevelUp={showLevelUp}
      levelUpLevel={levelUpLevel}
      levelUpReward={levelUpReward}
      onCloseLevelUp={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }}
    >
      <Text style={gs.prompt}>mi jön ezután?</Text>
      <GameHeroBox>
        <Text style={gs.heroNumber}>{seqDisplay}</Text>
      </GameHeroBox>
      <View style={gs.optionsGrid}>
        {task.options.map((opt, i) => (
          <GameOptionButton
            key={i}
            label={String(opt)}
            onPress={() => handlePick(i)}
            disabled={isProcessing}
            small
          />
        ))}
      </View>
    </ClassicGameLayout>
  );
};
