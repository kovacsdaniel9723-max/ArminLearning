/**
 * Űr háttér – fix csillagok (nem villog, nem ugrál – kiszámítható)
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme';

const STARS: { top: `${number}%`; left: `${number}%`; size: number; opacity: number }[] = [
  { top: '8%', left: '12%', size: 3, opacity: 0.9 },
  { top: '15%', left: '78%', size: 2, opacity: 0.7 },
  { top: '22%', left: '45%', size: 2, opacity: 0.5 },
  { top: '35%', left: '88%', size: 3, opacity: 0.8 },
  { top: '42%', left: '8%', size: 2, opacity: 0.6 },
  { top: '55%', left: '62%', size: 2, opacity: 0.4 },
  { top: '68%', left: '25%', size: 3, opacity: 0.7 },
  { top: '72%', left: '92%', size: 2, opacity: 0.5 },
  { top: '85%', left: '50%', size: 2, opacity: 0.6 },
  { top: '90%', left: '15%', size: 3, opacity: 0.8 },
  { top: '12%', left: '55%', size: 2, opacity: 0.45 },
  { top: '48%', left: '35%', size: 2, opacity: 0.55 },
];

interface ScreenBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({ children, style }) => (
  <View style={[styles.root, style]}>
    <View style={styles.nebulaTop} pointerEvents="none" />
    <View style={styles.nebulaBottom} pointerEvents="none" />
    {STARS.map((s, i) => (
      <View
        key={i}
        pointerEvents="none"
        style={[
          styles.star,
          {
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          },
        ]}
      />
    ))}
    {children}
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  nebulaTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.primary,
    opacity: 0.06,
  },
  nebulaBottom: {
    position: 'absolute',
    bottom: -100,
    left: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.accent,
    opacity: 0.05,
  },
  star: {
    position: 'absolute',
    borderRadius: 99,
    backgroundColor: colors.white,
  },
});
