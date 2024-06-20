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
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing
app.use(passport.initialize());
env.config();

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
    const { username } = req.params; // Get the username from the route parameters
    const query = `
      SELECT 
        id, 
        title, 
        description, // It seems 'details' should be 'description' as per your database structure
        duedate,
        TO_CHAR(duedate, 'DD-MM-YYYY') as formatted_duedate,
        duetime
      FROM todo_lists // Assuming the correct table name is 'todo_lists'
      WHERE username = $1 // Use parameterized query for security
      ORDER BY duedate;
    `;
    const { rows } = await db.query(query, [username]); // Pass username to the query
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: error.message });
  }
});


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
