/**
 * Pozitív visszajelzés – „level up” pop
 */

import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

interface FeedbackAnimationProps {
  visible: boolean;
  message?: string;
  type?: 'success' | 'encouragement';
  onAnimationComplete?: () => void;
}

export const FeedbackAnimation: React.FC<FeedbackAnimationProps> = ({
  visible,
  message = 'ügyes vagy!',
  type = 'success',
  onAnimationComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 55,
          friction: 6,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => onAnimationComplete?.());
      }, 1800);

      return () => clearTimeout(timer);
    }
    scaleAnim.setValue(0);
    opacityAnim.setValue(0);
  }, [visible, scaleAnim, opacityAnim, onAnimationComplete]);

  if (!visible) return null;

  const emoji = type === 'success' ? '🔥' : '💪';
  const borderColor = type === 'success' ? colors.secondary : colors.accent;

  return (
    <Animated.View
      style={[
        styles.container,
        shadows.glow(borderColor),
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
          borderColor,
        },
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.message, { color: borderColor }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '38%',
    alignSelf: 'center',
    width: 240,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 3,
    zIndex: 1000,
  },
  emoji: { fontSize: 56, marginBottom: spacing.sm },
  message: { ...typography.h3, textAlign: 'center' },
});
