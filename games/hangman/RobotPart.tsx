/**
 * Egy robot alkatrész – react-native-svg, barátságos LEGO feeling
 */

import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Rect, Circle, Ellipse, Path, Line, G } from 'react-native-svg';
import type { RobotPartKey } from './types';

const FILL = '#6BA3E8';
const STROKE = '#4A90E2';
const DARK = '#357ABD';
const FACE = '#2C3E50';
const HIGHLIGHT = '#FFB84D';
const SHADOW = '#B0BEC5';

interface RobotPartProps {
  partKey: RobotPartKey;
  width: number;
  height: number;
  popIn?: boolean;
  /** win state: mosoly, pislogó szem */
  isWin?: boolean;
}

export const RobotPart: React.FC<RobotPartProps> = ({
  partKey,
  width,
  height,
  popIn = true,
  isWin = false,
}) => {
  const scale = useRef(new Animated.Value(popIn ? 0 : 1)).current;

  useEffect(() => {
    if (!popIn) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 120,
      friction: 8,
    }).start();
  }, [popIn, scale]);

  const renderPart = () => {
    switch (partKey) {
      case 'base':
        return (
          <Svg viewBox="0 0 100 20" width={width} height={height} style={{ overflow: 'visible' }}>
            <Ellipse cx="50" cy="12" rx="42" ry="8" fill={SHADOW} fillOpacity={0.8} />
          </Svg>
        );
      case 'torso_lower':
        return (
          <Svg viewBox="0 0 80 50" width={width} height={height}>
            <Rect x="10" y="0" width="60" height="50" rx="8" fill={FILL} stroke={STROKE} strokeWidth={2} />
            <Rect x="18" y="8" width="44" height="12" rx="4" fill={STROKE} fillOpacity={0.4} />
          </Svg>
        );
      case 'torso_upper':
        return (
          <Svg viewBox="0 0 80 45" width={width} height={height}>
            <Rect x="8" y="0" width="64" height="45" rx="10" fill={FILL} stroke={STROKE} strokeWidth={2} />
            <Circle cx="40" cy="22" r="8" fill={STROKE} fillOpacity={0.5} />
          </Svg>
        );
      case 'head':
        return (
          <Svg viewBox="0 0 70 70" width={width} height={height}>
            <Rect x="5" y="5" width="60" height="60" rx="16" fill={FILL} stroke={STROKE} strokeWidth={2} />
          </Svg>
        );
      case 'eyes':
        return (
          <Svg viewBox="0 0 70 70" width={width} height={height}>
            <G opacity={isWin ? 0.7 : 1}>
              <Circle cx="22" cy="32" r="10" fill={FACE} />
              <Circle cx="48" cy="32" r="10" fill={FACE} />
            </G>
            <Circle cx="26" cy="28" r="3" fill="#FFF" fillOpacity={0.9} />
            <Circle cx="52" cy="28" r="3" fill="#FFF" fillOpacity={0.9} />
          </Svg>
        );
      case 'mouth':
        return (
          <Svg viewBox="0 0 70 70" width={width} height={height}>
            <Path
              d={isWin ? 'M 18 44 Q 35 56 52 44' : 'M 18 48 Q 35 58 52 48'}
              stroke={FACE}
              strokeWidth={4}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        );
      case 'arm_left_upper':
        return (
          <Svg viewBox="0 0 30 50" width={width} height={height}>
            <G transform="rotate(-25 15 25)">
              <Rect x="4" y="0" width="22" height="50" rx="11" fill={FILL} stroke={STROKE} strokeWidth={2} />
            </G>
          </Svg>
        );
      case 'arm_left_lower':
        return (
          <Svg viewBox="0 0 28 45" width={width} height={height}>
            <G transform="rotate(-25 14 22)">
              <Rect x="2" y="0" width="24" height="45" rx="12" fill={DARK} stroke={STROKE} strokeWidth={2} />
              <Circle cx="14" cy="38" r="6" fill={STROKE} />
            </G>
          </Svg>
        );
      case 'arm_right_upper':
        return (
          <Svg viewBox="0 0 30 50" width={width} height={height}>
            <G transform="rotate(25 15 25)">
              <Rect x="4" y="0" width="22" height="50" rx="11" fill={FILL} stroke={STROKE} strokeWidth={2} />
            </G>
          </Svg>
        );
      case 'arm_right_lower':
        return (
          <Svg viewBox="0 0 28 45" width={width} height={height}>
            <G transform="rotate(25 14 22)">
              <Rect x="2" y="0" width="24" height="45" rx="12" fill={DARK} stroke={STROKE} strokeWidth={2} />
              <Circle cx="14" cy="38" r="6" fill={STROKE} />
            </G>
          </Svg>
        );
      case 'legs':
        return (
          <Svg viewBox="0 0 90 35" width={width} height={height}>
            <Rect x="8" y="0" width="34" height="35" rx="8" fill={FILL} stroke={STROKE} strokeWidth={2} />
            <Rect x="48" y="0" width="34" height="35" rx="8" fill={FILL} stroke={STROKE} strokeWidth={2} />
            <Rect x="18" y="8" width="14" height="12" rx="4" fill={STROKE} fillOpacity={0.4} />
            <Rect x="58" y="8" width="14" height="12" rx="4" fill={STROKE} fillOpacity={0.4} />
          </Svg>
        );
      case 'antenna':
        return (
          <Svg viewBox="0 0 24 55" width={width} height={height}>
            <Line x1="12" y1="50" x2="12" y2="8" stroke={STROKE} strokeWidth={3} strokeLinecap="round" />
            <Circle cx="12" cy="5" r="6" fill={HIGHLIGHT} />
            <Circle cx="12" cy="5" r="3" fill="#FFF" fillOpacity={0.8} />
          </Svg>
        );
      default:
        return null;
    }
  };

  const content = renderPart();
  if (!content) return null;

  if (popIn) {
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        {content}
      </Animated.View>
    );
  }
  return <View>{content}</View>;
};
