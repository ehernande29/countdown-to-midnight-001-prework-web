# Figure Sketch App - Quick Reference Card

## 🚀 Start in 30 Seconds
```bash
npm install
npm run dev
```
Then open `http://localhost:3000` 🎨

---

## 🎯 The 5-Step Workflow

```
1. LOAD APP
   ↓
2. CLICK PRESET (e.g., "Standing")
   ↓
3. DRAG BODY PARTS to adjust pose
   ↓
4. CUSTOMIZE background, guides, style
   ↓
5. EXPORT as JPG/PNG
```

---

## 🖱️ Main Controls

| Action | How |
|--------|-----|
| **Rotate Limbs** | Click & drag any body part |
| **Move Figure** | Click & drag the background |
| **Scale Figure** | Use "Scale" slider (right panel) |
| **Change Pose** | Click any preset button |
| **Undo** | Click "Undo" button |
| **Add Figure** | Click "+ Add Figure" |
| **Export** | Go to Export tab → Choose format/resolution → Download |

---

## 📍 The Layout

```
┌─────────────────────────────────────────┐
│          FIGURE SKETCH APP              │
├──────────┬────────────────┬─────────────┤
│   LEFT   │     CENTER     │    RIGHT    │
│  PANEL   │     CANVAS     │    PANEL    │
│          │                │             │
│  Tools   │   Interactive  │  Display &  │
│ Presets  │    Drawing     │   Export    │
│  Figure  │    Area        │  Settings   │
│  Mgmt    │                │             │
└──────────┴────────────────┴─────────────┘
```

---

## 🎨 9 Preset Poses

```
Standing      Contrapposto    Walking       Running
   ↓             ↓              ↓             ↓
  [●]           [●]            [●]           [●]

Sitting       Crouching      Jumping       Reaching
   ↓             ↓              ↓             ↓
  [●]           [●]            [●]           [●]

Punching
   ↓
  [●]
```
*Click any button to instantly apply that pose*

---

## 🎭 3 Drawing Styles

| Style | Look | Use For |
|-------|------|---------|
| **Mannequin** | Anatomical, proportioned | Professional references |
| **Stick Figure** | Minimal, quick | Quick sketches, clarity |
| **Sketch Outline** | Artistic, soft | Finished artwork |

---

## 📊 Right Panel Tabs

### DISPLAY Tab
- Background color (white, tan, gray, sketch)
- Show grid, center line, horizon line
- Line of action, joints, sketch effect
- Line thickness adjustment

### FIGURE Tab
- Style selector (mannequin/stick/sketch)
- Scale (20-300%)
- Position X/Y fine-tuning
- Visibility toggle

### EXPORT Tab
- Format: JPG or PNG
- Resolution: Small/Medium/High
- Download button

---

## 🎬 Advanced Tips

### Multiple Figures
```
1. Click "+ Add Figure" for second figure
2. Each figure is independent
3. Use "Duplicate" to copy current figure
4. Use "Delete" to remove (keep ≥1)
```

### Fine-Tuning Poses
```
1. Use presets as starting point
2. Drag joints to adjust angles
3. Use right panel sliders for precision
4. Click Undo if you want to revert
```

### Best Export Settings
```
For Web:     Small JPG
For Screen:  Medium JPG
For Printing: High PNG
```

---

## ⌨️ Features Checklist

- ✅ 15 moveable body parts
- ✅ 9 preset poses
- ✅ 3 drawing styles
- ✅ Full undo/redo
- ✅ Multiple figures
- ✅ Canvas guides
- ✅ Export JPG/PNG
- ✅ 3 resolution levels
- ✅ Line thickness control
- ✅ Flip horizontal
- ✅ Reset to neutral pose
- ✅ Grid/guides
- ✅ Line of action overlay
- ✅ Sketch effects

---

## 🐛 Troubleshooting

**App won't start:**
→ Make sure Node.js is installed: `node --version`
→ Try: `rm -rf node_modules && npm install`

**Export not working:**
→ Disable "Sketch Effect" if enabled
→ Try different resolution
→ Check browser console (F12)

**Slow performance:**
→ Close other browser tabs
→ Disable grid if showing many figures
→ Disable "Sketch Effect"

**Poses look weird:**
→ Click "Reset Pose" to start over
→ Check that you selected the right figure
→ Try a different preset as base

---

## 📚 Full Documentation

- **SETUP.md** → Installation & basic usage
- **FIGURE_SKETCH_APP.md** → Complete feature guide
- **PROJECT_SUMMARY.md** → Technical architecture

---

## 💡 Pro Tips

1. **Use presets as templates** - customize from there rather than from scratch
2. **Export multiple versions** - try different styles and backgrounds
3. **Layer figures** - create groups by duplicating and repositioning
4. **Study anatomy** - use presets to understand natural proportions
5. **Reference existing art** - compare your poses to other figure drawings
6. **Print references** - export at high resolution for drawing practice

---

## 🎯 Common Workflows

### Quick Pose Reference
```
1. Click "Standing" preset
2. Adjust 1-2 joints
3. Export as Medium JPG
Done! 📸
```

### Group Composition
```
1. Load "Standing" pose
2. Export as reference 1
3. Click "Add Figure"
4. Load "Walking" pose
5. Position both figures
6. Export composition
Done! 👥
```

### Anatomy Study
```
1. Load each preset one by one
2. Notice how joints move together
3. Export all variations
4. Compare proportions
Done! 🧠
```

---

## ⚙️ Keyboard Shortcuts (Coming Soon)
```
Ctrl+Z  Undo
Ctrl+Y  Redo
Ctrl+S  Export
R       Reset pose
F       Flip horizontal
```
*Not yet implemented, but easy to add!*

---

## 📈 File Size Reference
```
Dev Server: ~4 MB (with node_modules)
Production Build: 165 KB (minified JS)
Exported JPG: ~50-200 KB (depending on complexity)
```

---

## 🎓 Learning Resources

**To understand the code:**
1. Start with `src/App.jsx` - main component
2. Read `src/components/Canvas.jsx` - drawing logic
3. Check `src/utils/figureGeometry.js` - pose math
4. Review `src/hooks/useFigureState.js` - state management

**To extend the app:**
1. Add new poses in `src/utils/posePresets.js`
2. New styles in `src/utils/canvasUtils.js`
3. New controls in component panels
4. See comments in code for guidance

---

## 🎁 What's Included

✅ Complete working app
✅ Full source code
✅ Setup instructions
✅ Complete documentation
✅ Production-ready build
✅ No external dependencies needed
✅ Easy to customize
✅ Ready to deploy

---

## 🚀 Deploy Your App

### Option 1: GitHub Pages (Free)
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

### Option 2: Vercel (Recommended, Free)
```bash
# Install vercel CLI
npm i -g vercel
# Deploy
vercel
```

### Option 3: Netlify (Free)
```bash
# Drag dist/ folder to netlify.com
```

---

## 🎨 Customization Ideas

- Change color scheme in `src/styles/index.css`
- Add more presets in `src/utils/posePresets.js`
- Create new drawing styles in `src/utils/canvasUtils.js`
- Adjust figure proportions in `src/utils/figureGeometry.js`
- Add new body parts to SKELETON object

---

**Have fun creating! 🎨✨**

For more help: See SETUP.md, FIGURE_SKETCH_APP.md, or PROJECT_SUMMARY.md
