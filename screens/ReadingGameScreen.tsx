/**
 * Olvasás gyakorlat – 2. osztály
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getRandomReadingTask, type ReadingTask } from '../content/grade2/readingData';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import { SpeakButton } from '../components/SpeakButton';
import { ClassicGameLayout, GameHeroBox, GameOptionButton } from '../components/game/ClassicGameLayout';
import { classicGameStyles as gs } from '../theme/classicGameStyles';
import type { Reward } from '../rewards/rewards';

export const ReadingGameScreen: React.FC = () => {
  const [task, setTask] = useState<ReadingTask>(() => getRandomReadingTask());
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
      setTask(getRandomReadingTask());
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <ClassicGameLayout
      title="📖 olvasás"
      score={score}
      total={total}
      scroll
      showFeedback={showFeedback}
      feedbackMessage={feedbackMessage}
      showLevelUp={showLevelUp}
      levelUpLevel={levelUpLevel}
      levelUpReward={levelUpReward}
      onCloseLevelUp={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }}
    >
      <GameHeroBox>
        <Text style={gs.heroText}>{task.sentence}</Text>
      </GameHeroBox>
      <SpeakButton text={`${task.sentence} ${task.question}`} />
      <Text style={gs.prompt}>{task.question}</Text>
      <View style={gs.optionsList}>
        {task.options.map((opt, i) => (
          <GameOptionButton key={i} label={opt} onPress={() => handlePick(i)} disabled={isProcessing} />
        ))}
      </View>
    </ClassicGameLayout>
  );
};
