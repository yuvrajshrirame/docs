# System Architecture

**do.it** operates entirely as a client-side Single Page Application (SPA) utilizing React 18, Vite, and Firebase. It strictly separates UI components from pure utility functions, relying on a deeply integrated context and real-time database architecture.

## High-Level Authentication & Data Flow

The core architecture is built around **frictionless onboarding**. The application utilizes Firebase Anonymous Auth to immediately grant access, meaning the database logic never has to check for "unauthenticated" edges once the user is inside the main application flow.

```mermaid
flowchart TD
    %% User Entry
    A(["User Visits App"]) --> B{"Is Authenticated?"}
    
    %% Unauthenticated Flow
    B -- No --> C["LandingPage.jsx"]
    C --> D["Explore Features & Mockup"]
    C --> E["Click 'Continue as Guest'"]
    C --> F["Click 'Sign In'"]
    
    E -->|signInAnonymously| G["Firebase Anonymous Auth"]
    F -->|Google / Email Auth| H["Firebase Permanent Auth"]
    
    %% Authenticated Flow
    B -- Yes --> I
    G --> I["HabitTracker.jsx Dashboard"]
    H --> I
    
    %% Dashboard Architecture
    I --> J[("Firestore Real-Time Listener")]
    
    J --> K["Feed View"]
    J --> L["Statistics View"]
```

## Architectural Directories

The project follows a highly modular structure, ensuring pure logic is decoupled from React renders.

```mermaid
flowchart LR
    SRC["src/"] --> COMPONENTS["components/"]
    SRC --> CONTEXTS["contexts/"]
    SRC --> FIREBASE["firebase/"]
    SRC --> LIB["lib/"]
    SRC --> UTILS["utils/"]
    
    COMPONENTS -.->|"Consumes"| CONTEXTS
    COMPONENTS -.->|"Imports logic from"| UTILS
    COMPONENTS -.->|"Uses styling wrappers from"| LIB
    UTILS -.->|"Connects to"| FIREBASE
```

### Purpose of Each Layer

| Directory | Purpose | Key Details |
| :--- | :--- | :--- |
| `components/` | React UI | Contains all visual elements (`AddHabitModal.jsx`, `Heatmap.jsx`). Fully isolated from Firebase initialization logic. |
| `contexts/` | Global State | Currently manages the `ThemeContext`, intelligently reading system preferences and persisting overrides. |
| `firebase/` | Backend Config | Centralizes Firebase App, Auth, and Firestore initialization. |
| `lib/` | Styling Wrappers | Houses utility functions like `cn` (combining `clsx` and `tailwind-merge`) to compile dynamic Tailwind classes on the fly. |
| `utils/` | Business Logic | Pure JavaScript functions (e.g., streak calculations, date standardizations) that can be unit tested independent of React. |

## The Liquid Glass Aesthetic System

Instead of relying heavily on complex Javascript for theming, the application leverages native CSS variables and Tailwind.

1. **Theme Context:** `ThemeContext.jsx` reads `window.matchMedia('(prefers-color-scheme: dark)')`.
2. **Class Injection:** It dynamically injects the `.dark` class into the root `<html>` element.
3. **Tailwind Orchestration:** The entire color scheme pivots flawlessly using Tailwind's `dark:` modifier.

```mermaid
sequenceDiagram
    participant User
    participant ThemeContext
    participant HTML Root
    participant Tailwind
    
    User->>ThemeContext: System switches to Dark Mode
    ThemeContext->>HTML Root: Appends `.dark` class
    HTML Root->>Tailwind: Triggers `dark:bg-slate-900` utilities
    Tailwind-->>User: UI updates instantly without JS re-renders
```
