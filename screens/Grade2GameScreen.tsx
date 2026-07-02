/**
 * 2. osztály játék router – gameId alapján betölti a motort
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { getGrade2Game } from '../games/grade2/registry';
import { colors, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Grade2Game'>;

export const Grade2GameScreen: React.FC<Props> = ({ route }) => {
  const def = getGrade2Game(route.params.gameId);
  if (!def) {
    return (
      <View style={styles.err}>
        <Text style={styles.errText}>a játék nem található</Text>
      </View>
    );
  }
  const Game = def.component;
  return <Game />;
};

const styles = StyleSheet.create({
  err: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  errText: { ...typography.body, color: colors.textLight },
});
