/**
 * GameSelectionScreen – küldetés lista
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard } from '../components/GameCard';
import { ScreenBackground } from '../components/ScreenBackground';
import { colors, spacing, typography, subjectAccent } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useGrade } from '../context/GradeContext';
import { getGamesForGrade, getGrade2GamesGrouped, type GameCatalogEntry } from '../config/gameCatalog';
import { GRADE_LABELS } from '../types/grade';

type GameSelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameSelection'>;

interface GameSelectionScreenProps {
  navigation: GameSelectionScreenNavigationProp;
}

function navigateToGame(navigation: GameSelectionScreenNavigationProp, game: GameCatalogEntry) {
  const { screen, params } = game;
  if (params) {
    navigation.navigate(screen as 'TextGame' | 'Grade2Game', params as never);
    return;
  }
  navigation.navigate(screen as Exclude<keyof RootStackParamList, 'TextGame' | 'Grade2Game'>);
}

export const GameSelectionScreen: React.FC<GameSelectionScreenProps> = ({ navigation }) => {
  const { grade } = useGrade();
  const g = grade ?? 1;

  const renderGame = (game: GameCatalogEntry, accent?: string) => (
    <GameCard
      key={game.id}
      title={game.title}
      description={game.description}
      icon={game.icon}
      accentColor={accent ?? colors.primary}
      onPress={() => navigateToGame(navigation, game)}
    />
  );

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerEmoji}>🎯</Text>
            <Text style={styles.title}>válassz küldetést!</Text>
            <Text style={styles.gradeLabel}>{GRADE_LABELS[g]}</Text>
          </View>

          {g === 2 ? (
            getGrade2GamesGrouped().map((section) =>
              section.games.length > 0 ? (
                <View key={section.subject} style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View
                      style={[
                        styles.sectionDot,
                        { backgroundColor: subjectAccent[section.subject] ?? colors.primary },
                      ]}
                    />
                    <Text style={styles.sectionTitle}>{section.label}</Text>
                  </View>
                  <View style={styles.gamesContainer}>
                    {section.games.map((game) =>
                      renderGame(game, subjectAccent[section.subject])
                    )}
                  </View>
                </View>
              ) : null
            )
          ) : (
            <View style={styles.gamesContainer}>{getGamesForGrade(1).map((game) => renderGame(game))}</View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  header: { alignItems: 'center', marginBottom: spacing.lg },
  headerEmoji: { fontSize: 48, marginBottom: spacing.xs },
  title: { ...typography.h1, color: colors.primary, textAlign: 'center' },
  gradeLabel: { ...typography.body, color: colors.textLight, marginTop: spacing.xs },
  section: { marginBottom: spacing.lg },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  sectionDot: { width: 10, height: 10, borderRadius: 5 },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  gamesContainer: { gap: spacing.sm },
});
