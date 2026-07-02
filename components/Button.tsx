/**
 * Játékos gomb – 3D „ arcade ” stílus, nagy érintési felület
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  icon?: string;
}

const VARIANTS = {
  primary: { bg: colors.primary, border: colors.primaryDark, text: colors.backgroundDark },
  secondary: { bg: colors.secondary, border: colors.secondaryDark, text: colors.backgroundDark },
  accent: { bg: colors.accent, border: colors.accentDark, text: colors.white },
  ghost: { bg: colors.backgroundLight, border: colors.cardBorder, text: colors.primary },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  icon,
}) => {
  const v = VARIANTS[disabled ? 'ghost' : variant];
  const h = size === 'large' ? spacing.buttonHeight + 12 : spacing.buttonHeight;

  return (
    <TouchableOpacity
      style={[styles.wrap, { opacity: disabled ? 0.5 : 1 }, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      <View
        style={[
          styles.button,
          shadows.button,
          {
            backgroundColor: v.bg,
            borderColor: v.border,
            minHeight: h,
            paddingHorizontal: spacing.buttonPadding,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={v.text} />
        ) : (
          <View style={styles.row}>
            {icon ? <Text style={styles.icon}>{icon}</Text> : null}
            <Text
              style={[
                styles.text,
                size === 'large' ? typography.buttonLarge : typography.button,
                { color: v.text },
              ]}
            >
              {title}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  button: {
    borderRadius: 16,
    borderWidth: 2,
    borderBottomWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: spacing.touchTargetMin,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  icon: { fontSize: 24 },
  text: { textAlign: 'center' },
});
