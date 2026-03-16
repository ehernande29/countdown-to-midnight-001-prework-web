# Figure Sketch App - Documentation

A polished web application for creating poseable figure drawing sketches. Perfect for artists, designers, and anyone who wants to create custom reference poses.

## Features

### Core Functionality
- **Poseable Mannequin**: Full-body figure with 15 moveable body parts (head, torso, pelvis, arms, hands, legs, feet)
- **Intuitive Manipulation**: Click and drag joints to rotate limbs, move the entire figure
- **Multiple Drawing Styles**:
  - Simple Mannequin (default)
  - Stick Figure
  - Sketch Outline
- **9 Pose Presets**: Standing, Contrapposto, Walking, Running, Sitting, Crouching, Jumping, Reaching, Punching

### Canvas Controls
- **Guide Lines**: Grid, center line, horizon line
- **Visual Effects**: Line of action, show joints, sketch effect
- **Adjustable Display**: Background color, line thickness, custom scaling
- **Multiple Figures**: Add, duplicate, delete, and layer multiple figures

### Advanced Features
- **Undo/Redo**: Full history of pose changes
- **Flip Horizontal**: Mirror the pose for symmetrical variations
- **Export Options**:
  - JPG or PNG format
  - 3 resolution levels (Small, Medium, High)
  - Sketch-style reference images perfect for drawing

## Installation & Setup

### Requirements
- Node.js (v16+)
- npm or yarn

### Quick Start

1. **Navigate to the project directory**:
   ```bash
   cd /path/to/countdown-to-midnight-001-prework-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   The app will automatically open at `http://localhost:3000`

## How to Use

### Basic Workflow

1. **Start with a Preset**:
   - Click any preset button (Standing, Walking, etc.) in the left panel
   - The figure will adopt that pose instantly

2. **Adjust the Pose**:
   - **Rotate Limbs**: Click and drag a body part to rotate it
   - **Move Figure**: Click and drag the background to reposition the entire figure
   - **Scale Figure**: Use the "Scale" slider in the right panel under the Figure tab

3. **Customize Display**:
   - Choose a background color (white, tan, gray, sketch paper)
   - Add guide lines (grid, center, horizon)
   - Toggle line of action or joint markers
   - Adjust line thickness for different effects

4. **Work with Multiple Figures**:
   - Click "+ Add Figure" to add another figure
   - Each figure can have its own pose, style, and position
   - Use "Duplicate" to create copies
   - Use "Delete" to remove (always keep at least one)

5. **Export Your Work**:
   - Go to the Export tab
   - Choose format (JPG or PNG)
   - Select resolution (small, medium, or high)
   - Click "Download" to save the image

### Advanced Tips

- **Quick Adjustments**: Use sliders in the right panel for fine-tuned position and scale
- **Sketch Lookalike**: Enable "Sketch Effect" for a more artistic look
- **Reference Lines**: Use guides to help with anatomy and proportions
- **Layering**: Figures are drawn in order (duplicate to layer automatically)
- **Symmetry**: Flip the figure horizontally to check symmetry or create mirrored poses

## Interface Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Figure Sketch App                            │
├─────────────────┬────────────────────────────────┬──────────────────┤
│   LEFT PANEL    │      CENTER CANVAS             │   RIGHT PANEL    │
│                 │                                │                  │
│ • How to Use    │  ┌──────────────────────────┐  │ Display/Figure/  │
│ • Undo/Redo     │  │                          │  │ Export Tabs      │
│ • Reset/Flip    │  │  [Interactive Canvas]    │  │                  │
│ • Pose Presets  │  │  [Draw & Manipulate]     │  │ • Background     │
│   (9 buttons)   │  │                          │  │ • Guides         │
│ • Figure Tools  │  │                          │  │ • Line Effect    │
│ • Add/Duplicate │  │                          │  │ • Export Options │
│ • Pro Tips      │  │                          │  │                  │
│                 │  └──────────────────────────┘  │                  │
└─────────────────┴────────────────────────────────┴──────────────────┘
```

## Key Commands

- **Pose Presets**: Click any preset button to instantly change pose
- **Undo/Redo**: Use buttons in left panel (or implement keyboard shortcuts)
- **Reset**: Return figure to neutral standing pose
- **Flip**: Mirror the pose horizontally
- **Export**: Download as JPG or PNG at chosen resolution

## Technical Details

### Project Structure
```
src/
├── components/
│   ├── Canvas.jsx          # Main drawing and interaction canvas
│   ├── LeftPanel.jsx       # Tools, presets, figure management
│   └── RightPanel.jsx      # Display, figure, and export settings
├── hooks/
│   └── useFigureState.js   # State management and history
├── utils/
│   ├── figureGeometry.js   # Body part definitions and calculations
│   ├── posePresets.js      # Preset pose data
│   └── canvasUtils.js      # Drawing and export utilities
├── styles/
│   └── index.css           # Complete styling system
├── App.jsx                 # Main application component
└── main.jsx                # React entry point
```

### Key Technologies
- **React 18**: UI framework with hooks
- **Canvas API**: 2D drawing and manipulation
- **Vite**: Fast build tool and dev server
- **Local State**: No external backend needed

## Future Improvements

### High Priority
- [ ] Keyboard shortcuts (Ctrl+Z for undo, etc.)
- [ ] Save/load custom poses to browser local storage
- [ ] Proportion presets (average adult, heroic, fashion, child)
- [ ] Hand and foot angle adjustments
- [ ] Ghosted previous pose overlay for comparison

### Medium Priority
- [ ] Symmetry mode for balanced poses
- [ ] Layer ordering (bring forward, send backward)
- [ ] Color/style customization per figure
- [ ] Animation between poses
- [ ] Pose library with thumbnails

### Nice-to-Have
- [ ] Gesture drawing mode with quick shapes
- [ ] Figure measurement tools
- [ ] Batch export
- [ ] Dark mode UI
- [ ] Mobile touch gestures

## Troubleshooting

### App won't start
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` and try `npm install` again
- Check that port 3000 is not in use

### Export not working
- Ensure canvas is fully rendered before exporting
- Try different resolution if file is too large
- Check browser console for errors

### Drawing is slow
- Close other browser tabs
- Disable "Sketch Effect" for better performance
- Reduce number of guide lines visible

## Build for Production

To create an optimized build:
```bash
npm run build
```

Output will be in the `dist/` folder. Deploy this to any static hosting service.

## License

This project is provided as-is for personal and educational use.

## Support

For issues or questions:
1. Check the "How to Use" section in the app
2. Review the tips at the bottom of the left panel
3. Try clearing browser cache if experiencing issues

---

Enjoy creating beautiful figure drawing references! 🎨
