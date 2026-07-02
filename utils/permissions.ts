/**
 * Permission handling
 */

import { Platform, Alert, Linking } from 'react-native';
import { isWeb } from './platform';

export const requestMicrophonePermission = async (): Promise<boolean> => {
  if (isWeb) return true;
  try {
    const { Audio } = await import('expo-av');
    const { status } = await Audio.requestPermissionsAsync();
    
    if (status === 'granted') {
      return true;
    }
    
    if (status === 'denied') {
      Alert.alert(
        'Mikrofon engedély szükséges',
        'A hangjáték használatához mikrofon engedélyre van szükség. Kérjük, engedélyezze a beállításokban.',
        [
          { text: 'Mégse', style: 'cancel' },
          { 
            text: 'Beállítások megnyitása', 
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            }
          }
        ]
      );
    }
    
    return false;
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    return false;
  }
};

/**
 * Mikrofon engedély ellenőrzése
 */
export const checkMicrophonePermission = async (): Promise<boolean> => {
  if (isWeb) return true;
  try {
    const { Audio } = await import('expo-av');
    const { status } = await Audio.getPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error checking microphone permission:', error);
    return false;
  }
};
