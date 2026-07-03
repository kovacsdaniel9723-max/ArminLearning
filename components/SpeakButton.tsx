/**
 * Felolvasás gomb – magyar TTS
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { colors, spacing, typography } from '../theme';
import { playClickSound } from '../utils/gameSounds';

interface SpeakButtonProps {
  text: string;
  label?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({ text, label = '🔊 felolvasom' }) => {
  const speak = () => {
    playClickSound();
    Speech.stop();
    Speech.speak(text, { language: 'hu-HU', rate: 0.9 });
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={speak} activeOpacity={0.85}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    backgroundColor: colors.panelLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: spacing.md,
  },
  text: {
    ...typography.body,
    color: colors.textOnLight,
    fontWeight: '800',
  },
});
