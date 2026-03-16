import React, { useState, useRef, useCallback } from 'react';
import Canvas from './components/Canvas';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { useFigureState } from './hooks/useFigureState';

export default function App() {
  const canvasRef = useRef(null);
  const state = useFigureState();

  // Canvas settings
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [showGrid, setShowGrid] = useState(false);
  const [showCenterLine, setShowCenterLine] = useState(false);
  const [showHorizon, setShowHorizon] = useState(false);
  const [showLineOfAction, setShowLineOfAction] = useState(false);
  const [showJoints, setShowJoints] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [applySketchEffect, setApplySketchEffect] = useState(false);

  // Handle body part rotation from canvas
  const handleRotateBodyPart = useCallback((figureId, partName, deltaRotation) => {
    const figure = state.figures.find(f => f.id === figureId);
    if (!figure) return;

    state.setSelectedFigureId(figureId);

    const currentRotation = figure.pose[partName]?.rotation || 0;
    const newRotation = currentRotation + deltaRotation;

    const newPose = {
      ...figure.pose,
      [partName]: {
        ...figure.pose[partName],
        rotation: newRotation,
      },
    };

    state.updateFigureProperty(figureId, 'pose', newPose);
  }, [state]);

  // Handle figure movement from canvas
  const handleMoveFigure = useCallback((figureId, dx, dy) => {
    const figure = state.figures.find(f => f.id === figureId);
    if (!figure) return;

    state.updateFigureProperty(figureId, 'x', figure.x + dx);
    state.updateFigureProperty(figureId, 'y', figure.y + dy);
  }, [state]);

  return (
    <div className="app-container">
      {/* Left Panel - Tools & Presets */}
      <LeftPanel
        onApplyPreset={state.applyPreset}
        onReset={state.reset}
        onUndo={state.undo}
        onRedo={state.redo}
        onFlip={state.flip}
        onAddFigure={state.addFigure}
        onDeleteFigure={state.deleteFigure}
        onDuplicateFigure={state.duplicateFigure}
        canUndo={state.canUndo}
        canRedo={state.canRedo}
        selectedFigureId={state.selectedFigureId}
        figures={state.figures}
      />

      {/* Center Panel - Canvas */}
      <div className="center-panel">
        <div className="canvas-container">
          <div className="canvas-wrapper">
            <Canvas
              canvasRef={canvasRef}
              figures={state.figures}
              selectedFigureId={state.selectedFigureId}
              selectedPart={state.selectedPart}
              onSelectPart={state.setSelectedPart}
              onMoveFigure={handleMoveFigure}
              onRotateBodyPart={handleRotateBodyPart}
              backgroundColor={backgroundColor}
              showGrid={showGrid}
              showCenterLine={showCenterLine}
              showHorizon={showHorizon}
              showLineOfAction={showLineOfAction}
              showJoints={showJoints}
              lineWidth={lineWidth}
              applySketchEffectOnDraw={applySketchEffect}
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Settings & Export */}
      <RightPanel
        canvasRef={canvasRef}
        figures={state.figures}
        selectedFigureId={state.selectedFigureId}
        onUpdateFigureProperty={state.updateFigureProperty}
        backgroundColor={backgroundColor}
        onBackgroundChange={setBackgroundColor}
        showGrid={showGrid}
        onShowGridChange={setShowGrid}
        showCenterLine={showCenterLine}
        onShowCenterLineChange={setShowCenterLine}
        showHorizon={showHorizon}
        onShowHorizonChange={setShowHorizon}
        showLineOfAction={showLineOfAction}
        onShowLineOfActionChange={setShowLineOfAction}
        showJoints={showJoints}
        onShowJointsChange={setShowJoints}
        lineWidth={lineWidth}
        onLineWidthChange={setLineWidth}
        applySketchEffect={applySketchEffect}
        onApplySketchEffectChange={setApplySketchEffect}
      />
    </div>
  );
}
