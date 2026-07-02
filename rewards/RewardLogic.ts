/**
 * Jutalom és szint logika – központi, játékfüggetlen
 * Helyes válaszok: stats.correctAnswers (AsyncStorage, osztályszintenként).
 * Szint: minden 20 helyes = 1 szint, max 100.
 * Jutalom megjelenítés: egyszer per szint (lastRewardedLevel, osztályszintenként).
 */

import { getCurrentGrade } from '../utils/gradeState';
import {
  loadStatsForGrade,
  loadLastRewardedLevelForGrade,
  saveLastRewardedLevelForGrade,
} from '../utils/gradeStorage';
import { recordCorrectAnswer } from '../utils/stats';
import { getRewardForLevel as getRewardFromConfig, type Reward } from './rewards';

const ANSWERS_PER_LEVEL = 20;
const MAX_LEVEL = 100;

export async function getTotalCorrectAnswers(): Promise<number> {
  const grade = getCurrentGrade();
  const stats = await loadStatsForGrade(grade);
  return stats?.correctAnswers ?? 0;
}

export function getLevelFromAnswers(totalCorrectAnswers: number): number {
  const raw = Math.floor(totalCorrectAnswers / ANSWERS_PER_LEVEL);
  return Math.min(MAX_LEVEL, raw);
}

export async function getCurrentLevel(): Promise<number> {
  const total = await getTotalCorrectAnswers();
  return getLevelFromAnswers(total);
}

export function getProgressToNextLevel(totalCorrectAnswers: number): number {
  if (getLevelFromAnswers(totalCorrectAnswers) >= MAX_LEVEL) {
    return ANSWERS_PER_LEVEL;
  }
  return totalCorrectAnswers % ANSWERS_PER_LEVEL;
}

export function getProgressTowardNextLevel(totalCorrectAnswers: number): { current: number; required: number } {
  const required = ANSWERS_PER_LEVEL;
  if (getLevelFromAnswers(totalCorrectAnswers) >= MAX_LEVEL) {
    return { current: required, required };
  }
  return { current: totalCorrectAnswers % ANSWERS_PER_LEVEL, required };
}

export function hasLeveledUp(previousAnswers: number, currentAnswers: number): boolean {
  const prevLevel = getLevelFromAnswers(previousAnswers);
  const currLevel = getLevelFromAnswers(currentAnswers);
  return currLevel > prevLevel && currLevel >= 1;
}

export function getRewardForLevel(level: number): Reward | undefined {
  return getRewardFromConfig(level);
}

export async function addCorrectAnswer(): Promise<{
  leveledUp: boolean;
  newLevel?: number;
  reward?: Reward;
}> {
  const grade = getCurrentGrade();
  const previousTotal = await getTotalCorrectAnswers();
  await recordCorrectAnswer();
  const currentTotal = (await loadStatsForGrade(grade))?.correctAnswers ?? 0;
  const newLevel = getLevelFromAnswers(currentTotal);
  const lastRewarded = await loadLastRewardedLevelForGrade(grade);

  if (newLevel >= 1 && newLevel > lastRewarded) {
    const reward = getRewardForLevel(newLevel);
    return { leveledUp: true, newLevel, reward };
  }
  return { leveledUp: false };
}

export async function markLevelRewardSeen(level: number): Promise<void> {
  const grade = getCurrentGrade();
  await saveLastRewardedLevelForGrade(grade, level);
}

export async function recordCorrectAnswerAndCheckLevelUp(): Promise<{
  leveledUp: boolean;
  newLevel?: number;
  reward?: Reward;
}> {
  return addCorrectAnswer();
}
