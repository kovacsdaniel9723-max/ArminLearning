/**
 * Hangbeállítások – szülői kapcsoló
 */

import { loadSettings, saveSettings, getDefaultSettings } from './storage';

let cachedEnabled: boolean | null = null;

export async function loadSoundEnabled(): Promise<boolean> {
  const s = await loadSettings();
  const enabled = s?.soundEffectsEnabled ?? getDefaultSettings().soundEffectsEnabled;
  cachedEnabled = enabled;
  return enabled;
}

export function isSoundEnabledSync(): boolean {
  return cachedEnabled !== false;
}

export async function setSoundEnabled(enabled: boolean): Promise<void> {
  cachedEnabled = enabled;
  const s = (await loadSettings()) ?? getDefaultSettings();
  await saveSettings({ ...s, soundEffectsEnabled: enabled });
}

/** App induláskor */
export function primeSoundSettings(): void {
  void loadSoundEnabled();
}
