/**
 * Robot építési lépések – csak wrongGuesses db alkatrész, pop-in animáció
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RobotPart } from './RobotPart';
import { ROBOT_PARTS } from './robotParts';
import type { RobotPartKey } from './types';

const ROBOT_W = 200;
const ROBOT_H = 300;

const PART_SIZES: Record<RobotPartKey, { w: number; h: number; left: number; bottom: number; zIndex: number }> = {
  base: { w: 130, h: 22, left: 35, bottom: 0, zIndex: 1 },
  torso_lower: { w: 88, h: 52, left: 56, bottom: 38, zIndex: 2 },
  torso_upper: { w: 82, h: 48, left: 59, bottom: 88, zIndex: 3 },
  head: { w: 72, h: 72, left: 64, bottom: 134, zIndex: 4 },
  eyes: { w: 72, h: 72, left: 64, bottom: 134, zIndex: 5 },
  mouth: { w: 72, h: 72, left: 64, bottom: 134, zIndex: 6 },
  arm_left_upper: { w: 26, h: 48, left: 22, bottom: 120, zIndex: 7 },
  arm_left_lower: { w: 24, h: 40, left: 12, bottom: 82, zIndex: 8 },
  arm_right_upper: { w: 26, h: 48, left: 152, bottom: 120, zIndex: 9 },
  arm_right_lower: { w: 24, h: 40, left: 164, bottom: 82, zIndex: 10 },
  legs: { w: 92, h: 36, left: 54, bottom: 22, zIndex: 11 },
  antenna: { w: 20, h: 48, left: 90, bottom: 204, zIndex: 12 },
};

interface RobotProgressProps {
  wrongGuesses: number;
  isWin?: boolean;
}

export const RobotProgress: React.FC<RobotProgressProps> = ({ wrongGuesses, isWin = false }) => {
  const visibleParts = isWin ? ROBOT_PARTS : ROBOT_PARTS.slice(0, wrongGuesses);

  return (
    <View style={styles.robot}>
      {visibleParts.map((key) => {
        const { w, h, left, bottom, zIndex } = PART_SIZES[key];
        const showWinFace = isWin && (key === 'eyes' || key === 'mouth');
        return (
          <View
            key={key}
            style={[
              styles.partWrap,
              {
                width: w,
                height: h,
                left,
                bottom,
                zIndex,
              },
            ]}
            pointerEvents="none"
          >
            <RobotPart
              partKey={key}
              width={w}
              height={h}
              popIn
              isWin={showWinFace}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  robot: {
    width: ROBOT_W,
    minHeight: ROBOT_H,
    height: ROBOT_H,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'visible',
  },
  partWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
