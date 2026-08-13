# Typography & Colors

The design language of 2ndBrain avoids typical flat SaaS design in favor of a cinematic, high-fidelity dark aesthetic.

## Typography

Three distinct font stacks are used:

1. **Inter (`--font-sans`)**
   - **Usage**: The primary body font used inside the BlockNote editor and system UI.
   - **Why**: Maximum legibility, excellent x-height for long-form reading.
2. **Playfair Display (`--font-serif`)**
   - **Usage**: Hero headlines, landing page section titles, and the XP level indicator.
   - **Why**: Brings a touch of editorial elegance that contrasts sharply with the cyber-aesthetic.
3. **Courier New (`--font-mono`)**
   - **Usage**: Status indicators, terminal boot sequences, and scrolling tickers.
   - **Why**: Reinforces the "system terminal" `.exe` motif.

## Core Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#cfa861` | Primary gold accent. Used for buttons, active link indicators, and the XP bar glow. |
| `--bg-main` | `#020203` | The absolute lowest z-index background (near black). |
| `--bg-panel`| `#050508` | Slightly elevated background for the left sidebar and right right info panels. |
| `--text-muted` | `#888888` | Used for subtext, descriptions, and inactive node labels in the graph. |
| `--success` | `#4ade80` | Used exclusively to indicate a successful "Synced" state to the cloud. |
| `--danger` | `#ef4444` | Used for destructive confirmation modals and error states. |
