/**
 * Szintlépés ünnepély – nyugodt rakéta animáció.
 * A rakéta a ház mellett indul, lassan felszáll az ég felé.
 * Csak szintlépéskor jelenik meg; a jutalmat a szülő adja oda.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { colors, spacing, typography } from '../theme';
import type { Reward } from '../rewards/rewards';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ROCKET_TRAVEL_HEIGHT = SCREEN_HEIGHT * 0.55;
const ANIMATION_DURATION_MS = 2000;
const LAUNCH_DELAY_MS = 400;

interface LevelUpRocketScreenProps {
  visible: boolean;
  level: number;
  reward: Reward | undefined;
  onClose: () => void;
}

// Egyszerű csillagok (statikus pontok) – nem villognak
function StarField() {
  const positions = [
    { top: 24, left: 32 },
    { top: 48, left: 280 },
    { top: 72, left: 64 },
    { top: 40, left: 160 },
    { top: 56, left: 240 },
    { top: 32, left: 320 },
    { top: 80, left: 200 },
    { top: 16, left: 100 },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <View
          key={i}
          style={[styles.star, { top: pos.top, left: pos.left }]}
        />
      ))}
    </>
  );
}

export const LevelUpRocketScreen: React.FC<LevelUpRocketScreenProps> = ({
  visible,
  level,
  reward,
  onClose,
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    if (!visible) {
      translateY.setValue(0);
      setAnimationDone(false);
      return;
    }

    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -ROCKET_TRAVEL_HEIGHT,
        duration: ANIMATION_DURATION_MS,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setAnimationDone(true));
    }, LAUNCH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [visible, translateY]);

  if (!visible) return null;

  const rewardText = reward?.description ?? '';

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Háttér rétegek: föld (ház), ég, űr */}
        <View style={styles.ground}>
          <Text style={styles.house}>🏠</Text>
        </View>
        <View style={styles.sky} />
        <View style={styles.space}>
          <StarField />
        </View>
        {/* Rákéta a háttér fölé – indul a föld szintjén, felfelé animál */}
        <Animated.View
          style={[
            styles.rocketWrap,
            {
              transform: [{ translateY }],
            },
          ]}
          pointerEvents="none"
        >
          <View style={styles.rocketColumn}>
            <Text style={styles.rocket}>🚀</Text>
            <View style={styles.flame} />
          </View>
        </Animated.View>

        {/* Szöveg felül – mindig látható, nagy kontraszt */}
        <View style={styles.textOverlay} pointerEvents="box-none">
          <Text style={styles.title}>szintet léptél!</Text>
          <Text style={styles.subtitle}>elérted a(z) {level}. szintet</Text>
        </View>

        {/* Animáció után: jutalom szöveg + gomb */}
        {animationDone && (
          <View style={styles.bottomCard}>
            <View style={styles.rewardBlock}>
              <Text style={styles.rewardLabel}>jutalom:</Text>
              <Text style={styles.rewardDescription}>{rewardText}</Text>
              <Text style={styles.parentNote}>a szülő adja oda a jutalmat</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>tovább</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: '#8B9A6B',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  house: {
    fontSize: 56,
  },
  rocketWrap: {
    position: 'absolute',
    bottom: 132,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  rocketColumn: {
    alignItems: 'center',
  },
  rocket: {
    fontSize: 52,
  },
  flame: {
    width: 16,
    height: 20,
    backgroundColor: colors.accent,
    marginTop: -4,
    borderRadius: 8,
    opacity: 0.9,
    alignSelf: 'center',
  },
  sky: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 140,
    top: SCREEN_HEIGHT * 0.35,
    backgroundColor: '#87CEEB',
  },
  space: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: '#0f172a',
  },
  star: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
    opacity: 0.9,
  },
  textOverlay: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.lg,
    right: spacing.lg,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    color: colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    ...typography.h2,
    fontSize: 22,
    color: colors.white,
    textAlign: 'center',
    marginTop: spacing.sm,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.backgroundLight,
    borderTopLeftRadius: spacing.cardBorderRadius * 1.5,
    borderTopRightRadius: spacing.cardBorderRadius * 1.5,
    padding: spacing.xl,
    paddingBottom: spacing.xxl + 16,
    alignItems: 'center',
  },
  rewardBlock: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  rewardLabel: {
    ...typography.body,
    color: colors.textLight,
  },
  rewardDescription: {
    ...typography.h3,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  parentNote: {
    ...typography.bodySmall,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.md,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.cardBorderRadius,
    minHeight: spacing.touchTargetMin,
    justifyContent: 'center',
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.buttonLarge,
    color: colors.white,
  },
});
