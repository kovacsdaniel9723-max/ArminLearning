/**
 * Armin Learning App
 * Fő entry point - React Navigation beállítása
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './types';
import { HomeScreen } from './screens/HomeScreen';
import { GameSelectionScreen } from './screens/GameSelectionScreen';
import { colors } from './theme';

// Placeholder screens - ezeket később implementáljuk
import { LetterGameScreen } from './screens/LetterGameScreen';
import { NumberGameScreen } from './screens/NumberGameScreen';
import { TextGameScreen } from './screens/TextGameScreen';
import { HangmanGameScreen } from './games/hangman/HangmanGameScreen';
import { VoiceGameScreen } from './screens/VoiceGameScreen';
import { ParentScreen } from './screens/ParentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Főoldal' }}
          />
          <Stack.Screen
            name="GameSelection"
            component={GameSelectionScreen}
            options={{ title: 'Játékok' }}
          />
          <Stack.Screen
            name="LetterGame"
            component={LetterGameScreen}
            options={{ title: 'Betűfelismerő' }}
          />
          <Stack.Screen
            name="NumberGame"
            component={NumberGameScreen}
            options={{ title: 'Számfelismerő' }}
          />
          <Stack.Screen
            name="TextGame"
            component={TextGameScreen}
            options={{ title: 'Szövegalapú Játék' }}
          />
          <Stack.Screen
            name="HangmanGame"
            component={HangmanGameScreen}
            options={{ title: 'Építsük meg a robotot!' }}
          />
          <Stack.Screen
            name="VoiceGame"
            component={VoiceGameScreen}
            options={{ title: 'Mondd ki hangosan!' }}
          />
          <Stack.Screen
            name="Parent"
            component={ParentScreen}
            options={{ title: 'Szülői beállítások' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
