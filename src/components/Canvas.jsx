import React, { useRef, useEffect, useState } from 'react';
import { SKELETON, getBodyPartsAtPoint, isPointInBodyPart, getBodyPartWorldPosition } from '../utils/figureGeometry';
import { drawBodyPart, drawJoints, drawGuides, drawLineOfAction, applySketchEffect } from '../utils/canvasUtils';
import { DRAWING_STYLES } from '../utils/figureGeometry';

export default function Canvas({
  figures,
  selectedFigureId,
  selectedPart,
  onSelectPart,
  onMoveFigure,
  onRotateBodyPart,
  backgroundColor = 'white',
  showGrid = false,
  showCenterLine = false,
  showHorizon = false,
  showLineOfAction = false,
  showJoints = false,
  lineWidth = 2,
  applySketchEffectOnDraw = false,
  canvasRef,
}) {
  const internalCanvasRef = useRef(null);
  const ref = canvasRef || internalCanvasRef;

  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState(null); // 'rotate', 'move', 'part'
  const [dragStart, setDragStart] = useState(null);
  const [draggedPart, setDraggedPart] = useState(null);
  const [draggedFigureId, setDraggedFigureId] = useState(null);

  // Draw the canvas
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw guides
    drawGuides(ctx, canvas, {
      showGrid,
      showHorizon,
      showCenterLine,
    });

    // Draw all figures
    figures.forEach(figure => {
      if (!figure.visible) return;

      const centerX = width / 2 + figure.x;
      const centerY = height / 2 + figure.y;

      // Draw line of action if enabled
      if (showLineOfAction) {
        drawLineOfAction(ctx, figure.pose, centerX, centerY, figure.scale);
      }

      // Draw all body parts
      Object.keys(SKELETON).forEach(partName => {
        drawBodyPart(ctx, partName, figure.pose, centerX, centerY, figure.scale, figure.style, lineWidth);
      });

      // Highlight selected part
      if (figure.id === selectedFigureId && selectedPart) {
        const pos = getBodyPartWorldPosition(selectedPart, figure.pose, centerX, centerY, figure.scale);
        const part = SKELETON[selectedPart];
        const radius = (part.size * figure.scale) / 2 + 4;

        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw joints if enabled
      drawJoints(ctx, figure.pose, centerX, centerY, figure.scale, showJoints);
    });

    // Apply sketch effect if enabled
    if (applySketchEffectOnDraw) {
      applySketchEffect(ctx, width, height);
    }
  }, [figures, selectedFigureId, selectedPart, backgroundColor, showGrid, showCenterLine, showHorizon, showLineOfAction, showJoints, lineWidth, applySketchEffectOnDraw, ref]);

  // Handle mouse down
  const handleMouseDown = (e) => {
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const selectedFigure = figures.find(f => f.id === selectedFigureId);
    if (!selectedFigure) return;

    const figureX = centerX + selectedFigure.x;
    const figureY = centerY + selectedFigure.y;

    // Check if clicking on a body part
    const partsAtPoint = getBodyPartsAtPoint(x - figureX, y - figureY, selectedFigure.pose, 0, 0, selectedFigure.scale);

    if (partsAtPoint.length > 0) {
      // Clicking on a body part
      setDragMode('part');
      setDragStart({ x, y });
      setDraggedPart(partsAtPoint[0]);
      setDraggedFigureId(selectedFigureId);
      onSelectPart(partsAtPoint[0]);

      if (e.altKey) {
        // Alt+click to rotate
        setDragMode('rotate');
      }
    } else {
      // Clicking on background to move figure
      setDragMode('move');
      setDragStart({ x, y });
      setDraggedFigureId(selectedFigureId);
    }

    setIsDragging(true);
  };

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - dragStart.x;
    const dy = y - dragStart.y;

    if (dragMode === 'move') {
      // Move the figure
      onMoveFigure(draggedFigureId, dx / 10, dy / 10);
    } else if (dragMode === 'part' && draggedPart) {
      // Rotate the body part
      const angle = Math.atan2(dy, dx);
      onRotateBodyPart(draggedFigureId, draggedPart, angle * 0.5);
    }

    setDragStart({ x, y });
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle double click to select figure
  const handleDoubleClick = (e) => {
    const canvas = ref.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Find which figure was clicked
    for (let i = figures.length - 1; i >= 0; i--) {
      const figure = figures[i];
      const figureX = centerX + figure.x;
      const figureY = centerY + figure.y;

      const partsAtPoint = getBodyPartsAtPoint(x - figureX, y - figureY, figure.pose, 0, 0, figure.scale);
      if (partsAtPoint.length > 0) {
        // Select this figure
        // This would be handled by parent component
        return;
      }
    }
  };

  return (
    <canvas
      ref={ref}
      width={900}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      style={{
        cursor: isDragging ? 'grabbing' : 'crosshair',
        display: 'block',
        imageRendering: 'crisp-edges',
      }}
    />
  );
}
