/**
 * Rang és avatar szintenként (1–100)
 */

export interface PlayerRank {
  id: string;
  title: string;
  emoji: string;
  color: string;
  minLevel: number;
  maxLevel: number;
}

export const PLAYER_RANKS: PlayerRank[] = [
  { id: 'rookie', title: 'űrtanuló', emoji: '🌱', color: '#7CFF6B', minLevel: 0, maxLevel: 5 },
  { id: 'explorer', title: 'felfedező', emoji: '🔭', color: '#67E8FF', minLevel: 6, maxLevel: 15 },
  { id: 'adventurer', title: 'kalandor', emoji: '🗺️', color: '#00D4FF', minLevel: 16, maxLevel: 30 },
  { id: 'pilot', title: 'űrhajós', emoji: '🚀', color: '#4A90E2', minLevel: 31, maxLevel: 50 },
  { id: 'guardian', title: 'bolygóőr', emoji: '🛸', color: '#B388FF', minLevel: 51, maxLevel: 70 },
  { id: 'hero', title: 'galaxisvédő', emoji: '⭐', color: '#FFB347', minLevel: 71, maxLevel: 85 },
  { id: 'super', title: 'szuperhős', emoji: '🦸', color: '#FF6B2C', minLevel: 86, maxLevel: 99 },
  { id: 'legend', title: 'legenda', emoji: '👑', color: '#FFD700', minLevel: 100, maxLevel: 100 },
];

export function getRankForLevel(level: number): PlayerRank {
  const clamped = Math.max(0, Math.min(100, level));
  return (
    PLAYER_RANKS.find((r) => clamped >= r.minLevel && clamped <= r.maxLevel) ??
    PLAYER_RANKS[0]
  );
}

export function getNextRank(level: number): PlayerRank | null {
  const current = getRankForLevel(level);
  const idx = PLAYER_RANKS.findIndex((r) => r.id === current.id);
  if (idx < 0 || idx >= PLAYER_RANKS.length - 1) return null;
  return PLAYER_RANKS[idx + 1];
}
