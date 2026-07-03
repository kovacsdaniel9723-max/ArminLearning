/**
 * Osztályválasztó
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { Button } from '../components/Button';
import { ScreenBackground } from '../components/ScreenBackground';
import { useGrade } from '../context/GradeContext';
import { GRADE_LABELS } from '../types/grade';
import { colors, spacing, typography, shadows } from '../theme';

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
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.emoji}>🛸</Text>
          <Text style={styles.title}>melyik szinten játszol?</Text>
          <Text style={styles.subtitle}>egyszer választasz – később is cserélheted</Text>

          <View style={styles.cards}>
            <View style={[styles.gradeCard, shadows.glow(colors.primary)]}>
              <Text style={styles.cardEmoji}>🌟</Text>
              <Button title={GRADE_LABELS[1]} onPress={() => pick(1)} variant="primary" size="large" />
            </View>
            <View style={[styles.gradeCard, shadows.glow(colors.accent)]}>
              <Text style={styles.cardEmoji}>⚡</Text>
              <Button title={GRADE_LABELS[2]} onPress={() => pick(2)} variant="accent" size="large" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.screenPadding,
  },
  emoji: { fontSize: 72, marginBottom: spacing.lg },
  title: { ...typography.h1, color: colors.primary, textAlign: 'center', marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textLight, textAlign: 'center', marginBottom: spacing.xxl },
  cards: { width: '100%', maxWidth: 340, gap: spacing.lg },
  gradeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: 'center',
    gap: spacing.md,
  },
  cardEmoji: { fontSize: 40 },
});
