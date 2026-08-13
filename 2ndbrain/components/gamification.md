# RPG Gamification

To incentivize knowledge synthesis over simple hoarding, 2ndBrain incorporates an RPG-style leveling system that mathematically rewards users for connecting ideas.

## 1. XP Calculation

The logic for XP is purely derived from the lengths of the user's Firestore collections. 

```javascript
// Inside Vault.jsx
const totalXP = (graphData.nodes.length * 10) + (graphData.links.length * 25);
```

**The Math:**
- Creating a node (dumping a thought) = **10 XP**.
- Forming a bi-directional link (synthesizing two thoughts) = **25 XP**.

Because linking requires significantly more cognitive effort than just creating a note, it is weighted 2.5x higher.

## 2. Cognitive Leveling

The user's level is calculated linearly. Every 100 XP grants a new Cognitive Level.

```javascript
const currentLevel = Math.floor(totalXP / 100) + 1;
const currentLevelProgress = totalXP % 100; // Used for the progress bar width
```

The progress bar is rendered in the left sidebar:
```html
<div className="xp-track">
  <div className="xp-fill" style={{ width: `${currentLevelProgress}%` }}></div>
</div>
```
*Note: The `.xp-fill` class in `index.css` applies a smooth `width 0.5s` transition and a gold box-shadow (`box-shadow: 0 0 10px rgba(207, 168, 97, 0.5)`) to make it glow as it fills.*

## 3. The Synapse Burst (Level Up)

When a user levels up, a custom physics-based confetti burst is fired from the bottom corners of the screen.

### Level-Up Detection
Because React components re-render frequently (due to cursor tracking, keystrokes, etc.), we cannot simply check `if (totalXP % 100 === 0)`. Instead, we track the previous level across renders using a `useRef`.

```javascript
const prevLevelRef = useRef(currentLevel);

useEffect(() => {
  if (currentLevel > prevLevelRef.current) {
    fireSynapseBurst();
    prevLevelRef.current = currentLevel;
  }
}, [currentLevel]);
```

### Confetti Math
We use the `canvas-confetti` library to fire two opposing bursts (60° and 120° angles). The colors are hardcoded to match the project's exact CSS tokens:

```javascript
const fireSynapseBurst = () => {
  const colors = ['#cfa861', '#ffffff', '#1a1a1a']; // Gold, White, Obsidian
  
  // Left corner firing rightward
  confetti({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0, y: 0.8 }, colors, zIndex: 9999 });
  
  // Right corner firing leftward
  confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1, y: 0.8 }, colors, zIndex: 9999 });
};
```
