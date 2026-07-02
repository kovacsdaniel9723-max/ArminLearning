/**
 * Statisztika kezelés
 * Játék statisztikák követése – osztályszintenként külön track
 */

import { GameStats } from '../types';
import { getCurrentGrade } from './gradeState';
import {
  loadStatsForGrade,
  saveStatsForGrade,
  ensureGradeStats,
} from './gradeStorage';
import { loadLastPlayDate, saveLastPlayDate } from './storage';

const resetDailyStatsIfNeeded = async (stats: GameStats): Promise<GameStats> => {
  const lastPlayDate = await loadLastPlayDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!lastPlayDate) {
    await saveLastPlayDate(today);
    return { ...stats, playTimeToday: 0 };
  }

  const lastDate = new Date(lastPlayDate);
  lastDate.setHours(0, 0, 0, 0);

  if (lastDate.getTime() < today.getTime()) {
    await saveLastPlayDate(today);
    return { ...stats, playTimeToday: 0 };
  }

  return stats;
};

export const initializeStats = async (): Promise<GameStats> => {
  const grade = getCurrentGrade();
  let stats = await loadStatsForGrade(grade);
  if (!stats) {
    stats = await ensureGradeStats(grade);
  }
  stats = await resetDailyStatsIfNeeded(stats);
  await saveStatsForGrade(grade, stats);
  return stats;
};

export const recordGamePlayed = async (): Promise<GameStats> => {
  const grade = getCurrentGrade();
  let stats = await initializeStats();
  stats.gamesPlayed += 1;
  await saveStatsForGrade(grade, stats);
  return stats;
};

export const recordCorrectAnswer = async (): Promise<GameStats> => {
  const grade = getCurrentGrade();
  let stats = await initializeStats();
  stats.correctAnswers += 1;
  stats.totalAnswers += 1;
  await saveStatsForGrade(grade, stats);
  return stats;
};

export const recordIncorrectAnswer = async (): Promise<GameStats> => {
  const grade = getCurrentGrade();
  let stats = await initializeStats();
  stats.totalAnswers += 1;
  await saveStatsForGrade(grade, stats);
  return stats;
};

export const addPlayTime = async (seconds: number): Promise<GameStats> => {
  const grade = getCurrentGrade();
  let stats = await initializeStats();
  stats.playTimeToday += seconds;
  await saveStatsForGrade(grade, stats);
  await saveLastPlayDate(new Date());
  return stats;
};

export const checkPlaytimeLimit = async (limitSeconds: number): Promise<boolean> => {
  const stats = await initializeStats();
  return stats.playTimeToday < limitSeconds;
};

export const getRemainingPlayTime = async (limitSeconds: number): Promise<number> => {
  const stats = await initializeStats();
  return Math.max(0, limitSeconds - stats.playTimeToday);
};

/** Szülői képernyő: adott osztály statisztikái */
export const loadStatsForDisplay = async (grade: import('../types/grade').GradeLevel): Promise<GameStats> => {
  const stats = await loadStatsForGrade(grade);
  return stats ?? (await ensureGradeStats(grade));
};
