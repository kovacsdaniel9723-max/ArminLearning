/**
 * GameSelectionScreen
 * Játék választó – osztályszint szerinti lista
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard } from '../components/GameCard';
import { colors, spacing, typography } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useGrade } from '../context/GradeContext';
import { getGamesForGrade } from '../config/gameCatalog';
import { GRADE_LABELS } from '../types/grade';

type GameSelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameSelection'>;

interface GameSelectionScreenProps {
  navigation: GameSelectionScreenNavigationProp;
}

export const GameSelectionScreen: React.FC<GameSelectionScreenProps> = ({ navigation }) => {
  const { grade } = useGrade();
  const g = grade ?? 1;
  const games = getGamesForGrade(g);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>válassz egy játékot!</Text>
          <Text style={styles.gradeLabel}>{GRADE_LABELS[g]}</Text>
        </View>
        <View style={styles.gamesContainer}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              onPress={() => {
                const { screen, params } = game;
                if (screen === 'TextGame' && params) {
                  navigation.navigate('TextGame', params as RootStackParamList['TextGame']);
                } else if (screen === 'LetterGame') navigation.navigate('LetterGame');
                else if (screen === 'NumberGame') navigation.navigate('NumberGame');
                else if (screen === 'HangmanGame') navigation.navigate('HangmanGame');
                else if (screen === 'VoiceGame') navigation.navigate('VoiceGame');
                else if (screen === 'MathAdditionGame') navigation.navigate('MathAdditionGame');
                else if (screen === 'SyllableGame') navigation.navigate('SyllableGame');
                else if (screen === 'ReadingGame') navigation.navigate('ReadingGame');
                else if (screen === 'SentenceGame') navigation.navigate('SentenceGame');
                else if (screen === 'PatternGame') navigation.navigate('PatternGame');
                else if (screen === 'MathGrade2Game') navigation.navigate('MathGrade2Game');
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.screenPadding },
  header: { alignItems: 'center', marginBottom: spacing.lg },
  title: { ...typography.h1, color: colors.primary },
  gradeLabel: { ...typography.body, color: colors.textLight, marginTop: spacing.xs },
  gamesContainer: { gap: spacing.md },
});
