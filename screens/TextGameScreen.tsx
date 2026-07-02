/**
 * TextGameScreen – szövegalapú játékok (3 mód)
 */

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import {
  ClassicGameLayout,
  GameHeroBox,
  GameOptionButton,
} from '../components/game/ClassicGameLayout';
import { classicGameStyles as gs } from '../theme/classicGameStyles';
import type { Reward } from '../rewards/rewards';
import {
  initializeWordPictureGame,
  checkAnswer as checkWordPicture,
  loadNextQuestion as loadNextWordPicture,
  WordPictureGameState,
} from '../games/textGames/WordPictureMatching';
import {
  initializeMissingLetterGame,
  checkAnswer as checkMissingLetter,
  loadNextQuestion as loadNextMissingLetter,
  formatWordWithMissingLetter,
  MissingLetterGameState,
} from '../games/textGames/MissingLetter';
import {
  initializeFirstLetterGame,
  checkAnswer as checkFirstLetter,
  loadNextQuestion as loadNextFirstLetter,
  FirstLetterGameState,
} from '../games/textGames/FirstLetterSelection';

type TextGameScreenRouteProp = RouteProp<RootStackParamList, 'TextGame'>;
type TextGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TextGame'>;

interface TextGameScreenProps {
  route: TextGameScreenRouteProp;
  navigation: TextGameScreenNavigationProp;
}

type GameState = WordPictureGameState | MissingLetterGameState | FirstLetterGameState;

const TITLES: Record<string, string> = {
  wordPicture: '🖼️ szó–kép',
  missingLetter: '✏️ hiányzó betű',
  firstLetter: '🔤 első betű',
};

export const TextGameScreen: React.FC<TextGameScreenProps> = ({ route }) => {
  const { gameType } = route.params;
  const [gameState, setGameState] = useState<GameState>(() => {
    switch (gameType) {
      case 'wordPicture': return initializeWordPictureGame();
      case 'missingLetter': return initializeMissingLetterGame();
      case 'firstLetter': return initializeFirstLetterGame();
    }
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>(undefined);

  useEffect(() => { recordGamePlayed(); }, []);

  const handleAnswer = async (selectedIndex: number) => {
    if (isProcessing || !gameState.currentQuestion) return;
    setIsProcessing(true);
    let result: { isCorrect: boolean; newState: GameState };
    switch (gameType) {
      case 'wordPicture':
        result = checkWordPicture(gameState as WordPictureGameState, selectedIndex);
        break;
      case 'missingLetter':
        result = checkMissingLetter(gameState as MissingLetterGameState, selectedIndex);
        break;
      case 'firstLetter':
        result = checkFirstLetter(gameState as FirstLetterGameState, selectedIndex);
        break;
      default:
        return;
    }
    if (result.isCorrect) {
      setFeedbackMessage('ügyes vagy! 🎉');
      const { leveledUp, newLevel, reward } = await recordCorrectAnswerAndCheckLevelUp();
      if (leveledUp && newLevel != null) {
        setLevelUpLevel(newLevel);
        setLevelUpReward(reward);
        setShowLevelUp(true);
      }
      setShowFeedback(true);
      setGameState(result.newState);
      setTimeout(() => {
        setShowFeedback(false);
        let nextState: GameState;
        switch (gameType) {
          case 'wordPicture':
            nextState = loadNextWordPicture(result.newState as WordPictureGameState);
            break;
          case 'missingLetter':
            nextState = loadNextMissingLetter(result.newState as MissingLetterGameState);
            break;
          case 'firstLetter':
            nextState = loadNextFirstLetter(result.newState as FirstLetterGameState);
            break;
          default:
            return;
        }
        setGameState(nextState);
        setIsProcessing(false);
      }, 2000);
    } else {
      setFeedbackMessage('próbáld újra! 💪');
      await recordIncorrectAnswer();
      setShowFeedback(true);
      setGameState(result.newState);
      setTimeout(() => {
        setShowFeedback(false);
        setIsProcessing(false);
      }, 2000);
    }
  };

  const renderContent = () => {
    if (!gameState.currentQuestion) {
      return (
        <View style={gs.center}>
          <Text style={gs.loadingText}>betöltés…</Text>
        </View>
      );
    }
    switch (gameType) {
      case 'wordPicture': {
        const q = gameState.currentQuestion as WordPictureGameState['currentQuestion'] & { image: string; words: string[] };
        return (
          <>
            <GameHeroBox>
              <Text style={{ fontSize: 100 }}>{q!.image}</Text>
            </GameHeroBox>
            <View style={gs.optionsList}>
              {q!.words.map((word, i) => (
                <GameOptionButton key={i} label={word} onPress={() => handleAnswer(i)} disabled={isProcessing} />
              ))}
            </View>
          </>
        );
      }
      case 'missingLetter': {
        const q = gameState.currentQuestion as MissingLetterGameState['currentQuestion'] & { options: string[] };
        return (
          <>
            <GameHeroBox>
              <Text style={gs.heroWord}>{formatWordWithMissingLetter(q!)}</Text>
            </GameHeroBox>
            <View style={gs.optionsGrid}>
              {q!.options.map((opt, i) => (
                <GameOptionButton key={i} label={opt} onPress={() => handleAnswer(i)} disabled={isProcessing} small />
              ))}
            </View>
          </>
        );
      }
      case 'firstLetter': {
        const q = gameState.currentQuestion as FirstLetterGameState['currentQuestion'] & { image: string; options: string[] };
        return (
          <>
            <GameHeroBox>
              <Text style={{ fontSize: 100 }}>{q!.image}</Text>
            </GameHeroBox>
            <Text style={gs.prompt}>melyik betűvel kezdődik ez a szó?</Text>
            <View style={gs.optionsGrid}>
              {q!.options.map((opt, i) => (
                <GameOptionButton key={i} label={opt} onPress={() => handleAnswer(i)} disabled={isProcessing} />
              ))}
            </View>
          </>
        );
      }
    }
  };

  return (
    <ClassicGameLayout
      title={TITLES[gameType] ?? '📚 szöveg'}
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
      {renderContent()}
    </ClassicGameLayout>
  );
};
