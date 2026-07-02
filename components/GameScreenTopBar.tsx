/**
 * Játék képernyő tetején – vissza gomb (web + mobil)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../theme';
import { GameBackButton } from './navigation/GameBackButton';

export const GameScreenTopBar: React.FC = () => (
  <View style={styles.bar}>
    <GameBackButton variant="inline" />
  </View>
);

const styles = StyleSheet.create({
  bar: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
});
