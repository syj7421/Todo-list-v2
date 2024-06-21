import pg from 'pg';
import env from 'dotenv';

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

export default db;
