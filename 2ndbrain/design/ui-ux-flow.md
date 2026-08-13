# UI / UX Flow

The user experience in 2ndBrain relies heavily on cinematic animations, custom DOM overlays, and CSS layout trickery to mask system loading states.

## The Boot Sequence (`BootSequence.jsx`)

To lean into the `.exe` hacker aesthetic, the transition from the Landing Page to the Vault runs through a terminal boot sequence. 

### Micro-Increment Loading Bar
Instead of a simple CSS transition, the progress bar uses a 60fps `setInterval` engine that adds randomized, micro-increments to the progress value, simulating genuine system stutter.

```javascript
let currentVal = 0;
const progressInterval = setInterval(() => {
  // Add a random float between 0.2 and 1.7
  currentVal += (Math.random() * 1.5 + 0.2); 
  
  if (currentVal >= 100) {
    setProgress(100);
    // ... Clear intervals and transition to Vault
  }
}, 20); // 20ms = 50fps smooth loop
```

## Framer Motion Modals

The application avoids native `window.confirm()` alerts completely. Instead, all destructive actions (deleting nodes, deleting folders, signing out) pass configuration data to a centralized `modalConfig` state object in `Vault.jsx`.

The modal is animated in using Framer Motion's physics-based spring system:

```javascript
<motion.div 
  initial={{ scale: 0.9, y: 20, opacity: 0 }}
  animate={{ scale: 1, y: 0, opacity: 1 }}
  exit={{ scale: 0.9, y: 20, opacity: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
>
```
The `type: "danger" | "warning"` property dynamically changes the left border color (Red vs Gold) to communicate the severity of the action visually.

## Fullscreen Editor Mode

The Vault layout is a standard three-column CSS flexbox (Sidebar, Editor, Information Panels). 

When the user clicks the fullscreen icon, `isFullScreen` state toggles a `.fullscreen` CSS class on the center column. 
In `index.css`, this class uses absolute positioning and a high z-index to break out of the flex layout and consume the entire viewport, offering a distraction-free writing experience while the right-hand canvas simulation pauses rendering off-screen.

```css
.vault-center-col.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: var(--bg-main);
}
```

## Landing Page Glassmorphism

The marketing landing page uses a heavy CSS Grid layout mixed with blur filters to create depth.

The panels in the `panel-grid-section` use a custom `dashboard-panel` CSS class that applies a semi-transparent background and a backdrop filter:
```css
.dashboard-panel {
  background: rgba(10, 10, 15, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

Beneath these panels, a blurred absolute `div` element acts as a "Glow Orb", shining *through* the glass panel to create volume:
```css
.glow-back {
  position: absolute;
  width: 300px;
  height: 300px;
  filter: blur(80px); /* Massive blur spreads the light */
}
```
