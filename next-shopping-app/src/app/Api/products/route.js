import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD
    });

    const query = 'SELECT i.item_id, i.name, i.description, i.price, i.quantity_available, img.image_url FROM Items i LEFT JOIN Images img ON i.item_id = img.item_id;';
    const [results] = await db.execute(query);
    
    // Close the database connection
    await db.end();
    
    return NextResponse.json(results);
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
