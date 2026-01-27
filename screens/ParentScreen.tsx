/**
 * ParentScreen
 * Szülői kontroll és statisztikák képernyő
 * PIN védett hozzáférés (hardcoded PIN)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { colors, spacing, typography } from '../theme';
import { Button } from '../components/Button';
import {
  loadSettings,
  saveSettings,
  getDefaultSettings,
  loadStats,
  getDefaultStats,
  initializeStats,
} from '../utils/storage';
import { ParentSettings, GameStats } from '../types';

type ParentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Parent'>;

interface ParentScreenProps {
  navigation: ParentScreenNavigationProp;
}

const HARDCODED_PIN = '1234';

export const ParentScreen: React.FC<ParentScreenProps> = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<ParentSettings>(getDefaultSettings());
  const [stats, setStats] = useState<GameStats | null>(null);
  const [playtimeLimit, setPlaytimeLimit] = useState('10');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const loadedSettings = await loadSettings();
    if (loadedSettings) {
      setSettings(loadedSettings);
      setPlaytimeLimit((loadedSettings.dailyPlaytimeLimit / 60).toString());
    }

    const loadedStats = await initializeStats();
    setStats(loadedStats);
  };

  const handlePinSubmit = () => {
    if (pin === HARDCODED_PIN) {
      setIsAuthenticated(true);
      setPin('');
    } else {
      Alert.alert('Hibás PIN', 'Kérjük, próbáld újra.');
      setPin('');
    }
  };

  const handleSaveSettings = async () => {
    const limitMinutes = parseInt(playtimeLimit, 10);
    if (isNaN(limitMinutes) || limitMinutes < 1) {
      Alert.alert('Hiba', 'Kérjük, adj meg egy érvényes időtartamot (percben).');
      return;
    }

    const newSettings: ParentSettings = {
      ...settings,
      dailyPlaytimeLimit: limitMinutes * 60, // másodpercekben
    };

    await saveSettings(newSettings);
    setSettings(newSettings);
    Alert.alert('Sikeres', 'Beállítások mentve!');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>Szülői beállítások</Text>
          <Text style={styles.authSubtitle}>Kérjük, add meg a PIN kódot</Text>
          
          <TextInput
            style={styles.pinInput}
            value={pin}
            onChangeText={setPin}
            placeholder="PIN"
            keyboardType="number-pad"
            secureTextEntry
            maxLength={4}
            autoFocus
          />
          
          <Button
            title="Belépés"
            onPress={handlePinSubmit}
            variant="primary"
            size="large"
            style={styles.authButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Szülői beállítások</Text>
        </View>

        {/* Statisztikák */}
        {stats && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statisztikák</Text>
            
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Játszott játékok:</Text>
              <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
            </View>
            
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Helyes válaszok:</Text>
              <Text style={styles.statValue}>
                {stats.correctAnswers} / {stats.totalAnswers}
              </Text>
            </View>
            
            {stats.totalAnswers > 0 && (
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Sikeres arány:</Text>
                <Text style={styles.statValue}>
                  {Math.round((stats.correctAnswers / stats.totalAnswers) * 100)}%
                </Text>
              </View>
            )}
            
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Mai játékidő:</Text>
              <Text style={styles.statValue}>{formatTime(stats.playTimeToday)}</Text>
            </View>
          </View>
        )}

        {/* Beállítások */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beállítások</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Napi játékidő limit (perc):</Text>
            <TextInput
              style={styles.settingInput}
              value={playtimeLimit}
              onChangeText={setPlaytimeLimit}
              keyboardType="number-pad"
              placeholder="10"
            />
          </View>
          
          <Button
            title="Beállítások mentése"
            onPress={handleSaveSettings}
            variant="primary"
            size="medium"
            style={styles.saveButton}
          />
        </View>

        {/* Információ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Információ</Text>
          <Text style={styles.infoText}>
            • A játékidő limit automatikusan resetelődik minden nap{'\n'}
            • A statisztikák csak helyileg tárolódnak{'\n'}
            • Az alkalmazás nem gyűjt személyes adatokat
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
    padding: spacing.screenPadding,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.screenPadding,
  },
  authTitle: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  authSubtitle: {
    ...typography.body,
    color: colors.textLight,
    marginBottom: spacing.xl,
  },
  pinInput: {
    width: '100%',
    maxWidth: 200,
    height: spacing.buttonHeight,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.button,
    textAlign: 'center',
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
  },
  authButton: {
    width: '100%',
    maxWidth: 200,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
  },
  section: {
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  statLabel: {
    ...typography.body,
    color: colors.text,
  },
  statValue: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  settingRow: {
    marginBottom: spacing.md,
  },
  settingLabel: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  settingInput: {
    height: spacing.buttonHeight,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.body,
    backgroundColor: colors.white,
  },
  saveButton: {
    marginTop: spacing.md,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textLight,
    lineHeight: 24,
  },
});
