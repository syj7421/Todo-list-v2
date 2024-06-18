import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import authRoutes from './authRoutes.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing
app.use(passport.initialize());

// User data for simplicity (normally you'd use a database)
const users = [
  { id: 'abc123', password: '1234' }
];

// Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(user => user.id === username && user.password === password);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect credentials.' });
  }
}));

// Routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
