# Setup & Deployment Guide

This guide covers how to set up the Firebase services and Gemini AI required for **2ndBrain**, configure environment variables, and run the application locally.

## 1. Prerequisites

You need accounts for the following services:
*   **Firebase** (Authentication & Firestore)
*   **Google AI Studio** (For the Gemini 2.5 Flash API Key)
*   **Node.js** (v18+ recommended)

## 2. Firebase Configuration

2ndBrain relies entirely on Firebase for Authentication and Firestore database storage.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Enable Firestore Database**: Create a database. Start in *Test Mode* for local development, but ensure you write proper security rules before deploying to production.
3. **Enable Authentication**: Go to Authentication > Sign-in method and enable the **Google** provider.
4. **Register Web App**: Add a web app to your Firebase project to generate your configuration keys.

## 3. Gemini API Configuration

To power the Neural Copilot, you need a Gemini API key.

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click **Get API key** and create a new key.

---

## 4. Environment Variables

Create a `.env` file in the root directory (`projects/second-brain/.env`) and populate it with the configuration keys:

```env
# Google AI Studio
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 5. Running Locally

Once your `.env` is configured and Firebase is set up:

```bash
# 1. Clone the repository
git clone https://github.com/yuvrajshrirame/second-brain.git
cd second-brain

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Access the app at `http://localhost:5173`.

---

## 6. Building & Deployment

**2ndBrain** is a standard Vite React Single Page Application (SPA) and can be deployed to any static hosting service like Vercel, Netlify, or Firebase Hosting.

```bash
# Generate the production build
npm run build

# Preview the production build locally
npm run preview
```

### Deployment Notes:
*   Ensure you add your `.env` variables (including the `VITE_GEMINI_API_KEY`) to your hosting provider's dashboard before building.
*   Configure your hosting provider to handle SPA Routing (rewrite all traffic to `index.html`).
