/**
 * Vissza gomb – játékból a küldetés listába
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography, shadows } from '../../theme';

interface GameBackButtonProps {
  label?: string;
  variant?: 'header' | 'inline' | 'prominent';
}

export const GameBackButton: React.FC<GameBackButtonProps> = ({
  label = '← küldetések',
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

  if (variant === 'prominent') {
    return (
      <TouchableOpacity
        style={[styles.prominentBtn, shadows.glow(colors.accent)]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <Text style={styles.prominentText}>{label}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === 'inline') {
    return (
      <TouchableOpacity
        style={[styles.inlineBtn, shadows.glow(colors.primary)]}
        onPress={onPress}
        accessibilityRole="button"
      >
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
    color: colors.primary,
    fontWeight: '800',
  },
  inlineBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  inlineText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '800',
  },
  prominentBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.accentDark,
    borderBottomWidth: 4,
  },
  prominentText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '800',
  },
});
