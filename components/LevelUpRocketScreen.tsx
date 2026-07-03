/**
 * Szintlépés – űr-küldetés ünnep (SVG rakéta + részecskés láng)
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
import Svg, { Circle, Ellipse, Path, Polygon, Rect, G } from 'react-native-svg';
import { colors, spacing, typography, shadows } from '../theme';
import type { Reward } from '../rewards/rewards';
import { playLevelUpFanfare, playRocketLaunch } from '../utils/celebrationSound';

const { width: W, height: H } = Dimensions.get('window');
const TRAVEL = H * 0.58;

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

function RocketShip() {
  return (
    <Svg width={96} height={130} viewBox="0 0 96 130">
      <G>
        <Polygon points="8,82 22,64 22,96" fill="#FF6B2C" />
        <Polygon points="88,82 74,64 74,96" fill="#FF6B2C" />
        <Path
          d="M48,6 C62,38 70,68 64,96 C58,108 38,108 32,96 C26,68 34,38 48,6 Z"
          fill="#F0F4FF"
          stroke="#00D4FF"
          strokeWidth={2.5}
        />
        <Rect x="40" y="72" width="16" height="22" rx="3" fill="#00D4FF" opacity={0.55} />
        <Circle cx="48" cy="48" r="14" fill="#4A90E2" stroke="#00D4FF" strokeWidth={2.5} />
        <Circle cx="44" cy="44" r="4" fill="#B8DCFF" opacity={0.7} />
        <Ellipse cx="48" cy="102" rx="10" ry="4" fill="#CBD5E1" opacity={0.5} />
      </G>
    </Svg>
  );
}

function AnimatedFlame({ scale, opacity }: { scale: Animated.Value; opacity: Animated.Value }) {
  return (
    <Animated.View style={{ transform: [{ scaleY: scale }, { scaleX: scale }], opacity }}>
      <Svg width={72} height={90} viewBox="0 0 72 90">
        <Ellipse cx="36" cy="28" rx="26" ry="34" fill="#FF8C42" opacity={0.85} />
        <Ellipse cx="36" cy="36" rx="18" ry="28" fill="#FF6B2C" />
        <Ellipse cx="36" cy="46" rx="12" ry="22" fill="#FFB347" />
        <Ellipse cx="36" cy="56" rx="8" ry="16" fill="#FFE66D" />
        <Ellipse cx="30" cy="40" rx="6" ry="14" fill="#FFF3B0" opacity={0.6} />
      </Svg>
    </Animated.View>
  );
}

function ExhaustParticle({ delay, offsetX, color }: { delay: number; offsetX: number; color: string }) {
  const y = useRef(new Animated.Value(0)).current;
  const x = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.6)).current;
  const active = useRef(true);

  useEffect(() => {
    active.current = true;
    const run = () => {
      if (!active.current) return;
      y.setValue(0);
      x.setValue(0);
      opacity.setValue(0.95);
      scale.setValue(0.6 + (delay % 3) * 0.2);
      const drift = (delay % 5) - 2;
      Animated.parallel([
        Animated.timing(y, {
          toValue: 55 + (delay % 4) * 12,
          duration: 350 + (delay % 5) * 60,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(x, {
          toValue: drift * 8,
          duration: 350 + (delay % 5) * 60,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.15, duration: 400, useNativeDriver: true }),
      ]).start(({ finished }) => {
        if (finished && active.current) run();
      });
    };
    const t = setTimeout(run, delay * 55);
    return () => {
      active.current = false;
      clearTimeout(t);
      y.stopAnimation();
      x.stopAnimation();
      opacity.stopAnimation();
      scale.stopAnimation();
    };
  }, [delay, x, y, opacity, scale]);

  return (
    <Animated.View
      style={[
        styles.exhaustParticle,
        {
          left: 36 + offsetX,
          backgroundColor: color,
          transform: [{ translateY: y }, { translateX: x }, { scale }],
          opacity,
        },
      ]}
    />
  );
}

function SpeedStreak({ index, launchActive }: { index: number; launchActive: boolean }) {
  const y = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const side = index % 2 === 0 ? -1 : 1;
  const offsetX = side * (60 + (index % 6) * 28);

  useEffect(() => {
    if (!launchActive) {
      opacity.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(index * 70),
        Animated.parallel([
          Animated.timing(y, { toValue: 120, duration: 280, useNativeDriver: true }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.7, duration: 40, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 240, useNativeDriver: true }),
          ]),
        ]),
        Animated.timing(y, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [launchActive, index, opacity, y]);

  return (
    <Animated.View
      style={[
        styles.speedStreak,
        {
          left: W / 2 + offsetX,
          transform: [{ translateY: y }],
          opacity,
        },
      ]}
    />
  );
}

function ParallaxPlanet({
  emoji,
  size,
  startX,
  drift,
  launchY,
}: {
  emoji: string;
  size: number;
  startX: number;
  drift: Animated.Value;
  launchY: Animated.Value;
}) {
  const parallax = launchY.interpolate({
    inputRange: [-TRAVEL, 0],
    outputRange: [TRAVEL * 0.35, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: H * 0.1,
        left: startX,
        transform: [{ translateY: Animated.add(drift, parallax) }],
        opacity: 0.75,
      }}
    >
      <Text style={{ fontSize: size }}>{emoji}</Text>
    </Animated.View>
  );
}

const EXHAUST_COLORS = ['#FFB347', '#FF6B2C', '#FFE66D', '#FF8C42', '#FFF3B0'];
const PARTICLE_OFFSETS = [-18, -10, -4, 4, 10, 18, -14, 0, 14, -8, 8, -20, 20];

export const LevelUpRocketScreen: React.FC<LevelUpRocketScreenProps> = ({
  visible,
  level,
  reward,
  onClose,
}) => {
  const rocketY = useRef(new Animated.Value(0)).current;
  const rocketScale = useRef(new Animated.Value(1)).current;
  const rocketShake = useRef(new Animated.Value(0)).current;
  const rocketTilt = useRef(new Animated.Value(0)).current;
  const flameScale = useRef(new Animated.Value(0.4)).current;
  const flameOpacity = useRef(new Animated.Value(0.6)).current;
  const smokeOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.5)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const padGlow = useRef(new Animated.Value(0.3)).current;
  const planetDrift = useRef(new Animated.Value(0)).current;
  const activeRef = useRef(false);
  const rewardShownRef = useRef(false);
  const [showReward, setShowReward] = useState(false);
  const [launching, setLaunching] = useState(false);

  const revealReward = () => {
    if (rewardShownRef.current || !activeRef.current) return;
    rewardShownRef.current = true;
    setLaunching(false);
    playLevelUpFanfare();
    setShowReward(true);
  };

  const stars = useMemo(() => Array.from({ length: 28 }, (_, i) => i), []);
  const confetti = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);
  const particles = useMemo(() => Array.from({ length: 13 }, (_, i) => i), []);
  const streaks = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);

  useEffect(() => {
    if (!visible) {
      activeRef.current = false;
      rewardShownRef.current = false;
      setLaunching(false);
      rocketY.stopAnimation();
      rocketY.setValue(0);
      rocketScale.setValue(1);
      rocketShake.setValue(0);
      rocketTilt.setValue(0);
      flameScale.setValue(0.4);
      titleScale.setValue(0.5);
      titleOpacity.setValue(0);
      setShowReward(false);
      return;
    }

    activeRef.current = true;
    rewardShownRef.current = false;
    playRocketLaunch();
    setShowReward(false);
    setLaunching(false);

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

    const padPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(padGlow, { toValue: 0.9, duration: 500, useNativeDriver: true }),
        Animated.timing(padGlow, { toValue: 0.3, duration: 500, useNativeDriver: true }),
      ]),
    );
    padPulse.start();

    const shakeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(rocketShake, { toValue: 3, duration: 45, useNativeDriver: true }),
        Animated.timing(rocketShake, { toValue: -3, duration: 45, useNativeDriver: true }),
      ]),
    );
    shakeLoop.start();

    const igniteFlame = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(flameScale, { toValue: 1.25, duration: 90, useNativeDriver: true }),
          Animated.timing(flameOpacity, { toValue: 1, duration: 90, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(flameScale, { toValue: 0.85, duration: 80, useNativeDriver: true }),
          Animated.timing(flameOpacity, { toValue: 0.75, duration: 80, useNativeDriver: true }),
        ]),
      ]),
    );

    Animated.sequence([
      Animated.timing(flameScale, { toValue: 0.7, duration: 400, useNativeDriver: true }),
      Animated.timing(flameOpacity, { toValue: 0.85, duration: 400, useNativeDriver: true }),
    ]).start(() => igniteFlame.start());

    const smokeLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(smokeOpacity, { toValue: 0.5, duration: 600, useNativeDriver: true }),
        Animated.timing(smokeOpacity, { toValue: 0.15, duration: 600, useNativeDriver: true }),
      ]),
    );
    smokeLoop.start();

    const fallbackTimer = setTimeout(revealReward, 3800);

    const launchTimer = setTimeout(() => {
      setLaunching(true);
      shakeLoop.stop();
      rocketShake.setValue(0);

      Animated.sequence([
        Animated.timing(flashOpacity, { toValue: 0.35, duration: 80, useNativeDriver: true }),
        Animated.timing(flashOpacity, { toValue: 0, duration: 350, useNativeDriver: true }),
      ]).start();

      const tiltLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(rocketTilt, { toValue: 1, duration: 180, useNativeDriver: true }),
          Animated.timing(rocketTilt, { toValue: -1, duration: 180, useNativeDriver: true }),
        ]),
      );
      tiltLoop.start();

      Animated.parallel([
        Animated.timing(rocketY, {
          toValue: -TRAVEL,
          duration: 2600,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rocketScale, {
          toValue: 0.55,
          duration: 2600,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(planetDrift, {
          toValue: 80,
          duration: 2600,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        tiltLoop.stop();
        if (finished && activeRef.current) revealReward();
      });
    }, 900);

    return () => {
      activeRef.current = false;
      setLaunching(false);
      clearTimeout(launchTimer);
      clearTimeout(fallbackTimer);
      rocketY.stopAnimation();
      pulse.stop();
      padPulse.stop();
      shakeLoop.stop();
      igniteFlame.stop();
      smokeLoop.stop();
    };
  }, [visible, rocketY, rocketScale, rocketShake, rocketTilt, flameScale, flameOpacity, smokeOpacity, titleScale, titleOpacity, glowPulse, flashOpacity, padGlow, planetDrift]);

  if (!visible) return null;

  const rewardText = reward?.description ?? 'nagyszerű munka!';
  const tiltDeg = rocketTilt.interpolate({ inputRange: [-1, 1], outputRange: ['-5deg', '5deg'] });

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

        {launching && streaks.map((i) => (
          <SpeedStreak key={i} index={i} launchActive={launching} />
        ))}

        {showReward && confetti.map((i) => (
          <ConfettiPiece key={i} index={i} />
        ))}

        <Animated.View
          pointerEvents="none"
          style={[styles.flash, { opacity: flashOpacity }]}
        />

        <Animated.View
          style={[
            styles.header,
            { opacity: titleOpacity, transform: [{ scale: titleScale }] },
          ]}
        >
          <Text style={styles.badge}>🌟 szintlépés! 🌟</Text>
          <Animated.View style={[styles.levelRing, { opacity: glowPulse }, shadows.glow(colors.primary)]}>
            <Text style={styles.levelNum}>{level}</Text>
          </Animated.View>
          <Text style={styles.title}>szuper, űrhajós!</Text>
          <Text style={styles.subtitle}>felértél a {level}. szintre 🎉</Text>
        </Animated.View>

        <ParallaxPlanet emoji="🌙" size={34} startX={W * 0.08} drift={planetDrift} launchY={rocketY} />
        <ParallaxPlanet emoji="🪐" size={52} startX={W * 0.42} drift={planetDrift} launchY={rocketY} />
        <ParallaxPlanet emoji="⭐" size={30} startX={W * 0.78} drift={planetDrift} launchY={rocketY} />

        <Animated.View style={[styles.launchPad, { opacity: padGlow }]}>
          <View style={styles.padInner} />
        </Animated.View>

        <Animated.View
          style={[
            styles.rocketWrap,
            {
              transform: [
                { translateY: rocketY },
                { translateX: rocketShake },
                { scale: rocketScale },
                { rotate: tiltDeg },
              ],
            },
          ]}
        >
          <View style={styles.rocketGlow}>
            <RocketShip />
          </View>

          <View style={styles.exhaustZone}>
            <Animated.View style={[styles.smokeCloud, { opacity: smokeOpacity }]} />
            {visible && particles.map((i) => (
              <ExhaustParticle
                key={i}
                delay={i}
                offsetX={PARTICLE_OFFSETS[i]}
                color={EXHAUST_COLORS[i % EXHAUST_COLORS.length]}
              />
            ))}
            <AnimatedFlame scale={flameScale} opacity={flameOpacity} />
          </View>
        </Animated.View>

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
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00D4FF',
    zIndex: 20,
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
    marginBottom: spacing.sm,
    fontSize: 15,
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
  launchPad: {
    position: 'absolute',
    bottom: H * 0.22,
    alignSelf: 'center',
    width: 140,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    zIndex: 2,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 0 24px rgba(0,212,255,0.8)' } as object
      : {}),
  },
  padInner: {
    flex: 1,
    margin: 3,
    borderRadius: 6,
    backgroundColor: '#0a2840',
  },
  rocketWrap: {
    position: 'absolute',
    bottom: H * 0.24,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  rocketGlow: {
    ...(Platform.OS === 'web'
      ? { filter: 'drop-shadow(0 0 18px rgba(0,212,255,0.85))' } as object
      : {}),
  },
  exhaustZone: {
    marginTop: -6,
    alignItems: 'center',
    height: 100,
    width: 96,
    position: 'relative',
  },
  smokeCloud: {
    position: 'absolute',
    bottom: 60,
    width: 110,
    height: 40,
    borderRadius: 55,
    backgroundColor: '#8899AA',
  },
  exhaustParticle: {
    position: 'absolute',
    top: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  speedStreak: {
    position: 'absolute',
    top: H * 0.35,
    width: 3,
    height: 48,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
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
