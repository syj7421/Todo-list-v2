import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import db from './db.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
    if (!user) {
      console.error('Authentication failed:', info.message);
      return res.status(401).send({ success: false, message: 'Invalid credentials' });
    }
    res.send({ success: true, user: user });
  })(req, res, next);
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ error: "Failed to register user", details: err.detail, stack: err.stack });
  }
});

export default router;
