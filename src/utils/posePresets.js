import { createEmptyPose } from './figureGeometry';

const DEG = Math.PI / 180;

// Preset poses for the figure
export const POSE_PRESETS = {
  STANDING: {
    name: 'Standing',
    description: 'Neutral standing pose',
    pose: {
      head: { x: 0, y: -700, rotation: 0 },
      torso: { rotation: 0 },
      pelvis: { rotation: 0 },
      upper_arm_l: { rotation: -20 * DEG },
      upper_arm_r: { rotation: -20 * DEG },
      lower_arm_l: { rotation: 0 },
      lower_arm_r: { rotation: 0 },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: 0 },
      upper_leg_r: { rotation: 0 },
      lower_leg_l: { rotation: 0 },
      lower_leg_r: { rotation: 0 },
      foot_l: { rotation: 0 },
      foot_r: { rotation: 0 },
    },
  },
  CONTRAPPOSTO: {
    name: 'Contrapposto',
    description: 'Weight on one leg',
    pose: {
      head: { x: 15, y: -700, rotation: 0 },
      torso: { rotation: 10 * DEG },
      pelvis: { rotation: -15 * DEG },
      upper_arm_l: { rotation: 35 * DEG },
      upper_arm_r: { rotation: -20 * DEG },
      lower_arm_l: { rotation: -30 * DEG },
      lower_arm_r: { rotation: 0 },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: -8 * DEG },
      upper_leg_r: { rotation: 15 * DEG },
      lower_leg_l: { rotation: 8 * DEG },
      lower_leg_r: { rotation: -10 * DEG },
      foot_l: { rotation: 0 },
      foot_r: { rotation: 5 * DEG },
    },
  },
  WALKING: {
    name: 'Walking',
    description: 'Mid-stride walking pose',
    pose: {
      head: { x: 0, y: -700, rotation: 0 },
      torso: { rotation: 5 * DEG },
      pelvis: { rotation: -10 * DEG },
      upper_arm_l: { rotation: 30 * DEG },
      upper_arm_r: { rotation: -30 * DEG },
      lower_arm_l: { rotation: 0 },
      lower_arm_r: { rotation: 0 },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: 20 * DEG },
      upper_leg_r: { rotation: -15 * DEG },
      lower_leg_l: { rotation: -30 * DEG },
      lower_leg_r: { rotation: 30 * DEG },
      foot_l: { rotation: -10 * DEG },
      foot_r: { rotation: 0 },
    },
  },
  RUNNING: {
    name: 'Running',
    description: 'Dynamic running pose',
    pose: {
      head: { x: 0, y: -700, rotation: 0 },
      torso: { rotation: 15 * DEG },
      pelvis: { rotation: -20 * DEG },
      upper_arm_l: { rotation: 80 * DEG },
      upper_arm_r: { rotation: -60 * DEG },
      lower_arm_l: { rotation: -40 * DEG },
      lower_arm_r: { rotation: 40 * DEG },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: 45 * DEG },
      upper_leg_r: { rotation: -25 * DEG },
      lower_leg_l: { rotation: -60 * DEG },
      lower_leg_r: { rotation: 50 * DEG },
      foot_l: { rotation: 0 },
      foot_r: { rotation: 0 },
    },
  },
  SITTING: {
    name: 'Sitting',
    description: 'Seated pose',
    pose: {
      head: { x: 0, y: -600, rotation: 0 },
      torso: { rotation: -15 * DEG },
      pelvis: { rotation: 0 },
      upper_arm_l: { rotation: 25 * DEG },
      upper_arm_r: { rotation: -25 * DEG },
      lower_arm_l: { rotation: -45 * DEG },
      lower_arm_r: { rotation: -45 * DEG },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: 70 * DEG },
      upper_leg_r: { rotation: 70 * DEG },
      lower_leg_l: { rotation: -70 * DEG },
      lower_leg_r: { rotation: -70 * DEG },
      foot_l: { rotation: 10 * DEG },
      foot_r: { rotation: -10 * DEG },
    },
  },
  CROUCHING: {
    name: 'Crouching',
    description: 'Crouched position',
    pose: {
      head: { x: 0, y: -500, rotation: 0 },
      torso: { rotation: -30 * DEG },
      pelvis: { rotation: 0 },
      upper_arm_l: { rotation: 60 * DEG },
      upper_arm_r: { rotation: 60 * DEG },
      lower_arm_l: { rotation: 50 * DEG },
      lower_arm_r: { rotation: 50 * DEG },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: 90 * DEG },
      upper_leg_r: { rotation: 90 * DEG },
      lower_leg_l: { rotation: -90 * DEG },
      lower_leg_r: { rotation: -90 * DEG },
      foot_l: { rotation: 0 },
      foot_r: { rotation: 0 },
    },
  },
  JUMPING: {
    name: 'Jumping',
    description: 'Mid-jump pose',
    pose: {
      head: { x: 0, y: -750, rotation: 0 },
      torso: { rotation: 10 * DEG },
      pelvis: { rotation: -5 * DEG },
      upper_arm_l: { rotation: 80 * DEG },
      upper_arm_r: { rotation: 80 * DEG },
      lower_arm_l: { rotation: -40 * DEG },
      lower_arm_r: { rotation: -40 * DEG },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: -20 * DEG },
      upper_leg_r: { rotation: -20 * DEG },
      lower_leg_l: { rotation: 60 * DEG },
      lower_leg_r: { rotation: 60 * DEG },
      foot_l: { rotation: 0 },
      foot_r: { rotation: 0 },
    },
  },
  REACHING: {
    name: 'Reaching',
    description: 'Reaching upward',
    pose: {
      head: { x: 0, y: -700, rotation: 0 },
      torso: { rotation: 10 * DEG },
      pelvis: { rotation: 0 },
      upper_arm_l: { rotation: -20 * DEG },
      upper_arm_r: { rotation: -80 * DEG },
      lower_arm_l: { rotation: 0 },
      lower_arm_r: { rotation: -70 * DEG },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: 0 },
      upper_leg_r: { rotation: 0 },
      lower_leg_l: { rotation: 0 },
      lower_leg_r: { rotation: 0 },
      foot_l: { rotation: 0 },
      foot_r: { rotation: 0 },
    },
  },
  PUNCHING: {
    name: 'Punching',
    description: 'Punch stance',
    pose: {
      head: { x: 0, y: -700, rotation: 0 },
      torso: { rotation: 15 * DEG },
      pelvis: { rotation: -20 * DEG },
      upper_arm_l: { rotation: -25 * DEG },
      upper_arm_r: { rotation: 0 * DEG },
      lower_arm_l: { rotation: 0 },
      lower_arm_r: { rotation: 0 },
      hand_l: { rotation: 0 },
      hand_r: { rotation: 0 },
      upper_leg_l: { rotation: -10 * DEG },
      upper_leg_r: { rotation: 15 * DEG },
      lower_leg_l: { rotation: 10 * DEG },
      lower_leg_r: { rotation: -15 * DEG },
      foot_l: { rotation: 0 },
      foot_r: { rotation: 0 },
    },
  },
};

// Get pose preset by key
export function getPosePreset(key) {
  const preset = POSE_PRESETS[key];
  if (!preset) return null;
  return { ...preset.pose };
}

// Get list of all preset keys
export function getPresetKeys() {
  return Object.keys(POSE_PRESETS);
}

// Get preset info (name, description)
export function getPresetInfo(key) {
  const preset = POSE_PRESETS[key];
  if (!preset) return null;
  const { pose, ...info } = preset;
  return info;
}
