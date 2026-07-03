/**
 * XP csillag animáció – helyes válasznál
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

interface XpStarBurstProps {
  visible: boolean;
}

export const XpStarBurst: React.FC<XpStarBurstProps> = ({ visible }) => {
  const y = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (!visible) return;
    y.setValue(0);
    opacity.setValue(1);
    scale.setValue(0.5);
    Animated.parallel([
      Animated.timing(y, { toValue: -120, duration: 900, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 900, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1.2, friction: 4, useNativeDriver: true }),
    ]).start();
  }, [visible, y, opacity, scale]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.wrap, { opacity, transform: [{ translateY: y }, { scale }] }]}
      pointerEvents="none"
    >
      <Text style={styles.star}>⭐ +1</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: '42%',
    alignSelf: 'center',
    zIndex: 999,
  },
  star: { fontSize: 36, fontWeight: '900' },
});
