/**
 * Szintlépés – űr-küldetés ünnep (web: hang + neon animáció)
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';
import type { Reward } from '../rewards/rewards';
import { playLevelUpFanfare, playRocketLaunch } from '../utils/celebrationSound';

const { width: W, height: H } = Dimensions.get('window');
const TRAVEL = H * 0.52;

interface LevelUpRocketScreenProps {
  visible: boolean;
  level: number;
  reward: Reward | undefined;
  onClose: () => void;
}

function StarBurst({ delay }: { delay: number }) {
  const opacity = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800 + delay * 40, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.25, duration: 800 + delay * 40, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [delay, opacity]);
  const left = (delay * 47 + 13) % (W - 24);
  const top = (delay * 31 + 7) % (H * 0.55);
  const size = 2 + (delay % 4);
  return (
    <Animated.View
      style={[styles.star, { left, top, width: size, height: size, opacity }]}
    />
  );
}

function ConfettiPiece({ index }: { index: number }) {
  const y = useRef(new Animated.Value(-20)).current;
  const x = useRef(new Animated.Value(0)).current;
  const rot = useRef(new Animated.Value(0)).current;
  const startX = (index / 12) * W;
  const hue = ['#00D4FF', '#7CFF6B', '#FF6B2C', '#FFB347', '#B388FF'][index % 5];

  useEffect(() => {
    y.setValue(-20);
    x.setValue(0);
    rot.setValue(0);
    Animated.parallel([
      Animated.timing(y, {
        toValue: H * 0.45,
        duration: 2200 + index * 80,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(x, {
        toValue: (index % 2 === 0 ? 1 : -1) * (30 + index * 8),
        duration: 2200,
        useNativeDriver: true,
      }),
      Animated.timing(rot, { toValue: 1, duration: 2200, useNativeDriver: true }),
    ]).start();
  }, [index, rot, x, y]);

  const spin = rot.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${360 + index * 40}deg`] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: 0,
        width: 8,
        height: 14,
        backgroundColor: hue,
        borderRadius: 2,
        transform: [{ translateY: y }, { translateX: x }, { rotate: spin }],
        opacity: 0.85,
      }}
    />
  );
}

export const LevelUpRocketScreen: React.FC<LevelUpRocketScreenProps> = ({
  visible,
  level,
  reward,
  onClose,
}) => {
  const rocketY = useRef(new Animated.Value(0)).current;
  const flameScale = useRef(new Animated.Value(1)).current;
  const titleScale = useRef(new Animated.Value(0.5)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;
  const activeRef = useRef(false);
  const rewardShownRef = useRef(false);
  const [showReward, setShowReward] = useState(false);

  const revealReward = () => {
    if (rewardShownRef.current || !activeRef.current) return;
    rewardShownRef.current = true;
    playLevelUpFanfare();
    setShowReward(true);
  };

  const stars = useMemo(() => Array.from({ length: 28 }, (_, i) => i), []);
  const confetti = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);

  useEffect(() => {
    if (!visible) {
      activeRef.current = false;
      rewardShownRef.current = false;
      rocketY.stopAnimation();
      rocketY.setValue(0);
      titleScale.setValue(0.5);
      titleOpacity.setValue(0);
      setShowReward(false);
      return;
    }

    activeRef.current = true;
    rewardShownRef.current = false;
    playRocketLaunch();
    setShowReward(false);

    Animated.parallel([
      Animated.spring(titleScale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ]),
    );
    pulse.start();

    const flameLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(flameScale, { toValue: 1.35, duration: 120, useNativeDriver: true }),
        Animated.timing(flameScale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      ]),
    );
    flameLoop.start();

    const fallbackTimer = setTimeout(revealReward, 3200);

    const launchTimer = setTimeout(() => {
      Animated.timing(rocketY, {
        toValue: -TRAVEL,
        duration: 2400,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && activeRef.current) revealReward();
      });
    }, 600);

    return () => {
      activeRef.current = false;
      clearTimeout(launchTimer);
      clearTimeout(fallbackTimer);
      rocketY.stopAnimation();
      pulse.stop();
      flameLoop.stop();
    };
  }, [visible, rocketY, flameScale, titleScale, titleOpacity, glowPulse]);

  if (!visible) return null;

  const rewardText = reward?.description ?? 'nagyszerű munka!';

  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.spaceBg}>
          {stars.map((i) => (
            <StarBurst key={i} delay={i} />
          ))}
          <View style={styles.nebulaTop} />
          <View style={styles.nebulaBottom} />
        </View>

        {showReward && confetti.map((i) => (
          <ConfettiPiece key={i} index={i} />
        ))}

        <Animated.View
          style={[
            styles.header,
            { opacity: titleOpacity, transform: [{ scale: titleScale }] },
          ]}
        >
          <Text style={styles.badge}>🌟 szintlépés! 🌟</Text>
          <Text style={styles.sparkleRow}>✨ ⭐ 🚀 ⭐ ✨</Text>
          <Animated.View style={[styles.levelRing, { opacity: glowPulse }, shadows.glow(colors.primary)]}>
            <Text style={styles.levelNum}>{level}</Text>
          </Animated.View>
          <Text style={styles.title}>szuper, űrhajós!</Text>
          <Text style={styles.subtitle}>felértél a {level}. szintre 🎉</Text>
        </Animated.View>

        <Animated.View style={[styles.rocketWrap, { transform: [{ translateY: rocketY }] }]}>
          <View style={styles.trail}>
            {[0, 1, 2, 3, 4].map((i) => (
              <View key={i} style={[styles.trailDot, { opacity: 0.7 - i * 0.12, marginTop: i * 5 }]} />
            ))}
          </View>
          <View style={styles.rocketBody}>
            <Text style={styles.rocketEmoji}>🚀</Text>
          </View>
          <Animated.View style={[styles.flameWrap, { transform: [{ scaleY: flameScale }] }]}>
            <Text style={styles.flameEmoji}>🔥💨</Text>
          </Animated.View>
        </Animated.View>

        <View style={styles.planetRow}>
          <Text style={styles.planetSmall}>🌙</Text>
          <Text style={styles.planet}>🪐</Text>
          <Text style={styles.planetSmall}>⭐</Text>
        </View>

        {!showReward && (
          <TouchableOpacity style={styles.skipBtn} onPress={revealReward} activeOpacity={0.85}>
            <Text style={styles.skipText}>ugrom a jutalomhoz! →</Text>
          </TouchableOpacity>
        )}

        {showReward && (
          <Animated.View style={[styles.rewardCard, shadows.glow(colors.accent)]}>
            <Text style={styles.rewardBurst}>🎊 🎁 🎊</Text>
            <Text style={styles.rewardLabel}>jutalom a {level}. szinten</Text>
            <Text style={styles.rewardDesc}>{rewardText}</Text>
            <Text style={styles.parentNote}>a szülő adja oda a jutalmat 💝</Text>
            <TouchableOpacity style={styles.ctaBtn} onPress={onClose} activeOpacity={0.85}>
              <Text style={styles.ctaText}>tovább a küldetésekre! →</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    overflow: 'hidden',
  },
  spaceBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
  },
  nebulaTop: {
    position: 'absolute',
    top: -80,
    left: -40,
    width: W * 0.8,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#1a1040',
    opacity: 0.7,
    ...(Platform.OS === 'web' ? { filter: 'blur(40px)' } as object : {}),
  },
  nebulaBottom: {
    position: 'absolute',
    bottom: 40,
    right: -60,
    width: W * 0.7,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#0a2840',
    opacity: 0.6,
  },
  star: {
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxl + 8,
    paddingHorizontal: spacing.lg,
    zIndex: 10,
  },
  badge: {
    ...typography.label,
    color: colors.secondary,
    marginBottom: spacing.xs,
    fontSize: 15,
  },
  sparkleRow: {
    fontSize: 22,
    marginBottom: spacing.sm,
    letterSpacing: 4,
  },
  levelRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colors.primary,
    backgroundColor: colors.panelLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelNum: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.textOnLight,
  },
  title: {
    ...typography.h1,
    fontSize: 30,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '900',
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  rocketWrap: {
    position: 'absolute',
    bottom: H * 0.28,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  trail: { alignItems: 'center', marginBottom: 4 },
  trailDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  rocketBody: {
    backgroundColor: colors.panelLight,
    borderRadius: 40,
    padding: spacing.sm,
    borderWidth: 3,
    borderColor: colors.primary,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 0 32px rgba(0,212,255,0.6)' } as object
      : shadows.glow(colors.primary)),
  },
  rocketEmoji: {
    fontSize: 88,
    ...(Platform.OS === 'web'
      ? { textShadow: '0 0 28px rgba(0,212,255,0.9)' } as object
      : {}),
  },
  flameWrap: { marginTop: -4 },
  flameEmoji: { fontSize: 40 },
  planetRow: {
    position: 'absolute',
    bottom: H * 0.12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    opacity: 0.7,
  },
  planet: { fontSize: 48 },
  planetSmall: { fontSize: 36 },
  skipBtn: {
    position: 'absolute',
    bottom: H * 0.06,
    alignSelf: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    zIndex: 10,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  skipText: {
    ...typography.button,
    color: colors.primary,
    fontWeight: '800',
  },
  rewardCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.panelLight,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 4,
    borderColor: colors.accent,
    borderBottomWidth: 0,
    padding: spacing.xl,
    paddingBottom: spacing.xxl + 16,
    alignItems: 'center',
  },
  rewardBurst: { fontSize: 36, marginBottom: spacing.sm, letterSpacing: 6 },
  rewardLabel: {
    ...typography.label,
    color: colors.accentDark,
    marginBottom: spacing.xs,
  },
  rewardDesc: {
    ...typography.h2,
    color: colors.textOnLight,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontWeight: '800',
  },
  parentNote: {
    ...typography.bodySmall,
    color: colors.textOnLightMuted,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },
  ctaBtn: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.accentDark,
    borderBottomWidth: 4,
    minWidth: 260,
    alignItems: 'center',
  },
  ctaText: {
    ...typography.button,
    color: colors.backgroundDark,
    fontWeight: '800',
  },
});
