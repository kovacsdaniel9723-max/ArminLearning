/**
 * HomeScreen
 * Főképernyő - gyerekbarát kezdőlap
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { colors, spacing, typography } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Fejléc */}
        <View style={styles.header}>
          <Text style={styles.title}>Armin Tanuló App</Text>
          <Text style={styles.subtitle}>Játssz és tanulj! 🎮📚</Text>
        </View>

        {/* Fő gombok */}
        <View style={styles.buttonContainer}>
          <Button
            title="Játékok"
            onPress={() => navigation.navigate('GameSelection')}
            variant="primary"
            size="large"
            style={styles.mainButton}
          />
          
          <Button
            title="Szülői beállítások"
            onPress={() => navigation.navigate('Parent')}
            variant="secondary"
            size="medium"
            style={styles.secondaryButton}
          />
        </View>

        {/* Üdvözlő üzenet */}
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.screenPadding,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.textLight,
  },
  buttonContainer: {
    marginVertical: spacing.xl,
    gap: spacing.md,
  },
  mainButton: {
    marginBottom: spacing.md,
  },
  secondaryButton: {
    marginTop: spacing.sm,
  },
  welcomeContainer: {
    backgroundColor: colors.backgroundLight,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  welcomeText: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
  },
});
