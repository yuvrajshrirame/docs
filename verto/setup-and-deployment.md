# Setup & Deployment Guide

This guide covers how to set up the external services required for VERTO, configure environment variables, and run the application locally or deploy it.

## 1. Prerequisites

You need accounts for the following services:
*   **Firebase** (Authentication & Firestore)
*   **GitHub** (OAuth application for login & Daily Sync)
*   **Spotify Developer** (API access for the Audio Engine)
*   **Node.js** (v18+ recommended)

## 2. Environment Variables

Create a `.env` file in the root directory (`verto/verto/.env`) and populate it with the following keys:

```env
# FIREBASE CONFIGURATION
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# SPOTIFY CONFIGURATION
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
```

---

## 3. External Service Configuration

### A. Firebase Setup
1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  Add a **Web App** to the project to generate the configuration object (copy these values into your `.env`).
3.  **Authentication:**
    *   Navigate to *Authentication > Sign-in method*.
    *   Enable the **GitHub** provider.
    *   You will need to provide a Client ID and Client Secret from GitHub (see step B).
    *   Copy the Firebase *Authorization callback URL* provided here to use in GitHub.
4.  **Firestore Database:**
    *   Navigate to *Firestore Database* and click *Create database*.
    *   Start in **Production mode**.
    *   *Note: You must manually configure Firestore Security Rules before deploying to production to secure the `users`, `sessions`, `categories`, and `guilds` collections.*

### B. GitHub OAuth Application
1.  Go to your GitHub Settings > Developer settings > **OAuth Apps**.
2.  Click *New OAuth App*.
3.  Set the *Authorization callback URL* to the URL provided by Firebase in step A3.
4.  Generate a Client Secret.
5.  Copy the Client ID and Client Secret back into the Firebase Authentication configuration.
6.  *Requirement for Daily Sync:* Ensure you have a repository named exactly `verto-activity` on your GitHub account.

### C. Spotify Developer Dashboard
1.  Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a new app.
2.  Copy the *Client ID* into your `.env` file (`VITE_SPOTIFY_CLIENT_ID`).
3.  Go to the app's settings and add the following **Redirect URI** exactly as written:
    *   `http://127.0.0.1:5173/callback`
    *   *(Note: Spotify's PKCE implementation treats `127.0.0.1` and `localhost` as distinct origins. Do not use `localhost`.)*

---

## 4. Running Locally

Once your `.env` is configured and services are set up:

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
# Important: Bind to 127.0.0.1 to match the Spotify redirect URI
npm run dev -- --host 127.0.0.1
```

Access the app at `http://127.0.0.1:5173`.

---

## 5. Building & Deployment

VERTO is a standard Vite React application and can be deployed to any static hosting service (Vercel, Netlify, Firebase Hosting, GitHub Pages).

```bash
# Generate the production build
npm run build

# Preview the production build locally
npm run preview
```

### Deployment Notes:
*   Ensure you add your `.env` variables to your hosting provider's dashboard.
*   Update the **Spotify Redirect URI** in the Spotify Developer Dashboard to match your production domain (e.g., `https://verto.yourdomain.com/callback`).
*   Configure your hosting provider to handle **SPA Routing** (rewrite all traffic to `index.html`), although VERTO primarily uses state-based routing.
