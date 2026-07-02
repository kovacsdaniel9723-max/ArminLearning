/**
 * GameSelectionScreen
 * Játék választó – osztályszint szerinti lista, 2. osztálynál tantárgy csoportok
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard } from '../components/GameCard';
import { colors, spacing, typography } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useGrade } from '../context/GradeContext';
import { getGamesForGrade, getGrade2GamesGrouped, type GameCatalogEntry } from '../config/gameCatalog';
import { GRADE_LABELS } from '../types/grade';

type GameSelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameSelection'>;

interface GameSelectionScreenProps {
  navigation: GameSelectionScreenNavigationProp;
}

function navigateToGame(
  navigation: GameSelectionScreenNavigationProp,
  game: GameCatalogEntry
) {
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

  const renderGame = (game: GameCatalogEntry) => (
    <GameCard
      key={game.id}
      title={game.title}
      description={game.description}
      icon={game.icon}
      onPress={() => navigateToGame(navigation, game)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>válassz egy játékot!</Text>
          <Text style={styles.gradeLabel}>{GRADE_LABELS[g]}</Text>
        </View>

        {g === 2 ? (
          getGrade2GamesGrouped().map((section) =>
            section.games.length > 0 ? (
              <View key={section.subject} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.label}</Text>
                <View style={styles.gamesContainer}>{section.games.map(renderGame)}</View>
              </View>
            ) : null
          )
        ) : (
          <View style={styles.gamesContainer}>{getGamesForGrade(1).map(renderGame)}</View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.screenPadding, paddingBottom: spacing.xxl },
  header: { alignItems: 'center', marginBottom: spacing.lg },
  title: { ...typography.h1, color: colors.primary },
  gradeLabel: { ...typography.body, color: colors.textLight, marginTop: spacing.xs },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    ...typography.h3,
    color: colors.secondaryDark,
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondaryLight,
  },
  gamesContainer: { gap: spacing.md },
});
