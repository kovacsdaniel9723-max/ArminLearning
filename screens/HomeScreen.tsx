/**
 * HomeScreen – űr-küldetés bázis
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { ScreenBackground } from '../components/ScreenBackground';
import { colors, spacing, typography, shadows } from '../theme';
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
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Text style={styles.heroEmoji}>🚀</Text>
            <Text style={styles.title}>armin küldetés bázis</Text>
            <View style={[styles.gradePill, shadows.glow(colors.primary)]}>
              <Text style={styles.gradePillText}>⭐ {GRADE_LABELS[g]}</Text>
            </View>
            <Text style={styles.tagline}>válassz küldetést és gyűjts xp-t!</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="játék indítása"
              icon="🎮"
              onPress={() => navigation.navigate('GameSelection')}
              variant="primary"
              size="large"
            />
            <Button
              title="haladás / jutalmak"
              icon="🏆"
              onPress={() => navigation.navigate('Rewards')}
              variant="accent"
              size="medium"
            />
            <Button
              title="osztály váltás"
              icon="🎒"
              onPress={() => navigation.navigate('GradeSelection')}
              variant="ghost"
              size="medium"
            />
            <Button
              title="szülői zóna"
              icon="🔒"
              onPress={() => navigation.navigate('Parent')}
              variant="ghost"
              size="medium"
            />
          </View>

          <View style={styles.tipBox}>
            <Text style={styles.tipLabel}>tipp</Text>
            <Text style={styles.tipText}>
              rövid körök, sok pont – így gyorsabban szintet lépsz! 🔥
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  hero: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.xl },
  heroEmoji: { fontSize: 72, marginBottom: spacing.sm },
  title: {
    ...typography.h1,
    color: colors.primary,
    textAlign: 'center',
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  gradePill: {
    marginTop: spacing.md,
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  gradePillText: { ...typography.h3, color: colors.secondary },
  tagline: { ...typography.body, color: colors.textLight, marginTop: spacing.md, textAlign: 'center' },
  buttonContainer: { gap: spacing.md, marginBottom: spacing.xl },
  tipBox: {
    backgroundColor: colors.backgroundLight,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.cardBorder,
  },
  tipLabel: { ...typography.label, color: colors.accent, marginBottom: spacing.xs },
  tipText: { ...typography.body, color: colors.text, lineHeight: 26 },
});
