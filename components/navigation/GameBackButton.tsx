/**
 * Vissza gomb játékból → játék választó (web-barát, nagy érintési felület)
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography } from '../../theme';

interface GameBackButtonProps {
  label?: string;
  /** Fejléc (fehér szöveg) vs. tartalom (kék szöveg) */
  variant?: 'header' | 'inline';
}

export const GameBackButton: React.FC<GameBackButtonProps> = ({
  label = '← játékok',
  variant = 'header',
}) => {
  const navigation = useNavigation();

  const onPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('GameSelection' as never);
    }
  };

  if (variant === 'inline') {
    return (
      <TouchableOpacity style={styles.inlineBtn} onPress={onPress} accessibilityRole="button">
        <Text style={styles.inlineText}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.headerBtn} onPress={onPress} accessibilityRole="button">
      <Text style={styles.headerText}>{label}</Text>
    </TouchableOpacity>
  );
};

/** Stack.Screen options – minden játék képernyőhöz */
export function gameBackHeaderOptions() {
  return {
    headerBackVisible: false,
    headerLeft: () => <GameBackButton variant="header" />,
  };
}

const styles = StyleSheet.create({
  headerBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginLeft: spacing.xs,
  },
  headerText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '700',
  },
  inlineBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    marginBottom: spacing.sm,
  },
  inlineText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
  },
});
