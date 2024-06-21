import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import authRoutes from './authRoutes.js';
import env from 'dotenv';
import db from './db.js';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 5000;

env.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get('/api/todos/:username', async (req, res) => {
  try {
    const username = req.params.username.trim();
    console.log('Requested todos for username:', username);
    const query = `SELECT id, title, description, duedate, TO_CHAR(duedate, 'DD-MM-YYYY') as formatted_duedate, duetime FROM todo_lists WHERE username = $1 ORDER BY duedate;`;
    const { rows } = await db.query(query, [username]);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/todos/add', async (req, res) => {
  const { title, description, duedate, duetime, username } = req.body;

  try {
    await db.query("INSERT INTO todo_lists (title, description, duedate, duetime, username) VALUES ($1, $2, $3, $4, $5)", [title, description, duedate, duetime, username]);
    res.status(201).send({ message: "Todo added successfully" });
  } catch (err) {
    console.error('Error adding todo:', err); // Log the error
    res.status(500).json({ error: "Failed to add todo", details: err.detail, stack: err.stack }); // Send detailed error response
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM todo_lists WHERE id = $1", [id]);
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error('Error deleting todo:', err); // Log the error
    res.status(500).json({ error: "Failed to delete todo", details: err.detail, stack: err.stack }); // Send detailed error response
  }
});

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, duedate, duetime, username } = req.body;
  console.log('PUT request to update todo:', { id, title, description, duedate, duetime, username });
  try {
    await db.query("UPDATE todo_lists SET title = $1, description = $2, duedate = $3, duetime = $4 WHERE id = $5 AND username = $6", [title, description, duedate, duetime, id, username]);
    res.status(200).send({ message: "Todo updated successfully" });
  } catch (err) {
    console.error('Error updating todo:', err); // Log the error
    res.status(500).json({ error: "Failed to update todo", details: err.detail, stack: err.stack }); // Send detailed error response
  }
});

// Passport Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const query = `SELECT * FROM users WHERE username = $1`;
    const { rows } = await db.query(query, [username]);
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await db.query(query, [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
