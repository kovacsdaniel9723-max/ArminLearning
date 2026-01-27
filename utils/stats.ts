/**
 * Statisztika kezelés
 * Játék statisztikák követése és játékidő limit kezelése
 */

import { GameStats } from '../types';
import { loadStats, saveStats, getDefaultStats, loadLastPlayDate, saveLastPlayDate } from './storage';

/**
 * Napi statisztikák resetelése ha új nap van
 */
const resetDailyStatsIfNeeded = async (stats: GameStats): Promise<GameStats> => {
  const lastPlayDate = await loadLastPlayDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!lastPlayDate) {
    await saveLastPlayDate(today);
    return {
      ...stats,
      playTimeToday: 0,
    };
  }
  
  const lastDate = new Date(lastPlayDate);
  lastDate.setHours(0, 0, 0, 0);
  
  if (lastDate.getTime() < today.getTime()) {
    // Új nap, reseteljük a napi játékidőt
    await saveLastPlayDate(today);
    return {
      ...stats,
      playTimeToday: 0,
    };
  }
  
  return stats;
};

/**
 * Statisztikák inicializálása vagy betöltése
 */
export const initializeStats = async (): Promise<GameStats> => {
  let stats = await loadStats();
  
  if (!stats) {
    stats = getDefaultStats();
    await saveStats(stats);
  }
  
  // Reseteljük a napi statisztikákat ha szükséges
  stats = await resetDailyStatsIfNeeded(stats);
  
  return stats;
};

/**
 * Játék lejátszásának rögzítése
 */
export const recordGamePlayed = async (): Promise<GameStats> => {
  let stats = await initializeStats();
  
  stats.gamesPlayed += 1;
  await saveStats(stats);
  
  return stats;
};

/**
 * Helyes válasz rögzítése
 */
export const recordCorrectAnswer = async (): Promise<GameStats> => {
  let stats = await initializeStats();
  
  stats.correctAnswers += 1;
  stats.totalAnswers += 1;
  await saveStats(stats);
  
  return stats;
};

/**
 * Helytelen válasz rögzítése
 */
export const recordIncorrectAnswer = async (): Promise<GameStats> => {
  let stats = await initializeStats();
  
  stats.totalAnswers += 1;
  await saveStats(stats);
  
  return stats;
};

/**
 * Játékidő hozzáadása
 */
export const addPlayTime = async (seconds: number): Promise<GameStats> => {
  let stats = await initializeStats();
  
  stats.playTimeToday += seconds;
  await saveStats(stats);
  
  // Frissítjük az utolsó játék dátumot
  await saveLastPlayDate(new Date());
  
  return stats;
};

/**
 * Játékidő limit ellenőrzése
 */
export const checkPlaytimeLimit = async (limitSeconds: number): Promise<boolean> => {
  const stats = await initializeStats();
  return stats.playTimeToday < limitSeconds;
};

/**
 * Hátralévő játékidő számítása
 */
export const getRemainingPlayTime = async (limitSeconds: number): Promise<number> => {
  const stats = await initializeStats();
  const remaining = limitSeconds - stats.playTimeToday;
  return Math.max(0, remaining);
};
