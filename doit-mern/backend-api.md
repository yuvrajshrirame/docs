# Express API Reference

The backend of **do.it** is a pure RESTful JSON API built with Node.js and Express. It serves as the single source of truth for the React frontend, handling all database operations and securing data via JWT (JSON Web Tokens).

## 1. The Express Setup (`server.js`)

The entry point of the backend configures essential middleware, including CORS (Cross-Origin Resource Sharing) to allow the frontend to securely access the API, and JSON body parsing.

```javascript
// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habits.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Crucial: Allows the Vite React app (e.g., localhost:5173) to communicate with this server
app.use(express.json()); // Parses incoming JSON payloads

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## 2. JWT Authentication Middleware (`middleware/auth.js`)

Every protected route (like creating or fetching habits) runs through this custom middleware. It intercepts the HTTP request, extracts the `Authorization: Bearer <token>` header, decodes it using the `JWT_SECRET`, and attaches the decrypted `user` object to the `req` object for downstream routes to use.

```javascript
// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    // 1. Extract the token from the "Authorization: Bearer xyz" header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    // 2. Verify the token hasn't been tampered with or expired
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Attach the decrypted payload (usually { id: "user_mongodb_id" }) to the request
    req.user = verified;
    
    // 4. Pass control to the actual route handler (e.g., router.get('/habits'))
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token verification failed, authorization denied' });
  }
};

export default auth;
```

## 3. REST API Routes Reference

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/anonymous` | Creates a new guest session. | None | `{ token, user: { _id, isAnonymous: true } }` |
| `POST` | `/google` | Verifies a Google OAuth credential and logs the user in (or creates their account). | `{ credential: "ey..." }` | `{ token, user: { _id, email, displayName } }` |
| `POST` | `/link` | **Requires Auth**. Links an existing anonymous account with a Google account, preserving all habit data. | `{ credential: "ey..." }` | `{ token, user }` |
| `GET` | `/me` | **Requires Auth**. Validates the current JWT and returns the user object. Used on page refresh. | None | `{ _id, email, displayName, isAnonymous }` |

### Habit Routes (`/api/habits`)

*All habit routes require a valid JWT via the `auth` middleware.*

| Method | Endpoint | Description | Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Fetches all habits belonging to the authenticated user. | None | `Array<Habit>` |
| `POST` | `/` | Creates a new habit for the authenticated user. | `{ title, icon, color, frequency, category }` | `Habit` |
| `PUT` | `/:id` | Updates a specific habit (e.g., completing it for the day). | `{ title, history, ... }` | `Habit` (Updated) |
| `DELETE`| `/:id` | Permanently deletes a specific habit. | None | `{ message: 'Habit deleted' }` |
