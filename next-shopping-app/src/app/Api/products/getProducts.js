import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Establish the database connection
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

export default async function handler(req, res) {
    const query = 'SELECT image, name, stock, price FROM items';
    
    try {
      const [results] = await db.execute(query);
      res.status(200).json(results);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }