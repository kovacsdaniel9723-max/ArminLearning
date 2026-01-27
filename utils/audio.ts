/**
 * Audio utility
 * Hang lejátszás és felvétel kezelése
 * 
 * MEGJEGYZÉS: expo-av deprecated SDK 54-ben, de még működik.
 * A recording funkcióhoz továbbra is expo-av szükséges,
 * mert expo-audio nem támogatja a recording-ot.
 * SDK 55-ben valószínűleg új megoldás lesz.
 */

import { Audio } from 'expo-av';

/**
 * Hang lejátszása
 */
export const playSound = async (soundUri: string): Promise<void> => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri: soundUri },
      { shouldPlay: true }
    );
    
    // Várunk, amíg lejátszódik
    await new Promise<void>((resolve) => {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          resolve();
        }
      });
    });
    
    await sound.unloadAsync();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

/**
 * Hang lejátszása asset-ből
 */
export const playSoundFromAsset = async (asset: any): Promise<void> => {
  try {
    const { sound } = await Audio.Sound.createAsync(asset, { shouldPlay: true });
    
    await new Promise<void>((resolve) => {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          resolve();
        }
      });
    });
    
    await sound.unloadAsync();
  } catch (error) {
    console.error('Error playing sound from asset:', error);
  }
};

/**
 * Audio mód beállítása
 */
export const setAudioMode = async (): Promise<void> => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });
  } catch (error) {
    console.error('Error setting audio mode:', error);
  }
};
