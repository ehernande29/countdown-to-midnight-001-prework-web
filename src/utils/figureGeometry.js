// Figure geometry and body part definitions
// All measurements are relative to a standard 8-head height figure

const DEFAULT_SCALE = 100; // pixels

export const BODY_PARTS = {
  HEAD: 'head',
  TORSO: 'torso',
  PELVIS: 'pelvis',
  UPPER_ARM_L: 'upper_arm_l',
  UPPER_ARM_R: 'upper_arm_r',
  LOWER_ARM_L: 'lower_arm_l',
  LOWER_ARM_R: 'lower_arm_r',
  HAND_L: 'hand_l',
  HAND_R: 'hand_r',
  UPPER_LEG_L: 'upper_leg_l',
  UPPER_LEG_R: 'upper_leg_r',
  LOWER_LEG_L: 'lower_leg_l',
  LOWER_LEG_R: 'lower_leg_r',
  FOOT_L: 'foot_l',
  FOOT_R: 'foot_r',
};

export const DRAWING_STYLES = {
  STICK_FIGURE: 'stick_figure',
  SIMPLE_MANNEQUIN: 'simple_mannequin',
  SKETCH_OUTLINE: 'sketch_outline',
};

// Body part hierarchy and connections
export const SKELETON = {
  head: { parent: null, offset: { x: 0, y: -7 }, size: 1, rotation: 0 },
  torso: { parent: 'head', offset: { x: 0, y: 0.5 }, size: 2.5, rotation: 0 },
  pelvis: { parent: 'torso', offset: { x: 0, y: 1.3 }, size: 1.8, rotation: 0 },
  upper_arm_l: { parent: 'torso', offset: { x: -0.8, y: 0.2 }, size: 1.5, rotation: 0 },
  upper_arm_r: { parent: 'torso', offset: { x: 0.8, y: 0.2 }, size: 1.5, rotation: 0 },
  lower_arm_l: { parent: 'upper_arm_l', offset: { x: 0, y: 0.7 }, size: 1.5, rotation: 0 },
  lower_arm_r: { parent: 'upper_arm_r', offset: { x: 0, y: 0.7 }, size: 1.5, rotation: 0 },
  hand_l: { parent: 'lower_arm_l', offset: { x: 0, y: 0.5 }, size: 0.6, rotation: 0 },
  hand_r: { parent: 'lower_arm_r', offset: { x: 0, y: 0.5 }, size: 0.6, rotation: 0 },
  upper_leg_l: { parent: 'pelvis', offset: { x: -0.4, y: 0.9 }, size: 2, rotation: 0 },
  upper_leg_r: { parent: 'pelvis', offset: { x: 0.4, y: 0.9 }, size: 2, rotation: 0 },
  lower_leg_l: { parent: 'upper_leg_l', offset: { x: 0, y: 1 }, size: 1.8, rotation: 0 },
  lower_leg_r: { parent: 'upper_leg_r', offset: { x: 0, y: 1 }, size: 1.8, rotation: 0 },
  foot_l: { parent: 'lower_leg_l', offset: { x: 0, y: 0.8 }, size: 0.8, rotation: 0 },
  foot_r: { parent: 'lower_leg_r', offset: { x: 0, y: 0.8 }, size: 0.8, rotation: 0 },
};

// Helper to calculate absolute position of a body part
export function getBodyPartWorldPosition(partName, pose, baseX, baseY, scale) {
  const part = SKELETON[partName];
  if (!part) return { x: baseX, y: baseY };

  let x = baseX, y = baseY, rotation = 0;

  if (part.parent === null) {
    // Root part (head) - use pose directly
    x = (pose[partName]?.x ?? baseX);
    y = (pose[partName]?.y ?? baseY);
    rotation = pose[partName]?.rotation ?? 0;
  } else {
    // Calculate position based on parent
    const parentPos = getBodyPartWorldPosition(part.parent, pose, baseX, baseY, scale);
    const parentRotation = pose[part.parent]?.rotation ?? SKELETON[part.parent].rotation;

    // Apply parent rotation to offset
    const offsetX = part.offset.x * scale;
    const offsetY = part.offset.y * scale;
    const cos = Math.cos(parentRotation);
    const sin = Math.sin(parentRotation);
    const rotatedX = offsetX * cos - offsetY * sin;
    const rotatedY = offsetX * sin + offsetY * cos;

    x = parentPos.x + rotatedX;
    y = parentPos.y + rotatedY;
    rotation = parentRotation + (pose[partName]?.rotation ?? 0);
  }

  return { x, y, rotation };
}

