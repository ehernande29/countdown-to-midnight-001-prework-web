import React, { useState, useRef } from 'react';
import { exportCanvasToImage, getResolutionDimensions } from '../utils/canvasUtils';
import { DRAWING_STYLES } from '../utils/figureGeometry';

export default function RightPanel({
  canvasRef,
  figures,
  selectedFigureId,
  onUpdateFigureProperty,
  backgroundColor,
  onBackgroundChange,
  showGrid,
  onShowGridChange,
  showCenterLine,
  onShowCenterLineChange,
  showHorizon,
  onShowHorizonChange,
  showLineOfAction,
  onShowLineOfActionChange,
  showJoints,
  onShowJointsChange,
  lineWidth,
  onLineWidthChange,
  applySketchEffect,
  onApplySketchEffectChange,
}) {
  const [activeTab, setActiveTab] = useState('display');
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('jpeg');
  const [exportResolution, setExportResolution] = useState('medium');

  const selectedFigure = figures.find(f => f.id === selectedFigureId);

  // Export canvas
  const handleExport = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);

    try {
      // Create export canvas with specified resolution
      const dims = getResolutionDimensions(exportResolution);
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = dims.width;
      exportCanvas.height = dims.height;
      const ctx = exportCanvas.getContext('2d');

      // Scale and draw to export canvas
      const scaleX = dims.width / canvas.width;
      const scaleY = dims.height / canvas.height;
      ctx.scale(scaleX, scaleY);

      // Draw the original canvas
      ctx.drawImage(canvas, 0, 0);

      // Export
      await exportCanvasToImage(exportCanvas, exportFormat);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="panel right-panel">
      {/* Tabs */}
      <div className="tabs" style={{ borderBottom: '1px solid var(--border)' }}>
        <button
          className={`tab ${activeTab === 'display' ? 'active' : ''}`}
          onClick={() => setActiveTab('display')}
        >
          Display
        </button>
        <button
          className={`tab ${activeTab === 'figure' ? 'active' : ''}`}
          onClick={() => setActiveTab('figure')}
        >
          Figure
        </button>
        <button
          className={`tab ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          Export
        </button>
      </div>

      {/* Display Tab */}
      {activeTab === 'display' && (
        <div className="section">
          <div className="section-title">Canvas Background</div>
          <select
            value={backgroundColor}
            onChange={(e) => onBackgroundChange(e.target.value)}
            style={{ marginBottom: '16px' }}
          >
            <option value="white">White</option>
            <option value="#f5f5f0">Light Tan</option>
            <option value="#e8e8e8">Light Gray</option>
            <option value="#f9f7f4">Sketch Paper</option>
          </select>

          <div className="section-title">Guide Lines</div>
          <div className="checkbox-control">
            <input
              type="checkbox"
              id="show-grid"
              checked={showGrid}
              onChange={(e) => onShowGridChange(e.target.checked)}
            />
            <label htmlFor="show-grid">Grid</label>
          </div>
          <div className="checkbox-control">
            <input
              type="checkbox"
              id="show-center"
              checked={showCenterLine}
              onChange={(e) => onShowCenterLineChange(e.target.checked)}
            />
            <label htmlFor="show-center">Center Line</label>
          </div>
          <div className="checkbox-control">
            <input
              type="checkbox"
              id="show-horizon"
              checked={showHorizon}
              onChange={(e) => onShowHorizonChange(e.target.checked)}
            />
            <label htmlFor="show-horizon">Horizon Line</label>
          </div>

          <div className="section-title" style={{ marginTop: '16px' }}>
            Drawing Effects
          </div>
          <div className="checkbox-control">
            <input
              type="checkbox"
              id="show-loa"
              checked={showLineOfAction}
              onChange={(e) => onShowLineOfActionChange(e.target.checked)}
            />
            <label htmlFor="show-loa">Line of Action</label>
          </div>
          <div className="checkbox-control">
            <input
              type="checkbox"
              id="show-joints"
              checked={showJoints}
              onChange={(e) => onShowJointsChange(e.target.checked)}
            />
            <label htmlFor="show-joints">Show Joints</label>
          </div>
          <div className="checkbox-control">
            <input
              type="checkbox"
              id="apply-sketch"
              checked={applySketchEffect}
              onChange={(e) => onApplySketchEffectChange(e.target.checked)}
            />
            <label htmlFor="apply-sketch">Sketch Effect</label>
          </div>

          <div className="control" style={{ marginTop: '16px' }}>
            <label className="control-label">Line Thickness</label>
            <div className="input-group">
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={lineWidth}
                onChange={(e) => onLineWidthChange(parseFloat(e.target.value))}
              />
              <span className="slider-value">{lineWidth.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Figure Tab */}
      {activeTab === 'figure' && selectedFigure && (
        <div className="section">
          <div className="section-title">Style</div>
          <select
            value={selectedFigure.style}
            onChange={(e) => onUpdateFigureProperty(selectedFigureId, 'style', e.target.value)}
            style={{ marginBottom: '16px' }}
          >
            <option value="simple_mannequin">Simple Mannequin</option>
            <option value="stick_figure">Stick Figure</option>
            <option value="sketch_outline">Sketch Outline</option>
          </select>

          <div className="section-title">Scale</div>
          <div className="control">
            <div className="input-group">
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={selectedFigure.scale}
                onChange={(e) => onUpdateFigureProperty(selectedFigureId, 'scale', parseInt(e.target.value))}
              />
              <span className="slider-value">{selectedFigure.scale}%</span>
            </div>
          </div>

          <div className="section-title" style={{ marginTop: '16px' }}>Position</div>
          <div className="control">
            <label className="control-label">X: {selectedFigure.x.toFixed(0)}</label>
            <input
              type="range"
              min="-200"
              max="200"
              step="10"
              value={selectedFigure.x}
              onChange={(e) => onUpdateFigureProperty(selectedFigureId, 'x', parseInt(e.target.value))}
            />
          </div>
          <div className="control">
            <label className="control-label">Y: {selectedFigure.y.toFixed(0)}</label>
            <input
              type="range"
              min="-200"
              max="200"
              step="10"
              value={selectedFigure.y}
              onChange={(e) => onUpdateFigureProperty(selectedFigureId, 'y', parseInt(e.target.value))}
            />
          </div>

          <div className="section-title" style={{ marginTop: '16px' }}>Visibility</div>
          <div className="checkbox-control">
            <input
              type="checkbox"
              id={`fig-visible-${selectedFigureId}`}
              checked={selectedFigure.visible}
              onChange={(e) => onUpdateFigureProperty(selectedFigureId, 'visible', e.target.checked)}
            />
            <label htmlFor={`fig-visible-${selectedFigureId}`}>Visible</label>
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="section">
          <div className="section-title">Format</div>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            style={{ marginBottom: '16px' }}
          >
            <option value="jpeg">JPEG (JPG)</option>
            <option value="png">PNG</option>
          </select>

          <div className="section-title">Resolution</div>
          <select
            value={exportResolution}
            onChange={(e) => setExportResolution(e.target.value)}
            style={{ marginBottom: '16px' }}
          >
            <option value="small">Small (800×1000) - Web</option>
            <option value="medium">Medium (1200×1500) - Standard</option>
            <option value="high">High (1600×2000) - Print</option>
          </select>

          <button
            onClick={handleExport}
            disabled={isExporting}
            style={{
              opacity: isExporting ? 0.6 : 1,
            }}
          >
            {isExporting ? '⏳ Exporting...' : '⬇ Download ' + (exportFormat === 'jpeg' ? 'JPG' : 'PNG')}
          </button>

          <div className="info-box" style={{ marginTop: '16px', fontSize: '11px' }}>
            The exported image will be a high-quality, printer-friendly reference sketch.
            Perfect for drawing practice or sharing with others!
          </div>
        </div>
      )}
    </div>
  );
}
