/**
 * HomeScreen
 * Főképernyő - gyerekbarát kezdőlap
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { colors, spacing, typography } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useGrade } from '../context/GradeContext';
import { GRADE_LABELS } from '../types/grade';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { grade } = useGrade();
  const g = grade ?? 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Armin Tanuló App</Text>
          <Text style={styles.subtitle}>Játssz és tanulj! 🎮📚</Text>
          <Text style={styles.gradeBadge}>{GRADE_LABELS[g]}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Játékok" onPress={() => navigation.navigate('GameSelection')} variant="primary" size="large" style={styles.mainButton} />
          <Button title="Haladás" onPress={() => navigation.navigate('Rewards')} variant="secondary" size="medium" style={styles.secondaryButton} />
          <Button title="Osztály váltás" onPress={() => navigation.navigate('GradeSelection')} variant="secondary" size="medium" style={styles.secondaryButton} />
          <Button title="Szülői beállítások" onPress={() => navigation.navigate('Parent')} variant="secondary" size="medium" style={styles.secondaryButton} />
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Üdvözöllek! 👋{'\n'}
            Válassz egy játékot és kezdj el tanulni!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, padding: spacing.screenPadding },
  header: { alignItems: 'center', marginTop: spacing.xxl, marginBottom: spacing.xl },
  title: { ...typography.h1, color: colors.primary, marginBottom: spacing.sm },
  subtitle: { ...typography.bodyLarge, color: colors.textLight },
  gradeBadge: { ...typography.h3, color: colors.secondary, marginTop: spacing.sm },
  buttonContainer: { marginVertical: spacing.xl, gap: spacing.md },
  mainButton: { marginBottom: spacing.md },
  secondaryButton: { marginTop: spacing.sm },
  welcomeContainer: { backgroundColor: colors.backgroundLight, borderRadius: spacing.cardBorderRadius, padding: spacing.lg, marginTop: spacing.xl, borderWidth: 2, borderColor: colors.primaryLight },
  welcomeText: { ...typography.body, color: colors.text, textAlign: 'center', lineHeight: 28 },
});
