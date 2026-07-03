/**
 * Közös játékmenet: időzítő, sorozat, jutalom, mozgásos szünet
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { recordIncorrectAnswer, recordGamePlayed } from '../utils/stats';
import { recordCorrectAnswerAndCheckLevelUp, markLevelRewardSeen } from '../rewards/RewardLogic';
import type { Reward } from '../rewards/rewards';
import { pickMovementChallenge } from '../content/grade2/testnevData';
import { primeCelebrationAudio } from '../utils/celebrationSound';

export interface GameSessionOptions {
  roundSeconds?: number;
  /** Hány helyes után jöhet mozgásos szünet (alapértelmezett: 3) */
  movementEvery?: number;
  /** Mozgásos szünet bekapcsolva */
  movementEnabled?: boolean;
  /** Idő lejártakor (új kör / reset callback) */
  onRoundTimeout?: () => void;
}

export function useGameSession(options: GameSessionOptions = {}) {
  const roundSeconds = options.roundSeconds ?? 45;
  const movementEvery = options.movementEvery ?? 3;
  const movementEnabled = options.movementEnabled !== false;

  const [timeLeft, setTimeLeft] = useState(roundSeconds);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpLevel, setLevelUpLevel] = useState(0);
  const [levelUpReward, setLevelUpReward] = useState<Reward | undefined>();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'encouragement'>('success');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMovement, setShowMovement] = useState(false);
  const [movementChallenge, setMovementChallenge] = useState(pickMovementChallenge());
  const correctSinceMovement = useRef(0);
  const timerActive = useRef(true);
  const timeoutHandled = useRef(false);
  const onRoundTimeoutRef = useRef(options.onRoundTimeout);
  onRoundTimeoutRef.current = options.onRoundTimeout;

  useEffect(() => {
    recordGamePlayed();
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(roundSeconds);
    timerActive.current = true;
  }, [roundSeconds]);

  useEffect(() => {
    if (!timerActive.current || isProcessing || showMovement || showLevelUp) return;
    if (timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          timerActive.current = false;
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft, isProcessing, showMovement, showLevelUp]);

  const closeLevelUp = useCallback(() => {
    markLevelRewardSeen(levelUpLevel);
    setShowLevelUp(false);
    resetTimer();
  }, [levelUpLevel, resetTimer]);

  const showSuccess = useCallback((msg = 'ügyes vagy! 🎉') => {
    setFeedbackMessage(msg);
    setFeedbackType('success');
    setShowFeedback(true);
  }, []);

  const showRetry = useCallback((msg = 'próbáld újra 🙂') => {
    setFeedbackMessage(msg);
    setFeedbackType('encouragement');
    setShowFeedback(true);
  }, []);

  const hideFeedback = useCallback(() => setShowFeedback(false), []);

  const maybeShowMovement = useCallback(() => {
    if (!movementEnabled) return false;
    correctSinceMovement.current += 1;
    if (correctSinceMovement.current >= movementEvery) {
      correctSinceMovement.current = 0;
      setMovementChallenge(pickMovementChallenge());
      setShowMovement(true);
      timerActive.current = false;
      return true;
    }
    return false;
  }, [movementEnabled, movementEvery]);

  const handleCorrect = useCallback(async (onAfter?: () => void) => {
    primeCelebrationAudio();
    setIsProcessing(true);
    setStreak((s) => s + 1);
    showSuccess();
    const { leveledUp, newLevel, reward } = await recordCorrectAnswerAndCheckLevelUp();
    if (leveledUp && newLevel != null) {
      setLevelUpLevel(newLevel);
      setLevelUpReward(reward);
      setShowLevelUp(true);
    }
    const hasMovement = maybeShowMovement();
    setTimeout(() => {
      hideFeedback();
      setIsProcessing(false);
      if (!hasMovement) {
        resetTimer();
        onAfter?.();
      }
    }, hasMovement ? 800 : 1200);
    return { hasMovement };
  }, [showSuccess, hideFeedback, maybeShowMovement, resetTimer]);

  const handleWrong = useCallback(async (onAfter?: () => void) => {
    setIsProcessing(true);
    setStreak(0);
    showRetry();
    await recordIncorrectAnswer();
    setTimeout(() => {
      hideFeedback();
      setIsProcessing(false);
      resetTimer();
      onAfter?.();
    }, 1200);
  }, [showRetry, hideFeedback, resetTimer]);

  useEffect(() => {
    if (timeLeft > 0) {
      timeoutHandled.current = false;
      return;
    }
    if (timeoutHandled.current || showMovement || showLevelUp || isProcessing) return;
    timeoutHandled.current = true;
    void handleWrong(onRoundTimeoutRef.current);
  }, [timeLeft, isProcessing, showMovement, showLevelUp, handleWrong]);

  const handleTimeout = useCallback(async (onAfter?: () => void) => {
    if (isProcessing) return;
    timerActive.current = false;
    await handleWrong(onAfter);
  }, [isProcessing, handleWrong]);

  const completeMovement = useCallback(async (onAfter?: () => void) => {
    setShowMovement(false);
    showSuccess('szuper mozgás! 💪');
    const { leveledUp, newLevel, reward } = await recordCorrectAnswerAndCheckLevelUp();
    if (leveledUp && newLevel != null) {
      setLevelUpLevel(newLevel);
      setLevelUpReward(reward);
      setShowLevelUp(true);
    }
    setTimeout(() => {
      hideFeedback();
      resetTimer();
      onAfter?.();
    }, 1000);
  }, [showSuccess, hideFeedback, resetTimer]);

  const skipMovement = useCallback((onAfter?: () => void) => {
    setShowMovement(false);
    resetTimer();
    onAfter?.();
  }, [resetTimer]);

  return {
    timeLeft,
    streak,
    isProcessing,
    showFeedback,
    feedbackMessage,
    feedbackType,
    showLevelUp,
    levelUpLevel,
    levelUpReward,
    closeLevelUp,
    showMovement,
    movementChallenge,
    completeMovement,
    skipMovement,
    handleCorrect,
    handleWrong,
    handleTimeout,
    resetTimer,
    setIsProcessing,
    timerExpired: timeLeft <= 0,
  };
}
