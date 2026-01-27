/**
 * FeedbackAnimation komponens
 * Pozitív visszajelzések animációval
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { colors, spacing, typography } from '../theme';

interface FeedbackAnimationProps {
  visible: boolean;
  message?: string;
  type?: 'success' | 'encouragement';
  onAnimationComplete?: () => void;
}

export const FeedbackAnimation: React.FC<FeedbackAnimationProps> = ({
  visible,
  message = 'Nagyszerű!',
  type = 'success',
  onAnimationComplete,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animáció indítása
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide 2 másodperc után
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        });
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // Reset animációk
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim, onAnimationComplete]);

  if (!visible) {
    return null;
  }

  const getEmoji = () => {
    switch (type) {
      case 'success':
        return '🎉';
      case 'encouragement':
        return '👏';
      default:
        return '✨';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.emoji}>{getEmoji()}</Text>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    marginLeft: -100,
    width: 200,
    backgroundColor: colors.successLight,
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.success,
    zIndex: 1000,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.h3,
    color: colors.success,
    textAlign: 'center',
  },
});
