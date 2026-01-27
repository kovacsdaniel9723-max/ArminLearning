/**
 * GameSelectionScreen
 * Játék választó képernyő
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard } from '../components/GameCard';
import { colors, spacing, typography } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type GameSelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameSelection'>;

interface GameSelectionScreenProps {
  navigation: GameSelectionScreenNavigationProp;
}

export const GameSelectionScreen: React.FC<GameSelectionScreenProps> = ({ navigation }) => {
  const games = [
    {
      id: 'letter',
      title: 'Betűfelismerő',
      description: 'Ismerd fel a betűket!',
      icon: '🔤',
      onPress: () => navigation.navigate('LetterGame'),
    },
    {
      id: 'number',
      title: 'Számfelismerő',
      description: 'Számolj és tanulj!',
      icon: '🔢',
      onPress: () => navigation.navigate('NumberGame'),
    },
    {
      id: 'wordPicture',
      title: 'Szó-Kép Párosítás',
      description: 'Párosítsd a szavakat a képekkel!',
      icon: '🖼️',
      onPress: () => navigation.navigate('TextGame', { gameType: 'wordPicture' }),
    },
    {
      id: 'missingLetter',
      title: 'Hiányzó Betű',
      description: 'Találd ki a hiányzó betűt!',
      icon: '✏️',
      onPress: () => navigation.navigate('TextGame', { gameType: 'missingLetter' }),
    },
    {
      id: 'firstLetter',
      title: 'Első Betű',
      description: 'Melyik betűvel kezdődik?',
      icon: '🔍',
      onPress: () => navigation.navigate('TextGame', { gameType: 'firstLetter' }),
    },
    {
      id: 'hangman',
      title: 'Építsük meg a robotot!',
      description: 'Találd ki a szót, építsd meg a robotot!',
      icon: '🤖',
      onPress: () => navigation.navigate('HangmanGame'),
    },
    {
      id: 'voice',
      title: 'Mondd ki hangosan!',
      description: 'Ismételd meg a szavakat!',
      icon: '🎤',
      onPress: () => navigation.navigate('VoiceGame'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Válassz egy játékot!</Text>
        </View>

        <View style={styles.gamesContainer}>
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              onPress={game.onPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.screenPadding,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
  },
  gamesContainer: {
    gap: spacing.md,
  },
});
