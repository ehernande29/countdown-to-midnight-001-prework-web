import { useState, useCallback } from 'react';
import { createEmptyPose, translateFigure, scaleFigure, flipFigure, updatePartRotation } from '../utils/figureGeometry';
import { getPosePreset } from '../utils/posePresets';

// Custom hook to manage figure state and history
export function useFigureState() {
  const [history, setHistory] = useState([createEmptyPose()]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedPart, setSelectedPart] = useState(null);
  const [figures, setFigures] = useState([
    {
      id: 1,
      pose: createEmptyPose(),
      x: 0,
      y: 0,
      scale: 100,
      style: 'simple_mannequin',
      visible: true,
    },
  ]);
  const [selectedFigureId, setSelectedFigureId] = useState(1);

  const pose = history[historyIndex];

  // Update pose and add to history
  const updatePose = useCallback((newPose) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPose);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Update the current figure
    setFigures(prev => prev.map(fig =>
      fig.id === selectedFigureId ? { ...fig, pose: newPose } : fig
    ));
  }, [history, historyIndex, selectedFigureId]);

  // Rotate a body part
  const rotateBodyPart = useCallback((partName, rotationDelta) => {
    if (!selectedFigureId) return;

    const currentFigure = figures.find(f => f.id === selectedFigureId);
    const currentRotation = currentFigure.pose[partName]?.rotation || 0;
    const newPose = updatePartRotation(currentFigure.pose, partName, currentRotation + rotationDelta);
    updatePose(newPose);
  }, [figures, selectedFigureId, updatePose]);

  // Move the figure
  const moveFigure = useCallback((dx, dy) => {
    setFigures(prev => prev.map(fig =>
      fig.id === selectedFigureId
        ? { ...fig, x: fig.x + dx, y: fig.y + dy }
        : fig
    ));
  }, [selectedFigureId]);

  // Scale the figure
  const scaleFigureUniform = useCallback((factor) => {
    setFigures(prev => prev.map(fig =>
      fig.id === selectedFigureId
        ? { ...fig, scale: Math.max(20, Math.min(300, fig.scale * factor)) }
        : fig
    ));
  }, [selectedFigureId]);

  // Flip figure horizontally
  const flip = useCallback(() => {
    const currentFigure = figures.find(f => f.id === selectedFigureId);
    const newPose = flipFigure(currentFigure.pose);
    updatePose(newPose);
  }, [figures, selectedFigureId, updatePose]);

  // Reset to default pose
  const reset = useCallback(() => {
    updatePose(createEmptyPose());
  }, [updatePose]);

  // Apply preset pose
  const applyPreset = useCallback((presetKey) => {
    const presetPose = getPosePreset(presetKey);
    if (presetPose) {
      updatePose(presetPose);
    }
  }, [updatePose]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const newPose = history[newIndex];
      setFigures(prev => prev.map(fig =>
        fig.id === selectedFigureId ? { ...fig, pose: newPose } : fig
      ));
    }
  }, [history, historyIndex, selectedFigureId]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const newPose = history[newIndex];
      setFigures(prev => prev.map(fig =>
        fig.id === selectedFigureId ? { ...fig, pose: newPose } : fig
      ));
    }
  }, [history, historyIndex, selectedFigureId]);

  // Add new figure
  const addFigure = useCallback(() => {
    const newId = Math.max(...figures.map(f => f.id), 0) + 1;
    setFigures(prev => [...prev, {
      id: newId,
      pose: createEmptyPose(),
      x: 50,
      y: 50,
      scale: 100,
      style: 'simple_mannequin',
      visible: true,
    }]);
    setSelectedFigureId(newId);
  }, [figures]);

  // Delete figure
  const deleteFigure = useCallback((figureId) => {
    const remaining = figures.filter(f => f.id !== figureId);
    if (remaining.length === 0) {
      // Keep at least one figure
      const newId = 1;
      setFigures([{
        id: newId,
        pose: createEmptyPose(),
        x: 0,
        y: 0,
        scale: 100,
        style: 'simple_mannequin',
        visible: true,
      }]);
      setSelectedFigureId(newId);
    } else {
      setFigures(remaining);
      if (selectedFigureId === figureId) {
        setSelectedFigureId(remaining[0].id);
      }
    }
  }, [figures, selectedFigureId]);

  // Duplicate figure
  const duplicateFigure = useCallback((figureId) => {
    const original = figures.find(f => f.id === figureId);
    if (!original) return;

    const newId = Math.max(...figures.map(f => f.id), 0) + 1;
    setFigures(prev => [...prev, {
      ...original,
      id: newId,
      x: original.x + 30,
      y: original.y + 30,
    }]);
    setSelectedFigureId(newId);
  }, [figures]);

  // Update figure property
  const updateFigureProperty = useCallback((figureId, property, value) => {
    setFigures(prev => prev.map(fig =>
      fig.id === figureId ? { ...fig, [property]: value } : fig
    ));
  }, []);

  return {
    figures,
    selectedFigureId,
    selectedPart,
    pose: figures.find(f => f.id === selectedFigureId)?.pose || createEmptyPose(),
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,

    // Actions
    setSelectedPart,
    setSelectedFigureId,
    rotateBodyPart,
    moveFigure,
    scaleFigureUniform,
    flip,
    reset,
    applyPreset,
    undo,
    redo,
    addFigure,
    deleteFigure,
    duplicateFigure,
    updateFigureProperty,
  };
}