// Get hit area (joint) for a body part
export function getBodyPartBounds(partName, pose, baseX, baseY, scale) {
  const pos = getBodyPartWorldPosition(partName, pose, baseX, baseY, scale);
  const part = SKELETON[partName];
  const radius = (part.size * scale) / 2;

  return {
    x: pos.x,
    y: pos.y,
    radius: Math.max(radius, 15), // Minimum hit area
  };
}

// Check if point is inside a body part
export function isPointInBodyPart(px, py, partName, pose, baseX, baseY, scale) {
  const bounds = getBodyPartBounds(partName, pose, baseX, baseY, scale);
  const dx = px - bounds.x;
  const dy = py - bounds.y;
  return Math.sqrt(dx * dx + dy * dy) <= bounds.radius;
}

// Get all body parts under a point (for hit detection)
export function getBodyPartsAtPoint(px, py, pose, baseX, baseY, scale) {
  const parts = [];
  for (const partName of Object.keys(SKELETON)) {
    if (isPointInBodyPart(px, py, partName, pose, baseX, baseY, scale)) {
      const bounds = getBodyPartBounds(partName, pose, baseX, baseY, scale);
      const dx = px - bounds.x;
      const dy = py - bounds.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      parts.push({ partName, distance });
    }
  }
  // Return parts sorted by distance (closest first)
  return parts.sort((a, b) => a.distance - b.distance).map(p => p.partName);
}

// Update pose with new rotation for a part
export function updatePartRotation(pose, partName, newRotation) {
  return {
    ...pose,
    [partName]: {
      ...pose[partName],
      rotation: newRotation,
    },
  };
}

// Move the entire figure
export function translateFigure(pose, dx, dy) {
  const newPose = { ...pose };
  Object.keys(SKELETON).forEach(partName => {
    const part = SKELETON[partName];
    if (part.parent === null) {
      // Move root parts
      newPose[partName] = {
        ...newPose[partName],
        x: (newPose[partName]?.x ?? 0) + dx,
        y: (newPose[partName]?.y ?? 0) + dy,
      };
    }
  });
  return newPose;
}

// Scale the entire figure
export function scaleFigure(pose, scaleAmount) {
  const newPose = { ...pose };
  Object.keys(SKELETON).forEach(partName => {
    const part = SKELETON[partName];
    if (part.parent === null) {
      newPose[partName] = {
        ...newPose[partName],
        x: (newPose[partName]?.x ?? 0) * scaleAmount,
        y: (newPose[partName]?.y ?? 0) * scaleAmount,
      };
    }
  });
  return newPose;
}

// Flip figure horizontally
export function flipFigure(pose) {
  const newPose = {};
  Object.keys(pose).forEach(partName => {
    if (partName.endsWith('_l')) {
      const rightPart = partName.replace('_l', '_r');
      newPose[rightPart] = pose[partName];
      newPose[partName] = pose[rightPart];
    } else if (!partName.endsWith('_r')) {
      newPose[partName] = {
        ...pose[partName],
        x: -(pose[partName]?.x ?? 0),
      };
    }
  });
  return newPose;
}

// Initialize empty pose
export function createEmptyPose() {
  const pose = {};
  Object.keys(SKELETON).forEach(partName => {
    const part = SKELETON[partName];
    if (part.parent === null) {
      pose[partName] = { x: 0, y: 0, rotation: 0 };
    } else {
      pose[partName] = { rotation: 0 };
    }
  });
  return pose;
}
