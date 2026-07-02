/**
 * Osztályszint perzisztencia + migráció a régi globális kulcsokról
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GradeLevel } from '../types/grade';
import { GameStats } from '../types';
import { getDefaultStats } from './storage';

const SELECTED_GRADE_KEY = '@armin:selectedGrade';
const LEGACY_STATS_KEY = '@armin:stats';
const LEGACY_LAST_REWARDED_KEY = '@armin:lastRewardedLevel';

function statsKey(grade: GradeLevel): string {
  return `@armin:stats:grade${grade}`;
}

function lastRewardedKey(grade: GradeLevel): string {
  return `@armin:lastRewardedLevel:grade${grade}`;
}

let migrationDone = false;

export async function migrateLegacyToGrade1(): Promise<void> {
  if (migrationDone) return;
  migrationDone = true;

  const legacyStats = await AsyncStorage.getItem(LEGACY_STATS_KEY);
  const grade1Stats = await AsyncStorage.getItem(statsKey(1));
  if (legacyStats && !grade1Stats) {
    await AsyncStorage.setItem(statsKey(1), legacyStats);
  }

  const legacyReward = await AsyncStorage.getItem(LEGACY_LAST_REWARDED_KEY);
  const grade1Reward = await AsyncStorage.getItem(lastRewardedKey(1));
  if (legacyReward != null && grade1Reward == null) {
    await AsyncStorage.setItem(lastRewardedKey(1), legacyReward);
  }
}

export async function loadSelectedGrade(): Promise<GradeLevel | null> {
  await migrateLegacyToGrade1();
  const raw = await AsyncStorage.getItem(SELECTED_GRADE_KEY);
  if (raw === '1' || raw === '2') return parseInt(raw, 10) as GradeLevel;
  return null;
}

export async function saveSelectedGrade(grade: GradeLevel): Promise<void> {
  await AsyncStorage.setItem(SELECTED_GRADE_KEY, String(grade));
}

export async function loadStatsForGrade(grade: GradeLevel): Promise<GameStats | null> {
  await migrateLegacyToGrade1();
  try {
    const data = await AsyncStorage.getItem(statsKey(grade));
    if (data) return JSON.parse(data) as GameStats;
    return null;
  } catch {
    return null;
  }
}

export async function saveStatsForGrade(grade: GradeLevel, stats: GameStats): Promise<void> {
  try {
    await AsyncStorage.setItem(statsKey(grade), JSON.stringify(stats));
  } catch (error) {
    console.error('Error saving grade stats:', error);
  }
}

export async function loadLastRewardedLevelForGrade(grade: GradeLevel): Promise<number> {
  await migrateLegacyToGrade1();
  try {
    const data = await AsyncStorage.getItem(lastRewardedKey(grade));
    if (data) {
      const n = parseInt(data, 10);
      return isNaN(n) ? 0 : n;
    }
    return 0;
  } catch {
    return 0;
  }
}

export async function saveLastRewardedLevelForGrade(grade: GradeLevel, level: number): Promise<void> {
  try {
    await AsyncStorage.setItem(lastRewardedKey(grade), String(level));
  } catch (error) {
    console.error('Error saving last rewarded level:', error);
  }
}

export async function ensureGradeStats(grade: GradeLevel): Promise<GameStats> {
  let stats = await loadStatsForGrade(grade);
  if (!stats) {
    stats = getDefaultStats();
    await saveStatsForGrade(grade, stats);
  }
  return stats;
}
