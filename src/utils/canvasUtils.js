import { SKELETON, getBodyPartWorldPosition, DRAWING_STYLES } from './figureGeometry';

// Apply sketch effect to canvas
export function applySketchEffect(ctx, width, height) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Add slight line roughness by jittering
  for (let i = 0; i < data.length; i += 4) {
    // Skip fully transparent pixels
    if (data[i + 3] < 50) continue;

    // Add slight color jitter for sketch feel
    const jitter = Math.random() * 2 - 1;
    data[i] = Math.max(0, Math.min(255, data[i] + jitter));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + jitter));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + jitter));
  }

  ctx.putImageData(imageData, 0, 0);
}

// Draw a single body part (stick or mannequin)
export function drawBodyPart(ctx, partName, pose, baseX, baseY, scale, style, lineWidth = 2) {
  const part = SKELETON[partName];
  if (!part) return;

  const pos = getBodyPartWorldPosition(partName, pose, baseX, baseY, scale);
  const size = (part.size * scale) / 2;

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(pos.rotation);

  if (style === DRAWING_STYLES.STICK_FIGURE) {
    drawStickPart(ctx, partName, size, lineWidth);
  } else if (style === DRAWING_STYLES.SIMPLE_MANNEQUIN) {
    drawMannequinPart(ctx, partName, size, lineWidth);
  } else if (style === DRAWING_STYLES.SKETCH_OUTLINE) {
    drawSketchOutlinePart(ctx, partName, size, lineWidth);
  }

  ctx.restore();
}

// Draw stick figure body part
function drawStickPart(ctx, partName, size, lineWidth) {
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();

  if (partName === 'head') {
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.stroke();
  } else if (partName.includes('arm') || partName.includes('leg')) {
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.stroke();
  } else if (partName === 'hand' || partName === 'foot') {
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    // Torso, pelvis
    ctx.ellipse(0, 0, size * 0.5, size, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// Draw mannequin body part
function drawMannequinPart(ctx, partName, size, lineWidth) {
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = 'rgba(200, 200, 200, 0.1)';
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (partName === 'head') {
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (partName === 'torso') {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.6, size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (partName === 'pelvis') {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.7, size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (partName.includes('arm') || partName.includes('leg')) {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.4, size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (partName === 'hand' || partName === 'foot') {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.6, size * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

// Draw sketch outline body part
function drawSketchOutlinePart(ctx, partName, size, lineWidth) {
  ctx.strokeStyle = '#333333';
  ctx.fillStyle = 'rgba(240, 240, 240, 0.3)';
  ctx.lineWidth = lineWidth * 0.7;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Add roughness to lines
  const roughOffset = 0.5;

  if (partName === 'head') {
    ctx.beginPath();
    ctx.arc(0, 0, size + Math.random() * roughOffset, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (partName === 'torso') {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.6 + roughOffset, size + roughOffset, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (partName === 'pelvis') {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.7 + roughOffset, size * 0.6 + roughOffset, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (partName.includes('arm') || partName.includes('leg')) {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.4 + roughOffset, size + roughOffset, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (partName === 'hand' || partName === 'foot') {
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.6 + roughOffset, size * 0.8 + roughOffset, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

// Draw all joints (connection points)
export function drawJoints(ctx, pose, baseX, baseY, scale, showJoints = false) {
  if (!showJoints) return;

  ctx.fillStyle = '#ff6b6b';
  Object.keys(SKELETON).forEach(partName => {
    const pos = getBodyPartWorldPosition(partName, pose, baseX, baseY, scale);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Draw guide lines
export function drawGuides(ctx, canvas, options = {}) {
  const { showGrid = false, showHorizon = false, showCenterLine = false } = options;

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 1;

  if (showGrid) {
    const gridSize = 50;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  ctx.strokeStyle = 'rgba(100, 150, 200, 0.3)';
  if (showCenterLine) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
  }

  if (showHorizon) {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.6);
    ctx.lineTo(canvas.width, canvas.height * 0.6);
    ctx.stroke();
  }
}

// Draw line of action (gesture line)
export function drawLineOfAction(ctx, pose, baseX, baseY, scale) {
  const headPos = getBodyPartWorldPosition('head', pose, baseX, baseY, scale);
  const torsoPos = getBodyPartWorldPosition('torso', pose, baseX, baseY, scale);
  const pelvisPos = getBodyPartWorldPosition('pelvis', pose, baseX, baseY, scale);
  const legPos = getBodyPartWorldPosition('upper_leg_l', pose, baseX, baseY, scale);

  ctx.strokeStyle = 'rgba(255, 100, 100, 0.3)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(headPos.x, headPos.y);
  ctx.quadraticCurveTo(torsoPos.x, torsoPos.y, pelvisPos.x, pelvisPos.y);
  ctx.quadraticCurveTo(pelvisPos.x, pelvisPos.y, legPos.x, legPos.y);
  ctx.stroke();
}

// Export canvas to image
export function exportCanvasToImage(canvas, format = 'jpeg', quality = 0.95) {
  return new Promise((resolve) => {
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `figure-sketch-${Date.now()}.${format === 'jpeg' ? 'jpg' : 'png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      resolve();
    }, `image/${format}`, quality);
  });
}

// Get resolution dimensions
export function getResolutionDimensions(resolution) {
  const ratios = {
    small: { width: 800, height: 1000 },
    medium: { width: 1200, height: 1500 },
    high: { width: 1600, height: 2000 },
  };
  return ratios[resolution] || ratios.medium;
}
