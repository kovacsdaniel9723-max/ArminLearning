/**
 * HomeScreen – űr-küldetés bázis + napi küldetés
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '../components/Button';
import { ScreenBackground } from '../components/ScreenBackground';
import { colors, spacing, typography, shadows } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useGrade } from '../context/GradeContext';
import { GRADE_LABELS } from '../types/grade';
import { getDailyMissions } from '../utils/dailyMission';
import type { GameCatalogEntry } from '../config/gameCatalog';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

function goToGame(navigation: HomeScreenNavigationProp, game: GameCatalogEntry) {
  const { screen, params } = game;
  if (params) {
    navigation.navigate(screen as 'TextGame' | 'Grade2Game', params as never);
    return;
  }
  navigation.navigate(screen as Exclude<keyof RootStackParamList, 'TextGame' | 'Grade2Game'>);
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { grade } = useGrade();
  const g = grade ?? 1;
  const [missions, setMissions] = useState<GameCatalogEntry[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [allDone, setAllDone] = useState(false);

  const refreshMissions = useCallback(async () => {
    const data = await getDailyMissions(g);
    setMissions(data.missions);
    setCompleted(data.completed);
    setAllDone(data.allDone);
  }, [g]);

  useEffect(() => { void refreshMissions(); }, [refreshMissions]);

  useFocusEffect(
    useCallback(() => {
      void refreshMissions();
    }, [refreshMissions]),
  );

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

          <View style={[styles.missionBox, allDone && styles.missionBoxDone]}>
            <Text style={styles.missionTitle}>🎯 mai küldetés</Text>
            {allDone ? (
              <Text style={styles.missionDone}>szép munka, minden kész! 🌟</Text>
            ) : (
              missions.map((m) => {
                const done = completed.includes(m.id);
                return (
                  <TouchableOpacity
                    key={m.id}
                    style={[styles.missionRow, done && styles.missionRowDone]}
                    onPress={() => goToGame(navigation, m)}
                    disabled={done}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.missionIcon}>{done ? '✅' : m.icon}</Text>
                    <View style={styles.missionTextCol}>
                      <Text style={[styles.missionName, done && styles.missionNameDone]}>{m.title}</Text>
                      <Text style={styles.missionDesc}>{m.description}</Text>
                    </View>
                    {!done && <Text style={styles.missionGo}>▶</Text>}
                  </TouchableOpacity>
                );
              })
            )}
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
              csináld meg a mai küldetést – egy helyes válasz is számít! 🔥
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
  hero: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.lg },
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
  missionBox: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.accent,
    borderLeftWidth: 6,
  },
  missionBoxDone: { borderColor: colors.secondary },
  missionTitle: { ...typography.h3, color: colors.accent, marginBottom: spacing.sm, fontWeight: '800' },
  missionDone: { ...typography.body, color: colors.secondary, textAlign: 'center', padding: spacing.md },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.panelLight,
    borderRadius: 14,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 2,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  missionRowDone: { opacity: 0.55, backgroundColor: colors.backgroundLight, borderColor: colors.grayLight },
  missionIcon: { fontSize: 28 },
  missionTextCol: { flex: 1 },
  missionName: { ...typography.body, color: colors.textOnLight, fontWeight: '800' },
  missionNameDone: { textDecorationLine: 'line-through' },
  missionDesc: { ...typography.bodySmall, color: colors.textOnLightMuted },
  missionGo: { fontSize: 18, color: colors.primary, fontWeight: '800' },
  buttonContainer: { gap: spacing.md, marginBottom: spacing.xl },
  tipBox: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderLeftWidth: 6,
    borderLeftColor: colors.secondary,
  },
  tipLabel: { ...typography.label, color: colors.accent, marginBottom: spacing.xs },
  tipText: { ...typography.body, color: colors.text, lineHeight: 26 },
});
