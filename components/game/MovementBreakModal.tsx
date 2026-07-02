/**
 * Mozgásos szünet – valós mozgás kihívás, opcionális kihagyás
 */

import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import type { MovementChallenge } from '../../content/grade2/testnevData';

interface MovementBreakModalProps {
  visible: boolean;
  challenge: MovementChallenge;
  onComplete: () => void;
  onSkip: () => void;
}

export const MovementBreakModal: React.FC<MovementBreakModalProps> = ({
  visible,
  challenge,
  onComplete,
  onSkip,
}) => {
  const [countdown, setCountdown] = useState(challenge.seconds);

  useEffect(() => {
    if (!visible) return;
    setCountdown(challenge.seconds);
    const id = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [visible, challenge]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🏃</Text>
          <Text style={styles.heading}>mozgásos szünet!</Text>
          <Text style={styles.instruction}>{challenge.text}</Text>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{countdown}</Text>
          </View>
          <TouchableOpacity style={styles.doneBtn} onPress={onComplete}>
            <Text style={styles.doneText}>kész, megcsináltam!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipBtn} onPress={onSkip}>
            <Text style={styles.skipText}>kihagyom most</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
  },
  emoji: { fontSize: 48, marginBottom: spacing.sm },
  heading: { ...typography.h2, color: colors.secondary, marginBottom: spacing.md },
  instruction: { ...typography.h3, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  timerCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  timerText: { fontSize: 32, fontWeight: '800', color: colors.accentDark },
  doneBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 16,
    width: '100%',
    marginBottom: spacing.sm,
  },
  doneText: { ...typography.button, color: colors.white, textAlign: 'center' },
  skipBtn: { padding: spacing.sm },
  skipText: { ...typography.body, color: colors.textLight },
});
