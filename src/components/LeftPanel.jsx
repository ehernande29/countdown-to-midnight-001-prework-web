import React, { useState } from 'react';
import { getPresetKeys, getPresetInfo } from '../utils/posePresets';

export default function LeftPanel({
  onApplyPreset,
  onReset,
  onUndo,
  onRedo,
  onFlip,
  onAddFigure,
  onDeleteFigure,
  onDuplicateFigure,
  canUndo,
  canRedo,
  selectedFigureId,
  figures,
}) {
  const [showHelp, setShowHelp] = useState(false);

  const presets = getPresetKeys();

  return (
    <div className="panel left-panel">
      {/* Help Section */}
      <div className="section">
        <button
          className="secondary"
          onClick={() => setShowHelp(!showHelp)}
          style={{ marginBottom: '8px' }}
        >
          {showHelp ? '✕ Close Help' : '? How to Use'}
        </button>
        {showHelp && (
          <div className="info-box" style={{ marginTop: '8px' }}>
            <strong>Quick Start:</strong>
            <ul style={{ marginTop: '8px', marginLeft: '16px', fontSize: '12px' }}>
              <li>Click &amp; drag a joint to rotate limbs</li>
              <li>Click &amp; drag background to move figure</li>
              <li>Click preset buttons to apply poses</li>
              <li>Use buttons below to undo/redo changes</li>
              <li>Export from the right panel</li>
            </ul>
          </div>
        )}
      </div>

      {/* Undo/Redo */}
      <div className="section">
        <div className="section-title">Edit</div>
        <div className="button-group">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={!canUndo ? 'secondary' : ''}
          >
            ↶ Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={!canRedo ? 'secondary' : ''}
          >
            ↷ Redo
          </button>
        </div>
        <button onClick={onReset} className="secondary mb-2">
          Reset Pose
        </button>
        <button onClick={onFlip} className="secondary">
          ↔ Flip Horizontal
        </button>
      </div>

      {/* Figure Presets */}
      <div className="section">
        <div className="section-title">Pose Presets</div>
        <div className="preset-grid">
          {presets.map(presetKey => {
            const info = getPresetInfo(presetKey);
            return (
              <button
                key={presetKey}
                onClick={() => onApplyPreset(presetKey)}
                className="preset-button"
                title={info.description}
                style={{ fontSize: '11px', padding: '8px 6px' }}
              >
                {info.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Figure Management */}
      <div className="section">
        <div className="section-title">Figures ({figures.length})</div>
        <button onClick={onAddFigure} className="mb-2">
          + Add Figure
        </button>
        <button
          onClick={() => onDuplicateFigure(selectedFigureId)}
          className="secondary mb-2"
        >
          📋 Duplicate
        </button>
        <button
          onClick={() => onDeleteFigure(selectedFigureId)}
          disabled={figures.length <= 1}
          className={figures.length <= 1 ? 'secondary' : 'danger'}
        >
          🗑 Delete
        </button>
      </div>

      {/* Tips */}
      <div className="section">
        <div className="info-box" style={{ fontSize: '11px' }}>
          <strong>Pro Tips:</strong>
          <ul style={{ marginTop: '6px', marginLeft: '14px' }}>
            <li>Use presets as starting points</li>
            <li>Combine multiple figures for group poses</li>
            <li>Export high-res for printing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
