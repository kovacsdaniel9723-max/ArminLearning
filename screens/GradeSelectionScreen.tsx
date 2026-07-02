/**
 * Osztályválasztó – belépéskor, mielőtt a főmenü megjelenik
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { Button } from '../components/Button';
import { useGrade } from '../context/GradeContext';
import { GRADE_LABELS } from '../types/grade';
import { colors, spacing, typography } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList, 'GradeSelection'>;

interface Props {
  navigation: Nav;
}

export const GradeSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { selectGrade } = useGrade();

  const pick = async (grade: 1 | 2) => {
    await selectGrade(grade);
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎒</Text>
        <Text style={styles.title}>melyik osztályban tanulsz?</Text>
        <Text style={styles.subtitle}>válassz egyet!</Text>

        <View style={styles.buttons}>
          <Button
            title={GRADE_LABELS[1]}
            onPress={() => pick(1)}
            variant="primary"
            size="large"
            style={styles.gradeButton}
          />
          <Button
            title={GRADE_LABELS[2]}
            onPress={() => pick(2)}
            variant="secondary"
            size="large"
            style={styles.gradeButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.screenPadding,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  buttons: {
    width: '100%',
    maxWidth: 320,
    gap: spacing.lg,
  },
  gradeButton: {
    width: '100%',
  },
});
