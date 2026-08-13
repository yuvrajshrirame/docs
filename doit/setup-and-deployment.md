# Setup & Deployment Guide

This guide covers how to set up the Firebase services required for **do.it**, configure environment variables, and run the application locally.

## 1. Prerequisites

You need accounts for the following services:
*   **Firebase** (Authentication & Firestore)
*   **Node.js** (v18+ recommended)

## 2. Firebase Configuration

Because this app relies entirely on Firebase for authentication and database storage, you must set up your own Firebase project.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Enable Firestore Database**: Create a database. Start in *Test Mode* for local development, but ensure you write proper security rules before deploying to production.
3. **Enable Authentication**: Go to Authentication > Sign-in method and enable the following three providers:
   - Email/Password
   - Google
   - Anonymous (Crucial for the "Guest Mode" onboarding feature)
4. **Register Web App**: Add a web app to your Firebase project to generate your configuration keys.

---

## 3. Environment Variables

Create a `.env` file in the root directory (`projects/do-it/do-it/.env`) and populate it with the configuration keys provided by Firebase in the previous step:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 4. Running Locally

Once your `.env` is configured and Firebase is set up:

```bash
# 1. Clone the repository
git clone https://github.com/yuvrajshrirame/do-it.git
cd do-it/do-it

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Access the app at `http://localhost:5173`.

---

## 5. Building & Deployment

**do.it** is a standard Vite React application and can be deployed to any static hosting service (Vercel, Netlify, Firebase Hosting, GitHub Pages).

```bash
# Generate the production build
npm run build

# Preview the production build locally
npm run preview
```

### Deployment Notes:
*   Ensure you add your `.env` variables to your hosting provider's dashboard before building.
*   Configure your hosting provider to handle SPA Routing (rewrite all traffic to `index.html`).
