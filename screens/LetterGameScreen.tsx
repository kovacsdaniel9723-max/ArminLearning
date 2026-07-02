/**
 * Betűfelismerő játék képernyő
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  initializeLetterGame,
  checkAnswer,
  loadNextQuestion,
  LetterGameState,
} from '../games/letterGame/LetterGameLogic';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import {
  ClassicGameLayout,
  GameHeroBox,
  GameOptionButton,
} from '../components/game/ClassicGameLayout';
import { classicGameStyles as gs } from '../theme/classicGameStyles';
import type { Reward } from '../rewards/rewards';

export const LetterGameScreen: React.FC = () => {
  const [gameState, setGameState] = useState<LetterGameState>(initializeLetterGame());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>();

  useEffect(() => { recordGamePlayed(); }, []);

  const handleAnswer = async (selectedIndex: number) => {
    if (isProcessing || !gameState.currentQuestion) return;
    setIsProcessing(true);
    const { isCorrect, newState } = checkAnswer(gameState, selectedIndex);
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
    setTimeout(() => {
      setShowFeedback(false);
      setGameState(loadNextQuestion(newState));
      setIsProcessing(false);
    }, 2000);
  };

  if (!gameState.currentQuestion) {
    return (
      <ClassicGameLayout
        title="🔤 betűfelismerő"
        showFeedback={false}
        feedbackMessage=""
        showLevelUp={false}
        levelUpLevel={0}
        onCloseLevelUp={() => {}}
      >
        <View style={gs.center}>
          <Text style={gs.loadingText}>betöltés…</Text>
        </View>
      </ClassicGameLayout>
    );
  }

  return (
    <ClassicGameLayout
      title="🔤 betűfelismerő"
      score={gameState.score}
      total={gameState.totalQuestions}
      showFeedback={showFeedback}
      feedbackMessage={feedbackMessage}
      showLevelUp={showLevelUp}
      levelUpLevel={levelUpLevel}
      levelUpReward={levelUpReward}
      onCloseLevelUp={() => { markLevelRewardSeen(levelUpLevel); setShowLevelUp(false); }}
    >
      <Text style={gs.prompt}>melyik szó kezdődik ezzel a betűvel?</Text>
      <GameHeroBox>
        <Text style={gs.heroLetter}>{gameState.currentQuestion.letter}</Text>
      </GameHeroBox>
      <View style={gs.optionsList}>
        {gameState.currentQuestion.options.map((option, index) => (
          <GameOptionButton
            key={index}
            label={option.word}
            onPress={() => handleAnswer(index)}
            disabled={isProcessing}
          />
        ))}
      </View>
    </ClassicGameLayout>
  );
};
