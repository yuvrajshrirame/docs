# Setup & Deployment Guide

This guide covers how to set up the MERN stack environment required for **do.it**, configure environment variables, and run both servers locally.

## 1. Prerequisites

You need accounts and software for the following services:
*   **MongoDB Atlas** (Cloud Database)
*   **Google Cloud Console** (OAuth 2.0 Client ID)
*   **Node.js** (v18+ recommended)

## 2. Infrastructure Configuration

Because this app uses a custom Express backend, you must set up your database and OAuth credentials.

1. **MongoDB Atlas**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster. Get your connection string.
2. **Google OAuth**: Go to the [Google Cloud Console](https://console.cloud.google.com/), create a project, and configure the OAuth consent screen. Create an **OAuth client ID** for a Web application.
   - Add `http://localhost:5173` to the Authorized JavaScript origins.
3. **JWT Secret**: Generate a random secure string to use as your JWT secret key.

---

## 3. Environment Variables

You need to create two separate `.env` files: one for the backend, and one for the frontend.

**`backend/.env`**
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5001/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

---

## 4. Running Locally

You will need to run both the frontend and backend servers simultaneously.

```bash
# 1. Clone the repository
git clone https://github.com/yuvrajshrirame/doit-mern.git
cd doit-mern

# 2. Install Backend Dependencies & Start Server
cd backend
npm install
node server.js # Runs on port 5001

# 3. Open a new terminal, Install Frontend Dependencies & Start Server
cd ../frontend
npm install
npm run dev # Runs on port 5173
```

Access the app at `http://localhost:5173`.

---

## 5. Building & Deployment

**do.it** requires two separate deployments:

### Backend Deployment (Render, Heroku, DigitalOcean)
1. Deploy the `backend` folder as a Node.js web service.
2. Add your `MONGO_URI`, `JWT_SECRET`, and `GOOGLE_CLIENT_ID` to the environment variables dashboard.

### Frontend Deployment (Vercel, Netlify)
1. Deploy the `frontend` folder as a standard Vite React application.
2. Add your `VITE_API_URL` (pointing to your live backend URL) and `VITE_GOOGLE_CLIENT_ID` to the environment variables.
3. Don't forget to add your live frontend URL to your Google Cloud Console **Authorized JavaScript origins**!
