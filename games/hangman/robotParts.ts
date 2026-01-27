/**
 * Robot alkatrészek sorrendje – kötelező építési sor
 */

import type { RobotPartKey } from './types';

export const ROBOT_PARTS: RobotPartKey[] = [
  'base',
  'torso_lower',
  'torso_upper',
  'head',
  'eyes',
  'mouth',
  'arm_left_upper',
  'arm_left_lower',
  'arm_right_upper',
  'arm_right_lower',
  'legs',
  'antenna',
];

export const ROBOT_PART_ASSET: Record<RobotPartKey, string> = {
  base: 'base',
  torso_lower: 'torso_lower',
  torso_upper: 'torso_upper',
  head: 'head',
  eyes: 'eyes',
  mouth: 'mouth',
  arm_left_upper: 'arm_left_upper',
  arm_left_lower: 'arm_left_lower',
  arm_right_upper: 'arm_right_upper',
  arm_right_lower: 'arm_right_lower',
  legs: 'legs',
  antenna: 'antenna',
};
