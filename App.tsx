/**
 * Armin Learning App
 * Fő entry point - React Navigation + osztályszint kontextus
 */

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './types';
import { GradeProvider, useGrade } from './context/GradeContext';
import { HomeScreen } from './screens/HomeScreen';
import { GameSelectionScreen } from './screens/GameSelectionScreen';
import { GradeSelectionScreen } from './screens/GradeSelectionScreen';
import { colors } from './theme';
import { LetterGameScreen } from './screens/LetterGameScreen';
import { NumberGameScreen } from './screens/NumberGameScreen';
import { TextGameScreen } from './screens/TextGameScreen';
import { HangmanGameScreen } from './games/hangman/HangmanGameScreen';
import { VoiceGameScreen } from './screens/VoiceGameScreen';
import { MathAdditionScreen } from './screens/MathAdditionScreen';
import { ParentScreen } from './screens/ParentScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { SyllableGameScreen } from './screens/SyllableGameScreen';
import { ReadingGameScreen } from './screens/ReadingGameScreen';
import { SentenceGameScreen } from './screens/SentenceGameScreen';
import { PatternGameScreen } from './screens/PatternGameScreen';
import { MathGrade2Screen } from './screens/MathGrade2Screen';
import { Grade2GameScreen } from './screens/Grade2GameScreen';
import { getGrade2Game } from './games/grade2/registry';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { grade, isReady } = useGrade();

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName={grade ? 'Home' : 'GradeSelection'}
        screenOptions={{
          headerStyle: { backgroundColor: colors.backgroundLight },
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: '800', color: colors.text },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="GradeSelection" component={GradeSelectionScreen} options={{ title: 'osztály', headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Főoldal' }} />
        <Stack.Screen name="GameSelection" component={GameSelectionScreen} options={{ title: 'Játékok' }} />
        <Stack.Screen name="LetterGame" component={LetterGameScreen} options={{ title: 'Betűfelismerő' }} />
        <Stack.Screen name="NumberGame" component={NumberGameScreen} options={{ title: 'Számfelismerő' }} />
        <Stack.Screen name="TextGame" component={TextGameScreen} options={{ title: 'Szövegalapú Játék' }} />
        <Stack.Screen name="HangmanGame" component={HangmanGameScreen} options={{ title: 'Építsük meg a robotot!' }} />
        <Stack.Screen name="VoiceGame" component={VoiceGameScreen} options={{ title: 'Mondd ki hangosan!' }} />
        <Stack.Screen name="MathAdditionGame" component={MathAdditionScreen} options={{ title: 'Összeadás' }} />
        <Stack.Screen name="SyllableGame" component={SyllableGameScreen} options={{ title: 'Szótagolás' }} />
        <Stack.Screen name="ReadingGame" component={ReadingGameScreen} options={{ title: 'Olvasás' }} />
        <Stack.Screen name="SentenceGame" component={SentenceGameScreen} options={{ title: 'Mondatépítés' }} />
        <Stack.Screen name="PatternGame" component={PatternGameScreen} options={{ title: 'Sorozat' }} />
        <Stack.Screen name="MathGrade2Game" component={MathGrade2Screen} options={{ title: 'Matematika' }} />
        <Stack.Screen
          name="Grade2Game"
          component={Grade2GameScreen}
          options={({ route }) => {
            const def = getGrade2Game(route.params.gameId);
            return { title: def?.title ?? 'játék' };
          }}
        />
        <Stack.Screen name="Parent" component={ParentScreen} options={{ title: 'Szülői beállítások' }} />
        <Stack.Screen name="Rewards" component={RewardsScreen} options={{ title: 'Haladás' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GradeProvider>
        <AppNavigator />
      </GradeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
