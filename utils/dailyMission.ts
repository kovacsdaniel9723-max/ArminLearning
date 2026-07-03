/**
 * Napi küldetés – 3 játék / nap
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GradeLevel } from '../types/grade';
import { getGamesForGrade, type GameCatalogEntry } from '../config/gameCatalog';

const KEY = '@armin:dailyMission';

export interface DailyMissionState {
  dateKey: string;
  missionIds: string[];
  completed: string[];
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function loadState(): Promise<DailyMissionState> {
  const key = todayKey();
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DailyMissionState;
      if (parsed.dateKey === key) return parsed;
    }
  } catch {
    /* új nap */
  }
  return { dateKey: key, missionIds: [], completed: [] };
}

async function saveState(state: DailyMissionState): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}

function pickMissions(grade: GradeLevel, count = 3): string[] {
  const games = getGamesForGrade(grade);
  const parts = todayKey().split('-').map(Number);
  const seed = parts[0] * 10000 + parts[1] * 100 + parts[2] + grade * 7;
  return seededShuffle(games, seed).slice(0, count).map((g) => g.id);
}

export async function getDailyMissions(grade: GradeLevel): Promise<{
  missions: GameCatalogEntry[];
  completed: string[];
  allDone: boolean;
}> {
  let state = await loadState();
  const key = todayKey();
  if (state.dateKey !== key || state.missionIds.length === 0) {
    state = { dateKey: key, missionIds: pickMissions(grade), completed: [] };
    await saveState(state);
  }
  const all = getGamesForGrade(grade);
  const missions = state.missionIds
    .map((id) => all.find((g) => g.id === id))
    .filter((g): g is GameCatalogEntry => g != null);
  return {
    missions,
    completed: state.completed,
    allDone: state.missionIds.every((id) => state.completed.includes(id)),
  };
}

export async function markDailyMissionDone(gameId: string): Promise<void> {
  const state = await loadState();
  if (state.dateKey !== todayKey()) return;
  if (!state.missionIds.includes(gameId)) return;
  if (state.completed.includes(gameId)) return;
  state.completed = [...state.completed, gameId];
  await saveState(state);
}
