/**
 * Küldetés-kártya – játék választó (színes akcent csík, neon keret)
 */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography, shadows } from '../theme';

interface GameCardProps {
  title: string;
  description?: string;
  icon?: string;
  onPress: () => void;
  style?: ViewStyle;
  accentColor?: string;
}

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  onPress,
  style,
  accentColor = colors.primary,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, shadows.card, style]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.inner}>
        <View style={[styles.iconWrap, { borderColor: accentColor }]}>
          {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
        <Text style={[styles.play, { color: accentColor }]}>▶</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    minHeight: 88,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingLeft: spacing.md + 4,
    gap: spacing.md,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: colors.panelLight,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 32 },
  textCol: { flex: 1 },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 2,
  },
  description: {
    ...typography.bodySmall,
    color: colors.textLight,
  },
  play: {
    fontSize: 22,
    fontWeight: '800',
  },
});
