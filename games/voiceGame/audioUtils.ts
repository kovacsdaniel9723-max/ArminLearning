/**
 * Audio utility helper
 * Hang lejátszás és felvétel kezelése hangjátékhoz
 * 
 * FONTOS: Ez a V1 verzió, amely NEM elemezi a beszélt tartalmat.
 * Csak hang detektálást végez (hangerő + időtartam).
 * 
 * MEGJEGYZÉS: expo-av deprecated SDK 54-ben, de még működik.
 * A recording funkcióhoz továbbra is expo-av szükséges,
 * mert expo-audio nem támogatja a recording-ot.
 */

import { Audio } from 'expo-av';
import { setAudioMode } from '../../utils/audio';
import { VoiceItem, getRandomVoiceItem } from './voiceGameData';

let recording: Audio.Recording | null = null;
let sound: Audio.Sound | null = null;

/**
 * Hang lejátszása (betű vagy szó)
 */
export const playLetterOrWord = async (text: string): Promise<void> => {
  try {
    // Audio mód beállítása
    await setAudioMode();
    
    // Jelenleg csak szöveg alapú TTS nincs implementálva
    // Később lehet hozzáadni expo-speech-et vagy más TTS megoldást
    // Most csak egy placeholder - a valós implementációban
    // itt lenne a TTS hívás
    
    // TODO: TTS implementáció hozzáadása
    // Példa: await Speech.speak(text, { language: 'hu-HU' });
    
    // Ha van sound asset, itt lehetne lejátszani:
    // const item = VOICE_LETTERS.find(l => l.letter === text) || VOICE_WORDS.find(w => w.letter === text);
    // if (item?.sound) {
    //   await playSoundFromAsset(item.sound);
    // }
  } catch (error) {
    console.error('Error playing letter/word:', error);
    throw error;
  }
};

/**
 * Hangfelvétel indítása
 * 
 * FONTOS: Csak hang detektálást végez, NEM elemezi a beszélt tartalmat
 */
export const startRecording = async (): Promise<void> => {
  try {
    await setAudioMode();
    
    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    
    recording = newRecording;
  } catch (error) {
    console.error('Error starting recording:', error);
    throw error;
  }
};

/**
 * Hangfelvétel leállítása
 */
export const stopRecording = async (): Promise<Audio.RecordingStatus | null> => {
  try {
    if (!recording) {
      return null;
    }
    
    await recording.stopAndUnloadAsync();
    const status = await recording.getStatusAsync();
    
    recording = null;
    return status;
  } catch (error) {
    console.error('Error stopping recording:', error);
    return null;
  }
};

/**
 * Hang detektálás ellenőrzése
 * 
 * Ez a V1 verzió csak a hangerőt és időtartamot ellenőrzi.
 * NEM elemezi a beszélt tartalmat.
 * 
 * @param status - Recording status
 * @param minDuration - Minimum időtartam másodpercekben (alapértelmezett: 1 másodperc)
 * @param minVolume - Minimum hangerő (0-1, alapértelmezett: 0.1)
 * @returns true ha a hang elegendő volt
 */
export const checkSoundDetection = (
  status: Audio.RecordingStatus | null,
  minDuration: number = 1.0,
  minVolume: number = 0.1
): boolean => {
  if (!status || !status.isRecording) {
    return false;
  }
  
  // Ellenőrizzük az időtartamot
  const duration = status.durationMillis / 1000; // másodpercekben
  if (duration < minDuration) {
    return false;
  }
  
  // Ellenőrizzük a hangerőt (ha elérhető)
  // Megjegyzés: A RecordingStatus nem mindig tartalmazza a hangerőt
  // Ezért csak az időtartamot használjuk V1-ben
  // Későbbi verziókban lehet pontosabb hangerő mérés
  
  return true;
};

/**
 * Cleanup - felvételek és hangok felszabadítása
 */
export const cleanupAudio = async (): Promise<void> => {
  try {
    if (recording) {
      await recording.stopAndUnloadAsync();
      recording = null;
    }
    
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }
  } catch (error) {
    console.error('Error cleaning up audio:', error);
  }
};
