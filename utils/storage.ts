/**
 * AsyncStorage wrapper
 * Helyi adattárolás kezelése
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameStats, ParentSettings } from '../types';

const STORAGE_KEYS = {
  STATS: '@armin:stats',
  SETTINGS: '@armin:settings',
  LAST_PLAY_DATE: '@armin:lastPlayDate',
  LAST_REWARDED_LEVEL: '@armin:lastRewardedLevel',
} as const;

/**
 * Statisztikák mentése
 */
export const saveStats = async (stats: GameStats): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving stats:', error);
  }
};

/**
 * Statisztikák betöltése
 */
export const loadStats = async (): Promise<GameStats | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error loading stats:', error);
    return null;
  }
};

/**
 * Alapértelmezett statisztikák
 */
export const getDefaultStats = (): GameStats => ({
  gamesPlayed: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  playTimeToday: 0,
});

/**
 * Beállítások mentése
 */
export const saveSettings = async (settings: ParentSettings): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

/**
 * Beállítások betöltése
 */
export const loadSettings = async (): Promise<ParentSettings | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

/**
 * Alapértelmezett beállítások
 */
export const getDefaultSettings = (): ParentSettings => ({
  dailyPlaytimeLimit: 600, // 10 perc
  pin: '1234', // Hardcoded PIN
});

/**
 * Utolsó játék dátum mentése
 */
export const saveLastPlayDate = async (date: Date): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_PLAY_DATE, date.toISOString());
  } catch (error) {
    console.error('Error saving last play date:', error);
  }
};

/**
 * Utolsó játék dátum betöltése
 */
export const loadLastPlayDate = async (): Promise<Date | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LAST_PLAY_DATE);
    if (data) {
      return new Date(data);
    }
    return null;
  } catch (error) {
    console.error('Error loading last play date:', error);
    return null;
  }
};

/**
 * Utolsó megjelenített jutalom szint mentése (egyszer per szint)
 */
export const saveLastRewardedLevel = async (level: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_REWARDED_LEVEL, String(level));
  } catch (error) {
    console.error('Error saving last rewarded level:', error);
  }
};

/**
 * Utolsó megjelenített jutalom szint betöltése
 */
export const loadLastRewardedLevel = async (): Promise<number> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LAST_REWARDED_LEVEL);
    if (data) {
      const n = parseInt(data, 10);
      return isNaN(n) ? 0 : n;
    }
    return 0;
  } catch (error) {
    console.error('Error loading last rewarded level:', error);
    return 0;
  }
};
