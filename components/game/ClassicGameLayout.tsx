/**
 * Klasszikus játék képernyő keret – űr téma, vissza, pontszám, visszajelzés
 */

import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenBackground } from '../ScreenBackground';
import { GameBackButton } from '../navigation/GameBackButton';
import { FeedbackAnimation } from '../FeedbackAnimation';
import { XpStarBurst } from '../XpStarBurst';
import { LevelUpRocketScreen } from '../LevelUpRocketScreen';
import { playClickSound } from '../../utils/gameSounds';
import { spacing } from '../../theme';
import { classicGameStyles as gs } from '../../theme/classicGameStyles';
import type { Reward } from '../../rewards/rewards';

interface ClassicGameLayoutProps {
  title?: string;
  score?: number;
  total?: number;
  scroll?: boolean;
  children: React.ReactNode;
  showFeedback: boolean;
  feedbackMessage: string;
  feedbackSuccess?: boolean;
  showLevelUp: boolean;
  levelUpLevel: number;
  levelUpReward?: Reward;
  onCloseLevelUp: () => void;
}

export const ClassicGameLayout: React.FC<ClassicGameLayoutProps> = ({
  title,
  score,
  total,
  scroll = false,
  children,
  showFeedback,
  feedbackMessage,
  feedbackSuccess,
  showLevelUp,
  levelUpLevel,
  levelUpReward,
  onCloseLevelUp,
}) => {
  const isSuccess =
    feedbackSuccess ??
    (feedbackMessage.includes('ügyes') ||
      feedbackMessage.includes('Megvan') ||
      feedbackMessage.includes('Nagyszerű'));

  const header = (
    <>
      <View style={styles.backRow}>
        <GameBackButton variant="prominent" label="← vissza" />
      </View>
      {title ? <Text style={gs.screenTitle}>{title}</Text> : null}
      {score != null && total != null ? (
        <View style={gs.scoreBar}>
          <View style={gs.scorePill}>
            <Text style={gs.scoreText}>🎯 {score} / {total}</Text>
          </View>
        </View>
      ) : null}
    </>
  );

  const body = scroll ? (
    <ScrollView contentContainerStyle={gs.scrollContent} showsVerticalScrollIndicator={false}>
      {header}
      {children}
    </ScrollView>
  ) : (
    <View style={[gs.content, { flex: 1 }]}>
      {header}
      {children}
    </View>
  );

  return (
    <ScreenBackground>
      <SafeAreaView style={gs.container}>
        {body}
        <FeedbackAnimation visible={showFeedback} message={feedbackMessage} type={isSuccess ? 'success' : 'encouragement'} />
        <XpStarBurst visible={showFeedback && isSuccess} />
        <LevelUpRocketScreen visible={showLevelUp} level={levelUpLevel} reward={levelUpReward} onClose={onCloseLevelUp} />
      </SafeAreaView>
    </ScreenBackground>
  );
};

export const GameHeroBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={gs.heroBox}>{children}</View>
);

export const GameOptionButton: React.FC<{
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  used?: boolean;
  small?: boolean;
  children?: React.ReactNode;
}> = ({ label, onPress, disabled, used, small, children }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    playClickSound();
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
    onPress();
  };
  return (
  <TouchableOpacity
    style={[gs.optionBtn, used && gs.optionBtnUsed, disabled && gs.optionBtnDisabled]}
    onPress={press}
    disabled={disabled || used}
    activeOpacity={0.85}
  >
    <Animated.View style={{ transform: [{ scale }], alignItems: 'center' }}>
    {children ?? (label ? <Text style={small ? gs.optionTextSmall : gs.optionText}>{label}</Text> : null)}
    </Animated.View>
  </TouchableOpacity>
  );
};

export const GameActionButton: React.FC<{
  label: string;
  onPress: () => void;
  secondary?: boolean;
}> = ({ label, onPress, secondary }) => (
  <TouchableOpacity
    style={[gs.actionBtn, secondary && gs.actionBtnSecondary]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={gs.actionBtnText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backRow: { marginBottom: spacing.sm, alignSelf: 'flex-start' },
});
