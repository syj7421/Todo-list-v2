import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import authRoutes from './authRoutes.js';
import env from 'dotenv';
import pg from "pg";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
env.config();

const users = [{
  id: '1',
  username: 'abc123',
  password: '1234'
}];

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  });

db.connect(error => {
  if (error) {
  console.error('Failed to connect to the database', error);
  process.exit(1);
  } else {
  console.log('Connected to the database');
  }
});

app.get('/api/todos/:username', async (req, res) => {
  try {
  const username = req.params.username.trim();
  console.log('Requested todos for username:', username);
  const query = `SELECT id, title, description, duedate, TO_CHAR(duedate, 'DD-MM-YYYY') as formatted_duedate, duetime FROM todo_lists WHERE username = $1 ORDER BY duedate; `;
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


  

// Passport Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect credentials.' });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);
  done(null, user);
});

// Routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
